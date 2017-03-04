var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 入口
var basename = 'entry.js'
var pageArr = require('./base/page-entries')(basename)
var configEntry = {}
pageArr.forEach((page) => {
  var _page = page.replace('\/' + basename, '').replace(/\//g, '_')
  configEntry[_page] = './src/pages/' + page
})
// add hot-reload related code to entry chunks
Object.keys(configEntry).forEach(function (name) {
  configEntry[name] = ['./build/dev-client'].concat(configEntry[name])
})
baseWebpackConfig.entry = configEntry

// all html
basename = 'template.html'
pageArr = require('./base/page-entries')(basename)
pageArr.forEach((page) => {
  var _page = page.replace('\/' + basename, '').replace(/\//g, '_')
  var conf = {
    filename: 'html/' + _page + '.html',
    template: path.resolve(__dirname, '../src/pages' + `/${page}`), // 模板路径
    inject: true // js插入位置
  }
  if (_page in configEntry) {
    conf.chunks = ['base', _page]
    //是否加hash参数: 例如 *.js?fdlfjdlfjdl245
    conf.hash = true;
  }
  baseWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      IS_PRODUCTION: false
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
