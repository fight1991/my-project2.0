<template>
  <el-col :span="24">
    <el-pagination
      v-if='type && pagination.total != 0'
      background
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 50, 100, 200]"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-pagination
      v-if='!type && pagination.total != 0'
      class='sys-small-page'
      :pager-count= "5"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="prev, pager, next">
    </el-pagination>
  </el-col>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      default: function () {
        return this.$store.state.pagination
      }
    }
    // type: {
    //   type: Boolean,
    //   default: true // true:全样式；false:简易
    // }
  },
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
      this.pagination.pageIndex = page
      this.$emit('change', this.pagination)
    },
    sizeChange (size) {
      this.pagination.pageSize = size
      this.pagination.pageIndex = 1
      this.$emit('change', this.pagination)
    },
    windowsWidth () {
      if (document.documentElement.clientWidth < 768) {
        this.type = false
      } else {
        this.type = true
      }
    }
  },
  beforeDestroy () {}
}
</script>
