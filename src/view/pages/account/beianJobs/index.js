// 加工贸易账册-电子底账
const MENU = {
  path: '/account/beianJobs',
  name: 'account-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'CCBA20701000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '电子底账'
  },
  children: [
    {
      path: '/account/apl/list',
      name: 'apl',
      permissions: 'CCBA20701010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请'
      }
    },
    {
      path: '/account/accountAdd/list',
      name: 'accountAdd',
      permissions: 'CCBA20701020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册'
      }
    },
    {
      path: '/account/aplQuery/list',
      name: 'aplQuery',
      permissions: 'CCBA20701030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '企业资质申请查询'
      }
    },
    {
      path: '/account/accountQuery/list',
      name: 'accountQuery',
      permissions: 'CCBA20701040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易账册查询'
      }
    },
    {
      path: '/account/productPowerQuery/list',
      name: 'productPowerQuery',
      permissions: 'CCBA20701050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '生产能力证明查询'
      }
    }
  ]
}
export default {MENU}
