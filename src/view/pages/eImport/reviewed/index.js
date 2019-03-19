// 报关单审核
const MENU = {
  path: '/eImport/reviewed',
  name: 'reviewed',
  icon: 'icons-menu-decCheck',
  permissions: 'SAASOM0900000000',
  meta: {
    component: resolve => require(['./demo.vue'], resolve),
    title: '报关单审核'
  }
}
export default {MENU}
