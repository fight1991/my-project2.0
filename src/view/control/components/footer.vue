<template>
  <div class="footer">
    <div class="container">
      <div class="quikFunction">
        <div class="icon">
          <div class="text"><i class="el-icon-menu"></i></div>
          <p>快捷功能</p>
        </div>
      </div>
      <div class="quikItems hidden-xs-only">
        <div class="item-detail" v-for="item in quickItems" :key="item.id">
          <i class="item-icon"><img :src="item.icon" alt=""></i>
          <span>{{item.text}}</span>
        </div>
      </div>
      <div class="btn-control">
        <div class="left">
          <div class="arrow" @click="sendHeight">
            <img :src="arrowSrc.arrowUp" alt="" v-if="!bigIsShow">
            <img :src="arrowSrc.arrowDown" alt="" v-if="bigIsShow">
          </div>
          <!-- <div class="manage"><img src="../../../assets/img/icon/btm_set.png" alt=""><span>管理</span></div> -->
        </div>
        <div class="erweima-little" v-if="!bigIsShow">
          <div class="little-ewm"><img src="../../../assets/img/icon/btm_QR.png" alt=""></div>
          <div class="zhihui">智慧通关</div>
        </div>
        <div class="erweima-big" v-if="bigIsShow">
          <div class="big-text">智慧通关小程序实时通关查询</div>
          <div class="big-ewm"><img src="../../../assets/img/icon/btm_QRcode.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bigIsShow: false,
      arrowSrc: {
        arrowUp: require('../../../assets/img/icon/btm_fold_1.png'),
        arrowDown: require('../../../assets/img/icon/btm_fold_2.png')
      },
      quickItems: [
        {
          id: 0,
          icon: require('../../../assets/img/icon/btm_im_rpt.png'),
          text: '进口综合报表'
        },
        {
          id: 1,
          icon: require('../../../assets/img/icon/btm_im_declar.png'),
          text: '进口报关单'
        },
        {
          id: 2,
          icon: require('../../../assets/img/icon/btm_ex_declar.png'),
          text: '出口报关单'
        },
        {
          id: 3,
          icon: require('../../../assets/img/icon/btm_log.png'),
          text: '物流跟踪'
        },
        {
          id: 4,
          icon: require('../../../assets/img/icon/btm_declar.png'),
          text: '报关单管理'
        },
        {
          id: 5,
          icon: require('../../../assets/img/icon/btm_air.png'),
          text: '航空器'
        },
        {
          id: 6,
          icon: require('../../../assets/img/icon/btm_product.png'),
          text: '商品资料库'
        }
      ]
    }
  },
  methods: {
    sendHeight () { // 底部展开与关闭
      this.bigIsShow = !this.bigIsShow
      let height = ''
      if (this.bigIsShow) {
        height = 170
      } else {
        height = 50
      }
      this.$emit('pullHeight', height)
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 5px;
  // border-bottom: 1px solid red;
  background-color: @aid-color-dark;
}
 .container {
   box-sizing:border-box;
   padding-left: 94px;
   padding-right: 190px;
   width: 50%;
   height: 100%;
  //  background-color: red;
   margin: 0 auto;
   position: relative;
   .quikItems {
     overflow: hidden;
     display: flex;
     flex-wrap: wrap;
     align-items: center;
     color: #fff;
     .item-detail {
       padding: 13px;
       span {
         margin-left: 5px;
       }
     }
   }
   .quikFunction {
     position: absolute;
     left: 0;
     bottom: 0;
     width: 94px;
     height: 100%;
     background-color: #0a5ca0;
     text-align: center;
     color: #fff;
     .icon {
       position: absolute;
       width: 100%;
       height: 50px;
       left: 0;
       top: -5px;
       background-color: #0a5ca0;
       padding-top: 5px;
     }
     p {
       margin: 0;
     }
     .text i{
       font-size: 30px;
     }
   }
   .btn-control {
     position: absolute;
     bottom: 0;
     right: 0;
     width: 190px;
     height: 100%;
     display: flex;
     .erweima-little {
       background-color: @aid-color-light;
       box-sizing: border-box;
       width: 130px;
       display: flex;
       padding:10px 15px;
       .zhihui {
         height: 30px;
         line-height: 30px;
         color: #fff;
         margin-left: 10px;
       }
     }
     .erweima-big {
       height: 100%;
       background-color: @aid-color-light;
       width: 130px;
       color: #fff;
       text-align: center;
       padding: 10px;
       box-sizing: border-box;
       img {
         display: block;
         margin: 0 auto;
         margin-top: 10px;
       }
     }
     .left {
       position: relative;
       img {
         display: block;
         margin: 0 auto;
         margin-top: 5px;
       }
       .arrow,.manage {
         position: absolute;
         left:0;
         width: 60px;
         height:50px;
         background-color: #0a5ca0;
         cursor: pointer;
       }
       .arrow {
         top: 0;
         z-index: 6;
       }
       .manage {
         bottom: 0;
         z-index:5;
         color: #fff;
         text-align: center;
         img {
           margin-top: 5px;
         }
       }
       width: 60px;
       background-color: #0a5ca0;
     }
   }
 }
</style>
