
// 引入vue
import Vue from 'vue'

// 存放使用的组件
import { Button,Popup,Field,CellGroup,Icon,Col,Row,Search,NavBar,Cell,Grid, GridItem,Swipe, SwipeItem,Lazyload } from 'vant' 

// 导出
export default {
    init(){
        Vue.use(Button)
        Vue.use(Popup)
        Vue.use(Field)
        Vue.use(CellGroup)
        Vue.use(Icon)
        Vue.use(Col)
        Vue.use(Row)
        Vue.use(Search)
        Vue.use(NavBar)
        Vue.use(Cell)
        Vue.use(Grid)
        Vue.use(GridItem)
        Vue.use(Swipe)
        Vue.use(SwipeItem)
        Vue.use(Lazyload)
    }
}




