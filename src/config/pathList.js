import url from './commonPath'
export default {
  eImport: {
    // 进口模板
    decImTemplate: url.COMMON + '/declaration/decTemplate/import/add/new',
    // 出口模板
    decExTemplate: url.COMMON + '/declaration/decTemplate/export/add/new',
    // 进口接单
    decImReceipt: url.COMMON + '/declaration/receiveOrders/import',
    // 出口接单
    decExReceipt: url.COMMON + '/declaration/receiveOrders/export',
    // 进口报关单（新增）
    decImport: url.COMMON + '/declaration/declaration/import/add/new',
    // 出口报关单（新增）
    decExport: url.COMMON + '/declaration/declaration/export/add/new',
    // 进境备案清单（新增）
    recordImport: url.COMMON + '/declaration/recordList/import/add/new',
    // 出境备案清单（新增）
    recordExport: url.COMMON + '/declaration/recordList/export/add/new',
    // 进口核注清单（新增）
    importTaxList: url.JINER + '/dec/datainput/I/taxList',
    // 出口核注清单（新增）
    exportTaxList: url.JINER + '/dec/datainput/E/taxList',
    // 报关单审核
    decReviewed: url.COMMON + '/declaration/decCheck/list',
    // 报关数据查询
    decInfo: url.COMMON + '/declaration/list',
    // 核注清单查询
    taxInfo: url.JINER + '/eImport/dataQuery/taxInfo',
    // 业务跟踪台账
    tLedger: url.COMMON + '/declaration/businessTrack'
  },
  // 资料中心
  dataCenter: {
    // 非保税商品库
    noBonded: url.COMMON + '/declaration/goodsModel/list',
    // 保税商品库
    bonded: url.COMMON + '/declaration/commodity'
  },
  // 报表中心
  reportCenter: {
    // 金额统计
    amountSt: url.COMMON + '/reportForms/amountSt',
    // 单量统计
    certSt: url.COMMON + '/reportForms/certSt',
    // 趋势统计
    trendSt: url.COMMON + '/reportForms/trendSt',
    // 进口报表
    importSt: url.COMMON + '/reportForms/importSt',
    // 出口报表
    exportSt: url.COMMON + '/reportForms/exportSt'
  },
  // 航空器申报
  aircraft: {
    // 备案管理-当日飞行计划
    airplan: url.COMMON + '/airVehicle/airPlan/list',
    // 进/出境/港申报-进境/港动态申报
    importDyn: url.COMMON + '/airVehicle/importDynamic/list',
    // 进/出境/港申报-进境/港单证申报
    importDoc: url.COMMON + '/airVehicle/importDocument/list',
    // 进/出境/港申报-出境/港动态申报
    exportDyn: url.COMMON + '/airVehicle/exportDynamic/list',
    // 进/出境/港申报-出境/港单证申报
    exportDoc: url.COMMON + '/airVehicle/exportDocument/list',
    // 在港申报-海关在港申报
    customPort: url.COMMON + '/airVehicle/customPort/list',
    // 在港申报-进境/港单证申报
    materials: url.COMMON + '/airVehicle/materials/list'
  },
  // 金二
  jinerInfo: {
    // 加工贸易账册录入
    accountAdd: url.JINER + '/account/datainput/accountBook',
    // 加工贸易账册查询
    accountQuery: url.JINER + '/account/dataQuery/accountBookQuery',
    // 加工贸易手册录入
    handAdd: url.JINER + '/handBook/datainput/handBook',
    // 加工贸易手册查询
    handQuery: url.JINER + '/handBook/dataQuery/handBookQuery'
  },
  // 加工贸易手册
  // 快捷菜单
  keyBoardPath: [
    // {
    //   id: 1,
    //   icon: require('../assets/img/icon-bottom/btm_cust.png'),
    //   text: '客户管理',
    //   path: url.CCBA + '/BaseData/CopCustomer/Index'
    // },
    {
      id: 2,
      icon: require('../assets/img/icon-bottom/btm_im_receipt.png'),
      text: '进口接单',
      path: url.CCBA + '/eImport/receipt/import'
    },
    {
      id: 3,
      icon: require('../assets/img/icon-bottom/btm_ex_Receipt.png'),
      text: '出口接单',
      path: url.CCBA + '/eImport/receipt/export'
    },
    {
      id: 4,
      icon: require('../assets/img/icon-bottom/btm_im_cdf.png'),
      text: '进口报关单',
      path: url.CCBA + '/eImport/declare/import'
    },
    {
      id: 5,
      icon: require('../assets/img/icon-bottom/btm_ex_cdf.png'),
      text: '出口报关单',
      path: url.CCBA + '/eImport/declare/export'
    },
    {
      id: 6,
      icon: require('../assets/img/icon-bottom/btm_declar_review.png'),
      text: '报关单审核',
      path: url.CCBA + '/eImport/reviewed'
    },
    {
      id: 7,
      icon: require('../assets/img/icon-bottom/btm_bta.png'),
      text: '业务跟踪台账',
      path: url.CCBA + '/eImport/dataQuery/tLedger'
    },
    {
      id: 8,
      icon: require('../assets/img/icon-bottom/btm_cddi.png'),
      text: '报关数据查询',
      path: url.CCBA + '/eImport/dataQuery/decInfo'
    },
    {
      id: 9,
      icon: require('../assets/img/icon-bottom/btm_im_annotation list.png'),
      text: '进口核注清单',
      path: url.CCBA + '/eImport/declare/importTaxList'
    },
    {
      id: 10,
      icon: require('../assets/img/icon-bottom/btm_ex_annotation list.png'),
      text: '出口核注清单',
      path: url.CCBA + '/eImport/declare/exportTaxList'
    }
  ],
  WWWLOGINBACK: url.COMMON + '/login?sysId=002&callback=' + url.CCBA + '/control'
}
