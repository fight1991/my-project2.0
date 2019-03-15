export default {
  // 开发
  dev: {
    // 测试
    SYSID: '000', // 系统id
    COMMON: 'https://test.5itrade.cn', // 公共登录跳转地址
    FILE: 'https://test.5itrade.cn/zuul', // 文件上传
    API: 'https://test.5itrade.cn' // api接口服务器地址
    // 开发
    // SYSID: '000', // 系统id
    // COMMON: 'http://172.21.206.31:8072', // 公共登录、注册等跳转地址
    // Redirect: 'http://172.21.206.31:8091/lsc-web', // 与老saas系统菜单切换重定向地址
    // FILE: 'http://172.21.206.31:8072/zuul', // 文件上传
    // API: 'http://172.21.206.31:9999' // api接口服务器地址
  },
  // 测试、准生产、生产
  prod: {
    SYSID: '000', // 系统id
    COMMON: 'http://172.21.206.31:8072', // 公共登录、注册等跳转地址
    FILE: 'http://172.21.206.31:8086', // 文件上传
    API: 'http://172.21.206.31:9999' // api接口服务器地址
  }
}
