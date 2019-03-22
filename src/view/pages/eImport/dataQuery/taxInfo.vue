<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import pathList from '@/config/pathList'
export default {
  name: 'index',
  data () {
    return {
      url: pathList.eImport['taxInfo'] + '&sysId=002&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="less">
</style>
