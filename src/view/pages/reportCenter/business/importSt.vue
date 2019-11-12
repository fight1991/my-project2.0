<template>
  <section class='sys-main'>
     <!-- 主显示框 -->
    <div class='content'>
      <div class='regist-panel mg-b-18'>
        <el-form :label-width="labelFormWidth.six">
          <el-row class='sys-search' :gutter="50">
            <!-- 查询条件 -->
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="报关单类型">
                <el-select v-model="QueryForm.declTrnrel" filterable>
                  <el-option key="0+'declTrnrel'" label="报关单" value="0"></el-option>
                  <el-option key="2+'declTrnrel'" label="备案清单" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="委托客户">
                <el-select v-model="QueryForm.ref3" filterable>
                  <el-option
                    v-for="(item,cindex) in entrusters"
                    :key="item.value +'corps' + cindex"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="境内收发货人">
                <el-select v-model="QueryForm.tradeCoScc" filterable clearable @change="getGoods()">
                  <el-option
                    v-for="(item,cindex) in corps"
                    :key="item.value +'corps' + cindex"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="商品名称">
                <el-select clearable v-model="QueryForm.hsCodes" collapse-tags filterable multiple :multiple-limit='5'>
                  <el-option
                    v-for="(item,index) in goods"
                    :key="item.code +'goods' + index"
                    :label="item.code+'-'+item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="申报地海关">
                <el-select v-model="QueryForm.customMaster" filterable clearable>
                  <el-option
                    v-for="item in cusCustomsCodeList"
                    :key="item.codeField"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="运输方式">
                <el-select clearable filterable v-model="QueryForm.trafMode">
                  <el-option
                    v-for="item in trans"
                    :key="item.codeField +'trans'"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="监管方式">
                <el-select clearable filterable v-model="QueryForm.tradeMode">
                  <el-option
                    v-for="item in vies"
                    :key="item.codeField +'vies'"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="6">
              <el-form-item size="mini" label="状态">
                <el-select v-model="QueryForm.status" filterable>
                  <el-option key="1+'status'" label="已申报" value="1"></el-option>
                  <el-option key="10+'status'" label="结关" value="10"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='sys-search' :gutter="50">
            <el-col :md="12" :lg="12">
              <el-form-item size="mini" label="申报日期">
                <el-date-picker  v-model="dates" style="width:100%;"
                  @change="search()"
                  type="daterange"
                  :clearable='false'
                  :editable='false'
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center;">
            <el-button size="mini" type="primary"  @click="search()">统计</el-button>
          </el-row>
        </el-form>
      </div>
      <!-- 查询条件 end-->
      <!-- 列表 list -->
      <div class='regist-panel mg-b-18'>
        <el-row class='mg-b-18'>
          <el-dropdown>
            <el-button size="mini">导出Excel</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click.stop="getexcel">生成文件</div></el-dropdown-item>
              <el-dropdown-item><div @click.stop="download">下载文件</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="airvehicle-list-drop" style="float:right;">
            <el-popover popper-class="airvehicle-table-popper">
              <ul style="width: 250px;">
                <li v-for="(item,index) in thList" :key="index" style="width: 50%;float:left;">
                  <el-checkbox size="mini" v-model="item.value" @change="columnFieldChange">{{item.fieldName}}</el-checkbox>
                </li>
              </ul>
              <el-button size="mini" class="list-btns list-btn-drop" icon="list-icon-dropdown" slot="reference"></el-button>
            </el-popover>
          </div>
        </el-row>
        <el-row class='mg-b-30'>
          <div class='mg-lr-30 dec-query-table'>
            <el-table class='sys-table-table dec-table' :data="resultList" border highlight-current-row size="mini" height="450px">
              <el-table-column label="接单编号" min-width="130" prop="bossId" v-if="thList[0].value"></el-table-column>
              <el-table-column label="委托客户" min-width="210" prop="company" v-if="thList[1].value"></el-table-column>
              <el-table-column label="客户业务号" min-width="120" prop="ref1" v-if="thList[2].value"></el-table-column>
              <el-table-column label="海关编号" min-width="160" prop="entryId" v-if="thList[3].value"></el-table-column>
              <el-table-column label="境内收发货人" min-width="210" prop="tradeName" v-if="thList[4].value"></el-table-column>
              <el-table-column label="申报地海关" min-width="100" prop="customMasterValue" v-if="thList[5].value"></el-table-column>
              <el-table-column label="申报日期" min-width="100" prop="dDate" v-if="thList[6].value"></el-table-column>
              <el-table-column label="进境关别" min-width="160" prop="iEPortValue" v-if="thList[7].value"></el-table-column>
              <el-table-column label="备案号" min-width="130" prop="manualNo" v-if="thList[8].value"></el-table-column>
              <el-table-column label="商品项数" min-width="90" v-if="thList[9].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.goodsNum}}</div>
                </template>
              </el-table-column>
              <el-table-column label="总提运单号" min-width="205" prop="billNo" v-if="thList[10].value"></el-table-column>
              <el-table-column label="分提运单号" min-width="120" prop="spliBillNo" v-if="thList[11].value"></el-table-column>
              <el-table-column label="运输方式" min-width="120" prop="trafModeValue" v-if="thList[12].value"></el-table-column>
              <el-table-column label="运输工具名称" min-width="120" prop="trafName" v-if="thList[13].value"></el-table-column>
              <el-table-column label="航次号" min-width="120" prop="voyageNo" v-if="thList[14].value"></el-table-column>
              <el-table-column label="监管方式" min-width="100" prop='tradeModeValue' v-if="thList[15].value"></el-table-column>
              <el-table-column label="运费标志" min-width="100" prop='feeMarkValue' v-if="thList[16].value"></el-table-column>
              <el-table-column label="运费" min-width="100" prop='feeRate' v-if="thList[17].value"></el-table-column>
              <el-table-column label="运费币制" min-width="100" prop='feeCurrValue' v-if="thList[18].value"></el-table-column>
              <el-table-column label="保费标志" min-width="100" prop='insurMarkValue' v-if="thList[19].value"></el-table-column>
              <el-table-column label="保费" min-width="100" prop='insurRate' v-if="thList[20].value"></el-table-column>
              <el-table-column label="保费币制" min-width="100" prop='insurCurrValue' v-if="thList[21].value"></el-table-column>
              <el-table-column label="杂费标志" min-width="100" prop='otherMarkValue' v-if="thList[22].value"></el-table-column>
              <el-table-column label="杂费" min-width="100" prop='otherRate' v-if="thList[23].value"></el-table-column>
              <el-table-column label="杂费币制" min-width="100" prop='otherCurrValue' v-if="thList[24].value"></el-table-column>
              <el-table-column label="成交方式" min-width="100" prop="transModeValue" v-if="thList[25].value"></el-table-column>
              <el-table-column label="件数" min-width="90" v-if="thList[26].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.packNo}}</div>
                </template>
              </el-table-column>
              <el-table-column label="毛重(KG)" min-width="100" v-if="thList[27].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.grossWt}}</div>
                </template>
              </el-table-column>
              <el-table-column label="净重(KG)" min-width="100" v-if="thList[28].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.netWt}}</div>
                </template>
              </el-table-column>
              <el-table-column label="备案序号" min-width="130" prop="contrItem" v-if="thList[29].value"></el-table-column>
              <el-table-column label="商品名称" min-width="150" prop="gName" v-if="thList[30].value"></el-table-column>
              <el-table-column label="成交数量" min-width="100" v-if="thList[31].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.gQty}}</div>
                </template>
              </el-table-column>
              <el-table-column label="成交计量单位" min-width="100" v-if="thList[32].value">
                <template slot-scope="scope">
                  <div class='sys-td-c'>{{scope.row.gUnitValue}}</div>
                </template>
              </el-table-column>
              <el-table-column label="价值" min-width="100" v-if="thList[33].value">
                <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.declTotal}}</div>
                </template>
              </el-table-column>
              <el-table-column label="币制" min-width="100" prop="tradeCurrValue" v-if="thList[34].value"></el-table-column>
              <el-table-column label="美元价值" min-width="100" v-if="thList[35].value">
                 <template slot-scope="scope">
                  <div class='sys-td-r'>{{scope.row.usDeclTotal}}</div>
                </template>
              </el-table-column>
            </el-table>
            <!--分页-->
            <el-row class='sys-page-list'>
              <el-col :span="24" align="right">
                <page-box @change="getTableData()" :pagination.sync='paginationInit' key="importSt"></page-box>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </div>
    <!-- 主显示框 end-->
    <!-- 下载弹窗 -->
    <el-dialog title="下载报表" :close-on-click-modal="false" :append-to-body="true" class="set-dialog" :visible.sync="downloadVisable" width="40%" :before-close="handleClose">
      <download-detail iEFlag="I" v-if="downloadVisable"></download-detail>
    </el-dialog>
    <!-- 下载弹窗 end -->
  </section>
</template>
<script>
import util from '../../../../common/util'
import downloadDetail from './downloadDetail.vue'
export default {
  components: {
    downloadDetail
  },
  data () {
    return {
      // 存放查询检索表单数据
      dates: ['', ''],
      goods: [], // 物料
      corps: [], // 公司
      trans: [], // 运输方式
      vies: [], // 监管方式
      selectGoodsName: [],
      QueryForm: {
        declTrnrel: '0',
        dateFlag: 'DAY',
        startDate: '',
        endDate: '',
        hsCodes: [], // 商品编码
        iEFlag: 'I',
        graininess: 1,
        tradeCoScc: '',
        trafMode: '', // 运输方式
        tradeMode: '', // 监管方式
        customMaster: '', // 申报地海关
        status: '1'
      },
      graininess: [
        {
          label: '月',
          value: 2
        },
        {
          label: '日',
          value: 1
        }, {
          label: '周',
          value: 0
        }],
      entrusters: [],
      dateConfig: '30',
      chartType: '1',
      resultChartData: {},
      resetChartData: '',
      resultList: [], // 存放列表数据
      tableNameList: {
        tableNames: [
          'SAAS_CUSTOMS_REL' // 海关关区
        ]
      }, // 字典标明
      cusCustomsCodeList: [],
      thList: [{
        value: true,
        fieldName: '接单编号',
        fieldCode: 'bossId'
      }, {
        value: true,
        fieldName: '委托客户',
        fieldCode: 'company'
      }, {
        value: true,
        fieldName: '客户业务号',
        fieldCode: 'ref1'
      }, {
        value: true,
        fieldName: '海关编号',
        fieldCode: 'entryId'
      }, {
        value: true,
        fieldName: '境内收发货人',
        fieldCode: 'tradeName'
      }, {
        value: true,
        fieldName: '申报地海关',
        fieldCode: 'customMasterValue'
      }, {
        value: true,
        fieldName: '申报日期',
        fieldCode: 'dDate'
      }, {
        value: true,
        fieldName: '出境关别',
        fieldCode: 'iEPortValue'
      }, {
        value: true,
        fieldName: '备案号',
        fieldCode: 'manualNo'
      }, {
        value: true,
        fieldName: '商品项数',
        fieldCode: 'goodsNum'
      }, {
        value: true,
        fieldName: '总提运单号',
        fieldCode: 'billNo'
      }, {
        value: true,
        fieldName: '分提运单号',
        fieldCode: 'spliBillNo'
      }, {
        value: true,
        fieldName: '运输方式',
        fieldCode: 'trafModeValue'
      }, {
        value: true,
        fieldName: '运输工具名称',
        fieldCode: 'trafName'
      }, {
        value: true,
        fieldName: '航次号',
        fieldCode: 'voyageNo'
      }, {
        value: true,
        fieldName: '监管方式',
        fieldCode: 'tradeModeValue'
      }, {
        value: true,
        fieldName: '运费标志',
        fieldCode: 'feeMarkValue'
      }, {
        value: true,
        fieldName: '运费',
        fieldCode: 'feeRate'
      }, {
        value: true,
        fieldName: '运费币制',
        fieldCode: 'feeCurrValue'
      }, {
        value: true,
        fieldName: '保费标志',
        fieldCode: 'insurMarkValue'
      }, {
        value: true,
        fieldName: '保费',
        fieldCode: 'insurRate'
      }, {
        value: true,
        fieldName: '保费币制',
        fieldCode: 'insurCurrValue'
      }, {
        value: true,
        fieldName: '杂费标志',
        fieldCode: 'otherMarkValue'
      }, {
        value: true,
        fieldName: '杂费',
        fieldCode: 'otherRate'
      }, {
        value: true,
        fieldName: '杂费币制',
        fieldCode: 'otherCurrValue'
      }, {
        value: true,
        fieldName: '成交方式',
        fieldCode: 'transModeValue'
      }, {
        value: true,
        fieldName: '件数',
        fieldCode: 'packNo'
      }, {
        value: true,
        fieldName: '毛重(KG)',
        fieldCode: 'grossWt'
      }, {
        value: true,
        fieldName: '净重(KG)',
        fieldCode: 'netWt'
      }, {
        value: true,
        fieldName: '备案序号',
        fieldCode: 'contrItem'
      }, {
        value: true,
        fieldName: '商品名称',
        fieldCode: 'gName'
      }, {
        value: true,
        fieldName: '成交数量',
        fieldCode: 'gQty'
      }, {
        value: true,
        fieldName: '成交计量单位',
        fieldCode: 'gUnitValue'
      }, {
        value: true,
        fieldName: '价值',
        fieldCode: 'declTotal'
      }, {
        value: true,
        fieldName: '币制',
        fieldCode: 'tradeCurrValue'
      }, {
        value: true,
        fieldName: '美元价值',
        fieldCode: 'usDeclTotal'
      }], // 表头字段
      userId: '', // 用户id
      downloadVisable: false // 下载进度弹窗
    }
  },
  created () {
    this.dates = [util.getNdayDate(new Date(), -29), new Date()]
    this.getCommonParam()
    this.queryUserInfo()
    this.getEntrus()
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.resetChartData = Math.random()
      })()
    }
    this.doInit()
  },
  methods: {
    // 获取委托客户
    getEntrus () {
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/dec/decReport/getEntrusters',
        data: 'I',
        isPageList: false,
        router: this.$router,
        success: (res) => {
          this.entrusters = res.result
        }
      })
    },
    getDataFromStorage () {
      this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL'))
    },
    // 判断缓存中是否有数据
    getCommonParam () {
      let par = this.tableNameList.tableNames
      this.$store.dispatch('ajax', {
        useStorage: true,
        storageKey: par,
        hasStorageCallback: () => {
          this.getDataFromStorage()
        },
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: {
          'tableNames': par
        },
        router: this.$router,
        success: (res) => {
          this.getDataFromStorage()
        }
      })
    },
    // 导出excel
    getexcel () {
      if (this.dates === '' || this.dates === null) {
        this.QueryForm.startDate = ''
        this.QueryForm.endDate = ''
      } else {
        this.QueryForm.startDate = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.QueryForm.endDate = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      let thList = []
      let theadList = util.simpleClone(this.thList)
      theadList.forEach(e => {
        if (e.value) {
          delete e.value
          thList.push(e)
        }
      })
      // if (this.QueryForm.hsCodes.length === 0) {
      //   this.$message({
      //     message: '请至少选择一个物料',
      //     type: 'warning'
      //   })
      //   return
      // }
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/exportDecIntegratedCount',
        data: {decIntegratedCountConditionVO: {...this.QueryForm, page: this.paginationInit}, exportFieldVOs: thList},
        isPageList: false,
        router: this.$router,
        success: (res) => {
          // if (util.isEmpty(res.result)) {
          //   this.$message({
          //     message: '该查询条件下没有可导出的数据',
          //     type: 'warning'
          //   })
          // } else {
          this.$confirm('报表文件生成中，请点击下载报表按钮查看进度。', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          })
          // }
        }
      })
    },
    // 获取公共字典list
    getTrade () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: {tableNames: [
          'SAAS_TRANSPORT_TYPE', // 运输方式
          'SAAS_TRADE' // 监管方式
        ]},
        router: this.$router,
        success: (res) => {
          this.vies = res.result.SAAS_TRADE
          this.trans = res.result.SAAS_TRANSPORT_TYPE
        }
      })
    },
    // 获取物料
    getGoods () {
      this.goods = []
      this.QueryForm.hsCodes = []
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/getGoods',
        data: this.QueryForm.tradeCoScc,
        router: this.$router,
        success: (res) => {
          for (let a = 0; a < res.result.length; a++) {
            if (res.result[a]) {
              this.goods.push(res.result[a])
            }
          }
        }
      })
    },
    // 获取公司
    getCorp () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/getTradeCos',
        data: '',
        router: this.$router,
        success: (res) => {
          this.corps = res.result
          // if (res.result.length > 0) {
          //   this.QueryForm.tradeCoScc = res.result[0].code
          // } else {
          //   this.$message({
          //     message: '暂无公司',
          //     type: 'warning'
          //   })
          // }
          // this.getGoods()
        }
      })
    },
    doInit () {
      this.getCorp()
      this.getTrade()
    },
    search () {
      this.getTableData(this.$store.state.pagination)
    },
    // 获取表格数据
    getTableData (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.QueryForm.startDate = ''
        this.QueryForm.endDate = ''
      } else {
        this.QueryForm.startDate = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.QueryForm.endDate = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      // if (this.QueryForm.hsCodes.length === 0) {
      //   this.$message({
      //     message: '请至少选择一个物料',
      //     type: 'warning'
      //   })
      //   return
      // }
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/decIntegratedCount',
        data: {...this.QueryForm, page: pagination || this.paginationInit},
        isPageList: true,
        router: this.$router,
        success: (res) => {
          this.paginationInit = res.page
          if (!util.isEmpty(res.result)) {
            this.exportExcel = true
          }
          this.resultList = util.isEmpty(res.result) ? [] : res.result
        }
      })
    },
    // 日期切换
    datesChange (value) {
      let days = -(parseInt(value) - 1)
      this.dates = [util.getNdayDate(new Date(), days), new Date()]
    },
    // 查询当前登录人信息
    queryUserInfo () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/login/getLoginUserInfo',
        data: {},
        router: this.$router,
        success: (res) => {
          this.userId = res.result.userId
          if (!util.isEmpty(this.userId)) {
            let fieldList = window.localStorage.getItem('IMPORT_ST' + this.userId)
            if (!util.isEmpty(fieldList)) { // 如果表头显示有记录，用记录的表头显示
              this.thList = JSON.parse(fieldList)
            }
          }
        }
      })
    },
    // 调节 查询table表 表头显示字段
    columnFieldChange (value) {
      // 每次表头列表变化都需要把当前需要显示的字段 存到localStorage里 下次按现在的显示
      window.localStorage.setItem('IMPORT_ST' + this.userId, JSON.stringify(this.thList))
    },
    // 下载文件
    download () {
      this.downloadVisable = true
    },
    // 关闭弹窗
    handleClose () {
      this.downloadVisable = false
    }
  }
}
</script>
<style scoped lang="less">
.sys-main{
  // position: absolute;
  height: calc(100% - 40px);
  // width: 100%;
  overflow: auto;
  padding: 20px;
}
.regist-panel{
  padding: 20px;
  background-color: #fff;
}
.temperature-div-s {
  float: right;
}
.mg-b-18{
  margin-bottom: 18px;
}
.dec-query-table .el-table--mini {
  font-size: 14px;
}
.sys-main /deep/.el-form-item__label {
  text-align: left !important;
}
@media only screen and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  .sys-fr{
    float: none;
  }
}
</style>
