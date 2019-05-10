// 删改单登记
const MENU = {
  path: '/eImport/decRegister',
  name: 'decRegister',
  icon: 'icons-menu-decRegister',
  permissions: 'CCBA20208000000',
  meta: {
    component: resolve => require(['./index.vue'], resolve),
    title: '删改单登记'
  }
}
export default {MENU}
