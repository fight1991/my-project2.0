<template>
  <div class="corpDisplay">
    <div class="title">企业风采</div>
    <div class="content-area clearfix">
      <div class="banner-default fl default" v-if="bannerList.length===0">
        <img class="default-left" src="../../../assets/img/icon/noPhoto.jpg" alt="">
        <p>暂无描述</p>
      </div>
      <div class="banner fl" v-else>
        <el-carousel height="300px" @change="getContent" :autoplay="true">
          <el-carousel-item  v-for="item in bannerList" :key="item.pid">
            <!-- <h3>{{ item }}</h3> -->
            <a :href="item.link" target="_blank">
              <img :src="item.pic" alt="">
            </a>
          </el-carousel-item>
        </el-carousel>
        <div class="intro">{{intro}}</div>
      </div>
      <div class="link-icon fr">
        <div class="default" v-if="iconList.length===0">
          <img class="default-right" src="../../../assets/img/icon/com_default.png" alt="">
          <p>自定义</p>
        </div>
        <div class="items" v-for="item in iconList" :key="item.pid" v-else>
          <a :href="item.link" target="_blank">
            <img :src="item.pic" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from './eventBus.js'
export default {
  data () {
    return {
      intro: '',
      bannerList: [],
      iconList: []
    }
  },
  created () {
    this.getAllCorpDIY()
    eventBus.$on('getAllCorpDIY', this.getAllCorpDIY)
  },
  methods: {
    // 获取轮播图片title
    getContent (index) {
      if (this.bannerList[index]) {
        this.intro = this.bannerList[index]['title']
      }
    },
    // 企业风采图片列表
    getAllCorpDIY () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/workspace/getAllCorpDIY',
        data: {},
        router: this.$router,
        success: (res) => {
          if (res.result.activities) {
            this.bannerList = res.result.activities
          } else {
            this.bannerList = []
          }
          if (res.result.links) {
            this.iconList = res.result.links
          } else {
            this.iconList = []
          }
        }
      })
    }
  }
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
.content-area {
  display: flex;
}
.default {
    img {
      display: block;
      margin: 35px auto 0 auto;
      width: 100%;
    }
    p {
      text-align: center;
      margin: 30px 0;
      color: @font-color-title;
    }
    .default-right {
      width: 24px;
      height: 24px;
    }
  }
.banner,.banner-default {
  width: 70%;
  margin-top: 15px;
  border-radius: 3px;
  .intro {
    font-size: 16px;
    text-align: center;
    padding: 5px;
    color: #4c4c4c;
    margin-top: 5px;
  }
  a {
    display: inline-block;
    height: 100%;
  }
}
.link-icon {
  width: 40%;
  height: 300px;
  padding-left: 22px;
  margin-top: 15px;
  .items {
    text-align: center;
    margin-bottom:20px;
    width: 48%;
    float: left;
    min-width: 45px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  p {
      margin:5px 0;
      font-size: 12px;
      color: @font-color-title;
  }
}
.el-carousel__item {
  overflow: visible;
  img {
    height: 100%;
    width: 100%;
  }
}

</style>
