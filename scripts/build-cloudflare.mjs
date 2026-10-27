import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { buildSubtypes } from "./build-subtypes.mjs";
import { buildLandingCopy } from "./build-landing-copy.mjs";
import { redirectsFile } from "./redirects.mjs";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(projectRoot, ".cloudflare-stage");

if (basename(outputDirectory) !== ".cloudflare-stage") {
  throw new Error(`Refusing to clean unexpected output directory: ${outputDirectory}`);
}

const files = [
  "index.html",
  "theory.html",
  "jung-functions.html",
  "article.css",
  "subtype-summaries.mjs",
  "content-locales.mjs",
  "404.html",
  "favicon.ico",
  "theme.css",
  "polish.css",
  "mainscript.js",
  "cn_text.js",
  "cn_enneagram.js",
  "cn.json",
  "vuescript.js",
  "vuei18n.js",
  "seo.mjs",
  "robots.txt",
  "sitemap.xml",
];

const directories = ["vendor", "img", "sound", "subtypes", "zh", "en", "ja"];

await buildSubtypes();
await buildLandingCopy();

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(resolve(projectRoot, file), resolve(outputDirectory, file));
}

for (const directory of directories) {
  await cp(resolve(projectRoot, directory), resolve(outputDirectory, directory), {
    recursive: true,
  });
}

await writeFile(resolve(outputDirectory, "_redirects"), redirectsFile());

console.log(`Cloudflare assets prepared in ${outputDirectory}`);
