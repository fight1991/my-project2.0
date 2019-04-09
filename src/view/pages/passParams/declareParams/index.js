// 通关参数-商品申报参数
const MENU = {
  path: '/passParams/productParams',
  name: 'passParams-productParams',
  icon: 'icons-menu-productParams',
  permissions: 'SAASOM0900000000',
  component: resolve => require(['../../../common/abstract.vue'], resolve),
  meta: {
    title: '商品申报参数'
  },
  children: [
    {
      path: '/passParams/taxRule/list',
      name: 'taxRule',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '税则'
      }
    },
    {
      path: '/passParams/productCate/list',
      name: 'productCate',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '统计商品目录'
      }
    },
    {
      path: '/passParams/declareEle/list',
      name: 'declareEle',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '规范申报要素'
      }
    },
    {
      path: '/passParams/checkCate/list',
      name: 'checkCate',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '法检目录'
      }
    },
    {
      path: '/passParams/treeCate/list',
      name: 'treeCate',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: '3C目录'
      }
    },
    {
      path: '/passParams/CIQCode/list',
      name: 'CIQCode',
      permissions: 'SAASOM0504000000',
      hidden: false,
      meta: {
        component: resolve => require(['./index.vue'], resolve),
        title: 'CIQ编码'
      }
    }
  ]
}
export default {MENU}
