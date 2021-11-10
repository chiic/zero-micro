module.exports = {
  outputDir: 'vue2',
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port: 6001,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  lintOnSave: false,

  // 自定义webpack配置
  configureWebpack: {
    output: {
      jsonpFunction: `webpackJsonp-chile-vue2`,
    }
  },
}
