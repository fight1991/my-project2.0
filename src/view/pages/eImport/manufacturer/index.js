// 厂商
const MENU = {
  path: '/eImport/manufacturer',
  name: 'manufacturer',
  icon: 'icons-menu-admin',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '厂商管理'
  },
  children: [
    {
      path: '/eImport/manufacturer/customer',
      name: 'customer',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./customer.vue'], resolve),
        title: '客户'
      }
    }, {
      path: '/eImport/manufacturer/supplier',
      name: 'supplier',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./supplier.vue'], resolve),
        title: '供应商'
      }
    }
  ]
}
export default {MENU}
