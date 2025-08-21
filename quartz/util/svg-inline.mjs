#!/usr/bin/env node
/**
 * svg-inline: Replace <img class="tikzjax-svg" src="/static/tikz/<hash>.svg" alt="...">
 * (optionally inside <picture class="tikzjax-picture">) with inline <svg>…</svg> markup.
 *
 * Usage:
 *   node quartz/util/svg-inline.mjs [--content content] [--static quartz/static/tikz]
 *                                   [--selector .tikzjax-svg]
 *                                   [--prefix-ids true|false]
 *
 * Notes:
 * - Works whether the image stands alone or is wrapped in <picture>.
 * - If --prefix-ids is true (default), prefixes all SVG ids and url(#id) references with a file-hash prefix to avoid DOM collisions.
 * - Locks the embedded font-family (from @font-face) so page-wide CSS cannot override SVG text (no dark-mode injection).
 */

import fs from 'fs/promises'
import path from 'path'
import process from 'process'

const argv = new Map(Object.entries(parseArgs(process.argv.slice(2))))
const CONTENT_DIR = argv.get('content') || 'content'
const STATIC_DIR  = argv.get('static')  || path.join('quartz', 'static', 'tikz')
const SELECTOR    = argv.get('selector') || '.tikzjax-svg'
const PREFIX_IDS  = truthy(argv.get('prefix-ids') ?? true)   // default: on

const mdFiles = await listMdFiles(CONTENT_DIR)
let replacedCount = 0
for (const file of mdFiles) {
  let src = await fs.readFile(file, 'utf8')
  const before = src

  src = await replaceImgTags(src, file)

  if (src !== before) await fs.writeFile(file, src, 'utf8')
}
console.log(`[svg-inline] processed ${mdFiles.length} files; inlined ${replacedCount} svg images.`)

// ---------------- helpers ----------------


async function replaceImgTags(text, file) {
  const re = new RegExp(`<img\\b([^>]*class=["'][^"']*${escapeReg(SELECTOR.slice(1))}[^"']*["'][^>]*)>`, 'gi')
  return await replaceAsync(text, re, async (_m, attrs) => {
    const img = `<img ${attrs}>`
    const inline = await inlineOneImg(img, file)
    return inline || _m
  })
}

async function inlineOneImg(imgHtml, file) {
  const getAttr = (name) => {
    const m = imgHtml.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'))
    return m ? (m[2] ?? m[3] ?? '') : ''
  }
  const src = getAttr('src')
  if (!src) return null
  const alt = getAttr('alt') || 'tikz'
  const cls = getAttr('class') || ''
  const id = getAttr('id') || ''


  const base = path.basename(src)               // 예: 7ce39899ad9ef596.svg
  const svgPath = path.join(STATIC_DIR, base)   // quartz/static/tikz/<hash>.svg
  let svg
  try {
    svg = await fs.readFile(svgPath, 'utf8')
  } catch {
    console.warn(`[svg-inline] ${file}: missing ${svgPath}, keep <img>`)
    return null
  }

  // ID 충돌 방지: 파일 해시 prefix
  const hash = (base.match(/^([a-f0-9]+)/i) || [,'h'])[1]
  if (PREFIX_IDS) svg = prefixIds(svg, `h_${hash}__`)

  // 기존 <style> 블록 내의 font-family/font 선언에만 !important 부여 (외부 전역 CSS 무력화)
  svg = importantifyInlineTextFonts(svg)
  // normalize @font-face format quotes → format('woff2')
  svg = changequotes(svg)
  svg = replaceImportant(svg, file)


  // 클래스/aria 병합
  svg = svg.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    const hasClass = /\bclass=/.test(attrs)
    const merged = hasClass
      ? attrs.replace(/\bclass=(["'])([^"']*)\1/i, (_m2, q) => `class=${q}${cls}${q}`)
      : `${attrs} class="${cls}"`
    const hasId = /\bid=/.test(merged)
    const hasRole = /\brole=/.test(merged)
    const hasLabel = /\baria-label=/.test(merged)
    const withId = hasId ? merged : `${merged} id="svg-${hash}"`
    const withRole = hasRole ? merged : `${merged} role="img"`
    const withAria = hasLabel ? withRole : `${withId} ${withRole} aria-label="${escapeHtml(alt)}"`
    return `<svg${withAria}>`
  })

  replacedCount++
  return svg
}

function prefixIds(svg, prefix) {
  let out = svg.replace(/\bid=(["'])([^"']+)\1/g, (m, q, id) => `id=${q}${prefix}${id}${q}`)
  out = out.replace(/url\(#([^)]+)\)/g, (m, id) => `url(#${prefix}${id})`)
  out = out.replace(/\b(xlink:)?href=(["'])#([^"']+)\2/g, (m, xl, q, id) => `${xl || ''}href=${q}#${prefix}${id}${q}`)
  out = out.replace(/\baria-(labelledby|describedby)=(["'])([^"']+)\2/g, (m, kind, q, ids) => {
    const mapped = ids.split(/\s+/).map(id => `${prefix}${id}`).join(' ')
    return `aria-${kind}=${q}${mapped}${q}`
  })
  return out
}

function importantifyInlineTextFonts(svg) {
  // <text|tspan|foreignObject>의 inline style 속 font-family/font 선언에만 !important 추가
  const tagRe = /(<(?:text|tspan|foreignObject)\b[^>]*\bstyle\s*=\s*)(["'])([\s\S]*?)\2/gi
  return svg.replace(tagRe, (_m, pre, q, style) => {
    const patched = String(style)
      // font-family: ... → font-family: ... !important
      .replace(/(font-family\s*:\s*[^;}{]+)(;?)/gi, (m, decl, semi) =>
        /!important/i.test(decl) ? m : `${decl} !important${semi || ''}`
      )
      // font: ... (축약형) → font: ... !important
      .replace(/(font\s*:\s*[^;}{]+)(;?)/gi, (m, decl, semi) =>
        /!important/i.test(decl) ? m : `${decl} !important${semi || ''}`
      )
    return `${pre}${q}${patched}${q}`
  })
}

function changequotes(svg) {
  // Normalize any of: format("woff2"), format('woff2'), format(“woff2”), format(’woff2’), or format(woff2)
  // to the canonical: format('woff2')
  const re = /format\(\s*([\"])?\s*woff2\s*([\"])?\s*\)/gi
  return svg.replace(re, `format('woff2')`)
}

function replaceImportant(svg, file) {
  // text.f1{...} 패턴만 대상으로, 각 선언에 !important를 붙임(이미 있으면 유지)
  const hash = path.basename(file, '.svg')
  if (!hash) return svg // no id found, nothing to do
  const re = /text\.([A-Za-z0-9_-]+)\s*\{([^}]*)\}/gi
  return svg.replace(re, (_m, cls, body) => {
    const patched = body.replace(
      /([^:{};]+:\s*[^;{}]+)(;?)/g,                             // 선언 한 줄
      (m, decl, semi) => /\!important\b/i.test(decl) ? m        // 이미 있으면 그대로
                         : `${decl} !important${semi || ';'}`   // 없으면 추가(+세미콜론 보정)
    )
    return `svg-${hash}.text.${cls}{${patched}}`
  })
}

// ------------- utils -------------

function parseArgs(args) {
  const out = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith('--')) {
      const k = a.slice(2)
      const v = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true
      out[k] = v
    }
  }
  return out
}
function truthy(v){ return v === true || v === 'true' || v === '1' }
function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m])) }

async function listMdFiles(root) {
  const out = []
  async function walk(dir){
    let entries
    try { entries = await fs.readdir(dir, { withFileTypes: true }) } catch { return }
    for (const ent of entries) {
      const p = path.join(dir, ent.name)
      if (ent.isDirectory()) await walk(p)
      else if (ent.isFile() && p.endsWith('.md')) out.push(p)
    }
  }
  await walk(root)
  return out
}

async function replaceAsync(str, re, asyncFn) {
  const parts = []
  let last = 0
  for (const m of str.matchAll(re)) {
    parts.push(str.slice(last, m.index))
    parts.push(await asyncFn(...m))
    last = m.index + m[0].length
  }
  parts.push(str.slice(last))
  return parts.join('')
}