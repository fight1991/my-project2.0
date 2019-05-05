<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row>
        <el-col :span='18' :xs='24'>
          <span @click="back" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
      <el-row class = "query-table">
        <el-row>
          <el-col :span="8">
            委托企业:{{ownerName}}
          </el-col>
          <el-col :span="8">
            累计业务票数:{{decCount + ''}}
          </el-col>
          <el-col :span="8">
            累计上传单证:{{edocCount + ''}}
          </el-col>
        </el-row>
        <el-row>
          <el-form label-width="0px" :model="jobDetailForm" size="mini" label-position="right">
        <!-- 查询条件 -->
            <el-row :gutter="20" style="padding-top:30px">
              <el-col :span="6" :xs="12">
                <el-form-item>
                  <el-input size="mini" clearable v-model="jobDetailForm.keywords" placeholder="接单编号、系统编号、报关单号"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8" :xs="12">
                  <el-form-item label-width="100px" label="创建日期">
                  <el-date-picker size="mini"
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
                <el-button size="mini" @click="resetQuery" style="padding:8px 20px 5px 20px;">重置</el-button>
              </el-col>
            </el-row>
          <!-- 查询条件 end-->
          </el-form>
        </el-row>
      </el-row>
    </el-row>
    <!-- 头部 end-->
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 列表 list -->
      <el-table class='sys-table-table'
        border highlight-current-row size="mini"
        :data="resultJobList">
        <el-table-column label="报关单系统编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.decPid || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="接单编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.bossId || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="统一编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.seqNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="海关编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.entryId || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="业务状态" min-width="200">
          <template slot-scope="scope">
            {{scope.row.isExamineValue || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="创建日期" min-width="90">
          <template slot-scope="scope">
            <div>{{scope.row.createTime || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传单证数" min-width="200">
          <template slot-scope="scope">
            {{scope.row.count+'' || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row.decPid,jobDetailForm.ownerCodeScc)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
            <el-button type="text" @click="upload(scope.row.decPid,jobDetailForm.ownerCodeScc)" title="导入"><i class="fa fa-sign-in"></i></el-button>
            <el-button type="text" @click="toEdit(scope.row.decPid,jobDetailForm.ownerCodeScc)" title="编辑"><i class="fa fa-edit f-18"></i></el-button>
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
      jobDetailForm: {
        ownerCodeScc: '',
        keywords: '',
        updateTimeStart: '',
        updateTimeEnd: ''
      },
      dates: ['', ''],
      resultJobList: [], // 表格数据
      ownerName: '',
      decCount: '',
      edocCount: ''
    }
  },
  created () {
    this.reset()
    this.paginationInit = this.$store.state.pagination
    this.jobDetailForm.ownerCodeScc = this.$route.query.ownerCodeScc
    this.search()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('jobDetailList') === -1) {
        return
      }
      this.reset()
      this.paginationInit = this.$store.state.pagination
      this.jobDetailForm.ownerCodeScc = this.$route.query.ownerCodeScc
      this.search()
    }
  },
  methods: {
    // 返回按钮
    back () {
      this.$router.push({
        name: 'jobsLicense'
      })
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 重置查询条件
    resetQuery () {
      this.dates = ['', '']
      this.jobDetailForm = {
        ownerCodeScc: this.$route.query.ownerCodeScc,
        keywords: '',
        updateTimeStart: '',
        updateTimeEnd: ''
      }
      this.search()
    },
    // 列表
    queryList (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.jobDetailForm.updateTimeStart = ''
        this.jobDetailForm.updateTimeEnd = ''
      } else {
        this.jobDetailForm.updateTimeStart = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.jobDetailForm.updateTimeEnd = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/business/queryDecList',
        data: {
          ...this.jobDetailForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          if (!util.isEmpty(res.result)) {
            this.resultJobList = util.isEmpty(res.result.decs) ? [] : res.result.decs
            this.paginationInit = res.page
            this.ownerName = res.result.ownerName
            this.decCount = res.result.decCount
            this.edocCount = res.result.edocCount
          } else {
            this.resultJobList = []
          }
        }
      })
    },
    // 重置
    reset () {
      this.dates = ['', '']
      this.jobDetailForm = {
        ownerCodeScc: '',
        keywords: '',
        updateTimeStart: '',
        updateTimeEnd: ''
      }
      this.ownerName = ''
      this.decCount = ''
      this.edocCount = ''
    },
    // 跳转到详情页面
    toDetail (decPid, ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/detailJobs',
        query: {
          decPid: decPid,
          ownerCodeScc: ownerCodeScc
        }
      })
    },
    // 跳转到编辑页面
    toEdit (decPid, ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/editJobs',
        query: {
          decPid: decPid,
          ownerCodeScc: ownerCodeScc
        }
      })
    },
    // 导入
    upload (decPid, ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/importLicense',
        query: {
          ownerCodeScc: ownerCodeScc,
          decPid: decPid
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
  .sys-fr{
    float: right;
  }
  .sys-table-detail-expand{
    padding:0 15px;
    .detail-infos{
        margin:0 20px;
        border-left: 1px solid #dfe6ec;
        border-right: 1px solid #dfe6ec;
        border-top: 1px solid #dfe6ec;
        .detail-info{
        padding: 5px 0;
        }
        .detail-info-title{
        background-color: #eef1f6;
        }
        .detail-img,.no-pic{
        display: inline-block;
        margin-right: 20px;
        height:100px;
        cursor: pointer;
        }
    }
    .detail-infos:last-child{
        border-bottom: 1px solid #dfe6ec;
    }
}
</style>
