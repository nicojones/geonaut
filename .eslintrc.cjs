const ESLINT_ERROR_TYPE /* "error" | "warn" */ = "error";

module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:react/jsx-runtime",
    "plugin:cypress/recommended",
  ],
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"], // Specify it only for TypeScript files
  },
  plugins: [
    "react",
    "unused-imports",
    "cypress",
    "simple-import-sort",
    "@typescript-eslint",
    "n",
  ],
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      flowVersion: "0.53", // Flow version
    },
  },
  rules: {
    indent: "off",
    "@typescript-eslint/indent": [ESLINT_ERROR_TYPE, 2],
    quotes: "off",
    "@typescript-eslint/comma-dangle": [ESLINT_ERROR_TYPE, "always-multiline"],
    "comma-dangle": [ESLINT_ERROR_TYPE, "always-multiline"],
    "@typescript-eslint/quotes": [ESLINT_ERROR_TYPE, "double", { avoidEscape: true }],
    "member-delimiter-style": "off",
    "@typescript-eslint/member-delimiter-style": [ESLINT_ERROR_TYPE, {
      multiline: {
        delimiter: "semi",
        requireLast: true,
      },
      singleline: {
        delimiter: "semi",
        requireLast: true,
      },
      overrides: {
        interface: {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
        },
      },
    }],
    "react/jsx-curly-spacing": [ESLINT_ERROR_TYPE, {
      when: "never",
      attributes: { allowMultiline: true },
      children: true,
    }],
    semi: "off",
    "@typescript-eslint/no-invalid-void-type": ["off"],
    "@typescript-eslint/semi": [ESLINT_ERROR_TYPE, "always"],
    "explicit-function-return": "off",
    "@typescript-eslint/explicit-function-return": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-non-null-assertion": ["warn"],
    "unused-imports/no-unused-imports": ESLINT_ERROR_TYPE,
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-confusing-void-expression": ["off", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description" }],
    "react/jsx-no-constructed-context-values": ESLINT_ERROR_TYPE,
    "react/jsx-closing-bracket-location": ESLINT_ERROR_TYPE,
    "react/jsx-closing-tag-location": ESLINT_ERROR_TYPE,
    "react/jsx-curly-brace-presence": [ESLINT_ERROR_TYPE, { propElementValues: "always", props: "never", children: "never" }],
    "react/jsx-curly-newline": [ESLINT_ERROR_TYPE, "consistent"],
    "react/jsx-equals-spacing": ESLINT_ERROR_TYPE,
    "react/jsx-first-prop-new-line": ESLINT_ERROR_TYPE,
    "n/no-callback-literal": "off",
    "no-shadow": ESLINT_ERROR_TYPE,
    // "eslint multiline-comment-style": [ESLINT_ERROR_TYPE, "starred-block"],
    "no-restricted-imports": [ // imports must be absolute path
      ESLINT_ERROR_TYPE,
      {
        patterns: [
          {
            group: ["../"], // "./import" is allowed
            message: "Relative imports are only allowed for elements in the same folder.",
          },
        ],
      },
    ],

    "max-len": ["warn", {
      code: 120, // Adjust this value to your preferred maximum line length
      ignoreComments: true, // Optionally, you can ignore comments
      ignoreTrailingComments: true, // Optionally, ignore trailing comments
      ignoreUrls: true, // Optionally, ignore URLs
      ignoreStrings: true, // Optionally, ignore string literals
      ignoreTemplateLiterals: true, // Optionally, ignore template literals
    }],
    "react/self-closing-comp": [ESLINT_ERROR_TYPE, {
      component: true,
      html: false,
    }],
    "@typescript-eslint/explicit-function-return-type": ESLINT_ERROR_TYPE,
    "simple-import-sort/imports": ESLINT_ERROR_TYPE,
    "no-restricted-syntax": [
      ESLINT_ERROR_TYPE,
      {
        selector: "TSEnumDeclaration",
        message: "No Enums are allowed. Use `const myEnum = { ... } as const` instead",
      },
    ],

  },
  ignorePatterns: ["./cypress/**", "cypress*"],
  overrides: [
    {
      //     // enable the rule specifically for TypeScript files

      files: ["*.ts", "*.mts", "*.cts", "*.tsx"],
      rules: {
      },
    },
  ],
};
