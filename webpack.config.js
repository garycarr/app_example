var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: "./entry.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules\/)(?!8-bit)/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css",
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars',
                query: {
                    inlineRequires: '\/images\/',
                    helperDirs: [__dirname + '/src/helpers']
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],

    // Overwite eslint loader config
    eslint: {
        emitWarning: true
    },

};
