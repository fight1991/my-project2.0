// 手册
const MENU = {
  path: '/handBook/dataQuery',
  name: 'handBook-dataQuery',
  icon: 'icons-menu-dataQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '账册查询详情'
  },
  children: [
    {
      path: '/handBook/datainput/list',
      name: 'handBookQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '账册数据查询'
      }
    }
  ]
}
export default {MENU}
