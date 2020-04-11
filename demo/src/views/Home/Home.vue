<template>
  <div class="home">
    <div class="home-wrap">
      <div class="top">
        <div class="bg">
        </div>
        <div class="login-wrap">
          <ul>
            <li>
              <img :src="imgsrc" v-if="imgsrc" />
              <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" v-else class="icon" />
            </li>
            <li>
              <span>{{nickname || "未登录"}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <div class="wrap">
          <h2>我的歌单列表</h2>
          <div class="unlogin_text" v-show="playListArr.length===0">
            登录获取你的专属歌单喲~
          </div>
          <ul>
            <li v-for="item in playListArr" :key="item.id" @click="handleIntoPlayListDetail(item.id)">
                <div class="img">
                <img :src="item.coverImgUrl"/>
              </div>
              <div class="text">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("LoginInit", ["nickname"]),
    ...mapState("LoginInit", ["imgsrc"]),
    ...mapState("LoginInit", ["playListArr"]),
  
  },
  methods: {
    ...mapActions("PlayDetail",["asyncUserMusicDetail"]),

    // 点击歌单获取歌单的歌曲
    handleIntoPlayListDetail(id){
      // console.log(id)
      this.asyncUserMusicDetail(id)
      this.$router.push('/playdetail')
    }
  }
};
/**
 * 登录成功后需要发起请求获取歌单，这个在Navbar组件中
 * 根据playListArr得到数据遍历在页面上,数据中有id 这是歌单id，根据这个当点击的时候发起网络请求
 * 
 *
 */
</script>

<style lang="less" scoped>
.home-wrap {
  font-size: 0.45rem;
  width: 100%;
  .top {
    width: 100%;
    height: 4rem;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -5;
      background:url('../../assets/images/bgc1.jpg') repeat-y;
    }
    .login-wrap {
      width: 100%;
      ul {
        display: flex;
        line-height: 2rem;
        width: 100%;
        box-sizing: border-box;
        height: 3.2rem;
        padding: 0.3rem;
        li {
          width: 3.5rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 2rem;
          }
          span {
            padding-left: 0.5rem;
          }
        }
        li:nth-child(2) {
          width: 100%;
          span {
            color: #fff;
            font-size: 0.4rem;
            font-weight: 600;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    .wrap {
      width: 100%;
    //   height: 10rem;
      box-sizing: border-box;
    //   background: pink;
      padding: 10px 10px 90px 10px;
      .unlogin_text{
          font-size: 0.4rem;
      }
      h2 {
        font-weight: 600;
        line-height: 46px;
      }
      .a {
        line-height: 1rem;
        margin-top: 0.5rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 50%;
          height: 2.34rem;
        //   background-color: blueviolet;
          font-size: 0.37rem;
          .img {
            display: inline-block;
            width: 1.8rem;
            overflow: hidden;
            vertical-align: middle;
            img {
              width: 100%;
              border-radius: 16px;
            }
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            width: 2.5rem;
          }
        }
      }
    }
  }
}
</style>