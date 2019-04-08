// import Manufacturer from './manufacturer/index' // 厂商管理
import Prosecution from './prosecution/index' // 逻辑检控设置
import EiTemplate from './eiTemplate/index' // 进出口模板
import Receipt from './receipt/index' // 接单
import Declare from './declare/index' // 关检整合申报
import Reviewed from './reviewed/index' // 报关单审核
import DataQuery from './dataQuery/index' // 业务数据查询
const MENU = [
  {
    path: '/eImport/index',
    name: 'eImport-index',
    hidden: true,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  // Manufacturer.MENU,
  Prosecution.MENU,
  EiTemplate.MENU,
  Receipt.MENU,
  Declare.MENU,
  Reviewed.MENU,
  DataQuery.MENU
]
export default {MENU}
