import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: "/",
        server: {
            port: 80,
            host: true,
            proxy: {
                "/api": {
                    target: "http://localhost:8000",
                },
                "/images/": {
                    target: "http://localhost:9000/",
                },
            },
        },
        plugins: [react(), tsconfigPaths()],
        test: {
            coverage: {
                reporter: ["text", "json-summary", "json"],
                reportOnFailure: true,
            },
        },
    });
};
