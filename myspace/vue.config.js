const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

    devServer: {
      proxy: {
        '/api': {
          target: 'https://app165.acapp.acwing.com.cn', // 目标 API 地址
          changeOrigin: true, // 是否改变源
          pathRewrite: {
            '^/api': '/api' // 重写路径, 保留 /api 前缀
          }
        }
      }
    }
})
