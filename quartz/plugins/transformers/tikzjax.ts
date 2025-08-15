import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root, Code } from "mdast"
import { load, tex, dvi2svg } from 'node-tikzjax'


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

            await load()
            
            const nodes: { node: Code; parent: any; index: number }[] = []
            visit(tree, "code", (node, index, parent) => {
              if (node.lang === "tikz" && parent && typeof index === "number") {
                nodes.push({ node: node as Code, parent, index })
              }
            })

            for (const { node, parent, index } of nodes) {
              tikzjaxFound = true
              const tikzCode = node.value || ""
              if (!tikzCode.trim()) continue

              try {
                const dvi = await tex(tikzCode, { showConsole: true })
                const svg = await dvi2svg(dvi)
                const svgWithClass = svg.replace(/<svg /, '<svg class="tikzjax-svg" ')

                parent.children[index] = {
                  type: "html",
                  value: svgWithClass,
                }
              } catch (error: unknown) {
                console.error("TikZ conversion failed:", error)
                console.warn(`Failed TikZ code: ${tikzCode.substring(0, 100)}...`)
              }
            }
          }
        }
      ]
    }
  }
}
