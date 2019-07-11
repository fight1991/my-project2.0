import offer from './offerManage/index'
import expense from './expense/index'
import cost from './costManage/index'
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
  ...expense.MENU,
  ...cost.MENU
]
export default {MENU}
