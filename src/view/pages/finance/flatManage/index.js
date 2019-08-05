const MENU = [
  {
    path: '/finance/flatManage/list',
    name: 'flatManage-list',
    icon: 'icons-finance-accountManage',
    permissions: 'CCBA21603000000',
    hidden: false,
    meta: {
      component: resolve => require(['./flatList.vue'], resolve),
      title: '平账管理'
    }
  }
]
export default {MENU}
