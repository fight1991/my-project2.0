<template>
  <section class='sys-main accountDetail'>
    <div class="area" v-for="(item, index) in tableData.accountBillOptionVOs" :key="'index'+index">
      <el-row class="line up">
        <el-col :span="8">
          <div class="one-row">
            <div class="left">接单编号&nbsp;:</div>
            <div class="right">{{item.billNo || '-'}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="one-row">
            <div class="left">报关单号&nbsp;:</div>
            <div class="right">{{item.decNo || '-'}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="one-row">
            <div class="left">提单号&nbsp;:</div>
            <div class="right">{{item.orderNo || '-'}}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 列表表格开始 -->
      <div class='query-table'>
        <el-table class='sys-table-table' align="left"
          :data="item.billOptionsVOs" border ref="accountTable">
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="feeOptionName" label="费用名称" min-width="120">
          </el-table-column>
          <el-table-column prop="feePrice" label="计费单价" align="right" min-width="140">
          </el-table-column>
          <el-table-column prop="unitValue" width="80" label="计量单位" align="center">
            <template slot-scope="scope">
              {{scope.row.unitValue || '-'}}
            </template>
          </el-table-column>
          <el-table-column prop="curr" width="80" label="币制" align="center">
          </el-table-column>
          <el-table-column prop="num" width="100" label="数量" align="right">
            <template slot-scope="scope">
              {{typeof scope.row.num === 'number' ? scope.row.num : '-'}}
            </template>
          </el-table-column>
          <el-table-column prop="rate" width="80" label="税率" align="right">
            <template slot-scope="scope">
              {{typeof scope.row.rate === 'number' ? (scope.row.rate + '%') : '-'}}
            </template>
          </el-table-column>
          <el-table-column prop="taxPrice" width="100" label="含税总价" align="right">
          </el-table-column>
          <el-table-column prop="billType" width="100" label="类型" align="center">
            <template slot-scope="scope">
              {{scope.row.billType === 1 ? '手动登账' : '自动登账'}}
            </template>
          </el-table-column>
          <el-table-column prop="itemName" min-width="120" label="使用报价" align="left">
            <template slot-scope="scope">
              {{scope.row.itemName || '-'}}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceStatusValue" min-width="80" label="开票状态" align="center">
          </el-table-column>
          <el-table-column prop="flatStatusValue" min-width="80" label="平账状态" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="area">
      <div class="look" v-if="type === 'look'">
        <div class="one-row all">
          <div class="left">含税总金额&nbsp;:</div>
          <div class="right" v-if="tableData.amountVOs.length>0"><span class="money" v-for="(item2, index2) in tableData.amountVOs" :key="'item_2'+index2">{{(item2.curr || '-') +' '+ item2.price}}</span></div>
          <div class="right" v-if="tableData.amountVOs.length===0">{{'-'}}</div>
        </div>
        <div class="one-row all">
          <div class="left">已平账金额&nbsp;:</div>
          <div class="right" v-if="tableData.flatVOs.length>0"><span class="money" v-for="(item3, index3) in tableData.flatVOs" :key="'item_3'+index3">{{(item3.curr || '-') +' '+ item3.price}}</span></div>
          <div class="right" v-if="tableData.flatVOs.length===0">{{'-'}}</div>
        </div>
        <div class="one-row all">
          <div class="left">已开票金额&nbsp;:</div>
          <div class="right" v-if="tableData.flatVOs.length>0"><span class="money" v-for="(item4, index4) in tableData.invoiceVos" :key="'item_4'+index4">{{(item4.curr || '-') +' '+ item4.price}}</span></div>
          <div class="right" v-if="tableData.invoiceVos.length===0">{{'-'}}</div>
        </div>
      </div>
      <div class="check" v-else>
        <div class="one-row check">
          <div class="left">含税总金额&nbsp;:</div>
          <div class="taxPrice" v-if="tableData.amountVOs.length>0"><span class="money" v-for="(item2, index2) in tableData.amountVOs" :key="'item_2'+index2">{{(item2.curr || '-') +' '+ item2.price}}</span></div>
          <div class="taxPrice" v-if="tableData.amountVOs.length===0">{{'-'}}</div>
        </div>
      </div>
    </div>
    <div class="submit" v-if="type === 'check'">
      <el-row style="text-align:center">
        <el-button size="mini"  @click="accountCheck('rejects')">审核驳回</el-button>
        <el-button size="mini" type="primary" class="longButton"  @click="accountCheck('verifys')">审核通过</el-button>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        accountBillOptionVOs: [],
        amountVOs: [],
        flatVOs: [],
        invoiceVos: []
      },
      type: '' // 记录操作类型
    }
  },
  created () {
    let {type, accountBillId} = this.$route.query
    this.type = type
    this.getAccountDetail(accountBillId)
  },
  watch: {
    '$route.query': function () {
      this.type = this.$route.query.type
    }
  },
  methods: {
    // 获取账单详情
    getAccountDetail (accountBillId) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/account/get',
        data: {
          accountBillId
        },
        router: this.$router,
        success: ({result}) => {
          this.tableData = result || {}
        }
      })
    },
    // 批量审核驳回/确认
    accountCheck (type, verifyMsg = '') {
      let url = type === 'rejects' ? 'account/rejects' : 'account/verifys'
      this.$store.dispatch('ajax', {
        url: `API@saas-finance/${url}`,
        data: {
          accountBillIds: [this.$route.query.accountBillId],
          verifyMsg
        },
        router: this.$router,
        success: res => {}
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
    margin-bottom: 18px;
  }
  .one-row {
    width: 100%;
    display: flex;
    align-items: flex-end;
    color: #4c4c4c;
    &.check {
      justify-content: flex-end;
    }
    .left {
      width: 85px;
    }
    .right {
      flex: 1;
    }
    .taxPrice {
      max-width: calc(~"(100% - 85px)");
      span {
        color: #FF4300;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .one-row.all {
    padding-bottom: 10px;
  }
  .money {
    &:after {
      content:'+';
    }
    &:last-child:after{
      content:'';
    }
  }
</style>
