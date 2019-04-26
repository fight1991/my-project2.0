<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row>
        <el-col :span='12' :xs='24'>
          <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
        <el-col :span='12' :xs='24'>
          <el-button type="primary" size="mini" @click="add(corpSccCode, corpName)" class="sys-fr">新建</el-button>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
      <el-row class = "query-table">
        <el-row>
          <el-col :span="12">
            委托企业:{{corpName}}
          </el-col>
          <el-col :span="12">
            许可证数:{{count + ''}}
          </el-col>
        </el-row>
        <el-row>
          <el-form label-width="0px" :model="detailForm" size="mini" label-position="right">
        <!-- 查询条件 -->
            <el-row :gutter="20" style="padding-top:30px">
              <el-col :span="6" :xs="12">
                <el-form-item>
                  <el-input size="mini" clearable v-model="detailForm.input" placeholder="许可证号、涉证商品编号"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8" :xs="12">
                  <el-form-item label-width="100px" label="上传日期">
                  <el-date-picker size="mini"
                    v-model="dates"
                    @change="search()"
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
      </el-row>
    </el-row>
    <!-- 头部 end-->
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 列表 list -->
      <el-table class='sys-table-table'
        border highlight-current-row size="mini"
        :data="resultList">
        <el-table-column type="expand" label="更多">
          <template slot-scope="scope">
            <div class='sys-table-detail-expand'>
              <el-row :gutter="20">
                <el-col :span="20" style="padding:0;" class='detail-infos'>
                  <el-table class='sys-table-table' :data="scope.row.licenseInfos">
                    <el-table-column label="上传时间" min-width="100">
                      <template slot-scope="scope">
                        {{scope.row.updateTime | date() || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="许可证号" min-width="200">
                      <template slot-scope="scope">
                        {{scope.row.licenseNo || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="涉证商品" min-width="200">
                      <template slot-scope="scope">
                        {{scope.row.goodCount || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="许可证截止有效日期" min-width="200">
                      <template slot-scope="scope">
                        {{scope.row.expiryDate | date() || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="可用次数" min-width="100">
                      <template slot-scope="scope">
                        {{scope.row.availableNum + '' || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="剩余可用数量" min-width="100">
                      <template slot-scope="scope">
                        {{scope.row.lastCount + '' || '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                      <template slot-scope="scope">
                        <el-button type="text" @click="toDetailChild('detail',scope.row.licensePid)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
                        <el-button type="text" @click="toDetailChild('edit',scope.row.licensePid)" title="编辑"><i class="fa fa-edit f-18"></i></el-button>
                        <el-button type="text" @click="previewPicture(scope.row.licensePid)" title="附件"><i class="fa fa-eye f-18"></i></el-button>
                        <el-button type="text" @click="deleteBtn(scope.row.licensePid)" title="删除"><i class="fa fa-trash-o f-18"></i></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="许可证名称" min-width="200">
          <template slot-scope="scope">
            {{scope.row.licenseTypeValue || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="监管证件代码" min-width="200">
          <template slot-scope="scope">
            {{scope.row.licenseType || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="许可证数" min-width="100">
          <template slot-scope="scope">
            {{scope.row.count || '-'}}
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
import util from '../../../../../common/util'
export default {
  data () {
    return {
      detailForm: {
        input: '',
        startTime: '',
        endTime: ''
      },
      corpName: '',
      corpSccCode: '',
      count: '',
      dates: ['', ''],
      resultList: [
        {
          licenseTypeValue: '',
          licenseType: '',
          count: '',
          licenseInfos: []
        }
      ] // 表格数据
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.corpSccCode = this.$route.query.corpSccCode
    this.corpName = this.$route.query.corpName
    this.count = this.$route.query.count
    this.search()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('detailListLicense') === -1) {
        return
      }
      this.reset()
    }
  },
  methods: {
    // 新建
    add (corpSccCode, corpName) {
      this.$router.push({
        path: '/dataCenter/licenses/license/addLicense',
        query: {
          corpSccCode: corpSccCode,
          corpName: corpName
        }
      })
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 列表
    queryList (pagination) {
      if (this.dates === '' || this.dates === null) {
        this.detailForm.startTime = ''
        this.detailForm.endTime = ''
      } else {
        this.detailForm.startTime = util.dateFormat(this.dates[0], 'yyyy-MM-dd')
        this.detailForm.endTime = util.dateFormat(this.dates[1], 'yyyy-MM-dd')
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/license/queryLicenseTypeList',
        data: {
          ...this.detailForm,
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
    // 重置
    reset () {
      this.detailForm = {
        input: '',
        startTime: '',
        endTime: ''
      }
      this.dates = ['', '']
    },
    // 跳转到详情页面
    toDetailChild (type, id) {
      this.$router.push({
        name: 'manageDetail',
        params: {
          type: type,
          id: id
        }
      })
    },
    // 预览图片
    previewPicture (index) {
      window.open(this.fileList[index].url, '_blank')
    },
    // 删除
    deleteBtn (val) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/license/delete',
          data: {pid: val},
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.search()
          }
        })
      }).catch(() => {
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
        background: url('../../../../../assets/img/icon/back.png') no-repeat center center;
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
