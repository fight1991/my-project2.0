<template>
    <el-container class="main" v-loading="$store.state.loading">
      <el-header class="header" height="52px">
        <top></top>
      </el-header>
      <el-container class="main">
        <el-aside :class="['sidebar',{'hidden-xs-only sidebar-xs-only' : this.$store.state.menuShow}]" :width="$store.state.collapse ? '60px' : '170px'">
          <sidebar></sidebar>
        </el-aside>
        <el-main style='padding-bottom:100px;'>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
export default {
  components: {
    top: resolve => require(['../common/header.vue'], resolve),
    sidebar: resolve => require(['../common/sidebar.vue'], resolve)
  },
  data () {
    return {}
  }
}
</script>
<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
}
.header{
    line-height: 52px;
    padding: 0;
    background-color: @aid-color-main;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    z-index: 9000;
}
.sidebar {
  background-color: @aid-color-light;
  overflow-x: hidden;
  z-index: 10
}
.sidebar::-webkit-scrollbar {
  display: none;
}
@media only screen and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  .sidebar {
    position: absolute;
    height: 100%;
  }
}
</style>
