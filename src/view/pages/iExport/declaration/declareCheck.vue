<template>
  <!-- 报关单审核组件 -->
  <section class= 'sys-main sys-dec-check sys-dec-class'>
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
            <td :class='colorArr[headColor.tradeCoScc]' width="25%">
              <el-popover
                width="300"
                @show="getTypeToHead('tradeCoSccNoteNote')"
                v-model="headVisible.tradeCoSccNoteNote">
                <check-comp v-if="headVisible.tradeCoSccNoteNote" :checkobj="decCheckRec.tradeCoSccNoteNote" :nowString='decHead.tradeCoSccNoteNote' :headClomn = "'tradeCoSccNoteNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('tradeCoScc')" slot="reference" >
                    <div class="img-tip" v-if="decHead.tradeCoSccNoteNote || (decCheckRec.tradeCoSccNoteNote && decCheckRec.tradeCoSccNoteNote.length>0)"></div>
                    <span v-if = "iEFlag == 'I'" class='title-name'>境内收货人</span>
                    <span v-else class='title-name'>境内发货人</span>
                    <span class='content-font'>{{"(" + decHead.tradeCoScc + ")"}}</span>
                    <p class='content-font'>{{decHead.tradeName}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" width="20%"  :class='colorArr[headColor.iEPort]' >
              <el-popover
                width="300"
                @show="getTypeToHead('iEPortNote')"
                v-model="headVisible.iEPortNote">
                <check-comp v-if="headVisible.iEPortNote" :checkobj="decCheckRec.iEPortNote" :nowString='decHead.iEPortNote' :headClomn = "'iEPortNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('iEPort')" slot="reference" >
                    <div class="img-tip" v-if="decHead.iEPortNote || (decCheckRec.iEPortNote && decCheckRec.iEPortNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>进境关别</span>
                    <span v-else class='title-name'>出境关别</span>
                    <span class='content-font'>{{"(" + decHead.iEPort + ")"}}</span>
                    <p class='content-font'>{{decHead.iEPortValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" width="20%" :class='colorArr[headColor.iEDate]' >
               <el-popover
                width="300"
                @show="getTypeToHead('iEDateNote')"
                v-model="headVisible.iEDateNote">
                <check-comp v-if="headVisible.iEDateNote" :checkobj="decCheckRec.iEDateNote" :nowString='decHead.iEDateNote' :headClomn = "'iEDateNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('iEDate')" slot="reference" >
                    <div class="img-tip" v-if="decHead.iEDateNote || (decCheckRec.iEDateNote && decCheckRec.iEDateNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>进口日期</span>
                    <span v-else class='title-name'>出口日期</span>
                    <p class='content-font'>{{decHead.iEDate}}</p>
                  </div>
              </el-popover>
            </td>

            <td  width="15%" :class='colorArr[headColor.dDate]' >
              <el-popover
                width="300"
                @show="getTypeToHead('dDateNote')"
                v-model="headVisible.dDateNote">
                <check-comp v-if="headVisible.dDateNote" :checkobj="decCheckRec.dDateNote" :nowString='decHead.dDateNote' :headClomn = "'dDateNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('dDate')" slot="reference">
                    <div class="img-tip" v-if="decHead.dDateNote || (decCheckRec.dDateNote && decCheckRec.dDateNote.length>0)"></div>
                    <span class='title-name'>申报日期</span>
                    <p class='content-font'>{{decHead.dDate}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" width="20%" :class='colorArr[headColor.manualNo]' >
             <el-popover
                width="300"
                @show="getTypeToHead('manualNoNote')"
                v-model="headVisible.manualNoNote">
                <check-comp v-if="headVisible.manualNoNote" :checkobj="decCheckRec.manualNoNote" :nowString='decHead.manualNoNote' :headClomn = "'manualNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('manualNo')" slot="reference">
                    <div class="img-tip" v-if="decHead.manualNoNote || (decCheckRec.manualNoNote && decCheckRec.manualNoNote.length>0)"></div>
                    <span class='title-name'>备案号</span>
                    <p class='content-font'>{{decHead.manualNo}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td width="25%" v-if = "iEFlag === 'I'" :class='colorArr[headColor.overseasConsignorCode]' >
              <el-popover
                width="300"
                @show="getTypeToHead('overseasConsignorCodeNote')"
                v-model="headVisible.overseasConsignorCodeNote">
                <check-comp v-if="headVisible.overseasConsignorCodeNote" :checkobj="decCheckRec.overseasConsignorCodeNote" :nowString='decHead.overseasConsignorCodeNote' :headClomn = "'overseasConsignorCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('overseasConsignorCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.overseasConsignorCodeNote || (decCheckRec.overseasConsignorCodeNote && decCheckRec.overseasConsignorCodeNote.length>0)"></div>
                    <span  class='title-name'>境外发货人</span>
                    <span >{{"(" + decHead.overseasConsignorCode + ")"}}</span>
                    <p>{{decHead.overseasConsignorEname}}</p>
                  </div>
                </el-popover>
            </td>
              <td width="25%" v-if = "iEFlag === 'E'" :class='colorArr[headColor.overseasConsigneeCode]' >
                <el-popover
                width="300"
                @show="getTypeToHead('overseasConsigneeEnameNote')"
                v-model="headVisible.overseasConsigneeEnameNote">
                <check-comp v-if="headVisible.overseasConsigneeEnameNote" :checkobj="decCheckRec.overseasConsigneeEnameNote" :nowString='decHead.overseasConsigneeEnameNote' :headClomn = "'overseasConsigneeEnameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('overseasConsigneeCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.overseasConsigneeEnameNote || (decCheckRec.overseasConsigneeEnameNote && decCheckRec.overseasConsigneeEnameNote.length>0)"></div>
                    <span  class='title-name'>境外收货人</span>
                    <span>{{"(" + decHead.overseasConsigneeCode + ")"}}</span>
                    <p>{{decHead.overseasConsigneeEname}}</p>
                  </div>
                </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.trafMode]' >
             <el-popover
                width="300"
                @show="getTypeToHead('trafModeNote')"
                v-model="headVisible.trafModeNote">
                <check-comp v-if="headVisible.trafModeNote" :checkobj="decCheckRec.trafModeNote" :nowString='decHead.trafModeNote' :headClomn = "'trafModeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('trafMode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.trafModeNote || (decCheckRec.trafModeNote && decCheckRec.trafModeNote.length>0)"></div>
                    <span class='title-name'>运输方式</span>
                    <span class='content-font'>{{"(" + decHead.trafMode + ")"}}</span>
                    <p class='content-font'>{{decHead.trafModeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.nameVo]' >
              <el-popover
                width="300"
                @show="getTypeToHead('nameVoNote')"
                v-model="headVisible.nameVoNote">
                <check-comp v-if="headVisible.nameVoNote" :checkobj="decCheckRec.nameVoNote" :nowString='decHead.nameVoNote' :headClomn = "'nameVoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('nameVo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.nameVoNote || (decCheckRec.nameVoNote && decCheckRec.nameVoNote.length>0)"></div>
                    <span class='title-name'>运输工具名称及航次号</span>
                    <p class='content-font'>{{decHead.trafName + '/' + decHead.voyageNo}}</p>
                  </div>
              </el-popover>
            </td>
            <td :colspan="iEFlag === 'I'?1:3" :class='colorArr[headColor.billNo]' >
              <el-popover
                width="300"
                @show="getTypeToHead('billNoNote')"
                v-model="headVisible.billNoNote1">
                <check-comp v-if="headVisible.billNoNote1" :checkobj="decCheckRec.billNoNote" :nowString='decHead.billNoNote' :headClomn = "'billNoNote1'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('billNo')" slot="reference">
                    <div class="img-tip" v-if="decHead.billNoNote || (decCheckRec.billNoNote && decCheckRec.billNoNote.length>0)"></div>
                    <span class='title-name'>提运单号</span>
                    <p class='content-font'>{{decHead.billNo}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" v-if = "iEFlag === 'I'" :class='colorArr[headColor.goodSplace]' >
              <el-popover
                width="300"
                @show="getTypeToHead('goodSplaceNote')"
                v-model="headVisible.goodSplaceNote">
                <check-comp v-if="headVisible.goodSplaceNote" :checkobj="decCheckRec.goodSplaceNote" :nowString='decHead.goodSplaceNote' :headClomn = "'goodSplaceNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('goodSplace')" slot="reference">
                    <div class="img-tip" v-if="decHead.goodSplaceNote || (decCheckRec.goodSplaceNote && decCheckRec.goodSplaceNote.length>0)"></div>
                    <span class='title-name'>货物存放地点</span>
                    <p class='content-font'>{{decHead.goodSplace}}</p>
                  </div>
                </el-popover>
            </td>
          </tr>
          <tr>
            <td :class='colorArr[headColor.ownerCodeScc]' >
               <el-popover
                width="300"
                @show="getTypeToHead('ownerCodeSccNote')"
                v-model="headVisible.ownerCodeSccNote">
                <check-comp v-if="headVisible.ownerCodeSccNote" :checkobj="decCheckRec.ownerCodeSccNote" :nowString='decHead.ownerCodeSccNote' :headClomn = "'ownerCodeSccNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('ownerCodeScc')" slot="reference">
                    <div class="img-tip" v-if="decHead.ownerCodeSccNote || (decCheckRec.ownerCodeSccNote && decCheckRec.ownerCodeSccNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>消费使用单位</span>
                    <span v-else class='title-name'>生产销售单位</span>
                    <span class='content-font'>{{"(" + decHead.ownerCodeScc + ")"}}</span>
                    <p class='content-font'>{{decHead.ownerName}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.tradeMode]' >
               <el-popover
                width="300"
                @show="getTypeToHead('tradeModeNote')"
                v-model="headVisible.tradeModeNote">
                <check-comp v-if="headVisible.tradeModeNote" :checkobj="decCheckRec.tradeModeNote" :nowString='decHead.tradeModeNote' :headClomn = "'tradeModeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('tradeMode')" slot="reference">
                    <div class="img-tip" v-if="decHead.tradeModeNote || (decCheckRec.tradeModeNote && decCheckRec.tradeModeNote.length>0)"></div>
                    <span class='title-name'>监管方式</span>
                    <span class='content-font'>{{"(" + decHead.tradeMode + ")"}}</span>
                    <p class='content-font'>{{decHead.tradeModeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.cutMode]' >
             <el-popover
                width="300"
                @show="getTypeToHead('cutModeNote')"
                v-model="headVisible.cutModeNote">
                <check-comp v-if="headVisible.cutModeNote" :checkobj="decCheckRec.cutModeNote" :nowString='decHead.cutModeNote' :headClomn = "'cutModeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('cutMode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.cutModeNote || (decCheckRec.cutModeNote && decCheckRec.cutModeNote.length>0)"></div>
                    <span class='title-name'>征免性质</span>
                    <span class='content-font'>{{"("+ decHead.cutMode + ")"}}</span>
                    <p class='content-font'>{{decHead.cutModeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td :colspan="iEFlag === 'I'?1:3" :class='colorArr[headColor.licenseNo]' >
              <el-popover
                width="300"
                @show="getTypeToHead('licenseNoNote')"
                v-model="headVisible.licenseNoNote">
                <check-comp v-if="headVisible.licenseNoNote" :checkobj="decCheckRec.licenseNoNote" :nowString='decHead.licenseNoNote' :headClomn = "'licenseNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('licenseNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.licenseNoNote || (decCheckRec.licenseNoNote && decCheckRec.licenseNoNote.length>0)"></div>
                    <span class='title-name'>许可证号</span>
                    <p class='content-font'>{{decHead.licenseNo}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" v-if = "iEFlag === 'I'" :class='colorArr[headColor.despPortCode]' >
               <el-popover
                width="300"
                @show="getTypeToHead('despPortCodeNote')"
                v-model="headVisible.despPortCodeNote">
                <check-comp v-if="headVisible.despPortCodeNote" :checkobj="decCheckRec.despPortCodeNote" :nowString='decHead.despPortCodeNote' :headClomn = "'despPortCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('despPortCode')" slot="reference">
                    <div class="img-tip" v-if="decHead.despPortCodeNote || (decCheckRec.despPortCodeNote && decCheckRec.despPortCodeNote.length>0)"></div>
                    <span class='title-name'>启运港</span>
                    <span class='content-font'>{{"("+ decHead.despPortCode + ")"}}</span>
                    <p class='content-font'>{{decHead.despPortCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td :class='colorArr[headColor.contrNo]' >
              <el-popover
                width="300"
                @show="getTypeToHead('contrNoNote')"
                v-model="headVisible.contrNoNote">
                <check-comp v-if="headVisible.contrNoNote" :checkobj="decCheckRec.contrNoNote" :nowString='decHead.contrNoNote' :headClomn = "'contrNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('contrNo')" slot="reference">
                    <div class="img-tip" v-if="decHead.contrNoNote || (decCheckRec.contrNoNote && decCheckRec.contrNoNote.length>0)"></div>
                    <span class='title-name'>合同协议号</span>
                    <p class='content-font'>{{decHead.contrNo}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.tradeAreaCode]' >
              <el-popover
                width="300"
                @show="getTypeToHead('tradeAreaCodeNote')"
                v-model="headVisible.tradeAreaCodeNote">
                <check-comp v-if="headVisible.tradeAreaCodeNote" :checkobj="decCheckRec.tradeAreaCodeNote" :nowString='decHead.tradeAreaCodeNote' :headClomn = "'tradeAreaCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('tradeAreaCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.tradeAreaCodeNote || (decCheckRec.tradeAreaCodeNote && decCheckRec.tradeAreaCodeNote.length>0)"></div>
                    <span class='title-name'>贸易国别(地区)</span>
                    <span class='content-font'>{{"(" + decHead.tradeAreaCode + ")"}}</span>
                    <p class='content-font'>{{decHead.tradeAreaCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2"  :class='colorArr[headColor.tradeCountry]' >
              <el-popover
                width="300"
                @show="getTypeToHead('tradeCountryNote')"
                v-model="headVisible.tradeCountryNote">
                <check-comp v-if="headVisible.tradeCountryNote" :checkobj="decCheckRec.tradeCountryNote" :nowString='decHead.tradeCountryNote' :headClomn = "'tradeCountryNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('tradeCountry')" slot="reference" >
                    <div class="img-tip" v-if="decHead.tradeCountryNote || (decCheckRec.tradeCountryNote && decCheckRec.tradeCountryNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>启运国(地区)</span>
                    <span v-else class='title-name'>运抵国(地区)</span>
                    <span class='content-font'>{{"(" + decHead.tradeCountry + ")"}}</span>
                    <p class='content-font'>{{decHead.tradeCountryValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="1" :class='colorArr[headColor.distinatePort]' >
              <el-popover
                width="300"
                @show="getTypeToHead('distinatePortNote')"
                v-model="headVisible.distinatePortNote">
                <check-comp v-if="headVisible.distinatePortNote" :checkobj="decCheckRec.distinatePortNote" :nowString='decHead.distinatePortNote' :headClomn = "'distinatePortNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('distinatePort')" slot="reference">
                    <div class="img-tip" v-if="decHead.distinatePortNote || (decCheckRec.distinatePortNote && decCheckRec.distinatePortNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>经停港</span>
                    <span v-else class='title-name'>指运港</span>
                    <span class='content-font'>{{"(" + decHead.distinatePort + ")"}}</span>
                    <p class='content-font'>{{decHead.distinatePortValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2"  :class='colorArr[headColor.entyPortCode]' >
              <el-popover
                width="300"
                @show="getTypeToHead('entyPortCodeNote')"
                v-model="headVisible.entyPortCodeNote">
                <check-comp v-if="headVisible.entyPortCodeNote" :checkobj="decCheckRec.entyPortCodeNote" :nowString='decHead.entyPortCodeNote' :headClomn = "'entyPortCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('entyPortCode')" slot="reference">
                    <div class="img-tip" v-if="decHead.entyPortCodeNote || (decCheckRec.entyPortCodeNote && decCheckRec.entyPortCodeNote.length>0)"></div>
                    <span v-if = "iEFlag === 'I'" class='title-name'>入境口岸</span>
                    <span v-else class='title-name'>离境口岸</span>
                    <span class='content-font'>{{"(" + decHead.entyPortCode + ")"}}</span>
                    <p class='content-font'>{{decHead.entyPortCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td :class='colorArr[headColor.wrapType]' >
              <el-popover
                width="300"
                @show="getTypeToHead('wrapTypeNote')"
                v-model="headVisible.wrapTypeNote">
                <check-comp v-if="headVisible.wrapTypeNote" :checkobj="decCheckRec.wrapTypeNote" :nowString='decHead.wrapTypeNote' :headClomn = "'wrapTypeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('wrapType')" slot="reference" >
                    <div class="img-tip" v-if="decHead.wrapTypeNote || (decCheckRec.wrapTypeNote && decCheckRec.wrapTypeNote.length>0)"></div>
                    <span class='title-name'>包装种类</span>
                    <span class='content-font'>{{"(" + decHead.wrapType + ")" }}</span>
                    <p class='content-font'>{{decHead.wrapTypeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td width= "10%"  :class='colorArr[headColor.packNo]'  >
               <el-popover
                width="300"
                @show="getTypeToHead('packNoNote')"
                v-model="headVisible.packNoNote">
                <check-comp v-if="headVisible.packNoNote" :checkobj="decCheckRec.packNoNote" :nowString='decHead.packNoNote' :headClomn = "'packNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('packNo')" slot="reference">
                    <div class="img-tip" v-if="decHead.packNoNote || (decCheckRec.packNoNote && decCheckRec.packNoNote.length>0)"></div>
                    <span class='title-name'>件数</span>
                    <p class='content-font'>{{decHead.packNo}}</p>
                  </div>
               </el-popover>
            </td>
            <td width= "10%" :class='colorArr[headColor.grossWt]'>
               <el-popover
                width="300"
                @show="getTypeToHead('grossWtNote')"
                v-model="headVisible.grossWtNote">
                <check-comp v-if="headVisible.grossWtNote" :checkobj="decCheckRec.grossWtNote" :nowString='decHead.grossWtNote' :headClomn = "'grossWtNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('grossWt')" slot="reference" >
                    <div class="img-tip" v-if="decHead.grossWtNote || (decCheckRec.grossWtNote && decCheckRec.grossWtNote.length>0)"></div>
                    <span class='title-name'>毛重（千克）</span>
                    <p class='content-font'>{{decHead.grossWt}}</p>
                  </div>
               </el-popover>
            </td>
            <td width= "10%"  :class='colorArr[headColor.netWt]'>
             <el-popover
                width="300"
                @show="getTypeToHead('netWtNote')"
                v-model="headVisible.netWtNote">
                <check-comp v-if="headVisible.netWtNote" :checkobj="decCheckRec.netWtNote" :nowString='decHead.netWtNote' :headClomn = "'netWtNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('netWt')" slot="reference" >
                    <div class="img-tip" v-if="decHead.netWtNote || (decCheckRec.netWtNote && decCheckRec.netWtNote.length>0)"></div>
                    <span class='title-name'>净重（千克）</span>
                    <p class='content-font'>{{decHead.netWt}}</p>
                  </div>
              </el-popover>
            </td>
            <td width= "10%" :class='colorArr[headColor.transMode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('transModeNote')"
                v-model="headVisible.transModeNote">
                <check-comp v-if="headVisible.transModeNote" :checkobj="decCheckRec.transModeNote" :nowString='decHead.transModeNote' :headClomn = "'transModeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('transMode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.transModeNote || (decCheckRec.transModeNote && decCheckRec.transModeNote.length>0)"></div>
                    <span class='title-name'>成交方式</span>
                    <span class='content-font'>{{"(" + decHead.transMode + ")"}}</span>
                    <p class='content-font'>{{decHead.transModeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td :class='colorArr[headColor.feeMark]'>
                <el-popover
                width="300"
                @show="getTypeToHead('feeMarkNote')"
                v-model="headVisible.feeMarkNote">
                <check-comp v-if="headVisible.feeMarkNote" :checkobj="decCheckRec.feeMarkNote" :nowString='decHead.feeMarkNote' :headClomn = "'feeMarkNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('feeMark')" slot="reference" >
                    <div class="img-tip" v-if="decHead.feeMarkNote || (decCheckRec.feeMarkNote && decCheckRec.feeMarkNote.length>0)"></div>
                    <span class='title-name'>运费</span>
                    <p class='content-font'>{{decHead.feeCurr + '/' + decHead.feeRate + '/' +decHead.feeMark}}</p>
                  </div>
               </el-popover>
            </td>
            <td width= "10%" :class='colorArr[headColor.insurMark]'>
               <el-popover
                width="300"
                @show="getTypeToHead('insurMarkNote')"
                v-model="headVisible.insurMarkNote">
                <check-comp v-if="headVisible.insurMarkNote" :checkobj="decCheckRec.insurMarkNote" :nowString='decHead.insurMarkNote' :headClomn = "'insurMarkNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('insurMark')" slot="reference" >
                    <div class="img-tip" v-if="decHead.insurMarkNote || (decCheckRec.insurMarkNote && decCheckRec.insurMarkNote.length>0)"></div>
                    <span class='title-name'>保费</span>
                    <p class='content-font'>{{decHead.insurCurr + '/' + decHead.insurRate + '/' +decHead.insurMark}}</p>
                  </div>
               </el-popover>
            </td>
            <td width= "10%" :class='colorArr[headColor.otherMark]'>
              <el-popover
                width="300"
                @show="getTypeToHead('otherMarkNote')"
                v-model="headVisible.otherMarkNote">
                <check-comp v-if="headVisible.otherMarkNote" :checkobj="decCheckRec.otherMarkNote" :nowString='decHead.otherMarkNote' :headClomn = "'otherMarkNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('otherMark')" slot="reference" >
                    <div class="img-tip" v-if="decHead.otherMarkNote || (decCheckRec.otherMarkNote && decCheckRec.otherMarkNote.length>0)"></div>
                    <span class='title-name'>杂费</span>
                    <p class='content-font'>{{decHead.otherCurr + '/' + decHead.otherRate + '/' +decHead.otherMark}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="14" :class='colorArr[headColor.docuAndcertCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('docuAndcertCodeNote')"
                v-model="headVisible.docuAndcertCodeNote">
                <check-comp v-if="headVisible.docuAndcertCodeNote" :checkobj="decCheckRec.docuAndcertCodeNote" :nowString='decHead.docuAndcertCodeNote' :headClomn = "'docuAndcertCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('docuAndcertCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.docuAndcertCodeNote || (decCheckRec.docuAndcertCodeNote && decCheckRec.docuAndcertCodeNote.length>0)"></div>
                    <span class='title-name'>随附单证及编号</span>
                    <p class='content-font'>{{decOther.docuAndcertCode}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="14" :class='colorArr[headColor.note]'>
             <el-popover
                width="300"
                @show="getTypeToHead('noteNote')"
                v-model="headVisible.noteNote">
                <check-comp v-if="headVisible.noteNote" :checkobj="decCheckRec.noteNote" :nowString='decHead.noteNote' :headClomn = "'noteNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('note')" slot="reference" >
                    <div class="img-tip" v-if="decHead.noteNote || (decCheckRec.noteNote && decCheckRec.noteNote.length>0)"></div>
                    <span class='title-name'>标记唛码及备注</span>
                    <p class='content-font'>{{decOther.note}}</p>
                  </div>
              </el-popover>
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
               <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('gNoNote')"
                v-model="decVisable[decListidx].gNoNote">
                <check-comp v-if="decVisable[decListidx].gNoNote" :checkobj="declistCheckRec[decListidx].gNoNote" :nowString='decList.gNoNote' :decCheckClomn="decListidx + '-gNoNote'" @backNote='getNote'></check-comp>
                <div slot="reference" class="check-content">
                  <div class="img-tip" v-if="decList.gNoNote || (declistCheckRec[decListidx].gNoNote && declistCheckRec[decListidx].gNoNote.length>0)"></div>
                  <span class='content-font' :style="decList.gNo?'':'color：#CCC'">{{decList.gNo || '暂无'}}</span>
                </div>
               </el-popover>
            </td>
            <td  width='10%'>
              <span class='title-name'>备案序号</span>
            </td>
            <td  width='10%' @click="changeBodyColor('contrItem')" :class='colorArr[decList.contrItemColor]'>
               <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('contrItemNote')"
                v-model="decVisable[decListidx].contrItemNote">
                <check-comp v-if="decVisable[decListidx].contrItemNote" :checkobj="declistCheckRec[decListidx].contrItemNote" :nowString='decList.contrItemNote' :decCheckClomn="decListidx + '-contrItemNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.contrItemNote || (declistCheckRec[decListidx].contrItemNote && declistCheckRec[decListidx].contrItemNote.length>0)"></div>
                    <span class='content-font'>{{decList.contrItem}}</span>
                  </div>
               </el-popover>
            </td>
            <td  width='10%'>
              <span class='title-name'>商品编号</span>
            </td>
            <td  width='10%' @click="changeBodyColor('codeTs')" :class='colorArr[decList.codeTsColor]'>
               <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('codeTsNote')"
                v-model="decVisable[decListidx].codeTsNote">
                <check-comp v-if="decVisable[decListidx].codeTsNote" :checkobj="declistCheckRec[decListidx].codeTsNote" :nowString='decList.codeTsNote' :decCheckClomn="decListidx + '-codeTsNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.codeTsNote || (declistCheckRec[decListidx].codeTsNote && declistCheckRec[decListidx].codeTsNote.length>0)"></div>
                    <span class='content-font'>{{decList.codeTs}}</span>
                  </div>
               </el-popover>
            </td>
            <td  width='10%'>
              <span class='title-name'>检验检疫名称</span>
            </td>
            <td  colspan = '3' width='30%'  @click="changeBodyColor('ciqName')" :class='colorArr[decList.ciqNameColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('ciqNameNote')"
                v-model="decVisable[decListidx].ciqNameNote">
                <check-comp v-if="decVisable[decListidx].ciqNameNote" :checkobj="declistCheckRec[decListidx].ciqNameNote" :nowString='decList.ciqNameNote' :decCheckClomn="decListidx + '-ciqNameNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content" >
                    <div class="img-tip" v-if="decList.ciqNameNote || (declistCheckRec[decListidx].ciqNameNote && declistCheckRec[decListidx].ciqNameNote.length>0)"></div>
                    <span class='content-font'>{{decList.ciqName}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>商品名称</span>
            </td>
            <td colspan="5" @click="changeBodyColor('gName')" :class='colorArr[decList.gNameColor]'>
               <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('gNameNote')"
                v-model="decVisable[decListidx].gNameNote">
                <check-comp v-if="decVisable[decListidx].gNameNote" :checkobj="declistCheckRec[decListidx].gNameNote" :nowString='decList.gNameNote' :decCheckClomn="decListidx + '-gNameNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.gNameNote || (declistCheckRec[decListidx].gNameNote && declistCheckRec[decListidx].gNameNote.length>0)"></div>
                    <span class='content-font'>{{decList.gName}}</span>
                  </div>
               </el-popover>
            </td>
            <td >
              <span class='title-name'>规格型号</span>
            </td>
            <td colspan="5" @click="changeBodyColor('gModel')" :class='colorArr[decList.gModelColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('gModelNote')"
                v-model="decVisable[decListidx].gModelNote">
                <check-comp v-if="decVisable[decListidx].gModelNote" :checkobj="declistCheckRec[decListidx].gModelNote" :nowString='decList.gModelNote' :decCheckClomn="decListidx + '-gModelNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.gModelNote || (declistCheckRec[decListidx].gModelNote && declistCheckRec[decListidx].gModelNote.length>0)"></div>
                      <span class='content-font'>{{decList.gModel}}</span>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>成交数量</span>
            </td>
            <td  @click="changeBodyColor('gQty')" :class='colorArr[decList.gQtyColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('gQtyNote')"
                v-model="decVisable[decListidx].gQtyNote">
                <check-comp v-if="decVisable[decListidx].gQtyNote" :checkobj="declistCheckRec[decListidx].gQtyNote" :nowString='decList.gQtyNote' :decCheckClomn="decListidx + '-gQtyNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.gQtyNote || (declistCheckRec[decListidx].gQtyNote && declistCheckRec[decListidx].gQtyNote.length>0)"></div>
                    <span class='content-font'>{{decList.gQty}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>成交计量单位</span>
            </td>
            <td @click="changeBodyColor('gUnit')" :class='colorArr[decList.gUnitColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('gUnitNote')"
                v-model="decVisable[decListidx].gUnitNote">
                <check-comp v-if="decVisable[decListidx].gUnitNote" :checkobj="declistCheckRec[decListidx].gUnitNote" :nowString='decList.gUnitNote' :decCheckClomn="decListidx + '-gUnitNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.gUnitNote || (declistCheckRec[decListidx].gUnitNote && declistCheckRec[decListidx].gUnitNote.length>0)"></div>
                    <span class='content-font'>{{decList.gUnitValue}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>单价</span>
            </td>
            <td @click="changeBodyColor('declPrice')" :class='colorArr[decList.declPriceColor]'>
                <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('declPriceNote')"
                v-model="decVisable[decListidx].declPriceNote">
                <check-comp v-if="decVisable[decListidx].declPriceNote" :checkobj="declistCheckRec[decListidx].declPriceNote" :nowString='decList.declPriceNote' :decCheckClomn="decListidx + '-declPriceNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.declPriceNote || (declistCheckRec[decListidx].declPriceNote && declistCheckRec[decListidx].declPriceNote.length>0)"></div>
                    <span class='content-font'>{{decList.declPrice}}</span>
                  </div>
                </el-popover>
            </td>
            <td  width='10%'>
              <span class='title-name'>总价</span>
            </td>
            <td  width='10%' @click="changeBodyColor('declTotal')" :class='colorArr[decList.declTotalColor]'>
                <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('declTotalNote')"
                v-model="decVisable[decListidx].declTotalNote">
                <check-comp v-if="decVisable[decListidx].declTotalNote" :checkobj="declistCheckRec[decListidx].declTotalNote" :nowString='decList.declTotalNote' :decCheckClomn="decListidx + '-declTotalNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.declTotalNote || (declistCheckRec[decListidx].declTotalNote && declistCheckRec[decListidx].declTotalNote.length>0)"></div>
                    <span class='content-font'>{{decList.declTotal}}</span>
                  </div>
                </el-popover>
            </td>
            <td  width='10%'>
              <span class='title-name'>币制</span>
            </td>
            <td width='10%' @click="changeBodyColor('tradeCurr')" :class='colorArr[decList.tradeCurrColor]'>
               <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('tradeCurrNote')"
                v-model="decVisable[decListidx].tradeCurrNote">
                <check-comp v-if="decVisable[decListidx].tradeCurrNote" :checkobj="declistCheckRec[decListidx].tradeCurrNote" :nowString='decList.tradeCurrNote' :decCheckClomn="decListidx + '-tradeCurrNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.tradeCurrNote || (declistCheckRec[decListidx].tradeCurrNote && declistCheckRec[decListidx].tradeCurrNote.length>0)"></div>
                    <span class='content-font'>{{decList.tradeCurrValue}}</span>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>法定第一数量</span>
            </td>
            <td  @click="changeBodyColor('qty1')" :class='colorArr[decList.qty1Color]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('qty1Note')"
                v-model="decVisable[decListidx].qty1Note">
                <check-comp v-if="decVisable[decListidx].qty1Note" :checkobj="declistCheckRec[decListidx].qty1Note" :nowString='decList.qty1Note' :decCheckClomn="decListidx + '-qty1Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.qty1Note || (declistCheckRec[decListidx].qty1Note && declistCheckRec[decListidx].qty1Note.length>0)"></div>
                    <span class='content-font'>{{decList.qty1}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>法定第一计量单位</span>
            </td>
            <td @click="changeBodyColor('unit1')" :class='colorArr[decList.unit1Color]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('unit1Note')"
                v-model="decVisable[decListidx].unit1Note">
                <check-comp v-if="decVisable[decListidx].unit1Note" :checkobj="declistCheckRec[decListidx].unit1Note" :nowString='decList.unit1Note' :decCheckClomn="decListidx + '-unit1Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.unit1Note || (declistCheckRec[decListidx].unit1Note && declistCheckRec[decListidx].unit1Note.length>0)"></div>
                    <span class='content-font'>{{decList.unit1Value}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>加工成品单耗版本号</span>
            </td>
            <td @click="changeBodyColor('exgVersion')" :class='colorArr[decList.exgVersionColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('exgVersionNote')"
                v-model="decVisable[decListidx].exgVersionNote">
                <check-comp v-if="decVisable[decListidx].exgVersionNote" :checkobj="declistCheckRec[decListidx].exgVersionNote" :nowString='decList.exgVersionNote' :decCheckClomn="decListidx + '-exgVersionNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.exgVersionNote || (declistCheckRec[decListidx].exgVersionNote && declistCheckRec[decListidx].exgVersionNote.length>0)"></div>
                    <span class='content-font'>{{decList.exgVersion}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>货号</span>
            </td>
            <td @click="changeBodyColor('exgNo')" :class='colorArr[decList.exgNoColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                height='100%'
                @show="getTypeToDec('exgNoNote')"
                v-model="decVisable[decListidx].exgNoNote">
                <check-comp v-if="decVisable[decListidx].exgNoNote" :checkobj="declistCheckRec[decListidx].exgNoNote" :nowString='decList.exgNoNote' :decCheckClomn="decListidx + '-exgNoNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.exgNoNote || (declistCheckRec[decListidx].exgNoNote && declistCheckRec[decListidx].exgNoNote.length>0)" ></div>
                    <span class='content-font' >{{decList.exgNo }}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>最终目的国（地区）</span>
            </td>
            <td @click="changeBodyColor('destinationCountry')" :class='colorArr[decList.destinationCountryColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('destinationCountryNote')"
                v-model="decVisable[decListidx].destinationCountryNote">
                <check-comp v-if="decVisable[decListidx].destinationCountryNote" :checkobj="declistCheckRec[decListidx].destinationCountryNote" :nowString='decList.destinationCountryNote' :decCheckClomn="decListidx + '-destinationCountryNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.destinationCountryNote || (declistCheckRec[decListidx].destinationCountryNote && declistCheckRec[decListidx].destinationCountryNote.length>0)"></div>
                    <span class='content-font'>{{decList.destinationCountryValue}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>法定第二数量</span>
            </td>
            <td @click="changeBodyColor('qty2')" :class='colorArr[decList.qty2Color]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('qty2Note')"
                v-model="decVisable[decListidx].qty2Note">
                <check-comp v-if="decVisable[decListidx].qty2Note" :checkobj="declistCheckRec[decListidx].qty2Note" :nowString='decList.qty2Note' :decCheckClomn="decListidx + '-qty2Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.qty2Note || (declistCheckRec[decListidx].qty2Note && declistCheckRec[decListidx].qty2Note.length>0)"></div>
                    <span class='content-font'>{{decList.qty2}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>法定第二计量单位</span>
            </td>
            <td @click="changeBodyColor('unit2')" :class='colorArr[decList.unit2Color]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('unit2Note')"
                v-model="decVisable[decListidx].unit2Note">
                <check-comp v-if="decVisable[decListidx].unit2Note" :checkobj="declistCheckRec[decListidx].unit2Note" :nowString='decList.unit2Note' :decCheckClomn="decListidx + '-unit2Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.unit2Note || (declistCheckRec[decListidx].unit2Note && declistCheckRec[decListidx].unit2Note.length>0)"></div>
                    <span class='content-font'>{{decList.unit2Value}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>原产国（地区）</span>
            </td>
            <td @click="changeBodyColor('originCountry')" :class='colorArr[decList.originCountryColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('originCountryNote')"
                v-model="decVisable[decListidx].originCountryNote">
                <check-comp v-if="decVisable[decListidx].originCountryNote" :checkobj="declistCheckRec[decListidx].originCountryNote" :nowString='decList.originCountryNote' :decCheckClomn="decListidx + '-originCountryNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.originCountryNote || (declistCheckRec[decListidx].originCountryNote && declistCheckRec[decListidx].originCountryNote.length>0)"></div>
                    <span class='content-font'>{{decList.originCountryValue}}</span>
                  </div>
              </el-popover>
            </td>
            <td >
              <span class='title-name'>{{iEFlag == 'I' ? '境内目的地':'境内货源地'}}</span>
            </td>
            <td colspan="2" @click="changeBodyColor('districtCode')" :class='colorArr[decList.districtCodeColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('districtCodeNote')"
                v-model="decVisable[decListidx].districtCodeNote">
                <check-comp v-if="decVisable[decListidx].districtCodeNote" :checkobj="declistCheckRec[decListidx].districtCodeNote" :nowString='decList.districtCodeNote' :decCheckClomn="decListidx + '-districtCodeNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.districtCodeNote || (declistCheckRec[decListidx].districtCodeNote && declistCheckRec[decListidx].districtCodeNote.length>0)"></div>
                    <span class='content-font'>{{decList.districtCodeValue}}</span>
                  </div>
              </el-popover>
            </td>
            <td  @click="changeBodyColor('destCode')" :class='colorArr[decList.destCodeColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('destCodeNote')"
                v-model="decVisable[decListidx].destCodeNote">
                <check-comp v-if="decVisable[decListidx].destCodeNote" :checkobj="declistCheckRec[decListidx].destCodeNote" :nowString='decList.destCodeNote' :decCheckClomn="decListidx + '-destCodeNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.destCodeNote || (declistCheckRec[decListidx].destCodeNote && declistCheckRec[decListidx].destCodeNote.length>0)"></div>
                    <span class='content-font'>{{decList.destCodeValue}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td >
              <span class='title-name'>征免方式</span>
            </td>
            <td colspan="9" @click="changeBodyColor('dutyMode')" :class='colorArr[decList.dutyModeColor]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('dutyModeNote')"
                v-model="decVisable[decListidx].dutyModeNote">
                <check-comp v-if="decVisable[decListidx].dutyModeNote" :checkobj="declistCheckRec[decListidx].dutyModeNote" :nowString='decList.dutyModeNote' :decCheckClomn="decListidx + '-dutyModeNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.dutyModeNote || (declistCheckRec[decListidx].dutyModeNote && declistCheckRec[decListidx].dutyModeNote.length>0)"></div>
                    <span class='content-font'>{{decList.dutyModeValue}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="3" @click="changeHeadColor('promiseItem1')" :class='colorArr[headColor.promiseItem1]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('promiseItem1Note')"
                v-model="decVisable[decListidx].promiseItem1Note">
                <check-comp v-if="decVisable[decListidx].promiseItem1Note" :checkobj="declistCheckRec[decListidx].promiseItem1Note" :nowString='decList.promiseItem1Note' :decCheckClomn="decListidx + '-promiseItem1Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.promiseItem1Note || (declistCheckRec[decListidx].promiseItem1Note && declistCheckRec[decListidx].promiseItem1Note.length>0)"></div>
                    <span class='title-name'>特殊关系确认:</span>
                    <span class='content-font'>{{decOther.promiseItem1}}</span>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" @click="changeHeadColor('promiseItem2')" :class='colorArr[headColor.promiseItem2]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('promiseItem2Note')"
                v-model="decVisable[decListidx].promiseItem2Note">
                <check-comp v-if="decVisable[decListidx].promiseItem2Note" :checkobj="declistCheckRec[decListidx].promiseItem2Note" :nowString='decList.promiseItem2Note' :decCheckClomn="decListidx + '-promiseItem2Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.promiseItem2Note || (declistCheckRec[decListidx].promiseItem2Note && declistCheckRec[decListidx].promiseItem2Note.length>0)"></div>
                    <span class='title-name'>价格影响确认:</span>
                    <span class='content-font'>{{decOther.promiseItem2}}</span>
                  </div>
              </el-popover>
            </td>
            <td colspan="3" @click="changeHeadColor('promiseItem3')" :class='colorArr[headColor.promiseItem3]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
                @show="getTypeToDec('promiseItem3Note')"
                v-model="decVisable[decListidx].promiseItem3Note">
                <check-comp v-if="decVisable[decListidx].promiseItem3Note" :checkobj="declistCheckRec[decListidx].promiseItem3Note" :nowString='decList.promiseItem3Note' :decCheckClomn="decListidx + '-promiseItem3Note'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.promiseItem3Note || (declistCheckRec[decListidx].promiseItem3Note && declistCheckRec[decListidx].promiseItem3Note.length>0)"></div>
                    <span class='title-name'>支付特许权使用费确认:</span>
                    <span class='content-font'>{{decOther.promiseItem3}}</span>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" @click="changeHeadColor('chkPayment')" :class='colorArr[headColor.chkPayment]'>
              <el-popover v-if='decVisable.length>0'
                width="300"
               @show="getTypeToDec('chkPaymentNote')"
                v-model="decVisable[decListidx].chkPaymentNote">
                <check-comp v-if="decVisable[decListidx].chkPaymentNote" :checkobj="declistCheckRec[decListidx].chkPaymentNote" :nowString='decList.chkPaymentNote' :decCheckClomn="decListidx + '-chkPaymentNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" class="check-content">
                    <div class="img-tip" v-if="decList.chkPaymentNote || (declistCheckRec[decListidx].chkPaymentNote && declistCheckRec[decListidx].chkPaymentNote.length>0)"></div>
                    <span class='title-name'>自报自缴:</span>
                    <span class='content-font'>{{decHead.chkPayment == '1' ? '是' : '否'}}</span>
                  </div>
              </el-popover>
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
            <td colspan="2" :class='colorArr[headColor.orgCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('orgCodeNote')"
                v-model="headVisible.orgCodeNote">
                <check-comp v-if="headVisible.orgCodeNote" :checkobj="decCheckRec.orgCodeNote" :nowString='decHead.orgCodeNote' :headClomn = "'orgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('orgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.orgCodeNote || (decCheckRec.orgCodeNote && decCheckRec.orgCodeNote.length>0)"></div>
                    <span class='title-name'>检验检疫受理机关</span>
                    <span class='content-font'>{{"(" + decHead.orgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.orgCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2"  :class='colorArr[headColor.vsaOrgCode]'>
               <el-popover
                width="300"
                @show="getTypeToHead('vsaOrgCodeNote')"
                v-model="headVisible.vsaOrgCodeNote">
                <check-comp v-if="headVisible.vsaOrgCodeNote" :checkobj="decCheckRec.vsaOrgCodeNote" :nowString='decHead.vsaOrgCodeNote' :headClomn = "'vsaOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('vsaOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.vsaOrgCodeNote || (decCheckRec.vsaOrgCodeNote && decCheckRec.vsaOrgCodeNote.length>0)"></div>
                    <span  class='title-name'>领证机关</span>
                    <span class='content-font'>{{"(" + decHead.vsaOrgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.vsaOrgCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.inspOrgCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('inspOrgCodeNote')"
                v-model="headVisible.inspOrgCodeNote">
                <check-comp v-if="headVisible.inspOrgCodeNote" :checkobj="decCheckRec.inspOrgCodeNote" :nowString='decHead.inspOrgCodeNote' :headClomn = "'inspOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('inspOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.inspOrgCodeNote || (decCheckRec.inspOrgCodeNote && decCheckRec.inspOrgCodeNote.length>0)"></div>
                    <span class='title-name'>口岸检验检疫机关</span>
                    <span class='content-font'>{{"(" + decHead.inspOrgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.inspOrgCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" @click="changeHeadColor('despDate')" :class='colorArr[headColor.despDate]'>
               <el-popover
                width="300"
                @show="getTypeToHead('despDateNote')"
                v-model="headVisible.despDateNote">
                <check-comp v-if="headVisible.despDateNote" :checkobj="decCheckRec.despDateNote" :nowString='decHead.despDateNote' :headClomn = "'despDateNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('despDate')" slot="reference" >
                    <div class="img-tip" v-if="decHead.despDateNote || (decCheckRec.despDateNote && decCheckRec.despDateNote.length>0)"></div>
                    <span class='title-name'>启运日期</span>
                    <p class='content-font'>{{decHead.despDate}}</p>
                  </div>
               </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.blno]'>
              <el-popover
                width="300"
                @show="getTypeToHead('blnoNote')"
                v-model="headVisible.blnoNote">
                <check-comp v-if="headVisible.blnoNote" :checkobj="decCheckRec.blnoNote" :nowString='decHead.blnoNote' :headClomn = "'blnoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('blno')" slot="reference" >
                    <div class="img-tip" v-if="decHead.blnoNote || (decCheckRec.blnoNote && decCheckRec.blnoNote.length>0)"></div>
                    <span class='title-name'>B/L号</span>
                    <p class='content-font'>{{decHead.blno}}</p>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan = '2' :class='colorArr[headColor.purpOrgCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('purpOrgCodeNote')"
                v-model="headVisible.purpOrgCodeNote">
                <check-comp v-if="headVisible.purpOrgCodeNote" :checkobj="decCheckRec.purpOrgCodeNote" :nowString='decHead.purpOrgCodeNote' :headClomn = "'purpOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('purpOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.purpOrgCodeNote || (decCheckRec.purpOrgCodeNote && decCheckRec.purpOrgCodeNote.length>0)"></div>
                    <span class='title-name'>目的地检验检疫机关</span>
                    <span class='content-font'>{{"(" + decHead.purpOrgCode + ")"}}</span>
                    <p  class='content-font'>{{decHead.purpOrgCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="4" rowspan = '2' :class='colorArr[headColor.correlationaNo]'>
               <el-popover
                width="300"
                @show="getTypeToHead('correlationaNoNote')"
                v-model="headVisible.correlationaNoNote">
                <check-comp v-if="headVisible.correlationaNoNote" :checkobj="decCheckRec.correlationaNoNote" :nowString='decHead.correlationaNoNote' :headClomn = "'correlationaNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('correlationaNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.correlationaNoNote || (decCheckRec.correlationaNoNote && decCheckRec.correlationaNoNote.length>0)"></div>
                    <span class='title-name'>关联号码及理由</span>
                    <span class='content-font'>{{"(" + decHead.correlationaNo + ")"}}</span>
                    <p class='content-font'>{{decHead.correlationReasonFlag + '/' + decHead.correlationReasonFlagValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="4"  :class='colorArr[headColor.origBoxFlag]'>
               <el-popover
                width="300"
                @show="getTypeToHead('origBoxFlagNote')"
                v-model="headVisible.origBoxFlagNote">
                <check-comp v-if="headVisible.origBoxFlagNote" :checkobj="decCheckRec.origBoxFlagNote" :nowString='decHead.origBoxFlagNote' :headClomn = "'origBoxFlagNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('origBoxFlag')" slot="reference" >
                    <div class="img-tip" v-if="decHead.origBoxFlagNote || (decCheckRec.origBoxFlagNote && decCheckRec.origBoxFlagNote.length>0)"></div>
                    <span class='title-name'>原箱运输</span>
                    <span class='content-font'>{{"(" + decHead.origBoxFlag + ")"}}</span>
                    <p class='content-font'>{{decHead.origBoxFlag == '0' ? '否' : '是'}}</p>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="4" :class='colorArr[headColor.specialFlag]'>
              <el-popover
                width="300"
                @show="getTypeToHead('specialFlagNote')"
                v-model="headVisible.specialFlagNote">
                <check-comp v-if="headVisible.specialFlagNote" :checkobj="decCheckRec.specialFlagNote" :nowString='decHead.specialFlagNote' :headClomn = "'specialFlagNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('specialFlag')" slot="reference" >
                    <div class="img-tip" v-if="decHead.specialFlagNote || (decCheckRec.specialFlagNote && decCheckRec.specialFlagNote.length>0)"></div>
                    <span class='title-name'>特殊业务标识</span>
                    <span class='content-font'>{{decOther.specialFlag}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="10" :class='colorArr[headColor.companyCer]'>
              <el-popover
                width="300"
                @show="getTypeToHead('companyCerNote')"
                v-model="headVisible.companyCerNote">
                <check-comp v-if="headVisible.companyCerNote" :checkobj="decCheckRec.companyCerNote" :nowString='decHead.companyCerNote' :headClomn = "'companyCerNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('companyCer')" slot="reference" >
                    <div class="img-tip" v-if="decHead.companyCerNote || (decCheckRec.companyCerNote && decCheckRec.companyCerNote.length>0)"></div>
                    <span class='title-name'>企业资质</span>
                    <p class='content-font'>{{decOther.companyCer}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="10" :class='colorArr[headColor.userInfo]'>
               <el-popover
                width="300"
                @show="getTypeToHead('userInfoNote')"
                v-model="headVisible.userInfoNote">
                <check-comp v-if="headVisible.userInfoNote" :checkobj="decCheckRec.userInfoNote" :nowString='decHead.userInfoNote' :headClomn = "'userInfoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('userInfo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.userInfoNote || (decCheckRec.userInfoNote && decCheckRec.userInfoNote.length>0)"></div>
                    <span class='title-name'>使用人</span>
                    <p class='content-font'>{{decOther.userInfo}}</p>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="10"  :class='colorArr[headColor.inspDecElem]'>
              <el-popover
                width="300"
                @show="getTypeToHead('inspDecElemNote')"
                v-model="headVisible.inspDecElemNote">
                <check-comp v-if="headVisible.inspDecElemNote" :checkobj="decCheckRec.inspDecElemNote" :nowString='decHead.inspDecElemNote' :headClomn = "'inspDecElemNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('inspDecElem')" slot="reference" >
                    <div class="img-tip" v-if="decHead.inspDecElemNote || (decCheckRec.inspDecElemNote && decCheckRec.inspDecElemNote.length>0)"></div>
                    <span class='title-name'>检验检疫签证申报要素</span>
                    <p class='content-font'>{{decOther.inspDecElem}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="5" :class='colorArr[headColor.domesticConsigneeEname]'>
               <el-popover
                width="300"
                @show="getTypeToHead('domesticConsigneeEnameNote')"
                v-model="headVisible.domesticConsigneeEnameNote">
                <check-comp v-if="headVisible.domesticConsigneeEnameNote" :checkobj="decCheckRec.domesticConsigneeEnameNote" :nowString='decHead.domesticConsigneeEnameNote' :headClomn = "'domesticConsigneeEnameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('domesticConsigneeEname')" slot="reference" >
                    <div class="img-tip" v-if="decHead.domesticConsigneeEnameNote || (decCheckRec.domesticConsigneeEnameNote && decCheckRec.domesticConsigneeEnameNote.length>0)"></div>
                    <span class='title-name'>境内收发货人名称(外文)</span>
                    <span class='content-font'>{{decHead.domesticConsigneeEname}}</span>
                  </div>
               </el-popover>
            </td>
            <td colspan="5" :class='colorArr[headColor.overseasConsignorCname]'>
              <el-popover
                width="300"
                @show="getTypeToHead('overseasConsignorCnameNote')"
                v-model="headVisible.overseasConsignorCnameNote">
                <check-comp v-if="headVisible.overseasConsignorCnameNote" :checkobj="decCheckRec.overseasConsignorCnameNote" :nowString='decHead.overseasConsignorCnameNote' :headClomn = "'overseasConsignorCnameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('overseasConsignorCname')" slot="reference">
                    <div class="img-tip" v-if="decHead.overseasConsignorCnameNote || (decCheckRec.overseasConsignorCnameNote && decCheckRec.overseasConsignorCnameNote.length>0)"></div>
                    <span class='title-name'>境外收发货人名称(中文)</span>
                    <span class='content-font'>{{decHead.overseasConsignorCname}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="5" :class='colorArr[headColor.overseasConsignorAddr]'>
               <el-popover
                width="300"
                @show="getTypeToHead('overseasConsignorAddrNote')"
                v-model="headVisible.overseasConsignorAddrNote">
                <check-comp v-if="headVisible.overseasConsignorAddrNote" :checkobj="decCheckRec.overseasConsignorAddrNote" :nowString='decHead.overseasConsignorAddrNote' :headClomn = "'overseasConsignorAddrNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('overseasConsignorAddr')" slot="reference" >
                    <div class="img-tip" v-if="decHead.overseasConsignorAddrNote || (decCheckRec.overseasConsignorAddrNote && decCheckRec.overseasConsignorAddrNote.length>0)"></div>
                    <span class='title-name'>境外发货人地址</span>
                    <span class='content-font'>{{decHead.overseasConsignorAddr}}</span>
                  </div>
               </el-popover>
            </td>
            <td colspan="5"  :class='colorArr[headColor.cmplDschrgDt]'>
               <el-popover
                width="300"
                @show="getTypeToHead('cmplDschrgDtNote')"
                v-model="headVisible.cmplDschrgDtNote">
                <check-comp v-if="headVisible.cmplDschrgDtNote" :checkobj="decCheckRec.cmplDschrgDtNote" :nowString='decHead.cmplDschrgDtNote' :headClomn = "'cmplDschrgDtNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('cmplDschrgDt')" slot="reference" >
                    <div class="img-tip" v-if="decHead.cmplDschrgDtNote || (decCheckRec.cmplDschrgDtNote && decCheckRec.cmplDschrgDtNote.length>0)"></div>
                    <span class='title-name'>卸毕日期</span>
                    <p class='content-font'>{{decHead.cmplDschrgDt}}</p>
                  </div>
               </el-popover>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <table>
          <tr>
            <td colspan="2" :class='colorArr[headColor.orgCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('orgCodeNote')"
                v-model="headVisible.orgCodeNote">
                <check-comp v-if="headVisible.orgCodeNote" :checkobj="decCheckRec.orgCodeNote" :nowString='decHead.orgCodeNote' :headClomn = "'orgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('orgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.orgCodeNote || (decCheckRec.orgCodeNote && decCheckRec.orgCodeNote.length>0)"></div>
                    <span class='title-name'>检验检疫受理机关</span>
                    <span class='content-font'>{{"(" + decHead.orgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.orgCodeValue}}</p>
                  </div>
               </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.vsaOrgCode]'>
              <el-popover
                width="300"
                @show="getTypeToHead('vsaOrgCodeNote')"
                v-model="headVisible.vsaOrgCodeNote">
                <check-comp v-if="headVisible.vsaOrgCodeNote" :checkobj="decCheckRec.vsaOrgCodeNote" :nowString='decHead.vsaOrgCodeNote' :headClomn = "'vsaOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('vsaOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.vsaOrgCodeNote || (decCheckRec.vsaOrgCodeNote && decCheckRec.vsaOrgCodeNote.length>0)"></div>
                    <span  class='title-name'>领证机关</span>
                    <span class='content-font'>{{"(" + decHead.vsaOrgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.vsaOrgCodeValue}}</p>
                  </div>
              </el-popover>
            </td>
            <td colspan="2" :class='colorArr[headColor.inspOrgCode]'>
               <el-popover
                width="300"
                @show="getTypeToHead('inspOrgCodeNote')"
                v-model="headVisible.inspOrgCodeNote">
                <check-comp v-if="headVisible.inspOrgCodeNote" :checkobj="decCheckRec.inspOrgCodeNote" :nowString='decHead.inspOrgCodeNote' :headClomn = "'inspOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('inspOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.inspOrgCodeNote || (decCheckRec.inspOrgCodeNote && decCheckRec.inspOrgCodeNote.length>0)"></div>
                    <span class='title-name'>口岸检验检疫机关</span>
                    <span class='content-font'>{{"(" + decHead.inspOrgCode + ")"}}</span>
                    <p class='content-font'>{{decHead.inspOrgCodeValue}}</p>
                  </div>
               </el-popover>
            </td>
             <td colspan="2" :class='colorArr[headColor.purpOrgCode]'>
               <el-popover
                width="300"
                @show="getTypeToHead('purpOrgCodeNote')"
                v-model="headVisible.purpOrgCodeNote">
                <check-comp v-if="headVisible.purpOrgCodeNote" :checkobj="decCheckRec.purpOrgCodeNote" :nowString='decHead.purpOrgCodeNote' :headClomn = "'purpOrgCodeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('purpOrgCode')" slot="reference" >
                    <div class="img-tip" v-if="decHead.purpOrgCodeNote || (decCheckRec.purpOrgCodeNote && decCheckRec.purpOrgCodeNote.length>0)"></div>
                    <span class='title-name'>目的地检验检疫机关</span>
                    <span class='content-font'>{{"(" + decHead.purpOrgCode + ")"}}</span>
                    <p class='content-font' >{{decHead.purpOrgCodeValue}}</p>
                  </div>
                </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="4" :class='colorArr[headColor.correlationaNo]'>
                <el-popover
                width="300"
                @show="getTypeToHead('correlationaNoNote')"
                v-model="headVisible.correlationaNoNote">
                <check-comp v-if="headVisible.correlationaNoNote" :checkobj="decCheckRec.correlationaNoNote" :nowString='decHead.correlationaNoNote' :headClomn = "'correlationaNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('correlationaNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.correlationaNoNote || (decCheckRec.correlationaNoNote && decCheckRec.correlationaNoNote.length>0)"></div>
                    <span class='title-name'>关联号码及理由</span>
                    <span class='content-font'>{{"(" + decHead.correlationaNo + ")"}}</span>
                    <p class='content-font'>{{decHead.correlationReasonFlag + '/' + decHead.correlationReasonFlagValue}}</p>
                  </div>
                </el-popover>
            </td>
            <td colspan="4" :class='colorArr[headColor.specialFlag]'>
               <el-popover
                width="300"
                @show="getTypeToHead('specialFlagNote')"
                v-model="headVisible.specialFlagNote">
                <check-comp v-if="headVisible.specialFlagNote" :checkobj="decCheckRec.specialFlagNote" :nowString='decHead.specialFlagNote' :headClomn = "'specialFlagNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('specialFlag')" slot="reference" >
                    <div class="img-tip" v-if="decHead.specialFlagNote || (decCheckRec.specialFlagNote && decCheckRec.specialFlagNote.length>0)"></div>
                    <span class='title-name'>特殊业务标识</span>
                    <span class='content-font'>{{decOther.specialFlag}}</span>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="10" :class='colorArr[headColor.companyCer]'>
                <el-popover
                width="300"
                @show="getTypeToHead('companyCerNote')"
                v-model="headVisible.companyCerNote">
                <check-comp v-if="headVisible.companyCerNote" :checkobj="decCheckRec.companyCerNote" :nowString='decHead.companyCerNote' :headClomn = "'companyCerNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('companyCer')" slot="reference" >
                    <div class="img-tip" v-if="decHead.companyCerNote || (decCheckRec.companyCerNote && decCheckRec.companyCerNote.length>0)"></div>
                    <span class='title-name'>企业资质</span>
                    <p class='content-font'>{{decOther.companyCer}}</p>
                  </div>
               </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="4"  :class='colorArr[headColor.inspDecElem]'>
              <el-popover
                width="300"
                @show="getTypeToHead('inspDecElemNote')"
                v-model="headVisible.inspDecElemNote">
                <check-comp v-if="headVisible.inspDecElemNote" :checkobj="decCheckRec.inspDecElemNote" :nowString='decHead.inspDecElemNote' :headClomn = "'inspDecElemNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('inspDecElem')" slot="reference" >
                    <div class="img-tip" v-if="decHead.inspDecElemNote || (decCheckRec.inspDecElemNote && decCheckRec.inspDecElemNote.length>0)"></div>
                    <span class='title-name'>检验检疫签证申报要素</span>
                    <p class='content-font'>{{decOther.inspDecElem}}</p>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td colspan="5"  :class='colorArr[headColor.domesticConsigneeEname]'>
              <el-popover
                width="300"
                @show="getTypeToHead('domesticConsigneeEnameNote')"
                v-model="headVisible.domesticConsigneeEnameNote">
                <check-comp v-if="headVisible.domesticConsigneeEnameNote" :checkobj="decCheckRec.domesticConsigneeEnameNote" :nowString='decHead.domesticConsigneeEnameNote' :headClomn = "'domesticConsigneeEnameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('domesticConsigneeEname')" slot="reference" >
                    <div class="img-tip" v-if="decHead.domesticConsigneeEnameNote || (decCheckRec.domesticConsigneeEnameNote && decCheckRec.domesticConsigneeEnameNote.length>0)"></div>
                    <span class='title-name'>境内收发货人名称(外文)</span>
                    <span class='content-font'>{{decHead.domesticConsigneeEname}}</span>
                  </div>
              </el-popover>
            </td>
            <td colspan="5" :class='colorArr[headColor.overseasConsignorCname]'>
                 <el-popover
                width="300"
                @show="getTypeToHead('overseasConsignorCnameNote')"
                v-model="headVisible.overseasConsignorCnameNote">
                <check-comp v-if="headVisible.overseasConsignorCnameNote" :checkobj="decCheckRec.overseasConsignorCnameNote" :nowString='decHead.overseasConsignorCnameNote' :headClomn = "'overseasConsignorCnameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('overseasConsignorCname')" slot="reference" >
                    <div class="img-tip" v-if="decHead.overseasConsignorCnameNote || (decCheckRec.overseasConsignorCnameNote && decCheckRec.overseasConsignorCnameNote.length>0)"></div>
                    <span class='title-name'>境外收发货人名称(中文)</span>
                    <p class='content-font'>{{decHead.overseasConsignorCname}}</p>
                  </div>
                </el-popover>
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
              <el-popover
                width="300"
                @show="getTypeTodeCheck('gNoNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].gNoNote">
                <check-comp v-if="deCheckListVisable[scope.$index].gNoNote" :checkobj="declistCheckRec[scope.$index].gNoNote" :nowString='scope.row.gNoNote' :decCheckClomn="scope.$index + '-gNoNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                <div class="img-table-tip" v-if="scope.row.gNoNote || (declistCheckRec[scope.$index].gNoNote && declistCheckRec[scope.$index].gNoNote.length>0)"></div>
                <span>{{scope.row.gNo}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="codeTsColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('codeTsNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].codeTsNote">
                <check-comp v-if="deCheckListVisable[scope.$index].codeTsNote" :checkobj="declistCheckRec[scope.$index].codeTsNote" :nowString='scope.row.codeTsNote' :decCheckClomn="scope.$index + '-codeTsNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.codeTsNote || (declistCheckRec[scope.$index].codeTsNote && declistCheckRec[scope.$index].codeTsNote.length>0)"></div>
              <span>{{scope.row.codeTs}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="gNameColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('gNameNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].gNameNote">
                <check-comp v-if="deCheckListVisable[scope.$index].gNameNote" :checkobj="declistCheckRec[scope.$index].gNameNote" :nowString='scope.row.gNameNote' :decCheckClomn="scope.$index + '-gNameNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.gNameNote || (declistCheckRec[scope.$index].gNameNote && declistCheckRec[scope.$index].gNameNote.length>0)"></div>
              <span>{{scope.row.gName}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="检验检疫编码及名称" prop="ciqCodeColor" min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('ciqCodeNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].ciqCodeNote">
                <check-comp v-if="deCheckListVisable[scope.$index].ciqCodeNote" :checkobj="declistCheckRec[scope.$index].ciqCodeNote" :nowString='scope.row.ciqCodeNote' :decCheckClomn="scope.$index + '-ciqCodeNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.ciqCodeNote || (declistCheckRec[scope.$index].ciqCodeNote && declistCheckRec[scope.$index].ciqCodeNote.length>0)"></div>
                  <span>{{scope.row.ciqCode}}</span><br>
                  <span>{{scope.row.ciqName}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="检验检疫货物规格" prop="goodsSpecColor"  min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('goodsSpecNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].goodsSpecNote">
                <check-comp v-if="deCheckListVisable[scope.$index].goodsSpecNote" :checkobj="declistCheckRec[scope.$index].goodsSpecNote" :nowString='scope.row.goodsSpecNote' :decCheckClomn="scope.$index + '-goodsSpecNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.goodsSpecNote || (declistCheckRec[scope.$index].goodsSpecNote && declistCheckRec[scope.$index].goodsSpecNote.length>0)"></div>
                  <span>{{scope.row.goodsSpec}}</span><br>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="货物属性" prop="showGoodsAttrValueColor"  min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('showGoodsAttrValueNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].showGoodsAttrValueNote">
                <check-comp v-if="deCheckListVisable[scope.$index].showGoodsAttrValueNote" :checkobj="declistCheckRec[scope.$index].showGoodsAttrValueNote" :nowString='scope.row.showGoodsAttrValueNote' :decCheckClomn="scope.$index + '-showGoodsAttrValueNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.showGoodsAttrValueNote || (declistCheckRec[scope.$index].showGoodsAttrValueNote && declistCheckRec[scope.$index].showGoodsAttrValueNote.length>0)"></div>
                  <span>{{scope.row.showGoodsAttrValue}}</span><br>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="用途" prop="purposeColor"  min-width="150">
            <template slot-scope="scope">
               <el-popover
                width="300"
                @show="getTypeTodeCheck('purposeNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].purposeNote">
                <check-comp v-if="deCheckListVisable[scope.$index].purposeNote" :checkobj="declistCheckRec[scope.$index].purposeNote" :nowString='scope.row.purposeNote' :decCheckClomn="scope.$index + '-purposeNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.purposeNote || (declistCheckRec[scope.$index].purposeNote && declistCheckRec[scope.$index].purposeNote.length>0)"></div>
                  <span>{{scope.row.purpose}}</span><br>
                  <span>{{scope.row.purposeValue}}</span>
                </div>
               </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="许可证类别及编号" prop="licenseTypeNoColor" min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeTodeCheck('licenseTypeNoNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].licenseTypeNoNote">
                <check-comp v-if="deCheckListVisable[scope.$index].licenseTypeNoNote" :checkobj="declistCheckRec[scope.$index].licenseTypeNoNote" :nowString='scope.row.licenseTypeNoNote' :decCheckClomn="scope.$index + '-licenseTypeNoNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.licenseTypeNoNote || (declistCheckRec[scope.$index].licenseTypeNoNote && declistCheckRec[scope.$index].licenseTypeNoNote.length>0)"></div>
                  <span>{{scope.row.licenseTypeNo}}</span><br>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column  min-width="150" prop="dangerGoodsInfoColor" label="危险货物信息">
            <template slot-scope="scope">
               <el-popover
                width="300"
                @show="getTypeTodeCheck('dangerGoodsInfoNote',scope.$index)"
                v-model="deCheckListVisable[scope.$index].dangerGoodsInfoNote">
                <check-comp v-if="deCheckListVisable[scope.$index].dangerGoodsInfoNote" :checkobj="declistCheckRec[scope.$index].dangerGoodsInfoNote" :nowString='scope.row.dangerGoodsInfoNote' :decCheckClomn="scope.$index + '-dangerGoodsInfoNote'" @backNote='getNote'></check-comp>
                <div slot="reference" >
                  <div class="img-table-tip" v-if="scope.row.dangerGoodsInfoNote || (declistCheckRec[scope.$index].dangerGoodsInfoNote && declistCheckRec[scope.$index].dangerGoodsInfoNote.length>0)"></div>
                  <span>{{scope.row.dangerGoodsInfo}}</span>
                </div>
               </el-popover>
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
            <td colspan="3" :class='colorArr[headColor.goodsNote]'>
              <el-popover
                width="300"
                @show="getTypeToHead('goodsNoteNote')"
                v-model="headVisible.goodsNoteNote">
                <check-comp v-if="headVisible.goodsNoteNote" :checkobj="decCheckRec.goodsNoteNote" :nowString='decHead.goodsNoteNote' :headClomn = "'goodsNoteNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('goodsNote')" slot="reference" >
                    <div class="img-tip" v-if="decHead.goodsNoteNote || (decCheckRec.goodsNoteNote && decCheckRec.goodsNoteNote.length>0)"></div>
                    <span class='title-name'>备注:</span>
                    <span class='content-font'>{{decHead.noteS + decHead.markNo}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr v-if = "iEFlag == 'I'">
            <td  :class='colorArr[headColor.purpose]' width="33%">
             <el-popover
                width="300"
                @show="getTypeToHead('purposeNote')"
                v-model="headVisible.purposeNote">
                <check-comp v-if="headVisible.purposeNote" :checkobj="decCheckRec.purposeNote" :nowString='decHead.purposeNote' :headClomn = "'purposeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('purpose')" slot="reference" >
                    <div class="img-tip" v-if="decHead.purposeNote || (decCheckRec.purposeNote && decCheckRec.purposeNote.length>0)"></div>
                    <span class='title-name'>用途:</span>
                    <span class='content-font'>{{ '(' + decOther.purpose + ')'}}</span>
                    <span class='content-font'>{{decOther.purposeValue}}</span>
                  </div>
              </el-popover>
            </td>
            <td :class='colorArr[headColor.cmplDschrgDt]' width="33%">
             <el-popover
                width="300"
                @show="getTypeToHead('cmplDschrgDtNote')"
                v-model="headVisible.cmplDschrgDtNote">
                <check-comp v-if="headVisible.cmplDschrgDtNote" :checkobj="decCheckRec.cmplDschrgDtNote" :nowString='decHead.cmplDschrgDtNote' :headClomn = "'cmplDschrgDtNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('cmplDschrgDt')" slot="reference" >
                    <div class="img-tip" v-if="decHead.cmplDschrgDtNote || (decCheckRec.cmplDschrgDtNote && decCheckRec.cmplDschrgDtNote.length>0)"></div>
                    <span class='title-name'>卸毕日期:</span>
                    <span class='content-font'>{{decHead.cmplDschrgDt}}</span>
                  </div>
              </el-popover>
            </td>
            <td :class='colorArr[headColor.blno]' width="34%">
                <el-popover
                width="300"
                @show="getTypeToHead('blnoNote')"
                v-model="headVisible.blnoNote">
                <check-comp v-if="headVisible.blnoNote" :checkobj="decCheckRec.blnoNote" :nowString='decHead.blnoNote' :headClomn = "'blnoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('blno')" slot="reference" >
                    <div class="img-tip" v-if="decHead.blnoNote || (decCheckRec.blnoNote && decCheckRec.blnoNote.length>0)"></div>
                    <span class='title-name'>B/L号:</span>
                    <span class='content-font'>{{decHead.blno}}</span>
                  </div>
                </el-popover>
            </td>
          </tr>
          <tr v-else>
            <td :class='colorArr[headColor.purpose]' width="33%">
              <el-popover
                width="300"
                @show="getTypeToHead('purposeNote')"
                v-model="headVisible.purposeNote">
                <check-comp v-if="headVisible.purposeNote" :checkobj="decCheckRec.purposeNote" :nowString='decHead.purposeNote' :headClomn = "'purposeNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('purpose')" slot="reference" >
                    <div class="img-tip" v-if="decHead.purposeNote || (decCheckRec.purposeNote && decCheckRec.purposeNote.length>0)"></div>
                    <span class='title-name'>用途:</span>
                    <span class='content-font'>{{ '(' + decOther.purpose + ')'}}</span>
                    <span class='content-font'>{{decOther.purposeValue}}</span>
                  </div>
              </el-popover>
            </td>
            <td colspan="2"  :class='colorArr[headColor.blno]' width="67%">
               <el-popover
                width="300"
                @show="getTypeToHead('blnoNote')"
                v-model="headVisible.blnoNote">
                <check-comp v-if="headVisible.blnoNote" :checkobj="decCheckRec.blnoNote" :nowString='decHead.blnoNote' :headClomn = "'blnoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('blno')" slot="reference" >
                    <div class="img-tip" v-if="decHead.blnoNote || (decCheckRec.blnoNote && decCheckRec.blnoNote.length>0)"></div>
                    <span class='title-name'>B/L号</span>
                    <span class='content-font'>{{decHead.blno}}</span>
                  </div>
                </el-popover>
            </td>
          </tr>
          <tr >
            <td colspan="3"  :class='colorArr[headColor.approveNo]'>
               <el-popover
                width="300"
                @show="getTypeToHead('approveNoNote')"
                v-model="headVisible.approveNoNote">
                <check-comp v-if="headVisible.approveNoNote" :checkobj="decCheckRec.approveNoNote" :nowString='decHead.approveNoNote' :headClomn = "'approveNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('approveNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.approveNoNote || (decCheckRec.approveNoNote && decCheckRec.approveNoNote.length>0)"></div>
                    <span class='title-name'>许可证/审批号:</span>
                    <span class='content-font'>{{decOther.approveNo}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr >
            <td colspan="3" :class='colorArr[headColor.originRelation]'>
              <el-popover
                width="300"
                @show="getTypeToHead('originRelationNote')"
                v-model="headVisible.originRelationNote">
                <check-comp v-if="headVisible.originRelationNote" :checkobj="decCheckRec.originRelationNote" :nowString='decHead.originRelationNote' :headClomn = "'originRelationNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('originRelation')" slot="reference" >
                    <div class="img-tip" v-if="decHead.originRelationNote || (decCheckRec.originRelationNote && decCheckRec.originRelationNote.length>0)"></div>
                    <span class='title-name'>原产地对应关系:</span>
                    <span class='content-font'>{{decOther.originRelation}}</span>
                  </div>
              </el-popover>
            </td>
          </tr>
          <tr>
            <td :class='colorArr[headColor.billNo]'>
             <el-popover
                width="300"
                @show="getTypeToHead('billNoNote')"
                v-model="headVisible.billNoNote">
                <check-comp v-if="headVisible.billNoNote" :checkobj="decCheckRec.billNoNote" :nowString='decHead.billNoNote' :headClomn = "'billNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('billNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.billNoNote || (decCheckRec.billNoNote && decCheckRec.billNoNote.length>0)"></div>
                    <span class='title-name'>提单号:</span>
                    <span class='content-font'>{{decHead.billNo}}</span>
                  </div>
              </el-popover>
            </td>
            <td :class='colorArr[headColor.voyageNo]'>
              <el-popover
                width="300"
                @show="getTypeToHead('voyageNoNote')"
                v-model="headVisible.voyageNoNote">
                <check-comp v-if="headVisible.voyageNoNote" :checkobj="decCheckRec.voyageNoNote" :nowString='decHead.voyageNoNote' :headClomn = "'voyageNoNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('voyageNo')" slot="reference" >
                    <div class="img-tip" v-if="decHead.voyageNoNote || (decCheckRec.voyageNoNote && decCheckRec.voyageNoNote.length>0)"></div>
                    <span class='title-name'>航次号:</span>
                    <span class='content-font'>{{decHead.voyageNo}}</span>
                  </div>
                </el-popover>
            </td>
            <td :class='colorArr[headColor.trafName]'>
               <el-popover
                width="300"
                @show="getTypeToHead('trafNameNote')"
                v-model="headVisible.trafNameNote">
                <check-comp v-if="headVisible.trafNameNote" :checkobj="decCheckRec.trafNameNote" :nowString='decHead.trafNameNote' :headClomn = "'trafNameNote'" @backNote='getNote'></check-comp>
                  <div @click="changeHeadColor('trafName')" slot="reference" >
                    <div class="img-tip" v-if="decHead.trafNameNote || (decCheckRec.trafNameNote && decCheckRec.trafNameNote.length>0)"></div>
                    <span class='title-name'>运输工具名称:</span>
                    <span class='content-font'>{{decHead.trafName}}</span>
                  </div>
              </el-popover>
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
               <el-popover
                width="300"
                @show="getTypeToGoods('gNoNote',scope.$index)"
                v-model="goodsVisable[scope.$index].gNoNote">
                <check-comp v-if="goodsVisable[scope.$index].gNoNote" :checkobj="declistCheckRec[scope.$index].gNoNote" :nowString='scope.row.gNoNote' :decCheckClomn="scope.$index + '-gNoNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.gNoNote || (declistCheckRec[scope.$index].gNoNote && declistCheckRec[scope.$index].gNoNote.length>0)"></div>
                    <span>{{scope.row.gNo}}</span>
                  </div>
               </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="codeTsColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('codeTsNote',scope.$index)"
                v-model="goodsVisable[scope.$index].codeTsNote">
                <check-comp v-if="goodsVisable[scope.$index].codeTsNote" :checkobj="declistCheckRec[scope.$index].codeTsNote" :nowString='scope.row.codeTsNote' :decCheckClomn="scope.$index + '-codeTsNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.codeTsNote || (declistCheckRec[scope.$index].codeTsNote && declistCheckRec[scope.$index].codeTsNote.length>0)"></div>
                    <span>{{scope.row.codeTs}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="商品名称、规格型号" prop="gNameAndModelColor"  min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('gNameAndModelNote',scope.$index)"
                v-model="goodsVisable[scope.$index].gNameAndModelNote">
                <check-comp v-if="goodsVisable[scope.$index].gNameAndModelNote" :checkobj="declistCheckRec[scope.$index].gNameAndModelNote" :nowString='scope.row.gNameAndModelNote' :decCheckClomn="scope.$index + '-gNameAndModelNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.gNameAndModelNote || (declistCheckRec[scope.$index].gNameAndModelNote && declistCheckRec[scope.$index].gNameAndModelNote.length>0)"></div>
                    <span>{{scope.row.gName}}</span><br>
                    <span>{{scope.row.gModel}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="数量及单位" prop="gQtyAndUnitColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <el-popover
                width="300"
                 @show="getTypeToGoods('gQtyAndUnitNote',scope.$index)"
                v-model="goodsVisable[scope.$index].gQtyAndUnitNote">
                <check-comp v-if="goodsVisable[scope.$index].gQtyAndUnitNote" :checkobj="declistCheckRec[scope.$index].gQtyAndUnitNote" :nowString='scope.row.gQtyAndUnitNote' :decCheckClomn="scope.$index + '-gQtyAndUnitNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.gQtyAndUnitNote || (declistCheckRec[scope.$index].gQtyAndUnitNote && declistCheckRec[scope.$index].gQtyAndUnitNote.length>0)"></div>
                    <span>{{scope.row.gQty + scope.row.gUnitValue}}</span><br>
                    <span>{{scope.row.qty1 + scope.row.unit1Value}}</span><br>
                    <span>{{scope.row.qty2 + scope.row.unit2Value}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="最终目的国（地区）" prop="destinationCountryColor"  min-width="150">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('destinationCountryNote',scope.$index)"
                v-model="goodsVisable[scope.$index].destinationCountryNote">
                <check-comp v-if="goodsVisable[scope.$index].destinationCountryNote" :checkobj="declistCheckRec[scope.$index].destinationCountryNote" :nowString='scope.row.destinationCountryNote' :decCheckClomn="scope.$index + '-destinationCountryNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.destinationCountryNote || (declistCheckRec[scope.$index].destinationCountryNote && declistCheckRec[scope.$index].destinationCountryNote.length>0)"></div>
                    <span>{{scope.row.destinationCountryValue}}</span><br>
                    <span>{{scope.row.destinationCountry}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="declPriceColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('declPriceNote',scope.$index)"
                v-model="goodsVisable[scope.$index].declPriceNote">
                <check-comp v-if="goodsVisable[scope.$index].declPriceNote" :checkobj="declistCheckRec[scope.$index].declPriceNote" :nowString='scope.row.declPriceNote' :decCheckClomn="scope.$index + '-declPriceNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.declPriceNote || (declistCheckRec[scope.$index].declPriceNote && declistCheckRec[scope.$index].declPriceNote.length>0)"></div>
                    <span>{{scope.row.declPrice}}</span><br>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="总价" prop="declTotalColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('declTotalNote',scope.$index)"
                v-model="goodsVisable[scope.$index].declTotalNote">
                <check-comp v-if="goodsVisable[scope.$index].declTotalNote" :checkobj="declistCheckRec[scope.$index].declTotalNote" :nowString='scope.row.declTotalNote' :decCheckClomn="scope.$index + '-declTotalNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.declTotalNote || (declistCheckRec[scope.$index].declTotalNote && declistCheckRec[scope.$index].declTotalNote.length>0)"></div>
                    <span>{{scope.row.declTotal}}</span><br>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="币制" prop="tradeCurrColor"  min-width="100" align='right'>
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('tradeCurrNote',scope.$index)"
                v-model="goodsVisable[scope.$index].tradeCurrNote">
                <check-comp v-if="goodsVisable[scope.$index].tradeCurrNote" :checkobj="declistCheckRec[scope.$index].tradeCurrNote" :nowString='scope.row.tradeCurrNote' :decCheckClomn="scope.$index + '-tradeCurrNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.tradeCurrNote || (declistCheckRec[scope.$index].tradeCurrNote && declistCheckRec[scope.$index].tradeCurrNote.length>0)"></div>
                    <span>{{scope.row.tradeCurrValue}}</span><br>
                    <span>{{scope.row.tradeCurr}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="征免" prop="dutyModeColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('dutyModeNote',scope.$index)"
                v-model="goodsVisable[scope.$index].dutyModeNote">
                <check-comp v-if="goodsVisable[scope.$index].dutyModeNote" :checkobj="declistCheckRec[scope.$index].dutyModeNote" :nowString='scope.row.dutyModeNote' :decCheckClomn="scope.$index + '-dutyModeNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.dutyModeNote || (declistCheckRec[scope.$index].dutyModeNote && declistCheckRec[scope.$index].dutyModeNote.length>0)"></div>
                    <span>{{scope.row.dutyModeValue}}</span><br>
                    <span>{{scope.row.dutyMode}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="版本号" prop="exgVersionColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToGoods('exgVersionNote',scope.$index)"
                v-model="goodsVisable[scope.$index].exgVersionNote">
                <check-comp v-if="goodsVisable[scope.$index].exgVersionNote" :checkobj="declistCheckRec[scope.$index].exgVersionNote" :nowString='scope.row.exgVersionNote' :decCheckClomn="scope.$index + '-exgVersionNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.exgVersionNote || (declistCheckRec[scope.$index].exgVersionNote && declistCheckRec[scope.$index].exgVersionNote.length>0)"></div>
                    <span>{{scope.row.exgVersion}}</span><br>
                  </div>
              </el-popover>
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
    <el-tab-pane label="集装箱附加页" name="container">
      <div style='height: 500px;'>
        <el-table class='sys-table-table dec-table'
        ref='checkContaTable' :data="container"
        max-height="400"
        @cell-click='checkContaCellClcik'
        :cell-class-name="deCellClass"
        border highlight-current-row size="mini">
          <el-table-column label="集装箱号" prop="containerNoColor" align='center' min-width="80">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToContainer('containerNoNote',scope.$index)"
                v-model="containerVisable[scope.$index].containerNoNote">
                <check-comp v-if="containerVisable[scope.$index].containerNoNote" :checkobj="containerMapCheckRec[scope.$index].containerNoNote" :nowString='scope.row.containerNoNote' :containerClomn="scope.$index + '-containerNoNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.containerNoNote || (containerMapCheckRec[scope.$index].containerNoNote && containerMapCheckRec[scope.$index].containerNoNote.length>0)"></div>
                    <span>{{scope.row.containerNo}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="集装箱规格" align='center' prop="containerSizeColor" min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToContainer('containerSizeNote',scope.$index)"
                v-model="containerVisable[scope.$index].containerSizeNote">
                <check-comp v-if="containerVisable[scope.$index].containerSizeNote" :checkobj="containerMapCheckRec[scope.$index].containerSizeNote" :nowString='scope.row.containerSizeNote' :containerClomn="scope.$index + '-containerSizeNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.containerSizeNote || (containerMapCheckRec[scope.$index].containerSizeNote && containerMapCheckRec[scope.$index].containerSizeNote.length>0)"></div>
                    <span>{{scope.row.containerSize}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="拼箱标识" prop="lclFlagColor" align='center'  min-width="120">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToContainer('lclFlagNote',scope.$index)"
                v-model="containerVisable[scope.$index].lclFlagNote">
                <check-comp v-if="containerVisable[scope.$index].lclFlagNote" :checkobj="containerMapCheckRec[scope.$index].lclFlagNote" :nowString='scope.row.lclFlagNote' :containerClomn="scope.$index + '-lclFlagNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.lclFlagNote || (containerMapCheckRec[scope.$index].lclFlagNote && containerMapCheckRec[scope.$index].lclFlagNote.length>0)"></div>
                    <span>{{scope.row.lclFlag === '0' ? '否' : scope.row.lclFlag === '1' ? '是' : ''}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="商品项号关系" prop="goodsNoColor"  min-width="150" align='center'>
            <template slot-scope="scope">
               <el-popover
                width="300"
                @show="getTypeToContainer('goodsNoNote',scope.$index)"
                v-model="containerVisable[scope.$index].goodsNoNote">
                <check-comp v-if="containerVisable[scope.$index].goodsNoNote" :checkobj="containerMapCheckRec[scope.$index].goodsNoNote" :nowString='scope.row.goodsNoNote' :containerClomn="scope.$index + '-goodsNoNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.goodsNoNote || (containerMapCheckRec[scope.$index].goodsNoNote && containerMapCheckRec[scope.$index].goodsNoNote.length>0)"></div>
                    <span>{{scope.row.goodsNo}}</span>
                  </div>
               </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="自重(KG)" prop="containerWeightColor" align='center' min-width="100">
            <template slot-scope="scope">
              <el-popover
                width="300"
                @show="getTypeToContainer('containerWeightNote',scope.$index)"
                v-model="containerVisable[scope.$index].containerWeightNote">
                <check-comp v-if="containerVisable[scope.$index].containerWeightNote" :checkobj="containerMapCheckRec[scope.$index].containerWeightNote" :nowString='scope.row.containerWeightNote' :containerClomn="scope.$index + '-containerWeightNote'" @backNote='getNote'></check-comp>
                  <div slot="reference" >
                    <div class="img-table-tip" v-if="scope.row.containerWeightNote || (containerMapCheckRec[scope.$index].containerWeightNote && containerMapCheckRec[scope.$index].containerWeightNote.length>0)"></div>
                    <span>{{scope.row.containerWeight}}</span>
                  </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <span>{{'集装箱条数: ' + this.containerNum}}</span>
        </div>
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
    <!-- <el-tab-pane label="转关运输单" name="transit">
      <div>
        <span>转关运输提前报关申报</span>
      </div>
      <div>
        <table>
          <tr>
            <td width="12.5%">
              <span class='title-name'>转关申报单号</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('transDclNo')" :class='ColorArr[transHeadColor.transDclNo]'>
              <span class='content-font'>{{transHead.transDclNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>转关类型</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('transFlag')" :class='ColorArr[transHeadColor.transFlag]'>
              <span class='content-font'>{{transHead.transFlagValue}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>境内运输方式</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('inbordTrafMode')" :class='ColorArr[transHeadColor.inbordTrafMode]'>
              <span class='content-font'>{{transHead.inbordTrafMode}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>预计运抵日期</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('validDate')" :class='ColorArr[transHeadColor.validDate]'>
              <span class='content-font'>{{transHead.validDate}}</span>
            </td>
          </tr>
          <tr>
            <td width="12.5%">
              <span class='title-name'>境内运输工具编号</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('inbordTrspmcNo')" :class='ColorArr[transHeadColor.inbordTrspmcNo]'>
              <span class='content-font'>{{transHead.inbordTrspmcNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>境内运输工具名称</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('inbordTrspmcNo')" :class='ColorArr[transHeadColor.inbordTrspmcNo]'>
              <span class='content-font'>{{transHead.inbordTrspmcNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>境内运输工具航次</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('docuCode')" :class='ColorArr[transHeadColor.docuCode]'>
              <span class='content-font'>{{transHead.docuCode}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>转关单申报类型</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('transType')" :class='ColorArr[transHeadColor.transType]'>
              <span class='content-font'>{{transHead.transType}}</span>
            </td>
          </tr>
          <tr>
            <td width="12.5%">
              <span class='title-name'>是否启用电子关锁</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('esealFlag')" :class='ColorArr[transHeadColor.esealFlag]'>
              <span class='content-font'>{{transHead.esealFlagValue}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>承运单位编号</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('contractorCode')" :class='ColorArr[transHeadColor.contractorCode]'>
              <span class='content-font'>{{transHead.contractorCode}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>承运单位名称</span>
            </td>
            <td width="12.5%" @click="changeTransHeadColor('contractorName')" :class='ColorArr[transHeadColor.contractorName]'>
              <span class='content-font'>{{transHead.contractorName}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <span>提运单信息</span>
      </div>
      <div>
        <table>
          <tr>
            <td width="12.5%">
              <span class='title-name'>提运单序号</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('billSeqNo')" :class='ColorArr[transBillColor.billSeqNo]'>
              <span class='content-font'>{{transBill.billSeqNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>运输工具编号</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('trafNo')" :class='ColorArr[transBillColor.trafNo]'>
              <span class='content-font'>{{transBill.trafNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>船舶名称</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('shipNameEn')" :class='ColorArr[transHeadColor.shipNameEn]'>
              <span class='content-font'>{{transBill.shipNameEn}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>航次</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('cusVoyageNo')" :class='ColorArr[transBillColor.cusVoyageNo]'>
              <span class='content-font'>{{transBill.cusVoyageNo}}</span>
            </td>
          </tr>
          <tr>
            <td width="12.5%">
              <span class='title-name'>提单号</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('billNo')" :class='ColorArr[transBillColor.billNo]'>
              <span class='content-font'>{{transBill.billNo}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>集装箱数</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('contaCount')" :class='ColorArr[transBillColor.contaCount]'>
              <span class='content-font'>{{transBill.contaCount}}</span>
            </td>
            <td width="12.5%">
              <span class='title-name'>进出境日期</span>
            </td>
            <td width="12.5%" @click="changeTransBillColor('iEDate')" :class='ColorArr[transBillColor.iEDate]'>
              <span class='content-font'>{{transBill.iEDate}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <span>集装箱信息</span>
      </div>
      <div>
        <el-table class='sys-table-table dec-table'
        ref='transitContaTable'
        :data="transitContaList"
        height="200"
        @cell-click='transitContaCellClcik'
        :cell-class-name="deCellClass"
        border highlight-current-row size="mini">
          <el-table-column label="集装箱序号" prop="contSeqNoColor" min-width="50">
            <template slot-scope="scope">
              <span>{{scope.row.contSeqNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="集装箱号" prop="containerNoColor" min-width="70">
            <template slot-scope="scope">
              <span>{{scope.row.containerNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="关锁号" prop="sealNoColor" min-width="50">
            <template slot-scope="scope">
              <span>{{scope.row.sealNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="关锁个数" prop="sealQtyColor" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.sealQty}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格代码" prop="containerMdCodeColor"  min-width="70">
            <template slot-scope="scope">
              <span>{{scope.row.containerMdCodeValue}}</span>
            </template>
          </el-table-column>
          <el-table-column label="境内运输工具名称" prop="inbordTransNameColor"  min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.inbordTransName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="运输工具实际重量(Kg)" prop="transWeightColor"  min-width="50">
            <template slot-scope="scope">
              <span>{{scope.row.transWeight}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div style='width:50%;float:left'>
          <div>
            <span>商品信息显示</span>
          </div>
          <div>
            <el-table class='sys-table-table dec-table'
            ref='transitGoodsTable'
            :data="deCheckList"
            height="200"
            @cell-click='deCellClcik'
            :cell-class-name="deCellClass"
            border highlight-current-row size="mini">
              <el-table-column label="商品序号" prop="gNoColor" min-width="50">
                <template slot-scope="scope">
                  <span>{{scope.row.gNo}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品编号" prop="codeTsColor" min-width="70">
                <template slot-scope="scope">
                  <span>{{scope.row.codeTs}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品名称" prop="gNameColor" min-width="50">
                <template slot-scope="scope">
                  <span>{{scope.row.gName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="总数量" prop="qty1Color" min-width="100">
                <template slot-scope="scope">
                  <span>{{scope.row.qty1}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div style='width:50%;float:left'>
          <div>
            <span>集装箱与商品关系</span>
          </div>
        </div>
        <div>
          <el-table class='sys-table-table dec-table'
          ref='contaGoodsTable'
          :data="contaGoodsList"
          height="200"
          @cell-click='contaGoodsCellClcik'
          :cell-class-name="deCellClass"
          border highlight-current-row size="mini">
            <el-table-column label="商品序号" prop="gNoColor" min-width="50">
              <template slot-scope="scope">
                <span>{{scope.row.gNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="集装箱号" prop="containerNoColor" min-width="70">
              <template slot-scope="scope">
                <span>{{scope.row.containerNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="件数" prop="contaGoodsCountColor" min-width="50">
              <template slot-scope="scope">
                <span>{{scope.row.contaGoodsCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="重量" prop="contaGoodsWeightColor" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.contaGoodsWeight}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    </el-tab-pane> -->
  </el-tabs>
    <div slot="footer"  class="sys-dialog-footer text-center">
      <el-button class='dialog-primary-btn' @click="checkReject" v-show="operationType == 'edit'">审核驳回</el-button>
      <el-button class='dialog-primary-btn' @click="checkPassed"  v-show="operationType == 'edit'">审核通过</el-button>
    </div>
  </section>
</template>

<script>
import util from '@/common/util'
import checkComp from './component/checkComp'
export default {
  name: 'declare-check',
  components: {
    checkComp
  },
  data () {
    return {
      extraNote: '',
      colorArr: ['c1', 'c2'],
      deCheckList: [], // 报关单表体数据
      deCheckListVisable: [], // 报关单表体数据 显示表示
      goodsVisable: [], // 商品附加页 显示表示
      iEFlag: '', // 进出口标识 // 处理特殊的反填+
      visible: false,
      decListidx: 0, // 当前下标
      operationType: '',
      activeName: 'declare',
      checkobj: {hislist: []}, // 传入组件数据
      decVisable: [], // 表体展示
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
      decCheckRec: {
        tradeCoScc: []
      }, // 审核记录
      decList: {
        decListPid: '', // 表体主键
        decPid: '', // 报关单主键
        ciqName: '', // 检验检疫名称
        codeTs: '', // 商品编码
        contrItem: '', // 备案序号
        dangName: '', // 危险货物名称1·
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
      nowVisable: '',
      headVisible: {
        tradeCoScc: false,
        iEPort: false,
        iEDate: false,
        dDate: false,
        manualNo: false,
        overseasConsignorCode: false,
        trafMode: false,
        trafName: false,
        billNo: false,
        goodSplace: false,
        ownerCodeScc: false,
        tradeMode: false,
        cutMode: false,
        licenseNo: false,
        despPortCode: false,
        contrNo: false,
        tradeAreaCode: false,
        tradeCountry: false,
        distinatePort: false,
        entyPortCode: false,
        wrapType: false,
        packNo: false,
        grossWt: false,
        netWt: false,
        transMode: false,
        feeMark: false,
        insurMark: false,
        otherMark: false,
        note: false,
        orgCode: false,
        vsaOrgCode: false,
        inspOrgCode: false,
        despDate: false,
        blno: false,
        purpOrgCode: false,
        correlationaNo: false,
        origBoxFlag: false,
        specialFlag: false,
        companyCer: false,
        userInfo: false,
        inspDecElem: false,
        domesticConsigneeEname: false,
        overseasConsignorCname: false,
        overseasConsignorAddr: false,
        cmplDschrgDt: false,
        promiseItem1: false,
        promiseItem2: false,
        promiseItem3: false,
        chkPayment: false,
        goodsNote: false, // 商品备注
        purpose: false, // 用途
        originRelation: false, // 原产地对应关系
        nameVo: false, // 运输工具名称及航次号
        approveNo: false, // 许可证/审批号
        voyageNo: false,
        docuAndcertCode: false // 随附单证及编号
      },
      transHeadVisable: {
        transFlag: false, // 转关类型
        inbordTrafMode: false, // 境内运输方式
        validDate: false, // 预计抵运日期
        inbordTrspmcNo: false, // 境内运输工具编号
        inbordTrspmcName: false, // 境内运输工具名称
        inbordTrspmcVygNo: false, // 境内运输工具航次
        transType: false, // 转关单申报类型
        esealFlag: false, // 是否启用电子关锁
        contractorCode: false, // 承运单位编号
        contractorName: false // 承运单位名称
      },
      transBillInfoVisable: {
        billSeqNo: false, // 提运单序号
        trafNo: false, // 运输工具编号
        shipNameEn: false, // 船舶名称
        cusVoyageNo: false, // 航次
        billNo: false, // 提单号
        contaCount: false, // 集装箱数
        iEDate: false // 进出境日期
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
      transHeadColor: {
        transFlag: 0, // 转关类型
        inbordTrafMode: 0, // 境内运输方式
        validDate: 0, // 预计抵运日期
        inbordTrspmcNo: 0, // 境内运输工具编号
        inbordTrspmcName: 0, // 境内运输工具名称
        inbordTrspmcVygNo: 0, // 境内运输工具航次
        transType: 0, // 转关单申报类型
        esealFlag: 0, // 是否启用电子关锁
        contractorCode: 0, // 承运单位编号
        contractorName: 0 // 承运单位名称
      },
      transBillInfoColor: {
        billSeqNo: 0, // 提运单序号
        trafNo: 0, // 运输工具编号
        shipNameEn: 0, // 船舶名称
        cusVoyageNo: 0, // 航次
        billNo: 0, // 提单号
        contaCount: 0, // 集装箱数
        iEDate: 0 // 进出境日期
      },
      container: [], // 报关单集装箱
      containerVisable: [], // 集装箱弹框标识
      containerNum: 0, // 报关单集装箱数量
      check: {}, // 存放审核结果
      checkReview: 'Y', // 是否需要复核
      transHead: {}, // 转关单 表头
      transBill: {}, // 转关单 提运单
      contaGoodsList: [], // 转关单 集装箱商品关系表
      transitContaList: [] // 转关单 集装箱信息
    }
  },
  created () {
    // 获取审核数据
    this.getInitData()
    // 获取 复核状态
    this.getSwitchCheck()
    //
    this.operationType = this.$route.meta.operationType
  },
  mounted () {
  },
  methods: {
    // 获取审核数据
    getInitData () {
      let param = {
        'pid': this.$route.params.pid
      }
      if (!util.isEmpty(this.$route.query.type)) {
        param['type'] = '1'
      }
      param['categoryType'] = this.$route.query.decType ? this.$route.query.decType : 'dec'
      this.$post({
        url: 'API@/dec-common/dec/common/queryVerifyInfo',
        data: param,
        success: (res) => {
          this.iEFlag = res.result.decHeadVO.iEFlag
          this.deCheckList = res.result.decListVO // 报关单表体信息
          for (let x in res.result.decListVO) {
            this.deCheckListVisable.push({})
            for (let y in res.result.decListVO[x]) {
              this.deCheckListVisable[x][y] = false
            }
          }
          this.goodsVisable = util.simpleClone(this.deCheckListVisable)
          this.decVisable = util.simpleClone(this.deCheckListVisable)
          this.decHead = res.result.decHeadVO // 报关单 表头信息
          this.licenses = res.result.decLicensesVO // 报关单 随附单证
          this.container = res.result.decContainersVO // 报关单集装箱
          for (let x in res.result.decContainersVO) {
            this.containerVisable.push({})
            for (let y in res.result.decContainersVO[x]) {
              this.containerVisable[x][y] = false
            }
          }
          this.check = res.result.decVerifyVO // 报关单审核信息
          if (res.result.decVerifyVO.headMap) {
            this.decCheckRec = res.result.decVerifyVO.headMap
          }
          if (res.result.decVerifyVO.listMap) {
            this.declistCheckRec = res.result.decVerifyVO.listMap
          } else {
            this.declistCheckRec = res.result.decListVO
          }
          if (res.result.decVerifyVO.containerMap) {
            this.containerMapCheckRec = res.result.decVerifyVO.containerMap
          }
          if (this.check.decVerifyHeadVO) {
            this.headColor = this.check.decVerifyHeadVO
            for (let item in this.headColor) {
              if (item !== 'auditOpinion') { // 审核意见不做处理
                this.headColor[item] = this.headColor[item] === '' ? '' : +this.headColor[item]
              }
            }
          }
          // // 转关单 信息
          // let decTrn = res.result.decTrnVO
          // if (decTrn !== null) {
          //   this.transHead = decTrn.decTrnHeadVO // 转关单 表头
          //   this.transBill = decTrn.decTrnListVO // 转关单 提运单
          //   this.contaGoodsList = decTrn.decTrnContaGoods // zhuan'dan
          //   this.transitContaList = decTrn.decTrnContainers
          // }
          // let transVerify = res.result.decVerifyVO // 转关单 审核信息
          // if (transVerify.transVerifyHead) { // 表头审核结果
          //   this.transHeadColor = transVerify.transVerifyHead
          // }
          // 格式化数据
          this.specialBusiChangeCodeName()
          this.listFormat()
          this.containerFormat()
          this.enterpriseQualificationFormat()
          this.userFormat()
          this.requestCertsFormat()
        }
      })
    },
    // 获取是否开启复核开关
    getSwitchCheck () {
      this.$post({
        url: 'API@/dec-common/ccba/review/isReview',
        data: ['customs_declaration_review'],
        loading: true,
        success: (res) => {
          if (!util.isEmpty(res.result['customs_declaration_review'].value)) {
            this.checkReview = res.result['customs_declaration_review'].value
          }
        }
      })
    },
    getTypeToContainer (clomn, index) {
      if (this.$route.path.indexOf('look') >= 0 && (!this.containerMapCheckRec[clomn] || this.containerMapCheckRec[clomn].length === 0)) {
        this.containerVisable[index][clomn] = false
      }
    },
    getTypeToGoods (clomn, index) {
      if (this.$route.path.indexOf('look') >= 0 && (!this.declistCheckRec[clomn] || this.declistCheckRec[clomn].length === 0)) {
        this.goodsVisable[index][clomn] = false
      }
    },
    // 根据类型显示
    getTypeToHead (clomn) {
      if (this.$route.path.indexOf('look') >= 0 && (!this.decCheckRec[clomn] || this.decCheckRec[clomn].length === 0)) {
        this.headVisible[clomn] = false
      }
    },
    getTypeToDec (clomn) {
      let that = this
      if (this.$route.path.indexOf('look') >= 0 && (!this.declistCheckRec[this.decListidx][clomn] || this.declistCheckRec[this.decListidx][clomn].length === 0)) {
        that.decVisable[that.decListidx][clomn] = false
      }
    },
    // 商检单 审核预览 不现实弹框
    getTypeTodeCheck (clomn, index) {
      if (this.$route.path.indexOf('look') >= 0 && (!this.declistCheckRec[index][clomn] || this.declistCheckRec[this.decListidx][clomn].length === 0)) {
        this.deCheckListVisable[index][clomn] = false
      }
    },
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
          'pid': pid,
          'type': this.$route.query.decType
        },
        success: (res) => {
          this.messageTips(res.message, 'success')
          // 更改状态
          this.operationType = 'look'
          if (window.sessionStorage.getItem('sysId') === 'CCBA') {
            // 跳审核页面
            this.$store.dispatch('CloseTab', this.$route.params.setId)
          }
        }
      })
    },
    // 提交 审核结果
    submitCheckResult () {
      let param = this.checkData()
      this.headColor['decPid'] = this.decHead.decPid
      this.$post({
        url: 'API@/dec-common/dec/common/saveVerifyInfo',
        data: param,
        success: (res) => {
          // 更改状态
          this.rejectUpdateStatus(res.result)
        }
      })
    },
    // 提交的审核数据
    checkData () {
      // 报关单 商品数据
      // let checkList = []
      // for (let i in this.deCheckList) {
      //   checkList.push({...this.deCheckList[i],
      //     ...{
      //       'gNoColor': this.deCheckList[i].gNoColor,
      //       'codeTsColor': this.deCheckList[i].codeTsColor,
      //       'ciqCodeColor': this.deCheckList[i].ciqCodeColor,
      //       'gNameColor': this.deCheckList[i].gNameColor,
      //       'showGoodsSpecColor': this.deCheckList[i].showGoodsSpecColor,
      //       'showGoodsAttrValueColor': this.deCheckList[i].showGoodsAttrValueColor,
      //       'purposeColor': this.deCheckList[i].purposeColor,
      //       'licenseTypeNoColor': this.deCheckList[i].licenseTypeNoColor,
      //       'dangerGoodsInfoColor': this.deCheckList[i].dangerGoodsInfoColor,
      //       'gNameAndModelColor': this.deCheckList[i].gNameAndModelColor,
      //       'gQtyAndUnitColor': this.deCheckList[i].gQtyAndUnitColor,
      //       'priceAndTotalColor': this.deCheckList[i].priceAndTotalColor,
      //       'destinationCountryColor': this.deCheckList[i].destinationCountryColor,
      //       'districtCodeColor': this.deCheckList[i].districtCodeColor,
      //       'dutyModeColor': this.deCheckList[i].dutyModeColor,
      //       'originCountryColor': this.deCheckList[i].originCountryColor,
      //       'declPriceColor': this.deCheckList[i].declPriceColor,
      //       'declTotalColor': this.deCheckList[i].declTotalColor,
      //       'tradeCurrColor': this.deCheckList[i].tradeCurrColor,
      //       'exgVersionColor': this.deCheckList[i].exgVersionColor,
      //       'contrItemColor': this.deCheckList[i].contrItemColor, // 备案序号
      //       'ciqNameColor': this.deCheckList[i].ciqNameColor, // 检验检疫名称
      //       'gModelColor': this.deCheckList[i].gModelColor, // 规格型号
      //       'gQtyColor': this.deCheckList[i].gQtyColor, // 成交数量
      //       'gUnitColor': this.deCheckList[i].gUnitColor, // 成交计量单位
      //       'qty1Color': this.deCheckList[i].qty1Color, // 法定第一数量
      //       'unit1Color': this.deCheckList[i].unit1Color, // 法定第一计量单位
      //       'exgNoColor': this.deCheckList[i].exgNoColor, // 货号
      //       'qty2Color': this.deCheckList[i].qty2Color, // 法定第二数量
      //       'unit2Color': this.deCheckList[i].unit2Color, // 法定第二计量单位
      //       'districtCodeAndColor': this.deCheckList[i].districtCodeAndColor, // 境内目的地代码和地区
      //       'destCodeColor': this.deCheckList[i].destCodeColor, // 境内目的地区
      //       'gNoAllColor': this.deCheckList[i].gNoAllColor, // 报关单项号
      //       'decPid': this.deCheckList[i].decPid,
      //       'pid': this.deCheckList[i].pid,
      //       'gNo': this.deCheckList[i].gNo
      //     }})
      // }
      // 报关单 集装箱
      // let checkContainer = []
      // for (let n in this.container) {
      //   checkContainer.push({
      //     'containerNoColor': this.container[n].containerNoColor,
      //     'containerSizeColor': this.container[n].containerSizeColor,
      //     'lclFlagColor': this.container[n].lclFlagColor,
      //     'goodsNoColor': this.container[n].goodsNoColor,
      //     'containerWeightColor': this.container[n].containerWeightColor
      //   })
      // }
      this.headColor['decPid'] = this.decHead.decPid
      this.decHead.createTime = ''
      return {
        // 审核结果
        'decVerifyHeadVO': {...this.decHead, ...this.headColor}, // 报关单表头
        'decVerifyListVOs': this.deCheckList, // 报关单 表体
        'decVerifyContainerVOs': this.container // 报关单集装箱
      }
    },
    // 审核通过
    checkPassed () {
      let param = this.checkData()
      this.$post({
        url: 'API@/dec-common/dec/common/saveVerifyInfo',
        data: param,
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
          if (window.sessionStorage.getItem('sysId') === 'CCBA') {
            // 跳审核页面
            this.$store.dispatch('CloseTab', this.$route.params.setId)
          } else {
            this.$router.push({
              name: 'decReviewedList'
            })
          }
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
        this.headColor[name] = 0
      }
    },
    // 点击表头信息 td 改变 td的颜色
    changeTransHeadColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.transHeadColor[name] === 0) {
        this.transHeadColor[name] = 1
      } else if (this.transHeadColor[name] === 1) {
        this.transHeadColor[name] = 0
      }
    },
    // 点击表头信息 td 改变 td的颜色
    changeTransBillColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.transHeadColor[name] === 0) {
        this.transHeadColor[name] = 1
      } else if (this.transHeadColor[name] === 1) {
        this.transHeadColor[name] = 0
      }
    },
    // 点击表体详情信息
    changeContaInfoColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.contaInfoList[name + 'Color'] === 0) {
        this.contaInfoList[name + 'Color'] = 1
      } else if (this.contaInfoList[name + 'Color'] === 1) {
        this.contaInfoList[name + 'Color'] = 0
      }
      this.contaInfoList.push({})
      this.contaInfoList.pop()
    },
    // 点击表体详情信息
    changegoodsInfoColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.goodsInfoList[name + 'Color'] === 0) {
        this.goodsInfoList[name + 'Color'] = 1
      } else if (this.goodsInfoList[name + 'Color'] === 1) {
        this.goodsInfoList[name + 'Color'] = 0
      }
      this.goodsInfoList.push({})
      this.goodsInfoList.pop()
    },
    // 点击表体详情信息
    changeContaGoodsColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.contaGoodsList[name + 'Color'] === 0) {
        this.contaGoodsList[name + 'Color'] = 1
      } else if (this.contaGoodsList[name + 'Color'] === 1) {
        this.contaGoodsList[name + 'Color'] = 0
      }
      this.contaGoodsList.push({})
      this.contaGoodsList.pop()
    },
    // 点击表体详情信息
    changeBodyColor (name) {
      if (this.operationType === 'look') {
        return
      }
      if (this.decList[name + 'Color'] === 0) {
        this.decList[name + 'Color'] = 1
      } else if (this.decList[name + 'Color'] === 1) {
        this.decList[name + 'Color'] = 0
        if (['gName', 'gModel'].includes(name)) {
          this.decList['gNameAndModelColor'] = 0
        } else if (['gQty', 'gUnit', 'qty1', 'unit1', 'qty2', 'unit2'].includes(name)) {
          this.decList['gQtyAndUnitColor'] = 0
        } else if (['districtCode', 'destCode'].includes(name)) {
          this.decList['districtCodeAndColor'] = 0
        } else if (['contrItem', 'ciqName', 'exgVersion', 'exgNo', 'gNo'].includes(name)) {
          this.decList['gNoAllColor'] = 0
        } else if (['declPrice', 'declTotal', 'tradeCurr'].includes(name)) {
          this.decList['priceAndTotalColor'] = 0
        }
      }
      this.decList['gNameAndModelColor'] = this.judgeColor(['gNameColor', 'gModelColor'])
      this.decList['gQtyAndUnitColor'] = this.judgeColor(['gQtyColor', 'gUnitColor', 'qty1Color', 'unit1Color', 'qty2Color', 'unit2Color'])
      this.decList['districtCodeAndColor'] = this.judgeColor(['districtCodeColor', 'destCodeColor'])
      this.decList['gNoAllColor'] = this.judgeColor(['contrItemColor', 'ciqNameColor', 'exgVersionColor', 'exgNoColor', 'gNoColor'])
      this.decList['priceAndTotalColor'] = this.judgeColor(['declPriceColor', 'declTotalColor', 'tradeCurrColor'])
      // 强制重新渲染
      this.deCheckList.push({})
      this.deCheckList.pop()
    },
    // 返回颜色
    judgeColor (arr) {
      let arr0 = []
      let arr1 = []
      for (let i in arr) {
        if (this.decList[arr[i]] === 0) {
          arr0.push(arr[i])
        } else if (this.decList[arr[i]] === 1) {
          arr1.push(arr[i])
        }
      }
      if (arr1.length > 0) {
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
      this.decListidx = this.deCheckList.indexOf(row)
    },
    // 点击table 单元格改变样式
    deCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 0
      }
      this.deCheckList.push({})
      this.deCheckList.pop()
    },
    // 集装箱附加页 点击table 单元格改变样式
    checkContaCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 0
      }
      this.container.push({})
      this.container.pop()
    },
    // 转关单 集装箱列表
    transitContaCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 0
      }
      this.transitContaList.push({})
      this.transitContaList.pop()
    },
    // 转关单 商品信息
    transitGoodsCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 0
      }
      this.transitGoodsList.push({})
      this.transitGoodsList.pop()
    },
    // 转关单 商品集装箱关系表
    contaGoodsCellClcik (row, column, cell, event) {
      if (this.operationType === 'look') {
        return
      }
      if (row[column.property] === 0) {
        row[column.property] = 1
      } else if (row[column.property] === 1) {
        row[column.property] = 0
      }
      this.contaGoodsList.push({})
      this.contaGoodsList.pop()
    },
    getNote (param) {
      if (param.type === 'head') {
        if (param.colum === 'billNoNote1') {
          this.decHead['billNoNote'] = param.note
        } else {
          this.decHead[param.colum] = param.note
        }
        this.headVisible[param.colum] = false
      } else if (param.type === 'decCheck') {
        this.deCheckList[param.colum.split('-')[0]][param.colum.split('-')[1]] = param.note
        this.deCheckListVisable[param.colum.split('-')[0]][param.colum.split('-')[1]] = false
        this.decVisable[param.colum.split('-')[0]][param.colum.split('-')[1]] = false
        this.goodsVisable[param.colum.split('-')[0]][param.colum.split('-')[1]] = false
        this.$forceUpdate()
      } else if (param.type === 'container') {
        this.container[param.colum.split('-')[0]][param.colum.split('-')[1]] = param.note
        this.containerVisable[param.colum.split('-')[0]][param.colum.split('-')[1]] = false
      }
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
      let checkList = util.simpleClone(this.check.decVerifyListVOs)
      for (let i in this.deCheckList) {
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
    // 处理报关单集装箱信息
    containerFormat () {
      if (this.container === null) {
        this.container = []
      }
      if (this.container.length === 0) {
        return false
      }
      let containerCheck = this.check.decVerifyContainerVOs
      if (containerCheck === null) {
        containerCheck = []
      }
      for (let i in this.container) {
        if (!util.isEmpty(containerCheck[i])) {
          let containerCheckVo = containerCheck[i]
          this.container[i]['containerNoColor'] = +containerCheckVo.containerNoColor
          this.container[i]['containerSizeColor'] = +containerCheckVo.containerSizeColor
          this.container[i]['lclFlagColor'] = +containerCheckVo.lclFlagColor
          this.container[i]['goodsNoColor'] = +containerCheckVo.goodsNoColor
          this.container[i]['containerWeightColor'] = +containerCheckVo.containerWeightColor
        } else {
          this.container[i]['containerNoColor'] = 0
          this.container[i]['containerSizeColor'] = 0
          this.container[i]['lclFlagColor'] = 0
          this.container[i]['goodsNoColor'] = 0
          this.container[i]['containerWeightColor'] = 0
        }
        this.container[i].containerWeight = this.removeZero(this.container[i].containerWeight)
      }
      // 集装箱条数
      this.containerNum = this.container.length
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
  .sys-main{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;
    margin-left:5px;
  }
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
  .img-tip{
    background: linear-gradient(45deg,transparent 7px,red 0) left;
    float: right;
    width: 10px;
    height: 10px;
  }
  .img-table-tip{
    background: linear-gradient(45deg,transparent 7px,red 0) left;
    position: absolute;
    right: 0;
    width: 10px;
    height: 10px;
  }
  .check-table thead tr {
    display: block;
  }

 .c2 {
    background-color:#ffd0d8;
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
  .check-content{
    min-height:25px;
  }
  .check-content-head{
    vertical-align: unset;
  }
  .text-center {
    text-align: center;
  }
</style>
