// 保税获取流转-收发货单
const MENU = {
  path: '/circulation/goodsBill',
  name: 'circulation-goodsBill',
  icon: 'icons-menu-goodsBill',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../../common/abstract.vue'], resolve),
  meta: {
    title: '收发货单'
  },
  children: [
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
}
export default {MENU}
