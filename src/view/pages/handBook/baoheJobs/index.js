// 加工贸易手册-报核业务
const MENU = {
  path: '/handBook/baoheJobs',
  name: 'handBook-baoheJobs',
  icon: 'icons-menu-baoheJobs',
  permissions: 'CCBA20703000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '报核业务'
  },
  children: [
    {
      path: '/handBook/handBookVer/list',
      name: 'handBookVer',
      permissions: 'CCBA20703010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册报核'
      }
    },
    {
      path: '/handBook/handBookVerQuery/list',
      name: 'handBookVerQuery',
      permissions: 'CCBA20703020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册报核查询'
      }
    },
    {
      path: '/handBook/handBookCerQuery/list',
      name: 'handBookCerQuery',
      permissions: 'CCBA20703030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册催核查询'
      }
    }
  ]
}
export default {MENU}
