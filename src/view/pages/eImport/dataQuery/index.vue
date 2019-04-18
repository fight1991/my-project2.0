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
  created () {
  },
  mounted () {
    let {iEFlag, status, startTime, endTime} = this.$route.query
    if (this.$route.query.status === '0') {
      if (this.$route.query.iEFlag === 'I') {
        this.url = pathList.eImport['decImReceipt'] + `?sysId=CCBA&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}&token=${encodeURIComponent(window.localStorage.getItem('token'))}`
      } else {
        this.url = pathList.eImport['decExReceipt'] + `?sysId=CCBA&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}&token=${encodeURIComponent(window.localStorage.getItem('token'))}`
      }
    } else {
      if (this.$route.name === 'decInfo') {
        this.url = pathList.eImport[this.$route.name] + `?sysId=CCBA&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}&token=${encodeURIComponent(window.localStorage.getItem('token'))}`
      } else {
        this.url = pathList.eImport[this.$route.name] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
      }
    }
    // 报关数据查询
  }
}
</script>
<style scoped lang="less">
</style>
