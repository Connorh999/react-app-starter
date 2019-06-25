module.exports = {
    presets: [
        [
            // https://babeljs.io/docs/en/babel-preset-env
            '@babel/preset-env',
            {
                // Adds specific imports for polyfills when they are used in
                // each file.
                useBuiltIns: 'usage',
                corejs: '3.1'
            }
        ],
        // https://babeljs.io/docs/en/babel-preset-react
        '@babel/preset-react'
    ],
    overrides: []
};
