const paths = require('./paths');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: paths.indexJs,
    module: {
        rules: [
            // Lint any es6+ source code.
            {
                test: /\.jsx?$/,
                include: paths.src,
                loader: 'eslint-loader',
                // Enforce this as a pre-loader so that linting occurs
                // before anything else.
                enforce: 'pre'
            },
            // Transpile es6+ source code with babel.
            {
                test: /\.jsx?$/,
                include: paths.src,
                loader: 'babel-loader',
                options: {
                    // Cache the results of the loader for faster rebuilds.
                    // https://webpack.js.org/loaders/babel-loader/
                    cacheDirectory: true
                }
            },
            // Process images.
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                // Copies images referenced by import/url() into the build and
                // resolves their asset paths accordingly.
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        // Removes all files in the output.path directory on successive,
        // successful builds.
        new CleanWebpackPlugin(),
        // Lints the application's scss files against stylelint settings
        // defined in .stylelintrc.json.
        new StyleLintPlugin({
            syntax: 'scss'
        })
    ]
};
