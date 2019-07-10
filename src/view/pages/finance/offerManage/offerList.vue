<template>
  <section class='sys-main'>
    <el-row class='query-condition'>
      <el-form label-width="0px" :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="报价名称" :label-width="labelFormWidth.six">
              <el-input v-model="QueryForm.itemName" size="mini" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="委托企业" :label-width="labelFormWidth.six">
              <el-input size="mini" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价含税" :label-width="labelFormWidth.six">
              <el-select v-model="QueryForm.rateFlag" size="mini" clearable  style="width:100%;">
                <el-option key="1" :label="'含税'" :value="'Y'"></el-option>
                <el-option key="0" :label="'不含税'" :value="'N'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进/出境关别" :label-width="labelFormWidth.six">
              <el-input v-model="QueryForm.impexpPortcdNames" size="mini" clearable maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="申报地海关" :label-width="labelFormWidth.five">
              <el-input v-model="QueryForm.dclPlcCuscdNames" size="mini" clearable maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人" :label-width="labelFormWidth.five">
              <el-input v-model="QueryForm.createUserId" size="mini" clearable maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建日期" :label-width="labelFormWidth.five">
               <el-date-picker
                style="width:100%"
                v-model="dates"
                type="daterange"
                align="right"
                unlink-panels
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
        <el-button size="mini" type="primary" @click="getsOfferList">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add"><i></i>新增</el-button>
        <el-button size="mini" class="list-btns list-icon-export"><i></i>导出</el-button>
      </el-row>
      <el-table class='sys-table-table' :data="offerTableList" border highlight-current-row height="530px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="报价名称" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="委托企业" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="有效期" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="项目独立报价" min-width="120" align="center">
        </el-table-column>
        <el-table-column label="报价含税" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="创建人" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="创建时间" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120" align="center">
          <template slot-scope="scope">
            <el-button title="编辑" class="table-icon list-icon-edit"><i></i></el-button>
            <el-button title="删除" class="table-icon list-icon-delete"><i></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getsOfferList"></page-box>
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
      dates: [],
      QueryForm: {
        rateFlag: '0',
        itemName: '',
        impexpPortcdNames: '',
        impexpPortcd: '',
        entrustCompanyName: '',
        entrustCompanyId: '',
        dclPlcCuscdNames: '',
        dclPlcCuscd: '',
        createUserId: '',
        createDate: ''
      },
      offerTableList: [],
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
  },
  methods: {
    // 报价列表查询
    getsOfferList (pagination) {
      if (this.dates.length > 0) {
        this.QueryForm.createDate = [util.dateFormat(this.dates[0]), util.dateFormat(this.dates[1])]
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/quotation/gets',
        data: {
          ...this.QueryForm,
          page: pagination || this.$store.state.pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          this.offerTableList = res.result
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        rateFlag: '0',
        itemName: '',
        impexpPortcdNames: '',
        impexpPortcd: '',
        entrustCompanyName: '',
        entrustCompanyId: '',
        dclPlcCuscdNames: '',
        dclPlcCuscd: '',
        createUserId: '',
        createDate: ''
      }
      this.dates = []
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
