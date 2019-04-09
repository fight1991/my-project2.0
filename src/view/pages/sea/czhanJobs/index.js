// 海关监管-场站业务
const MENU = {
  path: '/sea/czhanJobs',
  name: 'sea-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/sea/apply_sea/list',
      name: 'apply_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/sea/applyQuery_sea/list',
      name: 'applyQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表查询'
      }
    },
    {
      path: '/sea/stock_sea/list',
      name: 'stock_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/sea/stockQuery_sea/list',
      name: 'stockQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单查询'
      }
    },
    {
      path: '/sea/auditRelese_sea/list',
      name: 'auditRelese_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/sea/releseQuery_sea/list',
      name: 'releseQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单查询'
      }
    },
    {
      path: '/sea/carInfo_sea/list',
      name: 'carInfo_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/carInfoQuery_sea/list',
      name: 'carInfoQuery_sea',
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
