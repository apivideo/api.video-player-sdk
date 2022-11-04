const path = require('path');

module.exports = {
    entry: {
        sdk: ['core-js/stable/promise', 'url-polyfill', './index.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        libraryTarget: 'umd',
        filename: 'index.js',
        globalObject: 'this'
    },
    devServer: {
        port: 8082,
        static: {
            directory: path.join(__dirname, 'samples'),
        },
    },
};
