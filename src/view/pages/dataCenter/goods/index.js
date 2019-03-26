// 商品资料库
const MENU = {
  path: '/dataCenter/goods',
  name: 'goods',
  icon: 'icons-menu-productInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '商品资料库'
  },
  children: [
    {
      path: '/dataCenter/goods/noBonded',
      name: 'noBonded',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '非保税商品库'
      }
    }, {
      path: '/dataCenter/goods/bonded',
      name: 'bonded',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税商品库'
      }
    }
  ]
}
export default {MENU}
