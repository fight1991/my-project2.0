// 许可证件
const MENU = {
  path: '/dataCenter/licenses',
  name: 'licenses',
  icon: 'icons-menu-declare',
  permissions: 'CCBA20302000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '许可证件'
  },
  children: [
    {
      path: '/dataCenter/licenses/license',
      name: 'license',
      permissions: 'CCBA20302010000',
      hidden: false,
      meta: {
        component: resolve => require(['./licManage/index.vue'], resolve),
        title: '许可证管理'
      }
    }, {
      path: '/dataCenter/licenses/add',
      name: '许可证新增',
      permissions: 'CCBA20302010000',
      hidden: false,
      meta: {
        component: resolve => require(['./licManage/add.vue'], resolve),
        title: '许可证新增'
      }
    }, {
      path: '/dataCenter/licenses/certificate',
      name: 'certificate',
      icon: 'icons-menu-price',
      permissions: 'CCBA20302020000',
      hidden: false,
      meta: {
        component: resolve => require(['./certificate/index.vue'], resolve),
        title: '证书管理'
      }
    }
  ]
}
export default {MENU}
