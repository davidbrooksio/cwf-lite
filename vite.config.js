import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import postcssEach from "postcss-each";
import postcssCalc from "postcss-calc";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssEach({}),
        postcssCalc({}),
        postcssPresetEnv({ stage: 0 }),
      ],
    },
  },
  build: {
    manifest: true,
    cssMinify: "lightningcss",
  },
});
