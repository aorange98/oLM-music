// 使用插件 融合两个配置文件
const merge = require('webpack-merge')

// 公有的
const baseConfig = require('./webpack.base')

const proConfig = {
    mode: 'production',    // 表示开发环境   
    // mode:'development'  // 测试的时候为了方便观看可以写成development模式
    
}

module.exports = merge(baseConfig,proConfig)