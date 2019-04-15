const cache = {
  data () {
    return {
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
  methods: {
    // 权限校验
    checkMenuCode: function (val) {
      let menuCode = JSON.parse(window.localStorage.getItem('menuCodes'))
      return menuCode[val] === 'true'
    }
  }
}

export { cache }
