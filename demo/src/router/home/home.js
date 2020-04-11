
// 不需要分模块
const Home = () => import('../../views/Home/Home.vue')

export default {
    path:'/home',
    components:{
        home:Home
    },
    name:'home',
    meta:1
}

