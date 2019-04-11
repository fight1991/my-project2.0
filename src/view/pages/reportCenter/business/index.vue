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
    if (this.$route.name === 'amountSt') {
      this.url = pathList.reportCenter['amountSt'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'certSt') {
      this.url = pathList.reportCenter['certSt'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'trendSt') {
      this.url = pathList.reportCenter['trendSt'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importSt') {
      this.url = pathList.reportCenter['importSt'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'exportSt') {
      this.url = pathList.reportCenter['exportSt'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
