import Record from './record/index' // 商品资料库
const MENU = [
  {
    path: '/aircraft/index',
    name: 'aircraft-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  Record.MENU
]
export default {MENU}
