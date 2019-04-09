// 加工贸易账册-备案业务
const MENU = {
  path: '/sea/beianJobs',
  name: 'sea-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案业务'
  },
  children: [
    {
      path: '/sea/accountBook_sea/list',
      name: 'accountBook_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册'
      }
    },
    {
      path: '/sea/accountBookQuery_sea/list',
      name: 'accountBookQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册数据查询'
      }
    },
    {
      path: '/sea/bwl_sea/list',
      name: 'bwl_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册'
      }
    },
    {
      path: '/sea/bwlQuery_sea/list',
      name: 'bwlQuery_sea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '物流账册数据查询'
      }
    }
  ]
}
export default {MENU}
