// 海关监管-申报业务
const MENU = {
  path: '/sea/lareJobs',
  name: 'sea-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'CCBA20902000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/sea/taxList_I_sea/list',
      name: 'taxList_I_sea',
      permissions: 'CCBA20902010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（进口）'
      }
    },
    {
      path: '/sea/taxList_E_sea/list',
      name: 'taxList_E_sea',
      permissions: 'CCBA20902020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（出口）'
      }
    },
    {
      path: '/sea/taxListQuery_sea/list',
      name: 'taxListQuery_sea',
      permissions: 'CCBA20902030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单查询'
      }
    },
    {
      path: '/sea/centDeclare_sea/list',
      name: 'centDeclare_sea',
      permissions: 'CCBA20902040000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '集中报关'
      }
    },
    {
      path: '/sea/clearance_sea/list',
      name: 'clearance_sea',
      permissions: 'CCBA20902050000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '清单结关'
      }
    },
    {
      path: '/sea/clearanceQuery_sea/list',
      name: 'clearanceQuery_sea',
      permissions: 'CCBA20902060000',
      hidden: true,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '清单结关查询'
      }
    }
  ]
}
export default {MENU}
