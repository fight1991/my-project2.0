
import Pagination from './base/pagination'
import CircleProgress from './base/circleProgress '
import EChart from './eChart/chart'
import Tabs from './tabs/index'
import IframeView from './iframeView/index'
function plugin (Vue) {
  if (plugin.installed) return
  Vue.component('page-box', Pagination)
  Vue.component('circle-progress', CircleProgress)
  Vue.component('e-chart', EChart)
  Vue.component('Tabs', Tabs)
  Vue.component('iframe-view', IframeView)
}

export default plugin
