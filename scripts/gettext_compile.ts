import chalk from "chalk";
import commandLineArgs, { OptionDefinition } from "command-line-args";
import fsPromises from "fs/promises";
import path from "path";
import { compilePoFiles } from "./compile";
import { loadConfig } from "./config";

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

const config = loadConfig(options);

console.info(`Language directory: ${chalk.blueBright(config.output.path)}`);
console.info(`Locales: ${chalk.blueBright(config.output.locales)}`);
console.info();

const localesPaths = config.output.locales.map((loc) =>
  config.output.flat ? path.join(config.output.path, `${loc}.po`) : path.join(config.output.path, `${loc}/app.po`),
);

(async () => {
  await fsPromises.mkdir(config.output.path, { recursive: true });
  const outputPath = config.output.jsonPath;
  const jsonRes = JSON.stringify(await compilePoFiles(localesPaths));
  console.info(`${chalk.green("Compiled json")}: ${chalk.grey(jsonRes)}`);
  await fsPromises.writeFile(outputPath, jsonRes);
  console.info();
  console.info(`${chalk.green("Created")}: ${chalk.blueBright(outputPath)}`);
})();
