<template>
  <div class="leftSolider">
    <div :class="{'collapse-btn':true,'btn-rotate':true}" @click='collapseClick()' v-if="isRotate"></div>
    <div :class="{'collapse-btn':true}" @click='collapseClick()' v-else></div>
    <el-menu
      default-active="2"
      :collapse='$store.state.collapse'>
      <template v-for="item in menus">
        <!-- 一级菜单 -->
        <el-submenu :index="item.path" :key="item.path" v-if="item.children && item.children.length>0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="child in item.children">
            <el-submenu :index="child.path" :key="child.path" v-if="item.children && item.children.length>0">
              <template slot="title"><i :class="child.icon"></i>{{child.name}}</template>
              <el-menu-item v-for="child2 in child.children" :index="child2.path" :key="child2.path" v-if="!child2.hidden">
                <span slot="title">{{child2.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item style='padding-left: 60px' v-if="!child.children" :index="child.path" :key="child.path">
              <span slot="title">{{child.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item  v-if="!item.children" :index="item.path" :key="'child'+item.path">
          <i :class="'custom-icons-menu'"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menus: [
        {
          title: '厂商管理',
          icon: require('../../assets/img/icon-aside/admin.png'),
          activeIcon: require('../../assets/img/icon-aside/admin.png'),
          path: '172.0.0.1:9003#1',
          children: [
            {
              title: '管理一',
              path: '172.0.0.1:9003#1-2'
            },
            {
              title: '管理二',
              path: '172.0.0.1:9003#1-3'
            }
          ]
        },
        {
          title: '进出口模板',
          icon: require('../../assets/img/icon-aside/ie-default.png'),
          activeIcon: require('../../assets/img/icon-aside/ie-default.png'),
          path: '172.0.0.1:9003#2',
          children: [
            {
              title: '管理一',
              path: '172.0.0.1:9003#2-2'
            },
            {
              title: '管理二',
              path: '172.0.0.1:9003#2-3'
            }
          ]
        },
        {
          title: '接单',
          icon: require('../../assets/img/icon-aside/receipt.png'),
          activeIcon: require('../../assets/img/icon-aside/receipt.png'),
          path: '172.0.0.1:9003#3',
          children: []
        }
      ], // 菜单数据
      isRotate: true,
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
  mounted () {
  },
  methods: {
    // 初始化菜单
    // initLeftMenu: function () {
    //   this.$router.options.routes[1].children.forEach((menu) => {
    //     if (!menu.hidden) {
    //       this.menus.push(menu)
    //     }
    //   })
    // },
    // 折叠按钮事件
    collapseClick: function () {
      this.$store.commit('collapse', !this.$store.state.collapse)
      this.isRotate = !this.isRotate
    }
  }
}
</script>
<style scoped lang="less">

.leftSolider {
  position: relative;
}
.collapse-btn{
  position: absolute;
  right:-1px;
  top:0;
  transform: translateX(100%);
  width: 40px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background:url("../../assets/img/icon/btn-left.png") no-repeat;
  z-index: 22;
  background-origin:content-box;
  background-color: #fff;
}
.btn-rotate {
  background:url("../../assets/img/icon/btn-right.png") no-repeat;
  background-origin:content-box;
  background-color: #fff;
}
.custom-icons-menu{
  // display: inline-block;
  margin-right: 16px;
  width: 30px;
  height: 30px;
  img {
    width: 20px;
    height: 20px;
  }
}

</style>
