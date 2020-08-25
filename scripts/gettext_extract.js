#!/usr/bin/env node

"use strict";

const fs = require("fs");
const shell = require("shelljs");

const inputDir = "./dev";
const outputDir = "./dev";
const locales = ["en_GB", "fr_FR", "it_IT"];
const templatePotPath = `/tmp/template-${"test"}.pot`; // TODO

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
  const files = await execShellCommand(
    `find ${inputDir} -name '*.jade' -o -name '*.html' -o -name '*.js' -o -name '*.vue' 2> /dev/null`
  );

  shell.mkdir("-p", "/tmp/"); // TODO: tmp path

  const extracted = await execShellCommand(
    `gettext-extract --attribute v-translate --output ${templatePotPath} ${files.split("\n").join(" ")}`
  );
  shell.chmod("666", templatePotPath);
  console.log(extracted);

  locales.forEach(async (loc) => {
    const poDir = `${outputDir}/locale/${loc}/LC_MESSAGES/`;
    const poFile = `${poDir}app.po`;
    shell.mkdir("-p", poDir);
    const isFile = fs.existsSync(poFile) && fs.lstatSync(poFile).isFile();
    if (isFile) {
      await execShellCommand(`msgmerge --lang=${loc} --update ${poFile} ${templatePotPath} || break`);
    } else {
      await execShellCommand(
        `msginit --no-translator --locale=${loc} --input=${templatePotPath} --output-file=${poFile} || break`
      );
      shell.chmod("666", poFile);
      await execShellCommand(`msgattrib --no-wrap --no-obsolete -o ${poFile} ${poFile} || break`);
    }
  });
})();
