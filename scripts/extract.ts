import chalk from "chalk";
import fs from "node:fs";
import { MsgInfo, makePO, parseSrc } from "../src/extract/parser.js";
import { GettextConfigOptions } from "../src/typeDefs.js";

import PO from "pofile";

export async function extractAndCreatePOT(filePaths: string[], potPath: string, config: GettextConfigOptions) {
  const fileMsgMap: { path: string; msgs: MsgInfo[] }[] = [];

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

      const msgs = parseSrc(buffer, {
        mapping: config.input?.parserOptions?.mapping,
        overrideDefaults: config.input?.parserOptions?.overrideDefaultKeywords,
      });

      fileMsgMap.push({ path: fp, msgs });
    }),
  );

  const pot = new PO();
  pot.headers["Content-Type"] = "text/plain; charset=UTF-8";

  // sorting makes order more deterministic and prevents unnecessary source diffs
  fileMsgMap.sort((a, b) => a.path.localeCompare(b.path));
  fileMsgMap.forEach((m) => {
    const po = makePO(m.path, m.msgs);
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
  });

  try {
    fs.writeFileSync(potPath, pot.toString());
  } catch (err) {
    console.error(err);
  }

  console.info(`${chalk.green("Extraction successful")}, ${chalk.blueBright(potPath)} created.`);
}
