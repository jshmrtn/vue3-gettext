import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { cwd } from "process";
import { execSync } from "child_process";

describe("config format tests", () => {
  type WithTempDirTest = (tmpDir: string) => Promise<any>;

  const withTempDir = async (testFunc: WithTempDirTest) => {
    let tmpDir;
    try {
      tmpDir = await mkdtemp(join(tmpdir(), "vue3-gettext-"));
      await testFunc(tmpDir);
    } finally {
      if (tmpDir) {
        await rm(tmpDir, { recursive: true, force: true });
      }
    }
  };

  const testConfigWithExtract = async (tmpDir: string, config: string, configFileName: string, isModule: boolean) => {
    const packageJson = {
      name: "test",
      version: "0.0.1",
      type: isModule ? "module" : "commonjs",
    };
    for (const d of ["src", "scripts", "node_modules"]) {
      await symlink(join(cwd(), d), join(tmpDir, d));
    }
    await writeFile(join(tmpDir, "package.json"), JSON.stringify(packageJson));
    await writeFile(join(tmpDir, configFileName), config);
    await mkdir(join(tmpDir, "srctest", "lang"), { recursive: true });
    await writeFile(
      join(tmpDir, "srctest", "example.js"),
      `
const { $gettext } = useGettext();
$gettext('Translate me');
`,
    );
    execSync(`sh -c 'cd ${tmpDir}; ts-node ./scripts/gettext_extract.ts'`);
    const appEnPo = (await readFile(join(tmpDir, "srctest", "lang", "en", "app.po"))).toString();
    const appEnPoLines = appEnPo.trim().split("\n");
    expect(appEnPoLines).toContain('msgid "Translate me"');
    expect(appEnPoLines[appEnPoLines.length - 1]).toEqual('msgstr "Translate me"');
    const appFrPo = (await readFile(join(tmpDir, "srctest", "lang", "fr", "app.po"))).toString();
    const appFrPoLines = appFrPo.trim().split("\n");
    expect(appFrPoLines).toContain('msgid "Translate me"');
    expect(appFrPoLines[appFrPoLines.length - 1]).toEqual('msgstr ""');
  };

  it("load a commonjs format", async () => {
    await withTempDir(
      async (tmpDir) =>
        await testConfigWithExtract(
          tmpDir,
          `
module.exports = {
  input: {
    path: './srctest',
  },
  output: {
    path: './srctest/lang',
    locales: ['en', 'fr'],
  },
};`,
          "gettext.config.js",
          false,
        ),
    );
  });
  it("load an ESM format", async () => {
    await withTempDir(
      async (tmpDir) =>
        await testConfigWithExtract(
          tmpDir,
          `
export default {
  input: {
    path: './srctest',
  },
  output: {
    path: './srctest/lang',
    locales: ['en', 'fr'],
  },
};`,
          "gettext.config.js",
          true,
        ),
    );
  });
  it("output without locations", async () => {
    await withTempDir(async (tmpDir) => {
      await testConfigWithExtract(
        tmpDir,
        `
export default {
  input: {
    path: './srctest',
  },
  output: {
    path: './srctest/lang',
    locales: ['en', 'fr'],
    locations: false,
  },
};`,
        "gettext.config.js",
        true,
      );
      const appEnPo = (await readFile(join(tmpDir, "srctest", "lang", "en", "app.po"))).toString();
      expect(appEnPo).not.toContain("#:");
    });
  });
});
