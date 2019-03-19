// 逻辑检控设置
const MENU = {
  path: '/eImport/prosecution',
  name: 'prosecution',
  icon: 'icons-menu-setting',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '逻辑检控设置'
  },
  children: [
    {
      path: '/eImport/prosecution/priceRange',
      name: 'priceRange',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./priceRange.vue'], resolve),
        title: '价格区间提示'
      }
    }, {
      path: '/eImport/prosecution/ship',
      name: 'ship',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./ship.vue'], resolve),
        title: '运输方式关系'
      }
    }
  ]
}
export default {MENU}
