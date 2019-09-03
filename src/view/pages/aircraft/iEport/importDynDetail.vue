<template>
  <section class='airvehicle-main'>
    <el-form label-width="125px" :model="submitData" ref="submitData" :rules="rules" class="airvehicle-form-b">
      <!-- 头部 -->
      <el-row class='sys-header'>
          <!-- 返回按钮 -->
          <el-row>
            <span @click="$router.go(-1)" class="airvehicle-back-btn mg-b-15"><i class="back-btn"></i>返回</span>
            <el-form-item label="申报对象:" style="float:right;" v-if="!isEdit">
              <span>{{submitData.cdsDclTypeValue}}</span>
            </el-form-item>
          </el-row>
          <!-- 返回按钮 end-->
          <el-row v-if="isEdit">
            <el-col :span="19">
              <el-button type="primary" size="mini" icon="fa fa-save" @click="saveData">&nbsp;暂存</el-button>
              <el-button type="primary" size="mini" icon="fa fa-file-o" @click="declare">&nbsp;申报</el-button>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申报对象">
                <el-select v-model="submitData.cdsDclType">
                  <el-option v-for="item in cdsDclTypeList" :key="item.value+'cdsDclTypeList'" :value="item" :label="item.text"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </el-row>
      <!-- 头部end -->
      <!-- 主显示框 -->
      <el-row class="airvehicle-panel">
          <el-row class="import-edit-title"><i class="fa fa-edit"></i>报给单位</el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="海关关区" prop="cusCustomsCode">
                <el-select size="mini" v-model="submitData.cusCustomsCode" v-if="isEdit"
                  @focus="tipsFillMessage('cusCustomsCodeList','SAAS_CUSTOMS_REL')"
                  filterable remote default-first-option clearable
                  :remote-method="checkParamsList"
                  @change="checkParamsList">
                  <el-option
                    v-for="item in cusCustomsCodeList"
                    :key="item.codeField"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
                <span v-else>{{submitData.cusCustomsCode}}-{{submitData.cusCustomsCodeValue}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="import-edit-title"><i class="fa fa-edit"></i>航空器信息</el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="航空器注册编号" prop="aircraftNo">
                <el-input size="mini" clearable maxlength="25" v-model="submitData.aircraftNo" v-if="isEdit"></el-input>
                <span v-else>{{submitData.aircraftNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册海关关区" prop="cusCustomsCodeReg">
                <el-select size="mini" v-model="submitData.cusCustomsCodeReg" v-if="isEdit"
                  @focus="tipsFillMessage('cusCustomsCodeListA','SAAS_CUSTOMS_REL')"
                  filterable remote default-first-option clearable
                  :remote-method="checkParamsList"
                  @change="checkParamsList">
                  <el-option
                    v-for="item in cusCustomsCodeListA"
                    :key="item.codeField"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
                <span v-else>{{submitData.cusCustomsCodeReg}}-{{submitData.cusCustomsCodeRegValue}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="航空器备案类型" prop="putrecAirType">
                <el-select size="mini" v-model="submitData.putrecAirType" v-if="isEdit" clearable>
                  <el-option v-for="item in putrecAirTypeList" :value="item.value" :label="item.text" :key="item.value"></el-option>
                </el-select>
                <span v-else>{{submitData.putrecAirType}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="import-edit-title"><i class="fa fa-edit"></i>航班信息</el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="进港航班号" prop="voyageIn">
                <el-input size="mini" clearable v-model="submitData.voyageIn" v-if="isEdit" maxlength="20"></el-input>
                <span v-else>{{submitData.voyageIn}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="航班日期" prop="arrivalDate">
                <el-date-picker size="mini" v-model="submitData.arrivalDate" v-if="isEdit" type="date" style="width:100%"></el-date-picker>
                <span v-else>{{submitData.arrivalDate | date('yyyy-MM-dd')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="停机位" prop="stayId">
                <el-input size="mini" clearable v-model.number="submitData.stayId" v-if="isEdit" maxlength="35"></el-input>
                <span v-else>{{submitData.stayId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出发港" prop="fromAirport">
                <el-select size="mini" v-model="submitData.fromAirport" v-if="isEdit"
                  @focus="tipsFillMessage('portList','SAAS_SW_AIRPORT_CODE')"
                  filterable remote default-first-option clearable
                  :remote-method="checkParamsList"
                  @change="checkParamsList">
                  <el-option
                    v-for="item in portList"
                    :key="item.codeField"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
                <span v-else>{{submitData.fromAirport}}-{{submitData.fromAirportValue}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的港" prop="toAirport">
                <el-select size="mini" v-model="submitData.toAirport" v-if="isEdit"
                  @focus="tipsFillMessage('portListA','SAAS_SW_AIRPORT_CODE')"
                  filterable remote default-first-option clearable
                  :remote-method="checkParamsList"
                  @change="checkParamsList">
                  <el-option
                    v-for="item in portListA"
                    :key="item.codeField"
                    :label="item.codeField+'-'+item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
                <span v-else>{{submitData.toAirport}}-{{submitData.toAirportValue}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="离港时间" prop="departureDateTime">
                <el-date-picker size="mini"  v-model="submitData.departureDateTime" type="datetime" v-if="isEdit" style="width:100%"></el-date-picker>
                <span v-else>{{submitData.departureDateTime | date()}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="抵港时间" prop="arrivalDateTime">
                <el-date-picker size="mini"  v-model="submitData.arrivalDateTime" type="datetime" v-if="isEdit" style="width:100%"></el-date-picker>
                <span v-else>{{submitData.arrivalDateTime | date()}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="卸机时间">
                <el-date-picker size="mini"  v-model="submitData.dischargeCompleteDateTime" type="datetime" v-if="isEdit" style="width:100%"></el-date-picker>
                <span v-else>{{submitData.dischargeCompleteDateTime | date()}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="import-edit-title"><i class="fa fa-edit"></i>备注信息</el-row>
          <el-row>
            <el-col :span="12" v-if="isEdit">
              <el-form-item label="海关备注">
                <el-input type="textarea" v-model="submitData.note" rows="4" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-else>
              <el-form-item label="备注">
                <span class="break-text">{{submitData.note}}</span>
              </el-form-item>
            </el-col>
          </el-row>
      </el-row>
      <!-- 主显示框end -->
    </el-form>
  </section>
</template>
<script>
import util from '@/common/util'
import validator from '@/common/validator'
import commonParam from '@/common/commonParam'
export default {
  data () {
    return {
      rules: {
        cusCustomsCode: [{ required: true, message: '请选择海关关区', trigger: 'change' }],
        aircraftNo: [{ required: true, message: '请输入航空器注册编号', trigger: 'blur' }],
        cusCustomsCodeReg: [{ required: true, message: '请选择注册海关关区', trigger: 'change' }],
        putrecAirType: [{ required: true, message: '请选择航空器备案类型', trigger: 'change' }],
        fromAirport: [{ required: true, message: '请选择出发港', trigger: 'change' }],
        toAirport: [{ required: true, message: '请选择目的港', trigger: 'change' }],
        voyageIn: [{ required: true, message: '请输入进港航班号', trigger: 'blur' }, { validator: validator.numEn, message: '请输入大写英文、数字', trigger: 'blur' }],
        arrivalDate: [{ required: true, message: '请选择航班日期', trigger: 'blur' }],
        stayId: [{ required: true, message: '请输入停机位', trigger: 'blur' }, {validator: this.validateNum, message: '请输入数字', trigger: 'blur'}],
        departureDateTime: [{ required: true, message: '请选择离港时间', trigger: 'blur' }, {validator: this.validateTimeA, message: '离港时间不得晚于抵港时间', trigger: 'blur'}],
        arrivalDateTime: [{ required: true, message: '请选择抵港时间', trigger: 'blur' }, {validator: this.validateTime, message: '抵港时间不得早于离港时间', trigger: 'blur'}]
      },
      submitData: {
        cusCustomsCode: '',
        cusCustomsCodeReg: '',
        putrecAirType: '',
        fromAirport: '',
        toAirport: '',
        voyageIn: '',
        aircraftNo: '',
        arrivalDate: '',
        stayId: '',
        departureDateTime: '',
        arrivalDateTime: '',
        dischargeCompleteDateTime: '',
        note: ''
      }, // 查询传参
      putrecAirTypeList: [{
        value: '1',
        text: '航线航空器'
      }, {
        value: '2',
        text: '通用航空器'
      }], // 航空器备案类型
      cdsDclTypeList: [{
        value: '0401',
        text: '海关进境/港预报'
      }, {
        value: '0402',
        text: '海关进境/港确报'
      }], // 申报对象
      tableNameList: {
        tableNames: [
          'SAAS_SW_AIRPORT_CODE', // 港口
          'SAAS_CUSTOMS_REL' // 海关关区
        ]
      }, // 字典标明
      selectObj: {
        obj: '',
        params: ''
      },
      selectList: [{
        obj: 'cusCustomsCodeList',
        params: 'SAAS_CUSTOMS_REL'
      }, {
        obj: 'cusCustomsCodeListA',
        params: 'SAAS_CUSTOMS_REL'
      }, {
        obj: 'portList',
        params: 'SAAS_SW_AIRPORT_CODE'
      }, {
        obj: 'portListA',
        params: 'SAAS_SW_AIRPORT_CODE'
      }],
      portList: [], // 出发港数据
      portListA: [], // 目的港数据
      cusCustomsCodeList: [], // 海关关区数据
      cusCustomsCodeListA: [], // 注册海关关区数据
      isEdit: true // true 编辑 false 详情
    }
  },
  created () {
    this.getCommonParam()
    if (this.$route.params.type === 'edit') {
      this.isEdit = true
    } else {
      this.isEdit = false
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
        this.portList = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE')).slice(0, 30)
        this.portListA = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE')).slice(0, 30)
        this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
        this.cusCustomsCodeListA = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
        this.getDetail()
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
          this.portList = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE')).slice(0, 30)
          this.portListA = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE')).slice(0, 30)
          this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
          this.cusCustomsCodeListA = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
          this.getDetail()
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
    // 校验数字
    validateNum (rule, value, callback) {
      if (value !== '') {
        if (!Number.isInteger(Number(value))) {
          callback(new Error(''))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 校验离港时间不得晚于抵港时间
    validateTimeA (rule, value, callback) {
      if (!(new Date(Date.parse(util.dateFormat(value).replace(/-/g, '/'))) < new Date(Date.parse(util.dateFormat(this.submitData.arrivalDateTime).replace(/-/g, '/'))))) {
        callback(new Error(''))
      } else {
        callback()
      }
    },
    validateTime (rule, value, callback) {
      if (!(new Date(Date.parse(util.dateFormat(value).replace(/-/g, '/'))) > new Date(Date.parse(util.dateFormat(this.submitData.departureDateTime).replace(/-/g, '/'))))) {
        callback(new Error(''))
      } else {
        callback()
      }
    },
    // 暂存
    saveData () {
      this.$refs['submitData'].validate((valId) => {
        if (!valId) {
          return false
        }
        let data = util.simpleClone(this.submitData)
        if (this.submitData.cdsDclType instanceof Object) {
          data.cdsDclType = this.submitData.cdsDclType.value
          data.cdsDclTypeValue = this.submitData.cdsDclType.text
        }
        this.$store.dispatch('ajax', {
          url: 'API@/dec-common/cds/common/saveCdsAirDeclareVO',
          data: data,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '暂存成功',
              type: 'success'
            })
            // this.getDetail()
            // this.$router.push({name: '进境、港动态申报'})
          }
        })
      })
    },
    // 申报
    declare () {
      let ids = []
      ids.push(this.$route.params.id)
      let data = {
        ids: ids,
        operType: '0'
      }
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/cds/common/declareCdsAir',
        data: data,
        router: this.$router,
        success: (res) => {
          this.$message({
            message: res.result.statusValue,
            type: 'success'
          })
          this.getDetail()
        }
      })
    },
    // 获取详情
    getDetail () {
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/cds/common/getCdsDeclare',
        data: {iprtTmpNO: this.$route.params.id},
        router: this.$router,
        success: (res) => {
          this.submitData = util.isEmpty(res.result) ? {} : res.result
          if (this.$route.params.type === 'edit') {
            this.submitData.putrecAirType = this.submitData.putrecAirType === '通用航空器' ? '2' : '1'
            this.submitData.cdsDclType = {
              text: this.submitData.cdsDclTypeValue,
              value: this.submitData.cdsDclType
            }
          }
          for (let i of this.selectList) {
            if (i.obj === 'cusCustomsCodeList') {
              this.selectObj = i
              this.checkParamsList(this.submitData.cusCustomsCode)
            } else if (i.obj === 'cusCustomsCodeListA') {
              this.selectObj = i
              this.checkParamsList(this.submitData.cusCustomsCodeReg)
            } else if (i.obj === 'portList') {
              this.selectObj = i
              this.checkParamsList(this.submitData.fromAirport)
            } else {
              this.selectObj = i
              this.checkParamsList(this.submitData.toAirport)
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import (less) '../css/common.less';
</style>
