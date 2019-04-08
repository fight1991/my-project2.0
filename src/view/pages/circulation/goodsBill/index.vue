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
    if (this.$route.name === 'deliver') {
      this.url = pathList.jinerInfo['deliver'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'query') {
      this.url = pathList.jinerInfo['query'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'take') {
      this.url = pathList.jinerInfo['take'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
