<template>
  <section class='sys-main'>
    <!-- 查询条件 -->
    <div class="query-header">
      <el-form :model="queryForm" size="mini" label-width="105px">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="总运单号">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输工具航次">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申报时间">
              <el-date-picker v-model="dates"
                type="daterange"
                :editable='false'
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="express-txt-c">
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <el-button size="mini">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 查询条件 end -->
    <!-- 主显示框 -->
    <div class='query-body'>
      <el-row class="mg-b-15">
        <el-upload style="display:inline-block;"
          class="upload-demo"
          action="http://127.0.0.1"
          :before-upload="beforeUpload"
          :show-file-list="false">
          <el-button size="mini" class="file-inputx list-btns list-icon-import"><i></i>导入</el-button>
        </el-upload>
        <el-button size="mini" class="list-btns list-icon-declare"><i></i>申报</el-button>
        <el-button size="mini" class="list-btns list-icon-delete"><i></i>删除</el-button>
      </el-row>
      <el-row>
        <el-table class='sys-table-table express-table' :data="shipList" border highlight-current-row size="mini">
          <el-table-column label="序号" width="100">
            <!-- <template slot-scope="scope">
              <div class='sys-td-c'>{{(pages.pageIndex-1)*pages.pageSize+(scope.$index+1)}}</div>
            </template> -->
          </el-table-column>
          <el-table-column label="总运单号" min-width="120">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="主要货物名称" min-width="150">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="重量(公斤)" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="总件数" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报日期" min-width="130">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button size="mini" class="list-tab-btns list-icon-look" type="text" title="详情" @click="toDetail(scope.row)"><i></i></el-button>
              <el-button size="mini" class="list-tab-btns list-icon-delete" type="text" title="删除"><i></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--分页-->
      <el-row class='sys-page-list'>
        <el-col :span="24" align="right">
          <page-box :pagination="paginationInit" @change="pageList"></page-box>
        </el-col>
      </el-row>
      <!-- 分页 end -->
    </div>
    <!-- 主显示框 end -->
  </section>
</template>
<script>
export default {
  data () {
    return {
      dates: ['', ''],
      queryForm: {

      }, // 查询传参
      shipList: [{}], // 表格数据
      pages: {}, // 存放分页
      fileList: [] // 文件
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
  },
  methods: {
    // 查询
    search () {

    },
    // 重置
    reset () {

    },
    // 获取列表数据
    pageList () {

    },
    // 上传文件
    beforeUpload (file) {
      if (!(file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        this.$message({
          message: '上传文件只支持execl格式',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if (!(Math.ceil(file.size / 1024) <= 2048)) {
        this.$message({
          message: '上传文件大小不能超过2MB',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else {
        let param = new FormData()
        param.append('multiFile', file, file.name)
        this.$store.dispatch('upload', {
          url: 'FILE@/saas-upload/upload/uploadFile',
          data: param,
          router: this.$router,
          success: (res) => {
            this.fileList = []
            this.fileList.push(res.result)
          }
        })
      }
      return false
    },
    // 跳转到详情
    toDetail (data) {
      this.$router.push({
        name: 'shipBillDetail',
        params: {
          id: '1'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.express-txt-c{
  text-align: center;
}
.list-btns{
  padding: 7px 10px;
  margin: 0 3px 0 0;
  font-size: 14px;
  i{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
    vertical-align: middle;
    margin-top: -2px;
  }
}
.list-tab-btns{
  padding: 0;
  margin: 0 5px 0 0;
  i{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-top: -2px;
  }
}
.list-icon-look{
  i{
    background: url('../../../../assets/img/icon/icon-look.png') no-repeat;
  }
  &:hover i,&:focus i{
    background: url('../../../../assets/img/icon/icon-lookH.png') no-repeat;
  }
}
.list-icon-import{
  i{
    background: url('../../../../assets/img/icon/icon-import.png') no-repeat;
  }
  &:hover i,&:focus i{
    background: url('../../../../assets/img/icon/icon-importH.png') no-repeat;
  }
}
.list-icon-declare{
  i{
    background: url('../../../../assets/img/icon/icon-declare.png') no-repeat;
  }
  &:hover i,&:focus i{
    background: url('../../../../assets/img/icon/icon-declareH.png') no-repeat;
  }
}
.list-icon-delete{
  i{
    background: url('../../../../assets/img/icon/icon-delete.png') no-repeat;
  }
  &:hover i,&:focus i{
    background: url('../../../../assets/img/icon/icon-deleteH.png') no-repeat;
  }
}
.mg-b-15{
  margin-bottom: 15px;
}
</style>
