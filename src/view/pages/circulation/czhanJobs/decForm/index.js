// 保税获取流转-申报表
const MENU = [
  {
    path: '/circulation/decForm/I/list',
    name: 'outedcform',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '转出申报'
    }
  },
  {
    path: '/circulation/decForm/E/list',
    name: 'incform',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '转入申报'
    }
  },
  {
    path: '/circulation/decForm/decFormQuery/list',
    name: 'decFormQuery',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '申报表查询'
    }
  }
]

export default {MENU}
