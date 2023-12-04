import { cosmiconfig } from "cosmiconfig";
import path from "path";
import { GettextConfig, GettextConfigOptions } from "../src/typeDefs";

export const loadConfig = async (cliArgs?: { config?: string }): Promise<GettextConfig> => {
  const moduleName = "gettext";
  const explorer = cosmiconfig(moduleName);

  let configRes;
  if (cliArgs?.config) {
    configRes = await explorer.load(cliArgs.config);
    if (!configRes) {
      throw new Error(`Config not found: ${cliArgs.config}`);
    }
  } else {
    configRes = await explorer.search();
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
      jsExtractorOpts: config.input?.jsExtractorOpts,
      compileTemplate: config.input?.compileTemplate || false,
    },
    output: {
      path: languagePath,
      potPath: joinPathIfRelative(config.output?.potPath) || joinPath("./messages.pot"),
      jsonPath:
        joinPathIfRelative(config.output?.jsonPath) ||
        (config.output?.splitJson ? joinPath("./") : joinPath("./translations.json")),
      locales: config.output?.locales || ["en"],
      flat: config.output?.flat === undefined ? false : config.output.flat,
      linguas: config.output?.linguas === undefined ? true : config.output.linguas,
      splitJson: config.output?.splitJson === undefined ? false : config.output.splitJson,
    },
  };
};
