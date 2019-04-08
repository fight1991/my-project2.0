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
    if (this.$route.name === 'bwl') {
      this.url = pathList.jinerInfo['bwl'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxList_I') {
      this.url = pathList.jinerInfo['taxList_I'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxList_E') {
      this.url = pathList.jinerInfo['taxList_E'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'apply') {
      this.url = pathList.jinerInfo['apply'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'stock') {
      this.url = pathList.jinerInfo['stock'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'auditRelese') {
      this.url = pathList.jinerInfo['auditRelese'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'centDeclare') {
      this.url = pathList.jinerInfo['centDeclare'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'carInfo') {
      this.url = pathList.jinerInfo['carInfo'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
