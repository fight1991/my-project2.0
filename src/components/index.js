
import Pagination from './base/pagination'
import CircleProgress from './base/circleProgress '
import EChart from './eChart/chart'
import Tabs from './tabs/index'
function plugin (Vue) {
  if (plugin.installed) return
  Vue.component('page-box', Pagination)
  Vue.component('circle-progress', CircleProgress)
  Vue.component('e-chart', EChart)
  Vue.component('Tabs', Tabs)
}

export default plugin
