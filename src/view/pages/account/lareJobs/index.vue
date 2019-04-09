<template>
  <iframe-view :url='url'></iframe-view>
</template>

<script>
import pathList from '@/config/pathList'
export default {
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = pathList.jinerInfo[this.$route.name] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
  }
}
</script>

<style lang="less" scoped>

</style>
