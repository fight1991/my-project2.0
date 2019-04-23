import License from './license/index' // 许可证件
import Goods from './goods/index' // 商品资料库
import JobsLicense from './jobsLicense/index' // 业务单证管理
const MENU = [
  {
    path: '/dataCenter/index',
    name: 'dataCenter-index',
    hidden: false,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/dataCenter/new/:sysData',
    name: 'dataCenter-new',
    permissions: 'SAASOM0504000000',
    hidden: true,
    meta: {
      component: resolve => require(['../component/newTab.vue'], resolve),
      title: '编辑详情'
    }
  },
  License.MENU,
  ...JobsLicense.MENU,
  Goods.MENU
]
export default {MENU}
