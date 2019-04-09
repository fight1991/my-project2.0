// 通关参数-通关代码
const MENU = {
  path: '/passParams/passCode',
  name: 'passParams-passCode',
  icon: 'icons-menu-passCode',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '通关代码'
  },
  children: [
    {
      path: '/passParams/redemp/list',
      name: 'redemp',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '征免性质'
      }
    },
    {
      path: '/passParams/port/list',
      name: 'port',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '港口'
      }
    },
    {
      path: '/passParams/pakageKinds/list',
      name: 'pakageKinds',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '包装种类'
      }
    },
    {
      path: '/passParams/bargain/list',
      name: 'bargain',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '成交方式'
      }
    },
    {
      path: '/passParams/regulate/list',
      name: 'regulate',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '监管证件'
      }
    },
    {
      path: '/passParams/license/list',
      name: 'license',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '随附单据'
      }
    },
    {
      path: '/passParams/tradePro/list',
      name: 'tradePro',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '优惠贸易协定'
      }
    },
    {
      path: '/passParams/inLandArea/list',
      name: 'inLandArea',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '国内地区'
      }
    },
    {
      path: '/passParams/taxFree/list',
      name: 'taxFree',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '征减免税方式'
      }
    },
    {
      path: '/passParams/inLandPort/list',
      name: 'inLandPort',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '国内口岸'
      }
    }
  ]
}
export default {MENU}
