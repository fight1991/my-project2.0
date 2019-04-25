<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import pathList from '@/config/pathList'
export default {
  name: 'index',
  data () {
    return {
      url: pathList.eImport['decReviewed'] + '?sysId=CCBA&tabId=' + this.$route.name + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="less">
</style>
