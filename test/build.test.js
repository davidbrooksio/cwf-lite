import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import postcss from "postcss";
import pkg from "../package.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

let css;
let js;

beforeAll(() => {
  // `npm test` runs `npm run build` first via the "pretest" script, so the
  // dist/ output here always reflects the current source.
  css = readFileSync(resolve(distDir, "index.css"), "utf-8");
  js = readFileSync(resolve(distDir, "index.js"), "utf-8");
});

describe("build output", () => {
  it("produces the expected dist files", () => {
    expect(existsSync(resolve(distDir, "index.css"))).toBe(true);
    expect(existsSync(resolve(distDir, "index.js"))).toBe(true);
  });

  it("is non-trivial in size", () => {
    expect(css.length).toBeGreaterThan(10_000);
    expect(js.length).toBeGreaterThan(0);
  });

  it("prepends a banner with the current package metadata", () => {
    expect(css).toContain(`@name ${pkg.name}`);
    expect(css).toContain(`@version ${pkg.version}`);
    expect(css).toContain(`@license ${pkg.license}`);
  });

  it("is valid, parseable CSS", () => {
    expect(() => postcss.parse(css)).not.toThrow();
  });

  it("does not leak unprocessed postcss-each template syntax", () => {
    // Every utility file uses `@each` loops with `$(name)` placeholders;
    // if postcss-each ever stops running, these would show up verbatim
    // in the built output instead of being expanded.
    expect(css).not.toMatch(/@each\s/);
    expect(css).not.toMatch(/\$\([a-zA-Z0-9_-]+\)/);
  });

  it("does not leak raw @import statements (all partials get inlined)", () => {
    expect(css).not.toMatch(/@import/);
  });
});
