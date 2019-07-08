const MENU = [
  {
    path: '/finance/offerManage/list',
    name: 'offerManage-list',
    permissions: 'CCBA21003010000',
    hidden: false,
    meta: {
      component: resolve => require(['./offerList.vue'], resolve),
      title: '报价列表'
    }
  },
  {
    path: '/finance/offerManage/detail',
    name: 'offerManage-detail',
    permissions: 'CCBA21003010000',
    hidden: false,
    meta: {
      component: resolve => require(['./offerDetail.vue'], resolve),
      title: '报价详情'
    }
  },
  {
    path: '/finance/offerManage/offerAdd',
    name: 'offerManage-offerAdd',
    permissions: 'CCBA21003010000',
    hidden: false,
    meta: {
      component: resolve => require(['./offerAdd.vue'], resolve),
      title: '新建报价'
    }
  }
]
export default {MENU}
