<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import pathList from '@/config/pathList'
export default {
  name: 'index',
  data () {
    return {
      url: pathList.aircraft['airplan'] + '?sysId=CCBA&tabId=' + this.$route.name
    }
  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
</style>
