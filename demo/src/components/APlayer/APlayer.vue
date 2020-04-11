<template>
<div class="APlayer">
  <div class="aplay-controls">
    <div class="music-image">
      <img :src="srcImg" alt />
      <van-icon name="play-circle-o" class="play-btn" v-show="toggleState" @click="handleClick" />
      <van-icon name="pause-circle-o" class="play-btn play-btn-active" v-show="!toggleState" @click="handleClick" />
    </div>
    <div class="other-content">
      <div class="title">
        <h3>
          {{sgtitle}}
          <span v-show="src">-</span>
          <span>{{sgname}}</span>
        </h3>
        <div class="progress-time">
          <span class="current">{{currentTime || "00:00:00"}}</span> /
          <span class="total">{{duration || "00:00:00"}}</span>
        </div>
      </div>

      <div class="progress" @click="handleMoveProgress">
        <div class="progress-bar">
          <div class="progress-bar-active"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- 原生标签 -->
  <audio :src="src" class="audio-tag" autoplay @canplay="handleCanplay" @timeupdate="handleTimeupdate"></audio>
</div>
</template>

<script>
import {
  mapState
} from "vuex";
export default {
  name: "APlayer",
  data: function() {
    return {
      toggleState: true,
      src: "", // 歌曲的src
      srcImg: "", // 图片的src
      sgtitle: "", // 歌名
      sgname: "", // 歌手
      duration: "", // 总时长
      currentTime: "", // 当前时长

    };
  },
  created() {
    // 点击播放要做的事情 
    this.$eventBus.$on("bofang", () => {
      let $ = select => document.querySelector(select);
      // console.log(this.musicUrl)

      // 一开始播放第0项 设置src
      $("audio").src = this.musicUrl[0];
      // console.log(this.tracks)

      // 设置歌手信息和图片
      this.srcImg = this.tracks[0].al.picUrl
      this.sgtitle = this.tracks[0].name
      this.sgname = this.tracks[0].ar[0].name

      // 开始播放
      $("audio").play();

      // 歌曲播放完毕触发
      $("audio").addEventListener("ended", () => {
        let result = $("audio").src; // 获得播放的src
        // console.log(result);

        // 根据src来找出该src在数组中的第几项
        let result1 = this.musicUrl.findIndex(item => item === result)
        // console.log(result1)
    
        // 根据第几项之后+1就能得到数组的下一项 
        $('audio').src = this.musicUrl[result1+1]

        // 设置下一首歌手信息和图片
        this.srcImg = this.tracks[result1+1].al.picUrl
        this.sgtitle = this.tracks[result1+1].name
        this.sgname = this.tracks[result1+1].ar[0].name

        // 播放下一首
        $('audio').play()
      });
    });
  },
  mounted() {
    let $ = $=>document.querySelector($)
    this.oAudio = $('audio')
    this.progressBar = $('.progress-bar')
    this.barActive = $('.progress-bar-active')
  },
  computed: {
    ...mapState("Search", ["songdata"]),
    ...mapState("Search", ["songdetail"]),

    // 点击播放全部歌曲
    ...mapState("PlayDetail", ["musicUrl"]), // 播放歌曲的全部url组成的数组
    ...mapState('PlayDetail',['tracks'])  //  播放歌曲的全部歌手信息 就是没有歌曲的url
  },
  watch: {
    "$store.state.Search.songdata": {
      handler() {
        this.src = this.songdata.url;
      }
    },
    "$store.state.Search.songdetail": {
      handler() {
        this.srcImg = this.songdetail.al.picUrl
        this.sgtitle = this.songdetail.name
        this.sgname = this.songdetail.ar[0].name
      }
    }
  },
  methods: {
    // 底部点击的播放按钮
    handleClick() {
      // 切换显示控件 获取到数据才切换
      if (this.sgname) {
        this.toggleState = !this.toggleState;
        if (!this.toggleState) {
          // 如果是false （暂停）
          this.oAudio.play(); // 那么就播放
        } else {
          this.oAudio.pause();
        }
      }
    },

    // 当视频/音频 加载好会触发回调函数
    handleCanplay() {
      // 切换图标
      this.toggleState = false;
      // 设置视频的总时间
      this.duration = this.handleTime(this.oAudio.duration);
    },

    // 当视频的播放时间变化时 会触发
    handleTimeupdate() {
      // 获取当前歌曲播放的时间
      this.currentTime = this.handleTime(this.oAudio.currentTime);
      /*
       * 时间与进度条的关系
       *   duration    --   7.5rem
       *  currentTime  --    x(滑块的宽度)
       */
      // 获取总进度条的宽度
      this.progressBarWidth = this.progressBar.clientWidth;
      // console.log(this.progressBar.clientWidth,this.oAudio.currentTime,this.oAudio.duration)

      // 设置歌曲播放时候滑块的宽度
      let Activewidth =
        (this.progressBarWidth * this.oAudio.currentTime) /
        this.oAudio.duration;
      this.barActive.style.width = Activewidth + "px";
      // console.log( this.barActive.style.width)
    },

    // 把progress-bar-active和progress-bar的点击事件委托给父元素 progress
    handleMoveProgress(e) {
      // console.log(e.target)
      // console.log(e.offsetX)
      /**
       *    点击的位置的宽度       x(时间)
       *    总长度7.5rem           总时长
       */
      let NumberCurrentTime =
        (e.offsetX * this.oAudio.duration) / this.progressBarWidth;
      // 点击后修改播放器的时间,事件发生变化 那么currentTime也变化
      this.oAudio.currentTime = NumberCurrentTime;
    },

    //处理时间
    handleTime(time) {
      //1小时 = 3600s
      var h = Math.floor(time / 3600); //小时
      var m = Math.floor((time % 3600) / 60); //分钟
      var s = Math.floor(time % 60);
      return this.toTwo(h) + ":" + this.toTwo(m) + ":" + this.toTwo(s);
    },

    // 一位数字变成两位数字  1 -->  01
    toTwo(num) {
      return num < 10 ? "0" + num : num;
    }
  }
};
/**
 *  事件车
 *  在aplayer组件的created中绑定一个xxx事件 在searchcontent组件触发这个事件
 *  在vue中所有的原生事件都可以使用@来监听，比如原生的onclick="onClickHandel"
 *  就把on改成@  @click="onClickHandel"  onplay也是一样的，用@play就可以了
 *
 *
 */
</script>

<style scoped lang="less">
.audio-tag {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 39;
}

.APlayer {
  font-size: 0.45rem;
  .aplay-controls {
    width: 100%;
    height: 2.1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 1;
    .music-image {
      width: 20%;
      background-color: rgba(59, 67, 55);
      img {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .play-btn {
        position: absolute;
        left: 4%;
        top: 24%;
        font-size: 1.2rem;
        color: #fff;
        z-index: 999;
      }
    }
    .other-content {
      position: relative;
      width: 80%;
      background-color: #fff;
      .title {
        height: 1.6rem;
        padding-left: 0.2rem;
        padding-right: 0.1rem;
        overflow: hidden;
        h3 {
          font-size: 0.38rem;
          display: inline-block;
          color: #000;
          line-height: 0.45rem;
          span {
            font-size: 0.35rem;
            color: #888;
          }
        }
        .progress-time {
          margin-top: 0.1rem;
          font-size: 0.32rem;
        }
      }
      .progress-bar {
        position: relative;
        bottom: 0rem;
        left: 3%;
        margin-top: 0.135px;
        width: 7.5rem;
        height: 0.2rem;
        background-color: #e2e2e2;
        overflow: hidden;
        .progress-bar-active {
          position: relative;
          width: 0px;
          height: 100%;
          background-color: #ff6700;
          border-right: 5px solid #ccc;
          .progress-scroll {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>