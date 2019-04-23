// import beianJobs from './beianJobs/index' // 备案业务
// import czhanJobs from './czhanJobs/index' // 场站业务
import lareJobs from './lareJobs/index' // 申报业务
const MENU = [
  {
    path: '/graininess/index',
    name: 'graininess-index',
    hidden: false,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/graininess/new/:sysData',
    name: 'graininess-new',
    permissions: 'SAASOM0504000000',
    hidden: true,
    meta: {
      component: resolve => require(['../component/newTab.vue'], resolve),
      title: '编辑详情'
    }
  },
  // beianJobs.MENU,
  lareJobs.MENU
  // czhanJobs.MENU
]
export default {MENU}
