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
    if (this.$route.name === 'noBonded') {
      this.url = pathList.dataCenter['noBonded'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else {
      this.url = pathList.dataCenter['bonded'] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
