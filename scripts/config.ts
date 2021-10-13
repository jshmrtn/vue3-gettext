import { cosmiconfigSync } from "cosmiconfig";
const moduleName = "gettext";

export interface GettextConfig {
  srcDir: string;
  outDir: string;
  locales: string[];
  srcPatterns: string[];
  excludePatterns: string[];
  flat: boolean;
  potName: string;
}

export const loadConfig = (configPath?: string): GettextConfig => {
  const explorer = cosmiconfigSync(moduleName, {
    searchPlaces: [`${moduleName}.config.js`],
  });

  let configRes;
  if (configPath) {
    configRes = explorer.load(configPath);
  } else {
    configRes = explorer.search();
  }

  if (!configRes) {
    throw new Error("No config found. Create a gettext.config.js file in your project.");
  }

  const config = configRes.config;

  return {
    srcDir: config.srcDir || "./src",
    outDir: config.outDir || "./src/language",
    locales: config.locales || ["en"],
    srcPatterns: config.srcPatterns || ["**/*.js", "**/*.ts", "**/*.vue"],
    excludePatterns: config.excludePatterns || [],
    flat: config.flat === undefined ? false : config.flat,
    potName: config.potName || "messages.pot",
  };
};

export const configOptions = [
  // {
  //   flags: "-c, --config [path]",
  //   description: "path to the config file",
  //   defaultValue: "gettext.config.js",
  // },
  {
    flags: "-s, --srcDir [path]",
    description: "path to the source directory",
    defaultValue: "./src",
  },
  {
    flags: "-o, --outDir [path]",
    description: "path to the output directory",
    defaultValue: "./src/language",
  },
  {
    flags: "-l, --locales [locales...]",
    description: "list of locales",
    defaultValue: ["en"],
  },
  {
    flags: "-p, --srcPatterns [patterns...]",
    description: "patterns for input files",
    defaultValue: ["**/*.js", "**/*.ts", "**/*.vue"],
  },
  {
    flags: "-ep, --excludePatterns [patterns...]",
    description: "patterns to exclude files",
    defaultValue: [],
  },
  {
    flags: "-f, --flat",
    description: "extract locale files directly to outDir",
    defaultValue: "false",
  },
  {
    flags: "-p, --potName [file name]",
    description: "sets the file name of the extracted pot file",
    defaultValue: "messages.pot",
  },
];
