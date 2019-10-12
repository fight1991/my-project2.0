<template>
  <!-- 两步申报 新增 详情 修改 合用界面-->
  <section class='sys-main sys-dec-class sys-summary-class' :style="{ zoom: zoom }">
    <el-header style="height: 65px;" class='topDiv'>
    <!-- 操作按钮-->
      <el-row style='margin-right:20px' class="mg-b-15">
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-plus" @click="addDecHead" :disabled="controller.isDisabled">&nbsp;新增</el-button>
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-save" @click="saveDecHead" :disabled="controller.isDisabled">&nbsp;暂存</el-button>
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-copy" @click="copyDecHead">&nbsp;复制</el-button>
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-print" @click="printDecHead">&nbsp;打印</el-button>
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-trash-o" @click="delDecHead" :disabled="controller.isDisabled">&nbsp;删除</el-button>
         <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-upload" @click="sumbitCheck" :disabled="controller.isDisabled">&nbsp;提交审核</el-button>
        <el-button type="primary" class='dec-h-24 completeBtn' size="mini" icon="fa fa-long-arrow-right" @click="goToDec" :disabled="controller.completeBtn">&nbsp;完整申报</el-button>
        <el-button type="primary" class='dec-h-24' size="mini" icon="fa fa-paper-plane-o" @click="declareData('G')" style='float: right;' :disabled="controller.isDisabled">&nbsp;发送</el-button>
      </el-row>
      <el-row class="borderBN">
        <el-col :span="16">
          <el-form label-width="90px" class="summary-head-form">
            <el-form-item label="两步申报模式">
              <el-checkbox-group v-model="declareType" @change="declareTypeChange" :disabled="controller.isDisabled">
                <el-checkbox :label="1">涉证</el-checkbox>
                <el-checkbox :label="2">涉检</el-checkbox>
                <el-checkbox :label="3">涉税</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" align="right"><div class="summary-tip"><i class="el-icon-warning"></i><span>注：运输工具申报进境日期起14日内需完成完整申报。</span></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-container>
        <el-main style="padding:66px 5px 20px 20px;">
          <div class="summary-title">概要申报基本信息</div>
          <!---表头开始  -->
          <dec-head ref='decHead' :moduleName="moduleName"></dec-head>
          <!---表头结束  -->
          <div class="summary-title">概要申报商品信息</div>
          <!---表体开始  -->
          <dec-list ref='decList' :moduleName="moduleName"></dec-list>
        </el-main>
      </el-container>
      <el-aside style="width: 20%; padding-top: 66px;">
        <!-- 集装箱信息 开始-->
        <dec-container ref='decContainer' :moduleName="moduleName"></dec-container>
        <!-- 集装箱信息 结束-->
        <!-- 随附单证 开始 -->
        <dec-documents ref='decDocuments' @compareDecAndEms='compareDecAndEms' :moduleName="moduleName"  v-show="(declareTypes.indexOf(1) !== -1)"></dec-documents>
        <!-- 随附单证 结束 -->
      </el-aside>
      <div class='bottomDiv' v-show="tipsNoteShow"><span>{{tipsNote}}</span></div>
    </el-container>
    <!-- 弹出框 打印报关单 开始 -->
    <el-dialog
      title="打印报关单"
      :visible.sync="printCompnentVisible"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :show-close='false'
      v-dialogDrag
      width="640px">
       <decprint-view :initParams="printCompnentParam" :moduleName="moduleName" @cancLeData="closePrintCompnent"  v-if="printCompnentVisible"></decprint-view>
    </el-dialog>
    <!-- 弹出框 打印报关单 结束 -->
  </section>
</template>
<script>
import util from '@/common/util.js'
import decUtil from '../decPage/common/decUtil'
import summaryDecStore from './summaryDecStore'
import decHead from '../summaryDec/components/decHead'
import decList from '../summaryDec/components/decList'
import decContainer from '../summaryDec/components/containers'
import decDocuments from '../summaryDec/components/documents'
import decprintView from '../decPage/components/decPrint'
import config from '@/config/config'
export default {
  components: {
    decHead,
    decList,
    decContainer,
    decDocuments,
    decprintView
  },
  data () {
    return {
      moduleName: '',
      declareType: [], // 两步申报
      printCompnentVisible: false, // 打印弹窗
      copyTabId: ''
    }
  },
  beforeDestroy () {
    this.$store.unregisterModule(this.moduleName)
  },
  created () {
    let {operationType, funFlag, pid} = this.$route.params
    this.moduleName = funFlag + '-' + operationType + '-' + pid
    this.$store.registerModule(this.moduleName, summaryDecStore)
    decUtil.setModuleName(this.moduleName)
    this.controller.operationType = operationType
    this.controller.funFlag = funFlag
    this.controller.pid = operationType !== 'add' ? pid : ''
    this.controller.isDisabled = operationType === 'look'
    if (this.controller.operationType === 'look') {
      this.controller.requireColor = false
    }
    // 获取初始数据
    this.$all([
      // 海关关区  运输方式 企业资质类别 许可证类别 贸易条款
      this.getCommonParams(['SAAS_CUSTOMS_REL', 'SAAS_TRANSPORT_TYPE', 'SAAS_ENT_QUALIF_TYPE', 'SAAS_LIC_TYPE', 'SAAS_TRADE']),
      // 成交方式 包装种类 征免性质 港口参数表 币值信息表
      this.getCommonParams(['SAAS_TRANSAC', 'SAAS_WRAP', 'SAAS_LEVYTYPE', 'SAAS_PORT_LIN', 'SAAS_CURR']),
      // 国别信息表  入离境口岸 计量单位表 原产地区 境内目的地
      this.getCommonParams(['SAAS_COUNTRY', 'SAAS_INLAND_PORT', 'SAAS_UNIT', 'SAAS_CIQ_ORIGIN_PLACE', 'SAAS_DISTRICT_REL']),
      // 目的地代码  征免方式 集装箱规格表  随附单证代码 用途代码
      this.getCommonParams(['SAAS_CIQ_CITY_CN', 'SAAS_LEVYMODE', 'SAAS_CONTAINER_MODEL', 'SAAS_LICENSEDOCU', 'SAAS_USER_TO']),
      this.getCommonParams1()
    ]).then(() => {
      this.specialInit()
    })
  }, // declaration-add-new
  computed: {
    controller () {
      return this.$store.state[this.moduleName].controller
    },
    tipsNoteShow () {
      return this.$store.state[this.moduleName].tipsNoteShow
    },
    tipsNote () {
      return this.$store.state[this.moduleName].tipsNote
    },
    tipsMessage () {
      return this.$store.state[this.moduleName].tipsMessage
    },
    declareTypes () {
      return this.$store.state[this.moduleName].declareType
    }
  },
  mounted () {
    // 获取tabId  为了CCBA
    this.tabId = this.getQueryString('tabId')
    let type = this.$route.query.type // 取路径的参数
    let operation = this.$route.params.operationType
    // 备案清单、报关单标识
    if (this.controller.funFlag === 'declaration') {
      // this.$nextTick(_ => {
      this.$refs.decHead.decHead.declTrnrel = '0'
      // })
      this.controller.declTrnrel = '0'
    } else if (this.controller.funFlag === 'recordList') {
      this.$nextTick(_ => {
        this.$refs.decHead.decHead.declTrnrel = '2'
      })
      this.controller.declTrnrel = '2'
    }
    if (operation === 'look' || operation === 'edit' || (operation === 'add' && !util.isEmpty(type))) {
      this.controller.completeBtn = false
      // 这里的初始化不需要反填信息
      this.$nextTick(_ => {
        this.$refs.decHead.initDefautHeadData()
      })
    } else if (operation === 'add') {
      this.$nextTick(_ => {
        this.$refs.decHead.decHead.iEFlag = this.controller.iEFlag
        // this.$refs.decList.decList.gNo = this.$refs.decList.tableList.length + 1
        if (this.controller.funFlag === 'recordList') {
          this.$refs.decHead.initbilltype()
        }
        this.$refs.decHead.initDefautHeadData('1')
      })
    }
  },
  methods: {
    specialInit () {
      // 初始化 默认下拉框值
      // this.$nextTick(_ => {
      //   this.$refs.decList.initBodyCountry()
      // })
      let operation = this.controller.operationType // 取路径的参数
      let type = this.$route.query.type
      if ((operation === 'look' && util.isEmpty(type)) || operation === 'edit') {
        this.getDecDetail(this.$route.params.pid)
      } else if (operation === 'add' && !util.isEmpty(type)) {
        // 复制功能
        this.controller.completeBtn = true
        this.initLocalStorageData('copyDec')
      } else if (operation === 'look' && (type === 'lookHistory')) {
        // 这个功能是查看 历史记录的报关单
        this.initLocalStorageData('decHistory')
      }
      // 当 新增页面的时候 光标默认在 申报地海关 所以这里设置 默认的参数和表
      this.$store.commit(this.moduleName + '/changeDecPage', {key: 'selectObj', value: {obj: 'saasCustomsRel1', params: 'SAAS_CUSTOMS_REL'}})
    },
    // 获取路径传参
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return (r[2])
      }
      return null
    },
    getCommonParams (par) {
      return {
        useStorage: true,
        storageKey: par,
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: {
          'tableNames': par
        },
        success: (res) => {
        }
      }
    },
    // 获取公共字典list
    getCommonParams1 () {
      // 申报要素品牌类型 关联理由  货物属性  检验检疫机关代码  检验检疫签证申报要素 随附单据
      let par = ['SAAS_ELEMENT_BRAND', 'SAAS_CORRELATION_REASON', 'SAAS_GOODS_ATTR', 'SAAS_CIQ_ORGANIZATION', 'SAAS_CIQ_CERT_ELEMENT', 'SAAS_EDOC_CODE']
      return {
        useStorage: true,
        storageKey: par,
        hasStorageCallback: () => {
          let _this = this
          this.$nextTick(_ => {
            _this.$refs.decList.saasGoodsAttr = JSON.parse(window.localStorage.getItem('SAAS_GOODS_ATTR'))
          })
        },
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: {
          'tableNames': par
        },
        success: (res) => {
          let _this = this
          this.$nextTick(_ => {
            _this.$refs.decList.saasGoodsAttr = JSON.parse(window.localStorage.getItem('SAAS_GOODS_ATTR'))
          })
        }
      }
    },
    // 报关单暂存表头校验
    verifyDecBeforeSave () {
      let mesLen
      // let tableList = this.$refs.decList.tableList // 表体
      let decHead = this.$refs.decHead.decHead // 表头
      let licenselist = this.declareType.indexOf(1) !== -1 ? this.$refs.decDocuments.licenselist : [] // 随附单据
      this.$refs.decHead.verifyDecHeadBeforeSave()
      let messageTips = this.$store.state[this.moduleName].headMessageTips
      // // 表头表体重量检控
      // if (decHead.netWt) {
      //   let listTotalNet = 0
      //   tableList.forEach((v, i) => {
      //     let middle = ''
      //     if (v.gUnit === '036' && !util.isEmpty(v.gQty)) { // 克
      //       listTotalNet = decUtil.Add(listTotalNet, v.gQty)
      //     } else if (v.gUnit === '035' && !util.isEmpty(v.gQty)) {
      //       middle = decUtil.Mul(v.gQty, 1000)
      //       listTotalNet = decUtil.Add(listTotalNet, middle)
      //     } else if (v.unit1 === '036' && !util.isEmpty(v.qty1)) {
      //       listTotalNet = decUtil.Add(listTotalNet, v.qty1)
      //     } else if (v.unit1 === '035' && !util.isEmpty(v.qty1)) {
      //       middle = decUtil.Mul(v.qty1, 1000)
      //       listTotalNet = decUtil.Add(listTotalNet, v.middle)
      //     } else if (v.unit2 === '036' && !util.isEmpty(v.qty2)) {
      //       listTotalNet = decUtil.Add(listTotalNet, v.qty2)
      //     } else if (v.unit2 === '035' && !util.isEmpty(v.qty2)) {
      //       middle = decUtil.Mul(v.qty2, 1000)
      //       listTotalNet = decUtil.Add(listTotalNet, v.middle)
      //     }
      //   })
      //   let netWtg = decUtil.Mul(decHead.netWt, 1000)
      //   if (netWtg < listTotalNet) {
      //     mesLen = messageTips.length + 1
      //     messageTips.push(mesLen + '.' + '表体商品重量需要小于或等于表头总净重')
      //   }
      // }
      // 随附单证代码为“Y”时，需要上传随附单据“00000001 合同”以及“00000003 提/运单”，未上传时提示
      let licenseIndex = licenselist.findIndex((v, i) => {
        return v.docuCode === 'Y'
      })
      if (licenseIndex > -1) {
        let decEdocRealations = decHead.decEdocRealations
        if (decEdocRealations.length > 0) {
          let index1 = decEdocRealations.findIndex((v, i) => {
            return v.edocCode === '00000001'
          })
          let index2 = decEdocRealations.findIndex((v, i) => {
            return v.edocCode === '00000003'
          })
          if (index2 === -1) {
            mesLen = messageTips.length + 1
            messageTips.push(mesLen + '.' + '随附单证代码为Y时，需要上传随附单据00000003-提/运单')
          }
          if (index1 === -1) {
            mesLen = messageTips.length + 1
            messageTips.push(mesLen + '.' + '随附单证代码为Y时，需要上传随附单据00000001-发票')
          }
        } else {
          mesLen = messageTips.length + 1
          messageTips.push(mesLen + '.' + '随附单证代码为Y时，需要上传随附单据00000003-提/运单')
          mesLen = messageTips.length + 1
          messageTips.push(mesLen + '.' + '随附单证代码为Y时，需要上传随附单据00000001-发票')
        }
      }
      // 提示 需要添加的随附单证
      let needArr = []
      // 先算出本票报关单需要的所有单证
      // for (let n in tableList) {
      //   if (!util.isEmpty(tableList[n].controlMa)) {
      //     needArr.push(...tableList[n].controlMa.split(','))
      //   }
      // }
      needArr = decUtil.unique(needArr)
      // 判单 一些特殊单证
      // 1.当进口时
      if (this.controller.iEFlag === 'I') {
        // 6旧机电产品禁止进口提示：项号X、X、X为旧机电产品时，禁止进口
        let arrIndex1 = needArr.findIndex((v, i) => {
          return v === '6'
        })
        // 9禁止进口商品提示：项号X、X、X为禁止进口商品
        let arrIndex2 = needArr.findIndex((v, i) => {
          return v === '9'
        })
        // A检验检疫商品表头以及表体涉检必填项未填时，提示：项号X、X、X涉检，请完善检验检疫信息
        // D出/入境货物通关单（毛坯钻石用）
        // let arrIndex3 = needArr.findIndex((v, i) => {
        //   return v === 'A' || v === 'D'
        // })
        let tipsArr1 = [] // 旧机电产品
        let tipsArr2 = [] // 禁止进口商品
        let tipsArr3 = [] // A D
        // tableList.forEach((item) => {
        //   if (!util.isEmpty(item.controlMa)) {
        //     if (arrIndex1 > -1 && item.controlMa.indexOf('6') > -1) {
        //       tipsArr1.push(item.gNo)
        //     }
        //     if (arrIndex2 > -1 && item.controlMa.indexOf('9') > -1) {
        //       tipsArr2.push(item.gNo)
        //     }
        //     if (arrIndex3 > -1 && (item.controlMa.indexOf('A') > -1 || item.controlMa.indexOf('D') > -1)) {
        //       tipsArr3.push(item.gNo)
        //     }
        //   }
        // })
        if (tipsArr1.length > 0) {
          needArr.splice(arrIndex1, 1)
          mesLen = messageTips.length + 1
          messageTips.push(mesLen + '.' + '项号' + tipsArr1.join('、') + '为旧机电产品时，禁止进口')
        }
        if (tipsArr2.length > 0) {
          needArr.splice(arrIndex2, 1)
          mesLen = messageTips.length + 1
          messageTips.push(mesLen + '.' + '项号' + tipsArr2.join('、') + '为禁止进口商品')
        }
        if (tipsArr3.length > 0) { // 有涉检
          // 检查检验信息是否完善
          // let flag = false // false 代表质检信息已经完善 true 代表已经完善
          // 1.检验表头
          // let checkFeildArr = []
          // checkFeildArr.push(decHead.orgCode) // 检验检疫受理机关
          // checkFeildArr.push(decHead.vsaOrgCode) // 领证机关
          // checkFeildArr.push(decHead.inspOrgCode) // 口岸检验检疫机关
          // checkFeildArr.push(decHead.despDate) // 启运日期
          // let index = checkFeildArr.findIndex((v, i) => {
          //   return util.isEmpty(v)
          // })
          // if (index > -1) {
          //   flag = true
          // }
          // 表体
          // for (let xy in tableList) {
          //   if (!tableList[xy].purpose || tableList[xy].goodsAttr.length === 0) {
          //     flag = true
          //     break
          //   }
          // }
          // if (flag) {
          //   mesLen = messageTips.length + 1
          //   messageTips.push(mesLen + '.' + '涉检，请完善检验检疫信息')
          // }
        }
        // 监管方式为“0110”且商品编码涉A时，
        // 商品表体的“检验检疫货物规格”的“货物品牌”、“货物规格”字段未填时提示：项号X需要补充货物品牌、货物规格信息；
        // “生产日期”、“生产批次”两个字段均为填写时提示：项号X需要补充生产日期或生产批次信息。
        // let AmessageTips = []
        // if (decHead.tradeMode === '0110') {
        // for (let c in tableList) {
        //   let bodyVo = tableList[c]
        //   if (bodyVo.controlMa.indexOf('A') > -1) {
        //     if (util.isEmpty(bodyVo.goodsBrand) || util.isEmpty(bodyVo.goodsSpec)) {
        //       AmessageTips.push('   项号' + bodyVo.gNo + '需要补充货物品牌、货物规格信息')
        //     }
        //     if (util.isEmpty(bodyVo.produceDate) && util.isEmpty(bodyVo.prodBatchNo)) {
        //       AmessageTips.push('  项号' + bodyVo.gNo + '需要补充生产日期或生产批次信息')
        //     }
        //   }
        // }
        // }
        // if (AmessageTips.length > 0) {
        //   mesLen = messageTips.length + 1
        //   messageTips.push(mesLen + '.' + '当前申报的商品如含有食品、化妆品')
        //   messageTips.push(...AmessageTips)
        // }
      }
      // 监管方式为“0255 来料深加工”、“0654 进料深加工”，且未添加添加随附单证时提示
      if (['0255', '0654'].includes(decHead.tradeMode)) {
        needArr.push('K')
      }
      // 进口时启运国为“CHN 中国”，且征免方式为“1 照章征税”，未添加添加随附单证时提示
      // if (decHead.tradeCountry === 'CHN' && this.controller.iEFlag === 'I') {
      //   for (let m in tableList) {
      //     if (tableList[m].dutyMode === '1') {
      //       needArr.push('c')
      //       break
      //     }
      //   }
      // }
      // 去掉 A证的提示
      for (let g in needArr) {
        if (needArr[g] === 'A') {
          needArr.splice(g, 1)
          break
        }
      }
      // 删除 已经有了的单证
      if (needArr.length > 0) {
        for (let x in licenselist) {
          for (let y in needArr) {
            if (licenselist[x].docuCode === needArr[y]) {
              needArr.splice(y, 1)
              break
            }
          }
        }
      }
      // 1、备案号格式为H****W******、T****W******，或随附单证中添加了a证，不提示需要添加内销征税联系单
      // for (let n in needArr) {
      //   if (needArr[n] === 'c') {
      //     // let _manualNo = decHead.manualNo
      // let index = licenselist.findIndex((v, i) => {
      //   return v.docuCode === 'a'
      // })
      // if ((['H', 'T'].includes(_manualNo.charAt(0).toUpperCase()) && _manualNo.charAt(5).toUpperCase() === 'W') || index > -1) {
      //   needArr.splice(n, 1)
      //   break
      // }
      //   }
      // }
      if (needArr.length > 0) {
        mesLen = messageTips.length + 1
        messageTips.push(mesLen + '.' + '此票数据可能需要添加代码为: ' + needArr.join(',') + ' 的随附单证')
      }
      return messageTips
    },
    // 两步申报模式变化
    declareTypeChange (val) {
      this.$store.commit(this.moduleName + '/changeDecType', val)
    },
    // 新增
    addDecHead () {
      this.$refs.decHead.initHeadData()
      this.$refs.decList.initBodyData()
      this.$refs.decContainer.initContainerData()
      this.$refs.decDocuments.initDocumentsData()
      this.controller.pid = ''
      this.controller.completeBtn = true
      this.declareType = []
      this.$store.commit(this.moduleName + '/changeDecType', this.declareType)
      // 聚焦点
      this.$refs.decHead.focusCustomMaster()
    },
    // 暂存
    saveDecHead () {
      this.$refs.decHead.saveDecHeadFieldVerify()
      let flag = this.$store.state[this.moduleName].headValidResult
      if (!flag) {
        return false
      }
      let messageTips = this.verifyDecBeforeSave()
      this.checkTradeName(messageTips)
    },
    // 校验企业信用等级预警
    checkTradeName (messageTips) {
      this.$post({
        url: 'API@/saas-dictionary/dictionary/checkCopCredit',
        data: this.$refs.decHead.decHead.tradeName,
        success: (res) => {
          if (res.result) {
            if (res.result === 'abnormal') {
              let mesLen = messageTips.length + 1
              messageTips.push(mesLen + '.' + '境内收发货人信用等级未达标')
            }
            if (messageTips.length > 0) {
              let tips = messageTips.join('<br>')
              this.$confirm(tips, '提示', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '继续暂存',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.singleSaveDecHead()
              }).catch(() => {
              })
            } else {
              this.singleSaveDecHead()
            }
          }
        }
      })
    },
    singleSaveDecHead () {
      let tableDecContainerlist = this.$refs.decContainer.tableDecContainerlist
      for (let i in tableDecContainerlist) {
        tableDecContainerlist[i].decPid = ''
      }
      let licenselist = this.declareType.indexOf(1) !== -1 ? this.$refs.decDocuments.licenselist : []
      let decHeadVo = util.simpleClone(this.$refs.decHead.decHead)
      let [a, b, c] = ['0', '0', '0']
      for (let i in this.declareType) {
        if (this.declareType[i] === 1) {
          a = '1'
        } else if (this.declareType[i] === 2) {
          b = '1'
        } else if (this.declareType[i] === 3) {
          c = '1'
        }
      }
      decHeadVo['twoStepFlag'] = a + b + c
      // 后端要求清除的
      delete decHeadVo.createTime
      delete decHeadVo.createUser
      delete decHeadVo.inputName
      delete decHeadVo.inputerName
      let param = {
        decContainersVO: tableDecContainerlist,
        decHeadVO: decHeadVo,
        decLicensesVO: licenselist,
        decListVO: this.$refs.decList.tableList
      }
      this.$post({
        url: 'API@/dec-common/dec/ts/saveTs',
        data: param,
        success: (res) => {
          this.messageTips(res.message, 'success')
          if (decHeadVo.pid === '') {
            let result = util.isEmpty(res.result) ? {} : res.result
            this.$refs.decHead.setHeadFieldValue({
              'pid': result.pid,
              'status': result.status,
              'statusValue': result.statusValue
            })
            this.controller.pid = result.pid
            this.controller.completeBtn = false
            let sysId = window.sessionStorage.getItem('sysId')
            let name = '进口报关单(概要申报)' + result.pid
            let CCBATtitle = ''
            let funlag = ''
            // 重开页签
            if (this.controller.iEFlag === 'I' && this.controller.declTrnrel === '0') { // 进口报关单
              CCBATtitle = '进口报关单(概要申报)'
              name = CCBATtitle + result.pid
              funlag = 'declaration'
            } else if (this.controller.iEFlag === 'I' && this.controller.declTrnrel === '2') {
              CCBATtitle = '进境备案清单(概要申报)'
              name = CCBATtitle + result.pid
              funlag = 'recordList'
            }
            if (sysId === '002') {
              window.parent.postMessage({type: 'modiftyTab', data: {title: name, tabId: this.tabId}}, '*')
            } else if (sysId === 'CCBA') {
              let tabId = util.isEmpty(this.tabId) ? ('rewEdit-' + result.pid) : this.tabId
              if (this.$route.query.type && this.$route.query.type === 'copy') {
                this.copyTabId = 'rewEdit-' + result.pid
              }
              let url = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev'].HOST + '/declaration/summaryDec/' + funlag + '/edit/' + result.pid
              window.parent.postMessage({type: 'refresh', data: {url: url, operationType: 'rewEdit', id: result.pid, title: CCBATtitle, tabId: tabId}}, '*')
            }
          }
        },
        other: (res) => {
          this.messageTips(res.message, 'error')
        }
      })
    },
    // 加入 审核驳回后 错误数据分析
    // 处理复制过来的数据
    /**
     * @param 'copyDec' 处理复制过来的数据 'decHistory' 查看备份数据
     */
    initLocalStorageData (param) {
      let decVo = JSON.parse(window.localStorage.getItem(param))
      // 表头
      // 表头数据拆出来
      let decHeadVO = decVo.decHeadVO
      this.declareType = []
      if (decHeadVO.twoStepFlag.split('')[0] === '1') {
        this.declareType.push(1)
      }
      if (decHeadVO.twoStepFlag.split('')[1] === '1') {
        this.declareType.push(2)
      }
      if (decHeadVO.twoStepFlag.split('')[2] === '1') {
        this.declareType.push(3)
      }
      this.$store.commit(this.moduleName + '/changeDecType', this.declareType)
      this.$refs.decHead.getHeadDetail(decHeadVO)
      this.$refs.decList.getBodyDetail(decVo.decListVO)
      // 集装箱
      this.$refs.decContainer.getContainersDetail(decVo.decContainersVO)
      // 随附单证
      this.$nextTick(() => {
        this.$refs.decDocuments.getDocumentsDetail(decVo.decLicensesVO)
      })
    },
    // 复制
    copyDecHead () {
      // 做法 就是去掉所有的主键和状态
      if (util.isEmpty(this.controller.pid)) {
        this.messageTips('没有可复制的数据', 'error')
        return false
      }
      let sysId = window.sessionStorage.getItem('sysId')
      if (sysId === '002') {
        this.$refs.decHead.clearHeadData()
        this.controller.pid = ''
        // 清除 表体的主键
        this.$refs.decList.clearBodyData()
        // 清除集装箱主键
        this.$refs.decContainer.clearDecContainerData()
        // 清除 随附单证主键
        this.$refs.decDocuments.clearDocumentsData()
        this.controller.isDisabled = false
        this.controller.requireColor = true
        this.messageTips('数据复制成功', 'success')
      } else {
        let decHeadVo = util.simpleClone(this.$refs.decHead.decHead)
        // let cropLimit = this.$refs.decHead.cropLimit
        // if (!util.isEmpty(cropLimit.entQualiftypeCode)) {
        //   decHeadVo.decCopLimits.push(cropLimit)
        // }
        let [a, b, c] = ['0', '0', '0']
        for (let i in this.declareType) {
          if (this.declareType[i] === 1) {
            a = '1'
          } else if (this.declareType[i] === 2) {
            b = '1'
          } else if (this.declareType[i] === 3) {
            c = '1'
          }
        }
        decHeadVo['twoStepFlag'] = a + b + c
        decHeadVo.seqNo = ''
        // 清除 预录入编号
        decHeadVo.preEntryId = ''
        decHeadVo.bossId = ''
        decHeadVo.clientSeqno = ''
        decHeadVo.dDate = ''
        decHeadVo.cusCiqNo = ''
        // 随附单据
        decHeadVo.decEdocRealations = []
        // 标记号码 标记唛码附件
        decHeadVo.decMarkLobs = []
        // 海关编号
        decHeadVo.entryId = ''
        // 清除所有的主键
        decHeadVo.decPid = ''
        decHeadVo.pid = ''
        decHeadVo.isExamine = ''
        decHeadVo.status = ''
        decHeadVo.statusValue = ''
        delete decHeadVo.dataSource
        delete decHeadVo.sysSource
        delete decHeadVo.feePid
        delete decHeadVo.expenseId
        delete decHeadVo.emailAddress
        delete decHeadVo.xmlStatus
        delete decHeadVo.xmlUrl
        // 清除 申报日期
        if (this.controller.iEFlag === 'E') {
          decHeadVo.iEDate = ''
        }
        let tableListC = util.simpleClone(this.$refs.decList.tableList)
        for (let i in tableListC) {
          tableListC[i].decListPid = ''
          tableListC[i].decPid = ''
        }
        let licenselistC = this.declareType.indexOf(1) !== -1 ? util.simpleClone(this.$refs.decDocuments.licenselist) : []
        for (let n in licenselistC) {
          licenselistC[n].pid = ''
          licenselistC[n].decPid = ''
        }
        let ContainerlistC = util.simpleClone(this.$refs.decContainer.tableDecContainerlist)
        for (let n in ContainerlistC) {
          ContainerlistC[n].pid = ''
          ContainerlistC[n].decPid = ''
        }
        let decVo = {
          decContainersVO: ContainerlistC,
          decHeadVO: decHeadVo,
          decLicensesVO: licenselistC,
          decListVO: tableListC
        }
        // 缓存数据
        window.localStorage.setItem('copyDec', JSON.stringify(decVo))
        let tabId = new Date().getTime()
        this.copyTabId = tabId
        // 重开页签
        if (this.controller.iEFlag === 'I' && this.controller.declTrnrel === '0') { // 进口报关单
          let url = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev'].HOST + '/declaration/summaryDec/declaration/add/new?type=copy'
          let timestamp = 'none-' + (new Date()).getTime()
          window.parent.postMessage({type: 'declaration', data: {url: url, title: '进口报关单(概要申报)', operationType: 'copy', id: timestamp, tabId: tabId}}, '*')
        } else if (this.controller.iEFlag === 'I' && this.controller.declTrnrel === '2') {
          let url = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev'].HOST + '/declaration/summaryDec/recordList/add/new?type=copy'
          let timestamp = 'none-' + (new Date()).getTime()
          window.parent.postMessage({type: 'declaration', data: {url: url, title: '进境备案清单(概要申报)', operationType: 'copy', id: timestamp, tabId: tabId}}, '*')
        }
      }
    },
    // 打印
    printDecHead () {
      if (util.isEmpty(this.controller.pid)) {
        this.messageTips('没有可打印的数据', 'error')
        return false
      }
      this.printCompnentParam = {
        'type': this.controller.declTrnrel,
        'pidList': [this.controller.pid],
        'userId': this.controller.userId,
        'pageType': 'summaryDec'
      }
      this.printCompnentVisible = true
    },
    // 关闭打印组件
    closePrintCompnent () {
      this.printCompnentVisible = false
    },
    // 删除
    delDecHead () {
      this.$confirm('确定删除选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        if (util.isEmpty(this.controller.pid)) {
          this.messageTips('没有可删除的数据', 'error')
          return false
        } else {
          this.$post({
            url: 'API@/dec-common/dec/ts/delTs',
            data: {
              'ids': [this.controller.pid]
            },
            success: (res) => {
              this.messageTips(res.message, 'success')
              // 刷新报关单
              this.addDecHead()
            },
            other: (res) => {
              this.messageTips(res.message, 'error')
            }
          })
        }
      }).catch(() => {
      })
    },
    // 发送  operType G 为发送到单一窗口暂存  C 为发送到单一窗口申报
    declareData (operType) {
      let tips = ''
      if (operType === 'G') {
        tips = '是否确认发送？'
      } else {
        tips = '是否确认申报？'
      }
      this.$confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO 先调用暂存
        // 校验
        this.$refs.decHead.saveDecHeadFieldVerify()
        let flag = this.$store.state[this.moduleName].headValidResult
        if (!flag) {
          return false
        }
        let param = {
          decContainersVO: this.$refs.decContainer.tableDecContainerlist,
          decLicensesVO: this.declareType.indexOf(1) !== -1 ? this.$refs.decDocuments.licenselist : [],
          decListVO: this.$refs.decList.tableList,
          operType: operType
        }
        this.$refs.decHead.sendDec(operType, param)
      }).catch(() => {
      })
    },
    // 获取报关单详情
    getDecDetail (pid) {
      this.$post({
        url: 'API@/dec-common/dec/ts/getDec',
        data: {
          seqNo: pid
        },
        success: (res) => {
          if (res.result) {
            // 表头
            let decHeadVO = res.result.decHeadVO
            this.declareType = []
            if (decHeadVO.twoStepFlag.split('')[0] === '1') {
              this.declareType.push(1)
            }
            if (decHeadVO.twoStepFlag.split('')[1] === '1') {
              this.declareType.push(2)
            }
            if (decHeadVO.twoStepFlag.split('')[2] === '1') {
              this.declareType.push(3)
            }
            this.$store.commit(this.moduleName + '/changeDecType', this.declareType)
            // 表头数据拆出来
            this.$refs.decHead.getHeadDetail(decHeadVO)
            // 表体
            this.$refs.decList.getBodyDetail(res.result.decListVO)
            // 集装箱
            this.$refs.decContainer.getContainersDetail(res.result.decContainersVO)
            // 随附单证
            this.$nextTick(() => {
              this.$refs.decDocuments.getDocumentsDetail(res.result.decLicensesVO)
            })
            // 概要申报 申报状态： 1概要暂存；2概要申报；3申报失败；4概要申报入库；6概要申报退单；7概要申报审结；12补充申报；8删单；11查验；9提货放行。
            // if (['1', '3', '6'].includes('1')) {
            //   operationType = 'edit'
            // }
            // if (this.$refs.decList.supplementFlag) {
            //   this.openSuppDec()
            // } else {
            // 当状态为审核驳回并且为编辑状态时。调用审核记录
            // if (this.switch['show_audit_log_in_reject_status'] && this.switch['show_audit_log_in_reject_status'] === 'Y' && decHeadVO.isExamine === '4' && this.controller.operationType === 'edit') {
            //   // 需要获取审核驳回时报关单的数据 以便对比是否修改 以便改变颜色
            //   let checkVo = res.result.decVerifyVO
            //   if (checkVo) {
            //     this.$refs.decHead.formatHeadCheckData(checkVo.decVerifyHeadVO, checkVo.headMap, this.$refs.decHead.decHead)
            //     this.$refs.decList.formatBodyCheckData(checkVo.decVerifyListVOs, checkVo.listMap, this.$refs.decList.tableList)
            //   }
            //   this.controller.showCheckTips = true
            // } else {
            //   this.controller.showCheckTips = false
            // }
            //   this.$refs.decHead.focusCustomMaster()
            // }
            // if (this.$refs.decHead.decHead.isExamine === '6') {
            //   this.feeEstimateState = false
            // }
          }
        }
      })
    },
    // 跳转到完整申报
    /**
     * 跳转 新增、详情、编辑
     * @param funFlag  功能页面 declaration 报关单   recordList 备案清单 decTemplate 初始值模板
     * @param flag  进出口标识
     * @param pid  报关单主键  可不传
     * @param operationType 操作   add 新增 look 查看  edit 编辑
     */
    goToDec () {
      let sysId = window.sessionStorage.getItem('sysId')
      let title = ''
      let funFlag = this.controller.funFlag
      let operationType = this.controller.operationType
      let decOperationType = 'look'
      if (operationType === 'look') {
        decOperationType = 'look'
      } else {
        decOperationType = 'edit'
      }
      let pid = this.controller.pid
      let url = config[process.env.NODE_ENV === 'production' ? 'prod' : 'dev'].HOST + '/declaration/' + funFlag + '/import/' + decOperationType + '/' + pid + '?summary=true'
      if (funFlag === 'declaration') {
        if (decOperationType === 'look') {
          title = '进口报关单(完整申报)'
        } else {
          title = '进口报关单(完整申报)'
        }
      }
      if (funFlag === 'recordList') {
        if (decOperationType === 'look') {
          title = '进境备案清单(完整申报)'
        } else {
          title = '进境备案清单(完整申报)'
        }
      }
      if (sysId === '002' || sysId === 'CCBA') {
        if (this.$route.query.type && this.$route.query.type === 'copy') {
          window.parent.postMessage({type: 'close', data: { tabId: this.copyTabId }}, '*')
        } else {
          window.parent.postMessage({type: 'close', data: { tabId: this.$route.query.tabId }}, '*')
        }
        let tabId = new Date().getTime()
        if (decOperationType === 'look') {
          tabId = 'look-' + pid
        } else if (decOperationType === 'edit') {
          tabId = 'edit-' + pid
        }
        if (sysId === '002') {
          window.parent.postMessage({type: funFlag, data: {url: url, operationType: decOperationType, id: pid, title: title, tabId: tabId}}, '*')
        } else {
          window.parent.postMessage({type: 'declaration', data: {url: url, operationType: decOperationType, id: pid, title: title, tabId: tabId}}, '*')
        }
      } else {
        this.$router.push({
          name: '报关单页面',
          params: {
            'funFlag': funFlag,
            'iEFlag': 'import',
            'operationType': decOperationType,
            'pid': pid
          },
          query: {
            summary: 'true'
          }
        })
      }
    },
    // 提交审核
    sumbitCheck () {
      let pidList = []
      if (util.isEmpty(this.$refs.decHead.decHead.status)) {
        this.messageTips('请先暂存数据')
        return
      }
      // 3 带审核   R 带复核 6 审核通过
      if (['3', 'R', '6'].includes(this.$refs.decHead.decHead.isExamine)) {
        this.messageTips('当前数据已是在审核状态')
        return
      }
      pidList.push(this.$refs.decHead.decHead.pid)
      // 发送请求
      this.$post({
        url: 'API@/dec-common/dec/ts/submitVerity',
        data: {
          'list': pidList
        },
        success: (res) => {
          this.messageTips(res.message, 'success')
          this.$refs.decHead.decHead.isExamine = 3
          this.controller.isDisabled = true
        },
        other: (res) => {
          this.$alert(res.message, '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '我知道了',
            type: 'warning',
            customClass: 'confirm-tips-warning',
            callback: action => {
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import '../decPage/common/decCss';
.sys-main{
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;
  margin-left:5px;
}
.borderBN{
  border-bottom: none !important;
}
.summary-tip{
  i{
    color: #f7ad2c;
    margin-right: 5px;
    margin-top: -1px;
    font-size: 16px;
    vertical-align:middle;
  }
  span{
    color: #ff4c4c;
  }
}
.summary-title{
  font-size: 14px;
  color: #096AC6;
  margin-bottom: 5px;
  font-weight: bold;
}
.completeBtn{
  background-color: #23C6C8;
}
</style>
