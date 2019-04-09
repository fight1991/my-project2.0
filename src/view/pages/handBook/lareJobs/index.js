// 加工贸易手册-申报业务
const MENU = {
  path: '/handBook/lareJobs',
  name: 'handBook-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/handBook/taxList_I_hand/list',
      name: 'taxList_I_hand',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（进口）'
      }
    },
    {
      path: '/handBook/taxList_E_hand/list',
      name: 'taxList_E_hand',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单（出口）'
      }
    },
    {
      path: '/handBook/taxListQuery_hand/list',
      name: 'taxListQuery_hand',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '保税核注清单查询'
      }
    }
  ]
}
export default {MENU}
