// 账册
const MENU = {
  path: '/acountBook/dataQuery',
  name: 'acountBook-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据查询'
  },
  children: [
    {
      path: '/account/dataQuery/list',
      name: 'accountBookQuery',
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
