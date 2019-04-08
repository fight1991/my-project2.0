
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
      name: 'sea-bwl',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./bwl_sea.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/sea/cmb/list',
      name: 'sea-cmb',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./cmb.vue'], resolve),
        title: '加工贸易耗料单'
      }
    },
    {
      path: '/sea/accountBookVer/list',
      name: 'sea-accountBookVer',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./accountBookVer.vue'], resolve),
        title: '加工贸易账册报核'
      }
    },
    {
      path: '/sea/accountBook/list',
      name: 'sea-accountBook',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./accountBook_sea.vue'], resolve),
        title: '加工贸易账册'
      }
    },
    {
      path: '/sea/datainput/I/list',
      name: 'sea-taxList_I',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./taxList_I_sea.vue'], resolve),
        title: '保税核注清单(进口)'
      }
    },
    {
      path: '/sea/datainput/E/list',
      name: 'sea-taxList_E',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./taxList_E_sea.vue'], resolve),
        title: '保税核注清单(出口)'
      }
    },
    {
      path: '/sea/apply/list',
      name: 'sea-apply',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./apply_sea.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/sea/stock/list',
      name: 'sea-stock',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./stockList_sea.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/sea/auditRelese/list',
      name: 'sea-auditRelese',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./auditRelese_sea.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/sea/centDeclare/list',
      name: 'sea-centDeclare',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./centDeclare_sea.vue'], resolve),
        title: '集中报关'
      }
    },
    {
      path: '/sea/carInfo/list',
      name: 'sea-carInfo',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./carInfo_sea.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/clearance/list',
      name: 'sea-clearance',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./clearance.vue'], resolve),
        title: '清单结关'
      }
    }
  ]
}
export default {MENU}
