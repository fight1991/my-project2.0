// 进口委托
const MENU = {
  path: '/entrust/importEntrust',
  name: 'importEntrust',
  icon: 'icons-menu-importEn',
  permissions: 'CCBA20208000000',
  meta: {
    component: resolve => require(['./index.vue'], resolve),
    title: '进口委托'
  }
}
export default {MENU}
