import Vue from 'vue'
import Router from 'vue-router'
import Errors from './view/error'
import config from './config/config'
import util from './common/util'

import EImport from './view/pages/eImport/router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/control'
  }, {
    path: '/main',
    name: 'main',
    component: resolve => require(['./view/pages/main.vue'], resolve),
    meta: {
      title: '主页'
    },
    children: []
  }, {
    path: '/index',
    name: 'www',
    hidden: true,
    icon: 'el-icon-menu',
    permissions: 'WF000000',
    component: resolve => require(['./view/www/index.vue'], resolve),
    meta: {
      title: 'CCBA官网'
    }
  }, {
    path: '/control',
    name: 'control',
    hidden: true,
    icon: 'el-icon-menu',
    permissions: 'WF000000',
    component: resolve => require(['./view/control/index.vue'], resolve),
    meta: {
      title: '工作台'
    }
  }, {
    path: '/news/detail',
    name: '详情',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./view/control/components/detail.vue'], resolve),
    meta: {
      title: '详情'
    }
  }
]

routes[1].children.push(Errors.MENU)
routes[1].children.push(...EImport.MENU)

const router = new Router({
  mode: 'history',
  base: '',
  routes: routes
})

router.beforeEach((to, from, next) => {
  /* 登录校验：
     1、登录页面直接放行
  */
  if (to.path === '/login') {
    window.localStorage.clear()
    window.sessionStorage.clear()
    let callbackUrl = util.delTokenUrl()
    let goLoginUrl = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['COMMON'] + '/login?callback=' + callbackUrl + '&sysId=' + config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev']['SYSID']
    window.open(goLoginUrl, '_self')
  } else {
    if (!router.app.$options.store.state.isFirst) {
      if (router.app.$options.store.state.userLoginInfo.token === '') {
        next('/login')
      } else {
        next()
      }
    } else {
      // if (to.path === '/error/404' || to.path === '/error/500' || to.path === '/error/wait') {
      //   next()
      // } else {
      if (!util.isEmpty(to.query.token)) {
        router.app.$options.store.commit('setToken', to.query.token)
        window.localStorage.setItem('token', to.query.token)
      } else if (!util.isEmpty(window.localStorage.getItem('token'))) {
        router.app.$options.store.commit('setToken', window.localStorage.getItem('token'))
      } else {
        next('/login')
      }
      router.app.$options.store.dispatch('ajax', {
        url: 'API@/login/login/getLoginUserInfo',
        data: {
          ssoToken: window.localStorage.getItem('token')
        },
        router: router,
        success: (res) => {
          let datas = {
            token: window.localStorage.getItem('token'), // token数据
            userName: util.isEmpty(res.result.userName) ? '' : res.result.userName,
            mobile: util.isEmpty(res.result.mobile) ? '' : res.result.mobile,
            userPhoto: util.isEmpty(res.result.userPhoto) ? '' : res.result.userPhoto,
            companyName: util.isEmpty(res.result.corpName) ? '' : res.result.corpName
          }
          if (!util.isEmpty(res.result.userTitleList)) {
            sessionStorage.setItem('userTitleList', JSON.stringify(res.result.userTitleList))
          }
          router.app.$options.store.commit('userLoginInfo', datas)
          router.app.$options.store.commit('isFirstChange')
          router.app.$options.store.dispatch('ajax', {
            url: 'API@/login/userPrivilege/getUserPrivileges',
            data: {},
            router: router,
            success: (res) => {
              let json = {}
              let datas = res.result
              for (let x = 0, len = datas.length; x < len; x++) {
                json[datas[x].objectId] = datas[x].auth
              }
              window.localStorage.setItem('menuCodes', JSON.stringify(json))
              next()
            }
          })
        }
      })
      // }
    }
  }
})

router.afterEach(route => {
  // 路径跳转后替换页面title
  document.title = 'CCBA-' + route.meta.title || 'CCBA • 智慧通关平台'
  let path = route.fullPath
  // 判断路由是否携带了系统参数 token
  if (path.indexOf('token=') !== -1) {
    let pathAtt = path.split('?')
    let paramsObj = {}
    let paramsAtt = pathAtt[1].split('&')
    path = pathAtt[0]
    for (let i in paramsAtt) {
      paramsObj[paramsAtt[i].split('=')[0]] = unescape(paramsAtt[i].split('=')[1])
    }
    let x = 1
    for (let item in paramsObj) {
      if (item !== 'token') {
        if (x === 1) {
          path += '?' + item + '=' + paramsObj[item]
        } else {
          path += '&' + item + '=' + paramsObj[item]
        }
        x++
      }
    }
  }
  router.app.$options.store.commit('SetTabData', {
    title: route.meta.title,
    component: route.meta.component,
    path: path,
    route: route
  })
})
export default router
