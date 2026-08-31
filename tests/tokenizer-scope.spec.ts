import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { extractAndCreatePOT } from "../scripts/extract";
import { parseSrc } from "../src/extract/parser";

describe("gettext tokenizer scope", () => {
  it("extracts messages after unrelated quotes in Vue template text", () => {
    const src = `<template>
  <p>('</p>
  <p>{{ $gettext(\`Hello\`) }}</p>
</template>`;

    expect(parseSrc(src)).toEqual([
      {
        message: "Hello",
        lineNumber: 3,
      },
    ]);
  });

  it("throws for an unterminated gettext string literal", () => {
    expect(() => parseSrc(`$gettext("Hello)`)).toThrowError(
      "parsing error, string literal is not closed until end of file",
    );
  });

  it("preserves existing output when parsing fails", async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), "vue3-gettext-tokenizer-scope-"));
    try {
      const sourcePath = join(tmpDir, "invalid.ts");
      const potPath = join(tmpDir, "messages.pot");
      const existingPot = 'msgid "existing"\nmsgstr ""\n';
      await writeFile(sourcePath, `$gettext("unterminated)`);
      await writeFile(potPath, existingPot);

      await expect(extractAndCreatePOT([sourcePath], potPath, {})).rejects.toThrowError(
        "parsing error, string literal is not closed until end of file",
      );
      await expect(readFile(potPath, "utf8")).resolves.toBe(existingPot);
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });
});
