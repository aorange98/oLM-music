// 使用插件 融合两个配置文件
const merge = require('webpack-merge')

// 公有的
const baseConfig = require('./webpack.base')

const DevConfig = {
    mode: 'development',    // 表示开发环境
    // 这个只在开发阶段才使用
    devServer: { // devServer 打包生成的资源都是放在内存中的 看不到build目录的
        port: 5000,
        contentBase: './build', // 开启的服务能够访问build目录下的资源 
        proxy: {
            '/api': {  // 如果是api开头的 那么就转发到9000端口
                target: 'http://localhost:3105/',
                pathRewrite: {
                    'api': '/'  // 把api写成空或者'/'
                }
            },
        },
    },

}

// 暴露出去就是这两个配置的和
module.exports = merge(baseConfig,DevConfig)
