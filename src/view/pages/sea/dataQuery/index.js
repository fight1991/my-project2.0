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
      name: 'accountBookQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./accountBookQuery.vue'], resolve),
        title: '加工贸易账册查询'
      }
    },
    {
      path: '/sea/bwlQuery/list',
      name: 'bwlQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./bwlQuery.vue'], resolve),
        title: '物流账册数据查询'
      }
    },
    {
      path: '/sea/applyQuery/list',
      name: 'applyQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./applyQuery.vue'], resolve),
        title: '业务申报表数据查询'
      }
    },
    {
      path: '/sea/applyIxEQuery/list',
      name: 'applyIxEQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./applyIxEQuery.vue'], resolve),
        title: '申报表货物进出查询'
      }
    },
    {
      path: '/sea/stockQuery/list',
      name: 'stockQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./stockQuery.vue'], resolve),
        title: '出入库单数据查询'
      }
    },
    {
      path: '/sea/releseQuery/list',
      name: 'releseQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./releseQuery.vue'], resolve),
        title: '核放单数据查询'
      }
    },
    {
      path: '/sea/stockReleseQuery/list',
      name: 'stockReleseQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./stockReleseQuery.vue'], resolve),
        title: '出入库单生成核放单'
      }
    },
    {
      path: '/sea/taxReleseQuery/list',
      name: 'taxReleseQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./taxReleseQuery.vue'], resolve),
        title: '核注清单生成核放单'
      }
    },
    {
      path: '/sea/carInfoQuery/list',
      name: 'carInfoQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./carInfoQuery.vue'], resolve),
        title: '车辆信息数据查询'
      }
    },
    {
      path: '/sea/clearanceQuery/list',
      name: 'clearanceQuery-sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./clearanceQuery.vue'], resolve),
        title: '车辆信息数据查询'
      }
    }
  ]
}
export default {MENU}
