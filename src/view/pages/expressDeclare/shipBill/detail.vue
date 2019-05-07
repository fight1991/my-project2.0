<template>
  <section class='sys-main'>
    <!-- 返回按钮 -->
    <el-row>
      <el-col :span='12' :xs='24'>
        <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
      </el-col>
      <el-col :span='12' :xs='24'>
        <div style="text-align: right;"><el-button size="mini" type="primary" @click="declare">申报</el-button></div>
      </el-col>
    </el-row>
    <!-- 返回按钮 end-->
    <el-row>
      <div class='query-body'>
        <el-row class="form-table-panel">
          <el-form :model="headData" label-width="150px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="进出口口岸">
                  <el-select size="mini" v-model="headData.cusCustomsCode"  :disabled="isDetail" style="width:100%;" placeholder=" "
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
                <el-form-item label="申报状态">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="总运单号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="舱单进出口标志">
                  <el-select v-model="headData.iEFlag" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in iEFlagList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="统一编号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输工具航次(班)号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="中文运输工具名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="英文运输工具名称">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进港日期">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="起运港/抵运港">
                  <el-select size="mini" v-model="headData.fromAirport" placeholder=" " style="width:100%;" :disabled="isDetail"
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
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="分运单总数">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总重量(公斤)">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总件数">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式">
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
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="记录类型">
                  <el-select v-model="headData.recordType" placeholder=" " :disabled="isDetail" style="width:100%;" filterable>
                    <el-option v-for="item in recordTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申报日期">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
        <el-row class="mg-b-20">
          <el-table class='sys-table-table express-table' :data="detailList" border highlight-current-row size="mini">
            <el-table-column label="顺序号" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="分运单号" min-width="130">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="主要货物名称" min-width="160">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="件数" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="重量" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="价值" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="币制" min-width="110">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column label="申报日期" min-width="130">
              <template slot-scope="scope">
                <div class='sys-td-c'>{{scope.row.title}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="form-table-panel">
          <el-form :model="bodyData" label-width="150px" size="mini">
            <el-row>
              <el-col :span="6">
                <el-form-item label="顺序号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总运单号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分运单号">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主要货物名称">
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
                <el-form-item label="重量(公斤)">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值">
                  <el-input :disabled="isDetail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币制">
                  <el-select size="mini" v-model="headData.curr" placeholder=" " style="width:100%;" :disabled="isDetail"
                    @focus="tipsFillMessage('curList','SAAS_CURR')"
                    filterable remote default-first-option clearable
                    :remote-method="checkParamsList"
                    @change="checkParamsList">
                    <el-option
                      v-for="item in curList"
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
                <el-form-item label="申报日期">
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
      bodyData: {

      },
      iEFlagList: [{
        value: 'I',
        label: '进口'
      }, {
        value: 'E',
        label: '出口'
      }], // 舱单进出口标志
      recordTypeList: [{
        value: 'M',
        label: '追加或修改'
      }, {
        value: 'N',
        label: '新增'
      }], // 记录类型
      tableNameList: {
        tableNames: [
          'SAAS_CUSTOMS_REL', // 海关关区
          'SAAS_SW_AIRPORT_CODE', // 港口
          'SAAS_TRANSPORT_TYPE', // 运输方式
          'SAAS_CURR' // 币制
        ]
      }, // 字典标明
      selectObj: {
        obj: '',
        params: ''
      },
      cusCustomsCodeList: [],
      portList: [],
      trafList: [],
      curList: []
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
        this.portList = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE'))
        this.trafList = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE'))
        this.curList = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
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
          this.portList = JSON.parse(window.localStorage.getItem('SAAS_SW_AIRPORT_CODE'))
          this.trafList = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE'))
          this.curList = JSON.parse(window.localStorage.getItem('SAAS_CURR'))
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
    // 申报
    declare () {

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
.no-input{
  display: inline-block;
}
.mg-b-20{
  margin-bottom: 20px;
}
</style>
