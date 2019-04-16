// 加工贸易账册-场站业务
const MENU = {
  path: '/account/czhanJobs',
  name: 'account-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'CCBA20804000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/handBook/declareFormAcc/list',
      name: 'declareFormAcc',
      permissions: 'CCBA20804010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表'
      }
    },
    {
      path: '/handBook/declareFormAccQuery/list',
      name: 'declareFormAccQuery',
      permissions: 'CCBA20804020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表查询'
      }
    },
    {
      path: '/handBook/deliveryAcc/list',
      name: 'deliveryAcc',
      permissions: 'CCBA20804030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单'
      }
    },
    {
      path: '/handBook/deliveryAccQuery/list',
      name: 'deliveryAccQuery',
      permissions: 'CCBA20804050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单查询'
      }
    },
    {
      path: '/handBook/recipientAcc/list',
      name: 'recipientAcc',
      permissions: 'CCBA20804040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单'
      }
    },
    {
      path: '/handBook/recipientAccQuery/list',
      name: 'recipientAccQuery',
      permissions: 'CCBA20804050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单查询'
      }
    }
  ]
}
export default {MENU}
