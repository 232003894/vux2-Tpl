<template>
  <i :class="className" :style="{ color: color, fontSize: size}"></i>
</template>

<script>
  export default {
    props: {
      vux: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      }
    },
    computed: {
      className() {
        if (this.type !== '') {
          if (this.vux) {
            return `weui_icon weui_icon_${this.type}`
          } else {
            return `iconfont icon-${this.type}`
          }
        } else {
          return 'iconfont'
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/icon/weui_icon_font';
</style>