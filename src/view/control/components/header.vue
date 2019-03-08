<template>
  <div class="top-header">
    <div class="logo"></div>
    <div class="user-info">
      <i class="sys-menu-move"  @click='menuShowClick()'></i>
      <el-dropdown @command='userInfoLi'>
        <span class="el-dropdown-link">
          <span class='hidden-xs-only'>{{$store.state.userLoginInfo.userName}}&nbsp;,</span>
          <span class='hidden-xs-only'>{{$store.state.userLoginInfo.companyCode}}</span>
          <img v-if="$store.state.userLoginInfo.userPhoto!=''" class='user-img' :src="$store.state.userLoginInfo.userPhoto">
          <img v-else class='user-img' src="../../../assets/img/icon/top_head.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo"  class='hidden-xs-only'>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="loginOut">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="little-icon hidden-xs-only">
      <span class="search"></span>
      <span class="message"></span>
      <span class="add"></span>
      <span class="date"></span>
      <span class="setting"></span>
    </div>
    <div class="welcome hidden-xs-only">
      欢迎回来!
    </div>
  </div>
</template>
<script>
import config from '../../../config/config'
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {
    // 用户头像下拉菜单点击处理
    userInfoLi (type) {
      switch (type) {
        case 'userInfo':
          window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
          break
        case 'loginOut':
          this.loginOut()
          break
      }
    },
    // 退出系统
    loginOut () {
      this.$confirm('您确定退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        window.localStorage.clear()
        this.$store.commit('userLoginInfo', {
          token: '', // token数据
          userName: '', // 用户姓名
          companyType: '', // 公司类型
          companyCode: '' // 公司id
        })
        this.$router.push('/login')
      }).catch(() => {})
    },
    // 菜单显示事件事件
    menuShowClick: function () {
      this.$store.commit('menuShow', !this.$store.state.menuShow)
    }
  }
}
</script>
<style lang="less">
.el-dropdown{
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu {
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.12);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.12);
}
.el-dropdown-menu__item{
  height: 36px;
  background-color: #fff;
}
.top-header{
  position: relative;
  height: 64px;
    img{
        position: relative;
        display: inline-block;
        height:100%;
        vertical-align: top;
    }
    .user-info{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right: 15px;
        z-index: 3001;
    }
    .user-img{
      margin-right: 20px;
      width: 36px;
      height:36px;
      -moz-border-radius:50%;
      -webkit-border-radius:50%;
      border-radius:50%;
      vertical-align: middle;
      cursor: pointer;
    }
}
.logo{
    display: inline-block;
    width: 150px;
    height: 64px;
    background: url('../../../assets/img/icon/CCBA_logo.png') no-repeat 0 0;
    background-size: 150px 64px;
    background-size: cover;
    vertical-align: middle;
}
.welcome {
  position:absolute;
  left:200px;
  top: 0;
  line-height: 64px;
  color: #fff;
  // font-size: 16px;
  letter-spacing: 2px;
}
.little-icon {
  box-sizing:border-box;
  height: 64px;
  padding: 22px;
  position: absolute;
  // background-color: green;
  top: 0;
  right: 400px;
  .search {
    background: url("../../../assets/img/icon/top_search.png") no-repeat;
    background-clip: content-box;
    background-origin: content-box;
  }
  .message {
    background: url("../../../assets/img/icon/top_notice.png") no-repeat;
    background-clip: content-box;
    background-origin: content-box;
  }
  .add {
    background: url("../../../assets/img/icon/top_add.png") no-repeat;
    background-clip: content-box;
    background-origin: content-box;
  }
  .date {
    background: url("../../../assets/img/icon/top_date.png") no-repeat;
    background-clip: content-box;
    background-origin: content-box;
  }
  .setting {
    background: url("../../../assets/img/icon/top_set.png") no-repeat;
    background-clip: content-box;
    background-origin: content-box;
  }
  span {
    float: left;
    width: 20px;
    height: 20px;
    padding: 0 12px;
    cursor: pointer;
  }
}
</style>
