// 账册
const MENU = {
  path: '/graininess/dataInfo',
  name: 'graininess-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据录入'
  },
  children: [
    {
      path: '/graininess/bwl/list',
      name: 'bwl',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/graininess/datainput/I/list',
      name: 'taxList_I',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单(进口)'
      }
    },
    {
      path: '/graininess/datainput/E/list',
      name: 'taxList_E',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单(出口)'
      }
    },
    {
      path: '/graininess/apply/list',
      name: 'apply',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/graininess/stock/list',
      name: 'stock',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/graininess/auditRelese/list',
      name: 'auditRelese',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/graininess/centDeclare/list',
      name: 'centDeclare',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '集中报关'
      }
    },
    {
      path: '/graininess/carInfo/list',
      name: 'carInfo',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    }
  ]
}
export default {MENU}
