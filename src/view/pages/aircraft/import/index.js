// 进境/港申报
const MENU = {
  path: '/aircraft/import',
  name: 'aircraft-import',
  icon: 'icons-menu-importLare',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '进境/港申报'
  },
  children: [
    {
      path: '/aircraft/import/importDynamic',
      name: 'importDynamic',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港动态申报'
      }
    },
    {
      path: '/aircraft/import/importDocument',
      name: 'importDocument',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港单证申报'
      }
    }
  ]
}
export default {MENU}
