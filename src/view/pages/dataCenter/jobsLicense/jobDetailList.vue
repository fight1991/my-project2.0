<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row>
        <el-col :span='18' :xs='24'>
          <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
      <el-row class = "query-table">
        <el-row>
          <el-col :span="12">
            委托企业:{{resultTopData.id}}
          </el-col>
          <el-col :span="12">
            许可证数:{{resultTopData.id + ''}}
          </el-col>
        </el-row>
        <el-row>
          <el-form label-width="0px" :model="jobDetailForm" size="mini" label-position="right">
        <!-- 查询条件 -->
            <el-row :gutter="20" style="padding-top:30px">
              <el-col :span="6" :xs="12">
                <el-form-item>
                  <el-input size="mini" clearable v-model="jobDetailForm.ID" placeholder="许可证号、涉证商品编号"></el-input>
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
        :data="resultJobList">
        <el-table-column label="报关单系统编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="接单编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="统一编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="海关编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="业务状态" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="创建日期" min-width="90">
          <template slot-scope="scope">
            <div class='sys-td-c'>{{scope.row.ID || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传单证数" min-width="200">
          <template slot-scope="scope">
            {{scope.row.ID+'' || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetailChild('detail',scope.row.ID)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
            <el-button type="text" @click="upload" title="导入"><i class="fa fa-sign-in"></i></el-button>
            <el-button type="text" @click="toDetailChild('edit',scope.row.ID)" title="编辑"><i class="fa fa-edit f-18"></i></el-button>
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
export default {
  data () {
    return {
      jobDetailForm: {
        ID: ''
      },
      dates: ['', ''],
      resultJobList: [
        {ID: '222222222222'},
        {ID: '111111'},
        {ID: '33333333'}
      ], // 表格数据
      resultTopData: {
        id: ''
      }
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.search()
  },
  methods: {
    // 新建
    add (type, name) {
      this.$router.push({
        name: '许可证新增',
        query: {
          type: type,
          name: name
        }
      })
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 列表
    queryList (pagination) {
      // this.paginationInit = pagination
      // this.$store.dispatch('ajax', {
      //   url: 'API@/dec-common/decParam/common/getPriceList',
      //   data: {
      //     ...this.jobDetailForm,
      //     page: pagination
      //   },
      //   router: this.$router,
      //   isPageList: true,
      //   success: (res) => {
      //     this.priceList = res.result.list
      //     this.paginationInit = res.page
      //   }
      // })
    },
    // 重置
    reset () {
      this.dates = ['', '']
    },
    // 跳转到详情页面
    toDetailChild (type, id) {
      // this.$router.push({
      //   name: '业务单证信息',
      //   params: {
      //     id: id
      //   }
      // })
    },
    // 导入
    upload () {
    },
    // 删除
    deleteBtn () {

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
