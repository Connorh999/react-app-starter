const merge = require('webpack-merge');

const paths = require('./paths.js');
const baseConfig = require('./base.config.js');
const getStyleLoaders = require('./getStyleLoaders.js');

const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        overlay: true
    },
    output: {
        filename: 'js/bundle.js',
        chunkFilename: 'js/[name].chunk.js',
        // Add /* filename */ comments to generated require()s in the
        // output.
        pathinfo: true
    },
    module: {
        rules: [
            // Process styles.
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders({
                    prependLoaders: [ 'style-loader' ]
                })
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        // Generates the index.html file using a pre-defined template and
        // automatically injects any generated bundles.
        new HtmlWebpackPlugin({
            template: paths.indexHtml,
            favicon: paths.favicon
        })
    ]
});
