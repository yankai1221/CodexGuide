import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import { getPageDescription, siteDescription } from "./seo.js";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "docs/.vuepress/dist",
  lang: "zh-CN",
  title: "瞩目AI",
  description: siteDescription,

  head: [
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large" }],
    ["meta", { name: "author", content: "瞩目AI" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "瞩目AI,中转API,API中转,OpenAI 中转,ChatGPT API,Codex,ChatBox,NextChat,Cursor,API Key,AI 教学",
      },
    ],
    ["meta", { name: "theme-color", content: "#0f766e" }],
    ["meta", { name: "format-detection", content: "telephone=no" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
  ],

  plugins: [
    {
      name: "zhumu-ai-seo-defaults",
      extendsPage: (page) => {
        if (!page.frontmatter.description) {
          page.frontmatter.description = getPageDescription(page.path);
        }
      },
    },
  ],

  bundler: viteBundler(),

  theme,

  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules"],

  shouldPrefetch: false,
  shouldPreload: false,
});
