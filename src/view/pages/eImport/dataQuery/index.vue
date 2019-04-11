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
    if (this.$route.name === 'decInfo') {
      this.url = pathList.eImport['decInfo'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'taxInfo') {
      this.url = pathList.eImport['taxInfo'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'tLedger') {
      this.url = pathList.eImport['tLedger'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
