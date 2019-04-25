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
          <el-button type="primary" size="mini" @click="warningSet" class="sys-fr" style='float: right;margin-left:5px;'>预警设置</el-button>
          <el-button type="primary" size="mini" @click="add('detailAdd',corpSccCode)" class="sys-fr">新建</el-button>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
        <el-row class = "query-table">
          <el-row>
            <el-col :span="12">
              委托企业:{{corpName}}
            </el-col>
            <el-col :span="12">
              证书数:{{count}}
            </el-col>
          </el-row>
          <el-row>
          <!-- 查询条件 -->
            <el-form label-width="0px" :model="certificateDetailForm" size="mini" label-position="right">
              <el-row :gutter="20" style="padding-top:30px">
                <el-col :span="6" :xs="12">
                  <el-form-item>
                    <el-input size="mini" clearable v-model="certificateDetailForm.input" placeholder="证书名称、证书编号"></el-input>
                  </el-form-item>
                  </el-col>
                  <el-col :span="8" :xs="12">
                    <el-form-item label-width="100px" label="到期日期">
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
            </el-form>
            <!-- 查询条件 end-->
          </el-row>
        </el-row>
    </el-row>
    <!-- 头部 end-->
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 列表 list -->
      <el-table class='sys-table-table'
        border highlight-current-row size="mini"
        :data="certificateList">
        <el-table-column label="证书名称" min-width="200">
          <template slot-scope="scope">
            {{scope.row.certificateName || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="证书编号" min-width="200">
          <template slot-scope="scope">
            {{scope.row.certificateNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="到期日期" min-width="200">
          <template slot-scope="scope">
            {{scope.row.expiryDate || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="到期预警日期" min-width="200">
          <template slot-scope="scope">
            {{scope.row.warningTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetailChild('edit',scope.row.certificatePid)" title="编辑"><i class="fa fa-edit f-18"></i></el-button>
            <el-button type="text" @click="deleteBtn(scope.row.certificatePid)" title="删除"><i class="fa fa-trash-o f-18"></i></el-button>
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
    <el-dialog title="预警设置" :visible.sync="setDialogVisible" width="950px">
        <el-form label-width="150px" :model="setDialogForm" ref="setDialogForm" :rules="rule" size="mini" label-position="right" class="order-label">
          <el-row>
            <el-col :span="18" :offset="4">
              <el-form-item label="预警时间设置" prop='type'>
                <el-row :gutter="10">
                  <el-radio-group size='small'  v-model="setDialogForm.dateConfig" @change="datesChange">
                    <el-row style="margin-bottom:20px">
                      <el-radio label="30">到期前30天</el-radio>
                      <el-radio label="15">到期前15天</el-radio>
                      <el-radio label="5">到期前5天</el-radio>
                    </el-row>
                    <el-row >
                      <el-radio @click="getInputDays" label="自定义">自定义到期时间</el-radio>
                    </el-row>
                  </el-radio-group>
                </el-row>
              </el-form-item>
              <el-form-item label="" prop="inputDays">
                <span style="padding-left:20px">到期时间前<el-input style="width:50px;margin:0 10px" size="mini" clearable v-model="setDialogForm.inputDays" :disabled="isDisabled"></el-input>天</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer">
          <el-button class="layer-btn-primary" @click="saveDialogForm">确定</el-button>
          <el-button class="layer-btn" @click="cancleDialogForm">取消</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
import validator from '../../../../../common/validator'
export default {
  data () {
    return {
      rule: {
        inputDays: [{ required: true, validator: validator.Zz0, message: '', trigger: 'blur' }]
      },
      setDialogVisible: false, // 预警弹框
      setDialogForm: {
        dateConfig: '',
        inputDays: ''
      },
      isDisabled: true,
      corpName: '',
      corpSccCode: [this.$route.params.corpSccCode],
      count: '',
      certificateDetailForm: {
        input: '',
        startTime: '',
        endTime: ''
      },
      dates: ['', ''],
      certificateList: [] // 表格数据
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.search()
  },
  methods: {
    // 预警设置
    warningSet () {
      this.setDialogVisible = true
    },
    // 选中自定义
    getInputDays () {
      this.isDisabled = false
    },
    saveDialogForm () {},
    cancleDialogForm () {
      this.setDialogVisible = false
    },
    // 查询
    search () {
      this.queryList(this.$store.state.pagination)
    },
    // 证书列表
    queryList (pagination) {
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/certificate/queryList',
        data: {
          ...this.certificateDetailForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.certificateList = res.result
          this.paginationInit = res.page
        }
      })
    },
    // 重置
    reset () {
      this.certificateDetailForm = {
        input: '',
        startTime: '',
        endTime: ''
      }
      this.dates = ['', '']
      this.search()
    },
    // 导入
    upload () {
    },
    // 编辑
    toDetailChild (type, rowId) {
      this.$router.push({
        name: 'addCertificate',
        params: {
          'type': type,
          'rowId': rowId
        }
      })
    },
    // 删除
    deleteBtn (val) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/certificate/delete',
          data: [{pid: val}],
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
</style>
