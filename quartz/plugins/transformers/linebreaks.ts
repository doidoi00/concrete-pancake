import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const HardLineBreaks: QuartzTransformerPlugin = () => {
  return {
    name: "HardLineBreaks",
    textTransform(_ctx, src) {
      return src.replace(/(?<!\n)\n(?!\n)/g, "  \n") 
    },
    markdownPlugins() {
      return [remarkBreaks]
    },
  }
}
