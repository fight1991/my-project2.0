import Record from './record/index' // 备案管理
import Import from './import/index' // 进境/港申报
import InLare from './inLare/index' // 在港申报
import Export from './export/index' // 出境/港申报
const MENU = [
  {
    path: '/aircraft/index',
    name: 'aircraft-index',
    hidden: true,
    permissions: 'WF000000',
    component: resolve => require(['./index.vue'], resolve),
    meta: {
      title: '首页'
    }
  },
  Record.MENU,
  Import.MENU,
  InLare.MENU,
  Export.MENU
]
export default {MENU}
