import { parse } from "@vue/compiler-sfc";
import chalk from "chalk";
import fs from "fs";
import { GettextExtractor, HtmlExtractors, JsExtractors } from "gettext-extractor";
import { attributeEmbeddedJsExtractor } from "./attributeEmbeddedJsExtractor";
import { embeddedJsExtractor } from "./embeddedJsExtractor";

const extractFromFiles = async (filePaths: string[], potPath: string) => {
  const extr = new GettextExtractor();

  const jsParser = extr.createJsParser([
    JsExtractors.callExpression(["$gettext", "[this].$gettext"], {
      content: {
        replaceNewLines: "\n",
      },
      arguments: {
        text: 0,
      },
    }),
    JsExtractors.callExpression(["$ngettext", "[this].$ngettext"], {
      content: {
        replaceNewLines: "\n",
      },
      arguments: {
        text: 0,
        textPlural: 1,
      },
    }),
    JsExtractors.callExpression(["$pgettext", "[this].$pgettext"], {
      content: {
        replaceNewLines: "\n",
      },
      arguments: {
        context: 0,
        text: 1,
      },
    }),
    JsExtractors.callExpression(["$npgettext", "[this].$npgettext"], {
      content: {
        replaceNewLines: "\n",
      },
      arguments: {
        context: 0,
        text: 1,
        textPlural: 2,
      },
    }),
  ]);

  const htmlParser = extr.createHtmlParser([
    HtmlExtractors.elementContent("translate, [v-translate]", {
      content: {
        trimWhiteSpace: true,
        // TODO: figure out newlines for component
        replaceNewLines: " ",
      },
      attributes: {
        textPlural: "translate-plural",
        context: "translate-context",
        comment: "translate-comment",
      },
    }),
    attributeEmbeddedJsExtractor("[*=*]", jsParser),
    embeddedJsExtractor("*", jsParser),
  ]);

  await Promise.all(
    filePaths.map(async (fp) => {
      const buffer: string = await new Promise((res, rej) =>
        fs.readFile(fp, "utf-8", (err, data) => {
          if (err) {
            rej(err);
          }
          res(data);
        }),
      );
      // TODO: make file extensions and parsers configurable
      if (fp.endsWith(".vue")) {
        const { descriptor, errors } = parse(buffer, {
          filename: fp,
          sourceRoot: process.cwd(),
        });
        if (errors.length > 0) {
          errors.forEach((e) => console.error(e));
        }
        if (descriptor.template) {
          htmlParser.parseString(descriptor.template.content, descriptor.filename, {
            lineNumberStart: descriptor.template.loc.start.line,
          });
        }
        if (descriptor.script) {
          jsParser.parseString(descriptor.script.content, descriptor.filename, {
            lineNumberStart: descriptor.script.loc.start.line,
          });
        }
      } else if (fp.endsWith(".html")) {
        htmlParser.parseString(buffer, fp);
      } else if (fp.endsWith(".js") || fp.endsWith(".ts") || fp.endsWith(".cjs") || fp.endsWith(".mjs")) {
        jsParser.parseString(buffer, fp);
      }
    }),
  );

  extr.savePotFile(potPath);
  console.info(`${chalk.green("Extraction successful")}, ${chalk.blueBright(potPath)} created.`);

  extr.printStats();
};
export default extractFromFiles;
