<template>
  <div class="talent">
    <div class="title">
      <p class="big">人才招聘</p>
      <p class="light">TALENT RECRUITMENT</p>
    </div>
    <div class="mainer items-info">
      <div class="item-detail" v-for="item in jobs" :key="item.pid">
        <div class="job-title">{{item.jobTitle}}</div>
        <div class="self-info">
          <div class="money marg-r"><span class="text-light">月薪:</span><span class="pad-l">{{item.wage}}</span></div>
          <div class="culture marg-r"><span class="text-light">学历:</span><span class="pad-l">{{item.culture}}</span></div>
          <div class="place"><span class="text-light">地点:</span><span class="pad-l">{{item.place}}</span></div>
        </div>
        <div class="company"><span class="text-light">公司:</span><span class="pad-l">{{item.company}}</span></div>
        <div class="duty" v-for="item1 in item.detail" :key="item1.id">
          <div class="duty-title">{{item1.title}}</div>
          <p v-for="(item2,index) in item1.info" :key="index">{{item2}}</p>
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

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
 .talent {
   padding: 50px 0;
   color: #333;
 }
 .job-title {
   font-size: 16px;
   font-weight: bold;
   color: #333;
   padding-bottom: 10px;
 }
 .item-detail {
   margin-bottom: 50px;
   &:first-child {
     margin-top: 40px;
   }
 }
 .self-info {
   font-size: 14px;
   display: flex;
   padding: 10px 0;
   .marg-r {
     margin-right: 60px;
   }
   .money>.pad-l{
     color: #FEA12E;
   }
   .text-light {
     color: #808080;
   }
 }
 .pad-l {
     padding-left: 10px;
   }
  .company {
    padding-bottom: 10px;
    .text-light {
     color: #808080;
   }
  }
  .duty {
    font-size: 12px;
    .duty-title {
      padding: 5px 0;
    }
    p {
      margin: 8px 0;
    }
  }
</style>
