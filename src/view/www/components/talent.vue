<template>
  <div class="talent">
    <!-- 头图 -->
    <div class="header-img"></div>
    <!-- 介绍 -->
    <div class="banner">
      <el-row>
        <el-col :span="18" :offset="3">
          <el-row :gutter="20">
          <el-col :span="8">
            <div class="banner-bgimg" v-html="jobIntroduce.first"></div>
          </el-col>
          <el-col :span="8">
            <div class="banner-bgimg" v-html="jobIntroduce.second"></div>
          </el-col>
          <el-col :span="8">
            <div class="banner-bgimg" v-html="jobIntroduce.third"></div>
          </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="title">
      <p class="big">诚聘人才</p>
      <p class="light">RECRUITMENT TALENTS</p>
    </div>
  </div>
</template>

<script>
import {jobIntroduce} from '@/config/www'
export default {
  data () {
    return {
      jobIntroduce: {}
    }
  },
  created () {
    this.jobIntroduce = jobIntroduce
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.talent {
  color: #333;
  .header-img {
    height: 380px;
    background: url('../../../assets/www-img/images/banner_img.png') no-repeat center;
    background-size: cover;
    box-sizing: border-box;
  }
  .banner {
    margin: 50px;
    .banner-bgimg {
      width: 320px;
      height: 217px;
      background: url('../../../assets/www-img/images/wz_bg.png') no-repeat center;
      background-size: cover;
    }
  }
}
//  .zp-title {
//    padding: 15px;
//    height:100px;
//    background:url("../../../assets/www-img/images/talent-head.png") no-repeat;
//    .email,.company {
//      margin: 10px 0;
//      color: #808080;
//    }
//    .link {
//      display: flex;
//      height: 40px;
//      line-height: 40px;
//      .name {
//        font-size: 20px;
//        font-weight: bold;
//        color: #333;
//      }
//      .tel {
//        font-size: 16px;
//        font-weight: bold;
//        line-height: 46px;
//        text-indent: 8px;
//        padding-right: 26px;
//        background: url("../../../assets/www-img/images/tel.png") no-repeat;
//        background-position: right 15px;
//      }
//    }
//  }
//  .zp-info {
//    padding: 15px;
//  }
//  .job-title {
//    font-size: 16px;
//    font-weight: bold;
//    color: #333;
//    padding: 10px 0;
//  }
//  .item-detail {
//    padding: 15px;
//    border: 1px solid #ccc;
//    margin-bottom: 50px;
//    &:first-child {
//      margin-top: 40px;
//    }
//  }
//  .self-info {
//    font-size: 14px;
//    display: flex;
//    padding: 10px 0;
//    .marg-r {
//      margin-right: 60px;
//    }
//    .money>.pad-l{
//      color: #FEA12E;
//    }
//    .text-light {
//      color: #808080;
//    }
//  }
//  .pad-l {
//      padding-left: 10px;
//    }
//   .company {
//     padding-bottom: 10px;
//     .text-light {
//      color: #808080;
//    }
//   }
//   .duty {
//     font-size: 12px;
//     .duty-title {
//       padding: 5px 0;
//     }
//     p {
//       margin: 8px 0;
//     }
//   }
</style>
