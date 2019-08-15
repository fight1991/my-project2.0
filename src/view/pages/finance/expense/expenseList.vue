<template>
  <section class='sys-main'>
    <el-row class='query-condition'>
      <el-form :label-width="labelFormWidth.four" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="接单编号">
              <el-input v-model="QueryForm.orderNo" size="mini" clearable :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报关单号">
              <el-input size="mini" clearable v-model="QueryForm.decNo" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提单号">
              <el-input size="mini" clearable v-model="QueryForm.billNo" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型">
              <el-select v-model="QueryForm.businessType" size="mini" clearable  style="width:100%;">
                <el-option key="1" :label="'报关'" :value="1"></el-option>
                <el-option key="2" :label="'货代'" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="委托企业">
              <el-autocomplete style="width:100%;"
                class="inline-input" :maxlength="30" clearable
                v-model="QueryForm.entrustCompanyName"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                placeholder="请选择">
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出口">
              <el-select v-model="QueryForm.iEFlag" size="mini" clearable style="width:100%;">
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
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="QueryForm.status" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'台账已提交'" :value="1"></el-option>
                <el-option key="1" :label="'台账待审核'" :value="2"></el-option>
                <el-option key="2" :label="'台账已审核'" :value="3"></el-option>
                <el-option key="3" :label="'台账已退回'" :value="4"></el-option>
                <el-option key="4" :label="'账单已生成'" :value="5"></el-option>
                <el-option key="5" :label="'账单审核退回'" :value="6"></el-option>
                <el-option key="6" :label="'账单对账退回'" :value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
      <el-row class="query-btn" style="text-align:center">
        <el-button size="mini" type="primary" @click="getsExpenseList($store.state.pagination)">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table-financeCommon'>
      <el-row class="table-btn">
        <el-button size="mini" :disabled="isCreateBill || selectedRow.length===0" class="list-btns list-icon-add" @click="createAccount"><i></i>生成对账单</el-button>
        <el-button size="mini" class="list-btns list-icon-add" @click="goToDeital('add')"><i></i>台账新增</el-button>
      </el-row>
      <el-table class='sys-table-table' :data="expenseTableList" border
        highlight-current-row height="530px" ref="expenseTable"
        @select="chooseSelectBox"
        @row-click="chooseSelectRow"
        @select-all="chooseSelectBoxAll">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column label="接单编号" min-width="120" align="center" prop="orderNo">
          <template slot-scope="scope">
            {{scope.row.orderNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="报关单号" min-width="120" align="center" prop="decNo">
          <template slot-scope="scope">
            {{scope.row.decNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="提单号" min-width="120" align="center" prop="billNo">
          <template slot-scope="scope">
            {{scope.row.billNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="业务类型" min-width="80" align="center" prop="businessType">
          <template slot-scope="scope">
            {{scope.row.businessType === 1 ? '报关':'货代'}}
          </template>
        </el-table-column>
        <el-table-column label="委托企业" min-width="120" align="left" prop="entrustCompanyName">
          <template slot-scope="scope">
            {{scope.row.entrustCompanyName || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="进出口" min-width="80" align="center" prop="iEFlag">
          <template slot-scope="scope">
            {{scope.row.iEFlag === 0 ? '进口': scope.row.iEFlag === 1 ? '出口' : '内贸'}}
          </template>
        </el-table-column>
        <el-table-column label="开航日" min-width="100" align="center" prop="sailDay">
          <template slot-scope="scope">
            {{scope.row.sailDay || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="放行时间" min-width="100" align="center" prop="releaseDay">
          <template slot-scope="scope">
            {{scope.row.releaseDay || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100" align="center" prop="statusValue">
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="130" align="center">
          <template slot-scope="scope">
            <div class="sys-td-c">
              <el-button title="编辑" v-if="scope.row.status === 4" type="text" class="table-icon list-icon-edit" @click.stop="goToDeital('edit', scope.row.businessType, scope.row.iEFlag, scope.row.expenseBillId, scope.row.status)"><i></i></el-button>
              <el-button title="查看" type="text" class="table-icon list-icon-look" @click.stop="goToDeital('look', scope.row.businessType, scope.row.iEFlag, scope.row.expenseBillId, scope.row.status, scope.row.businessType)"><i></i></el-button>
              <el-button title="单条导出" type="text" class="table-icon list-icon-export" @click.stop="exportBill(scope.row.expenseBillId)"><i></i></el-button>
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
  </section>
</template>

<script>
import util from '@/common/util'
export default {
  data () {
    return {
      dates1: [],
      dates2: [],
      corpList: [],
      expenseBillIds: [], // 存储报价id数组
      isCreateBill: true,
      selectedRow: [],
      expenseTableList: [],
      QueryForm: {
        billNo: '', // 提单号
        businessType: '', // 业务类型 1报关，2货代
        status: '', // 1台账已提交2台账待审核3台账已审核4台账已退回5账单已生成6账单审核退回7账单对账退回
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
      paginationInit: '',
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
  watch: {
    '$route': function (to, from) {
      if (to.name === 'expense-list' && to.query.from === 'other' && from.name === 'expense-detail') {
        this.getsExpenseList(this.$store.state.pagination)
      }
    }
  },
  created () {
    this.justyIsOpen()
    this.paginationInit = this.$store.state.pagination
    this.getsExpenseList(this.$store.state.pagination)
    this.getcorps()
  },
  methods: {
    // 获取台账列表
    getsExpenseList (pagination) {
      if (this.dates2 && this.dates2.length > 0) {
        this.QueryForm.releaseDayStart = this.dates2[0]
        this.QueryForm.releaseDayEnd = this.dates2[1]
      } else {
        this.QueryForm.releaseDayStart = ''
        this.QueryForm.releaseDayEnd = ''
      }
      if (this.dates1 && this.dates1.length > 0) {
        this.QueryForm.sailDayStart = this.dates1[0]
        this.QueryForm.sailDayEnd = this.dates1[1]
      } else {
        this.QueryForm.sailDayStart = ''
        this.QueryForm.sailDayEnd = ''
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/bill/gets',
        data: {
          ...this.QueryForm,
          page: pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          this.expenseTableList = res.result || []
        }
      })
    },
    // 委托企业查询
    getcorps () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance/bill/getEntrustCompanyNames',
        data: {},
        router: this.$router,
        success: ({result}) => {
          this.corpList = result || []
        }
      })
    },
    querySearch (queryString, cb) {
      let results = []
      if (this.corpList.length === 0) return cb(results)
      let restaurants = this.corpList
      if (queryString.trim().length > 1) {
        results = restaurants.filter(v => {
          return v && v.indexOf(queryString) >= 0
        })
      }
      if (results.length === 0) return cb(results)
      let tempArr = results.map(item => ({value: item}))
      cb(tempArr)
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        billNo: '',
        businessType: '',
        status: '',
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
      this.dates1 = []
      this.dates2 = []
    },
    // 跳转到编辑或详情页
    goToDeital (type, businessType, iEFlag = '', id = '', status = '') {
      console.log(businessType)
      this.$router.push({
        name: 'expense-detail',
        query: {
          type,
          businessType,
          iEFlag,
          expenseBillId: id,
          status,
          setTitle: type === 'edit' ? '台账编辑' : type === 'add' ? '台账新增' : '台账详情',
          setId: 'expense-detail' + id
        }
      })
    },
    // 单条导出台账信息
    exportBill (id) {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/bill/export',
        data: {expenseBillId: id},
        router: this.$router,
        success: ({result}) => {
          result && window.open(result, '_blank')
        }
      })
    },
    // 判断开关是否开启
    justyIsOpen (callback) {
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/ccba/review/isReview',
        data: ['bill_corp_audit'],
        router: this.$router,
        success: ({result}) => {
          let swtichCheck = result['bill_corp_audit'].value
          callback && callback(swtichCheck)
        }
      })
    },
    // 生成对账单
    createAccount () {
      if (this.expenseBillIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择一条或多条台账'
        })
        return
      }
      // 没开审核开关的时候，提示内容不需要提示需要内部审核
      this.justyIsOpen((flag) => {
        let content = '是否确认生成对账单 ?'
        if (flag === 'Y') {
          content = '是否确认生成对账单 ? 请注意,当前情况下,生成的对账单需要先进行内容审核确认'
        }
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('ajax', {
            url: 'API@saas-finance/account/create',
            data: {expenseBillIds: this.expenseBillIds},
            router: this.$router,
            success: () => {
              this.$message({
                type: 'success',
                message: '生成对账单成功'
              })
              this.getsExpenseList(this.$store.state.pagination)
              this.isCreateBill = true
            }
          })
        }).catch(() => {})
      })
    },
    // 勾选选择框
    chooseSelectBox (selection, row) {
      this.expenseBillIds = selection.map(v => {
        return v.expenseBillId
      })
      this.isCreateBill = !selection.every(v => v.status === 1 || v.status === 3)
      this.selectedRow = [...selection]
    },
    // 勾选选择框
    chooseSelectBoxAll (selection) {
      this.expenseBillIds = selection.map(v => {
        return v.expenseBillId
      })
      this.isCreateBill = !selection.every(v => v.status === 1 || v.status === 3)
      this.selectedRow = [...selection]
    },
    // 点击表格行
    chooseSelectRow (row, column, event) {
      let index = this.expenseBillIds.indexOf(row.expenseBillId)
      if (index >= 0) { // 当前的行已经被选中了
        this.$refs['expenseTable'].toggleRowSelection(row, false)
        this.expenseBillIds.splice(index, 1)
        this.selectedRow.splice(index, 1)
      } else {
        this.$refs['expenseTable'].toggleRowSelection(row, true)
        this.expenseBillIds.push(row.expenseBillId)
        this.selectedRow.push({...row})
      }
      this.isCreateBill = !this.selectedRow.every(v => v.status === 1 || v.status === 3)
    }
  }
}
</script>

<style lang="less" scoped>
.query-condition {
  background-color: #fff;
  padding: 20px;
}
.query-btn {
  padding: 10px 0;
}
.table-btn {
  padding-bottom: 15px;
}
</style>
