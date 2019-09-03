<template>
  <section class='airvehicle-main'>
    <!-- 头部 -->
    <el-row class='sys-header'>
      <el-form label-width="0px">
        <!-- 返回按钮 -->
        <el-row class='mg-b-15'>
          <span @click="$router.go(-1)" class="airvehicle-back-btn"><i class="back-btn"></i>返回</span>
        </el-row>
        <!-- 返回按钮 end-->
        <el-row v-if="isEdit" class="mg-b-15">
          <el-button type="primary" size="mini" icon="fa fa-save" @click="saveData">&nbsp;暂存</el-button>
          <el-button type="primary" size="mini" icon="fa fa-file-o" @click="declare">&nbsp;申报</el-button>
        </el-row>
      </el-form>
    </el-row>
    <!-- 头部end -->
    <!-- 主显示框 -->
    <el-row class="airvehicle-panel">
      <el-form label-width="115px" :model="submitData" :rules="rules" ref="submitData">
        <el-row class="import-edit-title"><i class="fa fa-edit"></i>当日飞行计划备案信息</el-row>
        <el-row>
          <el-col :span="6" :xs="12">
            <el-form-item label="航班号" prop="flightNo">
              <el-input size="mini" clearable maxlength="20" v-model="submitData.flightNo" v-if="isEdit"></el-input>
              <span v-else>{{submitData.flightNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="航班日期" prop="flightDate">
              <el-date-picker size="mini" v-if="isEdit" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="submitData.flightDate" style="width:100%"></el-date-picker>
              <span v-else>{{submitData.flightDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="执行任务类型" prop="linesType">
              <el-select size="mini" v-model="submitData.linesType" v-if="isEdit" clearable>
                <el-option
                  v-for="item in linesTypeList"
                  :key="item.codeField"
                  :label="item.codeField+'-'+item.nameField"
                  :value="item.codeField">
                </el-option>
              </el-select>
              <span v-else>{{submitData.linesType}}-{{submitData.linesTypeValue}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
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
          <el-col :span="6" :xs="12">
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
          <el-col :span="6" :xs="12">
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
          <el-col :span="6" :xs="12">
            <el-form-item label="计划离港时间" prop="currentTakeoffTime">
              <el-date-picker size="mini" type="datetime" v-if="isEdit" v-model="submitData.currentTakeoffTime" style="width:100%"></el-date-picker>
              <span v-else>{{submitData.currentTakeoffTime | date()}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="计划抵港时间" prop="currentLandingTime">
              <el-date-picker size="mini" type="datetime" v-if="isEdit" v-model="submitData.currentLandingTime" style="width:100%"></el-date-picker>
              <span v-else>{{submitData.currentLandingTime | date()}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="isEdit">
            <el-form-item label="备注">
              <el-input type="textarea" rows="4" maxlength="200" v-model="submitData.memo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else>
            <el-form-item label="备注">
              <span class="break-text">{{submitData.memo}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!-- 主显示框end -->
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
        flightNo: [{ required: true, message: '请输入航班号', trigger: 'blur' }, { validator: validator.numEn, message: '请输入大写英文、数字', trigger: 'blur' }],
        flightDate: [{ required: true, message: '请选择航班日期', trigger: 'blur' }],
        currentTakeoffTime: [{ required: true, message: '请选择计划离港时间', trigger: 'blur' }, {validator: this.validateTimeA, message: '离港时间不得晚于抵港时间', trigger: 'blur'}],
        currentLandingTime: [{ required: true, message: '请选择计划抵港时间', trigger: 'blur' }, {validator: this.validateTime, message: '抵港时间不得早于离港时间', trigger: 'blur'}],
        linesType: [{ required: true, message: '请选择执行任务类型', trigger: 'change' }],
        cusCustomsCode: [{ required: true, message: '请选择海关关区', trigger: 'change' }],
        fromAirport: [{ required: true, message: '请选择出发港', trigger: 'change' }],
        toAirport: [{ required: true, message: '请选择目的港', trigger: 'change' }]
      },
      submitData: {
        // flightNo: '',
        // flightDate: '',
        // linesType: '',
        cusCustomsCode: ''
        // fromAirport: '',
        // toAirport: '',
        // currentTakeoffTime: '',
        // currentLandingTime: '',
        // memo: ''
      }, // 查询传参
      isEdit: true, // true 编辑 false 详情
      tableNameList: {
        tableNames: [
          // 'SAAS_SW_COUNTRY', // 国家
          'SAAS_SW_AIRPORT_CODE', // 港口
          // 'SAAS_SW_CAREER', // 机组职务
          // 'SAAS_SW_CREDETIAL_TYPE', // 证件类型
          'SAAS_CUSTOMS_REL', // 海关关区
          'SAAS_SW_MISSION_TYPE' // 执行任务类型
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
        obj: 'portList',
        params: 'SAAS_SW_AIRPORT_CODE'
      }, {
        obj: 'portListA',
        params: 'SAAS_SW_AIRPORT_CODE'
      }],
      portList: [], // 出发港数据
      portListA: [], // 目的港数据
      cusCustomsCodeList: [], // 海关关区数据
      linesTypeList: [] // 执行任务类型数据
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
    // 加载缓存数据
    loadData () {

    },
    // 缓存数据
    cacheData () {

    },
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
        this.linesTypeList = JSON.parse(window.localStorage.getItem('SAAS_SW_MISSION_TYPE'))
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
          this.linesTypeList = JSON.parse(window.localStorage.getItem('SAAS_SW_MISSION_TYPE'))
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
    // 校验离港时间不得晚于抵港时间
    validateTimeA (rule, value, callback) {
      if (!(new Date(Date.parse(util.dateFormat(value).replace(/-/g, '/'))) < new Date(Date.parse(util.dateFormat(this.submitData.currentLandingTime).replace(/-/g, '/'))))) {
        callback(new Error(''))
      } else {
        callback()
      }
    },
    validateTime (rule, value, callback) {
      if (!(new Date(Date.parse(util.dateFormat(value).replace(/-/g, '/'))) > new Date(Date.parse(util.dateFormat(this.submitData.currentTakeoffTime).replace(/-/g, '/'))))) {
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
        this.submitData.cusCustomsCodeValue = ''
        this.$store.dispatch('ajax', {
          url: 'API@/dec-common/cds/common/saveCdsRouteList',
          data: this.submitData,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '暂存成功',
              type: 'success'
            })
            // this.getDetail()
            // this.$router.push({name: '当日飞行计划备案'})
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
        url: 'API@/dec-common/cds/common/declareRouteSpl',
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
        url: 'API@/dec-common/cds/common/getCdsRoute',
        data: {flghtSeqNo: this.$route.params.id},
        router: this.$router,
        success: (res) => {
          this.submitData = util.isEmpty(res.result) ? {} : res.result
          for (let i of this.selectList) {
            if (i.obj === 'cusCustomsCodeList') {
              this.selectObj = i
              this.checkParamsList(this.submitData.cusCustomsCode)
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
