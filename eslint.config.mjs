import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/"],
  },
  { files: ["src/**/*.{js,mjs,cjs,ts}", "tests/**/*.{js,ts,tsx,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["tests/**/*.{js,ts,tsx,jsx}"],
    ...jest.configs["flat/recommended"].rules,
    "jest/prefer-expect-assertions": "off",
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "comma-dangle": [
        "error",
        {
          arrays: "never",
          objects: "never",
          imports: "never",
          exports: "never",
          functions: "never",
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
];
