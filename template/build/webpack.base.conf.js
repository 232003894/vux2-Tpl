var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 生成pages.js
require('./base/buildPages')()

var webpackConfig = {
  // entry: {
  //   app: './src/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: process.env.NODE_ENV === 'production' ? 'js/[name].js' : '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      {{#if_eq build "standalone"}}
      'vue$': 'vue/dist/vue.esm.js',
      {{/if_eq}}
      '@': resolve('src'),
    }
  },
  module: {
    rules: [{{#lint}}{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {{/lint}}
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]?[hash:5]'
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]'
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }, {
    name: 'script-parser',
    fn: function (source) {
      source = _parser(source)
      return source.replace(/\$box/g, 'this.$refs.cBox')
    }
  }, {
    name: 'js-parser',
    test: /entry\.js/,
    fn: function (source) {
      source = _parser(source)
      var str = ['1', '2']
      str = `[${str.join(',\n')}]`
      source = source.replace(`const Vue = () => {}`, `import Vue from 'vue'
Vue.config.productionTip = false
import config from '@/config'
config(Vue)
// 添加Fastclick移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
`)
      return source
    }
  }, {
    name: "template-parser",
    replaceList: [{
      test: /<view-box/g,
      replaceString: '<view-box ref="cBox"'
    }]
  }, {
    name: 'inline-manifest'
  }, {
    name: 'less-theme',
    path: 'src/assets/theme.less'
  }]
})

var maps = require('../src/components/map.json')
var parser = require('./base/import-parser')

function _parser(source) {
  if (/}\s+from(.*?)'app'/.test(source)) {
    source = parser(source, function (opts) {
      var str = ''
      opts.components.forEach(function (component) {
        var file = `${maps[component.originalName]}`
        str += `import ${component.newName} from '${file}'\n`
      })
      return str
    }, 'app')
  }
  return source
}
