// 关检整合申报
const MENU = {
  path: '/eImport/declare',
  name: 'declare',
  icon: 'icons-menu-declare',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '关检整合申报'
  },
  children: [
    {
      path: '/eImport/declare/importDec',
      name: 'importDec',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '进口报关单'
      }
    }, {
      path: '/eImport/declare/importRecord',
      name: 'importRecord',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '进境备案清单'
      }
    }, {
      path: '/eImport/declare/exportDec',
      name: 'exportDec',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '出口报关单'
      }
    }, {
      path: '/eImport/declare/exportRecord',
      name: 'exportRecord',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '出境备案清单'
      }
    }, {
      path: '/eImport/declare/importTaxList',
      name: 'importTaxList',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '进口核注清单'
      }
    }, {
      path: '/eImport/declare/exportTaxList',
      name: 'exportTaxList',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '出口核注清单'
      }
    }
  ]
}
export default {MENU}
