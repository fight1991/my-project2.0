import store from '@/store/store'
import router from '@/router'
export default {
  state: {
    // 主页
    homeTab: {
      title: '首页',
      component: resolve => require(['@/view/pages/index.vue'], resolve),
      path: '/eImport/index',
      route: {
        path: '/eImport/index',
        name: 'index',
        query: {},
        params: {}
      }
    },
    // 当前活动页签
    currentTab: {},
    // 所有打开的页签数据
    tabsList: [{
      title: '首页',
      component: resolve => require(['@/view/pages/index.vue'], resolve),
      path: '/eImport/index',
      route: {
        path: '/eImport/index',
        name: 'index',
        query: {},
        params: {}
      }
    }]
  },
  getters: {
    // 获取 打开的 tab 列表
    GetOpenedTabs (state) {
      return state.tabsList
    },
    // 获取 当前点击打开的 tab
    GetCurrentTab (state) {
      return state.currentTab
    }
  },
  mutations: {
    // 从 tab 列表 移除 tab
    RemoveTab (state, data) {
      // 数据移除
      state.tabsList = state.tabsList.filter(item => {
        return item.path !== data.path
      })
      // 判断是否是当前打开的页签
      if (state.currentTab.path === data.path) {
        let index = state.tabsList.length > 1 ? 1 : 0
        store.commit('SetCurrentTab', state.tabsList[index])
        if (JSON.stringify(state.tabsList[index].route.params) === '{}') {
          router.push({
            path: state.tabsList[index].route.path,
            query: state.tabsList[index].route.query
          })
        } else {
          router.push({
            name: state.tabsList[index].route.name,
            params: state.tabsList[index].route.params
          })
        }
      }
    },
    // 关闭页签 all关闭所有；other关闭其他；
    CloseTabs (state, type) {
      let json = []
      json.push(state.homeTab)
      if (type === 'all') {
        state.tabsList = json
        store.commit('SetCurrentTab', state.tabsList[0])
        router.push({
          path: state.homeTab.path
        })
      } else if (type === 'other') {
        if (state.tabsList.length > 1 && state.homeTab.path !== state.currentTab.path) {
          json.push(state.currentTab)
        }
        state.tabsList = json
      }
    },
    // 新增页签数据
    SetTabData (state, data) {
      // 判断 tab 项是否已存在
      let tabExsit = state.tabsList.find(i => i.path === data.path)
      if (!tabExsit) {
        state.tabsList.push(data)
      }
      state.currentTab = data
    },
    // 设置当前活动tab
    SetCurrentTab (state, data) {
      state.currentTab = data
    }
  },
  actions: {}
}
