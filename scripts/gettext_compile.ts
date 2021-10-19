import { execShellCommand } from "./utils";

const fs = require("fs");

const outIndex = process.argv.indexOf("--dir");
let outDir = "./src/language";
if (outIndex > -1) {
  outDir = process.argv[outIndex + 1];
}

const localesIndex = process.argv.indexOf("--locales");
let locales = ["en_US"];
if (localesIndex > -1) {
  locales = process.argv[localesIndex + 1].split(",").map((l) => l.trim());
}

const flatIndex = process.argv.indexOf("--flat");
let flat = false;
if (flatIndex > -1) {
  flat = true;
}

console.log(`Language directory: ${outDir}`);
console.log(`Locales: ${locales}`);
console.log("");

const outputPath = locales.map((loc) => (flat ? `${outDir}/${loc}.po` : `${outDir}/${loc}/app.po`)).join(" ");

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await execShellCommand(`gettext-compile --output ${outDir}/translations.json ${outputPath}`);
})();
