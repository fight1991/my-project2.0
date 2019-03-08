<template>
  <div>
    <div class='collapse-btn hidden-xs-only' @click='collapseClick()'><i class="icons-menu-move"><img src="../../assets/img/icon/left_22x22.png" alt=""></i></div>
    <el-menu :collapse='$store.state.collapse' @select="currentSelect">
      <template v-for="(item,index) in menus">
        <el-menu-item :index="item.path" :key="index">
            <i :class=" 'custom-icons-menu '">
              <img :src="item.icon" alt="" v-if="!item.isClick">
              <img :src="item.iconActive" alt="" v-if="item.isClick">
            </i>
            <span slot="title">{{item.name}}</span>
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
export default {
  data () {
    return {
      menus: [
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#1',
          icon: require('../../assets/img/icon/left_im&ex.png'),
          iconActive: require('../../assets/img/icon/left_im&ex_1.png'),
          name: '进出口管理'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#2',
          icon: require('../../assets/img/icon/left_finance.png'),
          iconActive: require('../../assets/img/icon/left_finance_1.png'),
          name: '财务费用'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#3',
          icon: require('../../assets/img/icon/left_data.png'),
          iconActive: require('../../assets/img/icon/left_data_1.png'),
          name: '资料中心'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#4',
          icon: require('../../assets/img/icon/left_air.png'),
          iconActive: require('../../assets/img/icon/left_air_1.png'),
          name: '航空器'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#5',
          icon: require('../../assets/img/icon/left_log.png'),
          iconActive: require('../../assets/img/icon/left_log_1.png'),
          name: '物流跟踪'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#6',
          icon: require('../../assets/img/icon/left_rpt ctr.png'),
          iconActive: require('../../assets/img/icon/left_rpt ctr_1.png'),
          name: '报表中心'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#7',
          icon: require('../../assets/img/icon/left_Jin Er.png'),
          iconActive: require('../../assets/img/icon/left_Jin Er_1.png'),
          name: '加工贸易(金二)'
        },
        {
          isClick: false,
          path: 'http://127.0.0.1:9003/main#8',
          icon: require('../../assets/img/icon/left_admin.png'),
          iconActive: require('../../assets/img/icon/left_admin_1.png'),
          name: '管理员中心'
        }
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
    // this.initLeftMenu()
  },
  methods: {
    // 初始化菜单
    // initLeftMenu () {
    //   this.$router.options.routes[1].children.forEach((menu) => {
    //     if (!menu.hidden) {
    //       this.menus.push(menu)
    //     }
    //   })
    // },
    // 折叠按钮事件
    collapseClick () {
      this.$store.commit('collapse', !this.$store.state.collapse)
    },
    currentSelect (index) {
      this.menus.forEach(v => { // 找到数组中当前点击的项
        if (v.path === index) {
          v.isClick = true
        } else {
          v.isClick = false
        }
      })
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
  // display: inline-block;
  margin-right: 12px;
  width: 30px;
  height: 30px;
}
.el-menu-item {
  border-left: 3px solid transparent;
}
.is-active {
  border-left: 3px solid @sys-color-main;
}
</style>
