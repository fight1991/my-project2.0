// 通关状态-报关单查询
const MENU = {
  path: '/passStatus/decQuery',
  name: 'passStatus-decQuery',
  icon: 'icons-menu-decQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '报关单查询'
  },
  children: [
    {
      path: '/passStatus/receiptQuery/list',
      name: 'receiptQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '回执查询'
      }
    },
    {
      path: '/passStatus/passStatusQuery/list',
      name: 'passStatusQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '通关状态查询'
      }
    }
  ]
}
export default {MENU}
