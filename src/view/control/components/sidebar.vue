<template>
  <div class="leftSolider">
    <div :class="{'collapse-btn':true}" @click='collapseClick()' v-if="!isRotate"></div>
    <div :class="{'collapse-btn':true,'btn-rotate':isRotate}" @click='collapseClick()' v-if="isRotate"></div>
    <el-menu :collapse='$store.state.collapse' @select="currentSelect">
      <template v-for="item in menus">
        <el-menu-item :index="item.link" :key="item.pid">
          <i :class=" 'custom-icons-menu '">
            <img :src="item.picFocus" alt="" v-if="item.isClick">
            <img :src="item.pic" alt="" v-else>
          </i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <!-- <el-menu-item  v-if="!item.children && !item.hidden" :index="item.path" :key="'child'+item.path" v-permissions="item.permissions">
          <i :class=" 'custom-icons-menu '+item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item> -->
      </template>
    </el-menu>
  </div>
</template>
<script>
import eventBus from '../middle/eventBus'
export default {
  data () {
    return {
      isRotate: false,
      menus: [], // 菜单数据
      active: '', // 活动菜单
      appCount: 0 // 待处理数
    }
  },
  watch: {
    // 如果路由有变化
    '$route': function () {
      this.$store.commit('menuShow', true)
    }
  },
  created () {
    this.getAllApp()
    eventBus.$on('getAllApp', this.getAllApp)
  },
  mounted () {
  },
  methods: {
    // 折叠按钮事件
    collapseClick () {
      this.$store.commit('collapse', !this.$store.state.collapse)
      this.isRotate = !this.isRotate
    },
    currentSelect (index) {
      this.menus.forEach(v => { // 找到数组中当前点击的项
        if (v.link === index) {
          v.isClick = true
        } else {
          v.isClick = false
        }
      })
      // 拿到当前的连接地址 拼上token
      window.open(`${index}?token=${encodeURIComponent(localStorage.getItem('token'))}`)
    },
    getAllApp () { // 左侧应用列表
      this.$store.dispatch('ajax', {
        url: 'API@/login/workspace/getAllApp',
        data: {},
        router: this.$router,
        success: (res) => {
          res.result.forEach(v => {
            v.isClick = false
          })
          this.menus = res.result
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.leftSolider {
  position: relative;
  padding-top: 40px;
}
.collapse-btn{
  position: absolute;
  left: 15px;
  top:0;
  width: 40px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background:url("../../../assets/img/icon/btn-left.png") no-repeat;
  z-index: 22;
  background-origin:content-box;
  background-color: #fff;
}
.btn-rotate {
  background:url("../../../assets/img/icon/btn-right.png") no-repeat;
  background-origin:content-box;
  background-color: #fff;
}
.el-menu-item {
  border-left: 3px solid transparent;
}
.is-active {
  border-left: 3px solid @sys-color-main;
}
.custom-icons-menu {
  margin-right: 16px;
  width: 30px;
  height: 30px;
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
