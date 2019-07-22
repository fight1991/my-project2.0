<template>
  <section class='sys-main expenseDetail'>
    <!-- 报关单详情区域 -->
    <div class="decDetail area">
      <div class="title">报关单/订单详情</div>
      <div class="content">
        <el-row class="line">
          <el-col :span="6">
            <div class="one-row">
              <div class="left">接单编号&nbsp;:</div>
              <div class="right">201965952522256</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="one-row">
              <div class="left">报关单号&nbsp;:</div>
              <div class="right">201965952522256</div>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>
    <!-- 应收费用区域 -->
    <div class="receive area">
      <div class="title">应收费用</div>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add"><i></i>新增</el-button>
        <!-- 使用报价选项 -->
        <el-dropdown trigger="click" @command="getOfferItems" placement="bottom-start">
          <el-button size="mini" class="list-btns list-icon-useOffer">
            <i class="other"></i>使用报价<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in billReceivableBodyVO.billQuotationRespVOs" :command="item" :key="item.quotationId">{{item.itemName+'-'+item.entrustCompanyName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <div class='query-table'>
        <el-table class='sys-table-table' :cell-class-name="optionsType==='edit' && getCellStyle" align="left" :data="billReceivableBodyVO.billReceivableBodyVOList" border>
          <el-table-column prop="serialNo" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="feeOptionName" label="费用名称">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-select size="mini" placeholder="请选择费用名称" clearable  v-model="scope.row.feeOptionName" style="width:100%;">
                  <el-option v-for="item in optionsList"
                    :key="item.feePid" :label="item.feeOptionName" :value="item.feeOptionName">
                  </el-option>
                </el-select>
              </div>
              <div class="cell-div" v-else>{{scope.row.feeOptionName || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="feePrice" label="计费单价" align="right">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-input v-model="scope.row.feePrice"></el-input>
              </div>
              <div class="cell-div" v-else>{{scope.row.feePrice || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="unit" width="120" label="计量单位">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-select  v-model="scope.row.unit" placeholder="计量单位"
                  filterable remote default-first-option
                  @focus="tipsFill('unitList','SAAS_SEA_UNIT')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in currList"
                    :key="item.codeField"
                    :label="item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </div>
              <div class="cell-div" v-else>{{scope.row.unit || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="curr" width="120" label="币制" align="center">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-select  v-model="scope.row.curr" placeholder="币制"
                  filterable remote default-first-option
                  @focus="tipsFill('currList','SAAS_CURR')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in currList"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </div>
              <div class="cell-div" v-else>{{scope.row.curr || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" width="100" label="数量" align="center">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-input v-model="scope.row.num"></el-input>
              </div>
              <div class="cell-div" v-else>{{scope.row.num || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="feeRate" width="100" label="税率" align="center">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-select size="mini" placeholder="税率" style="width:100%;">
                  <el-option key="0" :label="'0%'" :value="0"></el-option>
                  <el-option key="6" :label="'6%'" :value="6"></el-option>
                  <el-option key="11" :label="'11%'" :value="11"></el-option>
                </el-select>
              </div>
              <div class="cell-div" v-else>{{(scope.row.feeRate && scope.row.feeRate + '%') || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="taxPrice" width="80" label="含税总价" align="center">
            <template slot-scope="scope">
              <div class="cell-div">{{scope.row.taxPrice && (scope.row.taxPrice + '%') || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="settleCompanyName" min-width="120" label="结算企业" align="center">
            <template slot-scope="scope">
              <div class="table-select" v-if="optionsType === 'edit'">
                <el-input v-model="scope.row.settleCompanyName"></el-input>
              </div>
              <div class="cell-div" v-else>{{scope.row.settleCompanyName || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="billType" width="60" label="类型" align="center">
            <template slot-scope="scope">
              <div class="cell-div">
                {{scope.row.billType === '0' ? '自动登账' : scope.row.billType === '1' ? '手动登账' : '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" min-width="120" label="使用报价" align="center">
            <template slot-scope="scope">
              <div class="cell-div">{{scope.row.itemName || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createUserId" width="80" label="操作人" align="center">
            <template slot-scope="scope">
              <div class="cell-div">{{scope.row.createUserId || '-'}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 应付非同区域 -->
    <div class="pay area">
      <div class="title">应付费用</div>
      <el-table class='sys-table-table' align="left" :data="billPayableBodyVO.billPayableBodyVOList"></el-table>
    </div>
    <!-- 汇总区域 -->
    <div class="all area">
      <div class="title">汇总</div>
    </div>
  </section>
</template>
<script>
import util from '@/common/util'
import commonParam from '@/common/commonParam'
export default {
  data () {
    return {
      optionsType: 'look', // 记录当前操作类型
      billPayableBodyVO: { // 应付
        billQuotationRespVOs: [],
        billPayableBodyVOList: [] // 下拉列表
      },
      billReceivableBodyVO: { // 应收
        billQuotationRespVOs: [], // 下拉列表
        billReceivableBodyVOList: [] // 表格数据
      },
      decDetail: {}, // 报关单详情
      summarys: [], // 费用汇总
      optionsList: [], // 费用项列表
      currList: [], // 币制
      unitList: [], // 计量单位
      // 查询的字典字段
      tableNameList: {
        tableNames: [
          'SAAS_CURR', // 币制
          'SAAS_SEA_UNIT' // 计量单位
        ]
      }
    }
  },
  created () {
    let {type, expenseBillId} = this.$route.query
    expenseBillId && this.getBillDetail(expenseBillId)
    this.optionsType = type
    this.getOptionList()
    this.getCommonParam()
  },
  methods: {
    // 获取台账明细
    getBillDetail (id) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/bill/get',
        data: {
          expenseBillId: id
        },
        router: this.$router,
        success: ({result}) => {
          if (result && JSON.stringify(result) !== '{}') {
            let {billPayableBodyVO, billReceivableBodyVO, resultMap, summarys} = result
            this.billPayableBodyVO.billPayableBodyVOList = billPayableBodyVO.billPayableBodyVOList || []
            this.billPayableBodyVO.billQuotationRespVOs = billPayableBodyVO.billQuotationRespVOs || []
            this.billReceivableBodyVO.billReceivableBodyVOList = billReceivableBodyVO.billReceivableBodyVOList || []
            this.billReceivableBodyVO.billQuotationRespVOs = billReceivableBodyVO.billQuotationRespVOs || []
            this.decDetail = resultMap || {}
            this.summarys = summarys || []
          }
        }
      })
    },
    // 获取费用名称下拉列表
    getOptionList () {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/option/getAll',
        data: {},
        router: this.$router,
        success: ({result}) => {
          this.optionsList = result || []
        }
      })
    },
    // 判断缓存中是否有数据
    getCommonParam () {
      let map = {tableNames: []}
      map.tableNames = commonParam.isRequire(this.tableNameList.tableNames)
      if (map.tableNames.length > 0) {
        this.getCommonParams(map)
      }
    },
    // 获取公共字典list
    getCommonParams (datas) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: datas,
        router: this.$router,
        success: (res) => {
          commonParam.saveParams(res.result)
          // this.impexpPortList = JSON.parse(localStorage.getItem('SAAS_CUSTOMS_REL'))
          // this.dclPlcCusList = JSON.parse(localStorage.getItem('SAAS_CUSTOMS_REL'))
        }
      })
    },
    checkParamsList (query) {
      if (query !== '') {
        let keyValue = query.toString().trim()
        let list = JSON.parse(localStorage.getItem(this.selectObj.params))
        let filterList = []
        if (util.isEmpty(keyValue)) {
          this[this.selectObj.obj] = list.slice(0, 30)
        } else {
          filterList = list.filter(item => {
            let str = item.codeField + '-' + item.nameField
            return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
          })
          this[this.selectObj.obj] = filterList.slice(0, 30)
        }
      } else {
        if (!util.isEmpty(JSON.parse(localStorage.getItem(this.selectObj.params)))) {
          this[this.selectObj.obj] = JSON.parse(localStorage.getItem(this.selectObj.params)).slice(0, 30)
        }
      }
    },
    // 创建字典参数列表
    tipsFill (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    // 获取单元格样式
    getCellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 7 || columnIndex >= 9) {
        return 'cell-disable'
      }
    },
    // 获取基础报价
    getOfferItems (value) {
      console.log(value)
      // 查询报价应收/应付
      // this.getQuotationDetail()
    },
    getQuotationDetail (feeFlag, iEFlag, quotationId) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/bill/getQuotationDetail',
        data: {
          feeFlag, // 应收true，应付false
          iEFlag,
          quotationId
        },
        router: this.$router,
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .area {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 18px;
  }
  .title {
    padding-bottom: 18px;
  }
  .line {
    padding-bottom: 18px;
  }
  .one-row {
    width: 100%;
    display: flex;
    align-items: flex-start;
    color: #4c4c4c;
    .left {
      width: 85px;
    }
    .right {
      flex: 1;
    }
  }
  .table-btn {
    padding-bottom: 15px;
  }
  .cell-div {
    padding: 5px 12px;
    line-height: 30px;
  }
</style>
