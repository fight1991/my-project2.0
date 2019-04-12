<template>
  <div class="news">
    <div class="title">实时资讯</div>
    <el-tabs v-model="activeName" @tab-click="getNews">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in newsInfo" :key="item.name">
        <div class="default" v-if="item.newsList.length === 0"><img src="../../../assets/img/icon/news.png" alt=""></div>
        <div class="per-row"  v-for="item1 in item.newsList" :key="item1.pid" v-else>
          <div class="content text-cut" @click="getDetail(item1.pid)">{{item1.title}}</div>
          <div class="date">{{item1.createTime}}</div>
        </div>
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
      newsInfo: [
        {
          label: '平台公告',
          name: 'Announcement',
          newsList: []
        },
        {
          label: '政策法规',
          name: 'PolicyLaw',
          newsList: []
        },
        {
          label: '行业资讯',
          name: 'IndustryNews',
          newsList: []
        },
        {
          label: '通知公告',
          name: 'Information',
          newsList: []
        }
      ]
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
          type: this.activeName,
          page: {
            pageSize: 10,
            pageIndex: 1
          }
        },
        router: this.$router,
        success: (res) => {
          this.newsInfo.forEach(v => {
            if (v.name === this.activeName) {
              v.newsList = res.result
            }
          })
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
    flex: 1
  }
  .date {
    text-align: right;
    color: @font-color-title;
    font-size: 12px;
    width: 200px;
  }
  .el-form-item__label {
    font-size: 12px;
  }
  .per-row {
    padding: 10px 0;
    display: flex;
  }
}
</style>
