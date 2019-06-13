const merge = require('webpack-merge');

const paths = require('./paths.js');
const baseConfig = require('./base.config.js');
const getStyleLoaders = require('./getStyleLoaders.js');

const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
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
                use: getStyleLoaders({
                    prependLoaders: [ 'style-loader' ]
                })
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
        // injects script + link tags to load the bundled js and favicon.
        new HtmlWebpackPlugin({
            template: paths.indexHtml,
            favicon: paths.favicon
        })
    ]
});
