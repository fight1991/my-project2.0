<template>
    <section class='sys-main'>
      <!-- 头部 -->
      <el-row class='query-header'>
      <!-- 查询条件 -->
        <el-form label-width="100px" label="right" :model="queryform"  ref="queryform">
          <el-row class='mg-b-15' :gutter="10">
          <el-col :span="6" :xs="12">
            <el-form-item label="进出口标识">
              <el-select size="mini" clearable default-first-option v-model="queryform.type">
                <el-option label="进口" value="I"></el-option>
                <el-option label="出口" value="E"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="境内收发货人">
              <el-input size="mini" clearable v-model="queryform.tradeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品名称">
              <el-input size="mini" clearable v-model="queryform.gName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品编码">
              <el-input size="mini" clearable v-model="queryform.codeTs"></el-input>
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
          <el-button size="mini" icon="fa fa-plus" class="secondButton" @click="goDetail('add','add')">&nbsp;新增</el-button>
          <el-button size="mini" icon="fa fa-trash-o" class="secondButton" @click="deleteFun">&nbsp;删除</el-button>
          <div class="airvehicle-list-drop">
          <el-popover popper-class="airvehicle-table-popper">
            <ul>
              <li v-for="(item,index) in thList" :key="index">
                <el-checkbox size="mini" v-model="item.value">{{item.text}}</el-checkbox>
              </li>
            </ul>
            <el-button size="mini" icon="fa fa-list" class="secondButton" slot="reference"></el-button>
          </el-popover>
        </div>
          <span class="span-right">已选择{{checkedNum}}项</span>
        </el-row>
        <!-- 列表 list -->
        <el-table class='sys-table-table'
          height="400" border highlight-current-row size="mini"
          :data="resultList"
          ref="multipleTable"  @selection-change="selectVal">
          <el-table-column
              type="selection"
              width="35">
          </el-table-column>
          <el-table-column label="操作" min-width="100">
             <template slot-scope="scope">
            <el-button size="mini" type="text" icon="fa fa-pencil-square-o" title="编辑" @click="goDetail('edit', scope.row)"></el-button>
            <el-button size="mini" type="text" icon="fa fa-search" title="详情" @click="goDetail('view', scope.row)"></el-button>
          </template>
          </el-table-column>
          <el-table-column label="进出口标识" min-width="100" prop="type" v-if="thList[0].value">
            <template slot-scope="scope">
              {{scope.row.type=="I"?"进口":(scope.row.type=="E"?'出口':'')}}
            </template>
          </el-table-column>
          <el-table-column label="境内收发货人" min-width="120" prop="tradeName" v-if="thList[0].value">
          </el-table-column>
          <el-table-column label="商品编码" min-width="100" prop="codeTs" v-if="thList[1].value">
          </el-table-column>
          <el-table-column label="商品名称" min-width="120" prop="gName" v-if="thList[2].value">
          </el-table-column>
          <el-table-column label="规格型号" min-width="100" prop="gModel" v-if="thList[3].value">
          </el-table-column>
          <el-table-column label="单价" min-width="80" prop="declPrice" v-if="thList[4].value">
          </el-table-column>
          <el-table-column label="币制" min-width="50" prop="tradeCurrValue" v-if="thList[5].value">
          </el-table-column>
          <el-table-column label="单价浮动区间" min-width="120" prop="bandArea" v-if="thList[6].value">
          </el-table-column>
          <el-table-column label="原产国" min-width="80" prop="originCountry" v-if="thList[7].value">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box @change="queryList()"></page-box>
            </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="addDialogVisible" width="950px" class="order-dialog" :close-on-click-modal="false">
        <div class="sys-main">
          <div class='dec-div'>
            <el-form label-width="80px" :model="priceForm" size="mini" label-position="right" class="order-label">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="进出口标识" >
                    <el-select size="mini" filterable v-model="priceForm.type"  class="select-Color" :disabled="carFlag">
                      <el-option label="进口" value="I"></el-option>
                      <el-option label="出口" value="E"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
              <el-form-item label="境内收发货人" >
                <el-input v-model="priceForm.tradeName" maxlength="18" :readOnly="carFlag"></el-input>
              </el-form-item>
            </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </section>
</template>
<script>
export default {
  name: 'priceRange',
  data () {
    return {
      resultList: [], // 表格数据
      addDialogVisible: false, // 新增组件控制
      typeValue: '',
      id: '',
      checkedNum: 0, // 被选中的数量
      queryform: {// 列表查询条件
        type: '',
        tradeName: '',
        gName: '',
        codeTs: ''
      },
      formateresult: [],
      pages: {},
      thList: [{
        value: true,
        text: '进出口标识'
      }, {
        value: true,
        text: '境内收发货人'
      }, {
        value: true,
        text: '商品编码'
      }, {
        value: true,
        text: '商品名称'
      }, {
        value: true,
        text: '规格型号'
      }, {
        value: true,
        text: '单价'
      }, {
        value: true,
        text: '币制'
      }, {
        value: true,
        text: '单价浮动区间'
      }, {
        value: true,
        text: '原产国'
      }] // 表头
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
    // 删除
    deleteFun () {

    },
    // 新增/详情
    goDetail (type, row) {
      if (type !== 'add') {
        this.id = row.innerNo
        this.status = row.status
      } else {
        this.id = 'add'
        this.status = 'add'
      }
      this.detailVisible = true
      this.typeValue = type
    },
    // 多选框
    selectVal (val) {
      this.selectData = val
    },
    // 商品信息弹窗关闭
    cancleElement () {
      this.detailVisible = false
      this.queryList()
    }
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
.span-right{
    float: right;
    margin-right: 5%;
    color: #0b93f3;
    margin-top: 6px;
  }
.airvehicle-list-drop{
  float: right;
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
}
  .secondButton {
    line-height: 20px
  }
  .order-dialog {
    .el-dialog__header {
        padding: 5px 0px 0px 10px;
    }
  }
</style>
