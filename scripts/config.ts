import { cosmiconfigSync } from "cosmiconfig";
import path from "path";
import TypeScriptLoader from "@endemolshinegroup/cosmiconfig-typescript-loader";
import { GettextConfig, GettextConfigOptions } from "../src/typeDefs";

export const loadConfig = (cliArgs?: { config?: string }): GettextConfig => {
  const moduleName = "gettext";
  const explorer = cosmiconfigSync(moduleName, {
    searchPlaces: [`${moduleName}.config.ts`, `${moduleName}.config.js`],
    loaders: {
      ".ts": TypeScriptLoader,
    },
  });

  let configRes;
  if (cliArgs?.config) {
    configRes = explorer.load(cliArgs.config);
    if (!configRes) {
      throw new Error(`Config not found: ${cliArgs.config}`);
    }
  } else {
    configRes = explorer.search();
  }

  const config = configRes?.config as GettextConfigOptions;

  const languagePath = config.output?.path || "./src/language";
  const joinPath = (inputPath: string) => path.join(languagePath, inputPath);
  const joinPathIfRelative = (inputPath?: string) => {
    if (!inputPath) {
      return undefined;
    }
    return path.isAbsolute(inputPath) ? inputPath : path.join(languagePath, inputPath);
  };
  return {
    input: {
      path: config.input?.path || "./src",
      include: config.input?.include || ["**/*.js", "**/*.ts", "**/*.vue"],
      exclude: config.input?.exclude || [],
    },
    output: {
      path: languagePath,
      potPath: joinPathIfRelative(config.output?.potPath) || joinPath("./messages.pot"),
      jsonPath: joinPathIfRelative(config.output?.jsonPath) || joinPath("./translations.json"),
      locales: config.output?.locales || ["en"],
      flat: config.output?.flat === undefined ? false : config.output?.flat,
      linguas: config.output?.linguas === undefined ? true : config.output?.linguas,
    },
  };
};
