<template>
  <section class='sys-main expenseDetail'>
    <div class="topFlag flex" v-if="optionsType === 'look' && decCommon.verifyMsg">
      <img src="@/assets/img/Tips.png" alt="">
      <div class="one-row">
        <div class="left">审核意见&nbsp;:</div>
        <div class="right">{{decCommon.verifyMsg}}</div>
      </div>
    </div>
    <div class="decDetail area">
      <div class="title">报关单/订单详情</div>
      <!-- 台账查看时报关单详情区域 -->
      <div class="content" v-if="optionsType === 'look'">
        <el-row class="line up">
          <el-col :span="8">
            <div class="one-row">
              <div class="left">接单编号&nbsp;:</div>
              <div class="right">{{decCommon.innerNo || '-'}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="one-row">
              <div class="left">报关单号&nbsp;:</div>
              <div class="right">{{decCommon.cusCiqNo || '-'}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="one-row">
              <div class="left">提单号&nbsp;:</div>
              <div class="right">{{decCommon.billNo || '-'}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row class="down flex-wrap">
          <div class="block flex" v-for="(value, key) in decDetail" :key="key">
            <div class="left">{{value.keyName || '-'}}&nbsp;:&nbsp;</div>
            <div class="right">{{value.keyValue || '-'}}</div>
          </div>
        </el-row>
        <!-- 申报异常 -->
        <el-row v-if="decCommon.msg">
          <div class="one-row normal">
            <div class="left">申报异常&nbsp;:</div>
            <div class="right red">{{decCommon.msg}}</div>
          </div>
        </el-row>
      </div>
      <!-- 台账新增时表单录入 -->
      <el-row class='query-condition' v-if="optionsType === 'add'">
        <el-form label-width="75px" :rules="ruleForm" :model="addForm" ref="addForm" size="mini" label-position="right">
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="接单编号">
                <el-input v-model="addForm.orderNo" size="mini" clearable :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报关单号">
                <el-input size="mini" clearable v-model="addForm.decNo" :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单号">
                <el-input size="mini" clearable v-model="addForm.billNo" :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务类型">
                <el-select v-model="addForm.businessType" size="mini" clearable  style="width:100%;">
                  <el-option key="1" :label="'报关'" :value="1"></el-option>
                  <el-option key="2" :label="'货代'" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="6">
              <el-form-item label="委托企业" prop="entrustCompanyName">
                <el-select v-model="addForm.entrustCompanyName" style="width:100%"
                  filterable remote clearable
                  :remote-method="getcorps"
                  allow-create
                  default-first-option >
                  <el-option
                    v-for="item in corpList"
                    :key="item.corpId"
                    :label="item.corpName"
                    :value="item.corpName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="进出口">
                <el-select v-model="addForm.iEFlag" size="mini" clearable style="width:100%;">
                  <el-option key="0" :label="'进口'" :value="0"></el-option>
                  <el-option key="1" :label="'出口'" :value="1"></el-option>
                  <el-option key="2" :label="'内贸'" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开航日">
                <el-date-picker
                  style="width:100%"
                  v-model="dates1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="放行时间">
                <el-date-picker
                  style="width:100%"
                  v-model="dates2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 查询条件 end-->
        </el-form>
      </el-row>
    </div>
    <!-- 应收费用区域 -->
    <div class="receive area">
      <div class="title">应收费用</div>
      <el-row class="table-btn" v-if="optionsType === 'edit' || optionsType === 'add'">
        <el-button size="mini" class="list-btns list-icon-add" @click="quotationAdd(true)"><i></i>新增</el-button>
        <!-- 使用报价选项 -->
        <el-dropdown trigger="click" @command="getOfferReceive" placement="bottom-start">
          <el-button size="mini" class="list-btns list-icon-useOffer">
            <i class="other"></i>使用报价<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in billReceivableBodyVO.billQuotationRespVOs" :command="item" :key="item.quotationId">{{item.itemName+'-'+item.entrustCompanyName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <div class='query-table-finance'>
        <el-form ref="receiveTableForm" :model="billReceivableBodyVO" :show-message="false">
          <el-table class='sys-table-table' row-key="expenseBillOptionId" :cell-class-name="((optionsType==='edit' || optionsType==='add') && getCellStyle) || ''" align="left" :data="billReceivableBodyVO.billReceivableBodyVOList" border>
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="feeOptionName" label="费用名称" min-width="120">
              <template slot-scope="scope">
                <div class="table-select" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select size="mini" placeholder="请选择费用名称" clearable  v-model="scope.row.feeOptionName" style="width:100%;" @change="getRate(scope.row)">
                    <el-option v-for="item in optionsList"
                      :key="item.feePid" :label="item.feeOptionName" :value="item.feeOptionName">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.feeOptionName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="feePrice" label="计费单价" align="right" min-width="140">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-form-item
                    :prop="'billReceivableBodyVOList.'+ scope.$index + '.feePrice'"
                    :rules="valid.price">
                    <el-input clearable v-model="scope.row.feePrice" @change="computeTaxPrice(scope.row)"></el-input>
                  </el-form-item>
                </div>
                <div class="cell-div" v-else>{{scope.row.feePrice || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="unit" width="100" label="计量单位" align="center">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select  v-model="scope.row.unit" placeholder="计量单位"
                    filterable remote default-first-option clearable
                    @focus="tipsFill('unitList','SAAS_SEA_UNIT', 'unitR'+ scope.$index)"
                    :remote-method="checkParamsList"
                    style="width:100%">
                    <el-option
                      v-for="item in unitList['unitR'+ scope.$index]"
                      :key="item.codeField"
                      :label="item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.unitValue || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="curr" width="120" label="币制" align="center">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select  v-model="scope.row.curr" placeholder="币制"
                    filterable remote default-first-option clearable
                    @focus="tipsFill('currList', 'SAAS_CURR', 'currR' + scope.$index)"
                    :remote-method="checkParamsList"
                    style="width:100%">
                    <el-option
                      v-for="item in currList['currR' + scope.$index]"
                      :key="item.codeField"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.curr || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="num" width="100" label="数量" align="right">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-form-item
                    :prop="'billReceivableBodyVOList.'+ scope.$index + '.num'"
                    :rules="valid.num">
                    <el-input v-model="scope.row.num" @change="computeTaxPrice(scope.row)"></el-input>
                  </el-form-item>
                </div>
                <div class="cell-div" v-else>{{scope.row.num || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rate" width="80" label="税率" align="right">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select size="mini" placeholder="税率" style="width:100%;" v-model="scope.row.rate" @change="computeTaxPrice(scope.row)">
                    <el-option key="0" :label="'0%'" :value="0"></el-option>
                    <el-option key="6" :label="'6%'" :value="6"></el-option>
                    <el-option key="9" :label="'9%'" :value="9"></el-option>
                    <el-option key="13" :label="'13%'" :value="13"></el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{typeof scope.row.rate === 'number' ? (scope.row.rate + '%') : '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="taxPrice" width="100" label="含税总价" align="right">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.taxPrice.toLocaleString() || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="settleCompanyName" min-width="160" label="结算企业" align="left">
              <template slot-scope="scope">
                <div class="table-select" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-input v-model="scope.row.settleCompanyName"></el-input>
                </div>
                <div class="cell-div" v-else>{{scope.row.settleCompanyName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="billType" width="100" label="类型" align="center">
              <template slot-scope="scope">
                <div class="cell-div">
                  {{scope.row.billType === 0 ? '自动登账' : scope.row.billType === 1 ? '手动登账' : '-'}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemName" min-width="120" label="使用报价" align="center">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.itemName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" width="100" label="操作人" align="center">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.createUserName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="60" align="center" v-if="optionsType === 'edit' || optionsType === 'add'">
              <template slot-scope="scope">
                <div class="sys-td-c">
                  <el-button title="删除" type="text" @click="delItems(scope.row, true)" class="table-icon list-icon-delete"><i></i></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <!-- 应付费用区域 -->
    <div class="pay area">
      <div class="title">应付费用</div>
      <el-row class="table-btn" v-if="optionsType === 'edit' || optionsType === 'add'">
        <el-button size="mini" class="list-btns list-icon-add" @click="quotationAdd(false)"><i></i>新增</el-button>
        <!-- 使用报价选项 -->
        <el-dropdown trigger="click" @command="getOfferPay" placement="bottom-start">
          <el-button size="mini" class="list-btns list-icon-useOffer">
            <i class="other"></i>使用报价<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in billPayableBodyVO.billQuotationRespVOs" :command="item" :key="item.quotationId">{{item.itemName+'-'+item.entrustCompanyName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <div class='query-table-finance'>
        <el-form ref="payTableForm" :model="billPayableBodyVO" :show-message="false">
          <el-table class='sys-table-table' row-key="expenseBillOptionId" :cell-class-name="((optionsType==='edit' || optionsType==='add') && getCellStyle) || ''" align="left" :data="billPayableBodyVO.billPayableBodyVOList" border>
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column prop="feeOptionName" label="费用名称" min-width="120">
              <template slot-scope="scope">
                <div class="table-select" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select size="mini" placeholder="请选择费用名称" clearable  v-model="scope.row.feeOptionName" style="width:100%;" @change="getRate(scope.row)">
                    <el-option v-for="item in optionsList"
                      :key="item.feePid" :label="item.feeOptionName" :value="item.feeOptionName">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.feeOptionName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="feePrice" label="计费单价" align="right" min-width="140">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-form-item
                    :prop="'billPayableBodyVOList.'+ scope.$index + '.feePrice'"
                    :rules="valid.price">
                    <el-input clearable v-model="scope.row.feePrice" @change="computeTaxPrice(scope.row)"></el-input>
                  </el-form-item>
                </div>
                <div class="cell-div" v-else>{{scope.row.feePrice || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="unit" width="100" label="计量单位" align="center">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select  v-model="scope.row.unit" placeholder="计量单位"
                    filterable remote default-first-option clearable
                    @focus="tipsFill('unitList','SAAS_SEA_UNIT', 'unitP' + scope.$index)"
                    :remote-method="checkParamsList"
                    style="width:100%">
                    <el-option
                      v-for="item in unitList['unitP' + scope.$index]"
                      :key="item.codeField"
                      :label="item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.unitValue || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="curr" width="120" label="币制" align="center">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select  v-model="scope.row.curr" placeholder="币制"
                    filterable remote default-first-option clearable
                    @focus="tipsFill('currList','SAAS_CURR', 'currP' + scope.$index)"
                    :remote-method="checkParamsList"
                    style="width:100%">
                    <el-option
                      v-for="item in currList['currP' + scope.$index]"
                      :key="item.codeField"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{scope.row.curr || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="num" width="100" label="数量" align="right">
              <template slot-scope="scope">
                <div class="table-select align-r" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-input v-model="scope.row.num" @change="computeTaxPrice(scope.row)"></el-input>
                </div>
                <div class="cell-div" v-else>{{scope.row.num || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rate" width="80" label="税率" align="right">
              <template slot-scope="scope">
                <div class="table-select align-c" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-select size="mini" placeholder="税率" style="width:100%;" v-model="scope.row.rate" @change="computeTaxPrice(scope.row)">
                    <el-option key="0" :label="'0%'" :value="0"></el-option>
                    <el-option key="6" :label="'6%'" :value="6"></el-option>
                    <el-option key="9" :label="'9%'" :value="9"></el-option>
                    <el-option key="13" :label="'13%'" :value="13"></el-option>
                  </el-select>
                </div>
                <div class="cell-div" v-else>{{typeof scope.row.rate === 'number' ? (scope.row.rate + '%') : '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="taxPrice" width="100" label="含税总价" align="right">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.taxPrice.toLocaleString() || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="settleCompanyName" min-width="160" label="结算企业" align="left">
              <template slot-scope="scope">
                <div class="table-select" v-if="optionsType === 'edit' || optionsType === 'add'">
                  <el-input v-model="scope.row.settleCompanyName"></el-input>
                </div>
                <div class="cell-div" v-else>{{scope.row.settleCompanyName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="billType" width="100" label="类型" align="center">
              <template slot-scope="scope">
                <div class="cell-div">
                  {{scope.row.billType === 0 ? '自动登账' : scope.row.billType === 1 ? '手动登账' : '-'}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemName" min-width="120" label="使用报价" align="center">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.itemName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" width="100" label="操作人" align="center">
              <template slot-scope="scope">
                <div class="cell-div">{{scope.row.createUserName || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="60" align="center" v-if="optionsType === 'edit' || optionsType === 'add'">
              <template slot-scope="scope">
                <div class="sys-td-c">
                  <el-button title="删除" type="text" @click="delItems(scope.row, false)" class="table-icon list-icon-delete"><i></i></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <!-- 汇总区域 -->
    <div class="all area">
      <div class="title">汇总</div>
      <el-row class="companyItems" v-for="(item, index) in summarysSum" :key="'index' + index">
        <el-col class="company" :span="8">{{item.companyName || '-'}}</el-col>
        <el-col :span="item.pay.length>0?8:16" class="pull-right" v-if="item.receive.length>0">
          <div class="right">
            <!-- <span>应收&nbsp;:&nbsp;</span> -->
            <span class="receive" v-for="(item2, index2) in item.receive" :key="'item'+index2">{{(item2.currName || '-') +' '+ item2.sum}}</span>
          </div>
          <div class="left">应收&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="item.receive.length>0?8:16" class="pull-right" v-if="item.pay.length>0">
          <div class="right">
            <!-- <span>应付&nbsp;:&nbsp;</span> -->
            <span class="pay" v-for="(item3, index3) in item.pay" :key="'evy'+index3">{{(item3.currName || '-') +' '+ item3.sum}}</span>
          </div>
          <div class="left">应付&nbsp;:&nbsp;</div>
        </el-col>
      </el-row>
    </div>
    <div class="area" v-if="optionsType === 'look'">
      <div class="title">审核意见</div>
      <el-row>
        <el-input type="textarea" :rows="4" v-model="verifys" :maxlength="200" show-word-limit></el-input>
      </el-row>
    </div>
    <div class="submit" v-if="optionsType === 'look'">
      <el-row style="text-align:center">
        <el-button size="mini"  @click="expenseCheck('rejects')">审核驳回</el-button>
        <el-button size="mini" type="primary" class="longButton"  @click="expenseCheck('verifys')">审核通过</el-button>
      </el-row>
    </div>
    <div class="submit" v-if="optionsType === 'edit'">
      <el-row style="text-align:center">
        <el-button size="mini" type="primary" @click="submitBtn">提交</el-button>
        <el-button size="mini"  @click="cancelEdit">取消</el-button>
      </el-row>
    </div>
    <div class="submit" v-if="optionsType === 'add'">
      <el-row style="text-align:center">
        <el-button size="mini" type="primary" @click="sandCheck('1')">提交</el-button>
        <el-button size="mini"  @click="cancelEdit">取消</el-button>
        <el-button size="mini" v-if="swtichCheck === 'Y' || status === 4" @click="sandCheck('2')">发送审核</el-button>
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
      iEFlag: '',
      optionsType: 'look', // 记录当前操作类型
      payablefeeOptions: {},
      verifys: '', // 审核意见
      swtichCheck: '', // 台账后台开关是否开启
      status: '', // 审核退回的台账
      receivablefeeOptions: {},
      billPayableBodyVO: { // 应付
        billQuotationRespVOs: [],
        billPayableBodyVOList: [] // 下拉列表
      },
      billReceivableBodyVO: { // 应收
        billQuotationRespVOs: [], // 下拉列表
        billReceivableBodyVOList: [] // 表格数据
      },
      addForm: {
        billNo: '', // 提单号
        businessType: '', // 业务类型 1报关，2货代
        decNo: '', // 报关单号
        entrustCompanyName: '', // 委托企业名称
        expenseBillId: '',
        iEFlag: '', // 进出口0进口1出口2内贸
        orderNo: '', // 接单编号
        releaseDayStart: '', // 放行日
        releaseDayEnd: '',
        sailDayStart: '', // 开航日
        sailDayEnd: ''
      },
      dates1: '', // 开航日
      dates2: '', // 放行日
      corpList: [], // 存储委托企业列表
      decDetail: {}, // 报关单详情
      decCommon: {}, // 报关单详情固定字段
      summarys: [], // 费用汇总
      optionsList: [], // 费用项列表
      currList: {
        curr0: []
      }, // 币制
      unitList: { // 计量单位
        unit0: []
      },
      // 查询的字典字段
      tableNameList: {
        tableNames: [
          'SAAS_CURR', // 币制
          'SAAS_SEA_UNIT' // 计量单位
        ]
      },
      selectObj: {
        obj: '',
        params: ''
      },
      copyData: {
        billOptionPayVOs: [],
        billOptionReceiveVOs: []
      },
      template: {
        serialNo: '',
        feeOptionName: '',
        feePrice: '',
        unit: '',
        curr: '',
        num: '',
        rate: 0,
        taxPrice: '',
        settleCompanyName: '',
        billType: 1,
        itemName: '',
        createUserName: ''
      },
      // {pattern: /^\d{1,9}(\.\d{1,3})?$|^$/,validator: priceValid,message:'小数点支持前9位,后3位',trigger:'blur'}
      valid: {
        price: {validator: this.priceValid, message: '小数点支持前9位,后3位', trigger: 'blur'},
        num: {validator: this.numValid, message: '小数点支持前9位,后3位', trigger: 'blur'}
      },
      ruleForm: { // 新建台账表格校验
        entrustCompanyName: [{required: true, message: '请输入委托企业', trigger: 'change'}]
      },
      selectDown: {
        curr: {downList: 'currList', params: 'SAAS_CURR'},
        unit: {downList: 'unitList', params: 'SAAS_SEA_UNIT'}
      },
      expenseBillId: '', // 接单查看详情返回的
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    let {type, iEFlag, expenseBillId, innerNo, status} = this.$route.query
    if (type === 'edit') {
      expenseBillId ? this.getBillDetail(expenseBillId) : this.getBillDetail('', innerNo)
      this.status = status
    }
    if (type === 'add') {
      this.getQuotationsByAdd()
      this.justyIsOpen()
    }
    type === 'look' && this.getBillDetail(expenseBillId)
    this.optionsType = type
    this.iEFlag = iEFlag
    this.getOptionList()
    this.getCommonParam()
  },
  watch: {
    '$route.query.type': function () {
      this.optionsType = this.$route.query.type
    }
  },
  computed: {
    summarysSum: function () {
      // 根据企业分类汇总
      let arrAll = [...this.billPayableBodyVO.billPayableBodyVOList, ...this.billReceivableBodyVO.billReceivableBodyVOList]
      let allCompany = arrAll.map(v => v.settleCompanyName)
      let uniqueCompany = [...new Set(allCompany)] // 企业去重
      let newArr = []
      // 根据公司名称分类
      uniqueCompany.forEach(v => {
        let temp1 = arrAll.filter(item => (item.settleCompanyName === v && item.feeFlag)) // 应收
        let temp2 = arrAll.filter(item => (item.settleCompanyName === v && !item.feeFlag)) // 应付
        // 根据币制分类汇总
        let currReceiveAll = [...new Set(temp1.map(v => v.curr))]
        let currPayAll = [...new Set(temp2.map(v => v.curr))]
        let tempArr1 = this.getCategory(currReceiveAll, temp1)
        let tempArr2 = this.getCategory(currPayAll, temp2)
        let obj = {
          companyName: v,
          receive: tempArr1,
          pay: tempArr2
        }
        newArr.push(obj)
      })
      return newArr
    }
  },
  methods: {
    // 获取台账明细
    getBillDetail (id, No) {
      let params = {}
      let url = ''
      if (id) {
        params.expenseBillId = id
        url = 'bill/get'
      }
      if (No) {
        params.billNo = No
        url = 'bill/getByDec'
      }
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/' + url,
        data: params,
        router: this.$router,
        success: ({result}) => {
          if (result && JSON.stringify(result) !== '{}') {
            let {billPayableBodyVO, billReceivableBodyVO, resultMap, summarys, billNo, cusCiqNo, innerNo, msg, verifyMsg} = result
            this.billPayableBodyVO.billPayableBodyVOList = billPayableBodyVO.billPayableBodyVOList || []
            this.billPayableBodyVO.billQuotationRespVOs = billPayableBodyVO.billQuotationRespVOs || []
            this.billReceivableBodyVO.billReceivableBodyVOList = billReceivableBodyVO.billReceivableBodyVOList || []
            this.billReceivableBodyVO.billQuotationRespVOs = billReceivableBodyVO.billQuotationRespVOs || []
            this.decDetail = resultMap || {}
            this.decCommon = {billNo, cusCiqNo, innerNo, msg, verifyMsg}
            this.summarys = summarys || []
            // 翻译
            this.initSelected(this.billPayableBodyVO.billPayableBodyVOList, 'P', 0)
            this.initSelected(this.billReceivableBodyVO.billReceivableBodyVOList, 'R', 0)
            // 复制数据
            this.copyData.billOptionPayVOs = JSON.parse(JSON.stringify(this.billPayableBodyVO.billPayableBodyVOList))
            this.copyData.billOptionReceiveVOs = JSON.parse(JSON.stringify(this.billReceivableBodyVO.billReceivableBodyVOList))
            // 根据接单编号查询的详情
            result.expenseBillId && (this.expenseBillId = result.expenseBillId)
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
      let {obj, params, index} = this.selectObj
      let temp = []
      if (query !== '') {
        let keyValue = query.toString().trim()
        let list = JSON.parse(localStorage.getItem(params))
        let filterList = []
        if (util.isEmpty(keyValue)) {
          temp = list.slice(0, 30)
        } else {
          filterList = list.filter(item => {
            let str = item.codeField + '-' + item.nameField
            return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
          })
          temp = filterList.slice(0, 30)
        }
      } else {
        if (!util.isEmpty(JSON.parse(localStorage.getItem(params)))) {
          temp = JSON.parse(localStorage.getItem(params)).slice(0, 30)
        }
      }
      // 添加响应式
      if (index) {
        this[obj][index] = temp
        this.$delete(this[obj], index)
        this.$set(this[obj], index, temp)
      } else {
        this[obj] = temp
      }
    },
    // 创建字典参数列表
    tipsFill (obj, params, index) {
      this.selectObj = {
        obj,
        params,
        index
      }
    },
    // 获取单元格样式
    getCellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 7 || (columnIndex >= 9 && columnIndex < 12)) {
        return 'cell-disable'
      }
    },
    // 获取应收基础报价
    getOfferReceive (item) {
      // 查询报价应收/应付
      this.receivablefeeOptions = item
      this.getQuotationDetail(true, this.iEFlag, item.quotationId)
    },
    // 获取应付基础报价
    getOfferPay (item) {
      // 查询报价应收/应付
      this.payablefeeOptions = item
      this.getQuotationDetail(false, this.iEFlag, item.quotationId)
    },
    getQuotationDetail (feeFlag, iEFlag, quotationId) {
      let fee = feeFlag ? 'receivablefeeOptions' : 'payablefeeOptions'
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/bill/getQuotationDetail',
        data: {
          feeFlag, // 应收true，应付false
          iEFlag,
          quotationId
        },
        router: this.$router,
        success: ({result}) => {
          if (result && result[fee] && result[fee].length > 0) {
            result[fee].forEach(v => {
              v.settleCompanyName = this[fee].entrustCompanyName
              v.billType = 1
              v.itemName = this[fee].itemName
              // 报关单有且单位为票 数量默认为1
              ;(v.unit === '35' && this.decCommon.innerNo && (v.num = 1)) || (v.num = '')
              // 单位为次
              v.unit === '38' && (v.num = 1)
              // 单位为页
              if (v.unit === '36' && this.decDetail.goodNum) {
                let val = this.decDetail.goodNum.keyValue || ''
                if (val < 6) { // 0 或小数
                  v.num = 1
                } else if (val % 6 === 0) { // 整除
                  v.num = parseInt(val / 6)
                } else { // 向上取整
                  v.num = Math.ceil(val / 6)
                }
              }
              // 计算总价
              this.computeTaxPrice(v)
              v.feeFlag = feeFlag
            })
            // 计算追加后数组的长度,处理下拉列表属性值能够有序的增加 eg: curr0,curr1 ...
            let preLength = feeFlag ? this.billReceivableBodyVO.billReceivableBodyVOList.length : this.billPayableBodyVO.billPayableBodyVOList.length
            this.initSelected(result[fee], fee.substring(0, 1).toUpperCase(), preLength)
            feeFlag ? this.billReceivableBodyVO.billReceivableBodyVOList.push(...result[fee]) : this.billPayableBodyVO.billPayableBodyVOList.push(...result[fee])
          }
        }
      })
    },
    // 新增单条
    quotationAdd (feeFlag) {
      let obj = {...this.template}
      obj.feeFlag = feeFlag
      feeFlag ? this.billReceivableBodyVO.billReceivableBodyVOList.push(obj) : this.billPayableBodyVO.billPayableBodyVOList.push(obj)
    },
    // 提交编辑
    submitBtn () {
      // 表单验证
      let pass1 = false
      let pass2 = false
      this.$refs['receiveTableForm'].validate(valid => {
        if (!valid) pass1 = true
      })
      this.$refs['payTableForm'].validate(valid => {
        if (!valid) pass2 = true
      })
      if (pass1 || pass2) return
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/bill/edit',
        data: {
          expenseBillId: this.$route.query.expenseBillId,
          billOptionPayVOs: [...this.billPayableBodyVO.billPayableBodyVOList],
          billOptionReceiveVOs: [...this.billReceivableBodyVO.billReceivableBodyVOList]
        },
        router: this.$router,
        success: res => {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          // this.getBillDetail(this.$route.query.expenseBillId)
          this.$store.commit('CloseTab', this.$route.query.setId)
          this.$router.push({
            name: 'expense-list',
            query: {
              from: 'other'
            }
          })
        }
      })
    },
    // 取消编辑
    cancelEdit () {
      this.$refs['receiveTableForm'].clearValidate()
      this.$refs['payTableForm'].clearValidate()
      if (this.optionsType === 'edit') {
        this.billReceivableBodyVO.billReceivableBodyVOList = JSON.parse(JSON.stringify(this.copyData.billOptionReceiveVOs))
        this.billPayableBodyVO.billPayableBodyVOList = JSON.parse(JSON.stringify(this.copyData.billOptionPayVOs))
      } else {
        this.billReceivableBodyVO.billReceivableBodyVOList = []
        this.billPayableBodyVO.billPayableBodyVOList = []
        this.addForm = {
          billNo: '',
          businessType: '',
          decNo: '',
          entrustCompanyName: '',
          expenseBillId: '',
          iEFlag: '',
          orderNo: '',
          releaseDayStart: '',
          releaseDayEnd: '',
          sailDayStart: '',
          sailDayEnd: ''
        }
      }
    },
    // 千分符转换成数字
    dealMullimeter (num) {
      if (typeof num === 'string') {
        if (num.indexOf(',') > -1) {
          return +(num.replace(/,/g, ''))
        } else {
          return +num || 0
        }
      }
      if (typeof num === 'number') {
        return num
      }
    },
    // 处理toFixed 4舍5不入的问题 eg: 5.22556 => 5.226
    changeFixed (temp) {
      let reg = /\d+(\.\d{3}5){1}/
      if (reg.test(temp)) { // 小数点第四位为5的话自动+1
        let arr = temp.toString().split('.')
        let tempLeft = arr[0]
        let tempRight = +arr[1].substring(0, 4) + 1
        temp = tempLeft + '.' + tempRight
      }
      return +temp || 0
    },
    computeTaxPrice (row) {
      let priceReg = /^\d{1,10}(\.\d{1,3})?$|^$/ // 小数点前10后3
      let numFeg = /^\d{1,9}(\.\d{1,3})?$|^$/ // 小数点前9后3
      if (!priceReg.test(+row.feePrice) || !numFeg.test(+row.num)) return // 避免为NaN的情况
      let temp = row.num * row.feePrice * (1 + (+row.rate) / 100)
      row.taxPrice = temp
    },
    delItems (row, feeFlag) {
      let fee = feeFlag ? 'billReceivableBodyVO' : 'billPayableBodyVO'
      let index = this[fee][fee + 'List'].findIndex(item => row === item)
      this[fee][fee + 'List'].splice(index, 1)
      // 动态创建的属性值发生变化,重新翻译
      feeFlag ? this.initSelected(this[fee][fee + 'List'], 'R', 0) : this.initSelected(this[fee][fee + 'List'], 'P', 0)
    },
    getRate (row) {
      if (row.feeOptionName) {
        let temp = this.optionsList.find(item => item.feeOptionName === row.feeOptionName)
        row.rate = temp.feeRate
        // 新增一条时,添加feePid
        !row.feePid && (row.feePid = temp.feePid)
        // 总价发生变化
        this.computeTaxPrice(row)
      }
    },
    // 数组求和
    getSum (arr) {
      if (arr.length === 0) {
        return '0'
      }
      if (arr.length === 1) {
        return this.dealMullimeter(arr[0]).toLocaleString()
      }
      return arr.reduce((prev, curr, idx, arr) => {
        return (this.dealMullimeter(prev) + this.dealMullimeter(curr)).toLocaleString()
      })
    },
    // 以货币分类汇总
    getCategory (uniqueArr, allArr) {
      let tempArr1 = []
      uniqueArr.forEach(i => {
        let temp3 = allArr.filter(q => q.curr === i && typeof (q.taxPrice === 'number' || typeof q.taxPrice === 'string'))
        let obj1 = {
          currName: i,
          sum: this.getSum(temp3.map(s => s.taxPrice))
        }
        tempArr1.push(obj1)
      })
      return tempArr1
    },
    // 单价校验
    priceValid (rule, value, callback) {
      let reg = /^\d{1,10}(\.\d{1,3})?$/
      if (!reg.test(value)) {
        this.$message({
          type: 'error',
          message: '单价为空或格式输入有误,支持小数点后3位,前10位'
        })
        callback(new Error('数量为空或格式输入有误,支持小数点后3位,前10位'))
      } else {
        callback()
      }
    },
    // 数量校验
    numValid (rule, value, callback) {
      let reg = /^\d{1,9}(\.\d{1,3})?$/
      if (!reg.test(value)) {
        this.$message({
          type: 'error',
          message: '数量为空或格式输入有误,支持小数点后3位,前9位'
        })
        callback(new Error('数量为空或格式输入有误,支持小数点后3位,前9位'))
      } else {
        callback()
      }
    },
    // 数据返填时,翻译计量单位和币制
    initSelected (arr, type, length) {
      if (!Array.isArray(arr)) return
      if (arr.length === 0) return
      arr.forEach((v, i) => {
        if (v.unit) {
          this.selectObj = {
            obj: this.selectDown['unit']['downList'],
            params: this.selectDown['unit']['params'],
            index: 'unit' + type + (i + length)
          }
          this.checkParamsList(v.unit)
        }
        // if (v.curr) { 币制翻译取消
        //   this.selectObj = {
        //     obj: this.selectDown['curr']['downList'],
        //     params: this.selectDown['curr']['params'],
        //     index: 'curr' + type + (i + length)
        //   }
        //   this.checkParamsList(v.curr)
        // }
      })
    },
    // 委托企业
    getcorps (query) {
      if (query.length < 2 || query.length > 30) return
      this.$store.dispatch('ajax', {
        url: 'API@/login/corp/getCorpByCondAssignProp',
        data: {
          corpName: query,
          returnProps: ['corpId', 'corpName']
        },
        router: this.$router,
        success: ({result}) => {
          this.corpList = (result && result.splice(0, 20)) || []
        }
      })
    },
    // 台账审核驳回/确认
    expenseCheck (type) {
      let {expenseBillId, setId} = this.$route.query
      this.$store.dispatch('ajax', {
        url: `API@saas-finance/bill/verify`,
        data: {
          expenseBillId: expenseBillId,
          verify: type === 'verifys',
          verifyMsg: this.verifys || ''
        },
        router: this.$router,
        success: res => {
          this.$message({
            type: 'success',
            message: type === 'rejects' ? '驳回成功' : '审核成功'
          })
          this.$store.commit('CloseTab', setId)
          this.$router.push({
            name: 'expense-list',
            query: {
              from: 'other'
            }
          })
        }
      })
    },
    // 台账手动新增时,获取本企业报价列表
    getQuotationsByAdd () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/bill/getQuotations',
        data: {},
        router: this.$router,
        success: ({result}) => {
          this.billPayableBodyVO.billQuotationRespVOs = result || []
          this.billReceivableBodyVO.billQuotationRespVOs = result || []
        }
      })
    },
    // 判断台账审核按钮是否开启,开启显示发送审核按钮
    justyIsOpen (callback) {
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/ccba/review/isReview',
        data: ['account_manual_audit'],
        router: this.$router,
        success: ({result}) => {
          let swtichCheck = result['account_manual_audit'].value
          callback && callback(swtichCheck)
        }
      })
    },
    // 发送审核
    sandCheck (type) {
      // 表单验证
      let pass1 = false
      let pass2 = false
      let pass3 = false
      this.$refs['addForm'].validate(valid => {
        if (!valid) pass3 = true
      })
      this.$refs['receiveTableForm'].validate(valid => {
        if (!valid) pass1 = true
      })
      this.$refs['payTableForm'].validate(valid => {
        if (!valid) pass2 = true
      })
      if (pass1 || pass2 || pass3) return
      if (this.dates2 && this.dates2.length > 0) {
        this.addForm.releaseDayStart = this.dates2[0]
        this.addForm.releaseDayEnd = this.dates2[1]
      } else {
        this.addForm.releaseDayStart = ''
        this.addForm.releaseDayEnd = ''
      }
      if (this.dates1 && this.dates1.length > 0) {
        this.addForm.sailDayStart = this.dates1[0]
        this.addForm.sailDayEnd = this.dates1[1]
      } else {
        this.addForm.sailDayStart = ''
        this.addForm.sailDayEnd = ''
      }
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/copyBill/manualCreateExpenseBill',
        data: {
          ...this.addForm,
          status: type,
          billOptionPayVOs: [...this.billPayableBodyVO.billPayableBodyVOList],
          billOptionReceiveVOs: [...this.billReceivableBodyVO.billReceivableBodyVOList]
        },
        router: this.$router,
        success: res => {
          this.$message({
            type: 'success',
            message: type === '1' ? '提交成功' : '发送成功'
          })
          this.$store.commit('CloseTab', this.$route.name)
          this.$router.push({
            name: 'expense-list',
            query: {
              from: 'other'
            }
          })
        }
      })
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
  .topFlag {
    padding-left: 18px;
    margin-bottom: 20px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #ffc56b;
    background-color: #ffe9c7;
    border-radius: 2px;
    img {
      display:block;
      margin-right: 8px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
</style>
