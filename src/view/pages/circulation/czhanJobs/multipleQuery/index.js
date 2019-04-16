// 保税获取流转-综合查询
const MENU = [
  {
    path: '/circulation/multipleQuery/list',
    name: 'multipleQuery',
    permissions: 'CCBA21101070000',
    hidden: false,
    meta: {
      component: resolve => require(['./multipleQuery.vue'], resolve),
      title: '综合查询'
    }
  }
]
export default {MENU}
