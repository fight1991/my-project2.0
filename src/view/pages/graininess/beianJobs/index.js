// 加工贸易账册-备案业务
const MENU = {
  path: '/graininess/beianJobs',
  name: 'graininess-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案业务'
  },
  children: [
    {
      path: '/graininess/bwl_gra/list',
      name: 'bwl_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/graininess/bwlQuery_gra/list',
      name: 'bwlQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册查询'
      }
    }
  ]
}
export default {MENU}
