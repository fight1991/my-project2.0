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
    if (this.$route.name === 'customPort') {
      this.url = pathList.aircraft['customPort'] + '?sysId=CCBA&tabId=' + this.$route.name
    } else if (this.$route.name === 'materials') {
      this.url = pathList.aircraft['materials'] + '?sysId=CCBA&tabId=' + this.$route.name
    }
  }
}
</script>
<style scoped lang="less">
</style>
