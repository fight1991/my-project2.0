import url from './commonPath'
export default {
  eImport: {
    // 模板列表
    decTemplateList: url.COMMON + '/decTemplate/list',
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
    tLedger: url.COMMON + '/declaration/businessTrack',
    // 青源模板
    shipping: url.COMMON + '/declaration/shipping'
  },
  // 资料中心
  dataCenter: {
    // 非保税商品库
    noBonded: url.COMMON + '/declaration/commodity',
    // 保税商品库
    bonded: url.COMMON + '/declaration/goodsModel/list'
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
    // 进/出境/港申报-航班取消申报
    airCancel: url.COMMON + '/airVehicle/airCancel/list',
    // 在港申报-海关在港申报
    customPort: url.COMMON + '/airVehicle/customPort/list',
    // 在港申报-进境/港单证申报
    materials: url.COMMON + '/airVehicle/materials/list'
  },
  // 金二
  jinerInfo: {
    // 手册-备案业务
    // 加工贸易手册录入
    handAdd: url.JINER + '/handBook/datainput/handBook',
    // 加工贸易手册查询
    handQuery: url.JINER + '/handBook/dataQuery/handBookQuery',
    // 不作价设备使用情况
    exaluate: url.JINER + '/handBook/datainput/exaluate',
    // 不作价设备使用情况查询
    evaluateQuery: url.JINER + '/handBook/dataQuery/evaluateQuery',
    // 不作价设备解除监管查询
    relieveQuery: url.JINER + '/handBook/dataQuery/relieveQuery',

    // 手册-申报业务
    // 保税核注清单(进口)
    taxList_I_hand: url.JINER + '/handBook/datainput/I/taxList',
    // 保税核注清单(出口)
    taxList_E_hand: url.JINER + '/handBook/datainput/E/taxList',
    // 保税核注清单查询
    taxListQuery_hand: url.JINER + '/handBook/dataQuery/taxListQuery',

    // 手册-报核业务
    // 加工贸易手册报核
    handBookVer: url.JINER + '/handBook/datainput/handBookVer',
    // 加工贸易手册报核查询
    handBookVerQuery: url.JINER + '/handBook/dataQuery/handBookVerQuery',
    // 加工贸易手册报核查询
    handBookCerQuery: url.JINER + '/handBook/dataQuery/handBookCerQuery',

    // 手册-场站业务
    // 外发加工申报表
    declareForm: url.JINER + '/handBook/datainput/declareForm',
    // 外发加工申报表查询
    declareFormQuery: url.JINER + '/handBook/dataQuery/declareFormQuery',
    // 外发加工发货单
    delivery: url.JINER + '/handBook/datainput/delivery',
    // 外发加工收货单
    recipient: url.JINER + '/handBook/datainput/recipient',
    // 外发加工收发货单查询
    recipientQuery: url.JINER + '/handBook/dataQuery/recipientQuery',

    // 账册-备案业务
    // 企业资质申请
    apl: url.JINER + '/account/datainput/apl',
    // 企业资质申请查询
    aplQuery: url.JINER + '/account/dataQuery/aplQuery',
    // 加工贸易账册录入
    accountAdd: url.JINER + '/account/datainput/accountBook',
    // 加工贸易账册查询
    accountQuery: url.JINER + '/account/dataQuery/accountBookQuery',

    // 账册-申报业务
    // 保税核注清单(进口)
    taxList_I_acc: url.JINER + '/account/datainput/I/taxList',
    // 保税核注清单(出口)
    taxList_E_acc: url.JINER + '/account/datainput/E/taxList',
    // 保税核注清单查询
    taxListQuery_acc: url.JINER + '/account/dataQuery/taxListQuery',

    // 账册-报核业务
    // 加工贸易账册报核
    accountBookVerAcc: url.JINER + '/account/datainput/accountBookVer',
    // 加工贸易账册报核查询
    accountBookVerAccQuery: url.JINER + '/account/dataQuery/accountBookVerQuery',

    // 账册-场站业务
    // 外发加工申报表
    declareFormAcc: url.JINER + '/account/datainput/declareFormAcc',
    // 外发加工申报表查询
    declareFormAccQuery: url.JINER + '/account/dataQuery/declareFormAccQuery',
    // 外发加工发货单
    deliveryAcc: url.JINER + '/account/datainput/deliveryAcc',
    // 外发加工发货单查询
    deliveryAccQuery: url.JINER + '/account/dataQuery/deliveryAccQuery',
    // 外发加工收货单
    recipientAcc: url.JINER + '/account/datainput/recipientAcc',
    // 外发加工收货单查询
    recipientAccQuery: url.JINER + '/account/dataQuery/recipientAccQuery',

    // 海关特殊监管区域 - 备案业务
    // 加工贸易账册
    accountBook_sea: url.JINER + '/sea/datainput/accountBook',
    // 加工贸易账册数据查询
    accountBookQuery_sea: url.JINER + '/sea/dataQuery/accountBookQuery',
    // 物流账册
    bwl_sea: url.JINER + '/sea/datainput/bwl',
    // 物流账册数据查询
    bwlQuery_sea: url.JINER + '/sea/dataQuery/bwlQuery',
    // 加工贸易耗料单
    cmb_sea: url.JINER + '/sea/datainput/cmb',
    // 加工贸易耗料单查询
    cmbQuery_sea: url.JINER + '/sea/dataQuery/cmbQuery',
    // 不作价设备解除监管查询
    relieveQuery_sea: url.JINER + '/sea/dataQuery/relieveQuery',

    // 海关特殊监管区域 - 申报业务
    // 保税核注清单（进口）
    taxList_I_sea: url.JINER + '/sea/datainput/I/taxList',
    // 保税核注清单（出口）
    taxList_E_sea: url.JINER + '/sea/datainput/E/taxList',
    // 保税核注清单查询
    taxListQuery_sea: url.JINER + '/sea/dataQuery/taxListQuery',
    // 集中报关
    centDeclare_sea: url.JINER + '/sea/datainput/centDeclare',
    // 清单结关
    clearance_sea: url.JINER + '/sea/datainput/clearance',
    // 清单结关查询
    clearanceQuery_sea: url.JINER + '/sea/dataQuery/clearanceQuery',

    // 海关特殊监管区域 - 报核业务
    // 加工贸易账册报核
    accountBookVer_sea: url.JINER + '/sea/datainput/accountBookVer',
    // 加工贸易账册报核查询
    accountBookVerQuery_sea: url.JINER + '/sea/dataQuery/accountBookQuery',

    // 海关特殊监管区域 - 场站业务
    // 业务申报表
    apply_sea: url.JINER + '/sea/datainput/apply',
    // 业务申报表查询
    applyQuery_sea: url.JINER + '/sea/dataQuery/applyQuery',
    // 出入库单
    stock_sea: url.JINER + '/sea/datainput/stock',
    // 出入库单查询
    stockQuery_sea: url.JINER + '/sea/dataQuery/stockQuery',
    // 核放单
    auditRelese_sea: url.JINER + '/sea/datainput/auditRelese',
    // 核放单查询
    releseQuery_sea: url.JINER + '/sea/dataQuery/releseQuery',
    // 车辆信息
    carInfo_sea: url.JINER + '/sea/datainput/carInfo',
    // 车辆信息查询
    carInfoQuery_sea: url.JINER + '/sea/dataQuery/carInfoQuery',
    // 申报表货物进出查询
    applyIxEQuery_sea: url.JINER + '/sea/dataQuery/applyIxEQuery',
    // 出入库单生成核放单查询
    stockReleseQuery_sea: url.JINER + '/sea/dataQuery/stockReleseQuery',
    // 核注清单生成核放单查询
    taxReleseQuery_sea: url.JINER + '/sea/dataQuery/taxReleseQuery',

    // 保税货物流转 - 场站业务
    // 转出申报
    outedcform: url.JINER + '/circulation/decForm/E/outedcform',
    // 转入申报
    incform: url.JINER + '/circulation/decForm/I/outedcform',
    // 申报表查询
    decFormQuery: url.JINER + '/circulation/decForm/decFormQuery',
    // 收货登记
    takeIn: url.JINER + '/circulation/goodsBill/take',
    // 发货登记
    deliverOut: url.JINER + '/circulation/goodsBill/deliver',
    // 综合查询
    multipleQuery: url.JINER + '/circulation/multipleQuery',
    // 同步申报表
    synDecForm: url.JINER + '/circulation/synDecForm',

    // 保税物流管理 - 备案业务
    // 物流账册
    bwl_gra: url.JINER + '/graininess/datainput/bwl',
    // 物流账册查询
    bwlQuery_gra: url.JINER + '/graininess/dataQuery/bwlQuery',

    // 保税物流管理 - 申报业务
    // 保税核注清单（进口）
    taxList_I_gra: url.JINER + '/graininess/datainput/I/taxList',
    // 保税核注清单（出口）
    taxList_E_gra: url.JINER + '/graininess/datainput/E/taxList',
    // 保税核注清单查询
    taxListQuery_gra: url.JINER + '/graininess/dataQuery/taxListQuery',
    // 集中报关
    centDeclare_gra: url.JINER + '/graininess/datainput/centDeclare',
    // 清单结关
    clearance_gra: url.JINER + '/graininess/datainput/clearance',
    // 清单结关查询
    clearanceQuery_gra: url.JINER + '/graininess/dataQuery/clearanceQuery',

    // 保税物流管理 - 场站业务
    // 业务申报表
    apply_gra: url.JINER + '/graininess/datainput/apply',
    // 业务申报表查询
    applyQuery_gra: url.JINER + '/graininess/dataQuery/applyQuery',
    // 出入库单
    stock_gra: url.JINER + '/graininess/datainput/stock',
    // 出入库单查询
    stockQuery_gra: url.JINER + '/graininess/dataQuery/stockQuery',
    // 核放单
    auditRelese_gra: url.JINER + '/graininess/datainput/auditRelese',
    // 核放单查询
    releseQuery_gra: url.JINER + '/graininess/dataQuery/releseQuery',
    // 车辆信息
    carInfo_gra: url.JINER + '/graininess/datainput/carInfo',
    // 车辆信息查询
    carInfoQuery_gra: url.JINER + '/graininess/dataQuery/carInfoQuery',
    // 申报表货物进出情况查询
    applyIxEQuery_gra: url.JINER + '/graininess/dataQuery/applyIxEQuery',
    // 出入库单生成核放单查询
    stockReleseQuery_gra: url.JINER + '/graininess/dataQuery/stockReleseQuery',
    // 核注清单生成核放单查询
    taxReleseQuery_gra: url.JINER + '/graininess/dataQuery/taxReleseQuery'
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
    // 关区
    customs: url.COMMON + '',
    // 国别(地区)
    country: url.COMMON + '',
    // 币制
    money: url.COMMON + '',
    // 计量单位
    unit: url.COMMON + '',
    // 监管方式
    controlMode: url.COMMON + '',
    // 运输方式
    transport: url.COMMON + '',
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
    licensePass: url.COMMON + '',
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
      path: url.CCBA + '/eImport/receipt/import',
      permissions: 'CCBA20202010000'
    },
    {
      id: 3,
      icon: require('../assets/img/icon-bottom/btm_ex_Receipt.png'),
      text: '出口接单',
      path: url.CCBA + '/eImport/receipt/export',
      permissions: 'CCBA20202020000'
    },
    {
      id: 4,
      icon: require('../assets/img/icon-bottom/btm_im_cdf.png'),
      text: '进口报关单',
      path: url.CCBA + '/eImport/declare/import',
      permissions: 'CCBA20203010000'
    },
    {
      id: 5,
      icon: require('../assets/img/icon-bottom/btm_ex_cdf.png'),
      text: '出口报关单',
      path: url.CCBA + '/eImport/declare/export',
      permissions: 'CCBA20203030000'
    },
    {
      id: 6,
      icon: require('../assets/img/icon-bottom/btm_declar_review.png'),
      text: '报关单审核',
      path: url.CCBA + '/eImport/reviewed',
      permissions: 'CCBA20204000000'
    },
    {
      id: 7,
      icon: require('../assets/img/icon-bottom/btm_bta.png'),
      text: '业务跟踪台账',
      path: url.CCBA + '/eImport/dataQuery/tLedger',
      permissions: 'CCBA20205030000'
    },
    {
      id: 8,
      icon: require('../assets/img/icon-bottom/btm_cddi.png'),
      text: '报关数据查询',
      path: url.CCBA + '/eImport/dataQuery/decInfo',
      permissions: 'CCBA20205010000'
    },
    {
      id: 9,
      icon: require('../assets/img/icon-bottom/btm_im_annotation list.png'),
      text: '进口核注清单',
      path: url.CCBA + '/eImport/declare/importTaxList',
      permissions: 'CCBA20203050000'
    },
    {
      id: 10,
      icon: require('../assets/img/icon-bottom/btm_ex_annotation list.png'),
      text: '出口核注清单',
      path: url.CCBA + '/eImport/declare/exportTaxList',
      permissions: 'CCBA20203060000'
    }
  ],
  WWWLOGINBACK: url.COMMON + '/login?sysId=CCBA&callback=' + url.CCBA + '/control',
  WWWCCBA: url.CCBA + '/control'
}
