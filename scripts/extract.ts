import chalk from "chalk";
import fs from "node:fs";
import { makePO, parseSrc } from "../src/parser.js";
import { GettextConfigOptions } from "../src/typeDefs.js";

import PO from "pofile";

const extractFromFiles = async (filePaths: string[], potPath: string, config: GettextConfigOptions) => {
  const pot = new PO();

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

      const msgs = parseSrc(buffer);

      const po = makePO(fp, msgs);
      // TODO: merge items before building po
      for (const i of po.items) {
        const prevItem = pot.items.find(
          (pi) => pi.msgid === i.msgid && pi.msgid_plural === i.msgid_plural && pi.msgctxt === i.msgctxt,
        );

        if (prevItem) {
          prevItem.references.push(...i.references);
        } else {
          pot.items.push(i);
        }
      }
    }),
  );

  try {
    fs.writeFileSync(potPath, pot.toString());
  } catch (err) {
    console.error(err);
  }

  console.info(`${chalk.green("Extraction successful")}, ${chalk.blueBright(potPath)} created.`);
};
export default extractFromFiles;
