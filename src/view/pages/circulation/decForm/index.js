// 申报表
const MENU = {
  path: '/circulation/decForm',
  name: 'circulation-decForm',
  icon: 'icons-menu-decForm',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报表'
  },
  children: [
    {
      path: '/circulation/decForm/I/list',
      name: 'decForm-I',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./outedcform.vue'], resolve),
        title: '转出申报'
      }
    },
    {
      path: '/circulation/decForm/E/list',
      name: 'decForm-E',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./incform.vue'], resolve),
        title: '转入申报'
      }
    },
    {
      path: '/circulation/decForm/decFormQuery/list',
      name: 'decFormQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./decFormQuery.vue'], resolve),
        title: '申报表查询'
      }
    }
  ]
}
export default {MENU}
