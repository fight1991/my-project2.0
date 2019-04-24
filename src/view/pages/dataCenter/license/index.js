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
      path: '/dataCenter/licenses/license/add',
      name: '许可证新增',
      hidden: true,
      meta: {
        component: resolve => require(['./licManage/add.vue'], resolve),
        title: '许可证新增'
      }
    }, {
      path: '/dataCenter/licenses/license/detailList/:corpSccCode',
      name: '许可证详情列表',
      hidden: true,
      meta: {
        component: resolve => require(['./licManage/detailList.vue'], resolve),
        title: '许可证详情列表'
      }
    }, {
      path: '/dataCenter/licenses/license/manageDetail/:id',
      name: '许可证详情编辑',
      hidden: true,
      meta: {
        component: resolve => require(['./licManage/manageDetail.vue'], resolve),
        title: '许可证详情编辑'
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
    }, {
      path: '/dataCenter/licenses/certificate/add/:type/:rowId',
      name: 'addCertificate',
      hidden: true,
      meta: {
        component: resolve => require(['./certificate/addCertificate.vue'], resolve),
        title: '编辑证书信息'
      }
    }, {
      path: '/dataCenter/licenses/certificate/detail/:corpSccCode',
      name: 'detailListCertificate',
      hidden: true,
      meta: {
        component: resolve => require(['./certificate/detailListCertificate.vue'], resolve),
        title: '证书详情列表'
      }
    }
  ]
}
export default {MENU}
