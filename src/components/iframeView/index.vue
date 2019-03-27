<template>
<div class='iframe-view'  v-loading="loading">
  <iframe @load='stateLoad()' :id='id' width='100%' :src="url" height="100%"  sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation" frameborder=0 scrolling=auto></iframe>
</div>
</template>

<script>
import base64 from '@/common/base64'
import routers from '@/router'
export default {
  name: 'iframe-view',
  props: ['url'],
  data () {
    return {
      loading: true,
      id: new Date().getTime()
    }
  },
  mounted () {
    this.loading = true
    window.addEventListener('message', function (event) {
      if (event.data.type === 'login') {
        routers.push('/login')
      } else if (event.data.type === 'declaration' || event.data.type === 'recordList') { // 报关单/备案清单
        let data = event.data.data.operationType
        if (data === 'edit' || data === 'look') {
          routers.push({
            name: 'decInfo-editCheck',
            params: {
              sysData: base64.encode(`${event.data.data.id}::${event.data.data.title}::${event.data.data.url}`)
            }
          })
        }
      }
    }, 1000)
  },
  methods: {
    stateLoad () {
      this.loading = false
    }
  }

}
</script>

<style lang="less" scoped>
.iframe-view{
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  iframe{
    position: relative;
    padding-bottom: 100px;
    box-sizing: border-box;
  }
}
.autoH{
  height: auto;
}
.defultH{
  height: 200px;
}
</style>
