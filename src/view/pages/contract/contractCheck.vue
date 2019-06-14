<template>
  <section class='sys-main'>
    <!-- 头部 -->
    <el-row class='query-condition'>
      <el-form  :label-width="labelFormWidth.four" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="4" :xs="12">
            <el-form-item label="合同企业" class="form-item-mg0">
              <el-autocomplete
                size='mini' style="width:100%" clearable
                v-model="QueryForm.entrustCompanyId  " placeholder='企业'
                :maxlength="30"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false">
              </el-autocomplete>
              <!-- <el-select size="mini" filterable remote :remote-method="queryCompanyList" :loading=' loading ' reserve-keyword loading-text="加载中" clearable v-model="QueryForm.entrustCompanyId  " placeholder='企业'  style="width:100%;">
                <el-option
                  v-for="item in companyList"
                  :key="item.corpId"
                  :label="item.corpName"
                  :value="item.corpId">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="4" :xs="12">
            <el-form-item label="合同号" class="form-item-mg0">
              <el-input size="mini" clearable v-model="QueryForm.contractNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xs="24">
            <el-form-item label="创建时间" class="form-item-mg0">
              <el-date-picker size="mini"  v-model="QueryForm.createDate"  style="width:100%;"
                type="date"
                :editable='false'>
            </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xs="12">
            <el-form-item label="创建人" class="form-item-mg0">
              <el-select size="mini" filterable remote :remote-method="queryCompanyList" :loading=' loading ' reserve-keyword loading-text="加载中" clearable v-model="QueryForm.entrustCompanyId  " placeholder='企业'  style="width:100%;">
                <el-option
                  v-for="item in companyList"
                  :key="item.corpId"
                  :label="item.corpName"
                  :value="item.corpId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="24">
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" @click="resetQueryform">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </el-row>
    <!-- 头部 end-->
    <!-- 主显示框 -->
    <div class='query-table'>
      <el-row class="mg-b-15">
          <el-button size="mini" class="list-btns list-icon-subimtCheck" @click="openFun('add', 'add')"><i></i>合同审核</el-button>
          <el-button size="mini" class="list-btns list-icon-checkP" @click="deleteFun"><i></i>批量审核</el-button>
          <el-button size="mini" class="list-btns list-icon-check" @click="deleteFun"><i></i>批量驳回</el-button>
          <el-button size="mini" class="list-btns list-icon-look" @click="deleteFun"><i></i>查看详情</el-button>
      </el-row>
      <!-- 列表 list -->
      <el-table class='sys-table-table' :data="resultList" border highlight-current-row height="530px">
        <el-table-column label="序号" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column label="合同甲方" min-width="180" >
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.companyName">
              {{scope.row.companyName || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="合同乙方" min-width="180">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.companyName">
              {{scope.row.entrustCompanyName || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="合同号" width="180">
          <template slot-scope="scope">
            {{scope.row.contractNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="合同有效期" min-width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.contractBeginDate   || '-'}}~{{scope.row.contractEndDate || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="结算日" min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.settlementDay || '-'}}号
          </template>
        </el-table-column>
        <el-table-column label="结算周期" min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.settlementPeriod==0?'上月整月':'上季整季' || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="付款周期" min-width="80" align="right">
          <template slot-scope="scope">
            {{scope.row.paymentPeriod || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="创建人" min-width="80">
          <template slot-scope="scope">
            {{scope.row.createUserName || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80">
          <template slot-scope="scope">
            {{formatStatus(scope.row.status) || '-'}}
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row class='sys-page-list mg-b-50'>
        <el-col :span="24" align="right">
            <page-box :pagination='paginationInit' @change="queryTablelist"></page-box>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import util from '../../../common/util'
export default {
  data () {
    return {
      menuCodes: [['SAASOM0501040000', 'SAASOM0501030000', 'SAASOM0501050000', 'SAASOM0501020000']], // 权限编码
      permColumn: [true], // 表格操作栏列显示
      resultList: [], // 列表数据
      QueryForm: {
        entrustCompanyId: ''
      }, // 查询条件
      dates: ['', ''], // 日期
      loading: false,
      corpListOptions: [], // 企业
      statusList: [
        {
          label: '待审核',
          value: '0'
        }, {
          label: '审核通过',
          value: '1'
        }, {
          label: '审核驳回',
          value: '2'
        }, {
          label: '已失效',
          value: '3'
        }
      ], // 状态
      companyList: [] // 公司数据
    }
  },
  created () {
    this.resetQueryform()
    this.paginationInit = this.$store.state.pagination
    this.search()
    this.corpList()
  },
  mounted () {
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path === '/contract/list') {
        this.corpList()
        this.search()
      }
    }
  },
  methods: {
    // 查询
    search () {
      this.queryTablelist(this.$store.state.pagination)
    },
    // 查询列表
    queryTablelist (pagination) {
      this.QueryForm.status = parseInt(this.QueryForm.statuss)
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance-expense/contract/gets',
        data: {
          ...this.QueryForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.resultList = res.result
          this.paginationInit = res.page
        }
      })
    },
    // 查询列表
    getCreateUsers (query) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance-expense/contract/getCreateUsers',
        data: { corpId: this.companyList.corpId },
        router: this.$router,
        isLoad: false,
        success: (res) => {
          this.loading = false
          this.companyList = res.result
        }
      })
    },
    // 企业
    corpList (val) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance-expense/contract/getCooperationCompanys',
        data: { companyName: val },
        router: this.$router,
        success: (res) => {
          if (res.success) {
            let json = JSON.stringify(res.result)
            json = json.replace(/corpName/g, 'value')
            this.corpListOptions = JSON.parse(json)
          }
        }
      })
    },
    // 输入2个字后搜索
    querySearch (queryString, cb) {
      if (this.QueryForm.entrustCompanyId.length < 2) {
        return
      }
      let restaurants = this.corpListOptions
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results.slice(0, 10))
    },
    createFilter (queryString) {
      return (restaurant) => {
        if (util.isEmpty(restaurant.value)) {
          return false
        } else {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      }
    },
    // 删除
    deleteContract (row) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-finance-expense/contract/delete',
        data: {pkSeqNo: row.pkSeqNo},
        router: this.$router,
        isLoad: false,
        success: (res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.search()
        }
      })
    },
    // 创建合同
    creatContract (type, value) {
      this.$router.push({
        name: 'contract-add',
        params: {
          flag: type,
          pkSeqNo: value
        }
      })
    },
    // 重置
    resetQueryform () {
      this.QueryForm = {}
      this.dates = ['', '']
      this.search()
    },
    // 详情
    gotoDetail (data) {
      this.$router.push({
        name: 'contract-detail',
        params: {
          pkSeqNo: data.pkSeqNo
        }
      })
    },
    // 格式化状态
    formatStatus (val) {
      let value = ''
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].value === val) {
          value = this.statusList[i].label
          break
        }
      }
      return value
    }
  }
}
</script>
<style scoped lang="less">
.query-condition {
    background-color: #fff;
    padding: 20px;
  }
.query-table {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>
