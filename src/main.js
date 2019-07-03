import Vue from 'vue'
import App from './App'
import router from './router'
// import Mock from './mock'
import store from './store/store'
import filters from './store/filters'
// import utils from './common/util'
import './assets/style/main.less'
import './assets/style/media.css'
import './assets/style/icon.less'
import MyComponents from './components'
import Permissions from './directive/permissions'
import {pagination} from './common/mixin/pagination'
import {labelWidth} from './common/mixin/labelWidth'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'qFHHVG13nGc25bOu8bOw6mIyWsQo78q8'
})
// Vue.config.errorHandler = function (err, vm, info) {
//   utils.errorReport(err, vm, info, store)
// }
// Mock.bootstrap() // mock前端模拟数据
Vue.filter('date', filters.date) // 自定义过滤器
Vue.filter('money', filters.money) // 自定义过滤器
Vue.filter('strNum', filters.strNum) // 自定义过滤器
Vue.use(MyComponents) // 自定义组件
Vue.use(Permissions) // 权限指令控制
Vue.mixin(pagination)
Vue.mixin(labelWidth) // 全局混入labelWidth属性
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
