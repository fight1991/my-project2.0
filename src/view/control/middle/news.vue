<template>
  <div class="news">
    <div class="title">实时资讯</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="平台公告" name="first">
      <el-row>
        <el-col :span="10"><div class="content text-cut">哈哈哈</div></el-col>
        <el-col :span="6" :offset="8"><div class="date">2019.02.08 12:44</div></el-col>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label="政策法规" name="second">政策法规</el-tab-pane>
      <el-tab-pane label="行业资讯" name="third">行业资讯</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dates: '',
      activeName: 'first',
      tableData: [
        {seqNo: 1, content: '已接单,待提交', import: 22, export: 4},
        {seqNo: 2, content: '已接单,待提交', import: 0, export: 3}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.news {
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
  .content {
    font-size: 12px;
  }
  .date {
    text-align: right;
    color: @font-color-title;
    font-size: 12px;
  }
  .el-form-item__label {
    font-size: 12px;
  }
}
</style>
