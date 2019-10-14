<template>
  <!-- 报关单审核组件 -->
  <section class= 'sys-dec-check sys-dec-class div-scoll'>
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="报关单" name="declare">
      <!-- 表头信息 -->
      <div>
        <el-row class='border-none'>
          <el-col :span="12">
            <span class='title-name'>预录入编号:</span>
            <span class='content-font'>{{decHead.cusCiqNo ? decHead.cusCiqNo : decHead.seqNo}}</span>
          </el-col>
          <el-col :span="12">
            <span class='title-name'>海关编号:</span>
              <span class='content-font span-block'>{{decHead.entryId}}</span>
              <span class='content-font'>{{'(' + decHead.customMasterValue + ')'}}</span>
          </el-col>
        </el-row>
        <table>
          <tr>
            <td  @click="changeHeadColor('tradeCoScc')" :class='colorArr[headColor.tradeCoScc]' width="25%">
              <span v-if = "iEFlag == 'I'" class='title-name'>境内收货人</span>
              <span v-else class='title-name'>境内发货人</span>
              <span class='content-font'>{{"(" + decHead.tradeCoScc + ")"}}</span>
              <p class='content-font'>{{decHead.tradeName}}</p>
            </td>
            <td colspan="2" width="20%" @click="changeHeadColor('iEPort')" :class='colorArr[headColor.iEPort]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>进境关别</span>
              <span v-else class='title-name'>出境关别</span>
              <span class='content-font'>{{"(" + decHead.iEPort + ")"}}</span>
              <p class='content-font'>{{decHead.iEPortValue}}</p>
            </td>
            <td colspan="2" width="20%" @click="changeHeadColor('iEDate')" :class='colorArr[headColor.iEDate]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>进口日期</span>
              <span v-else class='title-name'>出口日期</span>
              <p class='content-font'>{{decHead.iEDate}}</p>
            </td>
            <td  width="15%" @click="changeHeadColor('dDate')" :class='colorArr[headColor.dDate]'>
              <span class='title-name'>申报日期</span>
              <p class='content-font'>{{decHead.dDate}}</p>
            </td>
            <td colspan="2" width="20%" @click="changeHeadColor('manualNo')" :class='colorArr[headColor.manualNo]'>
              <span class='title-name'>备案号</span>
              <p class='content-font'>{{decHead.manualNo}}</p>
            </td>
          </tr>
          <tr>
            <td width="25%" @click="changeHeadColor('overseasConsignorCode')" :class='colorArr[headColor.overseasConsignorCode]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>境外发货人</span>
              <span v-else class='title-name'>境外收货人</span>
              <span v-if = "iEFlag === 'I'">{{"(" + decHead.overseasConsignorCode + ")"}}</span>
              <span v-else>{{"(" + decHead.overseasConsigneeCode + ")"}}</span>
              <p v-if = "iEFlag === 'I'">{{decHead.overseasConsignorEname}}</p>
              <p v-else>{{decHead.overseasConsigneeEname}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('trafMode')" :class='colorArr[headColor.trafMode]'>
              <span class='title-name'>运输方式</span>
              <span class='content-font'>{{"(" + decHead.trafMode + ")"}}</span>
              <p class='content-font'>{{decHead.trafModeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('nameVo')" :class='colorArr[headColor.nameVo]'>
              <span class='title-name'>运输工具名称及航次号</span>
              <p class='content-font'>{{decHead.trafName + '/' + decHead.voyageNo}}</p>
            </td>
            <td colspan="1" v-if = "iEFlag === 'I'" @click="changeHeadColor('billNo')" :class='colorArr[headColor.billNo]'>
              <span class='title-name'>提运单号</span>
              <p class='content-font'>{{decHead.billNo}}</p>
            </td>
            <td colspan="3" v-else @click="changeHeadColor('billNo')" :class='colorArr[headColor.billNo]'>
              <span class='title-name'>提运单号</span>
              <p class='content-font'>{{decHead.billNo}}</p>
            </td>
            <td colspan="2" v-if = "iEFlag === 'I'" @click="changeHeadColor('goodSplace')" :class='colorArr[headColor.goodSplace]'>
              <span class='title-name'>货物存放地点</span>
              <p class='content-font'>{{decHead.goodSplace}}</p>
            </td>
          </tr>
          <tr>
            <td @click="changeHeadColor('ownerCodeScc')" :class='colorArr[headColor.ownerCodeScc]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>消费使用单位</span>
              <span v-else class='title-name'>生产销售单位</span>
              <span class='content-font'>{{"(" + decHead.ownerCodeScc + ")"}}</span>
              <p class='content-font'>{{decHead.ownerName}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('tradeMode')" :class='colorArr[headColor.tradeMode]'>
              <span class='title-name'>监管方式</span>
              <span class='content-font'>{{"(" + decHead.tradeMode + ")"}}</span>
              <p class='content-font'>{{decHead.tradeModeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('cutMode')" :class='colorArr[headColor.cutMode]'>
              <span class='title-name'>征免性质</span>
              <span class='content-font'>{{"("+ decHead.cutMode + ")"}}</span>
              <p class='content-font'>{{decHead.cutModeValue}}</p>
            </td>
            <td colspan="1" v-if = "iEFlag === 'I'" @click="changeHeadColor('licenseNo')" :class='colorArr[headColor.licenseNo]'>
              <span class='title-name'>许可证号</span>
              <p class='content-font'>{{decHead.licenseNo}}</p>
            </td>
            <td colspan="3" v-else @click="changeHeadColor('licenseNo')" :class='colorArr[headColor.licenseNo]'>
              <span class='title-name'>许可证号</span>
              <p class='content-font'>{{decHead.licenseNo}}</p>
            </td>
            <td colspan="2" v-if = "iEFlag === 'I'" @click="changeHeadColor('despPortCode')" :class='colorArr[headColor.despPortCode]'>
              <span class='title-name'>启运港</span>
              <span class='content-font'>{{"("+ decHead.despPortCode + ")"}}</span>
              <p class='content-font'>{{decHead.despPortCodeValue}}</p>
            </td>
          </tr>
          <tr>
            <td @click="changeHeadColor('contrNo')" :class='colorArr[headColor.contrNo]'>
              <span class='title-name'>合同协议号</span>
              <p class='content-font'>{{decHead.contrNo}}</p>
            </td>
            <td colspan="2"  @click="changeHeadColor('tradeAreaCode')" :class='colorArr[headColor.tradeAreaCode]'>
              <span class='title-name'>贸易国别(地区)</span>
              <span class='content-font'>{{"(" + decHead.tradeAreaCode + ")"}}</span>
              <p class='content-font'>{{decHead.tradeAreaCodeValue}}</p>
            </td>
            <td colspan="2"  @click="changeHeadColor('tradeCountry')" :class='colorArr[headColor.tradeCountry]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>启运国(地区)</span>
              <span v-else class='title-name'>运抵国(地区)</span>
              <span class='content-font'>{{"(" + decHead.tradeCountry + ")"}}</span>
              <p class='content-font'>{{decHead.tradeCountryValue}}</p>
            </td>
            <td colspan="1"  @click="changeHeadColor('distinatePort')" :class='colorArr[headColor.distinatePort]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>经停港</span>
              <span v-else class='title-name'>指运港</span>
              <span class='content-font'>{{"(" + decHead.distinatePort + ")"}}</span>
              <p class='content-font'>{{decHead.distinatePortValue}}</p>
            </td>
            <td colspan="2"  @click="changeHeadColor('entyPortCode')" :class='colorArr[headColor.entyPortCode]'>
              <span v-if = "iEFlag === 'I'" class='title-name'>入境口岸</span>
              <span v-else class='title-name'>离境口岸</span>
              <span class='content-font'>{{"(" + decHead.entyPortCode + ")"}}</span>
              <p class='content-font'>{{decHead.entyPortCodeValue}}</p>
            </td>
          </tr>
          <tr>
            <td @click="changeHeadColor('wrapType')" :class='colorArr[headColor.wrapType]'>
              <span class='title-name'>包装种类</span>
              <span class='content-font'>{{"(" + decHead.wrapType + ")" }}</span>
              <p class='content-font'>{{decHead.wrapTypeValue}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('packNo')" :class='colorArr[headColor.packNo]'>
              <span class='title-name'>件数</span>
              <p class='content-font'>{{decHead.packNo}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('grossWt')" :class='colorArr[headColor.grossWt]'>
              <span class='title-name'>毛重（千克）</span>
              <p class='content-font'>{{decHead.grossWt}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('netWt')" :class='colorArr[headColor.netWt]'>
              <span class='title-name'>净重（千克）</span>
              <p class='content-font'>{{decHead.netWt}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('transMode')" :class='colorArr[headColor.transMode]'>
              <span class='title-name'>成交方式</span>
              <span class='content-font'>{{"(" + decHead.transMode + ")"}}</span>
              <p class='content-font'>{{decHead.transModeValue}}</p>
            </td>
            <td @click="changeHeadColor('feeMark')" :class='colorArr[headColor.feeMark]'>
              <span class='title-name'>运费</span>
              <p class='content-font'>{{decHead.feeCurr + '/' + decHead.feeRate + '/' +decHead.feeMark}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('insurMark')" :class='colorArr[headColor.insurMark]'>
              <span class='title-name'>保费</span>
              <p class='content-font'>{{decHead.insurCurr + '/' + decHead.insurRate + '/' +decHead.insurMark}}</p>
            </td>
            <td width= "10%" @click="changeHeadColor('otherMark')" :class='colorArr[headColor.otherMark]'>
              <span class='title-name'>杂费</span>
              <p class='content-font'>{{decHead.otherCurr + '/' + decHead.otherRate + '/' +decHead.otherMark}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="14" @click="changeHeadColor('docuAndcertCode')" :class='colorArr[headColor.docuAndcertCode]'>
              <span class='title-name'>随附单证及编号</span>
              <p class='content-font'>{{decOther.docuAndcertCode}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="14" @click="changeHeadColor('note')" :class='colorArr[headColor.note]'>
              <span class='title-name'>标记唛码及备注</span>
              <p class='content-font'>{{decOther.note}}</p>
            </td>
          </tr>
        </table>
      </div>
      <!-- 报关单 列表 -->
      <div>
        <el-table class='sys-table-table dec-table'
        ref='deCheckTable' :data="deCheckList"
        height="250"
        :cell-class-name="deCellClass"
        @row-click='deCheckRowClick'
        border highlight-current-row size="mini">
          <el-table-column label="项号" prop="gNoAllColor" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.gNo}}</span><br>
              <span>{{scope.row.contrItem}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="codeTsColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.codeTs}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称及规格型号" prop="gNameAndModelColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.gName}}</span><br>
              <span>{{scope.row.gModel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量及单位" prop="gQtyAndUnitColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.gQty + scope.row.gUnitValue}}</span><br>
              <span>{{scope.row.qty1 + scope.row.unit1Value}}</span><br>
              <span>{{scope.row.qty2 + scope.row.unit2Value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价/总价/币制" prop="priceAndTotalColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.declPrice}}</span><br>
              <span>{{scope.row.declTotal}}</span><br>
              <span>{{scope.row.tradeCurrValue}}</span>
            </template>
          </el-table-column>
          <el-table-column label="原产国（地区）" prop="originCountryColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.originCountryValue}}</span><br>
              <span>{{scope.row.originCountry}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最终目的国（地区）" prop="destinationCountryColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.destinationCountryValue}}</span><br>
              <span>{{scope.row.destinationCountry}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150" prop="districtCodeAndColor" :label="iEFlag == 'I' ? '境内目的地':'境内货源地'">
            <template slot-scope="scope">
              <span>{{scope.row.districtCode + scope.row.districtCodeValue + '/' + scope.row.destCodeValue}}</span><br>
            </template>
          </el-table-column>
          <el-table-column label="征免" prop="dutyModeColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.dutyModeValue}}</span><br>
              <span>{{scope.row.dutyMode}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表体展示 -->
      <div>
        <div class='check-div'>
          <span class='title-name'>tips:</span>
          <span class='content-font'>{{decOther.statistics}}</span>
        </div>
        <table>
          <tr>
            <td  width='10%'>
              <span class='title-name'>项号</span>
            </td>
            <td  width='10%' @click="changeBodyColor('gNo')" :class='colorArr[decList.gNoColor]'>
              <span class='content-font'>{{decList.gNo}}</span>
            </td>
            <td  width='10%'>
              <span class='title-name'>备案序号</span>
            </td>
            <td  width='10%' @click="changeBodyColor('contrItem')" :class='colorArr[decList.contrItemColor]'>
              <span class='content-font'>{{decList.contrItem}}</span>
            </td>
            <td  width='10%'>
              <span class='title-name'>商品编号</span>
            </td>
            <td  width='10%' @click="changeBodyColor('codeTs')" :class='colorArr[decList.codeTsColor]'>
              <span class='content-font'>{{decList.codeTs}}</span>
            </td>
            <td  width='10%'>
              <span class='title-name'>检验检疫名称</span>
            </td>
            <td  colspan = '3' width='30%'  @click="changeBodyColor('ciqName')" :class='colorArr[decList.ciqNameColor]'>
              <span class='content-font'>{{decList.ciqName}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>商品名称</span>
            </td>
            <td colspan="5" @click="changeBodyColor('gName')" :class='colorArr[decList.gNameColor]'>
              <span class='content-font'>{{decList.gName}}</span>
            </td>
            <td >
              <span class='title-name'>规格型号</span>
            </td>
            <td colspan="5" @click="changeBodyColor('gModel')" :class='colorArr[decList.gModelColor]'>
              <span class='content-font'>{{decList.gModel}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>成交数量</span>
            </td>
            <td  @click="changeBodyColor('gQty')" :class='colorArr[decList.gQtyColor]'>
              <span class='content-font'>{{decList.gQty}}</span>
            </td>
            <td >
              <span class='title-name'>成交计量单位</span>
            </td>
            <td @click="changeBodyColor('gUnit')" :class='colorArr[decList.gUnitColor]'>
              <span class='content-font'>{{decList.gUnitValue}}</span>
            </td>
            <td >
              <span class='title-name'>单价</span>
            </td>
            <td @click="changeBodyColor('declPrice')" :class='colorArr[decList.declPriceColor]'>
              <span class='content-font'>{{decList.declPrice}}</span>
            </td>
            <td  width='10%'>
              <span class='title-name'>总价</span>
            </td>
            <td  width='10%' @click="changeBodyColor('declTotal')" :class='colorArr[decList.declTotalColor]'>
              <span class='content-font'>{{decList.declTotal}}</span>
            </td>
            <td  width='10%'>
              <span class='title-name'>币制</span>
            </td>
            <td width='10%' @click="changeBodyColor('tradeCurr')" :class='colorArr[decList.tradeCurrColor]'>
              <span class='content-font'>{{decList.tradeCurrValue}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>法定第一数量</span>
            </td>
            <td  @click="changeBodyColor('qty1')" :class='colorArr[decList.qty1Color]'>
              <span class='content-font'>{{decList.qty1}}</span>
            </td>
            <td >
              <span class='title-name'>法定第一计量单位</span>
            </td>
            <td @click="changeBodyColor('unit1')" :class='colorArr[decList.unit1Color]'>
              <span class='content-font'>{{decList.unit1Value}}</span>
            </td>
            <td >
              <span class='title-name'>加工成品单耗版本号</span>
            </td>
            <td @click="changeBodyColor('exgVersion')" :class='colorArr[decList.exgVersionColor]'>
              <span class='content-font'>{{decList.exgVersion}}</span>
            </td>
            <td >
              <span class='title-name'>货号</span>
            </td>
            <td @click="changeBodyColor('exgNo')" :class='colorArr[decList.exgNoColor]'>
              <span class='content-font'>{{decList.exgNo}}</span>
            </td>
            <td >
              <span class='title-name'>最终目的国（地区）</span>
            </td>
            <td @click="changeBodyColor('destinationCountry')" :class='colorArr[decList.destinationCountryColor]'>
              <span class='content-font'>{{decList.destinationCountryValue}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>法定第二数量</span>
            </td>
            <td @click="changeBodyColor('qty2')" :class='colorArr[decList.qty2Color]'>
              <span class='content-font'>{{decList.qty2}}</span>
            </td>
            <td >
              <span class='title-name'>法定第二计量单位</span>
            </td>
            <td @click="changeBodyColor('unit2')" :class='colorArr[decList.unit2Color]'>
              <span class='content-font'>{{decList.unit2Value}}</span>
            </td>
            <td >
              <span class='title-name'>原产国（地区）</span>
            </td>
            <td @click="changeBodyColor('originCountry')" :class='colorArr[decList.originCountryColor]'>
              <span class='content-font'>{{decList.originCountryValue}}</span>
            </td>
            <td >
              <span class='title-name'>{{iEFlag == 'I' ? '境内目的地':'境内货源地'}}</span>
            </td>
            <td colspan="2" @click="changeBodyColor('districtCode')" :class='colorArr[decList.districtCodeColor]'>
              <span class='content-font'>{{decList.districtCodeValue}}</span>
            </td>
            <td  @click="changeBodyColor('destCode')" :class='colorArr[decList.destCodeColor]'>
              <span class='content-font'>{{decList.destCodeValue}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>征免方式</span>
            </td>
            <td colspan="9" @click="changeBodyColor('dutyMode')" :class='colorArr[decList.dutyModeColor]'>
              <span class='content-font'>{{decList.dutyModeValue}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" @click="changeHeadColor('promiseItem1')" :class='colorArr[headColor.promiseItem1]'>
              <span class='title-name'>特殊关系确认:</span>
              <span class='content-font'>{{decOther.promiseItem1}}</span>
            </td>
            <td colspan="2" @click="changeHeadColor('promiseItem2')" :class='colorArr[headColor.promiseItem2]'>
              <span class='title-name'>价格影响确认:</span>
              <span class='content-font'>{{decOther.promiseItem2}}</span>
            </td>
            <td colspan="3" @click="changeHeadColor('promiseItem3')" :class='colorArr[headColor.promiseItem3]'>
              <span class='title-name'>支付特许权使用费确认:</span>
              <span class='content-font'>{{decOther.promiseItem3}}</span>
            </td>
            <td colspan="2" @click="changeHeadColor('chkPayment')" :class='colorArr[headColor.chkPayment]'>
              <span class='title-name'>自报自缴:</span>
              <span class='content-font'>{{decHead.chkPayment == '1' ? '是' : '否'}}</span>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>审批意见</span>
            </td>
            <td colspan="9">
              <el-input v-model="headColor.auditOpinion"></el-input>
            </td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="商检单" name="inspection">
       <!-- 表头信息 -->
      <div v-if = "iEFlag == 'I'">
        <table>
          <tr>
            <td colspan="2" @click="changeHeadColor('orgCode')" :class='colorArr[headColor.orgCode]'>
              <span class='title-name'>检验检疫受理机关</span>
              <span class='content-font'>{{"(" + decHead.orgCode + ")"}}</span>
              <p class='content-font'>{{decHead.orgCodeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('vsaOrgCode')" :class='colorArr[headColor.vsaOrgCode]'>
              <span  class='title-name'>领证机关</span>
              <span class='content-font'>{{"(" + decHead.vsaOrgCode + ")"}}</span>
              <p class='content-font'>{{decHead.vsaOrgCodeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('inspOrgCode')" :class='colorArr[headColor.inspOrgCode]'>
              <span class='title-name'>口岸检验检疫机关</span>
              <span class='content-font'>{{"(" + decHead.inspOrgCode + ")"}}</span>
              <p class='content-font'>{{decHead.inspOrgCodeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('despDate')" :class='colorArr[headColor.despDate]'>
              <span class='title-name'>启运日期</span>
              <p class='content-font'>{{decHead.despDate}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('blno')" :class='colorArr[headColor.blno]'>
              <span class='title-name'>B/L号</span>
              <p class='content-font'>{{decHead.blno}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan = '2' @click="changeHeadColor('purpOrgCode')" :class='colorArr[headColor.purpOrgCode]'>
              <span class='title-name'>目的地检验检疫机关</span>
              <span class='content-font'>{{"(" + decHead.purpOrgCode + ")"}}</span>
              <p  class='content-font'>{{decHead.purpOrgCodeValue}}</p>
            </td>
            <td colspan="4" rowspan = '2' @click="changeHeadColor('correlationaNo')" :class='colorArr[headColor.correlationaNo]'>
              <span class='title-name'>关联号码及理由</span>
              <span class='content-font'>{{"(" + decHead.correlationaNo + ")"}}</span>
              <p class='content-font'>{{decHead.correlationReasonFlag + '/' + decHead.correlationReasonFlagValue}}</p>
            </td>
            <td colspan="4" @click="changeHeadColor('origBoxFlag')" :class='colorArr[headColor.origBoxFlag]'>
              <span class='title-name'>原箱运输</span>
              <span class='content-font'>{{"(" + decHead.origBoxFlag + ")"}}</span>
              <p class='content-font'>{{decHead.origBoxFlag == '0' ? '否' : '是'}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="4" @click="changeHeadColor('specialFlag')" :class='colorArr[headColor.specialFlag]'>
              <span class='title-name'>特殊业务标识</span>
              <span class='content-font'>{{decOther.specialFlag}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="10" @click="changeHeadColor('companyCer')" :class='colorArr[headColor.companyCer]'>
              <span class='title-name'>企业资质</span>
              <p class='content-font'>{{decOther.companyCer}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="10" @click="changeHeadColor('userInfo')" :class='colorArr[headColor.userInfo]'>
              <span class='title-name'>使用人</span>
              <p class='content-font'>{{decOther.userInfo}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="10" @click="changeHeadColor('inspDecElem')" :class='colorArr[headColor.inspDecElem]'>
              <span class='title-name'>检验检疫签证申报要素</span>
              <p class='content-font'>{{decOther.inspDecElem}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="5" @click="changeHeadColor('domesticConsigneeEname')" :class='colorArr[headColor.domesticConsigneeEname]'>
              <span class='title-name'>境内收发货人名称(外文)</span>
              <span class='content-font'>{{decHead.domesticConsigneeEname}}</span>
            </td>
            <td colspan="5" @click="changeHeadColor('overseasConsignorCname')" :class='colorArr[headColor.overseasConsignorCname]'>
              <span class='title-name'>境外收发货人名称(中文)</span>
              <span class='content-font'>{{decHead.overseasConsignorCname}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="5" @click="changeHeadColor('overseasConsignorAddr')" :class='colorArr[headColor.overseasConsignorAddr]'>
              <span class='title-name'>境外发货人地址</span>
              <span class='content-font'>{{decHead.overseasConsignorAddr}}</span>
            </td>
            <td colspan="5" @click="changeHeadColor('cmplDschrgDt')" :class='colorArr[headColor.cmplDschrgDt]'>
              <span class='title-name'>卸毕日期</span>
              <p class='content-font'>{{decHead.cmplDschrgDt}}</p>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <table>
          <tr>
            <td colspan="2" @click="changeHeadColor('orgCode')" :class='colorArr[headColor.orgCode]'>
              <span class='title-name'>检验检疫受理机关</span>
              <span class='content-font'>{{"(" + decHead.orgCode + ")"}}</span>
              <p class='content-font'>{{decHead.orgCodeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('vsaOrgCode')" :class='colorArr[headColor.vsaOrgCode]'>
              <span  class='title-name'>领证机关</span>
              <span class='content-font'>{{"(" + decHead.vsaOrgCode + ")"}}</span>
              <p class='content-font'>{{decHead.vsaOrgCodeValue}}</p>
            </td>
            <td colspan="2" @click="changeHeadColor('inspOrgCode')" :class='colorArr[headColor.inspOrgCode]'>
              <span class='title-name'>口岸检验检疫机关</span>
              <span class='content-font'>{{"(" + decHead.inspOrgCode + ")"}}</span>
              <p class='content-font'>{{decHead.inspOrgCodeValue}}</p>
            </td>
             <td colspan="2" @click="changeHeadColor('purpOrgCode')" :class='colorArr[headColor.purpOrgCode]'>
              <span class='title-name'>目的地检验检疫机关</span>
              <span class='content-font'>{{"(" + decHead.purpOrgCode + ")"}}</span>
              <p class='content-font' >{{decHead.purpOrgCodeValue}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="4" @click="changeHeadColor('correlationaNo')" :class='colorArr[headColor.correlationaNo]'>
              <span class='title-name'>关联号码及理由</span>
              <span class='content-font'>{{"(" + decHead.correlationaNo + ")"}}</span>
              <p class='content-font'>{{decHead.correlationReasonFlag + '/' + decHead.correlationReasonFlagValue}}</p>
            </td>
            <td colspan="4"  @click="changeHeadColor('specialFlag')" :class='colorArr[headColor.specialFlag]'>
              <span class='title-name'>特殊业务标识</span>
              <span class='content-font'>{{decOther.specialFlag}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="10"  @click="changeHeadColor('companyCer')" :class='colorArr[headColor.companyCer]'>
              <span class='title-name'>企业资质</span>
              <p class='content-font'>{{decOther.companyCer}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="4" @click="changeHeadColor('inspDecElem')" :class='colorArr[headColor.inspDecElem]'>
              <span class='title-name'>检验检疫签证申报要素</span>
              <p class='content-font'>{{decOther.inspDecElem}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="5"  @click="changeHeadColor('domesticConsigneeEname')" :class='colorArr[headColor.domesticConsigneeEname]'>
              <span class='title-name'>境内收发货人名称(外文)</span>
              <span class='content-font'>{{decHead.domesticConsigneeEname}}</span>
            </td>
            <td colspan="5"  @click="changeHeadColor('overseasConsignorCname')" :class='colorArr[headColor.overseasConsignorCname]'>
              <span class='title-name'>境外收发货人名称(中文)</span>
              <p class='content-font'>{{decHead.overseasConsignorCname}}</p>
            </td>
          </tr>
        </table>
      </div>
      <!-- 商检列表 -->
      <div class="div-class">
        <el-table class='sys-table-table dec-table'
        ref='deCheckTable' :data="deCheckList"
        height="250"
        @cell-click = 'deCellClcik'
        :cell-class-name="deCellClass"
        border highlight-current-row size="mini">
          <el-table-column label="项号" prop="gNoColor" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.gNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="codeTsColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.codeTs}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="gNameColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.gName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验检疫编码及名称" prop="ciqCodeColor" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.ciqCode}}</span><br>
              <span>{{scope.row.ciqName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验检疫货物规格" prop="goodsSpecColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.showGoodsSpec}}</span>
            </template>
          </el-table-column>
          <el-table-column label="货物属性" prop="showGoodsAttrValueColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.showGoodsAttrValue}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用途" prop="purposeColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.purpose}}</span><br>
              <span>{{scope.row.purposeValue}}</span>
            </template>
          </el-table-column>
          <el-table-column label="许可证类别及编号" prop="licenseTypeNoColor" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.licenseTypeNo}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150" prop="dangerGoodsInfoColor" label="危险货物信息">
            <template slot-scope="scope">
              <span>{{scope.row.dangerGoodsInfo}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <table>
        <tr>
          <td width="10%">
            <span class='title-name'>审批意见</span>
          </td>
          <td width="90%">
            <el-input v-model="headColor.auditOpinion"></el-input>
          </td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="商品附加页" name="goods">
      <div>
        <el-row class='border-none'>
          <el-col :span="12">
            <span class='title-name'>统一编号:</span>
            <span class='content-font'>{{decHead.cusCiqNo ? decHead.cusCiqNo : decHead.seqNo}}</span>
          </el-col>
          <el-col :span="12">
            <span class='title-name'>海关编号:</span>
              <span class='content-font span-block'>{{decHead.entryId}}</span>
              <span class='content-font'>{{'(' + decHead.customMasterValue + ')'}}</span>
          </el-col>
        </el-row>
        <table>
          <tr>
            <td colspan="3" @click="changeHeadColor('goodsNote')" :class='colorArr[headColor.goodsNote]'>
              <span class='title-name'>备注:</span>
              <span class='content-font'>{{decHead.noteS + decHead.markNo}}</span>
            </td>
          </tr>
          <tr v-if = "iEFlag == 'I'">
            <td  @click="changeHeadColor('purpose')" :class='colorArr[headColor.purpose]' width="33%">
              <span class='title-name'>用途:</span>
              <span class='content-font'>{{ '(' + decOther.purpose + ')'}}</span>
              <span class='content-font'>{{decOther.purposeValue}}</span>
            </td>
            <td  @click="changeHeadColor('cmplDschrgDt')" :class='colorArr[headColor.cmplDschrgDt]' width="33%">
              <span class='title-name'>卸毕日期:</span>
              <span class='content-font'>{{decHead.cmplDschrgDt}}</span>
            </td>
            <td @click="changeHeadColor('blno')" :class='colorArr[headColor.blno]' width="34%">
              <span class='title-name'>B/L号:</span>
              <span class='content-font'>{{decHead.blno}}</span>
            </td>
          </tr>
          <tr v-else>
            <td  @click="changeHeadColor('purpose')" :class='colorArr[headColor.purpose]' width="33%">
              <span class='title-name'>用途:</span>
              <span class='content-font'>{{ '(' + decOther.purpose + ')'}}</span>
              <span class='content-font'>{{decOther.purposeValue}}</span>
            </td>
            <td colspan="2"  @click="changeHeadColor('blno')" :class='colorArr[headColor.blno]' width="67%">
              <span class='title-name'>B/L号</span>
              <span class='content-font'>{{decHead.blno}}</span>
            </td>
          </tr>
          <tr >
            <td colspan="3"  @click="changeHeadColor('approveNo')" :class='colorArr[headColor.approveNo]'>
              <span class='title-name'>许可证/审批号:</span>
              <span class='content-font'>{{decOther.approveNo}}</span>
            </td>
          </tr>
          <tr >
            <td colspan="3"  @click="changeHeadColor('originRelation')" :class='colorArr[headColor.originRelation]'>
              <span class='title-name'>原产地对应关系:</span>
              <span class='content-font'>{{decOther.originRelation}}</span>
            </td>
          </tr>
          <tr>
            <td  @click="changeHeadColor('billNo')" :class='colorArr[headColor.billNo]'>
              <span class='title-name'>提单号:</span>
              <span class='content-font'>{{decHead.billNo}}</span>
            </td>
            <td @click="changeHeadColor('voyageNo')" :class='colorArr[headColor.voyageNo]'>
              <span class='title-name'>航次号:</span>
              <span class='content-font'>{{decHead.voyageNo}}</span>
            </td>
            <td  @click="changeHeadColor('trafName')" :class='colorArr[headColor.trafName]'>
              <span class='title-name'>运输工具名称:</span>
              <span class='content-font'>{{decHead.trafName}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class='tips'>
        <span class='title-name'>tips: 总价</span>
        <span class='content-font'>{{decOther.totalPrice}}</span>
        <span class='title-name'>,成交数量合计</span>
        <span class='content-font'>{{decOther.gQtyTotal}}</span>
        <span class='title-name'>法定数量合计</span>
        <span class='content-font'>{{decOther.gQty1Total}}</span>
        <span class='title-name'>第二数量合计</span>
        <span class='content-font'>{{decOther.gQty2Total}}</span>
      </div>
      <div>
        <el-table class='sys-table-table dec-table'
        ref='goodsTable' :data="deCheckList"
        height="250"
        @cell-click = 'deCellClcik'
        :cell-class-name="deCellClass"
        border highlight-current-row size="mini">
          <el-table-column label="项号" prop="gNoColor" min-width="80">
            <template slot-scope="scope">
                <span>{{scope.row.gNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="codeTsColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.codeTs}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称、规格型号" prop="gNameAndModelColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.gName}}</span><br>
              <span>{{scope.row.gModel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量及单位" prop="gQtyAndUnitColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.gQty + scope.row.gUnitValue}}</span><br>
              <span>{{scope.row.qty1 + scope.row.unit1Value}}</span><br>
              <span>{{scope.row.qty2 + scope.row.unit2Value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最终目的国（地区）" prop="destinationCountryColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.destinationCountryValue}}</span><br>
              <span>{{scope.row.destinationCountry}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="declPriceColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.declPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总价" prop="declTotalColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.declTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="币制" prop="tradeCurrColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <span>{{scope.row.tradeCurrValue}}</span><br>
              <span>{{scope.row.tradeCurr}}</span>
            </template>
          </el-table-column>
          <el-table-column label="征免" prop="dutyModeColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.dutyModeValue}}</span><br>
              <span>{{scope.row.dutyMode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="版本号" prop="exgVersionColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.exgVersion}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <table>
        <tr>
          <td width="10%">
            <span class='title-name'>审批意见</span>
          </td>
          <td width="90%">
            <el-input v-model="headColor.auditOpinion"></el-input>
          </td>
        </tr>
      </table>
    </el-tab-pane>
  </el-tabs>
    <div slot="footer"  class="sys-dialog-footer text-center">
      <el-button class='dialog-primary-btn' @click="checkReject" v-show="operationType == 'edit'">审核驳回</el-button>
      <el-button class='dialog-primary-btn' @click="checkPassed"  v-show="operationType == 'edit'">审核通过</el-button>
    </div>
  </section>
</template>

<script>
import util from '@/common/util'
export default {
  name: 'declare-check',
  props: {
    initParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      extraNote: '',
      colorArr: ['c1', 'c2', 'c3'],
      deCheckList: [], // 报关单表体数据
      iEFlag: '', // 进出口标识 // 处理特殊的反填
      operationType: '',
      activeName: 'declare',
      decHead: {
        preEntryId: '', // 预录入编号
        bossId: '', // 关联编号(台账编号)
        clientSeqno: '', // 客户端报关单编号
        seqNo: '', // 统一编号
        cusCiqNo: '', // 关检关联号
        entryId: '', // 海关编号
        agentCode: '', // 申报单位海关代码
        agentCodeScc: '', // 申报单位信用代码
        agentName: '', // 申报单位名称
        billNo: '', // 提单号
        blno: '', // B/L号提货单号
        bonNo: '', // 保税/监管场地
        chkBond: '', // 自主报税
        chkPayment: '', // 自报自缴
        chkSurety: '', // 担保验放
        chkTax: '', // 税单无纸化
        chkOther: '', // 水运中转
        cmplDschrgDt: '', // 卸毕日期
        consigneeCode: '', // 境内收发货人10位检验检疫编码
        contrNo: '', // 合同协议号
        correlationReasonFlag: '', // 关联理由
        correlationReasonFlagValue: '', // 关联理由中文
        correlationaNo: '', // 关联号码
        cusFie: '', // 场地代码
        customMaster: '', // 申报地海关
        customMasterValue: '', // 申报地海关名称
        cutMode: '', // 征免性质
        cutModeValue: '', // cutModeValue
        decCopLimits: [], // 企业资质
        decDecUsers: [], // 使用人
        decEdocRealations: [], // 随附单据
        decMarkLobs: [], // 标记号码 标记唛码附件
        decRequestCerts: [], // 所需单证
        decSign: {}, // 标签签名
        declRegNo: '', // 申报单位10位检验检疫编码
        despDate: '', // 启运日期
        dDate: '', // 申报日期
        despPortCode: '', // 启运港代码
        despPortCodeValue: '', // 启运港名称
        distinatePort: '', // 经停港/指运港
        distinatePortValue: '', // 经停港/指运港名称
        domesticConsigneeEname: '', // 境内收货人名称（外文）
        entryType: '', // 报关单类型
        entyPortCode: '', // 入境/离境口岸代码
        entyPortCodeValue: '', // 入境/离境口岸名称
        feeCurr: '', // 运费币制
        feeMark: '', // 运费类型
        feeRate: '', // 运费
        goodSplace: '', // 存放地点
        grossWt: '', // 毛重
        iEDate: '', // 进出口日期
        iEFlag: '', // 进出口标识
        iEPort: '', // 进出境关别
        iEPortValue: '', // 进出境关别名称
        inspOrgCode: '', // 口岸检验检疫机关
        insurCurr: '', // 保费币制
        insurMark: '', // 保费类型
        insurRate: '', // 保费
        licenseNo: '', // 许可证号
        manualNo: '', // 备案号
        markNo: '', // 标记唛码
        netWt: '', // 净重
        noteS: '', // 备注
        orgCode: '', // 检验检疫受理机关
        origBoxFlag: '', // 原集装箱标识
        otherCurr: '', // 杂费币制
        otherMark: '', // 杂费类型
        otherRate: '', // 杂费
        otherPacks: [], // 其他包装
        overseasConsigneeCname: '', // 境外收货人名称(中文)
        overseasConsigneeEname: '',
        overseasConsignorAddr: '', // 境外发货人地址
        overseasConsignorCode: '', // 境外发货人代码
        overseasConsignorEname: '', // 境外发货人名称（外文）
        ownerCiqCode: '', // 消费使用单位10位检验检疫编码
        ownerCode: '', // 消费使用单位海关十位
        ownerCodeScc: '', // 消费生产使用单位信用代码
        ownerName: '', // 消费使用单位名称
        packNo: '', // 件数
        promiseItmes: '', // 其他事项确认
        purpOrgCode: '', // 目的地检验检疫机关
        relId: '', // 关联报关单号
        relManno: '', // 关联备案号
        specDeclFlag: '', // 特种业务标识
        specDeclFlag2: '', // 特种业务标识(直通放行、外交礼遇、转关)
        decPid: '', // 报关单主键
        tradeAreaCode: '', // 贸易国(地区)
        tradeAreaCodeValue: '', // 贸易国(地区)名称
        tradeCoScc: '', // 境内收发货人统一社会代码
        tradeCode: '', // 境内收发货人海关十位
        tradeCountry: '', // 启运国（地区）/运抵国（地区）
        tradeCountryValue: '', // 启运国（地区）/运抵国（地区）名称
        tradeMode: '', // 监管方式
        tradeModeValue: '', // 监管方式名称
        tradeName: '', // 境内收发货人名称
        trafMode: '', // 运输方式代码
        trafModeValue: '', // 运输方式代码名称
        trafName: '', // 运输工具代码名称
        transMode: '', // 成交方式
        transModeValue: '', // 成交方式名称
        voyageNo: '', // 航次号
        voyageNoValue: '', // 航次号名称
        vsaOrgCode: '', // 领证机关
        wrapType: '', // 包装种类
        wrapTypeValue: '', // 包装种类名称
        status: '', // 报关单状态
        statusValue: '', // 报关单状态名称
        gEnName: '', // 商品英文名称
        remarkInfo: '', // 附注
        declTrnrel: '', // 报关/转关关系标志
        billtype: '' // 备案清单类型
      },
      decList: {
        decListPid: '', // 表体主键
        decPid: '', // 报关单主键
        ciqName: '', // 检验检疫名称
        codeTs: '', // 商品编码
        contrItem: '', // 备案序号
        dangName: '', // 危险货物名称
        dangPackSpec: '', // 危包规格
        dangPackType: '', // 危包类别
        decGoodsLimits: [], // 产品资质
        declPrice: '', // 单价
        declTotal: '', // 总价
        destCode: '', // 目的地代码
        destinationCountry: '', // 最终目的国（地区）
        districtCode: '', // 最终目的国（地区）名称
        dutyMode: '', // 征减免税方式
        engManentCnm: '', // 境外生产企业名称
        exgNo: '', // 货号
        exgVersion: '', // 版本号
        gModel: '', // 规格型号
        controlMa: '', // 监管要求
        gName: '', // 商品名称
        gNo: '', // 项号
        gQty: '', // 成交数量
        gUnit: '', // 成交计量单位
        gUnitValue: '', // 成交计量单位名称
        goodsAttr: '', // 货物属性 code
        goodsBrand: '', // 货物品牌
        goodsModel: '', // 货物型号
        stuffNote: '', // 成分/原料/组分
        goodsSpec: '', // 货物规格
        noDangFlag: '', // 非危险化学品
        origPlaceCode: '', // 原产地区代码
        originCountry: '', // 原产国
        originCountryValue: '', // 原产国名称
        prodBatchNo: '', // 生产批号
        mnufctrRegNo: '', // 生产单位代码
        prodQgp: '', // 产品保质期
        prodValidDt: '', // 产品有效期
        produceDate: '', // 生产日期
        purpose: '', // 用途
        qty1: '', // 法定第一数量
        qty2: '', // 法定第二数量
        tradeCurr: '', // 币制
        tradeCurrValue: '', // 币制名称
        unCode: '', // N编码
        unit1Value: '', // 法定第一计量单位名称
        unit1: '', // 法定第一计量单位
        unit2: '', // 法定第二计量单位
        unit2Value: '', // 法定第二计量单位名称
        decSupplements: [], // 补充申报
        declGoodsEname: '', // 申报货物名称（外文）
        ciqCode: '', // CIQ代码
        showGoodsSpec: '', // 检验检疫货物规格
        showGoodsAttrValue: '', // 货物属性
        licenseTypeNo: '', // 许可证类别及编号
        dangerGoodsInfo: '' // 危险货物信息
      }, // 表体数据
      licenses: [], // 随附单证
      decOther: { // 处理特殊的反填
        promiseItem1: '',
        promiseItem2: '',
        promiseItem3: '',
        note: '', // 标记唛码及备注
        specialFlag: '', // 特殊业务标识
        companyCer: '', // 企业资质
        userInfo: '', // 使用人
        inspDecElem: '', // 检验检疫签证申报要素
        purpose: '', // 用途
        purposeValue: '', // 用途中文名
        originRelation: '', // 原产地对应关系
        approveNo: '', // 许可证/审批号
        totalPrice: '', // 总价
        gQtyTotal: '', // 成交数量合计
        gQty1Total: '', // 法定数量合计
        gQty2Total: '', // 第二数量合计
        docuAndcertCode: '', // 随附单证及编号
        statistics: '' // 报关单的数据统计
      },
      headColor: {
        decPid: '',
        tradeCoScc: 0,
        iEPort: 0,
        iEDate: 0,
        dDate: 0,
        manualNo: 0,
        overseasConsignorCode: 0,
        trafMode: 0,
        trafName: 0,
        billNo: 0,
        goodSplace: 0,
        ownerCodeScc: 0,
        tradeMode: 0,
        cutMode: 0,
        licenseNo: 0,
        despPortCode: 0,
        contrNo: 0,
        tradeAreaCode: 0,
        tradeCountry: 0,
        distinatePort: 0,
        entyPortCode: 0,
        wrapType: 0,
        packNo: 0,
        grossWt: 0,
        netWt: 0,
        transMode: 0,
        feeMark: 0,
        insurMark: 0,
        otherMark: 0,
        note: 0,
        orgCode: 0,
        vsaOrgCode: 0,
        inspOrgCode: 0,
        despDate: 0,
        blno: 0,
        purpOrgCode: 0,
        correlationaNo: 0,
        origBoxFlag: 0,
        specialFlag: 0,
        companyCer: 0,
        userInfo: 0,
        inspDecElem: 0,
        domesticConsigneeEname: 0,
        overseasConsignorCname: 0,
        overseasConsignorAddr: 0,
        cmplDschrgDt: 0,
        promiseItem1: 0,
        promiseItem2: 0,
        promiseItem3: 0,
        chkPayment: 0,
        goodsNote: 0, // 商品备注
        purpose: 0, // 用途
        originRelation: 0, // 原产地对应关系
        nameVo: 0, // 运输工具名称及航次号
        approveNo: 0, // 许可证/审批号
        voyageNo: 0,
        auditOpinion: '', // 审批意见
        docuAndcertCode: 0 // 随附单证及编号
      },
      container: {},
      checkReview: 'Y' // 是否需要复核
    }
  },
  created () {
    let initData = util.simpleClone(this.initParams)
    this.iEFlag = initData.iEFlag
    this.operationType = initData.operationType
    this.deCheckList = initData.list
    this.decHead = initData.head
    this.licenses = initData.licenses
    this.container = initData.containers
    this.checkReview = initData.checkReview
    if (initData.check.decVerifyHeadVO) {
      this.headColor = initData.check.decVerifyHeadVO
      for (let item in this.headColor) {
        if (item !== 'auditOpinion') {
          this.headColor[item] = +this.headColor[item]
        }
      }
    }
    this.specialBusiChangeCodeName()
    this.listFormat()
    this.enterpriseQualificationFormat()
    this.userFormat()
    this.requestCertsFormat()
  },
  mounted () {
  },
  methods: {
    // 审核驳回
    checkReject () {
      // 1. 提交 审核结果
      this.submitCheckResult()
    },
    // 更改驳回时的状态
    rejectUpdateStatus (pid) {
      // 2.修改审核状态
      this.$post({
        url: 'API@/dec-common/dec/common/updateExamStatus',
        data: {
          'bossId': this.decHead.bossId, // 报关单id
          'status': '4', // 4 为审核驳回状态
          'iEFlag': this.decHead.iEFlag,
          'pid': pid
        },
        success: (res) => {
          this.messageTips(res.message, 'success')
          // 更改状态
          this.$emit('backData')
        }
      })
    },
    // 提交 审核结果
    submitCheckResult () {
      let checkList = []
      for (let i in this.deCheckList) {
        checkList.push({
          'gNoColor': this.deCheckList[i].gNoColor,
          'codeTsColor': this.deCheckList[i].codeTsColor,
          'ciqCodeColor': this.deCheckList[i].ciqCodeColor,
          'gNameColor': this.deCheckList[i].gNameColor,
          'goodsSpecColor': this.deCheckList[i].goodsSpecColor,
          'showGoodsAttrValueColor': this.deCheckList[i].showGoodsAttrValueColor,
          'purposeColor': this.deCheckList[i].purposeColor,
          'licenseTypeNoColor': this.deCheckList[i].licenseTypeNoColor,
          'dangerGoodsInfoColor': this.deCheckList[i].dangerGoodsInfoColor,
          'gNameAndModelColor': this.deCheckList[i].gNameAndModelColor,
          'gQtyAndUnitColor': this.deCheckList[i].gQtyAndUnitColor,
          'priceAndTotalColor': this.deCheckList[i].priceAndTotalColor,
          'destinationCountryColor': this.deCheckList[i].destinationCountryColor,
          'districtCodeColor': this.deCheckList[i].districtCodeColor,
          'dutyModeColor': this.deCheckList[i].dutyModeColor,
          'originCountryColor': this.deCheckList[i].originCountryColor,
          'declPriceColor': this.deCheckList[i].declPriceColor,
          'declTotalColor': this.deCheckList[i].declTotalColor,
          'tradeCurrColor': this.deCheckList[i].tradeCurrColor,
          'exgVersionColor': this.deCheckList[i].exgVersionColor,
          'contrItemColor': this.deCheckList[i].contrItemColor, // 备案序号
          'ciqNameColor': this.deCheckList[i].ciqNameColor, // 检验检疫名称
          'gModelColor': this.deCheckList[i].gModelColor, // 规格型号
          'gQtyColor': this.deCheckList[i].gQtyColor, // 成交数量
          'gUnitColor': this.deCheckList[i].gUnitColor, // 成交计量单位
          'qty1Color': this.deCheckList[i].qty1Color, // 法定第一数量
          'unit1Color': this.deCheckList[i].unit1Color, // 法定第一计量单位
          'exgNoColor': this.deCheckList[i].exgNoColor, // 货号
          'qty2Color': this.deCheckList[i].qty2Color, // 法定第二数量
          'unit2Color': this.deCheckList[i].unit2Color, // 法定第二计量单位
          'districtCodeAndColor': this.deCheckList[i].districtCodeAndColor, // 境内目的地代码和地区
          'destCodeColor': this.deCheckList[i].destCodeColor, // 境内目的地区
          'gNoAllColor': this.deCheckList[i].gNoAllColor, // 报关单项号
          'decPid': this.deCheckList[i].decPid,
          'pid': this.deCheckList[i].pid,
          'gNo': this.deCheckList[i].gNo
        })
      }
      this.headColor['decPid'] = this.decHead.decPid
      this.$post({
        url: 'API@/dec-common/dec/common/saveVerifyInfo',
        data: {
          'decVerifyHeadVO': this.headColor, // 报关单id
          'decVerifyListVOs': checkList
        },
        success: (res) => {
          // 更改状态
          this.rejectUpdateStatus(res.result)
        }
      })
    },
    // 审核通过
    checkPassed () {
      // 1. 保存审核数据
      let checkList = []
      for (let i in this.deCheckList) {
        checkList.push({
          'gNoColor': this.deCheckList[i].gNoColor,
          'codeTsColor': this.deCheckList[i].codeTsColor,
          'ciqCodeColor': this.deCheckList[i].ciqCodeColor,
          'gNameColor': this.deCheckList[i].gNameColor,
          'goodsSpecColor': this.deCheckList[i].goodsSpecColor,
          'showGoodsAttrValueColor': this.deCheckList[i].showGoodsAttrValueColor,
          'purposeColor': this.deCheckList[i].purposeColor,
          'licenseTypeNoColor': this.deCheckList[i].licenseTypeNoColor,
          'dangerGoodsInfoColor': this.deCheckList[i].dangerGoodsInfoColor,
          'gNameAndModelColor': this.deCheckList[i].gNameAndModelColor,
          'gQtyAndUnitColor': this.deCheckList[i].gQtyAndUnitColor,
          'priceAndTotalColor': this.deCheckList[i].priceAndTotalColor,
          'destinationCountryColor': this.deCheckList[i].destinationCountryColor,
          'districtCodeColor': this.deCheckList[i].districtCodeColor,
          'dutyModeColor': this.deCheckList[i].dutyModeColor,
          'originCountryColor': this.deCheckList[i].originCountryColor,
          'declPriceColor': this.deCheckList[i].declPriceColor,
          'declTotalColor': this.deCheckList[i].declTotalColor,
          'tradeCurrColor': this.deCheckList[i].tradeCurrColor,
          'exgVersionColor': this.deCheckList[i].exgVersionColor,
          'contrItemColor': this.deCheckList[i].contrItemColor, // 备案序号
          'ciqNameColor': this.deCheckList[i].ciqNameColor, // 检验检疫名称
          'gModelColor': this.deCheckList[i].gModelColor, // 规格型号
          'gQtyColor': this.deCheckList[i].gQtyColor, // 成交数量
          'gUnitColor': this.deCheckList[i].gUnitColor, // 成交计量单位
          'qty1Color': this.deCheckList[i].qty1Color, // 法定第一数量
          'unit1Color': this.deCheckList[i].unit1Color, // 法定第一计量单位
          'exgNoColor': this.deCheckList[i].exgNoColor, // 货号
          'qty2Color': this.deCheckList[i].qty2Color, // 法定第二数量
          'unit2Color': this.deCheckList[i].unit2Color, // 法定第二计量单位
          'districtCodeAndColor': this.deCheckList[i].districtCodeAndColor, // 境内目的地代码和地区
          'destCodeColor': this.deCheckList[i].destCodeColor, // 境内目的地区
          'gNoAllColor': this.deCheckList[i].gNoAllColor, // 报关单项号
          'decPid': this.deCheckList[i].decPid,
          'pid': this.deCheckList[i].pid,
          'gNo': this.deCheckList[i].gNo
        })
      }
      this.headColor['decPid'] = this.decHead.decPid
      this.$post({
        url: 'API@/dec-common/dec/common/saveVerifyInfo',
        data: {
          'decVerifyHeadVO': this.headColor, // 报关单id
          'decVerifyListVOs': checkList
        },
        success: (res) => {
          // 2. 更改数据状态
          if (this.decHead.isExamine === 'R' && this.checkReview === 'Y') {
            // 复核开启
            let param = {
              'bossId': this.decHead.bossId, // 接单编号
              'decPid': this.decHead.decPid, // 报关单主键
              'iEFlag': this.decHead.iEFlag, // 进出口
              'pid': res.result,
              'status': 'R'
            }
            this.$confirm('是否需要复核？', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              distinguishCancelAndClose: true,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              type: 'warning'
            }).then(() => {
              this.submitPassCheck(param)
            }).catch(() => {
              param['status'] = '6'
              this.submitPassCheck(param)
            })
          } else if ((this.decHead.isExamine === 'R' && this.checkReview === 'N') || (this.decHead.isExamine === '3' && this.checkReview === 'N')) {
            let param = {
              'bossId': this.decHead.bossId, // 接单编号
              'decPid': this.decHead.decPid, // 报关单主键
              'iEFlag': this.decHead.iEFlag,
              'pid': res.result,
              'status': '6'
            }
            this.submitPassCheck(param)
          } else {
            let param = {
              'bossId': this.decHead.bossId, // 接单编号
              'decPid': this.decHead.decPid, // 报关单主键
              'iEFlag': this.decHead.iEFlag,
              'pid': res.result,
              'status': 'R'
            }
            this.submitPassCheck(param)
          }
        }
      })
    },
    // 提交审核通过的动作
    submitPassCheck (param) {
      this.$post({
        url: 'API@/dec-common/dec/common/updateExamStatus',
        data: param,
        success: (res) => {
          this.messageTips('操作成功', 'success')
          this.$emit('backData')
        }
      })
    },
    // 点击表头信息 td 改变 td的颜色
    changeHeadColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.headColor[name] === 0) {
        this.headColor[name] = 1
      } else if (this.headColor[name] === 1) {
        this.headColor[name] = 2
      } else if (this.headColor[name] === 2) {
        this.headColor[name] = 0
      }
    },
    // 点击表体详情信息
    changeBodyColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.decList[name + 'Color'] === 0) {
        this.decList[name + 'Color'] = 1
      } else if (this.decList[name + 'Color'] === 1) {
        this.decList[name + 'Color'] = 2
        if (['gName', 'gModel'].includes(name)) {
          this.decList['gNameAndModelColor'] = 2
        } else if (['gQty', 'gUnit', 'qty1', 'unit1', 'qty2', 'unit2'].includes(name)) {
          this.decList['gQtyAndUnitColor'] = 2
        } else if (['districtCode', 'destCode'].includes(name)) {
          this.decList['districtCodeAndColor'] = 2
        } else if (['contrItem', 'ciqName', 'exgVersion', 'exgNo', 'gNo'].includes(name)) {
          this.decList['gNoAllColor'] = 2
        } else if (['declPrice', 'declTotal', 'tradeCurr'].includes(name)) {
          this.decList['priceAndTotalColor'] = 2
        }
      } else if (this.decList[name + 'Color'] === 2) {
        this.decList[name + 'Color'] = 0
      }
      this.decList['gNameAndModelColor'] = this.judgeColor(['gNameColor', 'gModelColor'])
      this.decList['gQtyAndUnitColor'] = this.judgeColor(['gQtyColor', 'gUnitColor', 'qty1Color', 'unit1Color', 'qty2Color', 'unit2Color'])
      this.decList['districtCodeAndColor'] = this.judgeColor(['districtCodeColor', 'destCodeColor'])
      this.decList['gNoAllColor'] = this.judgeColor(['contrItemColor', 'ciqNameColor', 'exgVersionColor', 'exgNoColor', 'gNoColor'])
      this.decList['priceAndTotalColor'] = this.judgeColor(['declPriceColor', 'declTotalColor', 'tradeCurrColor'])
      this.deCheckList.push({})
      this.deCheckList.pop()
    },
    // 返回颜色
    judgeColor (arr) {
      let arr0 = []
      let arr1 = []
      let arr2 = []
      for (let i in arr) {
        if (this.decList[arr[i]] === 0) {
          arr0.push(arr[i])
        } else if (this.decList[arr[i]] === 1) {
          arr1.push(arr[i])
        } else if (this.decList[arr[i]] === 2) {
          arr2.push(arr[i])
        }
      }
      if (arr2.length > 0) {
        return 2
      } else if (arr1.length > 0) {
        return 1
      } else {
        return 0
      }
    },
    // 设置 table 单元格样式
    deCellClass ({row, column, rowIndex, columnIndex}) {
      return row[column.property] === 0 ? '' : ('c' + (row[column.property] + 1))
    },
    // 单击数据反填
    deCheckRowClick (row, event, column) {
      this.decList = row
    },
    // 点击table 单元格改变样式
    deCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 2
      } else if (row[column.property] === 2) {
        row[column.property] = 0
      }
      this.deCheckList.push({})
      this.deCheckList.pop()
    },
    // 特殊业务标识 把 code 转化为name
    specialBusiChangeCodeName () {
      let nameList = ['国际赛事', '特殊进出军工物资', '国际援助物资', '国际会议']
      let nameList2 = ['直通放行', '直通放行', '外交礼遇', '转关']
      let showList = []
      if (this.decHead.specDeclFlag !== '') {
        let arr = this.decHead.specDeclFlag.split('')
        for (let i in arr) {
          if (arr[i] === '1') {
            showList.push(nameList[i])
          }
        }
      }
      if (this.decHead.specDeclFlag2 !== '') {
        let arr2 = this.decHead.specDeclFlag2.split('')
        for (let n in arr2) {
          if (arr2[n] === '1') {
            showList.push(nameList2[n])
          }
        }
      }
      this.decOther.specialFlag = showList.join(',')
      // 其他价格影响因素 格式化
      if (!util.isEmpty(this.decHead.promiseItmes)) {
        let promiseArr = this.decHead.promiseItmes.split('')
        this.decOther.promiseItem1 = this.promiseCodeChangName(promiseArr[0])
        this.decOther.promiseItem2 = this.promiseCodeChangName(promiseArr[1])
        this.decOther.promiseItem3 = this.promiseCodeChangName(promiseArr[2])
      }
      // 备注
      let str = ''
      if (!util.isEmpty(this.decHead.noteS)) {
        str += '备注: ' + this.decHead.noteS + ';'
      }
      if (!util.isEmpty(this.decHead.markNo)) {
        str += '标记唛码: ' + this.decHead.markNo + ';'
      }
      if (!util.isEmpty(this.decHead.relId)) {
        str += ' 关联报关单号: ' + this.decHead.relId
      }
      if (!util.isEmpty(this.decHead.relManno)) {
        str += ' 关联备案号: ' + this.decHead.relManno
      }
      let no = this.container.length
      let num = 0
      let contaNoArr = []
      if (no > 0) {
        for (let m in this.container) {
          if (this.container[m].containerSizeValue.indexOf('L') > 0) {
            num += 2
          } else if (this.container[m].containerSizeValue.indexOf('S') > 0) {
            num++
          }
          contaNoArr.push(this.container[m].containerNo)
        }
        str += ' 集装箱标箱数及号码: ' + num + ';'
        str += ' ' + contaNoArr.join(';')
      }
      this.decOther.note = str
      // 原产地对应关系
      /**
       * 1。如果Y证 需要 显示出 单证类型和单证号以及原地产对应关系
       * 其他的则只显示对应关系
       */
      let origStr = []
      let docStr = []
      for (let x in this.licenses) {
        if (['Y', 'E', 'R', 'F', 'J'].includes(this.licenses[x].docuCode)) {
          let Ystr = ''
          if (this.licenses[x].docuCode === 'Y') {
            Ystr = this.licenses[x].docuCode + this.licenses[x].certCode + ':'
          }
          let arr = []
          for (let y in this.licenses[x].decEcoRealations) {
            arr.push(this.licenses[x].decEcoRealations[y].decGno + '-' + this.licenses[x].decEcoRealations[y].ecoGno)
          }
          if (arr.length > 0) {
            origStr.push(Ystr + arr.join('、'))
          }
        }
        docStr.push(this.licenses[x].docuCodeValue + ' ' + this.licenses[x].certCode)
      }
      this.decOther.originRelation = origStr.join(',')
      // 随附单证及编号 随附单证1 为 随附单证  随附单证2 为随附单据
      let strDoc = ''
      if (docStr.length > 0) {
        strDoc = '随附单证1: ' + docStr.join(';')
      }
      let billArr = []
      if (this.decHead.decEdocRealations !== null) {
        for (let z in this.decHead.decEdocRealations) {
          billArr.push(this.decHead.decEdocRealations[z].edocCodeValue)
        }
      }
      let billArrStr = ''
      if (billArr.length > 0) {
        billArrStr = ' 随附单证2: ' + billArr.join(';')
      }
      this.decOther.docuAndcertCode = strDoc + billArrStr
    },
    // 价格因素code 转name
    promiseCodeChangName (code) {
      if (code === '0') {
        return '否'
      } else if (code === '1') {
        return '是'
      } else if (code === '9') {
        return '空'
      } else {
        return ''
      }
    },
    // 货物属性、危险货物信息、格式化处理 表体数据处理
    listFormat () {
      if (this.deCheckList.length === 0) {
        return
      }
      let sum1 = 0 // 总价 不区分币制
      let sum2 = 0 // 成交数量 不区分单位
      let sum3 = 0 // 第一法定数量 不区分单位
      let sum4 = 0 // 第二法定数量 不区分单位
      let dataMap1 = {} // 总价
      let dataMap2 = {} // 成交数量
      let dataMap3 = {} // 第一法定数量
      let dataMap4 = {} // 第二法定数量
      for (let i in this.deCheckList) {
        // 追加属性
        let checkList = util.simpleClone(this.initParams.check.decVerifyListVOs)
        if (!util.isEmpty(checkList) && (checkList.length > 0) && !util.isEmpty(checkList[i])) {
          let checkListVo = checkList[i]
          this.deCheckList[i]['gNoColor'] = +checkListVo.gNoColor
          this.deCheckList[i]['codeTsColor'] = +checkListVo.codeTsColor
          this.deCheckList[i]['ciqCodeColor'] = +checkListVo.ciqCodeColor
          this.deCheckList[i]['gNameColor'] = +checkListVo.gNameColor
          this.deCheckList[i]['goodsSpecColor'] = +checkListVo.goodsSpecColor
          this.deCheckList[i]['showGoodsAttrValueColor'] = +checkListVo.showGoodsAttrValueColor
          this.deCheckList[i]['purposeColor'] = +checkListVo.purposeColor
          this.deCheckList[i]['licenseTypeNoColor'] = +checkListVo.licenseTypeNoColor
          this.deCheckList[i]['dangerGoodsInfoColor'] = +checkListVo.dangerGoodsInfoColor
          this.deCheckList[i]['gNameAndModelColor'] = +checkListVo.gNameAndModelColor
          this.deCheckList[i]['gQtyAndUnitColor'] = +checkListVo.gQtyAndUnitColor
          this.deCheckList[i]['priceAndTotalColor'] = +checkListVo.priceAndTotalColor
          this.deCheckList[i]['destinationCountryColor'] = +checkListVo.destinationCountryColor
          this.deCheckList[i]['districtCodeColor'] = +checkListVo.districtCodeColor
          this.deCheckList[i]['dutyModeColor'] = +checkListVo.dutyModeColor
          this.deCheckList[i]['originCountryColor'] = +checkListVo.originCountryColor
          this.deCheckList[i]['declPriceColor'] = +checkListVo.declPriceColor
          this.deCheckList[i]['declTotalColor'] = +checkListVo.declTotalColor
          this.deCheckList[i]['tradeCurrColor'] = +checkListVo.tradeCurrColor
          this.deCheckList[i]['exgVersionColor'] = +checkListVo.exgVersionColor
          this.deCheckList[i]['contrItemColor'] = +checkListVo.contrItemColor // 备案序号
          this.deCheckList[i]['ciqNameColor'] = +checkListVo.ciqNameColor // 检验检疫名称
          this.deCheckList[i]['gModelColor'] = +checkListVo.gModelColor // 规格型号
          this.deCheckList[i]['gQtyColor'] = +checkListVo.gQtyColor // 成交数量
          this.deCheckList[i]['gUnitColor'] = +checkListVo.gUnitColor // 成交计量单位
          this.deCheckList[i]['qty1Color'] = +checkListVo.qty1Color // 法定第一数量
          this.deCheckList[i]['unit1Color'] = +checkListVo.unit1Color // 法定第一计量单位
          this.deCheckList[i]['exgNoColor'] = +checkListVo.exgNoColor // 货号
          this.deCheckList[i]['qty2Color'] = +checkListVo.qty2Color // 法定第二数量
          this.deCheckList[i]['unit2Color'] = +checkListVo.unit2Color // 法定第二计量单位
          this.deCheckList[i]['districtCodeAndColor'] = +checkListVo.districtCodeAndColor // 境内目的地代码和地区
          this.deCheckList[i]['destCodeColor'] = +checkListVo.destCodeColor // 境内目的地区
          this.deCheckList[i]['gNoAllColor'] = +checkListVo.gNoAllColor
        } else {
          this.deCheckList[i]['gNoColor'] = 0
          this.deCheckList[i]['codeTsColor'] = 0
          this.deCheckList[i]['ciqCodeColor'] = 0
          this.deCheckList[i]['gNameColor'] = 0
          this.deCheckList[i]['goodsSpecColor'] = 0
          this.deCheckList[i]['showGoodsAttrValueColor'] = 0
          this.deCheckList[i]['purposeColor'] = 0
          this.deCheckList[i]['licenseTypeNoColor'] = 0
          this.deCheckList[i]['dangerGoodsInfoColor'] = 0
          this.deCheckList[i]['gNameAndModelColor'] = 0
          this.deCheckList[i]['gQtyAndUnitColor'] = 0
          this.deCheckList[i]['priceAndTotalColor'] = 0
          this.deCheckList[i]['destinationCountryColor'] = 0
          this.deCheckList[i]['districtCodeColor'] = 0
          this.deCheckList[i]['dutyModeColor'] = 0
          this.deCheckList[i]['originCountryColor'] = 0
          this.deCheckList[i]['declPriceColor'] = 0
          this.deCheckList[i]['declTotalColor'] = 0
          this.deCheckList[i]['tradeCurrColor'] = 0
          this.deCheckList[i]['exgVersionColor'] = 0
          this.deCheckList[i]['contrItemColor'] = 0 // 备案序号
          this.deCheckList[i]['ciqNameColor'] = 0 // 检验检疫名称
          this.deCheckList[i]['gModelColor'] = 0 // 规格型号
          this.deCheckList[i]['gQtyColor'] = 0 // 成交数量
          this.deCheckList[i]['gUnitColor'] = 0 // 成交计量单位
          this.deCheckList[i]['qty1Color'] = 0 // 法定第一数量
          this.deCheckList[i]['unit1Color'] = 0 // 法定第一计量单位
          this.deCheckList[i]['exgNoColor'] = 0 // 货号
          this.deCheckList[i]['qty2Color'] = 0 // 法定第二数量
          this.deCheckList[i]['unit2Color'] = 0 // 法定第二计量单位
          this.deCheckList[i]['districtCodeAndColor'] = 0 // 境内目的地代码和地区
          this.deCheckList[i]['destCodeColor'] = 0 // 境内目的地区
          this.deCheckList[i]['gNoAllColor'] = 0
        }
        if (+i === 0) {
          this.decOther.purpose = this.deCheckList[0].purpose
          this.decOther.purposeValue = this.deCheckList[0].purposeValue
          if (this.deCheckList[0].decGoodsLimits.length > 0) {
            this.decOther.approveNo = this.deCheckList[0].decGoodsLimits[0].licenceNo
          }
        }
        // 格式化数据 去掉多余的零
        this.deCheckList[i].declPrice = this.removeZero(this.deCheckList[i].declPrice)
        this.deCheckList[i].gQty = this.removeZero(this.deCheckList[i].gQty)
        this.deCheckList[i].qty1 = this.removeZero(this.deCheckList[i].qty1)
        this.deCheckList[i].qty2 = this.removeZero(this.deCheckList[i].qty2)
        this.deCheckList[i].declTotal = this.removeZero(this.deCheckList[i].declTotal)
        // 计算 总价、成交数量、第一数量、第二数量
        if (util.isEmpty(this.deCheckList[i].declTotal)) {
          this.deCheckList[i].declTotal = ''
        }
        if (util.isEmpty(this.deCheckList[i].gQty)) {
          this.deCheckList[i].gQty = ''
        }
        if (util.isEmpty(this.deCheckList[i].qty1)) {
          this.deCheckList[i].qty1 = ''
        }
        if (util.isEmpty(this.deCheckList[i].qty2)) {
          this.deCheckList[i].qty2 = ''
        }
        // 计算商品列表要素的统计数量
        sum1 = this.Add(sum1, this.deCheckList[i].declTotal)
        sum2 = this.Add(sum2, this.deCheckList[i].gQty)
        sum3 = this.Add(sum3, this.deCheckList[i].qty1)
        sum4 = this.Add(sum4, this.deCheckList[i].qty2)
        // 统计报关单 统计的数量
        dataMap1[this.deCheckList[i].tradeCurrValue] = this.Add(dataMap1[this.deCheckList[i].tradeCurrValue], this.deCheckList[i].declTotal)
        dataMap2[this.deCheckList[i].gUnitValue] = this.Add(dataMap2[this.deCheckList[i].gUnitValue], this.deCheckList[i].gQty)
        dataMap3[this.deCheckList[i].unit1Value] = this.Add(dataMap3[this.deCheckList[i].unit1Value], this.deCheckList[i].qty1)
        dataMap4[this.deCheckList[i].unit2Value] = this.Add(dataMap4[this.deCheckList[i].unit2Value], this.deCheckList[i].qty2)
        // 货物属性的显示转换
        if (this.deCheckList[i].goodsAttrList.length > 0) {
          let goods = this.deCheckList[i].goodsAttrList
          let goodsValue = []
          for (let n in goods) {
            goodsValue.push(goods[n].goodsAttrValue)
          }
          this.deCheckList[i].showGoodsAttrValue = goodsValue.join(',')
        }
        // 危险货物信息
        let dangerValue = []
        dangerValue.push(this.deCheckList[i].noDangFlag)
        dangerValue.push(this.deCheckList[i].unCode)
        dangerValue.push(this.deCheckList[i].dangName)
        if (this.deCheckList[i].dangPackType === '1') {
          dangerValue.push('一类')
        } else if (this.deCheckList[i].dangPackType === '2') {
          dangerValue.push('二类')
        } else if (this.deCheckList[i].dangPackType === '3') {
          dangerValue.push('三类')
        } else {
          dangerValue.push('')
        }
        dangerValue.push(this.deCheckList[i].dangPackSpec)
        this.deCheckList[i].dangerGoodsInfo = dangerValue.join('|')
        // 检验检疫货物规格
        let goodspec = []
        if (!util.isEmpty(this.deCheckList[i].stuffNote)) {
          goodspec.push(this.deCheckList[i].stuffNote)
        }
        if (!util.isEmpty(this.deCheckList[i].prodValidDt)) {
          goodspec.push(this.deCheckList[i].prodValidDt)
        }
        if (!util.isEmpty(this.deCheckList[i].prodQgp)) {
          goodspec.push(this.deCheckList[i].prodQgp)
        }
        if (!util.isEmpty(this.deCheckList[i].engManentCnm)) {
          goodspec.push(this.deCheckList[i].engManentCnm)
        }
        if (!util.isEmpty(this.deCheckList[i].goodsSpec)) {
          goodspec.push(this.deCheckList[i].goodsSpec)
        }
        if (!util.isEmpty(this.deCheckList[i].goodsModel)) {
          goodspec.push(this.deCheckList[i].goodsModel)
        }
        if (!util.isEmpty(this.deCheckList[i].goodsBrand)) {
          goodspec.push(this.deCheckList[i].goodsBrand)
        }
        if (!util.isEmpty(this.deCheckList[i].produceDate)) {
          goodspec.push(this.deCheckList[i].produceDate)
        }
        if (!util.isEmpty(this.deCheckList[i].prodBatchNo)) {
          goodspec.push(this.deCheckList[i].prodBatchNo)
        }
        if (!util.isEmpty(this.deCheckList[i].mnufctrRegNo)) {
          goodspec.push(this.deCheckList[i].mnufctrRegNo)
        }
        this.deCheckList[i].showGoodsSpec = goodspec.join(';')
        // 许可证类别及编号
        if (this.deCheckList[i].decGoodsLimits.length > 0) {
          let goodsLimits = this.deCheckList[i].decGoodsLimits
          let goodsLimitsValue = []
          for (let m in goodsLimits) {
            let str = '(' + goodsLimits[m].licTypeCode + ')' + ' ' + goodsLimits[m].licTypeCodeValue + ',' + goodsLimits[m].licenceNo
            goodsLimitsValue.push(str)
          }
          this.deCheckList[i].licenseTypeNo = goodsLimitsValue.join(';')
        }
      }
      this.decOther.totalPrice = sum1 // 总价
      this.decOther.gQtyTotal = sum2 // 成交数量合计
      this.decOther.gQty1Total = sum3 // 法定第一数量合计
      this.decOther.gQty2Total = sum4 // 法定第二数量合计
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr4 = []
      for (let key1 in dataMap1) {
        if (dataMap1[key1] !== 0) {
          arr1.push(dataMap1[key1] + ' ' + key1)
        }
      }
      for (let key2 in dataMap2) {
        if (dataMap2[key2] !== 0) {
          arr2.push(dataMap2[key2] + ' ' + key2)
        }
      }
      for (let key3 in dataMap3) {
        if (dataMap3[key3] !== 0) {
          arr3.push(dataMap3[key3] + ' ' + key3)
        }
      }
      for (let key4 in dataMap4) {
        if (dataMap4[key4] !== 0) {
          arr4.push(dataMap4[key4] + ' ' + key4)
        }
      }
      let str
      if (arr1.length > 0) {
        str = '总价：' + arr1.join(',') + ';'
      } else {
        str = '总价：' + ' ' + ';'
      }
      if (arr2.length > 0) {
        str += '成交数量合计：' + arr2.join(',') + ';'
      } else {
        str += '成交数量合计：' + ' ' + ';'
      }
      if (arr3.length > 0) {
        str += '法定第一数量合计：' + arr3.join(',') + ';'
      } else {
        str += '法定第一数量合计：' + ' ' + ';'
      }
      if (arr3.length > 0) {
        str += '法定第二数量合计：' + arr4.join(',')
      } else {
        str += '法定第二数量合计：' + ' '
      }
      this.decOther.statistics = str
    },
    // 企业资质的格式化处理
    enterpriseQualificationFormat () {
      if (this.decHead.decCopLimits.length === 0) {
        return
      }
      let list = this.decHead.decCopLimits
      let value = []
      for (let i in list) {
        let str = '(' + list[i].entQualiftypeCode + ')' + ' ' + list[i].entQualiftypeCodeValue + ' ' + list[i].entQualifNo
        value.push(str)
      }
      this.decOther.companyCer = value.join(' ; ')
    },
    // 使用人格式化处理
    userFormat () {
      if (this.decHead.decDecUsers.length === 0) {
        return
      }
      let list = this.decHead.decDecUsers
      let value = []
      for (let i in list) {
        let str = list[i].useOrgpersonCode + '(' + list[i].useOrgpersonTel + ')'
        value.push(str)
      }
      this.decOther.userInfo = value.join(' ; ')
    },
    removeZero (value) {
      if (util.isEmpty(value)) {
        return ''
      } else {
        return parseFloat(value) === 0 ? '' : parseFloat(value)
      }
    },
    // 检验检疫签证申报要素格式化处理
    requestCertsFormat () {
      if (this.decHead.decRequestCerts.length === 0) {
        return
      }
      let list = this.decHead.decRequestCerts
      let value = []
      for (let i in list) {
        let str = list[i].appCertCode + '(' + list[i].appCertCodeValue + ' ' + list[i].applOri + ' ' + list[i].applCopyQuan + ' )'
        value.push(str)
      }
      this.decOther.inspDecElem = value.join(' ; ')
    },
    /**
     * @function 加法函数，用来得到精确的加法结果
     * @description  javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     * @param arg1 第一个加数
     * @param arg2 第二个加数
     * @param d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
       @returns 两数相加的结果
     */
    Add (arg1, arg2) {
      if (util.isEmpty(arg1)) {
        arg1 = 0
      }
      if (util.isEmpty(arg2)) {
        arg2 = 0
      }
      let arg1Arr = arg1.toString().split('.')
      let arg2Arr = arg2.toString().split('.')
      let d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
      let d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
      let maxLen = Math.max(d1.length, d2.length)
      let m = Math.pow(10, maxLen)
      let result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen))
      let d = arguments[2] // arguments 为获取所有传入的参数 取第三个参数
      return typeof d === 'number' ? Number((result).toFixed(d)) : result
    }
  }
}
</script>

<style scoped lang="less">
  table,table tr th, table tr td { border:1px solid #e4eaec; }
  table { width: 100%; min-height: 25px; line-height: 25px; text-align: left; border-collapse: collapse;}
  table th {
    padding: 0px;
    font-size: 12px;
    color: white;
    background-color: #64A7EB;
    border-right-color: #e4eaec;
    height: 20px;
    vertical-align: middle;
  }
  .check-table td {
    white-space: normal;
    word-break: break-all;
    word-wrap:break-word;
  }

  .check-table thead tr {
    display: block;
  }
 .c3{
    background-color:#ffd0d8;
  }
 .c2 {
    background-color:#d0ffe5;
  }
  .c1 {
    background-color: #fff;
  }
  .tips{
    padding:5px 0;
  }
  .title-name{
    font-weight: bold
  }
  .content-font{
    font-size: 13px;
  }
  .check-div {
    height: 27px;
    line-height: 27px;
    background-color: #ebebeb;
    border: 1px solid #e4eaec;
    font-size: 13px;
  }
  .border-none {
    border: 0;
  }
  .span-block {
    width:150px;
    display: inline-block;
  }
  .div-class {
    overflow:hidden;
    position: relative;
    width: 100%;
  }
  .text-center {
    text-align: center;
  }
  .div-scoll {
    height: 600px;
    width: 100%;
    overflow:auto;
  }
</style>
