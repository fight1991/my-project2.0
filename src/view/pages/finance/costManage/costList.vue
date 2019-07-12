<template>
  <section class='sys-main costList'>
    <el-row class='query-condition'>
      <el-form :label-width="labelFormWidth.four" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="费用名称">
              <el-input v-model="QueryForm.feeOptionName" size="mini" clearable :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="费用编号">
              <el-input size="mini" clearable v-model="QueryForm.feeOptionCode" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会计科目">
              <el-input size="mini" clearable v-model="QueryForm.feeSubjectName" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税率">
              <el-select v-model="QueryForm.feeRate" size="mini" clearable  style="width:100%;">
                <el-option key="1" :label="'0%'" :value="0"></el-option>
                <el-option key="2" :label="'6%'" :value="6"></el-option>
                <el-option key="3" :label="'11%'" :value="11"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="创建人">
              <el-input size="mini" clearable v-model="QueryForm.createUser" :maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期">
               <el-date-picker
                style="width:100%"
                v-model="dates"
                type="daterange"
                align="right"
                unlink-panels
                format="yyyy-MM-dd"
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
      <el-row class="query-btn" style="text-align:center">
        <el-button size="mini" type="primary" @click="getOptionList">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add" @click="showDialog('add')"><i></i>新增</el-button>
      </el-row>
      <el-table class='sys-table-table' :data="costTableList" border highlight-current-row height="530px">
        <el-table-column label="费用名称" min-width="100" align="center" prop="feeOptionName">
        </el-table-column>
        <el-table-column label="费用编号" min-width="100" align="center" prop="feeOptionCode">
        </el-table-column>
        <el-table-column label="税率" min-width="80" align="center" prop="feeRate">
          <template slot-scope="scope">
            {{scope.row.feeRate + '%'}}
          </template>
        </el-table-column>
        <el-table-column label="金蝶系统会计科目" min-width="140" align="center" prop="feeSubjectName">
        </el-table-column>
        <el-table-column label="创建人" min-width="80" align="center" prop="createUserName">
        </el-table-column>
        <el-table-column label="创建时间" min-width="160" align="center" prop="createTime">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" align="center">
          <template slot-scope="scope">
            <div class="sys-td-c">
              <el-button type="text" title="编辑" @click="showDialog('edit',scope.row)" class="table-icon list-icon-edit"><i></i></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getsExpenseList"></page-box>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="新建费用" @close="resetDialog" :visible.sync="addFeeIsShow" :close-on-click-modal='false' width="40%">
      <div  class="dec-div">
        <el-form size="mini" :label-width="'75px'" ref="addFees" :model="addFees" :rules="addFeesRule">
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="费用编号" prop="feeOptionCode">
                <el-input size="mini" :class="{'finaceCode': isDouble}" clearable v-model="addFees.feeOptionCode" :maxlength="30" @blur="checkCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="费用名称" prop="feeOptionName">
                <el-input size="mini" :disabled="isDisabled" clearable v-model="addFees.feeOptionName" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="税率">
                <el-select v-model="addFees.feeRate" size="mini" clearable  style="width:100%;">
                  <el-option key="1" :label="'0%'" :value="0"></el-option>
                  <el-option key="2" :label="'6%'" :value="6"></el-option>
                  <el-option key="3" :label="'11%'" :value="11"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="会计科目">
                <el-input size="mini" clearable v-model="addFees.feeSubjectName" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="query-btn" style="text-align:center">
          <el-button size="mini" @click="cancelBtn">取消</el-button>
          <el-button size="mini" type="primary" @mousedown.native="confirmBtn($event)">确认</el-button>
        </el-row>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '@/common/util'
export default {
  data () {
    return {
      dates: [],
      addFeeIsShow: false,
      type: '', // 记录操作类型
      QueryForm: {
        createStartTime: '', // 起始创建时间
        createEndTime: '', // 结束创建时间
        createUserName: '', // 创建人
        feeOptionCode: '', // 费用编号
        feeOptionName: '', // 费用项名称
        feeRate: 0, // 税率
        feeSubjectName: '' // 科目名称
      },
      isDisabled: false,
      isDouble: false,
      addFees: {
        feeOptionCode: '',
        feeOptionName: '',
        feeRate: 0,
        feeSubjectName: ''
      },
      costTableList: [],
      paginationInit: '',
      addFeesRule: {
        feeOptionCode: [{required: true, message: '请输入费用编号', pattern: /^[0-9a-zA-Z]{1,30}$/, trigger: 'blur'}],
        feeOptionName: [{required: true, message: '请输入费用名称', trigger: 'blur'}]
      },
      tempOptionCode: '', // 临时存储费用编号
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
    this.paginationInit = this.$store.state.pagination
    this.getOptionList()
  },
  methods: {
    // 获取费用项列表
    getOptionList (pagination) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/option/gets',
        data: {
          ...this.QueryForm,
          page: pagination || this.$store.state.pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          this.costTableList = res.result || []
        }
      })
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
        success: ({result}) => {
          this.corpList = (result && result.splice(0, 20)) || []
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        createStartTime: '',
        createEndTime: '',
        createUserName: '',
        feeOptionCode: '',
        feeOptionName: '',
        feeRate: '',
        feeSubjectName: ''
      }
      this.dates = []
    },
    // 重置创建费用项
    resetFees () {
      this.addFees = {
        feeOptionCode: '',
        feeOptionName: '',
        feeRate: 0,
        feeSubjectName: ''
      }
    },
    // 模态框关闭时数据初始化
    resetDialog () {
      this.isDisabled = false
      this.resetFees()
    },
    // 显示模态框
    showDialog (type, data) {
      this.isDouble = false
      this.addFeeIsShow = true
      this.type = type
      this.$nextTick(() => {
        this.$refs['addFees'].resetFields()
      })
      this.resetFees()
      if (type === 'add') {
        this.getFeeOptionCode()
      } else {
        this.addFees = JSON.parse(JSON.stringify(data))
        this.isDisabled = true
        this.tempOptionCode = this.addFees.feeOptionCode
      }
    },
    // 弹框取消按钮
    cancelBtn () {
      this.addFeeIsShow = false
    },
    // 弹框确定按钮
    confirmBtn (event) {
      event.preventDefault()
      let flag = false
      this.$refs['addFees'].validate(valid => {
        flag = valid
      })
      if (!flag) return
      this.type === 'add' ? this.creatOptions() : this.editOptions()
    },
    // 编辑费用项
    editOptions () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/option/edit',
        data: this.addFees,
        router: this.$router,
        success: (res) => {
          this.addFeeIsShow = false
          this.getOptionList()
        },
        other: res => {
          if (res.code === '0001') {
            this.isDouble = true
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        }
      })
    },
    // 创建费用项
    creatOptions () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/option/create',
        data: this.addFees,
        router: this.$router,
        success: ({result}) => {
          if (result) {
            this.addFeeIsShow = false
            this.getOptionList()
          }
        },
        other: res => {
          if (res.code === '0001') {
            this.isDouble = true
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        }
      })
    },
    // 生成费用编号
    getFeeOptionCode () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/option/getFeeOptionCode',
        data: {},
        router: this.$router,
        success: ({result}) => {
          if (result) {
            this.tempOptionCode = result
            this.addFees.feeOptionCode = result
          }
        }
      })
    },
    // 校验费用编号是否重复失焦事件
    checkCode () {
      let reg = /^[0-9a-zA-Z]{1,30}$/
      if (!reg.test(this.addFees.feeOptionCode)) return
      // 失焦时发送请求
      if (this.addFees.feeOptionCode === this.tempOptionCode) return
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/option/checkFeeCode',
        data: {
          feeOptionCode: this.addFees.feeOptionCode,
          feePid: this.addFees.feePid || ''
        },
        router: this.$router,
        success: ({result}) => {
          if (result) { // 重复 输入框标红并提示重复
            this.$message({
              type: 'error',
              message: '当前编号已经存在,不可重复'
            })
            this.isDouble = true
          } else {
            this.isDouble = false
            // 失焦事件和点击事件同时存在,失焦限制性,点击事件不执行了
          }
        }
      })
    },
    checkValidCode (rule, value, callback) {
      callback()
    }
  }
}
</script>

<style lang="less" scoped>
.query-condition {
  background-color: #fff;
  padding: 20px;
}
.query-table {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.query-btn {
  padding: 10px 0;
}
.table-btn {
  padding-bottom: 15px;
}
</style>
