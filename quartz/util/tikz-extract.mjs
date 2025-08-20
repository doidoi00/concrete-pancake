#!/usr/bin/env node
/**
 * tikz-extract: Scan Markdown, extract ```tikz code blocks → .tex (standalone),
 * replace blocks with image links to /tikz/<hash>.svg.
 *
 * Usage:  node quartz/util/tikz-extract.mjs [--content content] [--tikz tikz] [--static /quartz/static/tikz]
 *
 * Notes:
 * - Hash = sha1(preamble + tikzCode + engine + compat + border).
 * - If the code already contains \documentclass or \begin{document},
 *   it is treated as a full document and written as-is (no wrapping).
 */

import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import process from 'process'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'

const argv = new Map(Object.entries(parseArgs(process.argv.slice(2))))
const CONTENT_DIR = argv.get('content') || 'content'
const TIKZ_DIR = argv.get('tikz') || 'tikz'
const STATIC_TIKZ_DIR = argv.get('static') || path.join('quartz', 'static', 'tikz')

await fs.mkdir(TIKZ_DIR, { recursive: true })
await fs.mkdir(STATIC_TIKZ_DIR, { recursive: true })

const mdFiles = await listMdFiles(CONTENT_DIR)
let totalBlocks = 0
let changedFiles = 0

for (const file of mdFiles) {
  const original = await fs.readFile(file, 'utf8')
  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .parse(original)

  // Collect edits (with raw offsets) before mutating text 
  const edits = []

  // Precompute line offsets to map line/column → absolute offset when needed
  const lineOffsets = buildLineOffsets(original)

  visit(tree, 'code', (node, index, parent) => {
    if (!parent || typeof index !== 'number') return
    if (!node.lang) return

    const info = String(node.lang).trim()
    const isTikz = info === 'tikz' || info.startsWith('tikz')
    if (!isTikz) return

    const meta = parseMeta(info, node.meta || '')
    const tikzCode = node.value || ''
    if (!tikzCode.trim()) return

    const { texContent, engine } = buildTex(tikzCode, meta)
    const hash = shortHash(`${engine}|${texContent}`)
    const texPath = path.join(TIKZ_DIR, `${hash}.tex`)

    // Determine raw character offsets of the code block in the original text
    const startOffset = (node.position && node.position.start && typeof node.position.start.offset === 'number')
      ? node.position.start.offset
      : offsetFromLC(lineOffsets, node.position && node.position.start)

    const endOffset = (node.position && node.position.end && typeof node.position.end.offset === 'number')
      ? node.position.end.offset
      : offsetFromLC(lineOffsets, node.position && node.position.end)

    if (typeof startOffset !== 'number' || typeof endOffset !== 'number') return

    edits.push({
      start: startOffset,
      end: endOffset,
      // Build HTML <img> so we can attach a class (Markdown image syntax has no class support)
      replacement: (() => {
        const alt = meta.alt || meta.title || 'tikz'
        const cls = meta.class ? `tikzjax-svg ${meta.class}` : 'tikzjax-svg'
        return `<img class="${cls}" src="/static/tikz/${hash}.svg" alt="${alt}">`
      })(),
      texPath,
      texContent,
    })
  })

  if (edits.length === 0) continue

  // Write .tex files first
  for (const e of edits) {
    await writeFileIfChanged(e.texPath, e.texContent)
  }

  // Apply text edits in reverse order to avoid shifting offsets
  const replaced = applyTextEdits(original, edits.map(e => ({ start: e.start, end: e.end, text: e.replacement })))

  if (replaced !== original) {
    await fs.writeFile(file, replaced, 'utf8')
    changedFiles++
  }
  totalBlocks += edits.length
}

console.log(`[tikz-extract] processed ${mdFiles.length} files; replaced ${totalBlocks} tikz blocks; modified ${changedFiles} files.`)
console.log(`[tikz-extract] .tex written to: ${path.resolve(TIKZ_DIR)}`)
console.log(`[tikz-extract] SVGs should be generated into: ${path.resolve(STATIC_TIKZ_DIR)}`)

// ---------------- functions ---------------- //

function buildLineOffsets(text) {
  const arr = [0]
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') arr.push(i + 1)
  }
  return arr
}

function offsetFromLC(lineOffsets, pos) {
  if (!pos || !pos.line || !pos.column) return null
  const lineIndex = Math.max(0, pos.line - 1)
  const base = lineOffsets[lineIndex] ?? 0
  return base + (pos.column - 1)
}

function applyTextEdits(text, edits) {
  const sorted = edits.slice().sort((a, b) => b.start - a.start)
  let out = text
  for (const e of sorted) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end)
  }
  return out
}

function parseArgs(args) {
  const out = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true
      out[key] = val
    }
  }
  return out
}

async function listMdFiles(root) {
  const files = []
  async function walk(dir) {
    let entries
    try { entries = await fs.readdir(dir, { withFileTypes: true }) } catch { return }
    for (const ent of entries) {
      const p = path.join(dir, ent.name)
      if (ent.isDirectory()) await walk(p)
      else if (ent.isFile() && p.endsWith('.md')) files.push(p)
    }
  }
  await walk(root)
  return files
}

function parseMeta(info, metaStr) {
  // info may be like: "tikz", "tikz:xe", or just "tikz" with meta string
  const meta = {}
  const engineFromInfo = info.includes(':') ? info.split(':', 2)[1] : ''
  if (engineFromInfo) meta.engine = engineFromInfo

  const str = String(metaStr || '').trim()
  const re = /(\w+)=("[^"]*"|'[^']*'|[^\s]+)/g
  let m
  while ((m = re.exec(str))) {
    const k = m[1]
    let v = m[2]
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
    meta[k] = v
  }
  return meta
}

function buildTex(tikzCode, meta) {
  const engine = (meta.engine || '').toLowerCase() // '', 'xe', 'pdf', etc.

const code = normalizeNewlines(tikzCode)
  const hasBegin = /\\begin{document}/.test(code)
  const hasClass = /\\documentclass/.test(code)

  // Case 1: full document already (has \documentclass)
  if (hasClass) {
    return { texContent: code, engine: engine || 'tectonic' }
  }

  // Case 2: has \begin{document} but missing \documentclass → prepend ONLY documentclass
  if (hasBegin && !hasClass) {
    const tex = [
      '\\documentclass[tikz]{standalone}',
      code,
      '',
    ].join('\n')
    return { texContent: tex, engine: engine || 'tectonic' }
  }

  // Case 3: bare tikz snippet → build minimal standalone wrapper
  const preambleLines = []
  // Project policy: preamble contains ONLY documentclass (no pgfplots/kotex/compat)
  preambleLines.push('\\documentclass[tikz]{standalone}')

  const tex = [
    preambleLines.join('\n'),
    '\\begin{document}',
    code,
    '\\end{document}',
    '',
  ].join('\n')

  return { texContent: tex, engine: engine || 'tectonic' }
}

function shortHash(s) {
  return crypto.createHash('sha1').update(s).digest('hex').slice(0, 16)
}

async function writeFileIfChanged(filePath, content) {
  try {
    const prev = await fs.readFile(filePath, 'utf8')
    if (prev === content) return
  } catch {}
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, content, 'utf8')
}

function normalizeNewlines(s) {
  return String(s).replace(/\r\n?/g, '\n').trim() + '\n'
}
