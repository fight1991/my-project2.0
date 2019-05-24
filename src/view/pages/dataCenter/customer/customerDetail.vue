<template>
    <section class='query-main'>
        <div class = "query-condition">
        <el-form :label-width="labelFormWidth.seven" size="mini" >
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="客户代码">
                {{customerdetail.customCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称"  >
                {{customerdetail.customName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="社会信用代码">
                {{customerdetail.sccCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海关编码">
                {{customerdetail.tradeCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检验检疫编码">
                {{customerdetail.ciqCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="联系人">
                {{customerdetail.contactUser}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式"  >
                {{customerdetail.contactWay}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司地址">
                {{customerdetail.address}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="所属国">
                {{customerdetail.customCountry}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码"  >
                {{customerdetail.postCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="E-MAIL">
                {{customerdetail.email}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item label="备注">
                {{customerdetail.remark}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin:20px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="代理企业" name="first">
            <el-row>
                <el-button type="primary" style="margin-bottom:5px;" @click="newCorpView" size="mini">新增企业</el-button>
            </el-row>
                <el-table class='sys-table-table' border highlight-current-row :header-cell-style="{'text-align':'center'}" size="mini" :data="queryresult" ref="reference" @select="selectionChange" @row-click='rowselect'>
                <el-table-column label="序号" min-width="130" >
                <template slot-scope="scope">
                    {{scope.$index}}
                </template>
                </el-table-column>
                <el-table-column label="企业名称" min-width="100">
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
                <el-table-column label="操作" min-width="40">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoDetail(scope.row,'view')" title="查看"><i class="fa fa-file-text-o fa-lg"></i></el-button>
                </template>
                </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="相关联系人" name="second">
              <el-table class='sys-table-table' border highlight-current-row :header-cell-style="{'text-align':'center'}" size="mini" :data="queryresult" ref="reference" @select="selectionChange" @row-click='rowselect'>
                <el-table-column label="序号" min-width="130" >
                <template slot-scope="scope">
                    {{scope.$index}}
                </template>
                </el-table-column>
                <el-table-column label="姓名" min-width="100">
                <template slot-scope="scope">
                    <div class="text-over-hid" :title="scope.row.customName">
                    {{scope.row.customName || '-'}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column label="手机号" min-width="100">
                <template slot-scope="scope">
                    <div class="text-over-hid" :title="scope.row.sccCode">
                    {{scope.row.sccCode || '-'}}
                    </div>
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" min-width="130">
                <template slot-scope="scope">
                    <div class="text-over-hid" :title="scope.row.tradeCode">
                    {{scope.row.tradeCode || '-'}}
                    </div>
                </template></el-table-column>
                <el-table-column label="添加时间" min-width="100">
                <template slot-scope="scope">
                    <div class="text-over-hid" :title="scope.row.ciqCode">
                    {{scope.row.ciqCode || '-'}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column label="操作" min-width="40">
                    <template >
                        <el-button type="text"  title="详情"><i class="fa fa-file-text-o fa-lg"></i></el-button>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="单量趋势" name="third">

            </el-tab-pane>
            <el-tab-pane label="商品金额" name="fourth"></el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog title="新增企业"
      :visible.sync="recordview">
        <el-form :label-width="labelFormWidth.seven" size="mini" >
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="企业名称">
                {{customerdetail.customCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="社会信用代码">
                {{customerdetail.sccCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海关编码">
                {{customerdetail.tradeCode}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检验检疫编码">
                {{customerdetail.ciqCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center">
          <el-button type="primary" size="small" @click="savenew">确定</el-button>
          <el-button  size="small" @click="newdiaview = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    </section>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      customerdetail: {},
      activeName: 'first',
      newCorpView: false
    }
  },
  created () {
    this.getdetail()
  },
  methods: {
    getdetail () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/custom-manage/getCustom',
        data: {
          customId: this.$route.query.customId
        },
        router: this.$router,
        success: (res) => {
          this.customerdetail = res.result
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.index{
  width: 100%;
  height:100%;
}
.query-condition {
    margin:20px 20px;
    background-color: #fff;
    padding: 20px;
  }
</style>
