<template>
  <section class='query-main'>
    <!-- 查询条件 -->
    <div class = "query-condition">
      <!-- -->
      <el-form :label-width="labelFormWidth.five" size="mini">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="客户代码" class="select-Color">
              <el-input v-model="queryForm.customCode" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称" >
              <el-input v-model="queryForm.customName" maxlength="70"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户状态">
              <el-select size="mini" filterable v-model="queryForm.auditStatus" clearable allow-create default-first-option remote :disabled="queryForm.status==='O'" >
                <el-option
                  v-for="item in cusstatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="4" :offset="10" class='query-btn'>
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="queryList">查询</el-button>
            <el-button size="mini" style="padding: 8px 20px;" @click="resetFun">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 按钮 -->
      <el-row class="op-btn">
        <el-button size="mini" @click="newdiaview = true" ><span class="icon-btn icon-btn-look" ></span>新增</el-button>
        <el-button size="mini" @click="gotodetail('edit')" ><span class="icon-btn icon-btn-look"></span>删除</el-button>
        <el-dropdown @command='downloadFun'>
            <el-button size="mini">
              导入<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" size='mini'>
              <el-dropdown-item command="nomal" >
                <span >选择导入文件</span>
              </el-dropdown-item>
              <el-dropdown-item command="download" >
                <span>导入模板下载</span>
              </el-dropdown-item>
              <el-dropdown-item command="record" >
                <span>导入记录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <el-button size="mini"  @click="lookCallBack()" ><span class="icon-btn icon-btn-look"></span>导出</el-button>
      </el-row>
      <!-- 列表table开始 -->
      <el-table class='sys-table-table' border highlight-current-row :header-cell-style="{'text-align':'center'}" size="mini" :data="queryresult" ref="reference" @select="selectionChange" @row-click='rowselect'>
        <el-table-column  type="selection" min-width="50">
        </el-table-column>
        <el-table-column label="客户代码" min-width="130" >
          <template slot-scope="scope">
            {{scope.row.customCode || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="客户名称" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.customName">
            {{scope.row.customName || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="社会信用代码" min-width="100">
           <template slot-scope="scope">
             <div class="text-over-hid" :title="scope.row.sccCode">
              {{scope.row.sccCode || '-'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="海关编码" min-width="130">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.tradeCode">
            {{scope.row.tradeCode || '-'}}
            </div>
          </template></el-table-column>
        <el-table-column label="检验检疫编码" min-width="100">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.ciqCode">
            {{scope.row.ciqCode || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="110">
          <template slot-scope="scope">
            <div class="text-over-hid" :title="scope.row.auditStatus">
            {{scope.row.auditStatus || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="40">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoDetail(scope.row,'view')" title="查看"><i class="fa fa-file-text-o fa-lg"></i></el-button>
            <el-button type="text" @click="gotoDetail(scope.row,'edit')" title="编辑"><i class="el-icon-edit"></i></el-button>
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
      :title="ifedit?'修改客户信息':'新增客户信息'"
      :visible.sync="newdiaview"
      :close-on-click-modal='false'
      width="50%"
      >
      <div  class="dec-div">
      <el-form size="mini" :label-width="labelFormWidth.seven" :model="newcustomer" ref='newcustinput' :rules='newRule'>
        <el-row >
          <el-col :span="8">
            <el-form-item label="客户代码"  prop='customCode'>
              <el-input v-model="newcustomer.customCode" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="客户名称" prop='customName'>
              <el-input v-model="newcustomer.customName" maxlength="70" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="社会信用代码" prop='sccCode'>
              <el-input v-model="newcustomer.sccCode" :disabled="ifedit" maxlength="18" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海关编码">
              <el-input v-model="newcustomer.selTradeCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检验检疫编码">
              <el-input v-model="newcustomer.selTradeCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="所属国" prop='customCountry'>
              <el-select v-model="newcustomer.customCountry" filterable style="width:100%">
                <el-option
                  v-for="item in countrys"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="newcustomer.contactUser" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input v-model="newcustomer.contactWay" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-form-item label="公司地址">
              <el-input v-model="newcustomer.address" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码">
              <el-input v-model="newcustomer.postCode" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="E-MAIL">
              <el-input v-model="newcustomer.email" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="备注" maxlength="400">
              <el-input v-model="newcustomer.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  v-if="ifedit">
          <el-col :span="24">
            <el-form-item label="审核意见"  maxlength="400">
              <el-input v-model="newcustomer.auditRemark" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center">
          <el-button type="primary" size="small" @click="savenew">确定</el-button>
          <el-button  size="small" @click="newdiaview = false">取消</el-button>
        </div>
      </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="导入记录"
      :visible.sync="recordview"
      :close-on-click-modal='false'
      width="50%"
      >
      <div  class="dec-div">
      <el-form size="mini" :label-width="labelFormWidth.seven" :model="inputrecord" ref='newcustinput' :rules='newRule'>
        <el-row >
          <el-col :span="8">
            <el-form-item label="导入时间" maxlength="400">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="导入成功条数" maxlength="400">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="导入失败条数" maxlength="400">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="导入失败详情" maxlength="400">
                <el-input type="textarea" v-model="inputrecord.remark" :rows="4" :disabled="true"></el-input>
            </el-form-item>
        </el-row>

        <el-row >
        </el-row>
      </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../../../common/util'
export default {
  data () {
    return {
      queryForm: {
        'auditStatus': '',
        'customCode': '',
        'customName': ''
      },
      ifedit: false, // 是否为编辑
      countrys: [],
      recordview: false,
      nowselect: {}, // 当前选中项
      newRule: {
        customCode: [{required: true, message: '请输入客户代码', trigger: 'blur'}],
        customName: [{required: true, message: '请输入客户名称', trigger: 'blur'}],
        sccCode: [{required: true, message: '请输入社会信用代码', trigger: 'blur'}],
        customCountry: [{required: true, message: '请输入所属国', trigger: 'blur'}]
      },
      queryresult: [{customId: '001'}],
      selecttion: [],
      inputrecord: {}, // 导入记录
      newcustomer: {
        'address': '',
        'contactUser': '',
        'contactWay': '',
        'customCode': '',
        'customCorpId': '',
        'customCountry': '',
        'customId': '',
        'customName': '',
        'email': '',
        'postCode': '',
        'remark': '',
        'sccCode': ''
      },
      newdiaview: false,
      // 待审核、审核通过、审核驳回
      cusstatusList: [{
        code: 'COMPLETE',
        name: '审核通过'
      }, {
        code: 'WAITING',
        name: '待审核'
      }, {
        code: 'REFUCED',
        name: '审核驳回'
      }]
    }
  },
  created () {
    this.getcountry()
  },
  mounted () {
  },
  methods: {
    queryList () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/custom-manage/getCustomList',
        data: this.queryForm,
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.corpList = res.result
        }
      })
    },
    getcountry () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/dictionary/cascadeGetArea',
        data: {codeId: '0',
          type: '0'},
        router: this.$router,
        success: (res) => {
          this.countrys = res.result
        }
      })
    },
    // 查看或编辑
    gotoDetail (row, type) {
      if (type === 'edit') {
        this.ifedit = true
        this.newdiaview = true
      } else {
        this.$router.push({
          path: '/dataCenter/customer/customerDetail',
          query: {customId: row.customId}
        })
      }
    },
    selectionChange (selection, row) {
      let selectList = []
      selectList = selection
      if (selection.length > 1) {
        util.removeByValue(selectList, row)
        for (let i in selectList) {
          this.$refs.reference.toggleRowSelection(selectList[i], false)
        }
        this.$refs.reference.toggleRowSelection(row)
      }
      if (selection.length !== 0) {
        this.nowselect = row
      }
    },
    rowselect (row) {
      this.nowselect = row
      this.$refs.reference.clearSelection()
      this.$refs.reference.toggleRowSelection(row, true)
    },
    getEtpsnos () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-ems/nemsinvt/getEtpsnos',
        data: this.newcustomer,
        router: this.$router,
        success: (res) => {
          this.corpList = res.result
        }
      })
    },
    downloadFun (type) {
      if (type === 'record') {
        this.recordview = true
      }
    },
    resetFun () {
      this.queryForm = {}
      this.queryresult = []
    },
    // 保存新增客户
    savenew () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/custom-manage/saveCustom',
        data: this.newcustomer,
        router: this.$router,
        success: (res) => {
          this.newdiaview = false
          this.$message({
            message: ' 保存成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
