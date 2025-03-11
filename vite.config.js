import { defineConfig } from "vite";
import postcssEach from "postcss-each";

export default defineConfig({
  server: {
    port: 3006,
  },
  css: {
    postcss: {
      plugins: [postcssEach({})],
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
