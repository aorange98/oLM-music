<template>
<div class="navbar">
    <div class="navbar-wrap">
        <div class="left">
            <van-icon name="wap-nav" />
            <van-cell @click="showPopup" class="pop"></van-cell>
            <van-popup v-model="show" position="left" class="pop-on" duration="0.5">
                <ul class="wrap">
                    <li>welcome to OLM</li>
                    <li>
                        <span>手机号</span>
                        <input type="text" v-model="phone" />
                    </li>
                    <li>
                        <span>密码</span>
                        <input type="password" v-model="password" />
                    </li>
                    <li>
                        <van-button type="primary" size="small" round @click="handleLogin">登录</van-button>
                        <van-button type="danger" size="small" round @click="handleLogout">退出</van-button>
                    </li>
                    <li>
                        <div class="attention">OLM轻音乐应使用网易云已经注册过的手机号进行登录</div>
                    </li>
                </ul>
            </van-popup>
        </div>
        <div class="middle">
            <router-link to="/home">我的</router-link>
            <router-link to="/find">发现</router-link>
        </div>
        <div class="right">
            <van-icon name="search" class="search" @click="handleClick" />
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import {Notify} from 'vant'
Vue.use(Notify)

import { mapActions, mapState } from 'vuex';
export default {
    name: "NavBar",
    data() {
        return {
            show: false,
            phone: "",
            password: ""
        };
    },
    created() {
        // 刷新登录状态 每次打开页面判断是否处于登录状态 还要获取歌单
        this.asyncLoginStatus();
        if(document.cookie===""){
            Notify('用户处于未登录状态，请点击左上角登录！')
        }
    },
    computed:{
        ...mapState('LoginInit',['userId'])
    },
    methods: {
        ...mapActions('LoginInit',['asyncLoginStatus']),
        ...mapActions('LoginInit',['asyncLogout']),
        ...mapActions('LoginInit',['asyncLogin']),

        handleClick() {
            // 跳转到搜索页面
            this.$router.push("search");
        },
        showPopup() {
            this.show = true;
        },
        // 点击登录  并且拉取歌单
        handleLogin() {
            this.asyncLogin({phone: this.phone,password: this.password})
            this.show = !this.show

        },
        // 退出登录
        handleLogout(){
            this.asyncLogout()
            Notify('已经成功退出！')
            this.show = !this.show
        },
    }
};
    /**
       * 登陆成功：  /login/cellphone
       * 存储登录账号的这个 id data.account.id    // 291688689
       * 
       * 存储头像的url  data.profile.avatarUrl
       * 存储背景图片   data.profile.backgroundUrl
       * 并且设置url 设置背景 设置头像
       * 
       * 那么下一次登录的时候,向后台发起请求登录状态
       * 
       * 点击登录成功后需要发起请求获取歌单 /playlist?uid= 用户的id
       * 
       * 
       */
</script>

<style lang="less" scoped>
@nav-bgc: #07c160;
@nav-color: #f3f3f3;
.router-link-active {
    color: #fff !important;
    font-size: 20px;
}

.navbar {
    font-size: 16px;
    color: @nav-color;
    background-color: @nav-bgc;
    background: url("../../assets/images/bgc1.jpg");
    .navbar-wrap {
        display: flex;
        line-height: 50px;
        justify-content: space-between;
        min-width: 262px;
        font-size: 26px;
        .left,
        .right {
            width: 10%;
            position: relative;
            i {
                display: block;
                text-align: center;
                line-height: 50px;
            }
            .pop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            .pop-on {
                // 弹出层
                color: #000;
                font-size: 0.4rem;
                height: 100%;
                width: 70%;
                .wrap {
                    text-align: center;
                    margin-top: 4rem;
                    li {
                        button{
                            margin-left:0.5rem;
                        }
                        input {
                            height: 0.5rem;
                            width: 4rem;
                        }
                        .attention {
                            margin: 0.5rem;
                            color: #888;
                            line-height: 0.6rem;
                        }
                    }
                }
            }
        }
        .middle {
            display: flex;
            justify-content: center;
            font-size: 18px;
            width: 58%;
            align-items: center;
            a {
                color: @nav-color;
                padding: 0 18px;
            }
        }
    }
}
</style>
