// 收发货单
const MENU = {
  path: '/circulation/goodsBill',
  name: 'circulation-goodsBill',
  icon: 'icons-menu-goodsBill',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '收发货单'
  },
  children: [
    {
      path: '/circulation/goodsBill/deliver/list',
      name: 'billDeliver',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./billDeliver.vue'], resolve),
        title: '发货登记'
      }
    },
    {
      path: '/circulation/goodsBill/take/list',
      name: 'billTake',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./billTake.vue'], resolve),
        title: '收货登记'
      }
    },
    {
      path: '/circulation/goodsBill/query/list',
      name: 'billQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./billQuery.vue'], resolve),
        title: '收发货单查询'
      }
    }
  ]
}
export default {MENU}
