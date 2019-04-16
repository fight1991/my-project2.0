// 保税获取流转-收发货单
const MENU = [
  {
    path: '/circulation/goodsBill/deliver/list',
    name: 'deliver',
    permissions: 'CCBA21101040000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '发货登记'
    }
  },
  {
    path: '/circulation/goodsBill/take/list',
    name: 'take',
    permissions: 'CCBA21101050000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '收货登记'
    }
  },
  {
    path: '/circulation/goodsBill/query/list',
    name: 'query',
    permissions: 'CCBA21101060000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '收发货单查询'
    }
  }
]
export default {MENU}
