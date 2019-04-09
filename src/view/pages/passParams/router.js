import CarlareParams from './carlareParams/index' // 汽车申报参数
import PassCode from './passCode/index' // 通关代码
import DeclareParams from './declareParams/index' // 商品申报参数
const MENU = [
  {
    path: '/passParams/index',
    name: 'passParams-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  CarlareParams.MENU,
  PassCode.MENU,
  DeclareParams.MENU
]
export default {MENU}
