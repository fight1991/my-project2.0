<template>
  <div class="corpDisplay">
    <div class="title">企业风采</div>
    <div class="content-area">
      <div class="banner fl">
        <el-carousel height="150px">
          <el-carousel-item  v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
      </el-carousel>
      </div>
      <div class="btns fr"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
.corpDisplay {
  padding: 10px 20px
}
.title {
  line-height: 30px;
  color: @font-color-main;
  font-weight: bold;
}
.banner {
  width: 250px;
  margin-top: 15px;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }
</style>
