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
            
            const promises: Promise<void>[] = []
            
            visit(tree, "code", (node: Code, index, parent) => {
              if (node.lang === "tikz" && parent && typeof index === 'number') {
                tikzjaxFound = true
                const tikzCode = node.value || ""
                if (!tikzCode.trim()) return
                
                const promise = (async () => {
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
                })()
                
                promises.push(promise)
              }
            })
            
            await Promise.all(promises)
          }
        }
      ]
    }
  }
}
