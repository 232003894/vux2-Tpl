{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
// [vux-loader的js-parser] 将被替换为:导入`Vue`以及Config
const Vue = () => {}
import App from './app'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: {
    App
  }
  {{/if_eq}}
})
