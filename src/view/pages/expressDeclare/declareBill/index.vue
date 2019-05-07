<template>
  <section class='sys-main'>
    <!-- 查询条件 -->
    <div class="query-header">
      <el-form :model="queryForm" size="mini" label-width="110px">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="进出口标志">
              <el-select v-model="queryForm.iEFlag" style="width:100%;">
                <el-option v-for="item in iEFlagList" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总运单号">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关区代码">
              <el-select v-model="queryForm.customCode"
                default-first-option remote
                filterable
                :remote-method="checkParamsList"
                @focus="tipsFillMessage('cusCustomsCodeList','SAAS_CUSTOMS_REL')"
                clearable style="width:100%" >
                <el-option
                  v-for="item in cusCustomsCodeList"
                  :key="item.codeField"
                  :label="item.codeField + '-' + item.nameField"
                  :value="item.codeField">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="分运单号">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报关单号">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申报时间">
              <el-date-picker v-model="dates" style="width:100%;"
                type="daterange"
                :editable='false'
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="收发货人编码">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态信息">
              <el-input v-model="queryForm.keywords" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收发货统一社会信用代码" class="more-txt-lh">
              <el-input v-model="queryForm.keywords" clearable></el-input>
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
        <el-dropdown trigger="click">
          <el-button size="mini" class="file-inputx list-btns list-icon-import"><i></i>导入</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1"
                :before-upload="beforeUpload"
                :show-file-list="false">
                <span>导入模板</span>
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item><div @click.stop="download">模板下载</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" class="list-btns list-icon-declare"><i></i>申报</el-button>
        <el-button size="mini" class="list-btns list-icon-delete"><i></i>删除</el-button>
      </el-row>
      <el-row>
        <el-table class='sys-table-table express-table' :data="shipList" border highlight-current-row size="mini">
          <el-table-column  type="selection" min-width="50"></el-table-column>
          <el-table-column label="序号" width="100">
            <!-- <template slot-scope="scope">
              <div class='sys-td-c'>{{(pages.pageIndex-1)*pages.pageSize+(scope.$index+1)}}</div>
            </template> -->
          </el-table-column>
          <el-table-column label="海关编号" min-width="120">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预录入编号" min-width="130">
            <template slot-scope="scope">
              <div class='sys-td-l'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="收发货人" min-width="150">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="总运单号" min-width="130">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="分运单号" min-width="130">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="单据状态" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="追加单据状态" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="回执状态" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="追加回执状态" min-width="110">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <div class='sys-td-c'>
                <el-button size="mini" class="table-icon list-icon-look" type="text" title="详情" @click="toDetail(scope.row)"><i></i></el-button>
                <el-button size="mini" class="table-icon list-icon-delete" type="text" title="删除"><i></i></el-button>
              </div>
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
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  data () {
    return {
      dates: ['', ''],
      queryForm: {

      }, // 查询传参
      shipList: [{}], // 表格数据
      pages: {}, // 存放分页
      fileList: [], // 文件
      iEFlagList: [{
        value: 'I',
        label: '进口'
      }, {
        value: 'E',
        label: '出口'
      }], // 进出口标志
      tableNameList: {
        tableNames: [
          'SAAS_CUSTOMS_REL' // 海关关区
        ]
      }, // 字典标明
      selectObj: {
        obj: '',
        params: ''
      },
      cusCustomsCodeList: []
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.getCommonParam()
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
        name: 'declareBillDetail',
        params: {
          id: '1'
        }
      })
    },
    // 判断缓存中是否有数据
    getCommonParam () {
      let map = {tableNames: []}
      map.tableNames = commonParam.isRequire(this.tableNameList.tableNames)
      if (map.tableNames.length > 0) {
        this.getCommonParams(map)
      } else {
        this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
      }
    },
    // 获取公共字典list
    getCommonParams (datas) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: datas,
        router: this.$router,
        success: (res) => {
          commonParam.saveParams(res.result)
          this.cusCustomsCodeList = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 30)
        }
      })
    },
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    checkParamsList (query) {
      if (query !== '') {
        let keyValue = query.toString().trim()
        let list = JSON.parse(window.localStorage.getItem(this.selectObj.params))
        let filterList = []
        if (util.isEmpty(keyValue)) {
          this[this.selectObj.obj] = list.slice(0, 30)
        } else {
          filterList = list.filter(item => {
            let str = item.codeField + '-' + item.nameField
            return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
          })
          this[this.selectObj.obj] = filterList.slice(0, 30)
        }
      } else {
        if (!util.isEmpty(JSON.parse(window.localStorage.getItem(this.selectObj.params)))) {
          this[this.selectObj.obj] = JSON.parse(window.localStorage.getItem(this.selectObj.params)).slice(0, 30)
        }
      }
    },
    // 下载模板
    download () {

    }
  }
}
</script>
<style lang="less" scoped>
.express-txt-c{
  text-align: center;
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
.mg-b-15{
  margin-bottom: 15px;
}
</style>
