// 加工贸易账册-核销核算
const MENU = {
  path: '/graininess/baoheJobs',
  name: 'graininess-baoheJobs',
  icon: 'icons-menu-baoheJobs',
  permissions: 'CCBA21003000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '核销核算'
  },
  children: [
    {
      path: '/sea/accountBookVer_gra/list',
      name: 'accountBookVer_gra',
      permissions: 'CCBA21003010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册报核'
      }
    },
    {
      path: '/sea/accountBookVerQuery_gra/list',
      name: 'accountBookVerQuery_gra',
      permissions: 'CCBA21003020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册报核查询'
      }
    }
  ]
}
export default {MENU}
