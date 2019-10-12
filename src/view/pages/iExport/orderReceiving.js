// 接单
const MENU = {
  path: '/eImport/receipt',
  name: 'receipt',
  icon: 'icons-menu-receipt',
  permissions: 'CCBA20202000000',
  component: resolve => require(['../../common/abstract.vue'], resolve),
  meta: {
    title: '接单'
  },
  children: [
    {
      path: '/eImport/orderReceiving/iOrderReceiving',
      name: 'iOrderReceiving',
      icon: 'icons-menu-price',
      permissions: 'CCBA20202010000',
      hidden: false,
      meta: {
        component: resolve => require(['./declaration/receiveOrders.vue'], resolve),
        title: '进口接单',
        iEFlag: 'import'
      }
    }, {
      path: '/eImport/orderReceiving/eOrderReceiving',
      name: 'eOrderReceiving',
      icon: 'icons-menu-price',
      permissions: 'CCBA20202020000',
      hidden: false,
      meta: {
        component: resolve => require(['./declaration/receiveOrders.vue'], resolve),
        title: '出口接单',
        iEFlag: 'export'
      }
    }
  ]
}
export default {MENU}
