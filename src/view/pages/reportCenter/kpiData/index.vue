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
    this.url = pathList.reportCenter[this.$route.name] + '?sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
  }
}
</script>
<style scoped lang="less">
</style>
