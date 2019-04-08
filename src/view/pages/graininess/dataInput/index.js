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
      name: 'graininess-bwl',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./bwl.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/graininess/datainput/I/list',
      name: 'graininess-taxList_I',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./taxList_I.vue'], resolve),
        title: '保税核注清单(进口)'
      }
    },
    {
      path: '/graininess/datainput/E/list',
      name: 'graininess-taxList_E',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./taxList_E.vue'], resolve),
        title: '保税核注清单(出口)'
      }
    },
    {
      path: '/graininess/apply/list',
      name: 'graininess-apply',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./apply.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/graininess/stock/list',
      name: 'graininess-stock',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./stockList.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/graininess/auditRelese/list',
      name: 'graininess-auditRelese',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./auditRelese.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/graininess/centDeclare/list',
      name: 'graininess-centDeclare',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./centDeclare.vue'], resolve),
        title: '集中报关'
      }
    },
    {
      path: '/graininess/carInfo/list',
      name: 'graininess-carInfo',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./carInfo.vue'], resolve),
        title: '车辆信息'
      }
    }
  ]
}
export default {MENU}
