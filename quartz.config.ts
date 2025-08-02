import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Concrete Pancake",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-HQX5HVENMC",
    },
    locale: "ko-KR",
    baseUrl: "https://concrete-pancake.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "mathjax",
        mathJaxOptions: {
          tex: {
            packages: { "[+]": ["cancel", "ams", "amsmath", "amssymb"] },
          },
          chtml: {
            displayAlign: "left",
            displayIndent: "0",
          },
          startup: {
            ready() {
              const { MathJax } = this;
              MathJax.startup.defaultReady();
              const style = document.createElement('style');
              style.textContent = `
                .MathJax_Display {
                  overflow-x: auto !important;
                  overflow-y: hidden !important;
                  max-width: 100% !important;
                  padding: 0.5em 0 !important;
                }
                mjx-container[jax="CHTML"][display="true"] {
                  overflow-x: auto !important;
                  overflow-y: hidden !important;
                  max-width: 100% !important;
                  display: block !important;
                }`;
              document.head.appendChild(style);

              MathJax.startup.document.updateDocument = function() {
                return MathJax.startup.document.constructor.prototype.updateDocument.call(this).then(() => {
                  document.querySelectorAll('mjx-container[display="true"]').forEach(container => {
                    if (container instanceof HTMLElement) {
                      container.style.overflowX = 'auto';
                      container.style.maxWidth = '100%';
                    }
                  });
                });
              };
            }
          }
        },
      }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
