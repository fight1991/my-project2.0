import Prosecution from './prosecution' // 逻辑检控设置
import EiTemplate from './iETemplate' // 进出口模板
import OrderReceiving from './orderReceiving' // 接单
import importVouching from './importVouching' // 进口制单
import exportVouching from './exportVouching' // 出口制单
import Reviewed from './reviewed' // 审单
import DataQuery from './dataQuery' // 业务数据查询
const MENU = [
  {
    path: '/iExport/index',
    name: 'iExport-index',
    hidden: false,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./blankPage.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  Prosecution.MENU,
  EiTemplate.MENU,
  OrderReceiving.MENU,
  importVouching.MENU,
  exportVouching.MENU,
  Reviewed.MENU,
  {
    path: '/iExport/decRegister/list',
    name: 'decRegisterList',
    icon: 'icons-menu-decRegister',
    permissions: 'CCBA20208000000',
    meta: {
      component: resolve => require(['./declaration/decRegister.vue'], resolve),
      title: '异常状态登记'
    }
  },
  DataQuery.MENU
]
export default {MENU}
