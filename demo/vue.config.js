module.exports = {
    // 配置别名 自动找到这些文件
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'api': '@/api',
                'views': '@/views',
                'utils': '@/utils'
            }
        },
    },
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:3500/',
                pathRewrite: {
                    'api': '/'  // 把api写成空或者'/'
                }
            }
        }
    },
    // lintOnSave: true,
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 require('postcss-pxtorem')({
    //                     rootValue: 16, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
    //                     unitPrecision: 2, // 转换成rem后保留的小数点位数
    //                     propList: ['*'], // 一个存储哪些将被转换的属性列表
    //                     // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    //                     // propBlackList: [], //黑名单
    //                     // exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //                     // selectorBlackList: [], //要忽略并保留为px的选择器
    //                     // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    //                     // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    //                     mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
    //                     minPixelValue: 12 // 意思是所有小于12px的样式都不被转换
    //                 }),
    //             ]
    //         }
    //     }
    // }
}

