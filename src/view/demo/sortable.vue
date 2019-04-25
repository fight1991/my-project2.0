<template>
  <transition-group tag="div" id="list">
    <div v-for="item in items" :key="item.id" :id='item.id' class='divItems' v-permissions="item.permissions"
      draggable="true"
      @dragstart="handleDragStart($event, item)"
      @dragover.prevent="handleDragOver($event, item)"
      @drop="handleDrop($event, item)"
      @dragend="handleDragEnd($event, item)">
      <component :is="item.component"></component>
    </div>
</transition-group>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      items: [
        {
          id: 'div1',
          component: () => import('../control/middle/board.vue'),
          permissions: 'CCBA20101000000'
        },
        {
          id: 'div2',
          component: () => import('../control/middle/report.vue'),
          permissions: 'CCBA20102000000'
        },
        {
          id: 'div3',
          component: () => import('../control/middle/news.vue'),
          permissions: 'CCBA20103000000'
        },
        {
          id: 'div4',
          component: () => import('../control/middle/corpDisplay.vue'),
          permissions: 'CCBA20104000000'
        }
      ],

      dragging: null
    }
  },
  created () {
    // 如果本地有缓存信息,则根据缓存位置信息来排序
    if (this.indexSort().length > 0) {
      this.items = this.indexSort()
    }
  },
  methods: {
    // 发生在拖动元素上,开始时触发一次
    handleDragStart (e, item) {
      // 兼容IE
      e = e || window.event
      this.dragging = item
      // 兼容火狐
      e.dataTransfer.setData('aa', null)
    },
    // 发生在拖动元素上,拖动结束后触发一次
    handleDragEnd (e, item) {
      this.dragging = null
    },
    // 发生在目标元素上,当拖动元素在目标元素范围内时,反复触发
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver (e) {
      // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
      e = e || window.event
      e.dataTransfer.dropEffect = 'move'
    },
    // 拖动元素在目标元素内释放时(在设置了dropover事件的前提下)
    handleDrop (e, item) {
      // 为需要移动的元素设置dragstart事件
      e = e || window.event
      e.dataTransfer.effectAllowed = 'move'
      if (item === this.dragging) {
        return
      }
      let newItems = [...this.items]
      // 拖动元素的位置
      let src = newItems.indexOf(this.dragging)
      // 目标元素的位置
      let dst = newItems.indexOf(item)
      // 位置互换
      newItems.splice(dst, 1, this.dragging)
      newItems.splice(src, 1, item)
      // newItems.splice(dst, 0, ...newItems.splice(src, 1))
      // 保存位置信息
      let indexInfo = newItems.map(v => {
        return v.id
      })
      localStorage.setItem('indexInfo', JSON.stringify(indexInfo))
      this.items = newItems
    },
    // // 根据存储的位置信息排序
    indexSort () {
      let arr = []
      if (localStorage.getItem('indexInfo')) {
        let indexInfo = JSON.parse(localStorage.getItem('indexInfo'))
        arr = indexInfo.map(v => {
          let temp = this.items.find(item => v === item.id)
          return temp
        })
      }
      return arr
    }
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
  transition: all linear .3s;
  overflow: hidden;
  border: 1px solid red;
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
