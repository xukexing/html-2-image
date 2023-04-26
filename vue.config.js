const { defineConfig } = require('@vue/cli-service')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const nodeExternals = require('webpack-node-externals')
const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages'),
        'assets': resolve('examples/assets'),
        'views': resolve('examples/views'),
      }
    },
    output: {
      libraryExport: 'default'
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    externals: [{
      ...nodeExternals()
    }]
  },
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    // 是否将css提出单独文件（因为作为插件，避免用户手动导出样式，此处设置为false）
    extract: false,
  }
})
