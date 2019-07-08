<template>
  <section class="sys-main">
    <!-- 基本信息 -->
    <div class="originInfo common">
      <el-row class="title">基本信息</el-row>
      <el-row class="form-items">
        <el-form label-width="0px" :model="sumitData" :rules="ruleForm" ref="sumitData" size="mini" label-position="right">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="报价名称" :label-width="labelFormWidth.five" prop="itemName">
                <el-input size="mini" clearable v-model="sumitData.itemName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报价含税" :label-width="labelFormWidth.five" prop="rateFlag">
                <el-select size="mini" clearable  v-model="sumitData.rateFlag" style="width:100%;">
                  <el-option key="1" :label="'含税'" :value="'1'"></el-option>
                  <el-option key="0" :label="'不含税'" :value="'0'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label-position="left" prop="singleFlag">
                <el-checkbox-group v-model="sumitData.singleFlag">
                  <el-checkbox label="美食/餐厅线上活动" true-label="1" false-label="0" name="singleFlag"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="委托企业" :label-width="labelFormWidth.five" prop="entrustCompanyName">
                <el-input size="mini" clearable v-model="sumitData.entrustCompanyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期" :label-width="labelFormWidth.five" prop="dates">
                <el-date-picker
                  style="width:100%"
                  v-model="dates"
                  type="daterange"
                  align="right"
                  format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div>
    <!-- 应收费用 -->
    <div class="acceptOffer common">
      <el-row class="title">应收费用</el-row>
      <el-row class="accept-body" v-for="(item1, index1) in fees_1" :key="'key' + index1">
        <span class="deleteBody"><img src="@/assets/img/delete_all.png" alt=""></span>
        <el-form label-width="0px" :model="item" size="mini" label-position="right">
          <!-- 第一行 -->
          <el-row :gutter="50" class="base-line">
            <el-col :span="6" class="padding_0">
              <el-form-item label="进/出境关别" label-width="85px">
                <el-input size="mini" clearable maxlength="80" v-model="item1.impexpPortcdNames"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申报地海关" label-width="85px">
                <el-input size="mini" clearable maxlength="80" v-model="item1.dclPlcCuscdNames"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出发地/港" label-width="85px">
                <el-input size="mini" clearable maxlength="80" v-model="item1.departure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-right:0px">
              <el-form-item label="目的地/港" label-width="85px">
                <el-input size="mini" clearable maxlength="80" v-model="item1.destination"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 进口 -->
          <el-row :gutter="50" class="margin_0 import">
            <el-row class="title-flag margin_0">进口</el-row>
            <el-row class="margin_0 ei-line" :gutter="8" v-for="(item2, index2) in feeOptions_I" :key="'indexI' + index2">
              <el-col :span="8" style="padding-left:0">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item2.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item2.feePrice" clearable placeholder="单价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item2.feeRate" clearable placeholder="税率"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item2.curr" clearable placeholder="币制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item2.unit" clearable placeholder="计费单位"></el-input>
                </el-form-item>
              </el-col>
              <!-- 删除图标 -->
              <span class="delete-icon" @click="delItems(index2,'I')">
                <img src="@/assets/img/delete.png" alt="">
              </span>
            </el-row>
            <el-row class="margin_0">
              <el-button class="addMore" @click="addFeeMore('I')">添加更多</el-button>
            </el-row>
          </el-row>
          <!-- 出口 -->
          <el-row :gutter="50" class="margin_0 export">
            <el-row class="title-flag margin_0">出口</el-row>
            <el-row class="margin_0 ei-line" :gutter="8" v-for="(item, index) in feeOptions_E" :key="'indexE' + index">
              <el-col :span="8" style="padding-left:0">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item.feePrice" clearable placeholder="单价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item.feeRate" clearable placeholder="税率"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item.curr" clearable placeholder="币制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" v-model="item.unit" clearable placeholder="计费单位"></el-input>
                </el-form-item>
              </el-col>
              <!-- 删除图标 -->
              <span class="delete-icon" @click="delItems(index,'E')">
                <img src="@/assets/img/delete.png" alt="">
              </span>
            </el-row>
            <el-row class="margin_0">
              <el-button class="addMore" @click="addFeeMore('E')">添加更多</el-button>
            </el-row>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <span class="moreOport" @click="addMorePort('1')">设置更多口岸</span>
      </el-row>
    </div>
    <!-- 应付费用 -->
    <div class="payOffer acceptOffer common">
      <el-row class="title">应付费用</el-row>
      <el-row class="accept-body">
        <span class="deleteBody"><img src="@/assets/img/delete_all.png" alt=""></span>
        <el-form label-width="0px" :model="QueryForm" size="mini" label-position="right">
          <!-- 第一行 -->
          <el-row :gutter="50" class="base-line">
            <el-col :span="6" class="padding_0">
              <el-form-item label="进/出境关别" label-width="85px">
                <el-input size="mini" clearable ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申报地海关" label-width="85px">
                <el-input size="mini" clearable ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出发地/港" label-width="85px">
                <el-input size="mini" clearable ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-right:0px">
              <el-form-item label="目的地/港" label-width="85px">
                <el-input size="mini" clearable ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 进口 -->
          <el-row :gutter="50" class="margin_0 import">
            <el-row class="title-flag margin_0">进口</el-row>
            <el-row class="margin_0 ei-line" :gutter="8">
              <el-col :span="8" style="padding-left:0">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="费用名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="单价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="税率"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="币制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="计费单位"></el-input>
                </el-form-item>
              </el-col>
              <!-- 删除图标 -->
              <span class="delete-icon">
                <img src="@/assets/img/delete.png" alt="">
              </span>
            </el-row>
            <el-row class="margin_0 ei-line" :gutter="8">
              <el-col :span="8" style="padding-left:0">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="费用名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="单价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="税率"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="币制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="计费单位"></el-input>
                </el-form-item>
              </el-col>
              <!-- 删除图标 -->
              <span class="delete-icon">
                <img src="@/assets/img/delete.png" alt="">
              </span>
            </el-row>
            <el-row class="margin_0">
              <el-button class="addMore">添加更多</el-button>
            </el-row>
          </el-row>
          <!-- 出口 -->
          <el-row :gutter="50" class="margin_0 export">
            <el-row class="title-flag margin_0">出口</el-row>
            <el-row class="margin_0 ei-line" :gutter="8">
              <el-col :span="8" style="padding-left:0">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="费用名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="单价"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="税率"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="币制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0">
                  <el-input size="mini" clearable placeholder="计费单位"></el-input>
                </el-form-item>
              </el-col>
              <span class="delete-icon">
                <img src="@/assets/img/delete.png" alt="">
              </span>
            </el-row>
            <el-row class="margin_0">
              <el-button class="addMore">添加更多</el-button>
            </el-row>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <span class="moreOport" @click="addMorePort('0')">设置更多口岸</span>
      </el-row>
    </div>
    <div class="submit">
      <el-row style="text-align:center">
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" >取消</el-button>
      </el-row>
    </div>
  </section>
</template>

<script>
import util from '@/common/util'
export default {
  data () {
    return {
      dates: '',
      sumitData: {
        startDate: '', // 有效期开始
        endDate: '', // 有效期结束
        entrustCompanyId: '',
        entrustCompanyName: '', // 委托企业名称
        itemName: '', // 报价名称
        quotationFees: [],
        rateFlag: '1', // 报价是否含税1含税，0不含税
        singleFlag: '0' // 是否项目独立报价1是0不是
      },
      // 应收应付模板
      templateFee: {
        dclPlcCuscd: '',
        dclPlcCuscdNames: '',
        departure: '',
        destination: '',
        feeFlag: '',
        impexpPortcd: '',
        impexpPortcdNames: '',
        quotationFeeId: '',
        quotationFeeOptions: [],
        quotationId: ''
      },
      fees_1: [{ // 应收
        dclPlcCuscd: '', // 申报地海关代码
        dclPlcCuscdNames: '',
        departure: '', // 出发地
        destination: '', // 目的地
        feeFlag: '1', // 应收1，应付0
        impexpPortcd: '', // 进出境关别代码
        impexpPortcdNames: '',
        quotationFeeId: '', // 报价应收应付主键
        quotationFeeOptions: [], // 报价应收应付费用
        quotationId: '' // 报价主键
      }],
      fees_0: [{ // 应付
        dclPlcCuscd: '', // 申报地海关代码
        dclPlcCuscdNames: '',
        departure: '', // 出发地
        destination: '', // 目的地
        feeFlag: '0', // 应收1，应付0
        impexpPortcd: '', // 进出境关别代码
        impexpPortcdNames: '',
        quotationFeeId: '', // 报价应收应付主键
        quotationFeeOptions: [], // 报价应收应付费用
        quotationId: '' // 报价主键
      }],
      // 报价应收应付费用模板
      templateOp: {
        curr: '',
        feeOptionName: '',
        feePrice: '',
        feeRate: '',
        iEFlag: '',
        quotationFeeId: '',
        quotationFeeOptionId: '',
        quotationId: '',
        unit: ''
      },
      feeOptions_I: [{ // 报价应收应付费用
        curr: '', // 币制
        feeOptionName: '', // 费用名称
        feePrice: '', // 单价
        feeRate: '', // 税率
        iEFlag: 'I', // 进出口标记
        quotationFeeId: '', // 报价应收应付主键
        quotationFeeOptionId: '', // 报价费用项主键
        quotationId: '', // 报价主键
        unit: '' // 计费单位
      }],
      feeOptions_E: [{ // 报价应收应付费用
        curr: '', // 币制
        feeOptionName: '', // 费用名称
        feePrice: '', // 单价
        feeRate: '', // 税率
        iEFlag: 'E', // 进出口标记
        quotationFeeId: '', // 报价应收应付主键
        quotationFeeOptionId: '', // 报价费用项主键
        quotationId: '', // 报价主键
        unit: '' // 计费单位
      }],
      ruleForm: {
        itemName: [
          {required: true, message: '请输入报价名称', trigger: 'blur'}
        ],
        entrustCompanyName: [
          {required: true, message: '请输入委托企业', trigger: 'blur'}
        ],
        rateFlag: [
          {required: true, message: '请选择是否含税', trigger: 'blur'}
        ],
        dates: [
          {required: true, message: '请选择有效期', trigger: 'blur'}
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [util.dateFormat(start, 'yyyy-MM-dd'), util.dateFormat(end, 'yyyy-MM-dd')])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [util.dateFormat(start, 'yyyy-MM-dd'), util.dateFormat(end, 'yyyy-MM-dd')])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [util.dateFormat(start, 'yyyy-MM-dd'), util.dateFormat(end, 'yyyy-MM-dd')])
          }
        }]
      }
    }
  },
  methods: {
    addFeeMore (flag) {
      this.templateOp.iEFlag = flag
      if (flag === 'I') {
        this.feeOptions_I.push(this.templateOp)
      } else {
        this.feeOptions_E.push(this.templateOp)
      }
    },
    // 添加更多口岸
    addMorePort (portFlag) {
      this.templateFee.feeFlag = portFlag
      if (portFlag === '1') {
        this.fees_1.push(this.templateFee)
      } else {
        this.fees_0.push(this.templateFee)
      }
    },
    delItems (index, flag) {
      if (flag === 'I') {
        this.feeOptions_I.splice(index, 1)
      } else {
        this.feeOptions_E.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .ei-line {
    padding-right: 16px;
  }
  .delete-icon img,
  .deleteBody img {
    display: block;
  }
  .deleteBody {
    cursor: pointer;
    position: absolute;
    right: -1px;
    top: -1px;
    width: 20px;
    height:20px;
  }
  .export .delete-icon ,
  .import .delete-icon {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 7px;
    width: 16px;
    height:16px;
    transform: translateX(50%)
  }
  .margin_0 {
    margin: 0!important;
    width: 100%;
  }
  .common {
    background-color: #fff;
    padding: 18px 18px 8px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      color: #4c4c4c;
      margin-bottom: 18px;
    }
  }
  .originInfo {
    .form-items {
      margin-left: 18px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 8px;
    }
  }
  .acceptOffer {
    .accept-body {
      &:nth-child(2) .deleteBody{
        display: none;
      }
      border: 1px solid #d8d8d8;
      padding: 18px;
      margin-bottom: 18px;
      .base-line {
        border-bottom: 1px solid #d8d8d8;
        margin: 0!important;
      }
      .padding_0 {
        padding-left:0!important;
      }
      .title-flag {
        margin: 15px 0!important;
        padding-left: 8px;
        border-left: 2px solid #287FCA;
      }
    }
    // Add_more
    .addMore {
      padding: 7px 10px 7px 28px;
      background: url("../../../../assets/img/Add_more.png") no-repeat;
      background-position: 10px 7px;
      background-color: #F3F6F6;
      color: #4c4c4c;
      &:hover {
        color: #4c4c4c;
        border-color: #DCDFE6;
      }
    }
    .moreOport {
      display: inline-block;
      color: #fff;
      border-radius: 4px;
      padding: 5px 18px;
      background-color: #2780CA;
      margin: 18px 0;
      cursor: pointer;
    }
    .import>.ei-line:nth-child(2) .delete-icon,
    .export>.ei-line:nth-child(2) .delete-icon{
      display: none;
    }
    .import,
    .export {
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        margin-bottom: 8px;
      }
    }
  }
</style>
