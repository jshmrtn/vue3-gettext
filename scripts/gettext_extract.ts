import chalk from "chalk";
import commandLineArgs, { OptionDefinition } from "command-line-args";
import fs from "fs";
import glob from "glob";
import path from "path";
import { loadConfig } from "./config";
import extractFromFiles from "./extract";
import { execShellCommand } from "./utils";
import { GettextConfig } from "../src/typeDefs";

const optionDefinitions: OptionDefinition[] = [{ name: "config", alias: "c", type: String }];
let options;
try {
  options = commandLineArgs(optionDefinitions) as {
    config?: string;
  };
} catch (e) {
  console.error(e);
  process.exit(1);
}

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

var getFiles = async (config: GettextConfig) => {
  const allFiles = await Promise.all(
    config.input?.include.map((pattern) => {
      const searchPath = path.join(config.input.path, pattern);
      console.info(`Searching: ${chalk.blueBright(searchPath)}`);
      return globPromise(searchPath) as Promise<string[]>;
    }),
  );
  const excludeFiles = await Promise.all(
    config.input.exclude.map((pattern) => {
      const searchPath = path.join(config.input.path, pattern);
      console.info(`Excluding: ${chalk.blueBright(searchPath)}`);
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

(async () => {
  const config = await loadConfig(options);
  console.info(`Input directory: ${chalk.blueBright(config.input.path)}`);
  console.info(`Output directory: ${chalk.blueBright(config.output.path)}`);
  console.info(`Output POT file: ${chalk.blueBright(config.output.potPath)}`);
  console.info(`Locales: ${chalk.blueBright(config.output.locales)}`);
  console.info();

  const files = await getFiles(config);
  console.info();
  files.forEach((f) => console.info(chalk.grey(f)));
  console.info();
  await extractFromFiles(files, config.output.potPath, config);

  for (const loc of config.output.locales) {
    const poDir = config.output.flat ? config.output.path : path.join(config.output.path, loc);
    const poFile = config.output.flat ? path.join(poDir, `${loc}.po`) : path.join(poDir, `app.po`);

    fs.mkdirSync(poDir, { recursive: true });
    const isFile = fs.existsSync(poFile) && fs.lstatSync(poFile).isFile();
    if (isFile) {
      await execShellCommand(
        `msgmerge --lang=${loc} --update ${poFile} ${config.output.potPath} ${
          config.output.fuzzyMatching ? "" : "--no-fuzzy-matching"
        } --backup=off`,
      );
      console.info(`${chalk.green("Merged")}: ${chalk.blueBright(poFile)}`);
    } else {
      // https://www.gnu.org/software/gettext/manual/html_node/msginit-Invocation.html
      // msginit will set Plural-Forms header if the locale is in the
      // [embedded table](https://github.com/dd32/gettext/blob/master/gettext-tools/src/plural-table.c#L27)
      // otherwise it will read [$GETTEXTCLDRDIR/common/supplemental/plurals.xml](https://raw.githubusercontent.com/unicode-org/cldr/main/common/supplemental/plurals.xml)
      // so execShellCommand should pass the env(GETTEXTCLDRDIR) to child process
      await execShellCommand(
        `msginit --no-translator --locale=${loc} --input=${config.output.potPath} --output-file=${poFile}`,
      );
      fs.chmodSync(poFile, 0o666);
      await execShellCommand(`msgattrib --no-wrap --no-obsolete -o ${poFile} ${poFile}`);
      console.info(`${chalk.green("Created")}: ${chalk.blueBright(poFile)}`);
    }
  }
  if (config.output.linguas === true) {
    const linguasPath = path.join(config.output.path, "LINGUAS");
    fs.writeFileSync(linguasPath, config.output.locales.join(" "));
    console.info();
    console.info(`${chalk.green("Created")}: ${chalk.blueBright(linguasPath)}`);
  }
})();
