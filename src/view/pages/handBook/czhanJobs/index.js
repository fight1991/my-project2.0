// 加工贸易手册-场站业务
const MENU = {
  path: '/handBook/czhanJobs',
  name: 'handBook-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'CCBA20704000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/handBook/declareForm/list',
      name: 'declareForm',
      permissions: 'CCBA20704010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表'
      }
    },
    {
      path: '/handBook/declareFormQuery/list',
      name: 'declareFormQuery',
      permissions: 'CCBA20704020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工申报表查询'
      }
    },
    {
      path: '/handBook/delivery/list',
      name: 'delivery',
      permissions: 'CCBA20704030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单'
      }
    },
    {
      path: '/handBook/deliveryQuery/list',
      name: 'deliveryQuery',
      permissions: 'CCBA20704050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工发货单查询'
      }
    },
    {
      path: '/handBook/recipient/list',
      name: 'recipient',
      permissions: 'CCBA20704040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单'
      }
    },
    {
      path: '/handBook/recipientQuery/list',
      name: 'recipientQuery',
      permissions: 'CCBA20704050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '外发加工收货单查询'
      }
    }
  ]
}
export default {MENU}
