<template>
  <!-- 可视化审核 容器 -->
  <section class="sys-main">
    <declare-check :initParams="initDeCheckParam" @cancLeData="closeDeCheckCompnent" @backData="receptionDeCheckData" v-if="openCompentFlag"></declare-check>
  </section>
</template>

<script>
import declareCheck from './component/declareCheck.vue'

export default {
  name: 'deCheck-container',
  components: {
    declareCheck
  },
  data () {
    return {
      initDeCheckParam: {},
      decPid: '',
      operationType: '', // 编辑 edit  浏览 look
      openCompentFlag: false
    }
  },
  mounted () {
    this.decPid = this.$route.query['decPid']
    this.operationType = this.$route.query['operationType']
    this.initFunction()
  },
  methods: {
    initFunction () {
      this.$post({
        url: 'API@/dec-common/dec/common/queryVerifyInfo',
        data: {
          'pid': this.decPid // 19561进口 19560出口
        },
        success: (res) => {
          this.initDeCheckParam = {
            iEFlag: res.result.decHeadVO.iEFlag,
            head: res.result.decHeadVO,
            list: res.result.decListVO,
            containers: res.result.decContainersVO,
            licenses: res.result.decLicensesVO,
            check: res.result.decVerifyVO,
            operationType: this.operationType
          }
          this.openCompentFlag = true
        }
      })
    },
    closeDeCheckCompnent () {
      let sysId = window.sessionStorage.getItem('sysId')
      if (sysId === '002') {
        window.parent.postMessage({type: 'viewCheck', data: {action: 'closeDialog'}}, '*')
      }
    },
    receptionDeCheckData () {
      let sysId = window.sessionStorage.getItem('sysId')
      if (sysId === '002') {
        window.parent.postMessage({type: 'viewCheck', data: {action: 'closeDialog'}}, '*')
      }
    }
  }
}
</script>

<style scoped lang="less">
.sys-main{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;
    margin-left:5px;
}
</style>
