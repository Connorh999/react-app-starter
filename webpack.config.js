const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = function(env, options) {
    const isDevelopment = options.mode === 'development';

    return {
        mode: options.mode,
        // Fail fast on first error encountered during production builds.
        bail: !isDevelopment,
        // TODO: Use lightweight source-mapping in prod? test bundle size diff.
        devtool: isDevelopment
            ? 'cheap-module-source-map'
            : 'source-map',
        devServer: {
            port: 3000
        },
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            // TODO: DON'T use hashing in dev
            filename: isDevelopment
                ? '[name].chunk.js'
                : '[name].[contenthash:8].chunk.js',
            // Add /* filename */ comments to generated require()s in the
            // output.
            pathinfo: isDevelopment
        },
        module: {
            rules: [
                // TODO: add pre-loader for linting: stylint, eslint
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader'
                },
                {
                    test: /\.module\.scss$/,
                    use: [
                        isDevelopment
                            // style-loader turns css into js modules that
                            // inject style tags into the page, supporting
                            // hot-reloading during development.
                            ? 'style-loader'
                            // mini-css-extract-plugin takes the generated css
                            // output and extracts it to a file for a
                            // production build.
                            : MiniCssExtractPlugin.loader,
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
                                sourceMap: !isDevelopment
                            }
                        },
                        // Applies vendor prefixing based on browserslist.
                        // TODO: postcss-flexbugs-fixes?
                        // TODO: postcss-normalize/sanitize?
                        // TODO: stylint
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
                                sourceMap: !isDevelopment
                            }
                        },
                        // Compiles scss into css.
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isDevelopment
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

            // Removes all files in the output.path directory on successive,
            // successful builds.
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                // TODO: figure out right filename + chunkFilename
                filename: isDevelopment
                    ? '[name].css'
                    : '[name].[hash].css'
            }),
            // Generates the index.html file using our pre-defined template and
            // injects the bundled js script tag at the bottom of the body.
            new HtmlWebpackPlugin(Object.assign(
                {
                    template: path.resolve(__dirname, 'public/index.html')
                },
                !isDevelopment
                    ? {
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
                    }
                    : undefined
            ))
        ]
    };
};