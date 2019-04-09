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
    exportSt: url.COMMON + '/reportForms/exportSt',
    // 删改单报表
    delDecSt: url.COMMON + '',
    // 工作量统计
    workComputer: url.COMMON + '',
    // 报关作业时效
    decJobTime: url.COMMON + ''
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
    handQuery: url.JINER + '/handBook/dataQuery/handBookQuery',

    // 保税货物流转 - 申报表
    // 转出申报
    outedcform: url.JINER + '/circulation/decForm/E/outedcform',
    // 转入申报
    incform: url.JINER + '/circulation/decForm/I/outedcform',
    // 申报表查询
    decFormQuery: url.JINER + '/circulation/decForm/decFormQuery',

    // 保税货物流转 - 收发货单
    // 发货登记
    deliver: url.JINER + '/circulation/goodsBill/deliver',
    // 收货登记
    take: url.JINER + '/circulation/goodsBill/take',
    // 收发货单查询
    query: url.JINER + '/circulation/goodsBill/query',

    // 保税货物流转 - 综合查询
    // 综合查询
    multipleQuery: url.JINER + '/circulation/multipleQuery',

    // 税货物流转 - 同步申报表
    // 同步申报表
    synDecForm: url.JINER + '/circulation/synDecForm',

    // 保税物流管理 - 数据录入
    // 物流账册
    bwl: url.JINER + '/graininess/datainput/bwl',
    // 保税核注清单(进口)
    taxList_I: url.JINER + '/graininess/datainput/I/taxList',
    // 保税核注清单(出口)
    taxList_E: url.JINER + '/graininess/datainput/E/taxList',
    // 业务申报表
    apply: url.JINER + '/circulation/synDecForm',
    // 出入库单
    stock: url.JINER + '/graininess/datainput/stock',
    // 核放单
    auditRelese: url.JINER + '/graininess/datainput/auditRelese',
    // 集中报关
    centDeclare: url.JINER + '/graininess/datainput/centDeclare',
    // 车辆信息
    carInfo: url.JINER + '/graininess/datainput/carInfo',

    // 保税物流管理 - 数据查询
    // 物流账册数据查询
    bwlQuery: url.JINER + '/graininess/dataQuery/bwlQuery',
    // 保税核注清单查询
    taxListQuery: url.JINER + '/graininess/dataQuery/taxListQuery',
    // 业务申报表数据查询
    applyQuery: url.JINER + '/graininess/dataQuery/applyQuery',
    // 申报表货物进出情况数据查询
    applyIxEQuery: url.JINER + '/graininess/dataQuery/applyIxEQuery',
    // 出入库单数据查询
    stockQuery: url.JINER + '/graininess/dataQuery/stockQuery',
    // 核放单数据查询
    releseQuery: url.JINER + '/graininess/dataQuery/releseQuery',
    // 出入库单生成核放单数据查询
    stockReleseQuery: url.JINER + '/graininess/dataQuery/stockReleseQuery',
    // 核注清单生成核放单数据查询
    taxReleseQuery: url.JINER + '/graininess/dataQuery/taxReleseQuery',
    // 车辆信息数据查询
    carInfoQuery: url.JINER + '/graininess/dataQuery/carInfoQuery',

    // 海关特殊监管区域 - 数据录入
    // 加工贸易账册
    accountBook_sea: url.JINER + '/sea/datainput/accountBook',
    // 物流账册
    bwl_sea: url.JINER + '/sea/datainput/bwl',
    // 加工贸易耗料单
    cmb: url.JINER + '/sea/datainput/cmb',
    // 加工贸易账册报核
    accountBookVer: url.JINER + '/sea/datainput/accountBookVer',
    // 保税核注清单(进口)
    taxList_I_sea: url.JINER + '/sea/datainput/I/taxList',
    // 保税核注清单(出口)
    taxList_E_sea: url.JINER + '/sea/datainput/E/taxList',
    // 业务申报表
    apply_sea: url.JINER + '/sea/datainput/apply',
    // 出入库单
    stock_sea: url.JINER + '/sea/datainput/stock',
    // 核放单
    auditRelese_sea: url.JINER + '/sea/datainput/auditRelese',
    // 集中报关
    centDeclare_sea: url.JINER + '/sea/datainput/centDeclare',
    // 车辆信息
    carInfo_sea: url.JINER + '/sea/datainput/carInfo',
    // 清单结关
    clearance: url.JINER + '/sea/datainput/clearance',

    // 海关特殊监管区域 - 数据查询
    // 加工贸易账册数据查询
    accountBookQuery: url.JINER + '/sea/dataQuery/accountBookQuery',
    // 物流账册数据查询
    bwlQuery_sea: url.JINER + '/sea/dataQuery/bwlQuery',
    // 业务申报表数据查询
    applyQuery_sea: url.JINER + '/sea/dataQuery/applyQuery',
    // 申报表货物进出情况数据查询
    applyIxEQuery_sea: url.JINER + '/sea/dataQuery/applyIxEQuery',
    // 出入库单数据查询
    stockQuery_sea: url.JINER + '/sea/dataQuery/stockQuery',
    // 核放单数据查询
    releseQuery_sea: url.JINER + '/sea/dataQuery/releseQuery',
    // 出入库单生成核放单数据查询
    stockReleseQuery_sea: url.JINER + '/sea/dataQuery/stockReleseQuery',
    // 核注清单生成核放单数据查询
    taxReleseQuery_sea: url.JINER + '/sea/dataQuery/taxReleseQuery',
    // 车辆信息数据查询
    carInfoQuery_sea: url.JINER + '/sea/dataQuery/carInfoQuery',
    // 清单结关查询
    clearanceQuery: url.JINER + '/sea/dataQuery/clearanceQuery'

  },
  // 通关参数
  passParams: {
    // 中英文对照
    ceCompare: url.COMMON + '',
    // 汽车零部件清单
    carParter: url.COMMON + '',
    // 税则
    taxRule: url.COMMON + '',
    // 统计商品目录
    productCate: url.COMMON + '',
    // 规范申报要素
    declareEle: url.COMMON + '',
    // 法检目录
    checkCate: url.COMMON + '',
    // 3C目录
    treeCate: url.COMMON + '',
    // CIQ编码
    CIQCode: url.COMMON + '',
    // 征免性质
    redemp: url.COMMON + '',
    // 港口
    port: url.COMMON + '',
    // 包装种类
    pakageKinds: url.COMMON + '',
    // 成交方式
    bargain: url.COMMON + '',
    // 监管证件
    regulate: url.COMMON + '',
    // 随附单据
    license: url.COMMON + '',
    // 优惠贸易协定
    tradePro: url.COMMON + '',
    // 国内地区
    inLandArea: url.COMMON + '',
    // 征减免税方式
    taxFree: url.COMMON + '',
    // 国内口岸
    inLandPort: url.COMMON + ''

  },
  // 通关状态
  passStatus: {
    // 海运舱单
    seaBill: url.COMMON + '',
    // 空运舱单
    airBill: url.COMMON + '',
    // 公路舱单
    loadBill: url.COMMON + '',
    // 公路舱单确报
    loadBillCom: url.COMMON + '',
    // 回执查询
    receiptQuery: url.COMMON + '',
    // 通关状态查询
    passStatusQuery: url.COMMON + ''
  },

  // 加工贸易手册--工作台底部快捷菜单
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
