const path = require('path')

// 自动生成index.html文件和打包后的文件引入外部链接
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清空打包前的目录中的资源 出口文件夹地址是bundle 那就清空这个文件件中的资源
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 还需要使用vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 插件 打包成css独立文件 大驼峰命名一般是构造函数
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩打包后的css文件
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpack = require('webpack')


// 下面是devServer 
module.exports = {
    entry: './src/main.js',    // 打包index.js文件
    output: {
        path: path.join(__dirname, '../dist'),      // 输出的文件夹名 绝对路径
        filename: 'js/[name].js'      // 控制打包后存放的位置和改名字 
    },
    module: {   // loader 写在这里
        rules: [
            // 引入vue-loader识别.vue文件 
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            // 配置babel 将es6-->es5
            {
                test: /\.js$/, // 匹配到为js文件的 入口文件是index.js 就是他
                exclude: /node_modules/, // 不包括这个文件不解析
                loader: "babel-loader"  // 匹配到文件就使用babel解析
            },
            // 处理图片
            {
                test: /\.(gif|png|jpg)$/,      // 使用正则 匹配到以gif为结尾等
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]'  // file-loadder的选项 配置打包后文件的名字
                        }
                    }
                ]
            },
            // 处理字体
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[ext]'
                        }
                    }
                ]
            },
            // 处理css的
            {
                test: /\.css$/,      // 使用正则 匹配到css结尾
                use: ['style-loader', 'css-loader'] // 不配置写成字符串格式 
            },

            // 处理less
            {
                test: /\.less$/,      // 使用正则 匹配到less结尾
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                                'hack': `true; @import "${path.join(__dirname,'../src/assets/css/menu.less')}";`
                            }
                        }
                    }
                ]
                // 解析less-->解析css-->使用style-loader
            },
        ]

    },
    plugins: [  // 该插件用来将打包后的css/js自动插入到使用该插接件生成的html文件中
        new HtmlWebpackPlugin({     // 该插件生成html文件  
            filename: 'index.html',
            template: './src/template.html',  // 以这个文件作为模板生成
            minify: {
                collapseWhitespace: true,  // 压缩打包后的html代码
                removeComments: true,      // 去除注释
            }
        }),

        // 把dist目录下的资源清空，然后再把新的打包文件放进去
        new CleanWebpackPlugin(),

        new VueLoaderPlugin(),	// 配置这个 解析vue

        new MiniCssExtractPlugin({
            filename: '[name].css',     // 命名打包后的名字 [name]就是一个占位符 与打包前名字相同 
        }),

        new OptimizeCssAssetsPlugin(),   // 压缩css

    ],
    optimization: {  // 优化项
        splitChunks: {    // 分割模块 将第三方模块和业务逻辑代码做抽离
            chunks: 'all' // 无论是同步引入还是异步引入都会做分割  
        }
    },



}
