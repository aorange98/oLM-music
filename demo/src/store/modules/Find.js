import {reqBanner,reqTopList} from '../../api/index.js'

export default {
    namespaced:true,  // 启用命名空间
    state:{
        images:[],         // 轮播信息
        recommend:[],        // 每日推荐
        generalMessage:[],   // 存放飙升榜和热热歌榜组成的数组
    },
    getters:{

        
    },
    mutations:{ // 同步方法  修改仓库的数据
        bannerUrl(state,data){
            state.images = data
        },
        GetTopListFast(state,data){
            const {playlist} = data.data
            state.generalMessage.push(playlist)
        },
        GetTopListHot(state,data){
            const {playlist} = data.data
            state.generalMessage.push(playlist)
        },
        GetTopListDouyin(state,data){
            const {playlist} = data.data
            state.generalMessage.push(playlist)
        }
    },
    actions:{   // 异步方法 
        // 得到自己的歌单的详情
        async asyncBanner({commit,state}){
            const result =  await reqBanner()
            const imagesUrlArr = result.data.banners
            commit('bannerUrl',imagesUrlArr)
        },
        // 得到飙升榜 和热歌榜 等排行榜等榜单的歌曲列表
        async asyncGetTopList({commit},data){
            const [idx1,idx2,idx3] = data // // 飙升榜 3  热搜榜 1  抖音26

            const result = await reqTopList(idx2)
            commit('GetTopListFast',result)
            
            const result1 = await reqTopList(idx1)
            commit('GetTopListHot',result1)

            const result2 = await reqTopList(idx3)
            commit('GetTopListDouyin',result2)

        },
    }

}

/**
 * trackIds:是完整的 但是只有id
 * tracks 不完整 都有
 * 
 * 
 */