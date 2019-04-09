// 货物流转-场站业务
import DecForm from './decForm/index'
import GoodsBill from './goodsBill/index'
import MultipleQuery from './multipleQuery/index'
import SynDecForm from './synDecForm/index'
const MENU = {
  path: '/circulation/czhanJobs',
  name: 'circulation-czhanJobs',
  icon: 'icons-menu-czhanJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '场站业务'
  },
  children: [
    DecForm.MENU,
    GoodsBill.MENU,
    MultipleQuery.MENU,
    SynDecForm.MENU
  ]
}
export default {MENU}
