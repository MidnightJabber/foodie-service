module.exports = {
  "extends": "airbnb-base",
  "env": {
      "node": true,
      "browser": true,
      "es6": true,
      "mocha": true
  },
  "settings": {
      "import/resolver": {
          "webpack": {
              "config": "webpack.config.js"
          }
      }
  },
  "rules": {
    //   "indent": [
    //       2,
    //       4
    //   ],
    //   "comma-dangle": [
    //       "error", 
    //       "never"
    //   ],
    //   "no-unused-vars": [
    //       "error", 
    //       {
    //           "vars": "local", 
    //           "args": "none" 
    //       }
    //   ],
    //   "arrow-parens": [
    //       2, 
    //       "as-needed"
    //   ],
    //   "no-shadow": "off",
      "consistent-return": "off",
      "arrow-parens": "off",
    //   "prefer-promise-reject-errors": "off",
    //   "arrow-body-style": "off",
    //   "import/no-named-as-default-member": "off",
    //   "no-param-reassign": "off",
    //   "linebreak-style": "off",
    //   "padded-blocks": "off"
  }
};