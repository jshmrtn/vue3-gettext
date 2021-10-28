import { GettextExtractor, HtmlExtractors, JsExtractors } from "gettext-extractor";
import { parse } from "@vue/compiler-sfc";
import fs from "fs";
import chalk from "chalk";

const extractFromFiles = async (filePaths: string[], potPath: string) => {
  const extr = new GettextExtractor();

  const htmlParser = extr.createHtmlParser([
    HtmlExtractors.elementContent("translate, [v-translate]", {
      attributes: {
        textPlural: "translate-plural",
        context: "translate-context",
        comment: "translate-comment",
      },
    }),
  ]);

  const jsParser = extr.createJsParser([
    JsExtractors.callExpression("$gettext", {
      arguments: {
        text: 0,
      },
    }),
    JsExtractors.callExpression("$ngettext", {
      arguments: {
        text: 0,
        textPlural: 1,
      },
    }),
    JsExtractors.callExpression("$pgettext", {
      arguments: {
        context: 0,
        text: 1,
      },
    }),
    JsExtractors.callExpression("$npgettext", {
      arguments: {
        context: 0,
        text: 1,
        textPlural: 2,
      },
    }),
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
