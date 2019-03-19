// 进出口模板
const MENU = {
  path: '/eImport/eiTemplate',
  name: 'eiTemplate',
  icon: 'icons-menu-iEDefault',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '进出口模板'
  },
  children: [
    {
      path: '/eImport/eiTemplate/import',
      name: 'iTemplate',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '进口模板'
      }
    }, {
      path: '/eImport/eiTemplate/export',
      name: 'eTemplate',
      icon: 'icons-menu-price',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./demo.vue'], resolve),
        title: '出口模板'
      }
    }
  ]
}
export default {MENU}
