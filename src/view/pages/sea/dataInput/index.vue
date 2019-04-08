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
    if (this.$route.name === 'bwl_sea') {
      this.url = pathList.jinerInfo['bwl_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'cmb') {
      this.url = pathList.jinerInfo['cmb'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'accountBookVer') {
      this.url = pathList.jinerInfo['accountBookVer'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'accountBook_sea') {
      this.url = pathList.jinerInfo['accountBook_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxList_I_sea') {
      this.url = pathList.jinerInfo['taxList_I_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxList_E_sea') {
      this.url = pathList.jinerInfo['taxList_E_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'apply_sea') {
      this.url = pathList.jinerInfo['apply_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'stockList_sea') {
      this.url = pathList.jinerInfo['stockList_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'auditRelese_sea') {
      this.url = pathList.jinerInfo['auditRelese_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'centDeclare_sea') {
      this.url = pathList.jinerInfo['centDeclare_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'carInfo_sea') {
      this.url = pathList.jinerInfo['carInfo_sea'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'clearance') {
      this.url = pathList.jinerInfo['clearance'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
