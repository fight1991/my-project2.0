<template>
  <section id="list">
    <div id='div1' class='divRec'>
      <board></board>
    </div>
    <div id='div2' class='divQuad'>
      <chart></chart>
    </div>
    <div id='div3' class='divRec'>
      <corpDisplay></corpDisplay>
    </div>
    <div id='div4' class='divCard'>
      <news></news>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    board: resolve => require(['./middle/board.vue'], resolve),
    chart: resolve => require(['./middle/chart.vue'], resolve),
    corpDisplay: resolve => require(['./middle/corpDisplay.vue'], resolve),
    news: resolve => require(['./middle/news.vue'], resolve)
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  section {
    margin: 0;
    padding: 0;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: grid;
    grid-gap: 15px;
    grid-template-rows: repeat(2, 200px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row dense;
    min-height: 100vh;
  }

  .divRec {
      cursor: move;
      padding: 35px 20px;
      font-size: 20px;
      background-color: #ff0000;

      grid-area: span 1/span 2;
  }

  .divQuad {
      cursor: move;
      padding: 35px 20px;
      font-size: 20px;
      background-color: #fff333;

      grid-area: span 1/span 1;
  }

  .divCard {
      cursor: move;
      padding: 35px 20px;
      font-size: 20px;
      background-color: #00ff00;

      grid-area: span 2/span 1;
  }

  /* .custom-drag-ghost { */
    /* The original cloned element must not take place up in the page and must not be visible */
    /* position: absolute;
    top: -99999px;
    left: -99999px; */
    /* Just for appearance */
    /* background-color: #edb458;
    border: 1px solid #e8871e;
  } */

  .hidden-drag-ghost {
    opacity: 0;
  }

  .transition {
    transition: all 2s ease-out .5s;
    top: 0;
  }
</style>
