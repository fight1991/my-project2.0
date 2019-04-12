<template>
    <section class='sys-main'>
      <!-- 头部 -->
      <el-row class = "query-condition">
      <!-- 查询条件 -->
        <el-form label-width="100px" label-position="right" :model="queryform" ref="queryform">
          <el-row :gutter="10">
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
      <div class='query-table'>
        <!-- 按钮 -->
        <el-row class="op-btn">
          <el-button size="mini" @click="goDetail('add','add')" icon="fa fa-plus fa-lg">&nbsp;新增</el-button>
          <el-button size="mini" @click="deleteFun" icon="fa fa-trash-o fa-lg">&nbsp;删除</el-button>
          <div class="airvehicle-list-drop">
          <el-popover popper-class="airvehicle-table-popper">
            <ul>
              <li v-for="(item,index) in thList" :key="index">
                <el-checkbox size="mini" v-model="item.value">{{item.text}}</el-checkbox>
              </li>
            </ul>
            <el-button size="mini" icon="fa fa-list fa-lg" slot="reference"></el-button>
          </el-popover>
        </div>
          <span class="span-right">已选择{{checkedNum}}项</span>
        </el-row>
        <!-- 列表 list -->
        <el-table class='sys-table-table'
          height="400" border highlight-current-row size="mini"
          :data="priceList"
          @selection-change="selectVal">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="fa fa-pencil-square-o" title="编辑" @click="goDetail('edit', scope.row)"></el-button>
            <el-button size="mini" type="text" icon="fa fa-search" title="详情" @click="goDetail('view', scope.row)"></el-button>
          </template>
          </el-table-column>
          <el-table-column label="进出口标识" min-width="80" prop="type" v-if="thList[0].value">
            <template slot-scope="scope">
              {{scope.row.type=="I"?"进口":(scope.row.type=="E"?'出口':'')}}
            </template>
          </el-table-column>
          <el-table-column label="境内收发货人" min-width="150" prop="tradeName" v-if="thList[0].value">
          </el-table-column>
          <el-table-column label="商品编码" min-width="100" prop="codeTs" v-if="thList[1].value">
          </el-table-column>
          <el-table-column label="商品名称" min-width="150" prop="gName" v-if="thList[2].value">
          </el-table-column>
          <el-table-column label="规格型号" min-width="150" prop="gModel" v-if="thList[3].value">
          </el-table-column>
          <el-table-column label="单价" min-width="80" prop="declPrice" v-if="thList[4].value">
          </el-table-column>
          <el-table-column label="币制" min-width="100" prop="tradeCurrValue" v-if="thList[5].value">
          </el-table-column>
          <el-table-column label="浮动区间" min-width="80" prop="bandArea" v-if="thList[6].value">
          <template slot-scope="scope">
            <span>{{scope.row.bandArea}}%</span>
          </template>
        </el-table-column>
          <el-table-column label="原产国" min-width="80" prop="originCountryValue" v-if="thList[7].value">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box @change="queryList()"></page-box>
            </el-col>
        </el-row>
      </div>
      <!-- <el-dialog title="价格提示" :visible.sync="addDialogVisible" width="950px" class="order-dialog" :close-on-click-modal="false">
        <el-form label-width="80px" :model="priceForm" size="mini" label-position="right" class="order-label">
          <el-row>
            <el-col :span="8">
              <el-form-item label="进出口标识">
                <el-select size="mini" filterable v-model="priceForm.type"  class="select-Color" :disabled="carFlag">
                  <el-option label="进口" value="I"></el-option>
                  <el-option label="出口" value="E"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境内收发货人" prop='tradeName'>
                <el-input v-model="priceForm.tradeName"
                ref="tradeName" dataRef ='tradeName'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="originCountryShow">
              <el-form-item label="原产国(地区)" prop='originCountry'>
                <el-select placeholder="" v-model="priceForm.originCountry"
                  filterable clearable remote default-first-option
                  ref="originCountry" dataRef ='originCountry'
                  enter = 'no' @keyup.enter.native="savePriceTips"
                  @focus="tipsFillMessage('countryParams','SAAS_COUNTRY')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in countryParams"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="商品名称" prop='gName'>
                <el-input v-model="priceForm.gName" ref="gName" dataRef ='gName'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品编码">
                <el-input v-model="priceForm.codeTs" ref="codeTs" dataRef ='codeTs' autofocus="true" @keyup.enter.native="queryHistoryGoods"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="规格型号" prop="gModel">
                  <el-input v-model="priceForm.gModel"
                    ref="gModel" dataRef ='gModel'></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="单价" prop='declPrice'>
                <el-input v-model="priceForm.declPrice" ref="declPrice" dataRef ='declPrice'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="币制" prop='tradeCurr'>
                <el-select placeholder="" v-model="priceForm.tradeCurr"
                  filterable clearable remote default-first-option
                  ref="tradeCurr" dataRef ='tradeCurr'
                  @focus="tipsFillMessage('curryParams','SAAS_CURR')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in curryParams"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格浮动区间(%)" prop ='bandArea' required>
                <el-input  v-model="priceForm.bandArea"
                ref="bandArea" dataRef ='bandArea'
                placeholder="填写1~99"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="layer-btn-primary" @click="savePrice" >确定</el-button>
          <el-button class="layer-btn" @click="canclePrice" >取消</el-button>
        </span>
      </el-dialog> -->
    </section>
</template>
<script>
export default {
  name: 'priceRange',
  data () {
    return {
      priceList: [], // 表格数据
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
.query-main {
    // background-color: #e5f2ff;
    padding: 20px;
    font-size:12px;
    font-family: Arial,Microsoft YaHei,SimSun;
    height: 100%;
    overflow: auto;
  }
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
