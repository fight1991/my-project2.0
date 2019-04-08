import DecForm from './decForm/index' // 申报表
import GoodsBill from './goodsBill/index' // 收发货单
import MultipleQuery from './multipleQuery/index' // 综合查询
import SynDecForm from './synDecForm/index' // 综合查询
const MENU = [
  {
    path: '/circulation/index',
    name: 'circulation-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  DecForm.MENU,
  GoodsBill.MENU,
  MultipleQuery.MENU,
  SynDecForm.MENU
]
export default {MENU}
