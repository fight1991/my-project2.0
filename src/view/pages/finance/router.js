import offer from './offerManage/index'
import expense from './expense/index'
const MENU = [
  {
    path: '/finance/index',
    name: 'sea-index',
    hidden: false,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  ...offer.MENU,
  ...expense.MENU
]
export default {MENU}
