// 备案管理
const MENU = {
  path: '/aircraft/record',
  name: 'record',
  icon: 'icons-menu-beianManage',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案管理'
  },
  children: [
    {
      path: '/aircraft/record/airplan',
      name: 'airplan',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '当日飞行计划备案'
      }
    }
  ]
}
export default {MENU}
