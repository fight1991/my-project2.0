<template>
  <section class="sys-main finance">
    <div class="originInfo">
      <!-- 最顶部独立报价标识 -->
      <div class="topFlag flex" v-if="quotationDetail.quotationHeadVO.singleFlag">
        <img src="@/assets/img/Tips.png" alt="">
        <div class="text">项目独立报价</div>
      </div>
      <!-- 基本信息 -->
      <div class="baseInfo">
        <el-row class="title">基本信息</el-row>
        <el-row>
          <el-col :span="6">报价名称&nbsp;:&nbsp;{{quotationDetail.quotationHeadVO.itemName}}</el-col>
          <el-col :span="6">有效期&nbsp;:&nbsp;{{quotationDetail.quotationHeadVO.startDate + ' 至 ' + quotationDetail.quotationHeadVO.endDate}}</el-col>
          <el-col :span="6">报价含税&nbsp;:&nbsp;{{quotationDetail.quotationHeadVO.rateFlag ? '含税':'不含税'}}</el-col>
          <el-col :span="6">委托企业&nbsp;:&nbsp;{{quotationDetail.quotationHeadVO.entrustCompanyName}}</el-col>
        </el-row>
      </div>
      <!-- 应收费用 -->
      <div class="acceptOffer">
        <el-row class="title">应收费用</el-row>
        <el-row class="accept-body" v-for="item1 in quotationDetail.quotationReceivableBodyVOList" :key="item1.quotationFeeId">
          <div class="head">
            <el-row>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">进/出境关别&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.impexpPortcdNames}}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">申报地海关&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.dclPlcCuscdNames}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">出发地/港&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.departure}}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">目的地/港&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.destination}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="body">
            <el-row>
              <!-- 进口 -->
              <el-col :span="12">
                <div class="eiFlag">进口</div>
                <div class="table">
                  <el-table :data="item1.feeOptionImportVOs" style="width: 100%" :show-header="false">
                    <el-table-column prop="feeOptionName" label="费用名称"></el-table-column>
                    <el-table-column prop="feePrice" label="单价" align="right"></el-table-column>
                    <el-table-column prop="feeRate" label="税率" align="center"></el-table-column>
                    <el-table-column prop="curr" label="币制" align="center"></el-table-column>
                    <el-table-column prop="unit" label="计费单位"></el-table-column>
                  </el-table>
                </div>
              </el-col>
              <!-- 出口 -->
              <el-col :span="12">
                <div class="eiFlag" style="margin-left:18px">出口</div>
                <div class="table noborder">
                  <el-table :data="item1.feeOptionExportVOs" style="width: 100%" :show-header="false">
                    <el-table-column prop="feeOptionName" label="费用名称"></el-table-column>
                    <el-table-column prop="feePrice" label="单价" align="right"></el-table-column>
                    <el-table-column prop="feeRate" label="税率" align="center"></el-table-column>
                    <el-table-column prop="curr" label="币制" align="center"></el-table-column>
                    <el-table-column prop="unit" label="计费单位"></el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
      <!-- 应付费用 -->
      <div class="acceptOffer">
        <el-row class="title">应收费用</el-row>
        <el-row class="accept-body" v-for="item1 in quotationDetail.quotationPayableBodyVOList" :key="item1.quotationFeeId">
          <div class="head">
            <el-row>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">进/出境关别&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.impexpPortcdNames}}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">申报地海关&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.dclPlcCuscdNames}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">出发地/港&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.departure}}</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="one-row">
                  <div class="left">目的地/港&nbsp;:</div>
                  <div class="right">{{item1.quotationFeeVO.destination}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="body">
            <el-row>
              <!-- 进口 -->
              <el-col :span="12">
                <div class="eiFlag">进口</div>
                <div class="table">
                  <el-table :data="item1.feeOptionImportVOs" style="width: 100%" :show-header="false">
                    <el-table-column prop="feeOptionName" label="费用名称"></el-table-column>
                    <el-table-column prop="feePrice" label="单价" align="right"></el-table-column>
                    <el-table-column prop="feeRate" label="税率" align="center"></el-table-column>
                    <el-table-column prop="curr" label="币制" align="center"></el-table-column>
                    <el-table-column prop="unit" label="计费单位"></el-table-column>
                  </el-table>
                </div>
              </el-col>
              <!-- 出口 -->
              <el-col :span="12">
                <div class="eiFlag" style="margin-left:18px">出口</div>
                <div class="table noborder">
                  <el-table :data="item1.feeOptionExportVOs" style="width: 100%" :show-header="false">
                    <el-table-column prop="feeOptionName" label="费用名称"></el-table-column>
                    <el-table-column prop="feePrice" label="单价" align="right"></el-table-column>
                    <el-table-column prop="feeRate" label="税率" align="center"></el-table-column>
                    <el-table-column prop="curr" label="币制" align="center"></el-table-column>
                    <el-table-column prop="unit" label="计费单位"></el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      quotationDetail: { // 报价详情
        quotationHeadVO: {},
        quotationPayableBodyVOList: [],
        quotationReceivableBodyVOList: []
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.getFeesDetail(this.$route.query.quotationId)
  },
  methods: {
    // 获取报价详情
    getFeesDetail (id) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/quotation/get',
        data: {
          quotationId: id
        },
        router: this.$router,
        success: res => {
          this.quotationDetail = res.result || {}
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-col {
    color: #4c4c4c;
  }
  .one-row {
    width: 100%;
    display: flex;
    align-items: center;
    .left {
      width: 85px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .eiFlag {
    border-left: 2px solid #287FCA;
    margin: 12px 0 8px 0;
    padding-left: 10px;
    line-height: 13px;
  }
  .topFlag {
    padding-left: 18px;
    margin-bottom: 20px;
    height: 48px;
    box-sizing: border-box;
    border: 1px solid #ffc56b;
    background-color: #ffe9c7;
    img {
      display:block;
      margin-right: 8px;
    }
  }
  .baseInfo,
  .acceptOffer {
    background-color: #fff;
    padding: 18px 18px 8px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      color: #4c4c4c;
      margin-bottom: 18px;
    }
    .el-row {
      margin-left: 0!important;
      margin-right: 0!important;
    }
  }
  .baseInfo {
    padding: 18px;
    .el-row {
      .el-col:nth-child(1) {
        padding-left: 18px!important;
      }
    }
  }
  .acceptOffer {
    .el-row {
      .el-col:nth-child(1) {
        padding-left: 0!important;
      }
    }
  }
  .margin_0 {
    margin: 0!important;
    width: 100%;
  }
  .originInfo {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 15px;
    }
  }
  .acceptOffer {
    .accept-body {
      border: 1px solid #d8d8d8;
      padding: 18px;
      margin-bottom: 18px;
      .table {
        border-right: 1px solid #d8d8d8;
      }
      .noborder {
        border-right: none;
        padding-left: 18px;
      }
      .base-line {
        border-bottom: 1px solid #d8d8d8;
        margin: 0!important;
      }
      .padding_0 {
        padding-left:0!important;
      }
      .head {
        border-bottom: 1px solid #d8d8d8;
        .el-row {
          padding-bottom: 18px;
        }
      }
    }
  }
</style>
