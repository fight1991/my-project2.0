// 海关特殊监管区域-数据录入
const MENU = {
  path: '/sea/dataInfo',
  name: 'sea-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据录入'
  },
  children: [
    {
      path: '/sea/bwl/list',
      name: 'bwl_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/sea/cmb/list',
      name: 'cmb',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易耗料单'
      }
    },
    {
      path: '/sea/accountBookVer/list',
      name: 'accountBookVer',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册报核'
      }
    },
    {
      path: '/sea/accountBook/list',
      name: 'accountBook_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册'
      }
    },
    {
      path: '/sea/datainput/I/list',
      name: 'taxList_I_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单(进口)'
      }
    },
    {
      path: '/sea/datainput/E/list',
      name: 'taxList_E_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单(出口)'
      }
    },
    {
      path: '/sea/apply/list',
      name: 'apply_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/sea/stock/list',
      name: 'stockList_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/sea/auditRelese/list',
      name: 'auditRelese_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/sea/centDeclare/list',
      name: 'centDeclare_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '集中报关'
      }
    },
    {
      path: '/sea/carInfo/list',
      name: 'carInfo_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/clearance/list',
      name: 'clearance',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '清单结关'
      }
    }
  ]
}
export default {MENU}
