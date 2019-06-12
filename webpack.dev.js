const path = require('path');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = merge(baseConfig, {
    mode: 'development',
    // Fail fast on the first error encountered during production builds.
    bail: false,
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        overlay: true
    },
    output: {
        filename: 'js/[name].chunk.js',
        // Add /* filename */ comments to generated require()s in the
        // output.
        pathinfo: true
    },
    // TODO: favicon loader, font loader
    module: {
        rules: [
            // Process styles.
            {
                test: /\.module\.scss$/,
                use: [
                    // style-loader turns css into js modules that
                    // inject style tags into the page, supporting
                    // hot-reloading during development.
                    'style-loader',
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
                            sourceMap: false
                        }
                    },
                    // Applies vendor prefixing based on browserslist.
                    // TODO: postcss-flexbugs-fixes?
                    // TODO: postcss-normalize/sanitize?
                    {
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
                            sourceMap: false
                        }
                    },
                    // Compiles scss into css.
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
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
    plugins: [
        // TODO: ModuleNotFoundPlugin
        // TODO: webpack.HotModuleReplacementPlugin
        // TODO: CaseSensitivePathsPlugin
        // TODO: WatchMissingNodeModulesPlugin
        // TODO: webpack.IgnorePlugin
        new HotModuleReplacementPlugin(),
        // Generates the index.html file using a pre-defined template and
        // injects a script tag at the bottom of the body referencing the
        // bundled js entry file.
        new HtmlWebpackPlugin(Object.assign({
            template: path.resolve(__dirname, 'public/index.html')
        }))
    ]
});
