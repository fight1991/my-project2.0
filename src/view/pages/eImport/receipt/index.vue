<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
import base64 from '@/common/base64'
import pathList from '@/config/pathList'
export default {
  name: 'index',
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    let params = ''
    if (this.$route.query.status) {
      // 说明从工作台看板跳转过来的
      let {iEFlag, status, startTime, endTime} = this.$route.query
      params = `&iEFlag=${iEFlag}&status=${status}&startTime=${startTime}&endTime=${endTime}`
    }
    if (this.$route.params.sysData) {
      // 说明从从子系统打开此页面
      let datas = base64.decode(this.$route.params.sysData).split('::')
      if (datas.length > 5) {
        for (let item in datas[6]) {
          params += `&${item}=${datas[6][item]}`
        }
      }
    }
    if (this.$route.name === 'iReceipt') {
      this.url = pathList.eImport['decImReceipt'] + '?sysId=CCBA' + params + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    } else {
      this.url = pathList.eImport['decExReceipt'] + '?sysId=CCBA' + params + '&token=' + encodeURIComponent(window.localStorage.getItem('token'))
    }
  }
}
</script>
<style scoped lang="less">
</style>
