<template>
  <section class='sys-main expenseDetail'>
    <!-- 发票类型区域 -->
    <div class="area">
      <div class="title">发票类型:增值税普通发票</div>
      <el-table class='sys-table-table' align="left"
        :data="accountBillTableList" border highlight-current-row>
        <el-table-column type="index" width="50" label="序号" align="center">
        </el-table-column>
        <el-table-column label="账单企业" min-width="160" prop="settleCompanyName">
        </el-table-column>
        <el-table-column label="接单编号" min-width="140" prop="orderNo">
          <template slot-scope="scope">
            {{scope.row.orderNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="报关单号" min-width="180" prop="decNo">
          <template slot-scope="scope">
            {{scope.row.decNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="提单号" min-width="150" prop="billNo">
          <template slot-scope="scope">
            {{scope.row.billNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="费用项" min-width="100" prop="feeOptionName">
        </el-table-column>
        <el-table-column label="币制" min-width="100" prop="curr" align="right">
        </el-table-column>
        <el-table-column label="金额" min-width="100" prop="taxPrice" align="right">
          <template slot-scope="scope">
            {{scope.row.taxPrice && scope.row.taxPrice.toLocaleString() || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="委托企业" min-width="100" prop="entrustCompanyName">
          <template slot-scope="scope">
            {{scope.row.entrustCompanyName || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="开航/放行日" min-width="100" prop="sailDay" align="center">
          <template slot-scope="scope">
            {{scope.row.entrustCompanyName || '-'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 发票拆分区域 -->
    <div class="receive area">
      <div class="title">请注意:当前开票金二已超过100000元,系统将自动进行拆分开票操作</div>
      <el-row class="table-btn" v-if="optionsType === 'edit'">
        <el-button size="mini" class="list-btns list-icon-add"><i></i>新增</el-button>
      </el-row>
      <div class='query-table-finance'>
        <el-form :show-message="false">
          <el-table class='sys-table-table' :cell-class-name="(optionsType==='edit' && getCellStyle) || ''" align="left" :data="invoiceOptionTableList" border>
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="feeType" label="费用分类" min-width="120">
              <template slot-scope="scope">
                <div class="table-select" v-if="optionsType === 'edit'">
                  <el-select size="mini" placeholder="请选择费用名称" clearable  v-model="scope.row.feeType" style="width:100%;" @change="getRate(scope.row)">
                    <el-option key='1' label="代理费用" :value="'1'"></el-option>
                    <el-option key='2' label="运输费用" :value="'2'"></el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.feeTypeValue || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="feePrice" label="不含税金额" align="right" min-width="100">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit'">
                  <el-form-item>
                    <el-input clearable v-model="scope.row.feePrice"></el-input>
                  </el-form-item>
                </div>
                <div class="cell-div" v-else>{{scope.row.feePrice || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rate" width="80" label="税率" align="right">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit'">
                  <el-select size="mini" placeholder="税率" style="width:100%;" v-model="scope.row.rate">
                    <el-option key="0" :label="'0%'" :value="0"></el-option>
                    <el-option key="6" :label="'6%'" :value="6"></el-option>
                    <el-option key="9" :label="'9%'" :value="9"></el-option>
                    <el-option key="13" :label="'13%'" :value="13"></el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{typeof scope.row.rate === 'number' ? (scope.row.rate + '%') : '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="taxPrice" label="含税总额" align="right" min-width="100">
              <template slot-scope="scope">
                <div class="cell-div" >{{scope.row.taxPrice || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceNum" label="发票号" align="right" min-width="100">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit'">
                  <el-form-item>
                    <el-input clearable v-model="scope.row.invoiceNum"></el-input>
                  </el-form-item>
                </div>
                <div class="cell-div" v-else>{{scope.row.invoiceNum || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="60" align="center" v-if="optionsType === 'edit'">
              <template slot-scope="scope">
                <div class="sys-td-c">
                  <el-button title="删除" type="text" class="table-icon list-icon-delete"><i></i></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <div class="submit" v-if="optionsType === 'edit'">
      <el-row style="text-align:center">
        <el-button size="mini" type="primary" @click="submitBtn">提交</el-button>
        <el-button size="mini"  @click="cancelEdit">取消</el-button>
      </el-row>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      optionsType: '',
      accountBillTableList: [],
      invoiceOptionTableList: [],
      invoiceTypeValue: '',
      invoiceType: '',
      invoiceTemplate: {
        feePrice: '',
        feeType: '',
        feeTypeValue: '',
        invoiceNum: '',
        rate: '',
        taxPrice: ''
      }
    }
  },
  created () {
    let {type, invoiceId} = this.$route.query
    this.optionsType = type
    this.getInvoiceDetail(invoiceId)
  },
  watch: {},
  methods: {
    // 查看详情
    getInvoiceDetail (id) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/invoice/get',
        data: {
          invoiceId: id
        },
        router: this.$router,
        success: ({result}) => {
          let {accountBillVOs, invoiceOptionVOs, invoiceType, invoiceTypeValue} = result
          this.accountBillTableList = accountBillVOs || []
          this.invoiceOptionTableList = invoiceOptionVOs || []
          this.invoiceTypeValue = invoiceTypeValue
          this.invoiceType = invoiceType
        }
      })
    },
    // 提交
    submitBtn () {},
    // 取消
    cancelEdit () {},
    // 获取单元格样式
    getCellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 7 || (columnIndex >= 9 && columnIndex < 12)) {
        return 'cell-disable'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .content {
    color: #4c4c4c;
    padding: 0 18px;
    .down {
      padding-top: 18px;
    }
  }
  .flex {
    display: flex;
  }
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .block {
    width: 25%;
    padding-bottom: 18px;
    .left {
      width: 100px;
    }
    .right {
      padding-right: 20px;
      flex: 1;
      word-break:break-all;
    }
    &:nth-child(4n) .right {
      padding-right: 0;
    }
  }
  .companyItems {
    padding: 5px 18px;
    background-color: #F4F8FC;
    margin-bottom: 8px;
    .pull-right {
      text-align: right;
      // display: flex;
      justify-content: flex-end;
      .right {
        float: right;
        // flex:1;
        word-break:break-all;
        max-width: calc(~"(100% - 60px)")
      }
      .left {
        float: right;
        width: 60px;
        line-height: 38px;
      }
    }
    .el-col {
      height: 100%;
      line-height: 36px;
    }
    .company {
      color: #4c4c4c;
      font-weight: bold;
    }
    .receive,.pay {
      font-weight: bold;
      font-size: 20px;
      &:after {
        content:'+';
      }
    }
    .receive {
      color: #53B246;
      &:last-child:after{
        content:'';
      }
    }
    .pay {
      color:#FE4400;
      &:last-child:after{
        content:'';
      }
    }
  }
  .area {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 18px;
  }
  .decDetail {
    padding-bottom: 0;
  }
  .title {
    padding-bottom: 18px;
  }
  .line {
    padding-bottom: 18px;
    border-bottom: 1px solid #eee;
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
  .normal {
    padding-bottom: 18px;
    padding-top: 18px;
    border-top: 1px solid #eee;
    .left {
      width: 100px;
    }
    .red {
      color:#FE4400;
      font-size: 14px;
    }
  }
  .table-btn {
    padding-bottom: 15px;
  }
  .cell-div {
    padding: 5px 12px;
    line-height: 30px;
  }
  .cell-div.last-column {
    position: relative;
    .del-icon {
      cursor: pointer;
      img {
        display: block;
        margin: 0 auto;
      }
    }
  }
  .table-btn,.query-table-finance {
    padding-left: 4px;
  }
</style>
