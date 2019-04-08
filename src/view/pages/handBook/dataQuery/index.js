// 手册
const MENU = {
  path: '/handBook/dataQuery',
  name: 'handBook-dataQuery',
  icon: 'icons-menu-dataQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据查询'
  },
  children: [
    {
      path: '/handBook/dataQuery/list',
      name: 'handBookQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册查询'
      }
    }
  ]
}
export default {MENU}
