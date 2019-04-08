const MENU = {
  path: '/circulation/queryList',
  name: 'circulation-queryList',
  icon: 'icons-menu-queryList',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '综合查询'
  },
  children: [
    {
      path: '/circulation/multipleQuery/list',
      name: 'multipleQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./multipleQuery.vue'], resolve),
        title: '综合查询'
      }
    }
  ]
}
export default {MENU}
