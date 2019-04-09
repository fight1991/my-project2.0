// 海关监管-场站业务
const MENU = {
  path: '/graininess/czhanJobs',
  name: 'graininess-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/graininess/apply_gra/list',
      name: 'apply_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/graininess/applyQuery_gra/list',
      name: 'applyQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表查询'
      }
    },
    {
      path: '/graininess/stock_gra/list',
      name: 'stock_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/graininess/stockQuery_gra/list',
      name: 'stockQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单查询'
      }
    },
    {
      path: '/graininess/auditRelese_gra/list',
      name: 'auditRelese_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/graininess/releseQuery_gra/list',
      name: 'releseQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单查询'
      }
    },
    {
      path: '/sea/carInfo_gra/list',
      name: 'carInfo_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/carInfoQuery_gra/list',
      name: 'carInfoQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息查询'
      }
    }
  ]
}
export default {MENU}
