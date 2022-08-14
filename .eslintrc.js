module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
      "class-methods-use-this": "off",
      "no-underscore-dangle": "off",
      "no-unused-vars": [
        "error",{ "ignoreRestSiblings": true, "argsIgnorePattern": "^_" }
      ],
      'import/prefer-default-export':'off',
      'linebreak-style': 0,
    }
};
