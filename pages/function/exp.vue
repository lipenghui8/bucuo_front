<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">经验</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box ">
				<u-subsection :list="itemList" :current="currentItem" @change="changeItem"></u-subsection>
			</view>		
			<view class="grid margin-bottom text-center col-4">
				<view class="content" @click="useOutClickSide">
					<easy-select 
					ref="easySelect" 
					size="auto"  
					:value="selecValue1" 
					@selectOne="selectOne"
					:options="condition1"
					></easy-select>
				</view>
				<view class="content" @click="useOutClickSide">
					<easy-select 
					ref="easySelect" 
					size="auto" 
					:value="selecValue2"
					@selectOne="selectOne"
					:options="condition2"
					></easy-select>
				</view>
				<view class="content" @click="useOutClickSide">
					<easy-select 
					ref="easySelect" 
					size="auto" 
					:value="selecValue3" 
					@selectOne="selectOne"
					:options="condition3"
					></easy-select>
				</view>
				<view class="content" @click="useOutClickSide">
					<easy-select 
					ref="easySelect"  
					size="auto" 
					:value="selecValue4" 
					@selectOne="selectOne"
					:options="condition4"
					></easy-select>
				</view>												
			</view>
			<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box" style="margin-bottom:60rpx">
					<view class="cu-card article">
						<view 
						class="cu-item shadow"
						style="padding-bottom: 0;"
						@click="goProject(item.id-1)"
						v-for="(item, index) in articleList" 
						:key="index">
							<view class="content" style="padding: 0;">
								<u-row class="bg-gradual-blue round" style="width: 30rpx;">
									<u-col >
									</u-col>
								</u-row>								
								<view class="desc">
									<view class="flex solid-bottom padding justify-start">
										<view class="text-black text-bold">{{item.Title}}</view>
										<view>{{item.likeNum}}</view>
									</view>
									<view class="text-content" style="margin-left:28rpx">
										<text>{{ item.Content}}</text>
									</view>
									<view class="solid-bottom text-df padding">ID:{{ item.PublisherID}}</view>
								</view>
								<view class="basis-xs justify-center">
									<view class=" justify-center round cu-item" style="height: 50%;">
										<view style="margin-top: 23%; display: flex;">
											<view>
											<u-image mode="widthFix" :src="iconUrl" width="22px" height="22px"></u-image>											</view>
											<view class="cu-tag line-red">12</view>
										</view>
									</view>
									<view class=" cu-item" style="height: 20%;">
										<view class="cu-tag bg-gradual-green">{{item.Labels[0].Content}}</view>
									</view>
									<view class=" cu-item" style="height: 20%;">
										<view class="cu-tag bg-gradual-pink">{{item.Labels[1].Content}}</view>	
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</view>
			</scroll-view>
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
      articleList: [
        {
          Title: "学渣学有机",
          Content:
            "我喜欢你，有机会吗？有机不会！有机和无机堪称是化学中的拦路虎，作为一名学渣，我的有机考了92分，一个还不错的分数。",
          Column: "课程考试",
          Labels: [
            {
              Content: "化学院",
            },
            {
              Content: "药学院",
            },
          ],
          PublisherID: "000053",
          id: 6,
        },
        {
          Title: "99分《人力资源管理》纲要",
          Content:
            "1.人力资源2.人口资源、人力资源、人才资源 3.人力资源与人力资本的关系4.人力资源的性质5.人力资源的作用",
          Column: "课程考试",
          Labels: [
            {
              Content: "商学院",
            },
            {
              Content: "经济学院",
            },
          ],
          PublisherID: "000013",
          id: 1,
        },
        {
          Title: "Java、计算机网络基础高分经验",
          Content:
            "作为一名商学院的学生，并且还是一个计算机小白，对一门计算机语言Java能考到90+，这算是相当不容易了。但是如果掌握了恰当的方法，就期末考试而言，还是可以在短时间内取得好的成绩的。",
          Column: "课程考试",
          Labels: [
            {
              Content: "计院",
            },
            {
              Content: "商学院",
            },
          ],
          PublisherID: "000052",
          id: 2,
        },
        {
          Title: "没想象得那么难系列：统计学",
          Content:
            "统计学里面有特别多的公式需要记忆，如果这些公式记不下来的话，考场上是无法解题的。除了平时上课好好听课之外，我在期末时也进行了一定的突击。",
          Column: "课程考试",
          Labels: [
            {
              Content: "统计学",
            },
            {
              Content: "期末复习",
            },
          ],
          PublisherID: "000220",
          id: 22,
        },
      ],
      itemList: ["课程考试", "竞赛考证", "考研保研", "新生守则", "其他经验"],
      tabsHeight: 0,
      dx: 0,
      loadStatus: ["loadmore", "loadmore", "loadmore", "loadmore"],
      typeList: ["所有", "参与", "管理"],
      currentType: 0,
      currentItem: 0,
      selecValue1: "全部",
      selecValue2: "不限",
      selecValue3: "最新",
      selecValue4: "学院",

      condition1: [
        {
          value: "选项1",
          label: "全部",
        },
      ],
      condition2: [
        {
          value: "选项1",
          label: "不限",
        },
      ],
      condition3: [
        {
          value: "选项1",
          label: "最新",
        },
      ],
      condition4: [
        {
          value: "选项1",
          label: "学院",
        },
      ],
    };
  },
  mounted() {
    // this.getOrderList(0);
    // this.getData();
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
    getData() {
      console.log("数据加载");
      let opts = {
        url: "https://bucuo.liph.top/data/exp/exp.json",
        method: "get",
      };
      uni.showLoading({
        title: "加载中",
      });
      request.httpRequest(opts).then((res) => {
        console.log(res);
        uni.hideLoading();
        if (res.statusCode == 200) {
          this.articleList = res.data.data;
        } else {
        }
      });
    },
    goProject(id) {
      uni.navigateTo({
        url: "../../pages/project/project?proId=" + id,
      });
    },
    selectOne(options) {
      this.selecValue = options.label;
    },
    useOutClickSide() {
      this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions();
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
    // 总价
    totalPrice(item) {
      let price = 0;
      item.map((val) => {
        price += parseFloat(val.price);
      });
      return price.toFixed(2);
    },
    // 总件数
    totalNum(item) {
      let num = 0;
      item.map((val) => {
        num += val.number;
      });
      return num;
    },
    // tab栏切换
    changeItem(index) {
      this.currentItem = index;
      //	this.getOrderList(index);
    },
    // 类型切换
    changeType(index) {
      console.log(index);
      this.currentType = index;
      this.getOrderList(index);
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

