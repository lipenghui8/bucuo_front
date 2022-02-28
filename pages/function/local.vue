<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">当地</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="itemList" :current="current" swiperWidth="750" :is-scroll="false" @change="changeItem"></u-tabs-swiper>
				<u-tabs-swiper swiperWidth="750" :is-scroll="false"
				:list="typeList" 
				:current="currentType" 
				@change="changeType"
				></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" style="margin-bottom:60rpx">
							<view class="cu-card article">
								<view 
								class="cu-item shadow"
								@click="goProject(item.id-1)"
								v-for="(item, index) in articleList_1" 
								:key="index">
									<view class="content">
										<image class="imgStyle" style="border-radius:10rpx" :src="item.banner" ></image>
										<view class="desc">
											<view class="flex justify-between" style="padding-right:15rpx;align-items:center">
												<view class="text-black text-bold" style="padding:0">{{item.title}}</view>
												<view class="likeNum">
													<u-image mode="widthFix" :src="iconUrl" width="22px" height="22px" style="margin-right:10rpx"></u-image>	
													<view>{{item.likeNum}}</view>
												</view>
											</view>
											<view class="text-content"> {{ item.content }}</view>
											<!-- <view> {{ item.time }}</view> -->
										</view>
									</view>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" style="margin-bottom:60rpx">
							<view class="cu-card article">
								<view 
								class="cu-item shadow"
								@click="goProject(item.id-1)"
								v-for="(item, index) in articleList_2" 
								:key="index">
									<view class="content">
										<image class="imgStyle" style="border-radius:10rpx" :src="item.banner" ></image>
										<view class="desc">
											<view class="flex justify-between" style="padding-right:15rpx;align-items:center">
												<view class="text-black text-bold" style="padding:0">{{item.title}}</view>
												<view class="likeNum">
													<u-image mode="widthFix" :src="iconUrl" width="22px" height="22px" style="margin-right:10rpx"></u-image>	
													<view>{{item.likeNum}}</view>
												</view>
											</view>
											<view class="text-content"> {{ item.content }}</view>
											<!-- <view> {{ item.time }}</view> -->
										</view>
									</view>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第三页 -->
				<swiper-item class="swiper-item">
					<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" style="margin-bottom:60rpx">
							<view class="cu-card article">
								<view 
								class="cu-item shadow"
								@click="goProject(item.id-1)"
								v-for="(item, index) in articleList_3" 
								:key="index">
									<view class="content">
										<image class="imgStyle" style="border-radius:10rpx" :src="item.banner" ></image>
										<view class="desc">
											<view class="flex justify-between" style="padding-right:15rpx;align-items:center">
												<view class="text-black text-bold" style="padding:0">{{item.title}}</view>
												<view class="likeNum">
													<u-image mode="widthFix" :src="iconUrl" width="22px" height="22px" style="margin-right:10rpx"></u-image>	
													<view>{{item.likeNum}}</view>
												</view>
											</view>
											<view class="text-content"> {{ item.content }}</view>
											<!-- <view> {{ item.time }}</view> -->
										</view>
									</view>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="u-search-box" style="position: fixed; bottom: 0rpx; width: 100%;">
				<view class="u-search-inner">
					<u-icon name="search" color="#909399" :size="28"></u-icon>
					<input class=" u-search-text" 
					placeholder="开封爬楼推荐地点"
					style="width: 100%;"
					></input>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from "@/common/api.js";
import vip from "@/components/vip/vip.vue";

export default {
  name: "local",
  components: {
    vip,
  },
  data() {
    return {
      percent: 50,
      activeColor: "#0081ff",
      striped: false,
      stripedActive: false,
      iconUrl: require("@/static/icons/aixin.png"),

      avatar: [
        "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
        "https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg",
        "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
        "https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg",
      ],

      orderList: [[], [], [], []],
      articleList_1: [
        {
          id: 20,
          title: "星光天地小猪查理",
          banner: "https://bucuo.liph.top/data/index/20.png",
          time: 60,
          content:
            "这是我吃过比较实惠又好吃的烤肉了，肉的种类很多，而且很新鲜，肉本身就是腌制过的不用蘸料就很有味道，再配一个烤肉技术一流的同伴一起去吃，就能吃到鲜嫩多汁的牛肉小方和外焦里嫩的鸡翅，想想就要流口水了～",
          likeNum: 70,
        },
        {
          id: 21,
          title: "私房椒麻鸡",
          banner: "https://bucuo.liph.top/data/local/food/banner2.png",
          time: 60,
          content:
            "创业中心的椒麻鸡yyds！椒麻鸡微麻鲜香，肉片肉质细嫩，味道香浓，菜色泽诱人，独具风味，喜欢川菜的朋友就千万不要错过这道椒麻鸡",
          likeNum: 136,
        },
        {
          id: 19,
          title: "现炒盖浇饭",
          banner: "https://bucuo.liph.top/data/local/food/banner3.png",
          time: 60,
          content:
            "要说南苑餐厅好吃的东西还是蛮多的，但介于个人口味偏清单，不能吃辣的，不喜欢太油太咸的，而且食量小，所以吃饭的时候还是有点挑剔的。",
          likeNum: 521,
        },
        {
          id: 5,
          title: "梅利烤鸭店",
          banner: "https://bucuo.liph.top/data/index/5.png",
          time: 60,
          content:
            "新河大附近梅丽烤鸭店实惠，舒适是这家店的特色，因此去这家店吃饭的中老年人特别多，他家的饭菜量很足，味道也很不错，吃起来也让人觉得很舒服。",
          likeNum: 163,
        },
      ],
      articleList_2: [
        {
          id: 16,
          title: "荒芜（禹王台公园）",
          banner: "https://bucuo.liph.top/data/local/play/banner1.png",
          time: 60,
          content:
            "如果要在开封找出荒芜的地方，那必定是禹王台公园。没有水的河流，荒芜。宽阔的河道里，满是荒草。我看不到水的流动，我也看不到，在荒草堆里有希望诞生。",
          likeNum: 300,
        },
        {
          id: 23,
          title: "沉浸（汴京公园）",
          banner: "https://bucuo.liph.top/data/local/play/banner2.png",
          time: 60,
          content:
            "这里的园太多，清明上河园有太多的人，翰园有太多的碑。这里的公园也很多，龙亭公园的皇宫尽显威严，禹王台公园的松柏郁郁葱葱。",
          likeNum: 136,
        },
        {
          id: 10,
          title: "七家电影院测评",
          banner: "https://bucuo.liph.top/data/local/play/banner3.png",
          time: 60,
          content:
            "东京电影城。在小宋城里，距离校区较近。价格便宜，但是价格与体验太成正比。首先是音效，声音很小，还很垃圾",
          likeNum: 521,
        },
        {
          id: 15,
          title: "万岁山武侠城",
          banner: "https://bucuo.liph.top/data/local/play/banner4.png",
          time: 60,
          content:
            "这是一个武侠主题城，里面以水浒传的题材为主，快活林、十字坡、水浒街、大宋武馆、城寨沙场等这里都有。",
          likeNum: 163,
        },
      ],
      articleList_3: [
        {
          id: 13,
          title: "花西子散粉",
          banner: "https://bucuo.liph.top/data/index/13.png",
          time: 60,
          content:
            "花西子散粉的散粉扑就超级棒，厚重当中又带着蓬松感，颜值还很高。这款散粉号称空气散粉，粉质很细腻，轻轻一拍就能够看到空气当中飘闪过一缕白烟。当它轻轻地扑在脸上的时候，伴随着淡淡的香味，里面没有添加香精、桃花、山茶花的混合香，很清淡",
          likeNum: 300,
        },
        {
          id: 18,
          title: "鲜风生活",
          banner: "https://bucuo.liph.top/data/index/18.png",
          time: 60,
          content:
            "总体来说是可以偶尔经常光顾一下，他想要的生活产品都有，其实价格的话还是看产品部分还是蛮高的，但是用下来感觉种类非常多挺好的，一次购物体验，关键是里边的服务态度都还不错",
          likeNum: 136,
        },
        {
          id: 4,
          title: "完美日记小细跟口红",
          banner: "https://bucuo.liph.top/data/index/4.png",
          time: 60,
          content:
            "无论薄涂厚涂都很好看，薄涂会明显的感觉到里面带着一丢丢橘色调，有点血橙感的感觉，黄皮的女生可劲儿往前冲，涂在嘴巴上非常显白",
          likeNum: 521,
        },
        {
          id: 7,
          title: "逐本卸妆油",
          banner: "https://bucuo.liph.top/data/index/7.png",
          time: 60,
          content:
            "特别是新出的卸妆油，里面的成分升级到了95%的天然植物油，采取专业乳化配方，涂在脸上，瞬间感觉到乳化，质地如水般清爽，卸妆力也很好，一如既往的卓越",
          likeNum: 163,
        },
      ],
      itemList: [
        {
          name: "美食",
        },
        {
          name: "娱乐",
        },
        {
          name: "生活购物",
        },
      ],
      tabsHeight: 0,
      dx: 0,
      loadStatus: ["loadmore", "loadmore", "loadmore", "loadmore"],
      typeList: [
        {
          name: "最热",
        },
        {
          name: "最新",
        },
        {
          name: "收藏",
        },
      ],
      currentType: 0,
      current: 0,
      swiperCurrent: 0,
    };
  },
  mounted() {
    // this.getData_1();
    // this.getData_2();
    // this.getData_3();
  },
  computed: {
    // 价格小数
    priceDecimal() {
      return (val) => {
        if (val !== parseInt(val)) return val.slice(-2);
        else return "00";
      };
    },
    // 价格整数
    priceInt() {
      return (val) => {
        if (val !== parseInt(val)) return val.split(".")[0];
        else return val;
      };
    },
  },
  methods: {
    getData_1() {
      console.log("数据加载");
      let opts = {
        url: "https://bucuo.liph.top/data/local/food/food.json",
        method: "get",
      };
      uni.showLoading({
        title: "加载中",
      });
      request.httpRequest(opts).then((res) => {
        console.log(res);
        uni.hideLoading();
        if (res.statusCode == 200) {
          this.articleList_1 = res.data.data;
        } else {
        }
      });
    },
    getData_2() {
      console.log("数据加载");
      let opts = {
        url: "https://bucuo.liph.top/data/local/play/play.json",
        method: "get",
      };
      uni.showLoading({
        title: "加载中",
      });
      request.httpRequest(opts).then((res) => {
        console.log(res);
        uni.hideLoading();
        if (res.statusCode == 200) {
          this.articleList_2 = res.data.data;
        } else {
        }
      });
    },
    getData_3() {
      console.log("数据加载");
      let opts = {
        url: "https://bucuo.liph.top/data/local/food/food.json",
        method: "get",
      };
      uni.showLoading({
        title: "加载中",
      });
      request.httpRequest(opts).then((res) => {
        console.log(res);
        uni.hideLoading();
        if (res.statusCode == 200) {
          this.articleList_3 = res.data.data;
        } else {
        }
      });
    },
    goProject(id) {
      uni.navigateTo({
        url: "../../pages/project/project?proId=" + id,
      });
    },
    fetchData() {},
    goClass() {
      uni.showToast({
        title: "没有权限～",
        duration: 2000,
        icon: "none",
      });
    },
    reachBottom() {
      // 此tab为空数据
      if (this.current != 2) {
        this.loadStatus.splice(this.current, 1, "loading");
        setTimeout(() => {
          this.getOrderList(this.current);
        }, 1200);
      }
    },
    // tab栏切换
    changeItem(index) {
      this.swiperCurrent = index;
    },
    // 类型切换
    changeType(index) {
      this.typeCurrent = index;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
  },
};
</script>

<style lang="scss" scoped>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.likeNum {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.imgStyle {
  margin-top: 10rpx;
}
.order {
  width: 710rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 28rpx;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .store {
        margin: 0 10rpx;
        font-size: 34rpx;
        font-weight: bold;
      }
    }
    .right {
      color: $u-type-warning-dark;
      .progressBox {
        width: 150rpx;
        float: right;
      }
    }
  }
  .item {
    display: flex;
    margin: 20rpx 0 0;
    .left {
      margin-right: 20rpx;
      image {
        width: 260rpx;
        height: 190rpx;
        border-radius: 10rpx;
      }
    }
    .content {
      .title {
        font-size: 28rpx;
        line-height: 45rpx;
      }
      .type {
        margin: 6rpx 0;
        font-size: 24rpx;
        color: $u-tips-color;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .delivery-time {
        color: #0081ff;
        font-size: 24rpx;
      }
    }
    .right {
      margin-left: 10rpx;
      padding-top: 20rpx;
      text-align: right;
      .decimal {
        font-size: 24rpx;
        margin-top: 4rpx;
      }
      .number {
        color: $u-tips-color;
        font-size: 24rpx;
      }
    }
  }
  .total {
    margin-top: 20rpx;
    text-align: right;
    font-size: 24rpx;
    .total-price {
      font-size: 32rpx;
    }
  }
  .bottom {
    line-height: 70rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btnBox {
      width: 150rpx;
      display: flex;
      justify-content: space-between;
      .btn {
        line-height: 52rpx;
        width: 140rpx;
        border-radius: 12rpx;
        border: 2rpx solid $u-tips-color;
        font-size: 26rpx;
        text-align: center;
        color: $u-tips-color;
      }
      .evaluate {
        color: $u-type-primary;
        border-color: $u-type-primary;
      }
    }
  }
}
.centre {
  text-align: center;
  margin: 200rpx auto;
  font-size: 32rpx;
  image {
    width: 300rpx;
    border-radius: 50%;
    margin: 0 auto;
  }
  .tips {
    font-size: 24rpx;
    color: #999999;
    margin-top: 20rpx;
  }
  .btn {
    margin: 80rpx auto;
    width: 200rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
</style>

