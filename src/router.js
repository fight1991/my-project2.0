import Vue from 'vue'
import Router from 'vue-router'
import Errors from './view/error'
import config from './config/config'
import util from './common/util'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/index'
  }, {
    path: '/main',
    name: '位置',
    component: resolve => require(['./view/main.vue'], resolve),
    children: [
      {
        path: '/index',
        name: '工作台',
        hidden: true,
        icon: 'el-icon-menu',
        permissions: 'WF000000',
        component: resolve => require(['./view/index.vue'], resolve),
        meta: {
          title: '工作台'
        }
      }
    ]
  }
]

routes[1].children.push(Errors.MENU)

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
            userPhoto: util.isEmpty(res.result.userPhoto) ? '' : res.result.userPhoto
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
})
export default router
