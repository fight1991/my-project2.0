const MENU = {
  path: '/sea/dataQuery',
  name: 'sea-dataQuery',
  icon: 'icons-menu-dataQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据查询'
  },
  children: [
    {
      path: '/sea/accountBookQuery/list',
      name: 'accountBookQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册查询'
      }
    },
    {
      path: '/sea/bwlQuery/list',
      name: 'bwlQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册数据查询'
      }
    },
    {
      path: '/sea/applyQuery/list',
      name: 'applyQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表数据查询'
      }
    },
    {
      path: '/sea/applyIxEQuery/list',
      name: 'applyIxEQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '申报表货物进出查询'
      }
    },
    {
      path: '/sea/stockQuery/list',
      name: 'stockQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单数据查询'
      }
    },
    {
      path: '/sea/releseQuery/list',
      name: 'releseQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单数据查询'
      }
    },
    {
      path: '/sea/stockReleseQuery/list',
      name: 'stockReleseQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单生成核放单'
      }
    },
    {
      path: '/sea/taxReleseQuery/list',
      name: 'taxReleseQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核注清单生成核放单'
      }
    },
    {
      path: '/sea/carInfoQuery/list',
      name: 'carInfoQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息数据查询'
      }
    },
    {
      path: '/sea/clearanceQuery/list',
      name: 'clearanceQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '车辆信息数据查询'
      }
    }
  ]
}
export default {MENU}
