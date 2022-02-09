<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="#FFF">
			<block slot="content" color="black">消息</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;"> <!-- @scrolltolower="reachBottom">-->
						<!-- <chat/> -->
						<view class="page-box">
							<navigator open-type="navigate" url="../../tn_components/chat/chat" class="order" v-for="(res, index) in newsList" :key="res.id">
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="contentItem">
											<view class="title u-line-2 text-bold">ID:{{ item.title }}</view>
											<view class="newsTime">18:54</view>
										</view>
										<view class="type">{{ item.type }}</view>
									</view>
								</view>
							</navigator>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;"> <!-- @scrolltolower="reachBottom">-->
						<!-- <chat/> -->
						<view class="page-box">
							<view class="order" v-for="(res, index) in InformList" :key="res.id">
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="contentItem">
											<view class="title u-line-2 text-bold">{{ item.title }}</view>
											<view class="newsTime">18:54</view>
										</view>
										<view class="type">{{ item.type }}</view>
									</view>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第三页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;"> <!-- @scrolltolower="reachBottom">-->
						<!-- <chat/> -->
						<view class="page-box">
							<view class="order" v-for="(res, index) in friendList" :key="res.id">
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left">
										<image :src="item.goodsUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="contentItem">
											<view class="title u-line-2 text-bold">ID:{{ item.title }}</view>
											<view class="newsTime">LV5</view>
											<navigator hover-class="none" open-type="navigate" url="../../tn_components/chat/chat"  class="chatImg">
												<image :src="chatImgUrl" mode="aspectFill"></image>
											</navigator>
										</view>
									</view>
								</view>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	
	export default {
		components:{
		},
		data() {
			return {
				percent: 50,
				activeColor: '#0081ff',
				striped: false,
				stripedActive: false,
				chatImgUrl:'http://bucuo.liph.top/static/news/chatImg.png',

				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				
				orderList: [[], [], []],
				newsList: [
					{
						id: 1,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
								title: '040431',
								type: '如果你想保研的话，要趁早准备，六级也得好'
							}
						]
					},
					{
						id: 2,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
								title: '000951',
								type: 'Promise 必须为以下三种状态之一'
							}
						]
					},
					{
						id: 3,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
								title: '040534',
								type: '1.封装项目的基础库；2.层级管理；3.缓存；'
							}
						]
					},
					{
						id: 4,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
								title: '000653',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						]
					}
				],
				InformList:[
					{
						id: 1,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/dianzan.png',
								title: '点赞',
								type: '如果你想保研的话，要趁早准备，六级也得好'
							}
						]
					},
					{
						id: 2,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/shoucan.png',
								title: '收藏',
								type: 'Promise 必须为以下三种状态之一'
							}
						]
					},
					{
						id: 3,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/pinglun.png',
								title: '评论',
								type: '1.封装项目的基础库；2.层级管理；3.缓存；'
							}
						]
					},
					{
						id: 4,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/shiwu.png',
								title: '失物',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						],
					},
					{
						id: 5,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/me.jpg',
								title: '乐享君',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						]
					}
				],
				friendList:[
					{
						id: 1,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/dianzan.png',
								title: '001265',
								type: '如果你想保研的话，要趁早准备，六级也得好'
							}
						]
					},
					{
						id: 2,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/shoucan.png',
								title: '001266',
								type: 'Promise 必须为以下三种状态之一'
							}
						]
					},
					{
						id: 3,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/pinglun.png',
								title: '001267',
								type: '1.封装项目的基础库；2.层级管理；3.缓存；'
							}
						]
					},
					{
						id: 4,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/shiwu.png',
								title: '001268',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						],
					},
					{
						id: 5,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/me.jpg',
								title: '001269',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						]
					},
					{
						id: 6,
						goodsList: [
							{
								goodsUrl: 'http://bucuo.liph.top/static/news/me.jpg',
								title: '001269',
								type: '引擎在读取js代码的过程中,分为两步。'
							}
						]
					}
				],
				list: [
					{
						name: '消息'
					},
					{
						name: '通知'
					},
					{
						name: '好友'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
			};
		},
		mounted() {
			this.getOrderList(0);
			this.getOrderList(1);
			this.getOrderList(2);
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
			goClass(){
				uni.showToast({
					title: '没有权限～',
					duration: 2000,
					icon: 'none'
				});
			},
			reachBottom() {
				// 此tab为空数据
				if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getOrderList(idx) {
				let data
				if(idx==0){
					let len= this.newsList.length
						for(let i = 0; i < len; i++) {
						data = JSON.parse(JSON.stringify(this.newsList[i]));
						data.id = this.$u.guid();
						this.orderList[idx].push(data);
					}
				}
				else if(idx==1){
						let len= this.newsList.length
						for(let i = 0; i < len; i++) {
						data = JSON.parse(JSON.stringify(this.informList[i]));
						data.id = this.$u.guid();
						this.orderList[idx].push(data);
					}
				}
				else{
					for(let i = 0; i < 5; i++) {
						let index = this.$u.random(0, this.newsList.length - 1);
						data = JSON.parse(JSON.stringify(this.newsList[i]));
						data.id = this.$u.guid();
						this.orderList[idx].push(data);
					}
				}
				this.loadStatus.splice(this.current,1,"loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				//this.getOrderList(index);
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			wander(){
				uni.switchTab({
					url:'/pages/index/index'
				})
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
			width: 100rpx;
			height: 100rpx;
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}
		.content {
			width: 100%;
			.contentItem{
				display: flex;
				justify-content:space-between;
				.title {
					font-size: 35rpx;
					line-height: 45rpx;
				}
				.newsTime{
					margin-left: 120rpx;
					margin-top:5rpx;
				}
				.chatImg{
					margin-right: 20rpx;
					image {
					width: 70rpx;
					height: 70rpx;
					}
				}
			}
			.type {
				margin: 10rpx 0;
				margin-top:20rpx;
				font-size: 24rpx;
				color: $u-tips-color;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
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

