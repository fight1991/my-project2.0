module.exports = {
  dev: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    vendor4: ['echarts'],
    app: './src/main.js',
    components: './src/components/index.js',
    common: './src/view/common/index.js',
    error: './src/view/error/index.js'
  },
  build: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    vendor4: ['echarts'],
    app: ['babel-polyfill', './src/main.js'],
    components: ['babel-polyfill', './src/components/index.js'],
    common: ['babel-polyfill', './src/view/common/index.js'],
    error: ['babel-polyfill', './src/view/error/index.js']
  }
}
