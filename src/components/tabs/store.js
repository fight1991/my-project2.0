import store from '@/store/store'
import router from '@/router'
import util from '@/common/util'
export default {
  state: {
    // 主页
    homeTab: {},
    // 当前活动页签
    currentTab: {},
    // 所有打开的页签数据
    tabsList: []
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
    // 关闭页签:data :url 或 tabId
    CloseTab (state, data) {
      let index = 0
      for (let x in state.tabsList) {
        if ((state.tabsList[x].path === data || state.tabsList[x].tabId === data) && !state.tabsList[x].isDel) {
          index = x
          break
        }
      }
      store.commit('RemoveTab', state.tabsList[index])
    },
    SetTabTitle (state, data) {
      console.log(state)

      for (let x in state.tabsList) {
        if ((state.tabsList[x].path === data.id || state.tabsList[x].tabId === data.id) && !state.tabsList[x].isDel) {
          state.tabsList[x].title = data.title
          break
        }
      }
    },
    // 从 tab 列表 移除 tab
    RemoveTab (state, data) {
      let firstIndex = 0
      for (let x in state.tabsList) {
        if (state.tabsList[x].path === data.path && !state.tabsList[x].isDel) {
          state.tabsList[x].isDel = true
          state.tabsList[x].component = ''
          break
        }
      }
      for (let x in state.tabsList) {
        if (x > 0 && !state.tabsList[x].isDel) {
          firstIndex = x
          break
        }
      }
      let listLength = state.tabsList.filter(item => {
        return !item.isDel
      }).length
      if (state.currentTab.path === data.path) {
        let index = listLength > 1 ? firstIndex : 0
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
      // // 数据移除
      // state.tabsList = state.tabsList.filter(item => {
      //   return item.path !== data.path
      // })
      // 判断是否是当前打开的页签
      // if (state.currentTab.path === data.path) {
      //   let index = state.tabsList.length > 1 ? 1 : 0
      //   store.commit('SetCurrentTab', state.tabsList[index])
      //   if (JSON.stringify(state.tabsList[index].route.params) === '{}') {
      //     router.push({
      //       path: state.tabsList[index].route.path,
      //       query: state.tabsList[index].route.query
      //     })
      //   } else {
      //     router.push({
      //       name: state.tabsList[index].route.name,
      //       params: state.tabsList[index].route.params
      //     })
      //   }
      // }
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
        if (state.tabsList.length > 1) {
          for (let x = 1; x < state.tabsList.length; x++) {
            if (state.tabsList[x].path !== state.currentTab.path) {
              state.tabsList[x].isDel = true
              state.tabsList[x].component = ''
            }
          }
        }
      }
    },
    // 新增页签数据
    SetTabData (state, data) {
      // 判断 tab 项是否已存在
      let tabExsit = state.tabsList.find(i => {
        return (i.tabId === data.tabId || i.path === data.path) && i.isDel === false
      })
      if (!tabExsit) {
        state.tabsList.push(data)
      }
      if (tabExsit && data.path !== tabExsit.path) {
        // 如果携带了参数
        if (!util.objIsEmpty(data.query) || !util.objIsEmpty(data.params)) {
          let index = state.tabsList.findIndex(item => {
            return item === tabExsit
          })
          data.query = { ...data.route.query }
          data.params = { ...data.route.params }
          state.tabsList.splice(index, 1, data)
        } else {
          data = tabExsit
        }
      }
      state.currentTab = data
    },
    // 指定位置新增页签数据
    SetTabDataIndex (state, data) {
      // 判断 tab 项是否已存在
      let tabExsit = state.tabsList.find(i => i.path === data.path && i.isDel === false)
      if (!tabExsit) {
        state.tabsList.splice(data.other, 1, data)
      }
      state.currentTab = data
    },
    // 设置当前活动tab
    SetCurrentTab (state, data) {
      state.currentTab = data
    },
    SetChildSysData (state, data) {
      state.homeTab = {
        tabId: 'index',
        title: '首页',
        component: resolve => require([`@/view/pages/${data}/index.vue`], resolve),
        path: `/${data}/index`,
        route: {
          path: `/${data}/index`,
          name: `${data}-index`,
          query: {},
          params: {}
        },
        other: '',
        isDel: false
      }
      state.tabsList[0] = {
        tabId: 'index',
        title: '首页',
        component: resolve => require([`@/view/pages/${data}/index.vue`], resolve),
        path: `/${data}/index`,
        route: {
          path: `/${data}/index`,
          name: `${data}-index`,
          query: {},
          params: {}
        },
        other: '',
        isDel: false
      }
    }
  },
  actions: {}
}
