const path = require('path');
const webpack = require('webpack');
const values = require('postcss-modules-values');

let browsers = ['Firefox', 'Chrome'];

if (process.env.BROWSER && process.env.BVER) {
  const browser = process.env.BROWSER;
  browsers = [browser[0].toUpperCase() + browser.substr(1)];
  process.env[`${browser.toUpperCase()}_BIN`] = path.join(__dirname, 'node_modules', '.bin', `start-${browser}`);
}

module.exports = function (config) {
  config.set({
    browsers,
    frameworks: ['mocha', 'sinon'],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['mocha'], // or 'dots'
    webpack: {
      devtool: 'inline-source-map',
      module: {
        noParse: [
          /node_modules\/sinon\//,
        ],
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
          {
            test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
            loader: 'url',
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
          },
        ],
        resolve: {
          alias: {
            sinon: 'sinon/pkg/sinon',
          },
        },
        postcss: [
          values,
        ],
        externals: {
          cheerio: 'window',
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
        },
      },
      watch: true,
    },
    webpackMiddleware: {
      quiet: true,
    },
  });
};
