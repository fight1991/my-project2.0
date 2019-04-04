import dataInput from './dataInput/index' // 数据录入
import dataQuery from './dataQuery/index' // 数据查询
const MENU = [
  {
    path: '/account/index',
    name: 'account-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  dataInput.MENU,
  dataQuery.MENU
]
export default {MENU}
