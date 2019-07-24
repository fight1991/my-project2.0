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
  },
  {
    path: '/finance/accountManage/detail',
    name: 'accountManage-detail',
    permissions: 'CCBA21003010000',
    hidden: true,
    meta: {
      component: resolve => require(['./accountDetail.vue'], resolve),
      title: '对账单详情'
    }
  }
]
export default {MENU}
