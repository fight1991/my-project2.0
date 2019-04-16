// 出境/港申报
const MENU = {
  path: '/aircraft/iEport',
  name: 'aircraft-iEport',
  icon: 'icons-menu-ieport',
  permissions: 'CCBA20402000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '进/出境/港申报'
  },
  children: [
    {
      path: '/aircraft/iEport/importDynamic',
      name: 'importDynamic',
      permissions: 'CCBA20402010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港动态申报'
      }
    },
    {
      path: '/aircraft/iEport/importDocument',
      name: 'importDocument',
      permissions: 'CCBA20402020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进境/港单证申报'
      }
    },
    {
      path: '/aircraft/iEport/exportDynamic',
      name: 'exportDynamic',
      permissions: 'CCBA20402030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境/港动态申报'
      }
    },
    {
      path: '/aircraft/iEport/exportDocument',
      name: 'exportDocument',
      permissions: 'CCBA20402040000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出境/港单证申报'
      }
    },
    {
      path: '/aircraft/iEport/airCancel',
      name: 'airCancel',
      permissions: 'CCBA20402050000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '航班取消申报'
      }
    }
  ]
}
export default {MENU}
