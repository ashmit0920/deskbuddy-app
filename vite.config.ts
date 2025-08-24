import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname, "src/renderer"), // 👈 points to your React app folder
    base: "./",
    build: {
        outDir: path.resolve(__dirname, "dist/renderer"),
        emptyOutDir: true,
    },
    server: {
        port: 5173, // default, can change
    },
});
