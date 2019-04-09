// 通关状态-舱单查询
const MENU = {
  path: '/passStatus/airQuery',
  name: 'passStatus-airQuery',
  icon: 'icons-menu-airQuery',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '舱单查询'
  },
  children: [
    {
      path: '/passStatus/seaBill/list',
      name: 'seaBill',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '海运舱单'
      }
    },
    {
      path: '/passStatus/airBill/list',
      name: 'airBill',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '空运舱单'
      }
    },
    {
      path: '/passStatus/loadBill/list',
      name: 'loadBill',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '公路舱单'
      }
    },
    {
      path: '/passStatus/loadBillCom/list',
      name: 'loadBillCom',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '公路舱单确报'
      }
    }
  ]
}
export default {MENU}
