<template>
  <section class='query-main jiner-query'>
    <!-- 查询条件 -->
    <div class = "query-condition">
      <!-- -->
      <el-form :label-width="labelFormWidth.six" size="mini" :model="queryForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="客户代码" class="select-Color">
              <el-input v-model="queryForm.bwsNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" :class="{ 'require-color': controller.requiredColor && queryForm.status!=='O', 'more-txt-lh':true }">
              <el-input v-model="queryForm.bwsNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户状态">
              <el-select size="mini" filterable v-model="queryForm.selTradeCode" clearable allow-create default-first-option remote :disabled="queryForm.status==='O'" >
                <el-option
                  v-for="item in corpList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="24" class='query-btn'>
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="queryList">查询</el-button>
            <el-button size="mini" style="padding: 8px 20px;" @click="resetFun">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table dec-query-table'>
      <!-- 按钮 -->
      <el-row class="op-btn">
        <el-button size="mini" @click="gotodetail('view')" :disabled="!selecttion.status" ><span class="icon-btn icon-btn-look" ></span>新增</el-button>
        <el-button size="mini" @click="gotodetail('edit')" :disabled="['0','9','6','e','C','D'].indexOf(selecttion.status)<0" ><span class="icon-btn icon-btn-edit"></span>删除</el-button>
        <el-button size="mini" @click="gotodetail('change')" :disabled="selecttion.status !== 'B' "><span class="icon-btn icon-btn-copy" ></span>导入</el-button>
        <el-button size="mini" :disabled="['5','6','B','C','T','E','D','P'].indexOf(selecttion.status)<0" @click="lookCallBack()" ><span class="icon-btn icon-btn-look"></span>导出</el-button>
      </el-row>
      <!-- 列表table开始 -->
      <el-table class='sys-table-table dec-table' border highlight-current-row size="mini" :data="result" ref="reference" @select="selectionChange" @row-click='rowselect'>
        <el-table-column  type="selection" min-width="50"></el-table-column>
        <el-table-column label="客户代码" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.seqNo">
            {{scope.row.seqNo || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.bwsNo">
            {{scope.row.bwsNo || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="社会信用代码" min-width="100">
           <template slot-scope="scope">
             <div class="text-over-hid" :title="scope.row.statusValue">
              {{scope.row.statusValue || '-'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="海关编码" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.etpsPreentNo">
            {{scope.row.etpsPreentNo || '-'}}
            </div>
          </template></el-table-column>
        <el-table-column label="检验检疫编码" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.bizopEtpsno">
            {{scope.row.bizopEtpsno || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="110">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.bizopEtpsNm">
            {{scope.row.bizopEtpsNm || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.dclTime">
            {{scope.row.dclTime || '-'}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box @change="queryList()"></page-box>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="回执"
      :visible.sync="callBackView"
      width="50%"
      >
      <div  class="dec-div">
      <el-form size="mini" :label-width="labelFormWidth.six" :model="callBackhead">
      <el-row>
        <el-col :span="8">
          <el-form-item label="预录入统一编号"  class="more-txt-lh">
            <el-input :readonly='true' v-model="callBackhead.seqNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="业务编号">
              <el-input :readonly="true" v-model="callBackhead.businessId"></el-input>
            </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="数据状态">
            <el-input v-model="callBackhead.manageResultValue" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="审批日期">
            <el-input v-model="callBackhead.retTime" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="callBackhead.rmk" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      </div>
      <span class="dec-table-name"> 回执明细</span>
      <el-row>
         <el-table class='sys-table-table dec-table' border highlight-current-row size="mini" :data="callBackresult">
        <el-table-column label="序号" min-width="80">
          <template slot-scope="scope">
             {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column label="加工贸易账册编号" min-width="240">
          <template slot-scope="scope">
            {{scope.row.note || '-'}}
          </template>
        </el-table-column>
      </el-table>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getEtpsnos () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-ems/nemsinvt/getEtpsnos',
        data: {type: 'bws'},
        router: this.$router,
        success: (res) => {
          this.corpList = res.result
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
