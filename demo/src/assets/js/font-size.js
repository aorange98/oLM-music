
(function(){

    fn()    // 此时如果在浏览器更换设备字体大小不会发生改变

    // 当切换不同的设备时window会自动触发fn函数
    window.addEventListener('resize',fn)

    function fn(){
        // 选择文档中匹配指定 CSS 选择器的一个元素
        var html = document.querySelector('html')
        // 获取手机设备的宽度值
        var width = window.innerWidth  // window.screen.width  这个pc拉伸没反应
        //设置html元素的font-size
        html.style.fontSize = width/10 + 'px'
        // 比如 iphone 6  宽度是375 我们已经对宽度除以10了，所以
        // 1rem 37.5px    10rem 375px  375px 和当前设备的屏幕等宽
        // 将设计图纸750px的宽度放在375px的设备中具有一定的关系
        // 10rem/750 = x/设计图某一个的尺寸
    }

})()


