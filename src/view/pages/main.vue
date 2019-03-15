<template>
  <div class="main sys-class">
    <el-container>
      <el-header height="62px">
        <head-top></head-top>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <div class="tabs-top"></div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    'head-top': resolve => require(['../common/header.vue'], resolve)
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
  padding-top: 40px;
  position: relative;
  .tabs-top {
    position: absolute;
    height: 40px;
    top: 0;
    left:0;
    width: 100%;
    background-color: #fff;
    margin-left: 41px;
  }
}
</style>
