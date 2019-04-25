<template>
  <div id="list" v-permissions="'CCBA20100000000'">
    <div v-for="item in divList" :key="item.id" :id='item.id' class='divItems' v-permissions="item.permissions">
      <component :is="item.component"></component>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      divList: [
        {
          id: 'div1',
          component: () => import('./middle/board.vue'),
          permissions: 'CCBA20101000000'
        },
        {
          id: 'div2',
          component: () => import('./middle/report.vue'),
          permissions: 'CCBA20102000000'
        },
        {
          id: 'div3',
          component: () => import('./middle/news.vue'),
          permissions: 'CCBA20103000000'
        },
        {
          id: 'div4',
          component: () => import('./middle/corpDisplay.vue'),
          permissions: 'CCBA20104000000'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#list {
  height: 100%;
  width: calc(~"(100% + 17px)");
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
}
.divItems {
  width: calc(~"(50% - 15px)");
  margin-right: 15px;
  min-width: 400px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
@media screen and (max-width:1090px) {
 .divItems {
   width: 100%;
   margin-left: 0px!important;
 }
}
</style>
