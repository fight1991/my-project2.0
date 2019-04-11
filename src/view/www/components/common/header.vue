<template>
<div class="container">
   <div class="header">
     <!-- <div class="line-through"> -->
       <!-- <div class="header-top mainer clearfix">
          <div class="tel fl">
            <span class="iconfont icon-weibiaoti1"></span>
            <em class="em">在线咨询热线: 010-65211168</em>
          </div>
          <div class="login fr"><a href="javascript:void(0);" @click="logIn">登录 / 注册</a></div>
        </div> -->
     <!-- </div> -->
     <div class="header-bottom">
       <div class="header-right" v-if="isLogin">
          <div class="login" @click="logIn"><span>登录</span></div>
          <div class="register" @click="logIn"><span>注册</span></div>
        </div>
        <div class="header-right" v-else>
          <div class="hello"><span>{{$store.state.userLoginInfo.userName}}&nbsp;,你好!</span></div>
          <div class="loginOut" @click="logOut"><span>注销</span></div>
          <div class="goToControl" @click="goToControl"><span>前往工作台</span></div>
        </div>
        <div class="logo">
          <div class="image fl"><img src="@/assets/www-img/images/logo1.png" alt=""></div>
          <div class="telPhone fl">
            <span class="iconfont icon-dianhua tel-icon"></span>
              <span class="em">010-65211168</span>
          </div>
         </div>
       <div class="tabs">
         <ul>
            <li v-for="(item,index) in tabList"
            :key="item.id"
            @click="changeStyle(index)"
            :class="{'bottomColor':tabList[index]['status'],'angle':tabList[index]['status']}">
              <div class="routeA" @click.prevent="routeTo(item.path)">{{item.name}}</div>
            </li>
            <el-dropdown @command="getGrop">
              <li
                :class="{'bottomColor':aboutUs['status'],'angle':aboutUs['status']}">
                <div class="routeA">关于我们</div>
              </li>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/aboutUs">关于我们</el-dropdown-item>
                <el-dropdown-item command="/contactUs">在线预约</el-dropdown-item>
                <el-dropdown-item command="/talent">人才招聘</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
         </ul>
       </div>
     </div>
   </div>
</div>
</template>

<script>
import eventBus from '../../common/eventBus'
import pathList from '@/config/pathList'
import util from '@/common/util'
export default {
  data () {
    return {
      num: '',
      tabList: [
        {
          id: 1,
          status: true,
          path: '/index',
          name: '首页',
          isLink: true
        },
        {
          id: 2,
          status: false,
          path: '/production',
          name: '产品介绍',
          isLink: true
        },
        {
          id: 4,
          status: false,
          path: '/charge',
          name: '典型案例',
          isLink: true
        }
      ],
      aboutUs: {
        status: false
      },
      isLogin: false
    }
  },
  created () {
    let tabs = sessionStorage.getItem('tabs')
    let aboutUs = sessionStorage.getItem('aboutUs')
    if (tabs) {
      this.tabList = JSON.parse(tabs)
    }
    if (aboutUs) {
      this.aboutUs = JSON.parse(aboutUs)
    }
  },
  mounted () {
    eventBus.$on('changeStyle', this.changeStyle)
    eventBus.$on('custormAnchor', this.custormAnchor)
  },
  methods: {
    // 下拉框路由跳转
    getGrop (path) {
      // 其余tabs的边框重置
      this.changeStyle()
      // 更改下边框颜色
      this.aboutUs = {
        status: true
      }
      // 存储本地
      sessionStorage.setItem('aboutUs', JSON.stringify(this.aboutUs))
      this.$router.push(path)
    },
    // 路由跳转
    routeTo (path) {
      this.$router.push(path)
    },
    // 改变底部边框颜色
    changeStyle (num) {
      // 如果num存在 说明不是getGrop调用的
      if (num || num === 0) {
        // 重置关于我们的下边框
        this.aboutUs = {
          status: false
        }
        sessionStorage.setItem('aboutUs', JSON.stringify(this.aboutUs))
      }
      let arr = JSON.parse(JSON.stringify(this.tabList))
      arr.forEach((item, index) => {
        if (index === num) {
          item.status = true
        } else {
          item.status = false
        }
      })
      this.tabList = arr
      // 存储到本地
      sessionStorage.setItem('tabs', JSON.stringify(arr))
    },
    custormAnchor (anchor) {
      let anchorElement = document.getElementById(anchor)
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    },
    goToControl () {
      let url = pathList.WWWCCBA + '?token=' + encodeURIComponent(localStorage.getItem('token'))
      window.open(url, '_blank')
    },
    logIn () {
      let LoginUrl = pathList.WWWLOGINBACK
      window.open(LoginUrl, '_self')
    },
    logOut () {
      this.$confirm('您确定退出吗?', '提示', {
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
        this.isLogin = false
      }).catch(() => {})
    },
    // 检查登录状态
    checkLogin () {
      let token = localStorage.getItem('token')
      if (token) { // 如果token存在说明登录过了
        this.isLogin = true
        this.getUserInfo()
      }
    },
    getUserInfo () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/login/getLoginUserInfo',
        data: {
          ssoToken: window.localStorage.getItem('token')
        },
        router: this.$router,
        success: (res) => {
          let datas = {
            token: window.localStorage.getItem('token'), // token数据
            userName: util.isEmpty(res.result.userName) ? '' : res.result.userName,
            mobile: util.isEmpty(res.result.mobile) ? '' : res.result.mobile,
            userPhoto: util.isEmpty(res.result.userPhoto) ? '' : res.result.userPhoto,
            companyName: util.isEmpty(res.result.corpName) ? '' : res.result.corpName,
            adminFlag: util.isEmpty(res.result.adminFlag) ? '' : res.result.adminFlag,
            companyCode: util.isEmpty(res.result.corpId) ? '' : res.result.corpId
          }
          this.$store.commit('userLoginInfo', datas)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login a {
  color: #fff;
}
  .header {
    border-bottom: 1px solid #ccc;
    min-width: 1000px;
    .header-right {
      position: absolute;
      display: flex;
      right: 80px;
      top: 50%;
      transform: translateY(-50%);
      height: 60px;
      line-height: 58px;
      .login span,.register span {
        padding: 3px 20px;
        border: 1px solid transparent;
        border-radius: 15px;
      }
      .login {
        cursor: pointer;
        &:hover span{
          border-color: #0A5CA0;
          color: #0A5CA0;
        }
      }
      .register {
        cursor: pointer;
        &:hover span{
          border-color: #0A5CA0;
          color: #0A5CA0;
        }
      }

    }
    .header-bottom {
      padding: 0 80px;
      position: relative;
      height: 61px;
      display: flex;
      .tabs {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
      .logo {
        margin-top: 12px;
        height: 37px;
        width: 370px;
        .telPhone {
          font-weight: bold;
          font-size: 28px;
          line-height: 42px;
          padding-left: 20px;
          .tel-icon {
            font-size: 26px;
          }
          .em {
            font-style: italic;
          }
        }
      }
      .tabs ul {
        display: flex;
        justify-content: space-around
      }
      ul li {
        position: relative;
        font-size: 14px;
        font-weight: bold;
        box-sizing: border-box;
        line-height: 58px;
        // float: left;
        margin: 0 10px;
        border-bottom: 3px solid transparent;
        color: #333;
        // &:hover {
        //  border-bottom: 2px solid #0A5CA0;
        // }
        .routeA {
          text-align: center;
          padding: 0 20px;
          width: 100%;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
      .bottomColor {
        border-bottom: 3px solid #0A5CA0;
        color: #0A5CA0;
        .routeA {
          color: #0A5CA0;
        }
    }
    }
    .angle:after {
      content: '';
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-bottom: 6px solid #0A5CA0;
      position: absolute;
      // background-color: green;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%)
    }
  }
  @media screen and(max-width: 1300px) {
    .logo {
      width: 110px!important;
      overflow: hidden;
    }
  }
</style>
