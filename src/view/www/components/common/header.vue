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
     <div class="header-bottom mainer">
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
import config from '@/config/config'
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
      }
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
      if (num) {
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
    logIn () {
      let LoginUrl = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['LOGIN']
      window.open(LoginUrl, '_self')
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
    .line-through {
      height: 41px;
      width: 100%;
      background-color: #0A5CA0;
      display: none;
    }
    .header-top {
      line-height: 40px;
      color: #fff;
      .em {
        font-style: italic;
      }
    }
    .header-bottom {
      height: 61px;
      display: flex;
      justify-content: space-between;
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
        font-size: 16px;
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
</style>
