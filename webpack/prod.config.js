const merge = require('webpack-merge');

const paths = require('./paths.js');
const baseConfig = require('./base.config.js');
const getStyleLoaders = require('./getStyleLoaders.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    // Fail fast on the first error encountered during production builds.
    bail: true,
    devtool: 'source-map',
    output: {
        path: paths.build,
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js'
    },
    module: {
        rules: [
            // Process styles.
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders({
                    prependLoaders: [{
                        // mini-css-extract-plugin takes the generated css
                        // output and extracts it to a file for a production
                        // build.
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // Since we configure mini-css-extract to output
                            // files into a css folder (see plugins below), we
                            // need to tell it the correct "base path" to use
                            // when resolving files. This will prevent any
                            // relative asset paths in the source from being
                            // broken.
                            publicPath: paths.build
                        }
                    }],
                    enableSourceMap: true
                })
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css'
        }),
        // Generates the index.html file using a pre-defined template and
        // automatically injects any generated bundles.
        new HtmlWebpackPlugin({
            template: paths.indexHtml,
            favicon: paths.favicon,
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        })
    ]
});
