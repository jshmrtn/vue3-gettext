#!/usr/bin/env node

"use strict";

const fs = require("fs");
const shell = require("shelljs");

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
  locales = locales.split(",").map((l) => l.trim());
}

const potPath = `${outDir}/messages.pot`;
console.log(`Source directory directory: ${srcDir}`);
console.log(`Output directory: ${srcDir}`);
console.log(`Locales: ${locales}`);
console.log("");

function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

(async () => {
  const files = await execShellCommand(`find ${srcDir} -name '*.js' -o -name '*.vue' 2> /dev/null`);

  const extracted = await execShellCommand(
    `gettext-extract --attribute v-translate --output ${potPath} ${files.split("\n").join(" ")}`,
  );
  shell.chmod("666", potPath);
  console.log(extracted);

  locales.forEach(async (loc) => {
    const poDir = `${outDir}/${loc}/`;
    const poFile = `${poDir}app.po`;
    shell.mkdir("-p", poDir);
    const isFile = fs.existsSync(poFile) && fs.lstatSync(poFile).isFile();
    if (isFile) {
      await execShellCommand(`msgmerge --lang=${loc} --update ${poFile} ${potPath} || break`);
    } else {
      await execShellCommand(
        `msginit --no-translator --locale=${loc} --input=${potPath} --output-file=${poFile} || break`,
      );
      shell.chmod("666", poFile);
      await execShellCommand(`msgattrib --no-wrap --no-obsolete -o ${poFile} ${poFile} || break`);
    }
  });
})();
