// 加工贸易账册-备案业务
const MENU = {
  path: '/account/beianJobs',
  name: 'account-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'CCBA20801000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案业务'
  },
  children: [
    {
      path: '/account/apl/list',
      name: 'apl',
      permissions: 'CCBA20801010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请'
      }
    },
    {
      path: '/account/aplQuery/list',
      name: 'aplQuery',
      permissions: 'CCBA20801020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请查询'
      }
    },
    {
      path: '/account/accountAdd/list',
      name: 'accountAdd',
      permissions: 'CCBA20801030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册'
      }
    },
    {
      path: '/account/accountQuery/list',
      name: 'accountQuery',
      permissions: 'CCBA20801040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册查询'
      }
    }
  ]
}
export default {MENU}
