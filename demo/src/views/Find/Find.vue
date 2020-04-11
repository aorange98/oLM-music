<template>
  <div class="find">
    <div class="find_wrap">
      <div class="swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image.pic" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="recommend">
      <ul class="recommend-wrap">
        <li  v-for="item in generalMessage" :key="item.id" @click="handleClick(item.id)">
          <div class="img">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="content">
            <div class="content-wrap" v-for="(a,b) in item.tracks.slice(0,3)" :key="a.id">
              <div>{{b+1}}.</div>
              <div class="right">{{a.name}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Find",
  created() {
    this.asyncBanner();
    // 得到find中的三个榜单信息 
    this.asyncGetTopList([1,3,26])

  },
  computed: {
    ...mapState("Find", ["images"]),
    ...mapState("Find",["recommend"]),
    ...mapState("Find",["com_recommend"]),
    ...mapState("Find",["generalMessage"]),
  },
  methods: {
    ...mapActions("Find", ["asyncBanner"]),
    ...mapActions("Find",['asyncGetTopList']),

    handleClick(id){
      const [fast,hot,douyin] = this.generalMessage

      if(fast.id===id){  // 云音乐飙升榜
        this.pushFn(fast)
      }else if(hot.id===id){  // 云音乐热歌榜
        this.pushFn(hot)
      }else{  // 每日推荐
        this.pushFn(douyin)
      }
    },
    pushFn(data){
      this.$router.push({
        name:"rankingplaydetail",
        params:{data}
      })
    }
  }
};
</script>


<style lang="less" scoped>
.find_wrap {
  padding: 0.53rem 0.26rem 0;
  box-sizing: border-box;
  height: 5rem;
  .swiper {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 4rem;
      border-radius: 16px;
    }
  }
}

.recommend {
  font-size: 0.45rem;
  width: 100%;
  // height: 13rem;
  box-sizing: border-box;
  padding: 0.4rem 0.4rem 2rem 0.4rem;
  // background-color: antiquewhite;
  .recommend-wrap{
    width: 100%;
    // background-color: cadetblue;
    li{
      display: flex;
      width: 100%;
      height: 2.5rem;
      margin-top: 0.3rem;
      font-size: 0.4rem;
      .img{
        width: 28%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
      .content{
        width: 67%;
        padding-top: 0.2rem;
        .content-wrap{
          display: flex;
          div{
            font-size: 0.37rem;
            color: #363636;
            padding-left: 0.35rem;
            line-height: 0.7rem;
          }
          .right{
            padding-left: 0.2rem;
          }
        }
        
      }
    }
    li:first-child{
      margin-top: 0;
    }
  }
}
</style>