const path = require('path')

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: "assets",
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {},
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.join(__dirname, 'src'),
          'base': path.resolve(__dirname, './src/base'),
          'api': path.resolve(__dirname, './src/api'),
          'common': path.resolve(__dirname, './src/common'),
          'components': path.resolve(__dirname, './src/components')
        } // 别名配置
      }
    })

  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      //https://github.com/ant-design/ant-motion/issues/44 TODO 2020-0404 修复antd的陨石坑，操
      less: {
        javascriptEnabled: true,
      },
      // css: {
      //   javascriptEnabled: true
      // }, // 这里的选项会传递给 css-loader
      // postcss: {} // 这里的选项会传递给 postcss-loader

    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0', // 允许外部ip访问
    port: 8022, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
    // } // 代理转发配置，调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
}