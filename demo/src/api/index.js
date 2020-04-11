const axios = require('axios')

// 请求搜索歌曲名的接口函数
export const reqSearchMusic = (keywords)=>axios.get('/api/search',{
    params:{keywords}
})

// 请求首歌曲歌曲的url的接口函数
export const reqSearchMusicUrl = (id)=>axios.get('/api/song/url',{
    params:{id}
})

// 获取歌曲img的接口函数
export const reqMusicImg = (ids)=>axios.get('/api/song/detail',{
    params:{ids}
})


// 登录接口函数
export const reqLogin = (logininfo)=>axios.post('/api/login/cellphone',logininfo)

// 退出接口函数
export const reqLogout = ()=>axios.get('/api/logout')

// 刷新登录状态
export const reqLoginStatus = ()=>axios.get('/api/login/status')



// 获取用户歌单的接口函数   这个函数在NavBar中调用  页面初始化logininit
export const reqUserMusicList = (uid)=>axios.get(`/api/user/playlist?uid=${uid}`)

// 获取歌单详情
export const reqUserMusicDetail = (id)=>axios.get(`/api/playlist/detail?id=${id}`)


// banner 轮播 1：安卓  2：iphone
export const reqBanner = ()=>axios.get(`/api/banner?type=1`)


// 飙升榜( 3 ) && 热搜榜( 1 )  抖音 （ 26 ）
export const reqTopList = (idx)=>axios.get('/api/top/list',{
    params:{idx}   // params:{ idx:idx }  axios会用=拼接为 idx=1 发起请求
})









// // 请求搜索歌曲名的接口函数
// export const reqSearchMusic = (keywords)=>axios.get('/search',{
//     params:{keywords}
// })

// // 请求单首歌曲歌曲的url的接口函数
// export const reqSearchMusicUrl = (id)=>axios.get('/song/url',{
//     params:{id}
// })

// // 获取歌曲img的接口函数
// export const reqMusicImg = (ids)=>axios.get('/song/detail',{
//     params:{ids}
// })


// // 登录接口函数
// export const reqLogin = (logininfo)=>axios.post('/login/cellphone',logininfo)

// // 退出接口函数
// export const reqLogout = ()=>axios.get('/logout')

// // 刷新登录状态
// export const reqLoginStatus = ()=>axios.get('/login/status')



// // 获取用户歌单的接口函数   这个函数在NavBar中调用  页面初始化logininit
// export const reqUserMusicList = (uid)=>axios.get(`/user/playlist?uid=${uid}`)

// // 获取歌单详情
// export const reqUserMusicDetail = (id)=>axios.get(`/playlist/detail?id=${id}`)


// // banner 轮播 1：安卓  2：iphone
// export const reqBanner = ()=>axios.get(`/banner?type=1`)


// // 飙升榜( 3 ) && 热搜榜( 1 )  抖音 （ 26 ）
// export const reqTopList = (idx)=>axios.get('/top/list',{
//     params:{idx}  
// })
