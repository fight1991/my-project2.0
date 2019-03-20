<template>
    <iframe-view :url='url'></iframe-view>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      url: 'http://127.0.0.1:9003/control'
      // url: 'https://test.5itrade.cn/declaration/list?token=XY4Fv2u8TPffBuDMl7xgndsIitIAhbTS39MQVgKT99zmW4kZC9ggg%2B5%2BsPPFuUXvGDgbWGkGQ%2BWuqUOv7gThkVnM%2BopYkl6swIRXlKcZoAT97bdvIghUBgggjE1rofsPKT6pz7WU1vCz1KoyOtyXFlIDKF372380pCWLHknuI0Q%3D'
    }
  }
}
</script>
<style scoped lang="less">
.index{
  width: 100%;
  height:100%;
}
</style>
