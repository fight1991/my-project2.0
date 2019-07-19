<template>
  <section class='sys-main'>
    <!-- 报关单详情区域 -->
    <div class="decDetail area">
      <div class="title">报关单/订单详情</div>
      <div class="content">
        <el-row class="line">
          <el-col :span="6">
            <div class="one-row">
              <div class="left">接单编号&nbsp;:</div>
              <div class="right">201965952522256</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="one-row">
              <div class="left">报关单号&nbsp;:</div>
              <div class="right">201965952522256</div>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>
    <!-- 应收费用区域 -->
    <div class="receive area">
      <div class="title">应收费用</div>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-add"><i></i>新增</el-button>
      </el-row>
    </div>
    <!-- 应付非同区域 -->
    <div class="pay area">
      <div class="title">应付费用</div>
    </div>
    <!-- 汇总区域 -->
    <div class="all area">
      <div class="title">汇总</div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
  .area {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 18px;
  }
  .title {
    padding-bottom: 18px;
  }
  .line {
    padding-bottom: 18px;
  }
  .one-row {
    width: 100%;
    display: flex;
    align-items: flex-start;
    color: #4c4c4c;
    .left {
      width: 85px;
    }
    .right {
      flex: 1;
    }
  }
</style>
