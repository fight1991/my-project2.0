const MENU = [
  {
    path: '/finance/expense/list',
    name: 'expense-list',
    icon: 'icons-finance-offerAccount',
    permissions: 'CCBA21003010000',
    hidden: false,
    meta: {
      component: resolve => require(['./expenseList.vue'], resolve),
      title: '费用台账'
    }
  },
  {
    path: '/finance/expense/detail',
    name: 'expense-detail',
    permissions: 'CCBA21003010000',
    hidden: true,
    meta: {
      component: resolve => require(['./expenseDetail.vue'], resolve),
      title: '台账详情'
    }
  }
]
export default {MENU}
