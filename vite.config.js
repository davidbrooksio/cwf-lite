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
    cssMinify: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
