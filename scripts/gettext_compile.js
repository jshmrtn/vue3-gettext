#!/usr/bin/env node

"use strict";

const shell = require("shelljs");
const outputDir = "./dev";
const locales = ["en_GB", "fr_FR", "it_IT"];

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

const outputPath = locales.map((loc) => `${outputDir}/locale/${loc}/LC_MESSAGES/app.po`).join(" ");

(async () => {
  shell.mkdir("-p", outputDir);
  const compile = await execShellCommand(`gettext-compile --output ${outputDir}/translations.json ${outputPath}`);
  console.log(compile);
})();
