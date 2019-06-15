const postcssPresetEnv = require('postcss-preset-env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = ({
    prependLoaders = [],
    enableSourceMap = false
}) => {
    return prependLoaders.concat([
        {
            // Resolves paths inside css and adds imported assets as dependencies.
            loader: 'css-loader',
            options: {
                // Let css-loader know there are 2 other loaders applied before it
                // in the chain so that any @import './styles' will also get them
                // applied.
                importLoaders: 2,
                // Enable css-modules.
                modules: true,
                // Use react-dev-utils helper function to generate more intuitive
                // classnames as opposed to the default base64 hash.
                getLocalIdent: getCSSModuleLocalIdent,
                sourceMap: enableSourceMap
            }
        },
        // Applies vendor prefixing based on browserslist.
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    // Applies required polyfills dynamically, using browserslist
                    // and cssdb. This is effectively babel for css.
                    // https://preset-env.cssdb.org/features
                    postcssPresetEnv({
                        stage: 3
                    })
                ],
                sourceMap: enableSourceMap
            }
        },
        // Compiles scss into css.
        {
            loader: 'sass-loader',
            options: {
                sourceMap: enableSourceMap
            }
        }
    ]);
};
