const MENU = [
  {
    path: '/finance/billManage/list',
    name: 'billManage-list',
    icon: 'icons-finance-billManage',
    permissions: 'CCBA21603000000',
    hidden: false,
    meta: {
      component: resolve => require(['./billList.vue'], resolve),
      title: '发票管理'
    }
  }
]
export default {MENU}
