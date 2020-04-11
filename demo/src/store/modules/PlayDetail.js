import {reqUserMusicDetail,reqSearchMusicUrl} from '../../api/index.js'

export default {
    namespaced:true,  // 启用命名空间
    state:{
        coverImgUrl:"", // 歌单的图片
        name:"",        // 歌单的名字
        tracks:[],       // 歌单的歌曲信息 包括图片名字歌手名
        musicIds:"",     // 存放由trackIds得到的歌单中所有id组成的数组，并且将它变成字符串
        musicUrl:[],      // 存放歌曲的Url
    },
    getters:{
        
    },
    mutations:{ // 同步方法  修改仓库的数据
        userMusicDetail(state,playlist){
            // console.log(playlist)
            state.coverImgUrl = playlist.coverImgUrl   
            state.name = playlist.name      
            state.tracks = playlist.tracks  
            state.musicIds = playlist.trackIds.map(a=>a.id).toString()
            // console.log(state.musicIds) 
        },   
        // 自己的歌单的url和排行榜的url
        updateMusicUrl(state,payload){
            // console.log(payload)
            let musicUrlArr = payload.data.data     
            // console.log(musicUrlArr)        //  得到歌曲url和id

            let musicIdstoArr = state.musicIds.split(',')   // 不改变原来的值

            let arr = []    // 根据之前ids的顺序和之后得到的数组重新对号
            for (let i = 0; i < musicIdstoArr.length; i++) {
                let res = musicUrlArr.find((value) => {
                    return value.id == musicIdstoArr[i]
                })
                arr.push(res)
            }
            // console.log(arr)

            for(let i=0;i<arr.length;i++){
                if(arr[i].url===null){
                    // console.log(arr[i],i)
                    // console.log(state.tracks[i],1)
                    arr.splice(i,1) // 删除有url的由数组组成的数组
                    state.tracks.splice(i,1) // 删除由存放歌手的信息没有url组成的数组
                }
            }
            // console.log(state.tracks)
            state.musicUrl = arr.map(a=>a.url)
        },
        // 处理这个ids变成字符串
        updateMusicTracksIds(state,trackIds){
            state.musicIds = trackIds.map(a=>a.id).toString()
        },
        // 排行榜修改仓库的tracks
        musicDetail(state,tracks){
            state.tracks = tracks  
        }

    },
    actions:{   // 异步方法 
        // 请求自己的歌单的详情  所有歌曲
        async asyncUserMusicDetail({commit,state},id){
            const result =  await reqUserMusicDetail(id)
            const {playlist} = result.data
            commit('userMusicDetail',playlist)

            // 得到所有歌曲后再根据歌单中所有id获取歌曲的url 
            const result1 =  await reqSearchMusicUrl(state.musicIds)
            commit('updateMusicUrl',result1)
        },
        // 获取歌曲的urls
        async asyncRankingMusicUrl({commit,state},{tracks,trackIds}){
            // console.log(tracks,trackIds)
            commit('updateMusicTracksIds',trackIds)
            commit('musicDetail',tracks)
            
            // 获取音乐的url
            const result =  await reqSearchMusicUrl(state.musicIds)
            commit('updateMusicUrl',result)
        }
        
    }

}

/**
 * trackIds:是完整的 但是只有id
 * tracks 不完整 都有
 */