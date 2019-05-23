// 报关单审核
const MENU = {
  path: '/eImport/taxReviewed',
  name: 'taxReviewed',
  icon: 'icons-menu-taxReviewed',
  permissions: 'CCBA20204020000',
  meta: {
    component: resolve => require(['./index.vue'], resolve),
    title: '核注清单审核'
  }
}
export default {MENU}
