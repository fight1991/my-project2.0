// 海关监管-场站业务
const MENU = {
  path: '/graininess/czhanJobs',
  name: 'graininess-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'CCBA21003000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/graininess/apply_gra/list',
      name: 'apply_gra',
      permissions: 'CCBA21003010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/graininess/applyQuery_gra/list',
      name: 'applyQuery_gra',
      permissions: 'CCBA21003020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表查询'
      }
    },
    {
      path: '/graininess/stock_gra/list',
      name: 'stock_gra',
      permissions: 'CCBA21003040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/graininess/stockQuery_gra/list',
      name: 'stockQuery_gra',
      permissions: 'CCBA21003050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单查询'
      }
    },
    {
      path: '/graininess/auditRelese_gra/list',
      name: 'auditRelese_gra',
      permissions: 'CCBA21003060000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单录入'
      }
    },
    {
      path: '/graininess/releseQuery_gra/list',
      name: 'releseQuery_gra',
      permissions: 'CCBA21003070000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单查询'
      }
    },
    {
      path: '/sea/carInfo_gra/list',
      name: 'carInfo_gra',
      permissions: 'CCBA21003100000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/carInfoQuery_gra/list',
      name: 'carInfoQuery_gra',
      permissions: 'CCBA21003110000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息查询'
      }
    }
  ]
}
export default {MENU}
