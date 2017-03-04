var glob = require('glob')
var path = require('path')

// 一个数组，形如['index/index', 'index/login', 'alert/index']
module.exports = function (basename) {
  var options = {
    // 在pages目录里找
    cwd: path.resolve(__dirname, '../../src/pages'),
    // 这里不能异步，只能同步
    sync: true
  }
  var globInstance
  if (basename) {
    globInstance = new glob.Glob('**/' + basename, options)
  } else {
    globInstance = new glob.Glob('**', options)
  }
  return globInstance.found
}
