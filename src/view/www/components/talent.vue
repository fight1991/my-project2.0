<template>
  <div class="talent">
    <div class="title">
      <p class="big">人才招聘</p>
      <p class="light">TALENT RECRUITMENT</p>
    </div>
    <div class="mainer items-info">
      <div class="item-detail">
        <div class="job-title">销售经理</div>
        <div class="self-info">
          <div class="money marg-r .text-light">月薪:<span class="pad-l">6k-10k</span></div>
          <div class="culture marg-r .text-light">学历:<span class="pad-l">不限</span></div>
          <div class="place .text-light" >地点:<span class="pad-l">成都</span></div>
        </div>
        <div class="company">公司:<span class="pad-l">朗新金关</span></div>
        <div class="duty">
          <p></p>
        </div>
        <div class="require">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jobs from '@/config/www-jobs'
export default {
  data () {
    return {
      jobs: jobs
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
 .talent {
   padding: 60px 0;
   color: #666;
 }
 .job-title {
   font-size: 20px;
   font-weight: bold;
   color: black;
   padding-bottom: 10px;
 }
 .self-info {
   display: flex;
   padding: 10px 0;
   .marg-r {
     margin-right: 60px;
   }
   .money span{
     color: #FEA12E;
   }
   .text-light {
     color: #ccc;
   }
   .company {
     font-size: 18px;
     padding-bottom: 10px;
   }
 }
 .pad-l {
     padding-left: 10px;
   }
</style>
