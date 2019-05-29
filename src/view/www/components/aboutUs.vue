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
          <p>朗新科技股份有限公司成立于2003年,2017年8月1日在深交所创业板挂牌上市，股票代码：300682。公司专注于产业互联网业务，是蚂蚁金服投资的阿里生态伙伴公司。公司是国家规划布局内重点软件企业，拥有信息系统集成及服务一级资质，通过了CMMI5级认证。公司在北京、杭州、苏州、无锡、武汉、厦门、广州、重庆和南宁设有研发中心。公司拥有2000多名员工。</p>
          <p>朗新科技作为中国企业家海关事务行业领导者，是“中国国际单一窗口”主要建设力量，“金关二期”参建方。在国际贸易单一窗口标准版建设中，工程组获得了海关总署2018年专项奖励集体一等功。在大外贸服务行业专注为“智慧海关+智慧口岸+智慧生态链+智慧货主单位”提供一站式全流程方案的优秀国际贸易服务商。</p>
          <h3 style="margin-top:20px">朗新金关信息科技有限公司</h3>
          <p>朗新金关信息科技有限公司是朗新科技专注通关行业产业互联网业务的公司。公司秉承“科技让通关更便利”的使命，业务领域涵盖智慧海关、智慧口岸及智慧通关链路服务等板块。公司参与中国海关核心系统建设，是中国国际贸易“单一窗口”系统的主要承建方，是海关总署重要的科技合作伙伴。公司与中国报关协会共同打造行业最具广度和最具深度的线上关务服务的生态平台——“中国报关协会智慧通关平台”。</p>
          <p>朗新金关专注通关服务科技赋能，贯通围绕进出口链路服务环节中的货主、货代、报关行、仓储、运输等角色，运用人工智能、大数据、区块链、移动端等先进技术和手段，使新一代通关流程合规便利。</p>
        </div>
      </div>
    </div>
    <!-- 联系我们区域 -->
    <div class="contactUs">
      <div :class="{'mainer':true }" v-if="current">
        <baidu-map class="map nameCard" :center="centerPoint" :zoom="zoom" :scroll-wheel-zoom="false">
          <bml-marker-clusterer :averageCenter="true">
            <bm-marker
              v-for="marker of markers"
              :position="{lng: marker.lng, lat: marker.lat}"
              :key="marker.name"
              :icon="{url:marker.iconPath,size: {width: 15, height: 19}}"
              @mouseover="marker.show = true"
              @mouseout="marker.show = false">
              <!-- <bm-info-window :show="marker.show" @close="infoWindowClose(marker.name)" @open="infoWindowOpen(marker.name)">{{marker.name}}</bm-info-window> -->
              <!-- :title="marker.name" -->
              <my-overlay
                :position="{lng: marker.lng, lat: marker.lat}"
                :active="marker.show"
                :text="marker.name">
              </my-overlay>
            </bm-marker>
          </bml-marker-clusterer>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
      </div>
      <div :class="{'mainer':true ,'nameCard':true}" v-else>
        <img class="map-static" src="../../../assets/www-img/images/map.png" alt="">
      </div>
      <div class="mainer switch">
        <el-row>
          <el-button plain @click="current=!current">{{current==true?'查看静态地图':'查看动态地图'}}</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '../common/eventBus'
import {companys} from '@/config/www'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import MyOverlay from './common/MyOverlay'
export default {
  components: {
    BmlMarkerClusterer,
    MyOverlay
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
      current: false,
      markers: [],
      zoom: 5,
      show: false,
      active: false,
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
    },
    draw ({el, BMap, map}) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.map-static {
  display: block;
  margin: 0 auto;
  width: 862px;
}
.switch {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  .el-button.is-plain:hover {
    background: #fff;
    border-color: #dcdfe6;
    color: #409EFF;
  }
}
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
