import store from '../../store/store'
const cache = {
  data () {
    return {
      pagination: {
        currentPage: 1, // 当前页
        pageSize: store.state.pagination.pageSize, // 每页数据条数
        total: 0 // 总条数
      }
    }
  },
  created () {
    // 权限表格按钮列控制
    if (this.menuCodes) {
      if (this.menuCodes.length > 0) {
        for (let i in this.menuCodes) {
          for (let j in this.menuCodes[i]) {
            this.permColumn[i] = false
            if (this.checkMenuCode(this.menuCodes[i][j])) {
              this.permColumn[i] = true
              break
            }
          }
        }
      }
    }
  },
  // 从其他组件返回激活当前组件时
  activated: function () {
    if (this.loadData) {
      this.$nextTick(() => {
        this.loadData()
      })
    }
  },
  methods: {
    // 删除系统缓存
    delSysCache (to, from) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            let key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key
            let cache = this.$vnode.parent.componentInstance.cache
            let keys = this.$vnode.parent.componentInstance.keys
            if (cache[key]) {
              if (keys.length) {
                let index = keys.indexOf(key)
                if (index > -1) {
                  keys.splice(index, 1)
                }
              }
              delete cache[key]
              this.$destroy()
            }
          }
        }
      }
    },
    // 权限校验
    checkMenuCode: function (val) {
      let menuCode = JSON.parse(window.localStorage.getItem('menuCodes'))
      return menuCode[val] === 'true'
    }
  },
  // 在同一组件中，切换路由（参数变化）时
  beforeRouteLeave: function (to, from, next) {
    if (this.cacheData) {
      this.$nextTick(() => {
        this.cacheData()
      })
    }
    if (from && from.meta.node && to.meta.node) {
      if (from.meta.node > to.meta.node) {
        this.delSysCache(to, from)
      } else if (from.meta.node === to.meta.node) {
        if (from.meta.nodeWhiteList) {
          let tag = true
          for (let x in from.meta.nodeWhiteList) {
            if (to.name === from.meta.nodeWhiteList[x]) {
              tag = false
              break
            }
          }
          if (tag) {
            this.delSysCache(to, from)
          }
        } else {
          this.delSysCache(to, from)
        }
      }
    }
    next()
  }
}

export { cache }
