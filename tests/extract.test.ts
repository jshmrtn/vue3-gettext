import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { cwd } from "process";
import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("Extractor Script Tests", () => {
  type WithTempDirTest = (tmpDir: string) => Promise<any>;

  // This helper function is copied directly from config.test.ts
  const withTempDir = async (testFunc: WithTempDirTest) => {
    let tmpDir;
    try {
      tmpDir = await mkdtemp(join(tmpdir(), "vue3-gettext-extract-"));
      await testFunc(tmpDir);
    } finally {
      if (tmpDir) {
        await rm(tmpDir, { recursive: true, force: true });
      }
    }
  };

  it("should correctly extract a message from a $gettext call with a trailing comma", async () => {
    await withTempDir(async (tmpDir) => {
      // 1. Setup the project structure inside the temp directory
      for (const d of ["src", "scripts", "node_modules"]) {
        await symlink(join(cwd(), d), join(tmpDir, d));
      }
      await writeFile(join(tmpDir, "package.json"), JSON.stringify({ name: "test", type: "commonjs" }));

      await writeFile(
        join(tmpDir, "gettext.config.js"),
        `module.exports = { input: { path: './srctest' }, output: { path: './srctest/lang' } };`,
      );

      await mkdir(join(tmpDir, "srctest", "lang"), { recursive: true });
      await writeFile(
        join(tmpDir, "srctest", "MultiLineLiteralWithComma.js"),
        `
          const myText = $gettext(
            \`This is a multiline template literal,
              That previously caused a crash in extraction.\`,
          );
        `,
      );

      execSync(`sh -c 'cd ${tmpDir}; tsx ./scripts/gettext_extract.ts'`);

      // Verify that the output .pot file is correct.
      const potContent = (await readFile(join(tmpDir, "srctest", "lang", "messages.pot"))).toString();
      console.debug(potContent);
      expect(potContent).toContain(
        'msgid ""\n' +
          '"This is a multiline template literal,\\n"\n' +
          '"              That previously caused a crash in extraction."\n',
      );
      expect(potContent).toContain("#: srctest/MultiLineLiteralWithComma.js:2");
    });
  });
});
