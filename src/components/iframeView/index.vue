<template>
<div>
  <iframe id="show-iframe" sandbox="allow-scripts" width='100%' frameborder=0 name="showHere" scrolling=auto :src="url"></iframe>
</div>
</template>

<script>

export default {
  name: 'iframe-view',
  props: {
    url: {
      type: String,
      default: 'https://www.baidu.com'
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    /**
      * iframe-宽高自适应显示
      */
    function changeMobsfIframe () {
      const mobsf = document.getElementById('show-iframe')
      const deviceHeight = document.body.clientHeight
      mobsf.style.height = (Number(deviceHeight) - 80) + 'px' // 数字是页面布局高度差
    }
    changeMobsfIframe()
    window.onresize = function () {
      changeMobsfIframe()
    }
  },
  methods: {}

}
</script>

<style scoped>

</style>
