import CzhanJobs from './czhanJobs/index' // 场站业务
const MENU = [
  {
    path: '/circulation/index',
    name: 'circulation-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  CzhanJobs.MENU
]
export default {MENU}
