<template>
  <div class="news">
    <div class="title">实时资讯</div>
    <el-tabs v-model="activeName" @tab-click="getNews">
      <el-tab-pane label="平台公告" name="Announcement">
        <el-row v-for="item in AnnounceList" :key="item.pid">
          <el-col :span="12"><div class="content text-cut" @click="getDetail(item.pid)">{{item.title}}</div></el-col>
          <el-col :span="6" :offset="6"><div class="date">{{item.createTime}}</div></el-col>
        </el-row>
        <div class="default" v-if="AnnounceList.length === 0"><img src="../../../assets/img/icon/news.png" alt=""></div>
      </el-tab-pane>
      <el-tab-pane label="政策法规" name="PolicyLaw">
        <el-row v-for="item in lawList" :key="item.pid">
          <el-col :span="12"><div class="content text-cut" @click="getDetail(item.pid)">{{item.title}}</div></el-col>
          <el-col :span="6" :offset="6"><div class="date">{{item.createTime}}</div></el-col>
        </el-row>
        <div class="default" v-if="lawList.length === 0"><img src="../../../assets/img/icon/news.png" alt=""></div>
      </el-tab-pane>
      <el-tab-pane label="行业资讯" name="IndustryNews">
        <el-row v-for="item in newsList" :key="item.pid">
          <el-col :span="12"><div class="content text-cut" @click="getDetail(item.pid)">{{item.title}}</div></el-col>
          <el-col :span="6" :offset="6"><div class="date">{{item.createTime}}</div></el-col>
        </el-row>
        <div class="default" v-if="newsList.length === 0"><img src="../../../assets/img/icon/news.png" alt=""></div>
      </el-tab-pane>
      <el-tab-pane label="通知公告" name="Information">
        <el-row v-for="item in InformateList" :key="item.pid">
          <el-col :span="12"><div class="content text-cut" @click="getDetail(item.pid)">{{item.title}}</div></el-col>
          <el-col :span="6" :offset="6"><div class="date">{{item.createTime}}</div></el-col>
        </el-row>
        <div class="default" v-if="InformateList.length === 0"><img src="../../../assets/img/icon/news.png" alt=""></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import eventBus from './eventBus'
export default {
  data () {
    return {
      dates: '',
      activeName: 'Announcement',
      AnnounceList: [],
      lawList: [],
      newsList: [],
      InformateList: []
    }
  },
  created () {
    this.getNews()
    eventBus.$on('getNews', this.getNews)
  },
  methods: {
    // 获取咨询列表
    getNews () {
      this.$store.dispatch('ajax', {
        url: 'API@/login/workspace/getNewsList',
        data: {
          conditions: '',
          endTime: '',
          startTime: '',
          type: this.activeName
        },
        isPageList: true,
        router: this.$router,
        success: (res) => {
          if (this.activeName === 'Announcement') {
            this.AnnounceList = res.result
          }
          if (this.activeName === 'PolicyLaw') {
            this.lawList = res.result
          }
          if (this.activeName === 'IndustryNews') {
            this.newsList = res.result
          }
          if (this.activeName === 'Information') {
            this.InformateList = res.result
          }
        }
      })
    },
    // 跳转到咨询详情页
    getDetail (pid) {
      const {href} = this.$router.resolve({
        path: 'news/detail',
        query: {
          pid: pid
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.news {
  position: relative;
  padding: 10px 20px;
  .default {
    img {
      display: block;
      margin: 35px auto 0 auto
    }
  }
  .title {
    position:absolute;
    left: 20px;
    top: 5px;
    line-height: 40px;
    color: @font-color-main;
    font-weight: bold;
  }
  .content {
    font-size: 12px;
    color: @font-color-main;
    cursor: pointer;
  }
  .date {
    text-align: right;
    color: @font-color-title;
    font-size: 12px;
  }
  .el-form-item__label {
    font-size: 12px;
  }
  .el-row {
    padding: 10px 0;
  }
}
</style>
