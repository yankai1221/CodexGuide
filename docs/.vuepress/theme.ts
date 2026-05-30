import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import { getPageDescription, siteOgImage, siteUrl, toSiteUrl } from "./seo.js";
import sidebar from "./sidebar/index.js";

const addMeta = (
  head: unknown[][],
  attribute: "name" | "property",
  name: string,
  content: string,
): void => {
  if (head.some(([tag, attrs]) => tag === "meta" && attrs?.[attribute] === name)) return;
  head.push(["meta", { [attribute]: name, content }]);
};

export default hopeTheme({
  hostname: `${siteUrl}/`,
  logo: "/logo.svg",
  favicon: "/logo.svg",

  navbar,
  sidebar,

  print: false,
  pure: true,
  focus: false,
  breadcrumb: true,
  displayFooter: true,
  footer: "MIT Licensed | Copyright © 2026 瞩目AI",
  pageInfo: ["Category", "Tag", "Date", "Original", "Word", "ReadingTime"],

  blog: false,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    gfm: true,
    mark: true,
    tasklist: true,
    tabs: true,
  },

  plugins: {
    copyCode: true,
    copyright: {
      author: "瞩目AI",
      license: "MIT",
      triggerLength: 100,
      maxLength: 700,
      canonical: `${siteUrl}/`,
      global: true,
    },
    feed: {
      atom: true,
      json: true,
      rss: true,
    },
    seo: {
      fallBackImage: siteOgImage,
      canonical: (page) => toSiteUrl(page.path),
      ogp: (ogp, page) => ({
        ...ogp,
        "og:description": getPageDescription(page.path),
        "og:image": page.frontmatter.cover || page.frontmatter.banner ? ogp["og:image"] : siteOgImage,
        "og:image:alt": `${page.title} - 瞩目AI`,
        "og:locale": "zh_CN",
      }),
      jsonLd: (jsonLD, page) => ({
        ...jsonLD,
        description: getPageDescription(page.path),
        url: toSiteUrl(page.path),
        image: [siteOgImage],
        inLanguage: "zh-CN",
        isPartOf: {
          "@type": "WebSite",
          name: "瞩目AI",
          url: `${siteUrl}/`,
        },
        publisher: {
          "@type": "Organization",
          name: "瞩目AI",
          url: `${siteUrl}/`,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.svg`,
          },
        },
      }),
      customHead: (head, page) => {
        const description = getPageDescription(page.path);
        const title = `${page.title} | 瞩目AI`;

        addMeta(head, "name", "twitter:card", "summary_large_image");
        addMeta(head, "name", "twitter:title", title);
        addMeta(head, "name", "twitter:description", description);
        addMeta(head, "name", "twitter:image", siteOgImage);
        addMeta(head, "name", "twitter:image:alt", `${page.title} - 瞩目AI`);
      },
    },
    sitemap: {
      hostname: `${siteUrl}/`,
      changefreq: "weekly",
      excludePaths: ["/404.html", "/guide/", "/community/"],
    },
    slimsearch: {
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索 瞩目AI",
        },
      },
    },
  },
});
