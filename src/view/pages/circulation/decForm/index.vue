<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import pathList from '@/config/pathList'
export default {
  name: 'index',
  data () {
    return {
      url: ''

    }
  },
  mounted () {
    // this.url = pathList.jinerInfo['carInfoQuery'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    if (this.$route.name === 'decFormQuery') {
      this.url = pathList.jinerInfo['decFormQuery'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'incform') {
      this.url = pathList.jinerInfo['incform'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'outedcform') {
      this.url = pathList.jinerInfo['outedcform'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
