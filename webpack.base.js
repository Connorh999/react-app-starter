const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // Lint any es6+ source code.
            {
                test: /\.jsx?$/,
                // Enforce this as a pre-loader so that linting occurs
                // before attempting to transpile anything.
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                loader: 'eslint-loader'
            },
            // Transpile es6+ source code with babel.
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // Removes all files in the output.path directory on successive,
        // successful builds.
        new CleanWebpackPlugin(),
        // Lints the application's scss files against stylelint settings
        // defined in package.json.
        new StyleLintPlugin({
            syntax: 'scss'
        })
    ]
};
