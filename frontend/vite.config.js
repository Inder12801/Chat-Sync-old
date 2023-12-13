import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_SERVER_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
//"http://localhost:5000"
