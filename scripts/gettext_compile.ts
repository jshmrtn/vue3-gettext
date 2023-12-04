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

(async () => {
  const config = await loadConfig(options);
  console.info(`Language directory: ${chalk.blueBright(config.output.path)}`);
  console.info(`Locales: ${chalk.blueBright(config.output.locales)}`);
  console.info();
  const localesPaths = config.output.locales.map((loc) =>
    config.output.flat ? path.join(config.output.path, `${loc}.po`) : path.join(config.output.path, `${loc}/app.po`),
  );

  await fsPromises.mkdir(config.output.path, { recursive: true });
  const jsonRes = await compilePoFiles(localesPaths);
  console.info(`${chalk.green("Compiled json")}: ${chalk.grey(JSON.stringify(jsonRes))}`);
  console.info();
  if (config.output.splitJson) {
    await Promise.all(
      config.output.locales.map(async (locale) => {
        const outputPath = path.join(config.output.jsonPath, `${locale}.json`);
        await fsPromises.writeFile(
          outputPath,
          JSON.stringify({
            [locale]: jsonRes[locale],
          }),
        );
        console.info(`${chalk.green("Created")}: ${chalk.blueBright(outputPath)}`);
      }),
    );
  } else {
    const outputPath = config.output.jsonPath;
    await fsPromises.writeFile(outputPath, JSON.stringify(jsonRes));
    console.info(`${chalk.green("Created")}: ${chalk.blueBright(outputPath)}`);
  }
})();
