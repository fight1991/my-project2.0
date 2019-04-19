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
    let params = ''
    if (this.$route.query !== {}) {
      let {iEFlag, status, startTime, endTime} = this.$route.query
      params = `&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}`
    }
    if (this.$route.name === 'iReceipt') {
      this.url = pathList.eImport['decImReceipt'] + '?sysId=CCBA' + params + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else {
      this.url = pathList.eImport['decExReceipt'] + '?sysId=CCBA' + params + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
