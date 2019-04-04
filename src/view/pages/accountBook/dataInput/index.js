// 账册
const MENU = {
  path: '/accountBook/dataInfo',
  name: 'accountBook-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据录入'
  },
  children: [
    {
      path: '/account/datainput/list',
      name: 'accountBookAdd',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册'
      }
    }
  ]
}
export default {MENU}
