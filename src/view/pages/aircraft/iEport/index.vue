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
    if (this.$route.name === 'exportDynamic') {
      this.url = pathList.aircraft['exportDyn'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'exportDocument') {
      this.url = pathList.aircraft['exportDoc'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'importDynamic') {
      this.url = pathList.aircraft['importDyn'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'importDocument') {
      this.url = pathList.aircraft['importDoc'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'airCancel') {
      this.url = pathList.aircraft['airCancel'] + '?sysId=CCBA&tabId=' + this.$route.name
    }
  }
}
</script>
<style scoped lang="less">
</style>
