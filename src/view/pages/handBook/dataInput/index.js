// 手册
const MENU = {
  path: '/handBook/dataInfo',
  name: 'handBook-dataInfo',
  icon: 'icons-menu-dataInfo',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '手册录入详情'
  },
  children: [
    {
      path: '/handBook/datainput/list',
      name: 'accountBookAdd',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '手册数据录入'
      }
    }
  ]
}
export default {MENU}
