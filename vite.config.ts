import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";



// https://vite.dev/config/
export default defineConfig({
  base:'/cornerstone-test-react-vite',
  plugins: [react(),viteCommonjs()],
  resolve: {
    alias: {
      "@viewer":"/viewer",
      "@pages":"/src/pages",
      "@components":"/src/components",
      "@api":"/src/api",
      "@assets":"/src/assets",

    },
  },
  // seems like only required in dev mode
  optimizeDeps: {
    exclude: ["@cornerstonejs/dicom-image-loader"],
    include: ["dicom-parser"],
  },
  worker: {
    format: "es",
    rollupOptions: {
      external: ["@icr/polyseg-wasm"],
    },
  },
})
