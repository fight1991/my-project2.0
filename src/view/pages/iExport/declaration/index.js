import abstractComponent from '../common/abstract.vue'

const MENU = {
  path: '/declaration',
  name: '新版报关单',
  component: abstractComponent,
  meta: {
    title: '报关单',
    node: 10
  },
  children: [
    {
      path: '/declaration/list',
      name: '报关单',
      component: resolve => require(['./index.vue'], resolve),
      meta: {
        title: '报关单',
        node: 10
      }
    },
    {
      path: '/decTemplate/list',
      name: '初始值模板列表',
      component: resolve => require(['./decTemplateQuery.vue'], resolve),
      meta: {
        title: '初始值模板列表',
        node: 10
      }
    },
    {
      path: '/customizeTemplate/list',
      name: '自定义模版列表',
      component: resolve => require(['./customizeTemplate/list.vue'], resolve),
      meta: {
        title: '自定义模版列表',
        node: 10
      }
    },
    {
      path: '/customizeTemplate/:operationType/:pid',
      name: '自定义模版列表',
      component: resolve => require(['./customizeTemplate/detail.vue'], resolve),
      meta: {
        title: '自定义模版列表',
        node: 10
      }
    },
    {
      path: '/declaration/decTemplate/:iEFlag/:operationType/:pid',
      name: '初始值模板',
      component: resolve => require(['./decTemplate.vue'], resolve),
      meta: {
        title: '初始值模板',
        node: 10
      }
    },
    {
      path: '/declaration/priceTips/list',
      name: '价格提示',
      component: resolve => require(['./priceTipsQuery.vue'], resolve),
      meta: {
        title: '价格提示',
        node: 10
      }
    },
    {
      path: '/declaration/trafModeTips/list',
      name: '运输方式提示',
      component: resolve => require(['./trafModeTipsQuery.vue'], resolve),
      meta: {
        title: '运输方式提示',
        node: 10
      }
    },
    {
      path: '/declaration/goodsModel/list',
      name: '保税商品库',
      component: resolve => require(['./goodsModel.vue'], resolve),
      meta: {
        title: '保税商品库',
        node: 10
      }
    },
    {
      path: '/supplementDec/list',
      name: '补充申报查询',
      component: resolve => require(['./supplementDecQuery.vue'], resolve),
      meta: {
        title: '补充申报查询',
        node: 10
      }
    },
    {
      path: '/declaration/summaryDec/:funFlag/:operationType/:pid',
      name: '概要申报',
      component: resolve => require(['./summaryDec/summaryDec.vue'], resolve),
      meta: {
        title: '概要申报',
        node: 10
      }
    },
    {
      path: '/declaration/summaryDec/list',
      name: '概要申报查询',
      component: resolve => require(['./summaryDecQuery.vue'], resolve),
      meta: {
        title: '概要申报查询',
        node: 10
      }
    },
    {
      path: '/declaration/:funFlag/:iEFlag/:operationType/:pid',
      name: '报关单页面',
      component: resolve => require(['./decPage/decPage.vue'], resolve),
      meta: {
        title: '报关单页面',
        node: 10
      }
    },
    {
      path: '/declaration/decCheck/list',
      name: '报关单审核',
      component: resolve => require(['./decCheck.vue'], resolve),
      meta: {
        title: '报关单审核',
        node: 10
      }
    },
    {
      path: '/declaration/decCheck/viewCheck',
      name: '报关单可视化审核列表',
      component: resolve => require(['./deCheckContainer.vue'], resolve),
      meta: {
        title: '报关单可视化审核列表',
        node: 10
      }
    },
    {
      path: '/declaration/receiveOrders/:iEFlag',
      name: '进口接单',
      component: resolve => require(['./receiveOrders.vue'], resolve),
      meta: {
        title: '进口接单',
        node: 10
      }
    },
    {
      path: '/declaration/receiveOrders/:iEFlag',
      name: '出口接单',
      component: resolve => require(['./receiveOrders.vue'], resolve),
      meta: {
        title: '出口接单',
        node: 10
      }
    },
    {
      path: '/declaration/commodity',
      name: '商品资料库',
      component: resolve => require(['./commodity.vue'], resolve),
      meta: {
        title: '商品资料库',
        node: 10
      }
    },
    {
      path: '/declaration/businessTrack',
      name: '业务跟踪台账',
      component: resolve => require(['./businessTracke.vue'], resolve),
      meta: {
        title: '业务跟踪台账',
        node: 10
      }
    },
    {
      path: '/declaration/shipping',
      name: 'shipping',
      component: resolve => require(['./shipping.vue'], resolve),
      meta: {
        title: 'shipping',
        node: 10
      }
    },
    {
      path: '/declaration/decRegister',
      name: '删改单登记',
      component: resolve => require(['./decRegister.vue'], resolve),
      meta: {
        title: '删改单登记',
        node: 10
      }
    },
    {
      path: '/declaration/decCheck/:operationType/:pid',
      name: '报关单可视化审核',
      // component: resolve => require(['./declareCheck.vue'], resolve),
      component: resolve => require(['./declareCheck/declareCheck.vue'], resolve),
      meta: {
        title: '报关单可视化审核',
        node: 10
      }
    },
    {
      path: '/transit/:funFlag/:iEFlag/:operationType/:pid',
      name: '转关单',
      component: resolve => require(['./customsTransit.vue'], resolve),
      meta: {
        title: '转关单',
        node: 10
      }
    }
  ]
}

export default {MENU}
