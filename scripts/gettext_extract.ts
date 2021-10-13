// import { Command } from "commander";
import fs from "fs";
import glob from "glob";
import path from "path";

import { loadConfig } from "./config";
import { execShellCommand } from "./utils";

// const program = new Command();
// program
//   .option("-c, --config [path]", "path to the config file", "gettext.config.js")
//   .option("-l, --locales <locales...>", "list of locales", ["en"]);
// console.log(process.argv);
// program.parse(process.argv);
//
// console.log(program.opts());
const { srcDir, outDir, locales, flat, srcPatterns, excludePatterns, potName } = loadConfig();

// const potFileNameIndex = process.argv.indexOf("--pot-file");
// let potFileName = "messages.pot";
// if (potFileNameIndex > -1) {
//   potFileName = process.argv[potFileNameIndex + 1];
// }
//
// const localesIndex = process.argv.indexOf("--locales");
// let locales = ["en_US"];
// if (localesIndex > -1) {
//   locales = process.argv[localesIndex + 1].split(",").map((l) => l.trim());
// }

const globPromise = (pattern: string) =>
  new Promise((resolve, reject) => {
    try {
      glob(pattern, {}, (er, res) => {
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });

var getFiles = async () => {
  const allFiles = await Promise.all(
    srcPatterns.map((pattern) => {
      const searchPath = path.join(srcDir, pattern);
      console.log(`Searching: ${searchPath}`);
      return globPromise(searchPath) as Promise<string[]>;
    }),
  );
  const excludeFiles = await Promise.all(
    excludePatterns.map((pattern) => {
      const searchPath = path.join(srcDir, pattern);
      console.log(`Excluding: ${searchPath}`);
      return globPromise(searchPath) as Promise<string[]>;
    }),
  );
  const filesFlat = allFiles.reduce((prev, curr) => [...prev, ...curr], [] as string[]);
  const excludeFlat = excludeFiles.reduce((prev, curr) => [...prev, ...curr], [] as string[]);
  excludeFlat.forEach((file) => {
    const index = filesFlat.indexOf(file);
    if (index !== -1) {
      filesFlat.splice(index, 1);
    }
  });
  return filesFlat;
};

const potFile = `${outDir}/${potName}`;
console.log(`Source directory: ${srcDir}`);
console.log(`Output directory: ${outDir}`);
console.log(`Output POT file: ${potFile}`);
console.log(`Locales: ${locales}`);

console.log("");

(async () => {
  const files = await getFiles();
  console.log("");

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const extracted = await execShellCommand(
    `gettext-extract --attribute v-translate --output ${potFile} ${files.join(" ")}`,
  );
  fs.chmodSync(potFile, 0o666);
  console.log(extracted);

  for (const loc of locales) {
    const poDir = flat ? `${outDir}/` : `${outDir}/${loc}/`;
    const poFile = flat ? `${poDir}${loc}.po` : `${poDir}app.po`;

    //   options.locales.forEach(async (loc) => {
    //     const poDir = options.flat ? `${options.outDir}/` : `${options.outDir}/${loc}/`;
    //
    //     try {
    //       fs.writeFileSync(potPath, "", { flag: "wx" });
    //     } catch {}
    //     const poFile = options.flat ? `${poDir}${loc}.po` : `${poDir}app.po`;

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
