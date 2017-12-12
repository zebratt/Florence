const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].map'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9999,
    stats: 'minimal',
    noInfo: false,
    historyApiFallback: true
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '点赢宝',
      template: 'template.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('develop')
      }
    })
  ]
});
