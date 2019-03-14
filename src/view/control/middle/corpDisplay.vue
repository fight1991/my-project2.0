<template>
  <div class="corpDisplay">
    <div class="title">企业风采</div>
    <div class="content-area clearfix">
      <div class="banner fl">
        <el-carousel height="180px" @change="getContent">
          <el-carousel-item  v-for="item in 4" :key="item">
            <!-- <h3>{{ item }}</h3> -->
          </el-carousel-item>
        </el-carousel>
        <div class="intro">{{intro}}</div>
      </div>
      <div class="link-icon fr">
        <div class="items" v-for="(item,index) in imgs" :key="index">
          <img :src="item.src" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      intro: '',
      imgs: [
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        },
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        },
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        },
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        },
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        },
        {
          src: require('../../../assets/img/icon/com_web.png'),
          name: '首页'
        }
      ]
    }
  },
  created () {
    this.getAllCorpDIY()
  },
  methods: {
    getContent (index) {
      this.intro = '哈哈哈哈哈' + index
    },
    getAllCorpDIY () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/workspace/getAllCorpDIY',
        data: {},
        router: this.$router,
        success: (res) => {
          console.log(res)
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
.banner {
  width: 300px;
  margin-top: 15px;
  .intro {
    font-size: 16px;
    text-align: center;
    padding: 5px;
    color: #4c4c4c;
  }
}
.link-icon {
  flex: 1;
  height: 250px;
  padding-left: 22px;
  margin-top: 15px;
  .items {
    text-align: center;
    margin-bottom:20px;
    width: 33.3%;
    float: right;
  }
  p {
      margin:5px 0;
      font-size: 12px;
      color: @font-color-title;
  }
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
