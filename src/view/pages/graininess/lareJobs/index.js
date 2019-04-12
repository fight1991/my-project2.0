// 海关监管-申报业务
const MENU = {
  path: '/graininess/lareJobs',
  name: 'graininess-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/graininess/taxList_I_gra/list',
      name: 'taxList_I_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（进口）'
      }
    },
    {
      path: '/graininess/taxList_E_gra/list',
      name: 'taxList_E_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（出口）'
      }
    },
    {
      path: '/graininess/taxListQuery_gra/list',
      name: 'taxListQuery_gra',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单查询'
      }
    },
    {
      path: '/graininess/centDeclare_gra/list',
      name: 'centDeclare_gra',
      permissions: 'SAASOM0504000000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '集中报关'
      }
    }
  ]
}
export default {MENU}
