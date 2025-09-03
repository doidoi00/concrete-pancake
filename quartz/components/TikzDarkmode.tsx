import { QuartzComponent, QuartzComponentConstructor } from "./types"

const TikzDarkmode: QuartzComponent = () => null

TikzDarkmode.afterDOMLoaded = `
const updateTikzImages = () => {
  const currentTheme = document.documentElement.getAttribute("saved-theme")
  const tikzImages = document.querySelectorAll('.tikzjax-png[data-light-src][data-dark-src]')
  
  tikzImages.forEach(img => {
    const lightSrc = img.getAttribute('data-light-src')
    const darkSrc = img.getAttribute('data-dark-src')
    
    if (currentTheme === "dark" && darkSrc) {
      img.src = darkSrc
    } else if (lightSrc) {
      img.src = lightSrc
    }
  })
}

document.addEventListener("nav", updateTikzImages)
document.addEventListener("themechange", updateTikzImages)  
updateTikzImages()
`

export default (() => TikzDarkmode) satisfies QuartzComponentConstructor