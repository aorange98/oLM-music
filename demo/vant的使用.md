使用vant
1.npm i vant -S
2.按需引入：npm i babel-plugin-import -D 
3.找到babel.config.js
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
 
4.rem适配
npm install postcss-pxtorem --save-dev
npm i -S amfe-flexible
 
5.main.js 引入amfe-flexible
import 'amfe-flexible/index.js'
 
6.在postcss.config.js文件内(没有就在根目录创建一个)
// 最新写法
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
375px 即100%宽度，写px会自动rem处理，如果不想被rem处理，可以使用PX来写。

那么就可以直接写px px为设计图的一半