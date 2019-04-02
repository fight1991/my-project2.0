// 出境/港申报
const MENU = {
  path: '/aircraft/iEport',
  name: 'aircraft-iEport',
  icon: 'icons-menu-ieport',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '进/出境/港申报'
  },
  children: [
    {
      path: '/aircraft/iEport/importDynamic',
      name: 'importDynamic',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港动态申报'
      }
    },
    {
      path: '/aircraft/iEport/importDocument',
      name: 'importDocument',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港单证申报'
      }
    },
    {
      path: '/aircraft/iEport/exportDynamic',
      name: 'exportDynamic',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境/港动态申报'
      }
    },
    {
      path: '/aircraft/iEport/exportDocument',
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
