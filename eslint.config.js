import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
    { ignores: ["node_modules", "dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.es2021,
                ...globals.browser,
            },
            parserOptions: eslintReact.configs.recommended,
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react: eslintReact,
            // prettier: prettierPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            ...reactHooks.configs.recommended.rules,
        },
    }
);
