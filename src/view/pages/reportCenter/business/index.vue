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
      this.url = pathList.reportCenter['amountSt'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'certSt') {
      this.url = pathList.reportCenter['certSt'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'trendSt') {
      this.url = pathList.reportCenter['trendSt'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'importSt') {
      this.url = pathList.reportCenter['importSt'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'exportSt') {
      this.url = pathList.reportCenter['exportSt'] + '?sysId=CCBA&tabId=' + this.$route.name
    }
  }
}
</script>
<style scoped lang="less">
</style>
