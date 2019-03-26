const MENU = [
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: resolve => require(['../www/components/main.vue'], resolve)
  },
  {
    path: '/production',
    name: 'production',
    meta: {
      title: '产品介绍'
    },
    component: resolve => require(['../www/components/production.vue'], resolve)
  },
  {
    path: '/charge',
    name: 'charge',
    meta: {
      title: '典型案例'
    },
    component: resolve => require(['../www/components/charge.vue'], resolve)
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    meta: {
      title: '关于我们'
    },
    component: resolve => require(['../www/components/aboutUs.vue'], resolve)
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    meta: {
      title: '在线预约'
    },
    component: resolve => require(['../www/components/orderInline.vue'], resolve)
  },
  {
    path: '/productOrder',
    name: 'productOrder',
    meta: {
      title: '产品订购'
    },
    component: resolve => require(['../www/components/productOrder.vue'], resolve)
  }
]
export default { MENU }