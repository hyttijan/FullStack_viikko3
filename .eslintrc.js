module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "error",
        "no-trailing-spaces":"error",
        "object-curly-spacing":[
            "error","always"
        ],
        "arrow-spacing":[
            "error",{"before": true, "after": true}
        ],
        "no-console":0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-unused-vars":[2, {"vars":"local","args":"none"}]
    }
};