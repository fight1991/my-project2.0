<template>
  <div class="top-header">
    <div class="logo"></div>
    <div class="user-info">
      <i class="sys-menu-move"  @click='menuShowClick()'></i>
      <el-dropdown @command='userInfoLi' trigger="click" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class='hidden-xs-only'>{{$store.state.userLoginInfo.userName}}&nbsp;,</span>
          <span class='hidden-xs-only companyName'>{{$store.state.userLoginInfo.companyName}}</span>
          <img v-if="$store.state.userLoginInfo.userPhoto!=''" class='user-img' :src="$store.state.userLoginInfo.userPhoto">
          <img v-else class='user-img' src="../../assets/img/icon/admin.png">
        </span>
        <el-dropdown-menu slot="dropdown" class="ccba-control">
          <div class="personBgc"></div>
          <el-dropdown-item  class='hidden-xs-only dropDown-top'>
            <div class="userInfo">
              <div class="headImg" v-if="$store.state.userLoginInfo.userPhoto!=''"><img :src="$store.state.userLoginInfo.userPhoto" alt=""></div>
              <div class="headImg" v-else><img src="../../assets/img/icon/admin.png" alt=""></div>
              <div class="introduce">
                <p class="name">{{$store.state.userLoginInfo.userName}}</p>
                <p class="corpName">{{$store.state.userLoginInfo.companyName}}</p>
                <div class="switchCorp" @click="switchCorp">切换公司</div>
                <div class="glory">
                  <div class="glory-items" v-for="item in userTitleList" :key="item.titleName">
                    <img src="../../assets/img/icon/admin_vip.png" alt="">
                    <p>{{item.titleName}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item  class="myCenter">
            <span class="line" @click="getInfo">个人中心</span>
            <span class="line">我的关注</span>
            <span>管理设置</span>
          </el-dropdown-item>
          <el-dropdown-item command="loginOut" class="dropDown-bottom">
            <div class="loginOut"><span>退出登录</span></div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import config from '../../config/config'

export default {
  data () {
    return {
      corpDialogVisible: false,
      corpName: '',
      corpList: [],
      userTitleList: [], // 个人荣誉
      totalNum: 0
    }
  },
  created () {
    this.getUserCorps()
    if (sessionStorage.getItem('userTitleList')) {
      this.userTitleList = JSON.parse(sessionStorage.getItem('userTitleList'))
    }
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
    menuShowClick () {
      this.$store.commit('menuShow', !this.$store.state.menuShow)
    },
    getInfo (flag) {
      if (flag === 'add') {
        window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?tabs=alllinkman&token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
      } else {
        window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
      }
    },
    switchCorp () {
      this.corpDialogVisible = true
    },
    getUserCorps () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/user/queryUserCorps',
        data: {},
        router: this.$router,
        success: (res) => {
          this.corpList = res.result
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.top-header{
  position: relative;
  height: 62px;
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

.loginOut {
  span {
    cursor: pointer;
    height: 50px;
    display: block;
    width: 80px;
    padding-left: 15px;
    margin:0 auto;
    font-size: 14px;
    line-height: 50px;
    background:url("../../assets/img/icon/admin_quit.png") no-repeat 0 17px;
  }
}
.el-dropdown-link {
  color: #fff;
  .companyName {
    margin-right: 15px;
  }
}
.logo {
  display: inline-block;
  width: 280px;
  height: 62px;
  background: url('../../assets/img/icon/CCBA_logo.png') no-repeat 0 0;
  background-size: 280px 64px;
  background-size: cover;
  vertical-align: middle;
}
.userInfo {
    width: 340px;
    // height: 400px;
    position: relative;
    background-color:#f4f8fc;
    padding-top: 70px;
    box-sizing: border-box;
    .glory-items {
      display: flex;
      justify-content: center;
      line-height: 24px;
      img {
        width: 20px;
        height: 20px;
        margin-top: 2px;
        margin-right: 6px;
      }
    }
    .headImg {
      height: 100px;
      width: 100px;
      position:absolute;
      left: 50%;
      top: -50px;
      transform: translateX(-50%);
      // background-color: green;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .introduce {
      color: #4c4c4c;
      padding-bottom: 20px;
      .name {
        font-weight: bold;
        font-size: 18px;
      }
    }
}

</style>
