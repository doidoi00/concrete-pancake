import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root, Code } from "mdast"
import { load, tex, dvi2svg } from 'node-tikzjax'

let tikzLoaded: Promise<void> | null = null


interface Options {
  enableTikZJax: boolean
}



export const TikZJax: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const enableTikZJax = opts?.enableTikZJax ?? true
  
  let tikzjaxFound = false

  return {
    name: "TikZJax",
    markdownPlugins() {
      return [
        () => {
          return async (tree: Root) => {
            if (!enableTikZJax) return

            if (!tikzLoaded) {
              tikzLoaded = load()
            }
            await tikzLoaded
            
            const tasks: { index: number; parent: any; tikzCode: string }[] = []

            visit(tree, "code", (node: Code, index, parent) => {
              if (node.lang === "tikz" && parent && typeof index === 'number') {
                tikzjaxFound = true
                const tikzCode = node.value || ""
                if (!tikzCode.trim()) return
                tasks.push({ index, parent, tikzCode })
              }
            })

            for (const { index, parent, tikzCode } of tasks) {
              try {
                const dvi = await tex(tikzCode, { showConsole: true })
                const svg = await dvi2svg(dvi)
                const svgWithClass = svg.replace(/<svg /, '<svg class="tikzjax-svg" ')

                parent.children[index] = {
                  type: "html",
                  value: svgWithClass
                }
              } catch (error: unknown) {
                console.error('TikZ conversion failed:', error)
                console.warn(`Failed TikZ code: ${tikzCode.substring(0, 100)}...`)
              }
            }
          }
        }
      ]
    }
  }
}
