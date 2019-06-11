module.exports = {
    mode: 'production',
    bail: true,
    output: {
        filename: '[name].[contenthash:8].js',
    }
};