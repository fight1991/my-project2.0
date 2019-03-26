// 业务报表
const MENU = {
  path: '/reportCenter/business',
  name: 'business',
  icon: 'icons-menu-jobsList',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '业务报表'
  },
  children: [
    {
      path: '/reportCenter/business/amountSt',
      name: 'amountSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '金额统计'
      }
    }, {
      path: '/reportCenter/business/certSt',
      name: 'certSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '单量统计'
      }
    }, {
      path: '/reportCenter/business/trendSt',
      name: 'trendSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '趋势统计'
      }
    }, {
      path: '/reportCenter/business/importSt',
      name: 'importSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口报表'
      }
    }, {
      path: '/reportCenter/business/exportSt',
      name: 'exportSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口报表'
      }
    }
  ]
}
export default {MENU}
