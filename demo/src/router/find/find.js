
// 不需要分模块
const Find = () => import('../../views/Find/Find.vue')
export default {
    path:'/find',
    components:{
        find:Find
    },
    name:'find',
    meta:2
}