var webpackConfig = require('../webpack.config.js');

module.exports = {

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(lib|tests|node_modules|bower_components|vendor)\//,
        loader: 'isparta'
      }
    ],
    loaders: webpackConfig.module.loaders,
  },

  isparta: {
      embedSource: true,
      noAutoWrap: true,
      // these babel options will be passed only to isparta and not to babel-loader
      babel: {
          presets: ['es2015']
      }
  },

  // https://github.com/webpack/jade-loader/issues/8
  node: {
    fs: 'empty'
  },

  devtool: 'inline-source-map',

  resolve: webpackConfig.resolve,
  plugins: webpackConfig.plugins

};
