import {reqLogin,reqLogout,reqLoginStatus,reqUserMusicList } from '../../api/index.js'
import Vue from 'vue'
import {Notify} from 'vant'
Vue.use(Notify)

export default {
    namespaced:true,  // 启用命名空间
    state:{
        imgsrc: "",   // 头像的地址
        nickname: "",    // 用户名字
        userId:"",   // 用户id
        playListArr:[],  // 存放初始化歌单
    },
    getters:{
        
    },
    mutations:{ // 同步方法  修改仓库的数据
        LoginStatus(state,payload){
            // console.log(payload)
            if(payload.status===200){
                if(payload.data.code===502){
                    Notify('密码错误，请重新输入！')
                }else{
                    // Notify({ type: 'success', message: '登陆成功！' })
                    let { profile } = payload.data;
                    state.userId = profile.userId
                    state.nickname = profile.nickname
                    state.imgsrc = profile.avatarUrl
                }
            }
        },
        updataPlayListArr(state,data){
            state.playListArr = data.filter(item=>!item.subscribed)
        }
    },
    actions:{   // 异步方法 
        // 刷新登录状态 
        async asyncLoginStatus({commit,state}){
            const result = await reqLoginStatus();
            // console.log(result);

            // 还要触发同步动作修改仓库的数据 
            commit('LoginStatus',result)

            // 还要拉取歌单 如果没有uerId那么就不发起请求
            if(state.userId!==""){
                const result1 = await reqUserMusicList(state.userId)
                let playListArr = result1.data.playlist
                commit('updataPlayListArr',playListArr)
            }


        },
        // 退出登录
        async asyncLogout(){
            const result = await reqLogout();
        },
        // 登录
        async asyncLogin({commit,state},data){
            const result = await reqLogin(data);
            // console.log(result);
            commit('LoginStatus',result)


            // 还要拉取歌单 如果没有uerId那么就不发起请求
            if(state.userId!==""){
                const result1 = await reqUserMusicList(state.userId)
                let playListArr = result1.data.playlist
                commit('updataPlayListArr',playListArr)
            }

        },
    }

}
/**
 * 过滤掉 subscribed:true  因为是官方推荐的
 * 
 */