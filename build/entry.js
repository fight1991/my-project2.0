module.exports = {
  dev: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    app: './src/main.js',
    components: './src/components/index.js',
    common: './src/view/common/index.js',
    error: './src/view/error/index.js',
    www: './src/view/www/index.js',
    aircraft: './src/view/pages/aircraft/router.js',
    dataCenter: './src/view/pages/dataCenter/router.js',
    eImport: './src/view/pages/eImport/router.js',
    reportCenter: './src/view/pages/reportCenter/router.js',
    circulation: './src/view/pages/circulation/router.js',
    graininess: './src/view/pages/graininess/router.js',
    sea:'./src/view/pages/sea/router.js',
    handBook:'./src/view/pages/handBook/router.js',
    account:'./src/view/pages/account/router.js'

  },
  build: {
    vendor1: ['vue'],
    vendor2: ['vue-router'],
    vendor3: ['element-ui'],
    app: ['babel-polyfill', './src/main.js'],
    components: ['babel-polyfill', './src/components/index.js'],
    common: ['babel-polyfill', './src/view/common/index.js'],
    error: ['babel-polyfill', './src/view/error/index.js'],
    www: ['babel-polyfill', './src/view/www/index.js'],
    aircraft: ['babel-polyfill', './src/view/pages/aircraft/router.js'],
    dataCenter: ['babel-polyfill', './src/view/pages/dataCenter/router.js'],
    eImport: ['babel-polyfill', './src/view/pages/eImport/router.js'],
    reportCenter: ['babel-polyfill', './src/view/pages/reportCenter/router.js'],
    circulation: ['babel-polyfill','./src/view/pages/circulation/router.js'],
    graininess: ['babel-polyfill','./src/view/pages/graininess/router.js'],
    sea: ['babel-polyfill','./src/view/pages/sea/router.js'],
    handBook: ['babel-polyfill','./src/view/pages/handBook/router.js'],
    account: ['babel-polyfill','./src/view/pages/account/router.js']
  }
}
