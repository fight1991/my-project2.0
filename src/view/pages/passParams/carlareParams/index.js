
const MENU = {
  path: '/passParams/carParams',
  name: 'passParams-carParams',
  icon: 'icons-menu-carParams',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '汽车申报参数'
  },
  children: [
    {
      path: '/passParams/ceCompare/list',
      name: 'ceCompare',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '中英文对照'
      }
    },
    {
      path: '/passParams/carParter/list',
      name: 'carParter',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '汽车零部件清单'
      }
    }
  ]
}
export default {MENU}
