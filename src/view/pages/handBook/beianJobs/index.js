// 加工贸易手册-备案业务
const MENU = {
  path: '/handBook/beianJobs',
  name: 'handBook-beianJobs',
  icon: 'icons-menu-beianJobs',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '备案业务'
  },
  children: [
    {
      path: '/handBook/handAdd/list',
      name: 'handAdd',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册录入'
      }
    },
    {
      path: '/handBook/handQuery/list',
      name: 'handQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '加工贸易手册查询'
      }
    },
    {
      path: '/handBook/exaluate/list',
      name: 'exaluate',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '不作价设备使用'
      }
    },
    {
      path: '/handBook/evaluateQuery/list',
      name: 'evaluateQuery',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '不作价设备使用查询'
      }
    }
  ]
}
export default {MENU}
