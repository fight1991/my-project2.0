module.exports = {
  dev: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    vendor4: ['echarts'],
    app: './src/main.js',
    components: './src/components/index.js',
    common: './src/view/common/index.js',
    error: './src/view/error/index.js',
    www: './src/view/www/index.js',
    aircraft: './src/view/pages/aircraft/router.js',
    dataCenter: './src/view/pages/dataCenter/router.js',
    eImport: './src/view/pages/eImport/router.js',
    reportCenter: './src/view/pages/reportCenter/router.js'
  },
  build: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    vendor4: ['echarts'],
    app: ['babel-polyfill', './src/main.js'],
    components: ['babel-polyfill', './src/components/index.js'],
    common: ['babel-polyfill', './src/view/common/index.js'],
    error: ['babel-polyfill', './src/view/error/index.js'],
    www: ['babel-polyfill', './src/view/www/index.js'],
    aircraft: ['babel-polyfill', './src/view/pages/aircraft/router.js'],
    dataCenter: ['babel-polyfill', './src/view/pages/dataCenter/router.js'],
    eImport: ['babel-polyfill', './src/view/pages/eImport/router.js'],
    reportCenter: ['babel-polyfill', './src/view/pages/reportCenter/router.js']
  }
}
