module.exports = {
    // Mark this as the root config file so that eslint does not traverse any
    // further up the filesystem tree looking for any parent configs.
    root: true,
    parser: 'babel-eslint',
    // Configure the parser to support es6 standard syntax, js modules, and
    // jsx for react.
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        'import',
        'jsx-a11y',
        'react',
        'react-hooks'
    ],
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended'
    ],
    rules: {
        // Don't require explicit escaping of ['>', '"', '\'', '}'] in jsx.
        'react/no-unescaped-entities': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    }
};
