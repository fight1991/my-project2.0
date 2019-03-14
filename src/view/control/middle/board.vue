<template>
  <div class="board">
    <div class="title">跟踪看板</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申报跟踪" name="first">
      <el-form class="dateSearch">
        <el-form-item label="按单日期查询">
          <el-date-picker
            v-model="dates"
            size="mini"
            type="daterange"
            @change="getDecList"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-row>
        <div class="ccba-table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="seqNo"
              label="序号"
              width="30"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="内容"
              >
            </el-table-column>
            <el-table-column
              prop="iCount"
              label="进口报关单"
              width="110"
              align="right">
            </el-table-column>
            <el-table-column
              prop="eCount"
              width="110"
              label="出口报关单"
              align="right">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="物流跟踪" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="费用跟踪" name="third">角色管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import util from '../../../common/util'
export default {
  data () {
    return {
      dates: '',
      activeName: 'first',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: []
    }
  },
  created () {
    this.getWeek()
    this.getDecList()
  },
  methods: {
    getDecList () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-report/decReport/decListHomePage',
        data: {
          'iEFlag': 'All',
          'endDate': this.dates[1],
          'startDate': this.dates[0]
        },
        isPageList: true,
        router: this.$router,
        success: (res) => {
          res.result.decListHomePageVOs.forEach((v, i) => {
            v.seqNo = i + 1
          })
          // this.tableData = res.result.decListHomePageVOs
        }
      })
    },
    getWeek () { // 获取当前一周
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.dates = [util.dateFormat(start, 'yyyy-MM-dd'), util.dateFormat(end, 'yyyy-MM-dd')]
    }
  }
}
</script>

<style lang="less" scoped>
.board {
  position: relative;
  padding: 10px 20px;
  .title {
    position:absolute;
    left: 20px;
    top: 5px;
    line-height: 40px;
    color: @font-color-main;
    font-weight: bold;
  }

    .el-form-item__label {
      font-size: 12px;
  }
}
</style>
