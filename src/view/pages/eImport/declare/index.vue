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
    if (this.$route.name === 'importDec') {
      this.url = pathList.eImport['decImport'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'exportDec') {
      this.url = pathList.eImport['decExport'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importRecord') {
      this.url = pathList.eImport['recordImport'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'exportRecord') {
      this.url = pathList.eImport['recordExport'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importTaxList') {
      this.url = pathList.eImport['importTaxList'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'exportTaxList') {
      this.url = pathList.eImport['exportTaxList'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
