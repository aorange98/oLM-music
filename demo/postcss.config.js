// 这个包的作用是能往css中添加兼容前缀
module.exports = {
    plugins: [      // 插件 插件的值是数组
        require('autoprefixer') // 需要使用这个包
    ]
}