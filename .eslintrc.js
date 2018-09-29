// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'operator-linebreak': ["error", "before"],
    'eol-last': 0,
    'global-require': 0,
    'linebreak-style': 0,
    'semi': ["error", "never"],
    'no-underscore-dangle': 0,
    'space-before-function-paren': [0, "always"],
    "keyword-spacing": 0,
    'indent': [2, 4, { "SwitchCase": 1 }],
    'no-new': 0,
    'no-console': 0,
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }],
    'no-param-reassign': ["error", { "props": false }],
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    // http://eslint.org/docs/rules/no-restricted-properties
    'no-restricted-properties': 0,
    'no-bitwise': ["error", { "allow": ["&", "|"] }],
    'no-control-regex': 0,
    'no-useless-escape': 0,

    // es6
    'no-confusing-arrow': ["error", {"allowParens": true}],

    // import
    'import/no-unresolved': 0,
    'import/extensions': [2, 'never', { "less": "always", "css": "always","jpg": "always", "png": "always" }],
    'import/first': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
