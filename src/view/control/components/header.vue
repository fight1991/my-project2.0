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
          <img v-else class='user-img' src="../../../assets/img/icon/admin.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <div class="personBgc"></div>
          <el-dropdown-item  class='hidden-xs-only dropDown-top'>
            <div class="userInfo">
              <div class="headImg" v-if="$store.state.userLoginInfo.userPhoto!=''"><img :src="$store.state.userLoginInfo.userPhoto" alt=""></div>
              <div class="headImg" v-else><img src="../../../assets/img/icon/admin.png" alt=""></div>
              <div class="introduce">
                <p class="name">{{$store.state.userLoginInfo.userName}}</p>
                <p class="corpName">{{$store.state.userLoginInfo.companyName}}</p>
                <div class="switchCorp" @click="switchCorp">切换公司</div>
                <div class="glory">
                  <div class="glory-items">
                    <img src="" alt="">
                    <p>天津报关协会会员</p>
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
    <!-- 切换公司对话框 -->
    <el-dialog
      title="请选择公司"
      :visible.sync="corpDialogVisible"
      width="20%"
      center>
      <el-radio-group v-model="corpName" @change="changeCorpName">
        <div class="radioSelect" v-for="item in corpList" :key="item.corpId">
         <el-radio-button :label="item.corpName"></el-radio-button>
        </div>
      </el-radio-group>
    </el-dialog>
  </div>
</template>
<script>
import config from '../../../config/config'
export default {
  data () {
    return {
      corpDialogVisible: false,
      corpName: '',
      corpList: []
    }
  },
  created () {
    this.getUserCorps()
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
    },
    getInfo () {
      window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
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
    },
    setUserDefaultCorp (corpId) {
      this.$store.dispatch('ajax', {
        url: 'API@/login/user/setUserDefaultCorp',
        data: {corpId: corpId},
        router: this.$router,
        success: (res) => {
          this.corpList = res.result
        }
      })
    },
    changeCorpName () {
      // 找到对应企业的信息
      let temp = this.corpList.find(v => {
        return v.corpName === this.corpName
      })
      // setUserDefaultCorp(temp.corpId)
      this.$store.commit('userCompanyInfo', {
        companyType: temp.corpType, // 公司类型
        companyCode: temp.corpId, // 公司id
        companyName: temp.corpName
      })
      this.corpDialogVisible = false
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
  border: none;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.12);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.12);
  text-align: center;
  p {
    margin: 0;
    padding: 0;
  }
  .personBgc {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50%;
    background:url("../../../assets/img/icon/personBGC.png") no-repeat center top;
  }
}
.el-radio-group {
  width: 100%;
}
.radioSelect {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.companyName {
  padding-right: 20px;
}
.myCenter {
  padding: 25px 0;
  span {
    padding: 0 25px;
    position: relative;
    cursor: pointer;
    &:hover {
      color: @sys-color-main;
    }
  }
}
.line::after {
  content:'';
  height:20px;
  border-right: 1px solid #999;
  position:absolute;
  right: -2px;
  top: 0;
}
.dropDown-top {
  width: 400px;
  box-sizing: border-box;
  padding: 90px 30px 20px 30px;
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
      .switchCorp {
        cursor: pointer;
        width: 50px;
        margin: 0 auto;
        padding-left: 20px;
        background:url("../../../assets/img/icon/admin_switch.png") no-repeat 0 13px;
        color: #287fca;
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
}
.dropDown-bottom {
  padding: 0;
}
.el-dropdown-menu__item{
  // height: 36px;
  cursor:auto;
  background-color: #fff;
  &:hover {
    background-color:transparent;
  }
}
.loginOut {
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: @sys-color-red;
  &:hover {
    background-color: @sys-color-red;
  }
  span {
    cursor: pointer;
    height: 50px;
    display: block;
    width: 80px;
    padding-left: 15px;
    margin:0 auto;
    font-size: 14px;
    line-height: 50px;
    background:url("../../../assets/img/icon/admin_quit.png") no-repeat 0 17px;
  }
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
    width: 280px;
    height: 64px;
    background: url('../../../assets/img/icon/CCBA_logo.png') no-repeat 0 0;
    background-size: 280px 64px;
    background-size: cover;
    vertical-align: middle;
}
.welcome {
  position:absolute;
  left:300px;
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
