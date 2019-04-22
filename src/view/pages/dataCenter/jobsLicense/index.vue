<template>
  <section class='sys-main'>
     <!-- 头部 -->
      <el-row class = "query-condition">
        <el-form label-width="0px" :model="queryForm" size="mini" label-position="right">
      <!-- 查询条件 -->
          <el-row :gutter="20" style="padding-top:10px">
            <el-col :span="6" :xs="12">
              <el-form-item>
              <el-input size="mini" clearable v-model="queryForm.ID" placeholder="委托企业"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8" :xs="12">
            <el-form-item label-width="100px" label="最近上传日期">
              <el-date-picker size="mini"
                v-model="dates"
                @change="uploadTime"
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
        <el-table class='sys-table-table'
          border highlight-current-row size="mini"
          :data="resultList">
          <el-table-column label="委托企业" min-width="100" prop="ID"></el-table-column>
          <el-table-column label="许可证数" min-width="100" prop="ID">
            <template slot-scope="scope">
              {{scope.row.ID+''}}
            </template>
          </el-table-column>
          <el-table-column label="最近上传时间" min-width="100">
            <template slot-scope="scope">
              {{scope.row.lastFireTime | date()}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="toChild(scope.row.roleId)" title="查看"><i class="fa fa-file-text-o f-18"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      queryForm: {
        ID: ''
      },
      dates: ['', ''],
      resultList: [
        {ID: '222222222222'},
        {ID: '111111'},
        {ID: '33333333'}
      ]
    }
  },
  created () {},
  methods: {
    uploadTime () {

    },
    // 新建
    add () {},
    // 查询
    search () {},
    // 重置
    reset () {},
    // 跳转到详情页面
    toChild (id) {
      this.$router.push({
        name: '业务单证详情',
        params: {
          id: id
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
  .op-btn {
    margin-bottom: 14px;
  }
  .query-btn {
    text-align: center;
  }
  .icon-btn {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
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
