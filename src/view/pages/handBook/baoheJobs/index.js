// 加工贸易手册-报核业务
const MENU = {
  path: '/handBook/baoheJobs',
  name: 'handBook-baoheJobs',
  icon: 'icons-menu-baoheJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '报核业务'
  },
  children: [
    {
      path: '/handBook/handBookVer/list',
      name: 'handBookVer',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '手册报核录入'
      }
    },
    {
      path: '/handBook/handBookVerQuery/list',
      name: 'handBookVerQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '手册报核查询'
      }
    }
  ]
}
export default {MENU}
