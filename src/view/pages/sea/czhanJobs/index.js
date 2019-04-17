// 海关监管-场站业务
const MENU = {
  path: '/sea/czhanJobs',
  name: 'sea-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'CCBA20904000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    {
      path: '/sea/apply_sea/list',
      name: 'apply_sea',
      permissions: 'CCBA20904010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表'
      }
    },
    {
      path: '/sea/applyQuery_sea/list',
      name: 'applyQuery_sea',
      permissions: 'CCBA20904020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表查询'
      }
    },
    {
      path: '/sea/applyIxEQuery_sea/list',
      name: 'applyIxEQuery_sea',
      permissions: 'CCBA20904040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '申报表货物进出查询'
      }
    },
    {
      path: '/sea/stock_sea/list',
      name: 'stock_sea',
      permissions: 'CCBA20904040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单'
      }
    },
    {
      path: '/sea/stockQuery_sea/list',
      name: 'stockQuery_sea',
      permissions: 'CCBA20904050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单查询'
      }
    },
    {
      path: '/sea/auditRelese_sea/list',
      name: 'auditRelese_sea',
      permissions: 'CCBA20904060000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单'
      }
    },
    {
      path: '/sea/releseQuery_sea/list',
      name: 'releseQuery_sea',
      permissions: 'CCBA20904070000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单查询'
      }
    },
    {
      path: '/sea/stockReleseQuery_sea/list',
      name: 'stockReleseQuery_sea',
      permissions: 'CCBA20904070000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单生成核放单查询'
      }
    },
    {
      path: '/sea/taxReleseQuery_sea/list',
      name: 'taxReleseQuery_sea',
      permissions: 'CCBA20904070000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核注清单生成核放单查询'
      }
    },
    {
      path: '/sea/carInfo_sea/list',
      name: 'carInfo_sea',
      permissions: 'CCBA20904100000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息'
      }
    },
    {
      path: '/sea/carInfoQuery_sea/list',
      name: 'carInfoQuery_sea',
      permissions: 'CCBA20904110000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息查询'
      }
    }
  ]
}
export default {MENU}
