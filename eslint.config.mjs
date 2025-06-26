import eslint from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  comments.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      importPlugin.flatConfigs.electron,
    ],
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNever: true, // Allow template expressions with 'never' type for exhaustive checks
        },
      ],
      "import/no-unresolved": "error",
      "import/no-default-export": "error",
      "import/order": "error",
      "import/no-named-as-default": "off",
      "@eslint-community/eslint-comments/require-description": "error",
      "object-shorthand": "warn",
      "no-console": [
        "error",
        {
          allow: ["info", "error", "warn"],
        },
      ],
    },
  },
  {
    files: ["**/*.config.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["eslint.config.mjs", ".prettierrc.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: [".vite", "postcss.config.js"],
  },
);
