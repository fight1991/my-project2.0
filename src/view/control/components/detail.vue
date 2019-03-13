<template>
 <div class="detail">
   <div class="container">
     <h2>{{detail.title}}</h2>
     <div class="time">{{detail.createTime}}</div>
     <div class="text" v-html="detail.content"></div>
   </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  watch: {
    '$route': function (to, from) {
      console.log(to)
    }
  },
  created () {
    this.getNewsById()
  },
  methods: {
    getNewsById () {
      let id = this.$route.query.pid
      this.$store.dispatch('ajax', {
        url: 'API@/login/workspace/getNews',
        data: {pid: id},
        router: this.$router,
        success: (res) => {
          this.detail = res.result
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
  overflow:auto;
}
  .container {
    width: 1000px;
    margin: 0 auto;
    // background-color: pink;
    .text {
      // text-indent: 2em;
      color: @font-color-main;
    }
    p {
      padding: 5px 20px;
    }
    h2 {
      text-align: center;
    }
    .time {
      text-align: right;
      padding-right: 20px;
    }
  }
</style>
