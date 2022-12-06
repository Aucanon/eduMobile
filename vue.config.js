const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
})
