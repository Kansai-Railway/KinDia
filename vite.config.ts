import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [
    {
      name: "inline-public-svg",
      transformIndexHtml(html) {
        return html.replace(
          /src="\/img\/([^"]+\.svg)"/g,
          (_, file) => {
            const filePath = path.resolve("public/img", file);
            if (!fs.existsSync(filePath)) return _;
            const svg = fs.readFileSync(filePath, "utf8");
            const base64 = Buffer.from(svg).toString("base64");
            return `src="data:image/svg+xml;base64,${base64}"`;
          }
        );
      },
    },
  ],
});
