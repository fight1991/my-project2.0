const url = {
  COMMON: 'https://test.5itrade.cn', // 公共服务
  FINANCE: 'https://test.5itrade.cn:8093', // 物流费用
  CCBA: 'https://51baoguan.cn:8091', // CCBA 1.0
  JINER: 'https://test.5itrade.cn:8077' // 金二
}

export default {
  list: [
    {
      id: 1,
      icon: require('../assets/img/icon-bottom/btm_cust.png'),
      text: '客户管理',
      path: url.CCBA + '/BaseData/CopCustomer/Index'
    },
    {
      id: 2,
      icon: require('../assets/img/icon-bottom/btm_im_receipt.png'),
      text: '进口接单',
      path: url.COMMON + '/Dec/Other/Index?url=%2fdeclaration%2freceiveOrders%2fimport'
    },
    {
      id: 3,
      icon: require('../assets/img/icon-bottom/btm_ex_Receipt.png'),
      text: '出口接单',
      path: url.COMMON + '/Dec/Other/Index?url=%2fdeclaration%2freceiveOrders%2fexport'
    },
    {
      id: 4,
      icon: require('../assets/img/icon-bottom/btm_im_cdf.png'),
      text: '进口报关单',
      path: url.COMMON + '/declaration/declaration/import/add/new'
    },
    {
      id: 5,
      icon: require('../assets/img/icon-bottom/btm_ex_cdf.png'),
      text: '出口报关单',
      path: url.COMMON + '/declaration/declaration/export/add/new'
    },
    {
      id: 6,
      icon: require('../assets/img/icon-bottom/btm_declar_review.png'),
      text: '报关单审核',
      path: url.COMMON + '/Dec/DecEntry/DecIndex'
    },
    {
      id: 7,
      icon: require('../assets/img/icon-bottom/btm_bta.png'),
      text: '业务跟踪台账',
      path: url.COMMON + '/Dec/Other/Index?url=%2fdeclaration%2fdecCheck%2flist'
    },
    {
      id: 8,
      icon: require('../assets/img/icon-bottom/btm_cddi.png'),
      text: '报关数据查询',
      path: url.COMMON + '/declaration/list'
    },
    {
      id: 9,
      icon: require('../assets/img/icon-bottom/btm_im_annotation list.png'),
      text: '进口核注清单',
      path: url.JINER + ''
    },
    {
      id: 10,
      icon: require('../assets/img/icon-bottom/btm_ex_annotation list.png'),
      text: '出口核注清单',
      path: url.JINER + ''
    }
  ]
}
