<template>
  <el-col :span="24">
    <el-pagination
      v-if='type && $store.state.pagination.total != 0'
      background
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="$store.state.pagination.currentPage"
      :page-sizes="$store.state.pagination.pageSizes"
      :page-size="$store.state.pagination.pageSize"
      :total="$store.state.pagination.total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-pagination
      v-if='!type && $store.state.pagination.total != 0'
      class='sys-small-page'
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="$store.state.pagination.currentPage"
      :page-size="$store.state.pagination.pageSize"
      :total="$store.state.pagination.total"
      layout="prev, pager, next">
    </el-pagination>
  </el-col>
</template>

<script>
export default {
  name: 'pagination',
  // props: {
  //   type: {
  //     type: Boolean,
  //     default: true // true:全样式；false:简易
  //   }
  // },
  data () {
    return {
      type: true
    }
  },
  mounted () {
    this.windowsWidth()
    window.onresize = () => {
      return (() => {
        this.windowsWidth()
      })()
    }
  },
  methods: {
    currentChange (page) {
      this.$store.commit('pageChange', page)
      this.$emit('change')
    },
    sizeChange (size) {
      this.$store.commit('pageSizeChange', size)
      this.$store.commit('pageChange', 1)
      this.$emit('change')
    },
    windowsWidth () {
      if (document.documentElement.clientWidth < 768) {
        this.type = false
      } else {
        this.type = true
      }
    }
  },
  beforeDestroy () {
    if (!this.$route.meta.keepAlive) {
      this.$store.commit('pageInit')
    }
  }
}
</script>
