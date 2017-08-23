const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const CopyPlugin        = require('copy-webpack-plugin');
const BabiliPlugin      = require('babili-webpack-plugin');

let now        = new Date(),
    outputname = `feela.${(
        now.getYear() + 1900
    )}-${now.getMonth()
         + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
module.exports = {
  node     : {
    fs: 'empty'
  },
  entry    : __dirname + '/src/index.js',
  output   : {
    filename     : `${outputname}.[chunkhash:6].js`,
    path         : './dist',
    publicPath   : '/',
    chunkFilename: `${outputname}/[chunkhash:6].js`
  },
  resolve  : {
    extensions: [
      '',
      '.ts',
      '.js',
      '.vue'
    ]
  },
  module   : {
    unknownContextCritical: false,
    loaders               : [
      {
        test  : /\.vue$/,
        loader: 'vue'
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.ts$/, loader: 'babel-loader!ts-loader' },
      {
        test  : /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test  : /\.(gif|jpg|png|woff|svg|eot|ttf|json)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }
    ]
  },
  babel    : {
    presets: ['es2015', 'stage-0']
  },
  devServer: {
    contentBase       : './dist',
    host              : '0.0.0.0',
    port              : 3001,
    colors            : true,
    historyApiFallback: true,
    inline            : true
  },
  plugins  : [
    new webpack.ProvidePlugin(
        {
          $     : 'jquery',
          jQuery: 'jquery',
          THREE : 'three'
        }
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin('dist/*'),
    new HtmlWebpackPlugin(
        {
          title   : 'BSDev',
          filename: 'index.html',
          template: __dirname + '/src/_static/index.html',
          inject  : true,
          hash    : true,
          minify  : {
            removeComments    : true,
            collapseWhitespace: false
          }
        }
    ),
    new BabiliPlugin(),
    new CopyPlugin(
        [
          {
            from: __dirname + '/src/_static/favicon.ico',
            to  : '.'
          },
          {
            from: __dirname + '/src/_static/Cesium/',
            to  : 'Cesium'
          },
          {
            from: __dirname + '/src/_static/testModels/',
            to  : 'testModels'
          }
        ]
    )
  ]
};