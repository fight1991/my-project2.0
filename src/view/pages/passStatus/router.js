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
  {
    path: '/passStatus/new/:sysData',
    name: 'passStatus-new',
    permissions: 'SAASOM0504000000',
    hidden: true,
    meta: {
      component: resolve => require(['../component/newTab.vue'], resolve),
      title: '编辑详情'
    }
  },
  AirQuery.MENU,
  DecQuery.MENU
]
export default {MENU}
