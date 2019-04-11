// 保税获取流转-收发货单
const MENU = [
  {
    path: '/circulation/goodsBill/deliver/list',
    name: 'deliver',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '发货登记'
    }
  },
  {
    path: '/circulation/goodsBill/take/list',
    name: 'take',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '收货登记'
    }
  },
  {
    path: '/circulation/goodsBill/query/list',
    name: 'query',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '收发货单查询'
    }
  }
]
export default {MENU}
