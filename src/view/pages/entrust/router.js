import ImportEn from './importEn/index' // 出口委托
import ExportEn from './exportEn/index' // 出口委托
const MENU = [
  {
    path: '/entrust/index',
    name: 'entrust-index',
    hidden: false,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/entrust/new/:sysData',
    name: 'entrust-new',
    permissions: 'SAASOM0504000000',
    hidden: false,
    meta: {
      component: resolve => require(['../component/newTab.vue'], resolve),
      title: '编辑详情'
    }
  },
  ImportEn.MENU,
  ExportEn.MENU
]
export default {MENU}
