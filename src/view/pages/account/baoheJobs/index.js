// 加工贸易账册-报核业务
const MENU = {
  path: '/account/baoheJobs',
  name: 'account-baoheJobs',
  icon: 'icons-menu-baoheJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '报核业务'
  },
  children: [
    {
      path: '/handBook/accountBookVerAcc/list',
      name: 'accountBookVerAcc',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '手册报核录入'
      }
    },
    {
      path: '/handBook/accountBookVerAccQuery/list',
      name: 'accountBookVerAccQuery',
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
