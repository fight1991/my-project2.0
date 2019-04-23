// 关检整合申报
const MENU = {
  path: '/eImport/declare',
  name: 'declare',
  icon: 'icons-menu-declare',
  permissions: 'CCBA20203000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '关检整合申报'
  },
  children: [
    {
      path: '/eImport/declare/import',
      name: 'importDec',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口报关单'
      }
    },
    {
      path: '/eImport/declare/export',
      name: 'exportDec',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口报关单'
      }
    },
    {
      path: '/eImport/declare/importRecord',
      name: 'importRecord',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境备案清单'
      }
    },
    {
      path: '/eImport/declare/exportRecord',
      name: 'exportRecord',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境备案清单'
      }
    },
    {
      path: '/eImport/declare/importTaxList',
      name: 'importTaxList',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口核注清单'
      }
    },
    {
      path: '/eImport/declare/exportTaxList',
      name: 'exportTaxList',
      icon: 'icons-menu-price',
      permissions: 'CCBA20203060000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口核注清单'
      }
    }
  ]
}
export default {MENU}
