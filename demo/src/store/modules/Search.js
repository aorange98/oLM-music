import { reqSearchMusic, reqSearchMusicUrl, reqMusicImg } from '../../api/index.js'

export default {
    namespaced:true,  // 启用命名空间
    state:{
        songs: [],  // 存放根据keywoeds搜索得到的是所有歌曲信息
        songdata: {}, // 存放根据id搜索得到的单个歌曲的信息(得到url)
        songdetail: {} // 存放根据id搜索得到的单个歌曲的详细信息(得到img)
    },
    getters:{
        
    },
    mutations:{ // 同步方法  修改仓库的数据
        updateSongs(state,data){
            state.songs = data
        },
        upadteSongdata(state,data){
            state.songdata = data
        },
        updateSongdetail(state,data){
            state.songdetail = data
        }
    },
    actions:{   // 异步方法 
        // 根据keywords搜索歌曲得到歌曲信息
        async asyncSearchMusic({state,commit},keywords){
            const getData = await reqSearchMusic(keywords);
            const { result } = getData.data;
            // console.log(result)
            // 在异步中需要出发一个同步动作修改仓库的数据
            commit('updateSongs',result.songs)
        },
        // 根据歌曲的id获取音乐 url
        async asyncSearchMusicUrl({commit},id){
            const getMusicId = await reqSearchMusicUrl(id);
            const songdata = getMusicId.data.data[0];
            // console.log(songdata);
            commit('upadteSongdata',songdata)
        },
        // 根据歌曲的id获取音乐的img
        async asyncSearchMusicImg({commit},id){
            const getMusicImg = await reqMusicImg(id)
            const songdetail = getMusicImg.data.songs[0];
            // console.log(songdetail)
            commit('updateSongdetail',songdetail)
        }

        
    }

}
