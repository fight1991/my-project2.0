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
    if (this.$route.query === {}) {
      // 说明不是从控制台看板跳转过来的
      this.url = pathList.eImport[this.$route.name] + `?sysId=CCBA&token=${encodeURIComponent(window.localStorage.getItem('token'))}`
    } else {
      let {iEFlag, status, startTime, endTime} = this.$route.query
      this.url = pathList.eImport[this.$route.name] + `?sysId=CCBA&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}&token=${encodeURIComponent(window.localStorage.getItem('token'))}`
    }
  }
}
</script>
<style scoped lang="less">
</style>
