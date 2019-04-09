import baoheJobs from './baoheJobs/index' // 报核业务
import beianJobs from './beianJobs/index' // 备案业务
import czhanJobs from './czhanJobs/index' // 场站业务
import lareJobs from './lareJobs/index' // 申报业务
const MENU = [
  {
    path: '/sea/index',
    name: 'sea-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  beianJobs.MENU,
  lareJobs.MENU,
  baoheJobs.MENU,
  czhanJobs.MENU
]
export default {MENU}
