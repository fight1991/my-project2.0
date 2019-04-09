// KPI报表
const MENU = {
  path: '/reportCenter/kpiData',
  name: 'kpiData',
  icon: 'icons-menu-kpiData',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: 'KPI报表'
  },
  children: [
    {
      path: '/reportCenter/kpiData/delDecSt',
      name: 'delDecSt',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '删改单报表'
      }
    }, {
      path: '/reportCenter/kpiData/workComputer',
      name: 'workComputer',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '工作量统计'
      }
    }, {
      path: '/reportCenter/kpiData/decJobTime',
      name: 'decJobTime',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '报关作业时效'
      }
    }
  ]
}
export default {MENU}
