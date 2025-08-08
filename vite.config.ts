import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: "/",
        server: {
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
    });
};
