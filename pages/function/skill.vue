<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">技能</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="itemList" :current="current" swiperWidth="750" :is-scroll="false" @change="changeItem"></u-tabs-swiper>
				<u-tabs-swiper swiperWidth="750" :is-scroll="false"
				:list="typeList" 
				:current="currentType" 
				@change="changeType"
				v-show="swiperCurrent==0"
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
					placeholder="厨艺提升"
					style="width: 100%;"
					></input>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/common/api.js';
	import vip from "@/components/vip/vip.vue"

	export default {
		name: "local",
		components:{
			vip
		},
		data() {
			return {
				percent: 50,
				activeColor: '#0081ff',
				striped: false,
				stripedActive: false,
				
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				iconUrl: require("@/static/icons/aixin.png"),
				orderList: [[], [], [], []],
				articleList_1: [],
				articleList_2: [],
				articleList_3: [],
				itemList: [
					{
						name: '交换'
					},
					{
						name: '分享'
					},
					{
						name: '求助'
					}
				],
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				typeList: [
					{
						name: '所有'
					},
					{
						name: '参与'
					}
				],
				current: 0,
				currentType: 0,
				swiperCurrent: 0,

			};
		},
		mounted() {
			this.getData_1();
			this.getData_2();
			this.getData_3();
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			getData_1() {
				console.log('数据加载');
				let opts = {
					url:'https://bucuo.liph.top/data/skill/skill_exchange/skill_exchange.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.articleList_1 = res.data.data;
					} else {}
				});
			},getData_2() {
				console.log('数据加载');
				let opts = {
					url: 'https://bucuo.liph.top/data/skill/skill_share/skill_share.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.articleList_2 = res.data.data;
					} else {}
				});
			},getData_3() {
				console.log('数据加载');
				let opts = {
					// url: 'https://bucuo.liph.top/data/skill/skill_exchange/skill_exchange.json',
					url: 'https://bucuo.liph.top/data/skill/skill_share/skill_share.json',

					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.articleList_3 = res.data.data;
					} else {}
				});
			},
			goProject(id) {
				uni.navigateTo({
					url: '../../pages/project/project?proId=' + id
				});
			},
			fetchData(){
				
			},
			goClass(){
				uni.showToast({
					title: '没有权限～',
					duration: 2000,
					icon: 'none'
				});
			},
			// tab栏切换
			changeItem(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// 类型切换
			changeType(index) {
				console.log(index);
				this.currentType = index;			
			}
		}
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
.imgStyle{
	margin-top: 10rpx;
}
.likeNum{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
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
			.progressBox{
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
		.btnBox{
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

