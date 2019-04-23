import CzhanJobs from './czhanJobs/index' // 场站业务
const MENU = [
  {
    path: '/circulation/index',
    name: 'circulation-index',
    hidden: false,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/circulation/new/:sysData',
    name: 'circulation-new',
    permissions: 'SAASOM0504000000',
    hidden: true,
    meta: {
      component: resolve => require(['../component/newTab.vue'], resolve),
      title: '编辑详情'
    }
  },
  CzhanJobs.MENU
]
export default {MENU}
