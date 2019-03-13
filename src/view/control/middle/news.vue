<template>
  <div class="news">
    <div class="title">实时资讯</div>
    <el-tabs v-model="activeName" tab-click="getNews">
      <el-tab-pane label="平台公告" name="Announcement">
      <el-row v-for="item in newsList" :key="item.pid">
        <el-col :span="12"><div class="content text-cut" @click="getDetail(item.pid)">{{item.title}}</div></el-col>
        <el-col :span="6" :offset="6"><div class="date">{{item.createTime}}</div></el-col>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label="政策法规" name="PolicyLaw">政策法规</el-tab-pane>
      <el-tab-pane label="行业资讯" name="Information">行业资讯</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dates: '',
      activeName: 'Announcement',
      newsList: []
    }
  },
  created () {
    this.getNews()
  },
  methods: {
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
          this.newsList = res.result
        }
      })
    },
    getDetail (pid) {
      console.log(pid)
      const {href} = this.$router.resolve({
        path: '/detail',
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
