// eslint.config.mts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript base rules
  js.configs.recommended,

  // TypeScript with type-aware rules
  ...tseslint.configs.recommendedTypeChecked,

  // Next.js Core Web Vitals
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"], // enables type-aware linting
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      prettier, // add Prettier plugin
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...prettier.configs.recommended.rules, // Prettier recommended rules
    },
  },

  // JSON linting
  {
    files: ["**/*.json"],
    ...json.configs.recommended,
  },

  // Markdown linting
  {
    files: ["**/*.md"],
    ...markdown.configs.recommended,
  },

  // CSS linting
  {
    files: ["**/*.css"],
    ...css.configs.recommended,
  },
]);
