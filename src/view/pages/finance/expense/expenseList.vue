<template>
  <section class='sys-main'>
    <el-row class='query-condition'>
      <el-form label-width="0px" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="接单编号" :label-width="labelFormWidth.four">
              <el-input v-model="QueryForm.orderNo" size="mini" clearable :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报关单号" :label-width="labelFormWidth.four">
              <el-input size="mini" clearable v-model="QueryForm.decNo" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提单号" :label-width="labelFormWidth.four">
              <el-input size="mini" clearable v-model="QueryForm.billNo" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型" :label-width="labelFormWidth.four">
              <el-select v-model="QueryForm.businessType" size="mini" clearable  style="width:100%;">
                <el-option key="1" :label="'报关'" :value="'1'"></el-option>
                <el-option key="2" :label="'货代'" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="受托企业" :label-width="labelFormWidth.four">
              <el-select v-model="QueryForm.entrustCompanyName" :maxlength="30" style="width:100%"
                filterable remote clearable
                :remote-method="getcorps"
                allow-create
                default-first-option >
                <el-option
                  v-for="item in corpList"
                  :key="item.corpId"
                  :label="item.corpName"
                  :value="item.corpName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出口" :label-width="labelFormWidth.four">
              <el-select v-model="QueryForm.iEFlag" size="mini" clearable  style="width:100%;">
                <el-option key="0" :label="'进口'" :value="'0'"></el-option>
                <el-option key="1" :label="'出口'" :value="'1'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开行日" :label-width="labelFormWidth.four">
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
            <el-form-item label="放行时间" :label-width="labelFormWidth.four">
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
        <!-- 查询条件 end-->
      </el-form>
      <el-row class="query-btn" style="text-align:center">
        <el-button size="mini" type="primary" @click="getsExpenseList($store.state.pagination)">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add"><i></i>生成对账单</el-button>
      </el-row>
      <el-table class='sys-table-table' :data="expenseTableList" border highlight-current-row height="530px">
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
            {{scope.row.businessType === '1'? '报关':'货代'}}
          </template>
        </el-table-column>
        <el-table-column label="委托企业" min-width="80" align="center" prop="entrustCompanyName">
          <template slot-scope="scope">
            {{scope.row.businessType || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="进出口" min-width="80" align="center" prop="iEFlag">
          <template slot-scope="scope">
            {{scope.row.iEFlag === '0'? '进口': scope.row.iEFlag === '1' ? '出口':'内贸'}}
          </template>
        </el-table-column>
        <el-table-column label="开航日" min-width="80" align="center" prop="sailDay">
          <template slot-scope="scope">
            {{scope.row.sailDay || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="放行时间" min-width="80" align="center" prop="releaseDay">
          <template slot-scope="scope">
            {{scope.row.releaseDay || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80" align="center" prop="cFlag">
          <template slot-scope="scope">
            {{scope.row.cFlag ? '账单已生成':'账单未生成' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="130" align="center">
          <template slot-scope="scope">
            <div class="sys-td-c">
              <el-button title="编辑" type="text" class="table-icon list-icon-edit" @click.stop="goToDeital('edit', scope.row.expenseBillId)"><i></i></el-button>
              <el-button title="查看" type="text" class="table-icon list-icon-look" @click.stop="goToDeital('look', scope.row.expenseBillId)"><i></i></el-button>
              <el-button title="单条导出" type="text" class="table-icon list-icon-export"><i></i></el-button>
              <el-button title="台账信息" type="text" class="table-icon list-icon-scan"><i></i></el-button>
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
      QueryForm: {
        billNo: '', // 提单号
        businessType: '', // 业务类型 1报关，2货代
        cFlag: '', // 是否创建过账单false没有true已创建 bloou
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
  created () {
    this.paginationInit = this.$store.state.pagination
    this.getsExpenseList(this.$store.state.pagination)
  },
  methods: {
    // 获取台账列表
    getsExpenseList (pagination) {
      if (this.dates1 && this.dates1.length > 0) {
        this.QueryForm.releaseDayStart = this.dates1[0]
        this.QueryForm.releaseDayEnd = this.dates1[1]
      }
      if (this.dates2 && this.dates2.length > 0) {
        this.QueryForm.sailDayStart = this.dates2[0]
        this.QueryForm.sailDayEnd = this.dates2[1]
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
        billNo: '',
        businessType: '',
        cFlag: '',
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
    goToDeital (type, id) {
      this.$router.push({
        name: 'expense-detail',
        query: {
          type,
          expenseBillId: id
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
