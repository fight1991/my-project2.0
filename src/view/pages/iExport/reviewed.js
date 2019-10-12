// 报关单审核
const MENU = {
  path: '/iExport/reviewed',
  name: 'reviewed',
  icon: 'icons-menu-decCheck',
  permissions: 'CCBA20204000000',
  component: resolve => require(['../../common/abstract.vue'], resolve),
  meta: {
    title: '审单'
  },
  children: [
    {
      path: '/iExport/reviewed/decReviewedList',
      name: 'decReviewedList',
      icon: 'icons-menu-price',
      permissions: 'CCBA20204010000',
      hidden: false,
      meta: {
        component: resolve => require(['./declaration/decCheck.vue'], resolve),
        title: '报关单审核'
      }
    },
    {
      path: '/iExport/reviewed/decReviewed/edit/:pid',
      name: 'decReviewedEdit',
      icon: 'icons-menu-price',
      permissions: 'CCBA20204010000',
      hidden: true,
      meta: {
        component: resolve => require(['./declaration/declareCheck/declareCheck.vue'], resolve),
        title: '报关单审核',
        operationType: 'edit'
      }
    },
    {
      path: '/iExport/reviewed/decReviewed/look/:pid',
      name: 'decReviewedLook',
      icon: 'icons-menu-price',
      permissions: 'CCBA20204010000',
      hidden: true,
      meta: {
        component: resolve => require(['./declaration/declareCheck/declareCheck.vue'], resolve),
        title: '报关单审核',
        operationType: 'look'
      }
    },
    {
      path: '/iExport/reviewed/taxReviewed',
      name: 'taxReviewed',
      icon: 'icons-menu-price',
      permissions: 'CCBA20204020000',
      hidden: false,
      meta: {
        component: resolve => require(['./blankPage.vue'], resolve),
        title: '核注清单审核'
      }
    }
  ]
}
export default {MENU}
