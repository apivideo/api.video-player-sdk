module.exports = {
    entry: {
        sdk: ['url-polyfill', './index.ts']
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        libraryTarget: 'umd',
        filename: 'index.js',
        globalObject: 'this'
    }
};
