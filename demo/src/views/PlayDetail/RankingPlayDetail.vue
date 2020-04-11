<template>
    <div class="play-detail">
        <div class="header">
            <div class="header-back" @click="handlegoBack">
                <van-icon name="arrow-left" />
                <div>返回</div>
            </div>
            <div class="header-content">
                <div class="img">
                    <img :src="coverImgUrl" alt />
                </div>
                <div class="title">
                    <div>{{name}}</div>
                </div>
            </div>
        </div>

        <div class="playlist-wrap">
            <div class="playall" @click="handleListenPlayAll">
                <van-icon name="play-circle-o" />
                <div>播放全部</div>
            </div>

            <div class="search-list">
                <ul class="search-wrap">
                    <li class="search-item" v-for="(item,index) in tracks" :key="item.id" @click="handleClick(item.id)">
                        <div class="left">{{index+1}}</div>
                        <div class="right">
                            <div class="sgname">{{item.name}}</div>
                            <div class="sginfo">{{item.ar[0].name}}</div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: "PlayDetail",
    mounted() {
        let $ = select => document.querySelector(select);
        let h = document.documentElement.clientHeight;
        $(".play-detail").style.height = h + "px";
    },
    computed:{
        coverImgUrl(){
            return this.$route.params.data.coverImgUrl
        },
        name(){
            return this.$route.params.data.name
        },
        tracks(){
            return this.$route.params.data.tracks
        }
    },
    methods: {
        ...mapActions('Search',['asyncSearchMusicUrl']),
        ...mapActions('Search',['asyncSearchMusicImg']),
        ...mapActions("PlayDetail",['asyncRankingMusicUrl']),

        handlegoBack(){
            this.$router.back()
        },
        // 点击歌单的某一条歌曲 发起请求
        handleClick(id){
            console.log(id)
            this.asyncSearchMusicUrl(id)
            this.asyncSearchMusicImg(id)
        },
        // 点击全部播放
        async handleListenPlayAll(){
            // 修改播放源为排行榜的数据 发起请求获得数据
            const {data} = this.$route.params
            // console.log(this.asyncRankingMusicUrl(data))  // promise

            await this.asyncRankingMusicUrl(data)   // 没有返回值 作用是为了等

            this.$eventBus.$emit('bofang')     
        }
    }
};

/**
 * 这个组件就是存放歌单的组件，也可以理解为通用页
 * item.id 是歌曲的id
 */
</script>

<style lang="less" scoped>
.play-detail {
    position: absolute; 
    // top: 50px;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 0.45rem; 
    // background-color:pink;
    z-index: 1;
    .header {
        width: 100%;
        height: 7rem;
        background-image: linear-gradient(#e66465, #9198e5);
        color: #fff;
        .header-back {
            width: 100%;
            line-height: 1.4rem; 
            // background-color: #e66465;
            font-size: 0.7rem;
            i {
                display: inline-block;
                vertical-align: middle;
                margin-left: 10px;
            }
            div {
                display: inline-block;
                font-size: 0.45rem;
            }
        }
        .header-content {
            display: flex;
            padding: 15px;
            height: 4rem;
            .img {
                width: 50%;
                height: 100%; 
                // background-color: #9198e5;
                img {
                    width: 85%;
                    height: 94%;
                    border-radius: 0.2rem;
                }
            }
            .title {
                width: 50%;
                height: 100%;
                // background-color: #e66465;
            }
        }
    }
    .playlist-wrap {
        position: relative;
        top: -4%;
        left: 0%;
        min-height: 8rem;
        padding: 0.4rem 0.4rem 2rem 0.4rem;
        background-color: #e66465;
        background-color: #fff;
        border-radius: 0.6rem;
        .playall {
            display: flex;
            align-items: center;
            line-height: 1rem;
            i{
                font-size: 0.7rem;
            }
            div{
                margin-left: 0.3rem;
            }
        }
        .search-list {
            width: 100%; 
            // background-color: rgb(252, 252, 253);
            color: #000;
            .search-wrap {
                padding: 10px 10px;
                .search-item {
                    display: flex;
                    align-items: center;
                    height: 1.5rem; 
                    border-bottom: 1px solid rgb(229, 226, 226);
                    .left{
                        width: 0.8rem;
                    }
                    .right{
                        padding-left: 0.2rem;
                    }
                    .sgname {
                        margin-top: 0.2rem;
                        font-size: 0.43rem;
                    }
                    .sginfo {
                        color: #888;
                        padding-top: 0.2rem;
                        font-size: 0.32rem;
                    }
                }
            }
        }
    }
}
</style>