// import License from './license/index' // 许可证件
import Goods from './goods/index' // 商品资料库
const MENU = [
  {
    path: '/dataCenter/index',
    name: 'dataCenter-index',
    hidden: true,
    icon: 'el-icon-menu1',
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  // License.MENU,
  Goods.MENU
]
export default {MENU}
