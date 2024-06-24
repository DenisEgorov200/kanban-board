const {
  configure,
  presets
} = require("eslint-kit");

module.exports = configure({
    allowDebug: process.env.NODE_ENV !== "production",

    include: ["vite.config.ts", ".eslintrc.cjs"],

    parserOptions: {
      project:  ['./tsconfig.json', './tsconfig.node.json'],
      tsconfigRootDir: __dirname,
    },

    presets: [
        presets.imports(),
        presets.node(),
        presets.prettier(),
        presets.typescript(),
        presets.react()
    ],

    rules: {
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        }
      ]
    },
      
    settings: {
      'import/resolver': {
        alias: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          map: [
            ['@', './src'],
          ],
        },
      },
    },
});