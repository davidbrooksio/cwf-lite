import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let css;

beforeAll(() => {
  // Relies on the "pretest" script having run `npm run build` first.
  css = readFileSync(resolve(__dirname, "../dist/index.css"), "utf-8");
});

describe("bases", () => {
  it.each(["html", "body", "hr", ".h1", ".h2"])("styles the %s base element", (selector) => {
    expect(css).toContain(selector);
  });

  it("defines the grid column system", () => {
    expect(css).toContain(".column-span--1");
    expect(css).toContain(".column-span--12");
    expect(css).toContain(".column-start--1");
  });
});

describe("modules", () => {
  it.each([".button", ".alert", "card__body", "card__header", ".nav__item"])(
    "defines the %s module class",
    (selector) => {
      expect(css).toContain(selector);
    }
  );
});

describe("utilities", () => {
  it("generates spacing utilities across the full size scale (0-9)", () => {
    for (let i = 0; i <= 9; i++) {
      expect(css).toContain(`.margin--${i}`);
      expect(css).toContain(`.padding--${i}`);
    }
  });

  it("generates responsive breakpoint variants", () => {
    // xs, sm, md, rg, lg, xl breakpoints defined in utilities/margin.css etc.
    for (const bp of ["xs", "sm", "md", "rg", "lg", "xl"]) {
      expect(css).toContain(`.margin--${bp}-4`);
      expect(css).toContain(`.display--${bp}-block`);
    }
  });

  it("generates negative margin modifiers", () => {
    expect(css).toContain(".margin--negative");
  });

  it("defines display utility values", () => {
    for (const value of ["block", "flex", "grid", "inline", "none"]) {
      expect(css).toContain(`.display--${value}`);
    }
  });
});
