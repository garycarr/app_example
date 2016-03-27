const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: ['./main']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
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
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars',
                query: {
                    // inlineRequires: '\/images\/',
                    // helperDirs: [__dirname + '/src/helpers']
                }
            },
            {
                test: /fonts*\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=image/svg+xml'
            },
            // IMAGE LOADER
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file'
            }
        ]
    },
    //
    // resolve: {
    //   alias: {
    //       underscore: 'loadash'
    //   }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['app'],
            // template: 'index.html',
            inject: 'body'
        })
    ],

    // Overwite eslint loader config
    eslint: {
        emitWarning: true
    }

};
