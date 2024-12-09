import { defineConfig } from "vite";
import postcssEach from "postcss-each";
import postCssNested from "postcss-nested";

export default defineConfig({
  css: {
    postcss: {
      plugins: [postCssNested({}), postcssEach({})],
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
