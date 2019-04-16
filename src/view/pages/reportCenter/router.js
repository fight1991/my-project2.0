import Business from './business/index' // 业务报表
// import KpiData from './kpiData/index' // KPI报表
const MENU = [
  {
    path: '/reportCenter/index',
    name: 'reportCenter-index',
    hidden: true,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  Business.MENU
  // KpiData.MENU
]
export default {MENU}
