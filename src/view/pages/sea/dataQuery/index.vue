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
    if (this.$route.name === 'accountBookQuery') {
      this.url = pathList.jinerInfo['accountBookQuery'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'bwlQuery_sea') {
      this.url = pathList.jinerInfo['bwlQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'applyQuery_sea') {
      this.url = pathList.jinerInfo['applyQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'applyIxEQuery_sea') {
      this.url = pathList.jinerInfo['applyIxEQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'stockQuery_sea') {
      this.url = pathList.jinerInfo['stockQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'releseQuery_sea') {
      this.url = pathList.jinerInfo['releseQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'stockReleseQuery_sea') {
      this.url = pathList.jinerInfo['stockReleseQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxReleseQuery_sea') {
      this.url = pathList.jinerInfo['taxReleseQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'carInfoQuery_sea') {
      this.url = pathList.jinerInfo['carInfoQuery_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'clearanceQuery') {
      this.url = pathList.jinerInfo['clearanceQuery'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
