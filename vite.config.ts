import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    viteSingleFile(),
    {
      name: "inline-public-svg",
      transformIndexHtml(html) {
        return html.replace(
          /src="\/img\/([^"]+\.svg)"/g,
          (_, file) => {
            const svg = fs.readFileSync(
              path.resolve("public/img", file),
              "utf8"
            );
            return `src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}"`;
          }
        );
      },
    },
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
});
