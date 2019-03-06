<template>
  <div>
    <div class='collapse-btn hidden-xs-only' @click='collapseClick()'><i class="icons-menu-move"></i></div>
    <el-menu :default-active="$route.path" router :collapse='$store.state.collapse'>
      <template v-for="item in menus">
        <el-submenu :index="item.path" :key="item.path" v-if="item.children && !item.hidden" v-permissions="item.permissions">
            <template slot="title">
              <i :class=" 'custom-icons-menu '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>

            <template v-for="child in item.children">
              <el-submenu :index="child.path" :key="child.path" v-if="child.children&& !child.hidden" v-permissions="child.permissions">
                <template slot="title"><i :class="child.icon"></i>{{child.name}}</template>
                <el-menu-item v-for="child2 in child.children" :index="child2.path" :key="child2.path" v-if="!child2.hidden" v-permissions="child2.permissions">
                  <span slot="title">{{child2.name}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item style='padding-left: 60px' v-if="!child.children && !child.hidden" :index="child.path" :key="child.path"  v-permissions="child.permissions">
                <span slot="title">{{child.name}}</span>
              </el-menu-item>
            </template>
        </el-submenu>
        <el-menu-item  v-if="!item.children && !item.hidden" :index="item.path" :key="'child'+item.path" v-permissions="item.permissions">
          <i :class=" 'custom-icons-menu '+item.icon"></i>
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
    },
    // 折叠按钮事件
    collapseClick: function () {
      this.$store.commit('collapse', !this.$store.state.collapse)
    }
  }
}
</script>
<style scoped lang="less">
.collapse-btn{
  padding: 0 15px;
  height: 56px;
  line-height: 56px;
  color: #fff;
  cursor: pointer;
}
.custom-icons-menu{
  display: inline-block;
  margin-right: 12px;
  width: 30px;
  height: 30px;
}
</style>
