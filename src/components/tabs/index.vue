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
    <el-main>
      <div class='page-tab-content'>
        <div style='height:100%' v-for="(item,index) in openedTabs" :key="item.path + '-' + index" v-show="item.path === getCurrentTab.path">
          <component :is="item.component"></component>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
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
  mounted () {},
  methods: {
    // 修改当前活动tab
    setCurrentTab (tab, event) {
      let data = this.openedTabs[tab.index]
      this.$router.push(data.path)
      this.$store.commit('SetCurrentTab', data)
    },
    // 移除页签
    delTab (tabName) {
      let data = this.openedTabs.filter(item => {
        return item.path === tabName
      })
      this.$store.commit('RemoveTab', data[0])
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
  height: 100%;
  padding: 0 5px;
}
</style>
