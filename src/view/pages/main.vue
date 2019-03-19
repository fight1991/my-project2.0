<template>
  <div class="main sys-class">
    <el-container>
      <el-header height="62px">
        <head-top></head-top>
      </el-header>
      <el-container>
        <el-aside :class="['sidebar',{'sidebar-xs-only' : this.$store.state.menuShow}]" :width="$store.state.collapse ? '64px' : '192px'">
          <sidebar></sidebar>
        </el-aside>
        <el-main>
          <tabs></tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    'head-top': resolve => require(['../common/header.vue'], resolve),
    'sidebar': resolve => require(['../common/slider.vue'], resolve)
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.main,.el-container {
  height: 100%;
}
.el-main {
  position: relative;
  .tabs-top {
    position: absolute;
    height: 40px;
    top: 0;
    left:0;
    width: 100%;
    background-color: #fff;
    margin-left: 42px;
  }
}
.sidebar {
  background-color: #fff;
  overflow-x:hidden;
  z-index: 10;
  box-shadow:1px 0px 5px rgba( 0, 0, 0, .1);
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
