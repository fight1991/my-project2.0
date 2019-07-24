const MENU = [
  {
    path: '/finance/accountManage/list',
    name: 'accountManage-list',
    icon: 'icons-finance-accountManage',
    permissions: 'CCBA21601000000',
    hidden: false,
    meta: {
      component: resolve => require(['./accountList.vue'], resolve),
      title: '账单管理'
    }
  }
  // {
  //   path: '/finance/expense/detail',
  //   name: 'expense-detail',
  //   permissions: 'CCBA21003010000',
  //   hidden: false,
  //   meta: {
  //     component: resolve => require(['./offerDetail.vue'], resolve),
  //     title: '台账详情'
  //   }
  // }
]
export default {MENU}
