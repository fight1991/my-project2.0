// 手册
const MENU = {
  path: '/handBook/dataInfo',
  name: 'handBook-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '数据录入'
  },
  children: [
    {
      path: '/handBook/datainput/list',
      name: 'accountBookAdd',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册'
      }
    }
  ]
}
export default {MENU}
