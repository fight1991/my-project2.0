// 保税货物流转-同步申报表
const MENU = {
  path: '/circulation/synDecForm',
  name: 'circulation-synDecForm',
  icon: 'icons-menu-synDecForm',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../../common/abstract.vue'], resolve),
  meta: {
    title: '同步申报表'
  },
  children: [
    {
      path: '/circulation/synDecForm/list',
      name: 'synDecForm',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '同步申报表'
      }
    }
  ]
}
export default {MENU}
