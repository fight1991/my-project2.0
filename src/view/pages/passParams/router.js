import PassParams from './passParams/index' // 通关参数
import PassStatus from './passStatus/index' // 通关状态
const MENU = [
  {
    path: '/passParams/index',
    name: 'passParams-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  PassParams.MENU,
  PassStatus.MENU
]
export default {MENU}
