// 报关单审核
const MENU = {
  path: '/eImport/reviewed',
  name: 'reviewed',
  icon: 'icons-menu-decCheck',
  permissions: 'CCBA20204010000',
  meta: {
    component: resolve => require(['./index.vue'], resolve),
    title: '报关单审核'
  }
}
export default {MENU}
