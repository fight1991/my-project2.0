// 保税物流管理-数据查询
const MENU = {
  path: '/graininess/dataQuery',
  name: 'graininess-dataQuery',
  icon: 'icons-menu-dataQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据查询'
  },
  children: [
    {
      path: '/graininess/bwlQuery/list',
      name: 'bwlQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册数据查询'
      }
    },
    {
      path: '/graininess/taxListQuery/list',
      name: 'taxListQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单查询'
      }
    },
    {
      path: '/graininess/applyQuery/list',
      name: 'applyQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '业务申报表数据查询'
      }
    },
    {
      path: '/graininess/applyIxEQuery/list',
      name: 'applyIxEQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '申报表货物进出查询'
      }
    },
    {
      path: '/graininess/stockQuery/list',
      name: 'stockQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单数据查询'
      }
    },
    {
      path: '/graininess/releseQuery/list',
      name: 'releseQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核放单数据查询'
      }
    },
    {
      path: '/graininess/stockReleseQuery/list',
      name: 'stockReleseQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出入库单生成核放单'
      }
    },
    {
      path: '/graininess/taxReleseQuery/list',
      name: 'taxReleseQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核注清单生成核放单'
      }
    },
    {
      path: '/graininess/carInfoQuery/list',
      name: 'carInfoQuery',
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
