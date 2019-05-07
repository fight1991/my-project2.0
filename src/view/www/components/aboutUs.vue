<template>
  <div class="aboutUs">
    <!-- 背景图区域 -->
    <div class="banner none">
      <img :src="bannerList[2]" alt="">
    </div>
    <!-- 公司简介 -->
    <div class="companyIntro">
      <div class="title">
          <p class="big">关于我们</p>
          <p class="light">ABOUT US</p>
      </div>
      <div class="detail mainer">
        <div class="text">
          <div><img src="@/assets/www-img/images/logo2.png" alt=""></div>
          <h3>中国报关协会</h3>
          <p>中国报关协会（China Customs Brokers Association ，简称CCBA），于2002年12月11日成立，是经中华人民共和国民政部注册，由在海关注册的报关单位、依法成立的其他相关企事业单位、科研院所、社会团体等及有关人士自愿结成的全国性、行业性社会团体，是非营利性社会组织。</p>
          <p>中国报关协会是中国唯一的全国性报关行业组织，协会成员包括报关企业、进出口货物收发货人及其报关员。中国报关协会是民政部授予的5A级全国行业协会(2015-2020)和2015年度全国先进社会组织。</p>
          <p>中国报关协会的宗旨是配合政府部门加强对我国报关行业的管理，维护、改善报关市场的经营秩序，促进会员间的交流与合作，依法代表本行业利益，保护会员的合法权益，促进我国报关服务行业的健康发展。</p>
          <div class="shine"><img src="@/assets/www-img/images/shine.png" alt=""></div>
          <h3>朗新科技集团</h3>
          <p>朗新金关信息科技有限公司是朗新科技集团创新业务板块的重要组成部分，着力于以创新思维提供新外贸信息化的整理解决方案。</p>
          <p>朗新科技（股票代码：300682）语出《淮南子》：“日出天霁，朗而新之”，公司注册资本36000万，员工2000人，专业提供众多领域的应用解决方案，主要业务涉及电信、电力、供应链管理、人力资源管理、关务管理、大数据应用等。</p>
          <p>朗新科技获得“国家发改委”、“财政部”、“信息产业部”、“商务部”、“国家税务总局”五部委颁发的“国家规划布布局内重点软件企业证书”，跻身“中国软件产业最大规模前100家企业”。</p>
          <h3 style="margin-top:20px">朗新金关信息科技有限公司</h3>
          <p>朗新金关科技有限公司成立于2006年，公司从事海关管辖的加工贸易企业电子联网、关务管理、核查核销等关务专业软件开发及海关内部管理系统的软件开发；公司取得中国电子口岸认证的《电子联网资格认定证书》根据海关总署数据中心颁发的2007年115号文件，朗新金关成为全国13家具有合格资质的联网软件软件供应商。</p>
          <p>朗新金关不仅作为国家“单一窗口”标准版建设的主要力量，另外依托开发优势为各地方智慧口岸建设提供方案设计、系统设计、运维服务等方面的能力输出。并且将以移动、智能、协同为创新应用亮点，从报关行、货代、货主、供应商、监管机构等多位视角，打造形成围绕通过物流生态圈的线上关务服务平台。</p>
        </div>
      </div>
    </div>
    <!-- 联系我们区域 -->
    <div class="contactUs">
      <div class="mainer">
        <baidu-map class="map nameCard" :center="centerPoint" :zoom="zoom" :scroll-wheel-zoom="false">
          <bml-marker-clusterer :averageCenter="true">
            <bm-marker
              v-for="marker of markers"
              :position="{lng: marker.lng, lat: marker.lat}"
              :key="marker.name"
              :icon="{url:marker.iconPath,size: {width: 28, height: 28}}"
              :title="marker.name"
              @click="infoWindowOpen(marker.name)">
              <bm-info-window :show="marker.show" @close="infoWindowClose(marker.name)" @open="infoWindowOpen(marker.name)">{{marker.name}}</bm-info-window>
            </bm-marker>
          </bml-marker-clusterer>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../common/eventBus'
import {companys} from '@/config/www'
import {BmlMarkerClusterer} from 'vue-baidu-map'
export default {
  components: {
    BmlMarkerClusterer: BmlMarkerClusterer
  },
  data () {
    return {
      bannerList: ['@/assets/www-img/images/banner01.png', '@/assets/www-img/images/banner02.png', '@/assets/www-img/images/banner03.png'],
      formData: {
        name: '',
        mobile: '',
        code: '',
        corpName: '',
        email: ''
      },
      markers: [],
      zoom: 5,
      show: false,
      centerPoint: {lng: 114.365689, lat: 30.579686} // 中心点
    }
  },
  mounted () {
    if (this.$route.hash) { // 说明是点击预约按钮跳转过来的,则定位到锚点
      eventBus.$emit('custormAnchor', 'anchor')
    }
  },
  created () {
    this.getMarker()
  },
  methods: {
    getMarker () {
      for (let k in companys) {
        companys[k].forEach(v => {
          this.markers.push({
            lng: v.value[0],
            lat: v.value[1],
            iconPath: v.iconPath,
            name: v.name,
            show: false
          })
        })
      }
    },
    infoWindowOpen (name) {
      this.markers.forEach(v => {
        if (v.name === name) {
          v.show = true
        } else {
          v.show = false
        }
      })
    },
    infoWindowClose () {
      this.markers.forEach(v => {
        if (v.name === name) {
          v.show = false
        } else {
          v.show = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 公司简介区域
.companyIntro {
  margin: 40px 0;
}
  .detail {
    h3 {
      color: black;
      font-size: 16px;
      font-weight: bold;
      margin: 10px 0;
    }
    p {
      text-indent: 2em;
      line-height: 26px;
    }
    .text {
      img {
        width: 110px;
        margin-bottom: 10px;
      }
      .shine {
        margin-top: 30px;
      }
    }
    .photo {
      width: 30%;
    }
  }
  // 联系我们区域
  .contactUs {
    padding-bottom: 30px;
    .light {
      margin-bottom: 0;
    }
  }
  // 在线预约区域
  .orderInline {
    padding-top: 20px;
    padding-bottom: 40px;
    .line {
      height: 0;
      border-top: 1px solid #ccc;
      width: 550px;
      margin: 20px auto;
      text-align: center;
      span {
        display: block;
        background: #fff;
        width: 460px;
        margin: 0 auto;
        margin-top: -10px;
        color: #999;
      }
    }
    .btn-now {
      padding: 20px 0;
      text-align: center;
      button {
        background-color: #FF7200;
        width: 200px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .sendCode {
      position: absolute;
      right: 28px;
      top: 8px;
      border: none;
      border-left: 1px solid #ccc;
      border-radius: 0;
      box-sizing: border-box;
      padding: 5px 5px 5px 10px;
    }
  }
  .nameCard {
    height: 800px;
  }
</style>
