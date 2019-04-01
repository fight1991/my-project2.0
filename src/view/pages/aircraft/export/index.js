// 出境/港申报
const MENU = {
  path: '/aircraft/export',
  name: 'aircraft-export',
  icon: 'icons-menu-outLare',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '出境/港申报'
  },
  children: [
    {
      path: '/aircraft/export/exportDynamic',
      name: 'exportDynamic',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境/港动态申报'
      }
    },
    {
      path: '/aircraft/export/exportDocument',
      name: 'exportDocument',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境/港单证申报'
      }
    }
  ]
}
export default {MENU}
