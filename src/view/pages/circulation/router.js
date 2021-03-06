import decForom from './decForm/index' // 申报表
import goodsBill from './goodsBill/index' // 收发货单
import multipleQuery from './multipleQuery/index' // 综合查询
import synDecForm from './synDecForm/index' // 同步申报表
import indexComponent from '@/view/pages/index.vue'
import newTabComponent from '../component/newTab.vue'

const MENU = [
  {
    path: '/circulation/index',
    name: 'circulation-index',
    hidden: false,
    permissions: 'WF000000',
    component: indexComponent,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/circulation/new/:sysData',
    name: 'circulation-new',
    permissions: 'SAASOM0504000000',
    hidden: true,
    meta: {
      component: newTabComponent,
      title: '编辑详情'
    }
  },
  decForom.MENU,
  goodsBill.MENU,
  multipleQuery.MENU,
  synDecForm.MENU
]
export default {MENU}
