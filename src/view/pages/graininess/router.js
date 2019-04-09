import beianJobs from './beianJobs/index' // 备案业务
import czhanJobs from './czhanJobs/index' // 场站业务
import lareJobs from './lareJobs/index' // 申报业务
const MENU = [
  {
    path: '/graininess/index',
    name: 'graininess-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  beianJobs.MENU,
  lareJobs.MENU,
  czhanJobs.MENU
]
export default {MENU}
