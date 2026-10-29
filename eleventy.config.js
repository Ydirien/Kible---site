import fs from "node:fs";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import { transform as lightning } from "lightningcss";
import { minify as minifyHtml } from "html-minifier-terser";
import icons from "./src/_data/icons.js";

const OUT = "_site";
const IMG_DIR = "/assets/img/";

export default function (eleventyConfig) {
  /* ---------- Passthrough ---------- */
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/assets/img/brand");
  eleventyConfig.addPassthroughCopy({ "src/assets/img/brand/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addWatchTarget("src/assets/css/");

  /* ---------- CSS inliné et minifié ---------- */
  let cssCache = null;
  eleventyConfig.on("eleventy.before", () => { cssCache = null; });
  eleventyConfig.addShortcode("inlineCss", () => {
    if (cssCache) return cssCache;
    const code = fs.readFileSync("src/assets/css/main.css");
    cssCache = lightning({ filename: "main.css", code, minify: true }).code.toString();
    return cssCache;
  });

  /* ---------- Icônes : {% icon "map" %} ou {% icon "map", "classe" %} ---------- */
  eleventyConfig.addShortcode("icon", (name, cls = "icon") => {
    if (!icons[name]) throw new Error(`icon : icône inconnue « ${name} »`);
    return `<svg class="${cls}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
  });

  /* ---------- Shortcode image (eleventy-img) ----------
     {% image "src/assets/img/x.jpg", "Alt", "(min-width: 60em) 50vw, 100vw", "eager" %}
     Le 4e paramètre "eager" désactive le lazy-loading (image au-dessus de la ligne de flottaison). */
  eleventyConfig.addAsyncShortcode("image", async (src, alt, sizes = "100vw", loading = "lazy", cls = "") => {
    if (alt === undefined) throw new Error(`image : attribut alt manquant pour ${src}`);
    const metadata = await Image(src, {
      widths: [400, 800, 1200, 1600],
      formats: ["avif", "webp", "jpeg"],
      outputDir: path.join(OUT, IMG_DIR),
      urlPath: IMG_DIR,
      sharpAvifOptions: { quality: 55 },
      sharpWebpOptions: { quality: 75 },
      sharpJpegOptions: { quality: 78 },
    });
    const eager = loading === "eager";
    return Image.generateHTML(metadata, {
      alt, sizes,
      ...(cls ? { class: cls } : {}),
      loading: eager ? "eager" : "lazy",
      decoding: eager ? "sync" : "async",
      ...(eager ? { fetchpriority: "high" } : {}),
    });
  });

  /* ---------- Image OG : SVG -> PNG 1200x630 ---------- */
  eleventyConfig.on("eleventy.before", async () => {
    await Image("src/assets/img/og-kible.svg", {
      widths: [1200],
      formats: ["png"],
      outputDir: path.join(OUT, IMG_DIR),
      urlPath: IMG_DIR,
      filenameFormat: (id, src, width, format) => `og-kible.${format}`,
    });
  });

  /* ---------- JSON-LD ---------- */
  // types : tableau parmi "software" ; Organization est toujours présent ; FAQPage si faqItems non vide.
  eleventyConfig.addFilter("jsonLd", (page, site, types = [], faqItems = [], title = "") => {
    const graph = [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/assets/img/brand/kible-symbole.png`,
        description: site.description,
      },
    ];
    if (types.includes("software")) {
      graph.push({
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#software`,
        name: site.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: site.description,
        url: site.url + "/",
        inLanguage: "fr",
        featureList: [
          "Prospection terrain et carte des secteurs",
          "Suivi d’activité et tableaux de bord",
          "Coaching et progression des équipes",
        ],
        publisher: { "@id": `${site.url}/#organization` },
        // Pas d'offers ni d'aggregateRating tant que les prix/avis réels ne sont pas fournis.
      });
    }
    // Les marqueurs [À COMPLÉTER] restent visibles dans le HTML mais ne partent pas dans les données structurées.
    const stripPh = (t) => t.replace(/\s*\[À COMPLÉTER[^\]]*\]/g, "").trim();
    const faqLd = (faqItems || [])
      .map((i) => ({ q: stripPh(i.q), a: stripPh(i.a) }))
      .filter((i) => i.q && i.a);
    if (faqLd.length) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${site.url}${page.url}#faq`,
        mainEntity: faqLd.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      });
    }
    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  /* ---------- Minification HTML ---------- */
  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return minifyHtml(content, {
      collapseWhitespace: true,
      conservativeCollapse: false,
      removeComments: true,
      removeRedundantAttributes: false,
      minifyJS: false,
      minifyCSS: false,
    });
  });

  return {
    dir: { input: "src", output: OUT, includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
