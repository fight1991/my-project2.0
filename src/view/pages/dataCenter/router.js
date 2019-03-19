import License from './license/index' // 许可证件
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
  License.MENU
]
export default {MENU}
