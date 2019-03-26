<template>
  <div class="top-header">
    <div class="logo"></div>
    <div class="user-info">
      <i class="sys-menu-move"  @click='menuShowClick()'></i>
      <el-dropdown @command='userInfoLi' trigger="click" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class='hidden-xs-only companyName'>{{$store.state.userLoginInfo.companyName}}&nbsp;-&nbsp;</span>
          <span class='hidden-xs-only userName'>{{$store.state.userLoginInfo.userName}}</span>
          <img v-if="$store.state.userLoginInfo.userPhoto!=''" class='user-img' :src="$store.state.userLoginInfo.userPhoto">
          <img v-else class='user-img' src="../../../assets/img/icon/admin.png">
        </span>
        <el-dropdown-menu slot="dropdown" class="ccba-control">
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
                  <div class="glory-items" v-for="item in userTitleList" :key="item.titleName">
                    <img src="../../../assets/img/icon/admin_vip.png" alt="">
                    <p>{{item.titleName}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item  class="myCenter">
            <span :class="{'line':$store.state.userLoginInfo.adminFlag === 'true'}" @click="getInfo">个人中心</span>
            <span class="line" @click="serviceCenter" v-if="$store.state.userLoginInfo.adminFlag === 'true'">服务订购</span>
            <span @click="adminCenter" v-if="$store.state.userLoginInfo.adminFlag === 'true'">管理员中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="loginOut" class="dropDown-bottom">
            <div class="loginOut"><span>退出登录</span></div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="little-icon hidden-xs-only">
      <!-- <span class="search"></span> -->
      <el-badge :value="totalNum" :max="99" class="item">
        <span class="message" @click="goToMessage"></span>
      </el-badge>
      <span class="add" @click="getInfo('add')"></span>
      <!-- <span class="date"></span> -->
      <!-- <span class="setting"></span> -->
    </div>
    <div class="welcome hidden-xs-only">
      朗新金关信息科技有限公司
    </div>
    <!-- 切换公司对话框 -->
    <el-dialog
      title="切换公司"
      :visible.sync="corpDialogVisible"
      width="25%"
      center>
      <el-radio-group v-model="corpName">
        <div class="radioSelect" v-for="item in corpList" :key="item.corpId">
         <el-radio :label="item.corpName"></el-radio>
        </div>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeCorpName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from '../../../config/config'
import eventBus from '../middle/eventBus.js'
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
    this.queryNumber()
    this.getUserCorps()
    // 获取个人荣誉列表
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
    menuShowClick: function () {
      this.$store.commit('menuShow', !this.$store.state.menuShow)
    },
    // 信息详情
    getInfo (flag) {
      if (flag === 'add') {
        window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?tabs=alllinkman&token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
      } else {
        window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/userCenter?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
      }
    },
    // 切换公司选择弹框显示
    switchCorp () {
      this.corpDialogVisible = true
    },
    // 获取当前用户所属的公司列表
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
    // 选择公司后重新请求数据
    selectUserCorp (corpId) {
      this.$store.dispatch('ajax', {
        url: 'API@/login/login/selectUserCorp',
        data: {corpId: corpId},
        router: this.$router,
        success: (res) => {
          // 重新请求左侧菜单列表
          eventBus.$emit('getAllApp')
          // 重新请求企业风采
          eventBus.$emit('getAllCorpDIY')
          // 重新请求图表数据
          eventBus.$emit('getEchart')
          // 重新请求咨询数据
          eventBus.$emit('getNews')
          // 重新请求报关单数据
          eventBus.$emit('getDecList')
        }
      })
    },
    // 企业切换时
    changeCorpName () {
      // 找到对应企业的信息
      let temp = this.corpList.find(v => {
        return v.corpName === this.corpName
      })
      this.selectUserCorp(temp.corpId)
      this.$store.commit('userCompanyInfo', {
        companyType: temp.corpType, // 公司类型
        companyCode: temp.corpId, // 公司id
        companyName: temp.corpName
      })
      this.corpDialogVisible = false
    },
    // 跳转消息中心
    goToMessage () {
      window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/newsCenter?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&type=notify' + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
    },
    // 获取消息条数
    queryNumber () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-message/message/getUnreadMessageCount',
        data: {},
        router: this.$router,
        isLoad: false,
        success: (res) => {
          this.totalNum = res.result[0].unreadCount + res.result[1].unreadCount
          clearInterval(this.timeOut)
          this.timeOut = setInterval(() => {
            this.queryNumber()
          }, 300000)
        },
        other: (res) => {
          clearInterval(this.timeOut)
        }
      })
    },
    // 服务中心
    serviceCenter () {
      window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/serviceCenter/account?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
    },
    // 管理员中心
    adminCenter () {
      window.open(config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/companyAdmin/index?token=' + encodeURIComponent(window.localStorage.getItem('token')) + '&corpId=' + this.$store.state.userLoginInfo.companyCode + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID'], '_blank')
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
        .userName {
          margin-right: 15px;
        }
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

  .welcome {
    position:absolute;
    left:400px;
    top: 0;
    line-height: 62px;
    color: #fff;
    font-size: 18px;
  }
.personBgc {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
  background:url("../../../assets/img/icon/personBGC.png") no-repeat center top;
}
.switchCorp {
  cursor: pointer;
  width: 50px;
  margin: 0 auto;
  padding-left: 20px;
  background:url("../../../assets/img/icon/admin_switch.png") no-repeat 0 13px;
  color: #287fca;
  font-size: 12px;
  margin-bottom: 5px;
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
    background:url("../../../assets/img/icon/admin_quit.png") no-repeat 0 17px;
  }
}

.logo {
  display: inline-block;
  width: 380px;
  height: 62px;
  background: url('../../../assets/img/icon/CCBA_logo.png') no-repeat 0 0;
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

@media screen and (max-width:900px) {
 .logo {
   width: 120px;
 }
}
@media screen and (max-width:1125px) {

 .welcome {
   display: none;
 }
}
</style>
