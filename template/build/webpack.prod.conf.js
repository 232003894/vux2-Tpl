var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var isPlus = process.argv.indexOf('no-compress') >= 0
var env = {{#if_or unit e2e}}process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : {{/if_or}}isPlus ? config.dev.env : config.build.env

// 入口
var basename = 'entry.js'
var pageArr = require('./base/page-entries')(basename)
var configEntry = {}
pageArr.forEach((page) => {
  var _page = page.replace('\/' + basename, '').replace(/\//g, '_')
  configEntry[_page] = path.resolve(__dirname, '../src/pages' + `/${page}`)
})
baseWebpackConfig.entry = configEntry

basename = 'template.html'
pageArr = require('./base/page-entries')(basename)
pageArr.forEach((page) => {
  var _page = page.replace('\/' + basename, '').replace(/\//g, '_')
  var conf = {
    filename: 'html' + '/' + _page + '.html',
    template: path.resolve(__dirname, '../src/pages' + `/${page}`), // 模板路径
    inject: true, // js插入位置
    minify: {
      removeComments: !isPlus,
      collapseWhitespace: !isPlus,
      removeAttributeQuotes: !isPlus
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }
  if (_page in configEntry) {
    conf.chunks = ['app', _page]
    //是否加hash参数: 例如 *.js?fdlfjdlfjdl245
    conf.hash = true;
  }
  baseWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      IS_PRODUCTION: !isPlus
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('css/[name].[contenthash].css')
      filename: 'css/[name].css'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']      
    }])
  ]
})

if (!isPlus) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      // https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
      output: {
        //中文ascii化，非常有用！防止中文乱码的神配置
        ascii_only: true,
        //在输出中保存版权注释
        comments: false
      },
      // https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
      compress: {
        // 不输出警告
        warnings: false,
        // 去掉 console
        drop_console: false,
        // 去掉 debugger
        drop_debugger: true
      },
      sourceMap: true
    })
  )
  webpackConfig.plugins.push(
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      canPrint: false
    })
  )
}

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
