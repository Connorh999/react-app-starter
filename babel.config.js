module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.1'
            }
        ],
        '@babel/preset-react'
    ],
    overrides: []
};