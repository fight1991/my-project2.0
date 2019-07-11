<template>
  <section class='sys-main'>
    <el-row class='query-condition'>
      <el-form :label-width="labelFormWidth.four" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="费用名称">
              <el-input v-model="QueryForm.feeOptionName" size="mini" clearable maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="费用编号">
              <el-input size="mini" clearable v-model="QueryForm.feeOptionCode" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会计科目">
              <el-input size="mini" clearable v-model="QueryForm.feeSubjectName" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税率">
              <el-select v-model="QueryForm.feeRate" size="mini" clearable  style="width:100%;">
                <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                <el-option key="2" :label="'6%'" :value="'6%'"></el-option>
                <el-option key="3" :label="'11%'" :value="'12%'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="创建人">
              <el-input size="mini" clearable v-model="QueryForm.createUser" maxlength="15"></el-input>
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
        <el-button size="mini" type="primary" @click="getsExpenseList">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add" @click="showDialog"><i></i>新增</el-button>
      </el-row>
      <el-table class='sys-table-table' :data="costTableList" border highlight-current-row height="530px">
        <el-table-column label="费用名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="费用编号" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="税率" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="金蝶系统会计科目" min-width="140" align="center">
        </el-table-column>
        <el-table-column label="创建人" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="创建时间" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120" align="center">
          <template slot-scope="scope">
            <el-button title="编辑" class="table-icon list-icon-edit"><i></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getsExpenseList"></page-box>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="新建费用" :visible.sync="addFeeIsShow" :close-on-click-modal='false' width="40%">
      <div  class="dec-div">
        <el-form size="mini" :label-width="'75px'" ref="addFees" :model="addFees" :rules="addFeesRule">
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="费用编号" prop="feeOptionCode">
                <el-input size="mini" clearable v-model="addFees.feeOptionCode" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="费用名称" prop="feeOptionName">
                <el-input size="mini" clearable v-model="addFees.feeOptionName" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="税率">
                <el-select v-model="addFees.feeRate" size="mini" clearable  style="width:100%;">
                  <el-option key="1" :label="'0%'" :value="'0%'"></el-option>
                  <el-option key="2" :label="'6%'" :value="'6%'"></el-option>
                  <el-option key="3" :label="'12%'" :value="'12%'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :offset="5">
              <el-form-item label="会计科目">
                <el-input size="mini" clearable v-model="addFees.feeSubjectName" maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="query-btn" style="text-align:center">
          <el-button size="mini" @click="addFeeIsShow=false">取消</el-button>
          <el-button size="mini" type="primary" @click="creatOptions">确认</el-button>
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
      QueryForm: {
        createStartTime: '', // 起始创建时间
        createEndTime: '', // 结束创建时间
        createUser: '', // 创建人ID
        feeOptionCode: '', // 费用编号
        feeOptionName: '', // 费用项名称
        feeRate: '0%', // 税率
        feeSubjectName: '' // 科目名称
      },
      addFees: {
        feeOptionCode: '',
        feeOptionName: '',
        feeRate: '0%',
        feeSubjectName: ''
      },
      costTableList: [],
      paginationInit: '',
      addFeesRule: {
        feeOptionCode: [{required: true, message: '请输入费用编号', pattern: /^[0-9a-zA-Z]{1,30}$/, trigger: 'blur'}],
        feeOptionName: [{required: true, message: '请输入费用名称', trigger: 'blur'}]
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
    this.paginationInit = this.$store.state.pagination
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
          this.costTableList = res.result
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
        success: (res) => {
          this.corpList = res.result.splice(0, 20)
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        createStartTime: '',
        createEndTime: '',
        createUser: '',
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
        feeRate: '0%',
        feeSubjectName: ''
      }
    },
    showDialog () {
      this.addFeeIsShow = true
    },
    creatOptions () {
      let flag = false
      this.$refs['addFees'].validate(valid => {
        flag = valid
      })
      if (!flag) {
        return
      }
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/option/create',
        data: this.addFees,
        router: this.$router,
        success: (res) => {
          if (res.result) {
            this.resetFees()
            this.getOptionList()
          }
        }
      })
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
