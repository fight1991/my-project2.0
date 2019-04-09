import AirQuery from './airQuery/index' // 数据录入
import DecQuery from './decQuery/index' // 数据查询
const MENU = [
  {
    path: '/passStatus/index',
    name: 'passStatus-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  AirQuery.MENU,
  DecQuery.MENU
]
export default {MENU}
