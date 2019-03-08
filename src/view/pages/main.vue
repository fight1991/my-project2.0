<template>
    <el-container class="main" v-loading="$store.state.loading">
      <el-header class="header" height="64px">
        <top></top>
      </el-header>
      <el-container class="middle">
        <el-aside :class="['sidebar',{'hidden-xs-only sidebar-xs-only' : this.$store.state.menuShow}]" :width="$store.state.collapse ? '56px' : '200px'">
          <sidebar></sidebar>
        </el-aside>
        <el-main class="middle-right">
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer class="footer-bottom" :height="footHeight+'px'">
        <foot @pullHeight="pullHeight"></foot>
      </el-footer>
    </el-container>
</template>
<script>
export default {
  components: {
    top: resolve => require(['../common/header.vue'], resolve),
    sidebar: resolve => require(['../common/sidebar.vue'], resolve),
    foot: resolve => require(['../common/footer.vue'], resolve)
  },
  data () {
    return {
      footHeight: '50'
    }
  },
  methods: {
    pullHeight (value) {
      this.footHeight = value
    }
  }
}
</script>
<style scoped lang="less">
.main{
  width: 100%;
  height: 100%;
  background-color: @sys-color-gray;
}
.middle {
  padding-bottom: 50px;
}
.header{
    padding: 0;
    background-color:@sys-color-main;
    box-shadow: 0 2px 3px rgba(17,17,17,0.1), 0 0 0 1px rgba(17,17,17,0.1);
    z-index: 9000;
}
.footer-bottom {
  width: 100%;
  padding: 0;
  position:fixed;
  bottom: 0;
  left: 0;
  z-index: 11;
  background-color: @aid-color-main;
}
.middle-right {
  border: 1px solid red;
  margin: 15px 20px 15px 0;
}
.sidebar {
  background-color: @aid-color-white;
  margin: 15px 20px;
  overflow-x: hidden;
  z-index: 10;
  border: 1px solid red;
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
