import { defineConfig } from "vite";
import postcssEach from "postcss-each";
import pkg from "./package.json"; // Import your package.json

// Define your banner template
// Note: We use /*! to ensure minifiers don't strip the comment
const banner = `/*!
 * @name ${pkg.name}
 * @version ${pkg.version}
 * @description ${pkg.description}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */
`;

export default defineConfig({
  server: {
    port: 3006,
  },
  css: {
    postcss: {
      plugins: [postcssEach({})],
    },
  },
  plugins: [
    // Custom plugin to inject the banner into CSS
    {
      name: "banner-plugin",
      renderChunk(code) {
        return banner + code;
      },
      generateBundle(options, bundle) {
        for (const [fileName, asset] of Object.entries(bundle)) {
          if (fileName.endsWith(".css")) {
            asset.source = banner + asset.source;
          }
        }
      },
    },
  ],
  build: {
    manifest: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Rollup native banner for JS files
        banner: banner,
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
