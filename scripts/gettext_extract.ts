import { execShellCommand } from "./utils";

const fs = require("fs");

const srcIndex = process.argv.indexOf("--src");
let srcDir = "./src";
if (srcIndex > -1) {
  srcDir = process.argv[srcIndex + 1];
}

const outIndex = process.argv.indexOf("--out");
let outDir = "./src/language";
if (outIndex > -1) {
  outDir = process.argv[outIndex + 1];
}

const potFileNameIndex = process.argv.indexOf("--pot-file");
let potFileName = "messages.pot";
if (potFileNameIndex > -1) {
  potFileName = process.argv[potFileNameIndex + 1];
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

const potFile = `${outDir}/${potFileName}`;
console.log(`Source directory: ${srcDir}`);
console.log(`Output directory: ${outDir}`);
console.log(`Output POT file: ${potFile}`);
console.log(`Locales: ${locales}`);
console.log("");

(async () => {
  const files = await execShellCommand(`find ${srcDir} -name '*.js' -o -name '*.ts' -o -name '*.vue' 2> /dev/null`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const extracted = await execShellCommand(
    `gettext-extract --attribute v-translate --output ${potFile} ${files.split("\n").join(" ")}`,
  );
  fs.chmodSync(potFile, 0o666);
  console.log(extracted);

  for (const loc of locales) {
    const poDir = flat ? `${outDir}/` : `${outDir}/${loc}/`;
    const poFile = flat ? `${poDir}${loc}.po` : `${poDir}app.po`;

    fs.mkdirSync(poDir, { recursive: true });
    const isFile = fs.existsSync(poFile) && fs.lstatSync(poFile).isFile();
    if (isFile) {
      await execShellCommand(`msgmerge --lang=${loc} --update ${poFile} ${potFile} --backup=off`);
    } else {
      await execShellCommand(`msginit --no-translator --locale=${loc} --input=${potFile} --output-file=${poFile}`);
      fs.chmodSync(poFile, 0o666);
      await execShellCommand(`msgattrib --no-wrap --no-obsolete -o ${poFile} ${poFile}`);
    }
  }
  fs.writeFileSync(`${outDir}/LINGUAS`, locales.join(" "));
})();
