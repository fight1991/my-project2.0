// 加工贸易账册-数据查询
const MENU = {
  path: '/account/dataQuery',
  name: 'account-dataQuery',
  icon: 'icons-menu-dataQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据查询'
  },
  children: [
    {
      path: '/account/dataQuery/list',
      name: 'accountQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册查询'
      }
    }
  ]
}
export default {MENU}
