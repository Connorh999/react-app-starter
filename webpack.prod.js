const path = require('path');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = merge(baseConfig, {
    mode: 'production',
    // Fail fast on the first error encountered during production builds.
    bail: true,
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[contenthash:8].chunk.js',
    },
    // TODO: favicon loader, font loader
    module: {
        rules: [
            // Process styles.
            {
                test: /\.module\.scss$/,
                use: [
                    {
                        // mini-css-extract-plugin takes the generated css
                        // output and extracts it to a file for a
                        // production build.
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // Since we configure mini-css-extract to
                            // output files into a css/ folder (see
                            // plugins below), we need to let it know
                            // that the root context (build/) is 1
                            // level higher. This will ensure any
                            // relative asset paths generated by the
                            // plugin are correct.
                            publicPath: '../'
                        }
                    },
                    {
                        // Resolves paths inside css and adds imported assets
                        // as dependencies.
                        loader: 'css-loader',
                        options: {
                            // Let css-loader know there are 2 other
                            // loaders applied before it in the chain so
                            // that any @import './styles' will also get
                            // them applied. (TODO: Pretty sure this is
                            // only necessary for css, not scss, since
                            // imports are inlined by sass-loader before
                            // this in the chain).
                            importLoaders: 2,
                            // Enable css-modules.
                            modules: true,
                            // Use react-dev-utils helper function to
                            // generate more intuitive classnames as
                            // opposed to the default base64 hash.
                            getLocalIdent: getCSSModuleLocalIdent,
                            sourceMap: true
                        }
                    },
                    {
                        // Applies vendor prefixing based on browserslist.
                        // TODO: postcss-flexbugs-fixes?
                        // TODO: postcss-normalize/sanitize?
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // Applies required polyfills dynamically,
                                // using browserslist and cssdb. This is
                                // effectively babel for css.
                                // https://preset-env.cssdb.org/features
                                postcssPresetEnv({
                                    stage: 3
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    // Compiles scss into css.
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpe?g|png)/,
                loader: 'url-loader',
                options: {
                    // TODO: Consider more efficient image loader? Inlining
                    // images is neat, but it can bloat bundle sizes.
                    // If an image is < 10kb it will be inlined as a
                    // base64 encoded data url.
                    //
                    // If an image exceeds this size limit, url-loader will
                    // fall back to using file-loader by default, which
                    // will actually produce a copy of the image in the
                    // build.
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    optimization: {
        // TODO: optimize css assets plugin
        // TODO: terser plugin?
    },
    plugins: [
        // TODO: ModuleNotFoundPlugin
        // TODO: webpack.HotModuleReplacementPlugin
        // TODO: CaseSensitivePathsPlugin
        // TODO: WatchMissingNodeModulesPlugin
        // TODO: webpack.IgnorePlugin
        new MiniCssExtractPlugin({
            // TODO: figure out right filename + chunkFilename
            filename: 'css/[name].[hash].css'
        }),
        // Generates the index.html file using a pre-defined template and
        // injects a script tag at the bottom of the body referencing the
        // bundled js entry file.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
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
