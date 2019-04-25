// 业务单证管理
const MENU = [
  {
    path: '/dataCenter/jobsLicense',
    name: 'jobsLicense',
    icon: 'icons-menu-jobsLicense',
    permissions: 'CCBA20303000000',
    meta: {
      title: '业务单证管理',
      component: resolve => require(['./index.vue'], resolve)
    }
  },
  {
    path: '/dataCenter/jobsLicense/jobDetailList/:id',
    name: 'jobDetailList',
    hidden: true,
    meta: {
      component: resolve => require(['./jobDetailList.vue'], resolve),
      title: '业务单证详情列表'
    }
  },
  {
    path: '/dataCenter/jobsLicense/detailEdit',
    name: 'detailEditJobs',
    hidden: true,
    meta: {
      component: resolve => require(['./detailEditJobs.vue'], resolve),
      title: '业务单证编辑详情'
    }
  },
  {
    path: '/dataCenter/jobsLicense/importLicense',
    name: 'importLicense',
    hidden: true,
    meta: {
      component: resolve => require(['./importLicense.vue'], resolve),
      title: '导入业务单证'
    }
  }
]
export default {MENU}
