var path = require('path')
var glob = require('glob')
var fs = require('fs')
var ext = '.html'
var basename = 'template' + ext
var pageArr = require('./page-entries')(basename)

var pagesUrl = path.resolve(__dirname, '../../src/config/pages.js')
var pagesJs = ''
try {
  pagesJs = fs.readFileSync(pagesUrl, 'utf-8')
} catch (error) {}

module.exports = function () {
  var entries = {},
    tmp, pathname
  pageArr.forEach((entry) => {
    tmp = entry.split('/')
    var star = tmp.indexOf("pages") + 1
    var length = tmp.length - star - 1
    pathname = tmp.splice(star, length).join('_')
    entries[pathname] = pathname + ext
  })
  var jsStr = "export const pages = " + JSON.stringify(entries, null, 2).replace(/"/g, '\'')
  jsStr += "\r\n"
  if (jsStr !== pagesJs) {
    // console.log('生成-pages.js')
    fs.writeFileSync(pagesUrl, jsStr)
  }
}
