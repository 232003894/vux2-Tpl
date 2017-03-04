require('es6-promise').polyfill()
import '@/assets/css.vue'
import common from './common'

if (!window.common) {
  window.common = common
}

export default function (Vue) {}
