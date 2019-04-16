// 加工贸易手册-申报业务
const MENU = {
  path: '/handBook/lareJobs',
  name: 'handBook-lareJobs',
  icon: 'icons-menu-lareJobs',
  permissions: 'CCBA20702000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '申报业务'
  },
  children: [
    {
      path: '/handBook/taxList_I_hand/list',
      name: 'taxList_I_hand',
      permissions: 'CCBA20702010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口核注清单'
      }
    },
    {
      path: '/handBook/taxList_E_hand/list',
      name: 'taxList_E_hand',
      permissions: 'CCBA20702020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口核注清单'
      }
    },
    {
      path: '/handBook/taxListQuery_hand/list',
      name: 'taxListQuery_hand',
      permissions: 'CCBA20702030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '核注清单查询'
      }
    }
  ]
}
export default {MENU}
