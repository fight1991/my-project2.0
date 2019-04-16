// 在港申报
const MENU = {
  path: '/aircraft/inLare',
  name: 'aircraft-inLare',
  icon: 'icons-menu-inLare',
  permissions: 'CCBA20403000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '在港申报'
  },
  children: [
    {
      path: '/aircraft/inLare/customPort',
      name: 'customPort',
      permissions: 'CCBA20403010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '海关在港申报'
      }
    },
    {
      path: '/aircraft/inLare/materials',
      name: 'materials',
      permissions: 'CCBA20403020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '供退物料申报'
      }
    }
  ]
}
export default {MENU}
