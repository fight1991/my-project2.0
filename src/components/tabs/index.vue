<template>
  <el-container>
    <el-header height="45px" style='background-color: rgba(0,0,0,0) !important;'>
      <div class='page-tabs'>
        <div :class="{'collapse-btn':true,'btn-rotate':true}" @click='collapseClick()' v-if="isRotate"></div>
        <div :class="{'collapse-btn':true}" @click='collapseClick()' v-else></div>
        <el-tabs class='tabs-items' :value='getCurrentTab.path' type="card"  @tab-remove="delTab" @tab-click="setCurrentTab">
          <el-tab-pane
            :key="item.path"
            :closable = 'index!==0'
            v-for="(item, index) in openedTabs"
            v-if = '!item.isDel'
            :label="item.title"
            :name="item.path">
          </el-tab-pane>
        </el-tabs>
        <div class='tabs-close-all'>
          <el-dropdown @command="closeTabs">
            <span class="el-dropdown-link">
              关闭操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="all">关闭全部选项卡</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他选项卡</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main class="abtrate">
      <div class='page-tab-content' v-loading="$store.state.loading">
        <div style='height:100%;box-sizing: border-box;overflow-y: auto;' v-for="(item,index) in openedTabs" :key="item.path + '-' + index" v-show="item.path === getCurrentTab.path && item.isDel ===false">
          <component :is="item.component"></component>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import util from '@/common/util'
import base64 from '@/common/base64'
import router from '@/router'
import store from '@/store/store'
export default {
  data () {
    return {
      isRotate: true
    }
  },
  computed: {
    // 打开的页签列表
    openedTabs () {
      return this.$store.getters.GetOpenedTabs
    },
    // 当前打开的页签
    getCurrentTab () {
      return this.$store.getters.GetCurrentTab
    }
  },
  watch: {},
  mounted () {
    // 通讯消息监听
    window.addEventListener('message', function (event) {
      let symbol = '&'
      if (event.data.data && !util.isEmpty(event.data.data.url) && event.data.data.url.indexOf('?') === -1) {
        symbol = '?'
      }
      if (event.data.type === 'close') {
        // 关闭指定的tab
        let data = store.getters.GetOpenedTabs.filter(item => {
          return item.tabId === event.data.data.tabId && !item.isDel
        })
        if (data.length !== 0) {
          store.commit('RemoveTab', data[0])
        }
      } else if (event.data.type === 'refresh') {
        let index = 0
        // 原tab标识改变了： 打开最新tab的url
        let data = store.getters.GetOpenedTabs.filter((item, x) => {
          let tag = false
          if (item.tabId === event.data.data.tabId && !item.isDel) {
            tag = true
            index = x
          }
          return tag
        })
        if (data.length !== 0) {
          let sysData = base64.encode(`${event.data.data.id}::${event.data.data.title}::${event.data.data.url}${symbol}sysId=CCBA&tabId=${event.data.data.tabId}::${event.data.data.tabId}::${index}`)
          router.push({
            name: `${store.state.childSys.type}-new`,
            params: {
              sysData: sysData
            }
          })
        }
      } else if (event.data.type === 'login') {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else if (event.data.type === 'declaration' || event.data.type === 'recordList' || event.data.type === 'EMS') { // 报关单/备案清单/金二菜单
        let data = event.data.data.operationType
        if (data === 'add' || data === 'edit' || data === 'look' || data === 'copy') {
          let getTimeTabId = new Date().getTime()
          let sysData = base64.encode(`${event.data.data.id}::${event.data.data.title}::${event.data.data.url}${symbol}sysId=CCBA&tabId=${data === 'copy' ? getTimeTabId : event.data.data.tabId}::${data === 'copy' ? getTimeTabId : event.data.data.tabId}`)
          router.push({
            name: `${store.state.childSys.type}-new`,
            params: {
              sysData: sysData
            }
          })
        }
      }
    }, 1000)
  },
  methods: {
    // 修改当前活动tab
    setCurrentTab (tab, event) {
      let data = this.openedTabs.filter(item => {
        return item.path === tab.name
      })
      this.$router.push(data[0].path)
      this.$store.commit('SetCurrentTab', data[0])
    },
    // 移除页签
    delTab (tabName) {
      let index = 0
      for (let x in this.openedTabs) {
        if (this.openedTabs[x].path === tabName && !this.openedTabs[x].isDel) {
          index = x
          break
        }
      }
      this.$store.commit('RemoveTab', this.openedTabs[index])
    },
    // 关闭所有或其他页签
    closeTabs (tag) {
      this.$store.commit('CloseTabs', tag)
    },
    // 折叠按钮事件
    collapseClick: function () {
      this.$store.commit('collapse', !this.$store.state.collapse)
      this.isRotate = !this.isRotate
    }
  }
}
</script>
<style lang="less">
.page-tabs {
  position: relative;
  height: 41px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  background: #ffffff !important;
  margin-left: 2px;
  .tabs-items {
    margin-left: 40px;
    margin-right: 100px;
  }
  .tabs-close-all{
    position: absolute;
    width: 90px;
    padding: 0 5px;
    height: 40px;
    line-height: 40px;
    top:0;
    right: 0;
    text-align: center;
    border-top:  1px solid #e4e7ed;
    border-left:  1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    .el-dropdown{
      color: #303133;
    }
  }
  .tabs-close-all{
    position: absolute;
    width: 90px;
    padding: 0 5px;
    height: 39px;
    line-height: 39px;
    top:0;
    right: 0;
    text-align: center;
    border-left:  1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    .el-dropdown{
      color: #303133;
    }
  }
  .el-tabs__header{
    margin: 0;
  }
  .collapse-btn{
    position: absolute;
    left:0;
    top:0;
    width: 40px;
    height: 40px;
    background:url("../../assets/img/icon/btn-right.png")  no-repeat center center;
    border-bottom: 1px solid #e4e7ed;
    cursor: pointer;
    z-index: 22;
  }
  .btn-rotate {
    background:url("../../assets/img/icon/btn-left.png") no-repeat center center;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-radius:0;
  }
}
.page-tab-content{
  position: relative;
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
