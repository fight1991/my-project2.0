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
      this.url = pathList.aircraft['exportDyn'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'exportDocument') {
      this.url = pathList.aircraft['exportDoc'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importDynamic') {
      this.url = pathList.aircraft['importDyn'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else if (this.$route.name === 'importDocument') {
      this.url = pathList.aircraft['importDoc'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
