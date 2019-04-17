// 海关监管-申报业务
const MENU = {
  path: '/graininess/lareJobs',
  name: 'graininess-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'CCBA21002000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/graininess/taxList_I_gra/list',
      name: 'taxList_I_gra',
      permissions: 'CCBA21002010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口核注清单'
      }
    },
    {
      path: '/graininess/taxList_E_gra/list',
      name: 'taxList_E_gra',
      permissions: 'CCBA21002020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口核注清单'
      }
    },
    {
      path: '/graininess/taxListQuery_gra/list',
      name: 'taxListQuery_gra',
      permissions: 'CCBA21002030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核注清单查询'
      }
    },
    {
      path: '/graininess/centDeclare_gra/list',
      name: 'centDeclare_gra',
      permissions: 'CCBA21002040000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '集中报关'
      }
    }
  ]
}
export default {MENU}
