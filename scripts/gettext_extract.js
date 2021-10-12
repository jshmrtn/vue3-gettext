#!/usr/bin/env node

"use strict";

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

const localesIndex = process.argv.indexOf("--locales");
let locales = "en_US";
if (localesIndex > -1) {
  locales = process.argv[localesIndex + 1];
}
locales = locales.split(",").map((l) => l.trim());

const flatIndex = process.argv.indexOf("--flat");
let flat = false;
if (flatIndex > -1) {
  flat = true;
}

const potPath = `${outDir}/messages.pot`;
console.log(`Source directory directory: ${srcDir}`);
console.log(`Output directory: ${srcDir}`);
console.log(`Locales: ${locales}`);
console.log("");

function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

(async () => {
  const files = await execShellCommand(`find ${srcDir} -name '*.js' -o -name '*.ts' -o -name '*.vue' 2> /dev/null`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const extracted = await execShellCommand(
    `gettext-extract --attribute v-translate --output ${potPath} ${files.split("\n").join(" ")}`,
  );
  try {
    fs.writeFileSync(potPath, "", { flag: "wx" });
  } catch {}
  fs.chmodSync(potPath, 0o666);
  console.log(extracted);

  locales.forEach(async (loc) => {
    const poDir = flat ? `${outDir}/` : `${outDir}/${loc}/`;

    try {
      fs.writeFileSync(potPath, "", { flag: "wx" });
    } catch {}
    const poFile = flat ? `${poDir}${loc}.po` : `${poDir}app.po`;
    fs.mkdirSync(poDir, { recursive: true });
    const isFile = fs.existsSync(poFile) && fs.lstatSync(poFile).isFile();
    if (isFile) {
      await execShellCommand(`msgmerge --lang=${loc} --update ${poFile} ${potPath} --backup=off`);
    } else {
      await execShellCommand(`msginit --no-translator --locale=${loc} --input=${potPath} --output-file=${poFile}`);
      fs.chmodSync(poFile, 0o666);
      await execShellCommand(`msgattrib --no-wrap --no-obsolete -o ${poFile} ${poFile}`);
    }
  });
})();
