<template>
  <section class="sys-main">
    <div class="originInfo">
      <el-row class="form-items">
        <el-form label-width="0px" :model="submitData" :rules="ruleForm" ref="submitData" size="mini" label-position="right">
          <!-- 基本信息 -->
          <div class="baseInfo">
            <el-row class="title">基本信息</el-row>
            <el-row :gutter="50">
              <el-col :span="8">
                <el-form-item label="报价名称" :label-width="labelFormWidth.five" prop="itemName">
                  <el-input size="mini" clearable v-model="submitData.itemName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报价含税" :label-width="labelFormWidth.five" prop="rateFlag">
                  <el-select size="mini" clearable  v-model="submitData.rateFlag" style="width:100%;">
                    <el-option key="1" :label="'含税'" :value="'1'"></el-option>
                    <el-option key="0" :label="'不含税'" :value="'0'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label-position="left" prop="singleFlag">
                  <el-checkbox-group v-model="submitData.singleFlag">
                    <el-checkbox label="美食/餐厅线上活动" true-label="1" false-label="0" name="singleFlag"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="8">
                <el-form-item label="委托企业" :label-width="labelFormWidth.five" prop="entrustCompanyName">
                  <el-select v-model="submitData.entrustCompanyName" maxlength="30" style="width:100%"
                    filterable remote clearable @change="translatecorp"
                    :remote-method="getcorps"
                    allow-create
                    default-first-option >
                    <el-option
                      v-for="item in corpList"
                      :key="item.corpId"
                      :label="item.corpName"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期" :label-width="labelFormWidth.five" prop="dates">
                  <el-date-picker
                    style="width:100%"
                    v-model="submitData.dates"
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
          </div>
          <!-- 应收费用 -->
          <div class="acceptOffer">
            <el-row class="title">应收费用</el-row>
            <el-row class="accept-body" v-for="(item1, index1) in submitData.quotationReceivableBodyVOList" :key="'key_1' + index1">
              <span class="deleteBody" @click="delFeeBody(index1,'1')"><img src="@/assets/img/delete_all.png" alt=""></span>
              <!-- 第一行 -->
              <el-row :gutter="50" class="base-line">
                <el-row :gutter="50" class="margin_0 base-line-one">
                  <el-col :span="12" class="padding_0">
                    <el-form-item label="进/出境关别" label-width="85px">
                      <el-select  v-model="item1.impexpPortcdNames"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete maxlength="80"
                        @focus="tipsFill('impexpPortList','SAAS_CUSTOMS_REL')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in impexpPortList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-right:0">
                    <el-form-item label="申报地海关" label-width="85px">
                      <el-select  v-model="item1.dclPlcCuscdNames"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete maxlength="80"
                        @focus="tipsFill('dclPlcCusList','SAAS_CUSTOMS_REL')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in dclPlcCusList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="margin_0">
                  <el-col :span="12" class="padding_0">
                    <el-form-item label="出发地/港" label-width="85px">
                      <el-select  v-model="item1.departure"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete maxlength="80"
                        @focus="tipsFill('portList','SAAS_TJ_PORT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in portList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-right:0">
                    <el-form-item label="目的地/港" label-width="85px">
                      <el-select  v-model="item1.destination"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete maxlength="80"
                        @focus="tipsFill('portList','SAAS_TJ_PORT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in portList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-row>
              <!-- 进口 -->
              <el-row :gutter="50" class="margin_0 import">
                <el-row class="title-flag margin_0">进口</el-row>
                <el-row class="margin_0 ei-line" :gutter="8" v-for="(item2, index2) in item1.feeOptionImportVOs" :key="'key_1_I' + index2">
                  <el-col :span="8" style="padding-left:0">
                    <el-form-item label-width="0">
                      <el-input size="mini" v-model="item2.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0" :prop="'quotationReceivableBodyVOList.' + index1 + '.feeOptionImportVOs.' + index2 + '.feePrice'" :rules="{pattern: /^\d{1,10}(\.\d{1,3})?$|^$/, message: '小数点前10位以内,后3位以内', trigger: 'blur'}">
                      <el-input size="mini" v-model="item2.feePrice" clearable placeholder="单价"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select size="mini" placeholder="税率" clearable  v-model="item2.feeRate" style="width:100%;">
                        <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                        <el-option key="0" :label="'6%'" :value="'6%'"></el-option>
                        <el-option key="0" :label="'12%'" :value="'12%'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item2.curr" placeholder="币制"
                        filterable clearable remote default-first-option
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
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item2.unit" placeholder="计量单位"
                        filterable clearable remote default-first-option
                        @focus="tipsFill('unitList','SAAS_UNIT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in unitList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- 删除图标 -->
                  <span class="delete-icon" @click="delItems(index1,index2,'I','1')">
                    <img src="@/assets/img/delete.png" alt="">
                  </span>
                </el-row>
                <el-row class="margin_0">
                  <el-button class="addMore" @click="addFeeMore(index1,'I','1')">添加更多</el-button>
                </el-row>
              </el-row>
              <!-- 出口 -->
              <el-row :gutter="50" class="margin_0 export">
                <el-row class="title-flag margin_0">出口</el-row>
                <el-row class="margin_0 ei-line" :gutter="8" v-for="(item3, index3) in item1.feeOptionExportVOs" :key="'key_1_E' + index3">
                  <el-col :span="8" style="padding-left:0">
                    <el-form-item label-width="0">
                      <el-input size="mini" v-model="item3.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-input size="mini" v-model="item3.feePrice" clearable placeholder="单价"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select size="mini" placeholder="税率" clearable  v-model="item3.feeRate" style="width:100%;">
                        <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                        <el-option key="0" :label="'6%'" :value="'6%'"></el-option>
                        <el-option key="0" :label="'12%'" :value="'12%'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item3.curr" placeholder="币制"
                        filterable clearable remote default-first-option
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
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item3.unit" placeholder="计量单位"
                        filterable clearable remote default-first-option
                        @focus="tipsFill('unitList','SAAS_UNIT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in unitList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- 删除图标 -->
                  <span class="delete-icon" @click="delItems(index1,index3,'E','1')">
                    <img src="@/assets/img/delete.png" alt="">
                  </span>
                </el-row>
                <el-row class="margin_0">
                  <el-button class="addMore" @click="addFeeMore(index1,'E','1')">添加更多</el-button>
                </el-row>
              </el-row>
            </el-row>
            <el-row>
              <span class="moreOport" @click="addMorePort('1')">设置更多口岸</span>
            </el-row>
          </div>
          <!-- 应付费用 -->
          <div class="payOffer acceptOffer">
            <el-row class="title">应付费用</el-row>
            <el-row class="accept-body" v-for="(item1, index1) in submitData.quotationPayableBodyVOList" :key="'key_0' + index1">
              <span class="deleteBody" @click="delFeeBody(index1,'0')"><img src="@/assets/img/delete_all.png" alt=""></span>
              <!-- 第一行 -->
              <el-row :gutter="50" class="base-line">
                <el-row :gutter="50" class="margin_0 base-line-one">
                  <el-col :span="12" class="padding_0">
                    <el-form-item label="进/出境关别" label-width="85px">
                      <el-select  v-model="item1.impexpPortcdNames"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete
                        @focus="tipsFill('impexpPortList','SAAS_CUSTOMS_REL')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in impexpPortList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-right:0">
                    <el-form-item label="申报地海关" label-width="85px">
                      <el-select  v-model="item1.dclPlcCuscdNames"
                        filterable clearable remote default-first-option
                        multiple allow-create autocomplete
                        @focus="tipsFill('dclPlcCusList','SAAS_CUSTOMS_REL')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in dclPlcCusList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50" class="margin_0">
                  <el-col :span="12" class="padding_0">
                    <el-form-item label="出发地/港" label-width="85px">
                      <el-input size="mini" clearable maxlength="80" v-model="item1.departure"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-right:0">
                    <el-form-item label="目的地/港" label-width="85px">
                      <el-input size="mini" clearable maxlength="80" v-model="item1.destination"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-row>
              <!-- 进口 -->
              <el-row :gutter="50" class="margin_0 import">
                <el-row class="title-flag margin_0">进口</el-row>
                <el-row class="margin_0 ei-line" :gutter="8" v-for="(item2, index2) in item1.feeOptionImportVOs" :key="'key_0_I' + index2">
                  <el-col :span="8" style="padding-left:0">
                    <el-form-item label-width="0">
                      <el-input size="mini" v-model="item2.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0" :prop="'quotationPayableBodyVOList.' + index1 + '.feeOptionImportVOs.' + index2 + '.feePrice'" :rules="{pattern: /^\d{1,10}(\.\d{1,3})?$|^$/, message: '小数点前10位以内,后3位以内', trigger: 'blur'}">
                      <el-input size="mini" v-model="item2.feePrice" clearable placeholder="单价"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select size="mini" placeholder="税率" clearable  v-model="item2.feeRate" style="width:100%;">
                        <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                        <el-option key="0" :label="'6%'" :value="'6%'"></el-option>
                        <el-option key="0" :label="'12%'" :value="'12%'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item2.curr" placeholder="币制"
                        filterable clearable remote default-first-option
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
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item2.unit" placeholder="计量单位"
                        filterable clearable remote default-first-option
                        @focus="tipsFill('unitList','SAAS_UNIT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in unitList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- 删除图标 -->
                  <span class="delete-icon" @click="delItems(index1,index2,'I','0')">
                    <img src="@/assets/img/delete.png" alt="">
                  </span>
                </el-row>
                <el-row class="margin_0">
                  <el-button class="addMore" @click="addFeeMore(index1,'I','0')">添加更多</el-button>
                </el-row>
              </el-row>
              <!-- 出口 -->
              <el-row :gutter="50" class="margin_0 export">
                <el-row class="title-flag margin_0">出口</el-row>
                <el-row class="margin_0 ei-line" :gutter="8" v-for="(item3, index3) in item1.feeOptionExportVOs" :key="'key_0_E' + index3">
                  <el-col :span="8" style="padding-left:0">
                    <el-form-item label-width="0">
                      <el-input size="mini" v-model="item3.feeOptionName" clearable placeholder="费用名称" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0" :prop="'quotationPayableBodyVOList.' + index1 + '.feeOptionImportVOs.' + index3 + '.feePrice'" :rules="{pattern: /^\d{1,10}(\.\d{1,3})?$|^$/, message: '小数点前10位以内,后3位以内', trigger: 'blur'}">
                      <el-input size="mini" v-model="item3.feePrice" clearable placeholder="单价"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select size="mini" placeholder="税率" clearable  v-model="item3.feeRate" style="width:100%;">
                        <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                        <el-option key="0" :label="'6%'" :value="'6%'"></el-option>
                        <el-option key="0" :label="'12%'" :value="'12%'"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item3.curr" placeholder="币制"
                        filterable clearable remote default-first-option
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
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label-width="0">
                      <el-select  v-model="item3.unit" placeholder="计量单位"
                        filterable clearable remote default-first-option
                        @focus="tipsFill('unitList','SAAS_UNIT')"
                        :remote-method="checkParamsList"
                        style="width:100%">
                        <el-option
                          v-for="item in unitList"
                          :key="item.codeField"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- 删除图标 -->
                  <span class="delete-icon" @click="delItems(index1,index3,'E','0')">
                    <img src="@/assets/img/delete.png" alt="">
                  </span>
                </el-row>
                <el-row class="margin_0">
                  <el-button class="addMore" @click="addFeeMore(index1,'E','0')">添加更多</el-button>
                </el-row>
              </el-row>
            </el-row>
            <el-row>
              <span class="moreOport" @click="addMorePort('0')">设置更多口岸</span>
            </el-row>
          </div>
        </el-form>
      </el-row>
    </div>
    <div class="submit">
      <el-row style="text-align:center">
        <el-button size="mini" type="primary" @click="createQuotation">提交</el-button>
        <el-button size="mini"  @click="cancelQuotation">取消</el-button>
      </el-row>
    </div>
  </section>
</template>

<script>
import util from '@/common/util'
import commonParam from '@/common/commonParam'
export default {
  data () {
    return {
      // 总表单
      submitData: {
        dates: '',
        startDate: '', // 有效期开始
        endDate: '', // 有效期结束
        entrustCompanyId: '',
        entrustCompanyName: '', // 委托企业名称
        itemName: '', // 报价名称
        quotationReceivableBodyVOList: [ // 应收
          {
            dclPlcCuscd: '', // 申报地海关代码
            dclPlcCuscdNames: '',
            departure: '', // 出发地
            destination: '', // 目的地
            feeFlag: '1', // 应收1，应付0
            impexpPortcd: '', // 进出境关别代码
            impexpPortcdNames: '',
            quotationFeeId: '', // 报价应收应付主键
            quotationId: '', // 报价主键
            feeOptionImportVOs: [ // 进口
              {
                curr: '',
                feeOptionName: '',
                feePrice: '',
                feeRate: '',
                iEFlag: 'I',
                quotationFeeId: '',
                quotationFeeOptionId: '',
                quotationId: '',
                unit: ''
              }
            ],
            feeOptionExportVOs: [ // 出口
              {
                curr: '',
                feeOptionName: '',
                feePrice: '',
                feeRate: '',
                iEFlag: 'E',
                quotationFeeId: '',
                quotationFeeOptionId: '',
                quotationId: '',
                unit: ''
              }
            ]
          }
        ],
        quotationPayableBodyVOList: [ // 应付
          {
            dclPlcCuscd: '', // 申报地海关代码
            dclPlcCuscdNames: '',
            departure: '', // 出发地
            destination: '', // 目的地
            feeFlag: '0', // 应收1，应付0
            impexpPortcd: '', // 进出境关别代码
            impexpPortcdNames: '',
            quotationFeeId: '', // 报价应收应付主键
            quotationId: '', // 报价主键
            feeOptionImportVOs: [ // 进口
              {
                curr: '',
                feeOptionName: '',
                feePrice: '',
                feeRate: '',
                iEFlag: 'I',
                quotationFeeId: '',
                quotationFeeOptionId: '',
                quotationId: '',
                unit: ''
              }
            ],
            feeOptionExportVOs: [ // 出口
              {
                curr: '',
                feeOptionName: '',
                feePrice: '',
                feeRate: '',
                iEFlag: 'E',
                quotationFeeId: '',
                quotationFeeOptionId: '',
                quotationId: '',
                unit: ''
              }
            ]
          }
        ],
        rateFlag: '1', // 报价是否含税1含税，0不含税
        singleFlag: '0' // 是否项目独立报价1是0不是
      },
      copysubmitData: {}, // 复制整个模板
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
        quotationId: '',
        feeOptionImportVOs: [ // 进口
          {
            curr: '',
            feeOptionName: '',
            feePrice: '',
            feeRate: '',
            iEFlag: 'I',
            quotationFeeId: '',
            quotationFeeOptionId: '',
            quotationId: '',
            unit: ''
          }
        ],
        feeOptionExportVOs: [ // 出口
          {
            curr: '',
            feeOptionName: '',
            feePrice: '',
            feeRate: '',
            iEFlag: 'E',
            quotationFeeId: '',
            quotationFeeOptionId: '',
            quotationId: '',
            unit: ''
          }
        ]
      },
      // 应收应付费用模板
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
      // 查询的字典字段
      tableNameList: {
        tableNames: [
          'SAAS_CUSTOMS_REL', // 海关关区
          'SAAS_CURR', // 币制
          'SAAS_UNIT', // 计量单位
          'SAAS_TJ_PORT'
        ]
      },
      departureList: [], // 出发地
      destinationList: [], // 目的地
      impexpPortList: [], // 进出境关别
      dclPlcCusList: [], // 申报地海关
      currList: [], // 币制
      unitList: [], // 计量单位
      portList: [], // 港口
      corpList: [], // 企业列表
      selectObj: {
        obj: '',
        params: ''
      },
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
  created () {
    this.copyData() // 深拷贝模板
    this.getCommonParam()
  },
  methods: {
    // 添加更多按钮
    addFeeMore (index, iEFlag, feeFlag) {
      // 深拷贝
      let temp = {...this.templateOp}
      temp.iEFlag = iEFlag
      let props = iEFlag === 'I' ? 'feeOptionImportVOs' : 'feeOptionExportVOs'
      if (feeFlag === '1') { // 应收
        this.submitData.quotationReceivableBodyVOList[index][props].push(temp)
      } else {
        this.submitData.quotationPayableBodyVOList[index][props].push(temp)
      }
    },
    // 添加更多口岸
    addMorePort (feeFlag) {
      let temp = {...this.templateFee}
      temp.feeFlag = feeFlag
      if (feeFlag === '1') {
        this.submitData.quotationReceivableBodyVOList.push(temp)
      } else {
        this.submitData.quotationPayableBodyVOList.push(temp)
      }
    },
    // 删除行费用项
    delItems (index1, index2, iEFlag, feeFlag) {
      let props = iEFlag === 'I' ? 'feeOptionImportVOs' : 'feeOptionExportVOs'
      if (feeFlag === '1') {
        this.submitData.quotationReceivableBodyVOList[index1][props].splice(index2, 1)
      } else {
        this.submitData.quotationPayableBodyVOList[index1][props].splice(index2, 1)
      }
    },
    // 删除应收应付模块
    delFeeBody (index, feeFlag) {
      if (feeFlag === '1') {
        this.fees_1.splice(index, 1)
      } else {
        this.fees_0.splice(index, 1)
      }
    },
    // 创建字典参数列表
    tipsFill (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
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
        let list = JSON.parse(window.localStorage.getItem(this.selectObj.params))
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
        if (!util.isEmpty(JSON.parse(window.localStorage.getItem(this.selectObj.params)))) {
          this[this.selectObj.obj] = JSON.parse(window.localStorage.getItem(this.selectObj.params)).slice(0, 30)
        }
      }
    },
    // 日期校验
    validDate (rule, value, callback) {
      console.log(value)
      if (!value || value.length === 0) {
        callback(new Error('请选择有效期'))
      } else {
        callback()
      }
    },
    // 创建报价
    createQuotation () {
      let flag1 = true
      this.$refs['submitData'].validate((valid) => {
        if (!valid) {
          flag1 = false
        }
      })
      if (!flag1) {
        return
      }
      let subData = JSON.parse(JSON.stringify(this.submitData))
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/quotation/create',
        data: subData,
        router: this.$router,
        success: res => {
          console.log(res.result)
        }
      })
    },
    // 取消按钮
    cancelQuotation () {
      this.submitData = this.copysubmitData
    },
    // 拷贝模板
    copyData () {
      this.copysubmitData = JSON.parse(JSON.stringify(this.submitData))
    },
    // 企业查询
    getcorps (query) {
      if (query.length < 2) {
        return
      }
      this.$store.dispatch('ajax', {
        url: 'API@/login/corp/getCorpByCondAssignProp',
        data: {
          corpName: query,
          returnProps: ['corpId', 'corpName']
        },
        router: this.$router,
        success: (res) => {
          this.corpList = res.result.splice(0, 20)
        }
      })
    },
    // 同时获取企业名称及id,绑定企业对象信息
    translatecorp () {
      if (this.submitData.entrustCompanyName) { // 防止为null的情况
        if (typeof this.submitData.entrustCompanyName === 'object') {
          this.submitData.entrustCompanyId = this.submitData.entrustCompanyName.corpId
          this.submitData.entrustCompanyName = this.submitData.entrustCompanyName.corpName
        } else { // 自己手动输入
          this.submitData.entrustCompanyId = ''
        }
      } else {
        this.submitData.entrustCompanyId = ''
        this.submitData.entrustCompanyName = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
  .base-line-one {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 8px;
    }
  }
  .originInfo {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 15px;
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
        line-height: 13px;
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
      margin-bottom: 18px;
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
        margin-bottom: 12px;
      }
    }
  }
</style>
