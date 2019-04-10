<template>
    <section class='sys-main'>
      <!-- 头部 -->
      <el-row class='query-header'>
      <!-- 查询条件 -->
        <el-form label-width="100px" label="right" :model="queryform"  ref="queryform">
          <el-row class='mg-b-15' :gutter="10">
          <el-col :span="6" :xs="12">
            <el-form-item label="进出口标识">
              <el-select size="mini" clearable  placeholder="角色" default-first-option v-model="queryform.Id">
                <el-option label="全部" value="0"></el-option>
                <el-option label="进口" value="1"></el-option>
                <el-option label="出口" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="境内收发货人">
              <el-input size="mini" clearable v-model="queryform.Id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品名称">
              <el-input size="mini" clearable v-model="queryform.Id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品编码">
              <el-input size="mini" clearable v-model="queryform.Id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" class="ccba-btn">
          <el-col :span="24">
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="search">查询</el-button>
            <el-button size="mini" style="padding: 8px 20px;" @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
        </el-form>
      </el-row>
      <!-- 头部 end-->
      <!-- 主显示框 -->
      <div class='content query-body'>
        <!-- 按钮 -->
        <el-row class="op-btn">
          <el-button size="mini" icon="fa fa-plus" class="secondButton">&nbsp;新增</el-button>
          <el-button size="mini" icon="fa fa-trash-o" class="secondButton">&nbsp;删除</el-button>
        </el-row>
        <!-- 列表 list -->
        <el-table class='sys-table-table'
          height="400" border highlight-current-row size="mini"
          :data="formateresult"
          ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="35">
          </el-table-column>
          <el-table-column label="操作" min-width="60" prop="" >
          </el-table-column>
          <el-table-column label="进出口标识" min-width="100" prop="status">
            <template slot-scope="scope">
              {{scope.row.status=="I"?"进口":(scope.row.status=="E"?'出口':'')}}
            </template>
          </el-table-column>
          <el-table-column label="境内收发货人" min-width="120" prop="">
          </el-table-column>
          <el-table-column label="商品编码" min-width="100" prop="">
          </el-table-column>
          <el-table-column label="商品名称" min-width="120" prop="">
          </el-table-column>
          <el-table-column label="规格型号" min-width="100" prop="">
          </el-table-column>
          <el-table-column label="单价" min-width="80" prop="">
          </el-table-column>
          <el-table-column label="币制" min-width="50" prop="">
          </el-table-column>
          <el-table-column label="单价浮动区间" min-width="120" prop="">
          </el-table-column>
          <el-table-column label="原产国" min-width="80" prop="">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box @change="queryList()"></page-box>
            </el-col>
        </el-row>
      </div>
    </section>

</template>
<script>
export default {
  name: 'priceRange',
  data () {
    return {
      queryform: {// 列表查询条件
        Id: '' // 角色
      },
      formateresult: [],
      pages: {}
    }
  },
  props: {
    corpId: {
      type: String,
      default: ''
    }
  },
  watch: {},
  created () {

  },
  methods: {
    // 查询
    search () {},
    // 重置
    reset () {},
    // 列表
    queryList () {},
    // 新增
    add () {

    },
    // 删除
    del () {

    },
    // 选择框
    handleSelectionChange () {}
  }
}
</script>
<style scoped lang="less">
.el-table th {
    background-color: #e9eff8;
    padding: 6px 0;
    text-align: center;
}
.ccba-btn {
  margin-bottom: 22px;
  text-align: center
}
.op-btn {
  margin-bottom: 14px;
}
</style>
