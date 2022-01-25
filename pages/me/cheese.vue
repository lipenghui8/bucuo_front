<!-- 关于作者 -->
<template>
  <view class="wrap">
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">芝士币交易所</block>
    </cu-custom>
    <view class="about">

      <canvas canvas-id="bubble" :style="'width:' + width + 'px;height:' + height + 'px'" class="like-fx"></canvas>
      <like-fx ref="likeFx" :width="width" :height="height"></like-fx>
      <view class="topContent">
        <view class="topLeft">
          <view style="font-size: 40rpx;font-weight: bold;">欢迎来到</view>
          <view style="margin-top: 20rpx;font-size: 40rpx;font-weight: bold;">芝士币交易所！</view>
        </view>
        <view class="topRight">
          <view class="gold">
            <image style="width: 50rpx;height: 50rpx;margin-top: 20rpx;" src="/static/me/icon/credit.png"></image>
            <text style="margin-top: 30rpx;margin-left:10rpx;font-weight: bold;">{{65}}</text>
          </view>
          <view class="record">交易记录</view>
        </view>
      </view>
    </view>

    <view class="vip">
      <view class="middleContent" v-for="item in vipData" :key="item.id">
        <view class="mItem">
          <image v-show="key!=2" :src="chooseFalse" style="width: 100rpx;height: 100rpx;"></image>
          <image v-show="key==2" :src="chooseTrue" style="width: 100rpx;height: 100rpx;"></image>
          <view class="itemRight">
            <view class="recordNum">{{item.cheeseNum}}芝士币</view>
            <view style="font-size:30rpx;font-weight:600;margin-left: 10rpx;margin-top: 3rpx;">{{item.info}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">立即兑换</view>
  </view>

  <!-- <button class='' open-type="contact">
        <image src='../../static/logo.png' class='share-img png round shadow-lg bg-white' mode='aspectFit'>
        </image>
      </button> -->



</template>

<script>
  import LikeFx from '@/components/likeFx/likeFx.vue'
  export default {
    components: {
      LikeFx
    },
    data() {
      return {
        animation_timer: null, // 动画定时器
        width: 375,
        height: 1920,
        chooseFalse:'/static/me/icon/gou_false.png',
        chooseTrue:'/static/me/icon/gou_true.png',
        vipData:[
          {
            id:1,
            cheeseNum:50,
            info:'1个月星会员'
          },
          {
            id:2,
            cheeseNum:30,
            info:'1个经验会员'
          },
          {
            id:3,
            cheeseNum:15,
            info:'7天星会员'
          },
          {
            id:4,
            cheeseNum:10,
            info:'1个经验会员'
          },
        ]
      }
    },
    onLoad() {
      this._startLikeAnimation();
    },
    onShareAppMessage() {
      return {
        title: '快来和我们玩转软件开发吧～',
        path: '/pages/about/about?from=share'
      }
    },
    methods: {
      _startLikeAnimation() {
        this.animation_timer = setInterval(() => {
          this.$refs.likeFx.likeClick()
        }, 300)
      }
    }
  }
</script>

<style scoped>
  .topContent {
    width: 650rpx;
    height: 300rpx;
    border-radius: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    margin-top: 50rpx;
    padding: 30rpx 40rpx;
    color: #fff;
    background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
    /* background: linear-gradient(-120deg, #0976ea, #c471f5, #f956b6, #ea7e0a); */
    animation: gradientBG 15s ease infinite;
  }

  .topLeft {
    margin-top: 50rpx;
  }

  .topRight {
    margin-left: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .gold {
    display: inline-flex;
    justify-content: flex-end;
  }

  .record {
    margin-top: 130rpx;
    font-size: 30rpx;
  }
  .vip{
    width: 650rpx;
    margin: 0 auto;
    margin-top: 50rpx;
    border-radius: 50rpx;
    box-shadow: 0rpx 0rpx 30rpx -10rpx rgb(153, 153, 153);
  }
  .middleContent {
    width: 650rpx;
    padding: 10rpx 40rpx;
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    margin: 0 auto;
    background-color: #FDFDFD;
  }

  .mItem {
    width: 600rpx;
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .itemRight {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20rpx;
    border-radius: 50rpx;
    box-shadow: 0rpx 0rpx 20rpx -10rpx rgb(153, 153, 153);
    width: 450rpx;
    height: 60rpx;
    margin-left: 20rpx;
    background-color: #fff;
  }

  .recordNum {
    width: 150rpx;
    height: 40rpx;
    border-radius: 50rpx;
    color: #FFF;
    background-color: #FF0000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom {
    width: 650rpx;
    height: 100rpx;
    border-radius: 100rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    background-color: blue;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    font-weight: bold;
  }

  .edit-fixed {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1024;
    box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
  }

  .detail-imgs image {
    width: 100%;
    float: left;
    /* height:400rpx; 不定高了*/
    border: 0;
    padding: 0;
    margin: 0
  }

  .share-img {
    position: fixed;
    padding: 10rpx;
    width: 100rpx;
    height: 100rpx;
    /* top: 680rpx; */
    bottom: 200rpx;
    right: 20rpx;
    z-index: 1024;
    opacity: 0.8;
    box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.3);
    border: none;
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    width: 100%;
    position: absolute;
    text-align: center;
  }

  .like-fx {
    position: fixed;
    right: 0;
    z-index: 1024;
    pointer-events: none;
    /* background-color: red; */
  }

  .wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
    background-color: #FFF;
  }
</style>