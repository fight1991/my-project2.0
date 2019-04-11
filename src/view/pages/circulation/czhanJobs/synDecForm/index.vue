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
    this.url = pathList.jinerInfo['synDecForm'] + '?sysId=CCBA&token=' + encodeURIComponent(window.localStorage.getItem('token'))
  }
}
</script>

<style lang="less" scoped>

</style>
