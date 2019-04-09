// 加工贸易账册-报核业务
const MENU = {
  path: '/sea/baoheJobs',
  name: 'sea-baoheJobs',
  icon: 'icons-menu-baoheJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '报核业务'
  },
  children: [
    {
      path: '/sea/accountBookVer_sea/list',
      name: 'accountBookVer_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '手册报核录入'
      }
    },
    {
      path: '/sea/accountBookVerQuery_sea/list',
      name: 'accountBookVerQuery_sea',
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
