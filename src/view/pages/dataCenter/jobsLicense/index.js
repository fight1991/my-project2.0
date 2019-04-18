// 商品资料库
const MENU = {
  path: '/dataCenter/jobsLicense',
  name: 'jobsLicense',
  icon: 'icons-menu-jobsLicense',
  permissions: 'CCBA20301000000',
  component: resolve => require(['./index.vue'], resolve),
  meta: {
    title: '业务单证管理'
  }
}
export default {MENU}
