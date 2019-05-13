<template>
  <section class='sys-main'>
     <!-- 头部 -->
      <el-row class = "query-condition">
        <el-form label-width="0px" :model="queryForm" size="mini" label-position="right">
      <!-- 查询条件 -->
          <el-row :gutter="50">
            <el-col :span="6" :xs="12">
              <el-form-item class="form-item-mg0">
                <el-autocomplete
                  size='mini' style="width:100%"
                  placeholder="请输入委托企业(输入2个字后搜索)"
                  :maxlength="20" clearable
                  v-model="queryForm.keywords"
                  :fetch-suggestions="querySearch"
                  :trigger-on-focus="false">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="8" :xs="12">
              <el-form-item :label-width="labelFormWidth.seven" label="报关单创建日期" class="form-item-mg0">
                <el-date-picker size="mini"  style="width:100%;"
                  v-model="dates"
                  type="daterange"
                  :editable='false'
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" :xs="12">
              <el-button size="mini" type="primary" @click="search()" style="padding:8px 20px 5px 20px;">查询</el-button>
              <el-button size="mini" @click="reset" style="padding:8px 20px 5px 20px;">重置</el-button>
            </el-col>
          </el-row>
       <!-- 查询条件 end-->
        </el-form>
      </el-row>
      <!-- 头部 end-->
      <!-- 主显示框 -->
      <div class='query-table'>
        <!-- 列表 list -->
        <el-table class='sys-table-table' height="500px"
          border highlight-current-row size="mini"
          :data="resultList">
          <el-table-column label="委托企业" min-width="100">
            <template slot-scope="scope">
              <div class='sys-td-l'>
                {{scope.row.ownerName || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="累计业务票数" min-width="50">
            <template slot-scope="scope">
              <div class='sys-td-r'>
                {{scope.row.decCount+'' || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="累计上传单证" min-width="50">
            <template slot-scope="scope">
              <div class='sys-td-r'>
                {{scope.row.edocCount+'' || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="报关单创建时间" min-width="50">
            <template slot-scope="scope">
              <div class='sys-td-c'>
                {{scope.row.updateTime | date() || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class='sys-td-c'>
                <el-button type="text" class="table-icon list-icon-look" @click="toChild(scope.row.ownerCodeScc)" title="查看"><i></i></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box :pagination='paginationInit' @change="queryList"></page-box>
            </el-col>
        </el-row>
      </div>
  </section>
</template>

<script>
import util from '../../../../common/util'
export default {
  data () {
    return {
      queryForm: {
        keywords: '',
        updateTimeStart: '',
        updateTimeEnd: ''
      },
      corpListOptions: [], // 委托企业
      dates: ['', ''],
      resultList: []
    }
  },
  created () {
    this.reset()
    this.paginationInit = this.$store.state.pagination
    this.corpList()
    this.search()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path === '/dataCenter/jobsLicense') {
        this.corpList()
        this.search()
      }
    }
  },
  methods: {
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 列表
    queryList (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.queryForm.updateTimeStart = ''
        this.queryForm.updateTimeEnd = ''
      } else {
        this.queryForm.updateTimeStart = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.queryForm.updateTimeEnd = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/business/queryOwnerList',
        data: {
          ...this.queryForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.resultList = util.isEmpty(res.result) ? [] : res.result
          this.paginationInit = res.page
        }
      })
    },
    // 重置
    reset () {
      this.dates = ['', '']
      this.queryForm = {
        keywords: '',
        updateTimeStart: '',
        updateTimeEnd: ''
      }
      this.search()
    },
    // 委托企业
    corpList (val) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/dccommon/queryCorps',
        data: val,
        router: this.$router,
        success: (res) => {
          if (res.success) {
            let json = JSON.stringify(res.result)
            json = json.replace(/ownerName/g, 'value')
            this.corpListOptions = JSON.parse(json)
          }
        }
      })
    },
    // 输入2个字后搜索
    querySearch (queryString, cb) {
      if (this.queryForm.keywords.length < 2) {
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
    // 跳转到详情页面
    toChild (ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/jobDetailList',
        query: {
          ownerCodeScc: ownerCodeScc
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
  .m-r-10{
    margin-right: 10px;
  }
  .span-right{
    float: right;
    margin-right: 2%;
    color: #0b93f3;
    margin-top: 6px;
  }
  .airvehicle-table-popper{
    min-width: auto;
    ul{
        li{
            line-height: 20px;
            .el-checkbox__label{
                font-size: 12px;
            }
        }
    }
  }
  .airvehicle-list-drop {
    float: right;
  }
  .layer-btn-primary {
    height: 32px;
    line-height: 32px;
    margin: 0 6px;
    padding: 0 15px;
    border: 1px solid #4898d5;
    border-radius: 2px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    background-color: #2e8ded;
    color: #fff;
  }
   .layer-btn {
    height: 32px;
    line-height: 32px;
    margin: 0 6px;
    padding: 0 15px;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: #333333;
  }
  .el-select-dropdown__item.selected {
        background: #0080ff;
        color: #ffffff;
    }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
      background: #dbed8a;
      font-weight: bold;
  }
  .el-select-dropdown__item {
      font-size: 12px;
      padding: 0 15px;
      height: 22px;
      line-height: 22px;
      border: #c0c0c0 solid 1px;
  }
  .el-select-dropdown__list {
      padding: 0;
  }
</style>
