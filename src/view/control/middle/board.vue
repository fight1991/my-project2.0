<template>
  <div class="board">
    <div class="title">跟踪看板</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申报跟踪" name="first">
      <el-form>
        <el-form-item label="按单日期查询">
          <el-date-picker
            v-model="dates"
            size="mini"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>

        </el-form-item>
      </el-form>
      </el-tab-pane>
      <el-tab-pane label="物流跟踪" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="费用跟踪" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
      }
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
    top: 10;
    line-height: 40px;
    color: @font-color-main;
    font-weight: bold;
  }
}
</style>
