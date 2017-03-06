<template>
  <div id="app" style="height:100%;">
    <x-header :left-options="{showBack: false}">do not show Back</x-header>
    <br>
    <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons1"></form-preview>
    <br>
    <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons2"></form-preview>
    <br>
    <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list"></form-preview>
  </div>
</template>
<script>
  import {
    FormPreview,
    XHeader
  } from 'vux'

  export default {
    name: 'app',
    components: {
      FormPreview,
      XHeader
    },
    data() {
      return {
        list: [{
          label: '商品',
          value: '电动打蛋机'
        }, {
          label: '标题标题',
          value: '名字名字名字'
        }, {
          label: '标题标题',
          value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
        }],
        buttons1: [{
          style: 'default',
          text: '辅助操作'
        }, {
          style: 'primary',
          text: '跳转到首页',
          link: 'index.html'
        }],
        buttons2: [{
          style: 'primary',
          text: '点击事件',
          onButtonClick: () => {
            alert('clicking')
          }
        }]
      }
    }
  }
</script>