<template>
  <div class="footer">
    <div class="footer-top">
      <div class="content mainer clearfix">
        <div class="companyInfo fl">
          <h3>合作伙伴:</h3>
          <div class="partner fl" v-for="(item,index) in partner" :key="index">
            <a :href="item.url" target="_blank" v-if="item.url.indexOf('www') > 0">
              <div class="icon fl"><img :src="item.icon" alt=""></div>
              <div class="name fl">{{item.name}}</div>
            </a>
            <a :href="item.url" onclick="return false;" target="_blank" v-else>
              <div class="icon fl"><img :src="item.icon" alt=""></div>
              <div class="name fl">{{item.name}}</div>
            </a>
          </div>
        </div>
        <div class="link fr">
          <img src="@/assets/www-img/images/erweima.png" alt="">
          <p>智慧通关小程序</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copy">{{copyTxt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      copyTxt: 'Copyrights © 2010-2020 朗新金关信息科技有限公司 苏IPC备17069948号-2',
      partner: [
        {
          icon: require('@/assets/www-img/images/partner/danyichuangkou.png'),
          name: '中国国际贸易单一窗口',
          url: 'https://www.singlewindow.cn/'
        },
        {
          icon: require('@/assets/www-img/images/partner/tianjing.png'),
          name: '天津报关协会',
          url: 'http://www.tcba.org.cn'
        },
        {
          icon: require('@/assets/www-img/images/partner/beijing.png'),
          name: '北京报关协会',
          url: 'http://www.bjcustoms.com/bcba/'
        },
        {
          icon: require('@/assets/www-img/images/partner/hunan.png'),
          name: '湖南报关协会',
          url: 'http://www.znidc.net/'
        },
        {
          icon: require('@/assets/www-img/images/partner/hubei.png'),
          name: '湖北报关协会',
          url: 'javascript:;'
        },
        {
          icon: require('@/assets/www-img/images/partner/yatai.png'),
          name: '亚太示范电子口岸网络运营中心',
          url: 'javascript:;'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .fsize22 {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 22px;
  }
  .footer-top {
    padding: 30px 5px;
    background-color: #0A5CA0;
    color: #fff;
    .companyInfo  {
      width: 750px;
      h3 {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 20px;
      }
      .partner {
        margin-right: 20px;
        width:45%;
        padding: 5px 0;
        // line-height: 40px;
        color: #fff;
        .name {
          color: #fff;
          padding-left: 15px;
        }
      }
      .detail {
        margin-top: 15px;
        .text {
          display: inline-block;
          padding-left: 10px;
        }
        p {
          padding-left: 22px;
          height: 35px;
          line-height: 35px;
          position: relative;
            &:nth-child(1) {
              margin-bottom: 10px;
            }
        }
        .left {
          margin-right: 50px;
        }
      }
    }
  }
  .link p {
    margin-top: 10px;
    text-align: center;
  }
  .footer-bottom {
    text-align:center;
    height: 40px;
    line-height: 30px;
    background-color: #EBEBEB;
    padding: 5px 0;
  }
</style>
