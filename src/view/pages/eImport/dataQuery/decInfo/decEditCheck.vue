<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import base64 from '@/common/base64'
export default {
  name: 'index',
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = base64.decode(this.$route.params.sysData).split('::')[2]
  }
}
</script>
<style scoped lang="less">
</style>
