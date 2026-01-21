import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 100000000, // 画像・フォント全部base64
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // JSを1本に
      },
    },
  },
});
