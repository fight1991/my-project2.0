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
    if (this.$route.name === 'iTemplate') {
      this.url = pathList.eImport['decImTemplate'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'eTemplate') {
      this.url = pathList.eImport['decExTemplate'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'templateList') {
      this.url = pathList.eImport['decTemplateList'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'shipping') {
      this.url = pathList.eImport['shipping'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
