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
      this.url = pathList.eImport['decImport'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importRecord') {
      this.url = pathList.eImport['recordImport'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importTaxList') {
      this.url = pathList.eImport['importTaxList'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importDecList') {
      this.url = pathList.eImport['importDecList'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importRecList') {
      this.url = pathList.eImport['importRecList'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
