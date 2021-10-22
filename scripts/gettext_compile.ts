import commandLineArgs, { OptionDefinition } from "command-line-args";
import path from "path";
import { loadConfig } from "./config";
import { execShellCommand } from "./utils";

const fs = require("fs");

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

console.info(`Language directory: ${config.output.path}`);
console.info(`Locales: ${config.output.locales}`);
console.info("");

const localesPaths = config.output.locales
  .map((loc) =>
    config.output.flat ? path.join(config.output.path, `${loc}.po`) : path.join(config.output.path, `${loc}/app.po`),
  )
  .join(" ");

(async () => {
  fs.mkdirSync(config.output.path, { recursive: true });
  const outputPath = config.output.jsonPath;
  await execShellCommand(`gettext-compile --output ${outputPath} ${localesPaths}`);
  console.info(`Created: ${outputPath}`);
})();
