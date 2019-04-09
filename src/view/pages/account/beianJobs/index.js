// 加工贸易账册-备案业务
const MENU = {
  path: '/account/beianJobs',
  name: 'account-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案业务'
  },
  children: [
    {
      path: '/account/apl/list',
      name: 'apl',
      permissions: 'SAASOM0504000000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请'
      }
    },
    {
      path: '/account/aplQuery/list',
      name: 'aplQuery',
      permissions: 'SAASOM0504000000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请查询'
      }
    },
    {
      path: '/account/accountAdd/list',
      name: 'accountAdd',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册录入'
      }
    },
    {
      path: '/account/accountQuery/list',
      name: 'accountQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册查询'
      }
    }
  ]
}
export default {MENU}
