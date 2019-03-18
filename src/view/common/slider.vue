<template>
  <div class="leftSolider">
    <el-menu
      :default-active="$route.path" router
      :collapse='$store.state.collapse'>
      <template v-for="item in menus">
        <!-- 一级菜单 -->
        <el-submenu :index="item.path" :key="item.path" v-if="item.children && !item.hidden" v-permissions="item.permissions">
          <template slot="title">
            <i :class=" 'custom-icons-menu '+item.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="child in item.children">
            <el-submenu :index="child.path" :key="child.path" v-if="child.children&& !child.hidden" v-permissions="child.permissions">
              <template slot="title"><i :class="child.icon"></i>{{child.meta.title}}</template>
              <el-menu-item v-for="child2 in child.children" :index="child2.path" :key="child2.path" v-if="!child2.hidden" v-permissions="child2.permissions">
                <span slot="title">{{child2.meta.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!child.children && !child.hidden" :index="child.path" :key="child.path"  v-permissions="child.permissions">
              <span slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item  v-if="!item.children && !item.hidden" :index="item.path" :key="'child'+item.path" v-permissions="item.permissions">
          <i :class=" 'custom-icons-menu '+item.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
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
        // {
        //   title: '厂商管理',
        //   icon: require('../../assets/img/icon-aside/admin.png'),
        //   activeIcon: require('../../assets/img/icon-aside/admin.png'),
        //   path: '172.0.0.1:9003#1',
        //   children: [
        //     {
        //       title: '管理一',
        //       path: '172.0.0.1:9003#1-2'
        //     },
        //     {
        //       title: '管理二',
        //       path: '172.0.0.1:9003#1-3'
        //     }
        //   ]
        // },
        // {
        //   title: '进出口模板',
        //   icon: require('../../assets/img/icon-aside/ie-default.png'),
        //   activeIcon: require('../../assets/img/icon-aside/ie-default.png'),
        //   path: '172.0.0.1:9003#2',
        //   children: [
        //     {
        //       title: '管理一',
        //       path: '172.0.0.1:9003#2-2'
        //     },
        //     {
        //       title: '管理二',
        //       path: '172.0.0.1:9003#2-3'
        //     }
        //   ]
        // },
        // {
        //   title: '接单',
        //   icon: require('../../assets/img/icon-aside/receipt.png'),
        //   activeIcon: require('../../assets/img/icon-aside/receipt.png'),
        //   path: '172.0.0.1:9003#3',
        //   children: []
        // }
      ], // 菜单数据
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
    this.initLeftMenu()
  },
  methods: {
    // 初始化菜单
    initLeftMenu: function () {
      this.$router.options.routes[1].children.forEach((menu) => {
        if (!menu.hidden) {
          this.menus.push(menu)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.leftSolider {
  position: relative;
}
.custom-icons-menu{
  margin-right: 16px;
  width: 30px;
  height: 30px;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
