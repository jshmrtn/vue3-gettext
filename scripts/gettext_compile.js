#!/usr/bin/env node

"use strict";

const shell = require("shelljs");
const outputDir = "./dev";
const locales = ["en_GB", "fr_FR", "it_IT"];
const fs = require("fs");

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

function trimData(data) {
  Object.keys(data).forEach((lang) => {
    const langData = data[lang];
    const newData = {};
    Object.keys(langData).forEach((key) => {
      const oldKey = key;
      newData[
        key
          .replace(/\r?\n|\r/, "")
          .replace(/\s\s+/g, " ")
          .trim()
      ] = langData[oldKey];
    });
    data[lang] = newData;
  });
}

(async () => {
  shell.mkdir("-p", outputDir);
  const compile = await execShellCommand(`gettext-compile --output ${outputDir}/translations.json ${outputPath}`);

  // TODO: only required when msgids cannot be extracted on runtime (trim double spaces, newlines)
  // fs.readFile(`${outputDir}/translations.json`, "utf8", function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   data = JSON.parse(data);
  //   trimData(data);
  //   fs.writeFile(`${outputDir}/translations.json`, JSON.stringify(data), function (err) {
  //     if (err) return console.log(err);
  //     console.log("Hello World > helloworld.txt");
  //   });
  // });
})();
