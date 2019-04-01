// 商品资料库
const MENU = {
  path: '/aircraft/record',
  name: 'record',
  icon: 'icons-menu-beianManage',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    component: resolve => require(['./index.vue'], resolve),
    title: '备案管理'
  }
}
export default {MENU}
