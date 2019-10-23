<template>
  <section>
    <el-form label-width="80px" ref='billForm' :model="billForm" :rules="rules" size="mini" label-position="left" @keyup.enter.native="switchFoucsByEnter">
      <el-row>
        <el-col :span="24">
          <el-form-item label="清单来源">
            <el-select v-model="billForm.listOrigin"
              filterable
              @change="originChange">
              <el-option
                v-for="item in originList"
                :key="item.codeField"
                :label="item.nameField"
                :value="item.codeField"
                :disabled="item.disabled">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="业务编号" prop='listNo'>
            <el-input v-model="billForm.listNo" @keyup.enter.native="changListNo" maxlength="18" enter="no"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="清单类型">
            <el-select v-model="billForm.declTrnrel" :disabled="isBillTypeDisable"
              filterable>
              <el-option
                v-for="item in declTrnrelDownloadList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="接单编号"  prop='bossId'>
            <el-autocomplete
              :maxlength="30"
              size='mini'
              v-model="billForm.bossId"
              :fetch-suggestions="queryBossIdSearch"
              :disabled='billBossIdDisabled'
              :trigger-on-focus="false"
              :select-when-unmatched='true'
              :highlight-first-item='true'
              >
            </el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if='isConBossId == "Y"'>
        <el-col :span="24">
          <el-form-item label="客户业务号">
            <el-autocomplete ref="corpBusiNo"
              :maxlength="50"
              size='mini'
              @keyup.enter.native="billDownSubmit"
              v-model="billForm.corpBusiNo"
              :fetch-suggestions="queryBusiNoSearch"
              :trigger-on-focus="false"
              :select-when-unmatched='true'
              :highlight-first-item='true'
              >
            </el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24" class='query-btn'>
          <el-button size="mini" type="primary" @click="billDownSubmit" class = 'btn-padding'>下载</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import util from '@/common/util'
import decUtil from '../../decPage/common/decUtil'
export default {
  data () {
    return {
      billForm: this.initBillForm,
      rules: {
        listNo: [
          {required: true, message: '请输入业务编号', trigger: 'blur'}
        ]
      },
      originList: [{codeField: '1', nameField: '清单编号'}, {codeField: '2', nameField: '企业内部编号'}], // 清单来源数据
      declTrnrelDownloadList: [{
        code: '0',
        name: '一般报关单',
        disabled: false
      }, {
        code: '1',
        name: '转关提前报关单',
        disabled: false
      }, {
        code: '2',
        name: '备案清单',
        disabled: false
      }, {
        code: '3',
        name: '转关提前备案清单',
        disabled: false
      }, {
        code: '4',
        name: '出口二次转关',
        disabled: false
      }]
    }
  },
  props: {
    isBillTypeDisable: {
      type: Boolean,
      default: false
    },
    billBossIdDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initBillForm () {
      return {
        listOrigin: '1', // 清单来源
        listNo: '', // 清单号
        emsListNo: '', // 企业内部编号清单编号
        bossId: '', // 接单编号
        corpBusiNo: '', // 客户业务号
        declTrnrel: '' // 清单类型
      }
    },
    initBillDownload () {
      this.billForm = this.initBillForm()
    },
    // 接单来源变化
    originChange (val) {
      this.billForm.listNo = ''
      this.billForm.emsListNo = ''
      this.billForm.bossId = ''
      this.billForm.corpBusiNo = ''
      this.billForm.declTrnrel = ''
      this.isBillTypeDisable = false
      this.billBossIdDisabled = false
    },
    // 调用切换焦点的方法
    switchFoucsByEnter (e) {
      decUtil.switchFoucsByEnter(e, this.foucsByEnter)
    },
    foucsByEnter (e, next, secondNext) {
      // 下个元素存在
      if (next) {
        if (e.target.attributes.enter && e.target.attributes.enter.nodeValue === 'no') {
          return false
        } else {
          let ref
          if (e.target.parentElement.offsetParent.attributes.class.nodeValue.indexOf('el-select') > -1) {
            ref = e.target.parentElement.offsetParent.attributes.dataRef.nodeValue
            // this.$refs[ref].blur()
          } else {
            if (!util.isEmpty(e.target.attributes.dataRef)) {
              ref = e.target.attributes.dataRef.nodeValue
            }
          }
          if (ref === 'tradeCoScc' || ref === 'ownerCodeScc') {
            // 如果是十八位信用代码
            if (ref === 'tradeCoScc') {
              if (this.decHead.tradeCoScc.length !== 18) {
                next.focus()
                next.select()
              } else {
                secondNext.focus()
                secondNext.select()
              }
            } else {
              if (this.decHead.ownerCodeScc.length !== 18) {
                next.focus()
                next.select()
              } else {
                secondNext.focus()
                secondNext.select()
              }
            }
          } else {
            next.focus()
            next.select()
          }
        }
      } else {
        let ref
        if (e.target.parentElement.offsetParent.attributes.class.nodeValue.indexOf('el-select') > -1) {
          ref = e.target.parentElement.offsetParent.attributes.dataRef.nodeValue
          // this.$refs[ref].blur()
        } else {
          if (!util.isEmpty(e.target.attributes.dataRef)) {
            ref = e.target.attributes.dataRef.nodeValue
          }
        }
        if (ref === 'origBoxFlag') { // 原箱运输
          this.openSpecialBusiContent()
        } else if (ref === 'correlationReasonFlag' && this.controller.iEFlag === 'E') {
          this.openSpecialBusiContent()
        }
      }
    },
    billDownSubmit () {

    }
  }
}
</script>
<style lang="less" scoped>

</style>
