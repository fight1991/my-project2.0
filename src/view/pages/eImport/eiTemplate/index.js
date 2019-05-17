// 进出口模板
const MENU = {
  path: '/eImport/eiTemplate',
  name: 'eiTemplate',
  icon: 'icons-menu-iEDefault',
  permissions: 'CCBA20201000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '进出口模板'
  },
  children: [
    {
      path: '/eImport/eiTemplate/list',
      name: 'templateList',
      icon: 'icons-menu-price',
      permissions: 'CCBA20201010000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '模板列表'
      }
    },
    {
      path: '/eImport/eiTemplate/import',
      name: 'iTemplate',
      icon: 'icons-menu-price',
      permissions: 'CCBA20201020000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '进口模板'
      }
    },
    {
      path: '/eImport/eiTemplate/export',
      name: 'eTemplate',
      icon: 'icons-menu-price',
      permissions: 'CCBA20201030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口模板'
      }
    },
    {
      path: '/eImport/eiTemplate/shipping',
      name: 'shipping',
      icon: 'icons-menu-price',
      permissions: 'CCBA20201030000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '出口导入模板'
      }
    }
  ]
}
export default {MENU}
