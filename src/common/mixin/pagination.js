const pagination = {
  data () {
    return {
      pagination: {
        pageIndex: 1, // 当前页
        pageSize: 10, // 每页数据条数
        total: 0 // 总条数
      }
    }
  }
}

export { pagination }
