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
    path: '/dataCenter/jobsLicense/jobDetailList',
    name: 'jobDetailList',
    hidden: true,
    meta: {
      component: resolve => require(['./jobDetailList.vue'], resolve),
      title: '业务单证详情列表'
    }
  },
  {
    path: '/dataCenter/jobsLicense/detailJobs',
    name: 'detailJobs',
    hidden: true,
    meta: {
      component: resolve => require(['./detailJobs.vue'], resolve),
      title: '业务单证详情'
    }
  },

  {
    path: '/dataCenter/jobsLicense/editJobs',
    name: 'editJobs',
    hidden: true,
    meta: {
      component: resolve => require(['./editJobs.vue'], resolve),
      title: '编辑业务单证'
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
