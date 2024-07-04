// eslint-disable-next-line no-undef
const CompressionPlugin = require('compression-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    // Other webpack config
    plugins: [
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};
