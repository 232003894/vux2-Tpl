require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)
}

var ora = require('ora')
var opn = require('opn')
var rm = require('rimraf')
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
  var exists = fs.existsSync(src)
  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName))
    })
  } else {
    fs.linkSync(src, dest)
  }
}

var spinner = ora('生成中...')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      hash: false,
      version: false,
      timings: false
    }) + '\n\n')

    console.log(chalk.cyan('生成完成.\n' +
      '可以用文件路径打开访问'))
    console.log(chalk.yellow('file://' + path.join(config.build.assetsRoot).replace(/\\/g, '/') + '/html/index.html\n'))

    // 删除指定目录, 并将生成的文件复制到指定目录
    if (config.build.copyPath && config.build.copyPath[process.platform]) {
      var copyPath = config.build.copyPath[process.platform] + '\\dist'
      rm(copyPath, err => {
        if (err) throw err
        copyRecursiveSync(path.join(config.build.assetsRoot), copyPath)
        console.log("复制文件到指定路径：" + copyPath)
        opn(copyPath, {
          wait: false
        })
      })
    }
  })
})
