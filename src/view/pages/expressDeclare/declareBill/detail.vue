<template>
  <section class='sys-main'>
    <!-- 返回按钮 -->
    <el-row>
      <el-col :span='12' :xs='24'>
        <span @click="back" class="sys-back-btn"><i class="back-btn"></i>返回</span>
      </el-col>
      <el-col :span='12' :xs='24'>
        <div style="text-align: right;"><el-button size="mini" type="primary" @click="declare">申报</el-button></div>
      </el-col>
    </el-row>
    <!-- 返回按钮 end-->
    <el-row>
      <div class='query-body'>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="180px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="申报地海关">
                  <el-select v-model="headData.customCode" :disabled="isDetail" placeholder=" "
                    default-first-option remote
                    filterable
                    :remote-method="checkParamsList"
                    @focus="tipsFillMessage('cusCustomsCodeList','SAAS_CUSTOMS_REL')"
                    @change="checkParamsList"
                    clearable style="width:100%" >
                    <el-option
                      v-for="item in cusCustomsCodeList"
                      :key="item.codeField"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="录入单位">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="操作员">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="">
                  <span class="no-input"></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <div class='query-body'>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="180px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="海关编号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预录入号码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="KJ编号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进出口日期">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="进出口标志">
                  <el-select v-model="headData.iEFlag" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in iEFlagList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总运单号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分运单号">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进出口岸代码">
                  <el-select v-model="headData.customCodeA" :disabled="isDetail" placeholder=" "
                    default-first-option remote
                    filterable
                    :remote-method="checkParamsList"
                    @focus="tipsFillMessage('cusCustomsCodeListA','SAAS_CUSTOMS_REL')"
                    @change="checkParamsList"
                    clearable style="width:100%" >
                    <el-option
                      v-for="item in cusCustomsCodeListA"
                      :key="item.codeField"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="报关类别">
                  <el-select v-model="headData.decType" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in decTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报单位类别">
                  <el-select v-model="headData.decUnitType" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in decUnitList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="监管方式">
                  <el-select v-model="headData.tradeMode" :disabled="isDetail" placeholder=" "
                    default-first-option remote
                    filterable
                    :remote-method="checkParamsList"
                    @focus="tipsFillMessage('tradeModeList','SAAS_TRADE')"
                    @change="checkParamsList"
                    clearable style="width:100%" >
                    <el-option
                      v-for="item in tradeModeList"
                      :key="item.codeField"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="指运港(装货港)">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="运输工具名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输工具航次(班)号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式代码">
                  <el-select size="mini" v-model="headData.trafMode" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('trafList','SAAS_TRANSPORT_TYPE')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in trafList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="收发货人编码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发货人名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发货人性质">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="贸易国(地区，起/抵运地)">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('countryList','SAAS_COUNTRY')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in countryList"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="货主单位地区代码">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('districtList','SAAS_DISTRICT_REL')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in districtList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货主单位代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货主单位名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="征免性质分类">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('levyList','SAAS_LEVYMODE')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in levyList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成交方式">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('tranList','SAAS_TRANSAC')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in tranList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="码头/货场代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主要货物名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="包装种类">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('wrapList','SAAS_WRAP')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in wrapList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="运费标记">
                  <el-select v-model="headData.expressMark" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in expressMarkList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('currList','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in currList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费/率">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否含有木质包装">
                  <el-select v-model="headData.isBoone" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in isList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="保险费标记">
                  <el-select v-model="headData.expressMark" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in expressMarkList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保险费币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('currListA','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in currListA"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保险费/率">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否为旧物品">
                  <el-select v-model="headData.isBoone" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in isList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="杂费标记">
                  <el-select v-model="headData.expressMark" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in expressMarkList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="杂费币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('currListB','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in currListB"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="杂费/率">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否为低温运输">
                  <el-select v-model="headData.isBoone" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in isList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="发件人">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发件人电话">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发件人地址">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发件人城市">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="收件人">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收件人电话">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收件人地址">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收件人城市">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="发件人国别">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('countryFList','SAAS_COUNTRY')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in countryFList"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收件人国别">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('countrySList','SAAS_COUNTRY')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in countrySList"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发件人证件类型">
                  <el-select v-model="headData.licenseType" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in licenseTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发件人证件号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="件数">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="毛重">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="净重">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="英文发件人">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文发件人地址">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文发件人城市">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文经停城市">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="英文收件人">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文收件人地址">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('currListC','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in currListC"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主要货物英文名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="no-input form-more-txt">关联编号字段(转出手册、转入转出的报关单)</div>
              </el-col>
              <el-col :span="6">
                <el-input size="mini" class="form-more-input" :disabled="isDetail"></el-input>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报关人员代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收发货人统一社会信用代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="申报单位代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报单位名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报日期">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报单位统一社会信用代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="备注">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货主单位统一社会信用代码">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <div class='query-body'>
        <el-row class="mg-b-15"><div class="express-body-title">商品信息</div></el-row>
        <el-row class="mg-b-15">
          <el-table class='sys-table-table express-table' :data="detailList" border highlight-current-row size="mini">
            <el-table-column label="商品序号" min-width="100">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="商品编号" min-width="130">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" min-width="150">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="商品规格" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="成交币制汇率" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="申报单价" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="产销国" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="成交币制" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="180px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品序号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品编号(税号)">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="征减免方式">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="规格型号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成交币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('currListD','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in currListD"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="成交总价">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="用途">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="申报单价">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报数量">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报总价">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报计量单位">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('unitList','SAAS_UNIT')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in unitList"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="第一(法定)数量">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="第一(法定)计量单位">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('unitListA','SAAS_UNIT')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in unitListA"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="第二数量">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="第二计量单位">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('unitListB','SAAS_UNIT')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in unitListB"
                      :key="item.codeField"
                      :label="item.codeField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品毛重">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产厂商">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产销国">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('countryCList','SAAS_COUNTRY')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in countryCList"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产销城市">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="英文商品名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="">
                  <span class="no-input"></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <div class='query-body'>
        <el-row class="mg-b-15"><div class="express-body-title">随附单据</div></el-row>
        <el-row class="mg-b-15">
          <el-table class='sys-table-table express-table' :data="licenseList" border highlight-current-row size="mini">
            <el-table-column label="编号" min-width="100">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="随附单证代码" min-width="150">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="随附单证编号" min-width="150">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="180px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="编号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随附单证代码">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('licCodeList','SAAS_LICENSEDOCU')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in licCodeList"
                      :key="item.codeField"
                      :label="item.otherField+'-'+item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随附单证编号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="">
                  <span class="no-input"></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </el-row>
  </section>
</template>
<script>
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  data () {
    return {
      isDetail: false, // 是否是详情
      headData: {

      },
      detailList: [],
      licenseList: [],
      iEFlagList: [{
        value: 'I',
        label: '进口'
      }, {
        value: 'E',
        label: '出口'
      }], // 舱单进出口标志
      decTypeList: [{
        value: 'A',
        label: 'A-A'
      }, {
        value: 'B',
        label: 'B-B'
      }, {
        value: 'C',
        label: 'C-C'
      }], // 报关类别
      decUnitList: [{
        value: '0',
        label: '企业'
      }, {
        value: '1',
        label: '自然人'
      }], // 申报单位类别
      expressMarkList: [{
        value: '1',
        label: '1-率'
      }, {
        value: '2',
        label: '2-单价'
      }, {
        value: '3',
        label: '3-总价'
      }], // 运费标记
      isList: [{
        value: '0',
        label: '0-否'
      }, {
        value: '1',
        label: '1-是'
      }], // 是否
      licenseTypeList: [{
        value: '1',
        label: '1-身份证'
      }, {
        value: '2',
        label: '2-护照'
      }, {
        value: '3',
        label: '3-其他'
      }], // 证件类型
      tableNameList: {
        tableNames: [
          'SAAS_CUSTOMS_REL', // 海关关区
          'SAAS_SW_AIRPORT_CODE', // 港口
          'SAAS_TRANSPORT_TYPE', // 运输方式
          'SAAS_CURR', // 币制
          'SAAS_TRADE', // 监管方式
          'SAAS_COUNTRY', // 国家
          'SAAS_DISTRICT_REL', // 地区代码
          'SAAS_LEVYMODE', // 征免方式
          'SAAS_TRANSAC', // 成交方式
          'SAAS_WRAP', // 包装种类
          'SAAS_UNIT', // 计量单位
          'SAAS_LICENSEDOCU' // 随附单证
        ]
      }, // 字典标明
      selectObj: {
        obj: '',
        params: ''
      },
      cusCustomsCodeList: [],
      cusCustomsCodeListA: [],
      tradeModeList: [],
      trafList: [],
      countryList: [],
      districtList: [],
      levyList: [],
      tranList: [],
      wrapList: [],
      currList: [],
      currListA: [],
      currListB: [],
      currListC: [],
      currListD: [],
      countrySList: [],
      countryFList: [],
      unitList: [],
      unitListA: [],
      unitListB: [],
      countryCList: [],
      licCodeList: []
    }
  },
  created () {
    this.getCommonParam()
    if (this.$route.params.type === 'detail') {
      this.isDetail = true
    }
  },
  methods: {
    // 判断缓存中是否有数据
    getCommonParam () {
      let map = {tableNames: []}
      map.tableNames = commonParam.isRequire(this.tableNameList.tableNames)
      if (map.tableNames.length > 0) {
        this.getCommonParams(map)
      } else {
        this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL'))
        this.cusCustomsCodeListA = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL'))
        this.tradeModeList = JSON.parse(window.localStorage.getItem('SAAS_TRADE'))
        this.trafList = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE'))
        this.countryList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
        this.districtList = JSON.parse(window.localStorage.getItem('SAAS_DISTRICT_REL'))
        this.levyList = JSON.parse(window.localStorage.getItem('SAAS_LEVYMODE'))
        this.tranList = JSON.parse(window.localStorage.getItem('SAAS_TRANSAC'))
        this.wrapList = JSON.parse(window.localStorage.getItem('SAAS_WRAP'))
        this.currList = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
        this.currListA = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
        this.currListB = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
        this.currListC = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
        this.currListD = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
        this.countrySList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
        this.countryFList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
        this.unitList = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
        this.unitListA = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
        this.unitListB = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
        this.countryCList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
        this.licCodeList = JSON.parse(window.localStorage.getItem('SAAS_LICENSEDOCU'))
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
          this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL'))
          this.cusCustomsCodeListA = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL'))
          this.tradeModeList = JSON.parse(window.localStorage.getItem('SAAS_TRADE'))
          this.trafList = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE'))
          this.countryList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
          this.districtList = JSON.parse(window.localStorage.getItem('SAAS_DISTRICT_REL'))
          this.levyList = JSON.parse(window.localStorage.getItem('SAAS_LEVYMODE'))
          this.tranList = JSON.parse(window.localStorage.getItem('SAAS_TRANSAC'))
          this.wrapList = JSON.parse(window.localStorage.getItem('SAAS_WRAP'))
          this.currList = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
          this.currListA = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
          this.currListC = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
          this.currListB = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
          this.currListD = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
          this.countrySList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
          this.countryFList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
          this.unitList = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
          this.unitListA = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
          this.unitListB = JSON.parse(window.localStorage.getItem('SAAS_UNIT'))
          this.countryCList = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY'))
          this.licCodeList = JSON.parse(window.localStorage.getItem('SAAS_LICENSEDOCU'))
        }
      })
    },
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    checkParamsList (query) {
      if (query !== '') {
        let keyValue = query.toString().trim()
        let list = JSON.parse(window.localStorage.getItem(this.selectObj.params))
        let filterList = []
        if (util.isEmpty(keyValue)) {
          this[this.selectObj.obj] = list
        } else {
          filterList = list.filter(item => {
            let str = item.codeField + '-' + item.nameField
            return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
          })
          this[this.selectObj.obj] = filterList
        }
      } else {
        if (!util.isEmpty(JSON.parse(window.localStorage.getItem(this.selectObj.params)))) {
          this[this.selectObj.obj] = JSON.parse(window.localStorage.getItem(this.selectObj.params))
        }
      }
    },
    // 申报
    declare () {

    },
    // 返回
    back () {
      this.$router.push({
        name: 'declareBilllList'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sys-back-btn{
  display: inline-block;
  font-size: 13px;
  color: @font-color-main;
  cursor: pointer;
  .back-btn{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background: url('../../../../assets/img/icon/back.png') no-repeat center center;
    background-size: 100%;
    vertical-align: middle;
  }
}
.express-body-title{
  font-size: 16px;
}
.no-input{
  display: inline-block;
}
.form-more-txt{
  width: calc(100% - 9px);
  font-size: 14px;
  color: #606266;
  text-align: right;
  line-height: 28px;
  padding-right: 8px;
  border-right: 1px solid #b7b7b7;
}
.form-more-input{
  border-right: 1px solid #b7b7b7;
  width: calc(100% - 1px);
}
</style>
