// 保税货物流转-同步申报表
const MENU = [
  {
    path: '/circulation/synDecForm/list',
    name: 'synDecForm',
    permissions: 'CCBA21101080000',
    hidden: false,
    meta: {
      component: resolve => require(['./index.vue'], resolve),
      title: '同步申报表'
    }
  }
]
export default {MENU}
