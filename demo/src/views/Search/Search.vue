<template>
  <div class="search-content">
    <div class="search-part">
      <div class="goback" @click="handleGoback" >
        <van-icon name="arrow-left" />
      </div>
      <div class="search">
        <van-search v-model="keywords" background="#4fc08d" placeholder="请输入搜索关键词" @search="handleClick"/>
      </div>
    </div>
    <!-- 搜索列表 -->
    <transition name="fade">
      <div class="search-list" v-show="songs.length">
        <ul class="search-wrap">
          <li
            class="search-item"
            v-for="item in songs"
            :key="item.id"
            @click="handlesonglist(item.id)"
          >
            <div class="sgname">{{item.name}}</div>
            <div class="sginfo">{{item.artists[0].name}}</div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name: "Search",
  data(){
    return {
      keywords:""
    }
  },
  mounted() {
    let $ = select => document.querySelector(select);
    let h = document.documentElement.clientHeight;
    $(".search-content").style.height = h + "px";
  },

  computed:{
    // 仓库的数据只能仓库修改
    ...mapState('Search',['songs']),
    ...mapState('Search',['songdata']),
    ...mapState('Search',['songdetail']),
  },
  methods: {
    // 映射仓库的Search模块的getSearchKeywords方法为本组件的数据
    ...mapActions('Search',['asyncSearchMusic']),
    ...mapActions('Search',['asyncSearchMusicUrl']),
    ...mapActions('Search',['asyncSearchMusicImg']),

    // 点击/回车搜索 
    async handleClick() {
      // 根据keywords搜索歌曲得到所有歌曲的信息
      this.asyncSearchMusic(this.keywords)
    },

    // 点击歌曲列表
    async handlesonglist(id) {
      // console.log(id)
      // 根据歌曲的id获取音乐 url
      this.asyncSearchMusicUrl(id)
      // 根据歌曲的id获取音乐的img
      this.asyncSearchMusicImg(id)
    },
    handleGoback(){
      this.$router.back()
    }
  }
};
</script>


<style scoped lang="less">
@search-color: #f3f3f3;

.search-content {
  position: absolute;
  // top: -50px;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 0.45rem;
  background-color:@search-color;
  z-index: 2;
  .search-part {
    // 搜索结构
    display: flex;
    justify-content: space-around;
    height: 53px;
    overflow: hidden;
    .goback {
      width: 10%;
      background-color: #14a3b4;
      i {
        display: block;
        text-align: center;
        line-height: 54px;
        color: #000;
        font-size: 25px;
        color: @search-color;
      }
    }
    .search {
      width: 90%;
      line-height: 53px;
      .van-search{
        background-color: #14a3b4!important;
      }
      .input {
        width: 100%;
        height: 100%;
      }
    }
  }

  .search-list {
    // 搜索列表
    width: 100%;
    // height: 300px;
    // margin: 10px auto 0;
    // border-radius: 20px;
    background-color: rgb(252, 252, 253);
    color: #000;
    // transition: 2s;
    .search-wrap {
      padding: 10px 10px;
      .search-item {
        display: block;
        height: 1.3rem;
        // background-color: pink;
        border-bottom: 1px solid rgb(229, 226, 226);
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

.fade-enter-active {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
  transition: 0.4s ease;
}
</style>