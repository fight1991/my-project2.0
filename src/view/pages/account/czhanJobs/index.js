// 加工贸易账册-场站业务
const MENU = {
  path: '/account/czhanJobs',
  name: 'account-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/handBook/declareFormAcc/list',
      name: 'declareFormAcc',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表'
      }
    },
    {
      path: '/handBook/declareFormAccQuery/list',
      name: 'declareFormAccQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表查询'
      }
    },
    {
      path: '/handBook/deliveryAcc/list',
      name: 'deliveryAcc',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单'
      }
    },
    {
      path: '/handBook/deliveryAccQuery/list',
      name: 'deliveryAccQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单查询'
      }
    },
    {
      path: '/handBook/recipientAcc/list',
      name: 'recipientAcc',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单'
      }
    },
    {
      path: '/handBook/recipientAccQuery/list',
      name: 'recipientAccQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单查询'
      }
    }
  ]
}
export default {MENU}
