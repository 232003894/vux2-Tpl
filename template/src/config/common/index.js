const moduleExports = {}

// 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
/* global IS_PRODUCTION:true */
if (IS_PRODUCTION) {
  // 生产环境之用
} else {
  // 开发环境之用
}

export default moduleExports
