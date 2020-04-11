module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // vant 
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // style: true    // 默认
      style: name => `${name}/style/less`   // 定制主题
    }, 'vant']

  ],

}

