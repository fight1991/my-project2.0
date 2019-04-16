// 加工贸易账册-申报业务
const MENU = {
  path: '/account/lareJobs',
  name: 'account-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'CCBA20802000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/account/taxList_I_acc/list',
      name: 'taxList_I_acc',
      permissions: 'CCBA20802010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（进口）'
      }
    },
    {
      path: '/account/taxList_E_acc/list',
      name: 'taxList_E_acc',
      permissions: 'CCBA20802020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（出口）'
      }
    },
    {
      path: '/account/taxListQuery_acc/list',
      name: 'taxListQuery_acc',
      permissions: 'CCBA20802030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单查询'
      }
    }
  ]
}
export default {MENU}
