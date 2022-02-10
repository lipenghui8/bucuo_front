<!-- 首页 -->
<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-blue" :isBack="false"> -->
		<cu-custom bgColor="#FFF" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">“不错”校园</block>
		</cu-custom>

		<add-tip :tip="tip" :duration="duration" />

		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<input class=" u-search-text" 
				placeholder="概率论与数理统计题型介绍"
				style="width: 100%;"
				></input>
			</view>
		</view>
		<!-- banner图 -->
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">本周特惠</text>
				<text class="text-ABC text-blue">preference</text>
			</view>
			<!-- 注释掉更多的按钮
			<view class="action" @click="goProjectList"><text class="text-lg text-grey text-shadow">更多</text></view>
			-->
		</view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500"
						duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">为您推荐</text>
				<text class="text-ABC text-blue"> recommend</text>
			</view>
			<!--
			<view class="action" @click="goProjectList"><text class="text-lg text-grey text-shadow">更多</text></view>
			-->
		</view>
		
		<view class="cu-card article">
			<view 
			class="cu-item shadow"
			@click="goProject(item.id)"
			v-for="(item, index) in projectList" 
			:key="index">
				<view class="title"><view class="text-cut">{{ item.title }}</view></view>
				<view class="content">
					<image :src="item.tImg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> {{ item.tabs }}</view>
						<view>
							<view class="cu-tag bg-red light sm round">{{ item.time }}</view>
							<view class="cu-tag bg-green light sm round">{{ item.type }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import request from '@/common/api.js';
	import addTip from '../../components/wxcomponents/struggler-uniapp-add-tip/struggler-uniapp-add-tip.vue';
	export default {
		components: {
			addTip
		},
		data() {
			return {
				tip: '点击「添加小程序」，下次访问更便捷',
				duration: 1,

				scrollTop: 0,
				old: {
					scrollTop: 0
				},

				bannerList: [{
						imageUrl: 'https://bucuo.liph.top/static/index/banner1.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner3.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner1.png'
					}
				],
				projectList: []
			};
		},
		watch: {},
		mounted() {
			console.log(this.projectList);
			this.getData();
		},
		methods: {
			getData() {
				console.log('数据加载');
				let opts = {
					url: 'https://bucuo.liph.top/data/index/index.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.projectList = res.data.data;
					} else {}
				});
			},
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			goProjectList() {
				uni.navigateTo({
					url: '../project/list'
				});
			},
			goProject(id) {
				uni.navigateTo({
					url: '../project/project?proId=' + id
				});
			},
			goVideo() {
				uni.navigateTo({
					url: '../video'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.message-box {
		width: 100%;
		height: 120rpx;
		background: url(https://zhoukaiwen.com/img/icon/clock.gif) #FFFFFF;
		background-repeat: no-repeat;
		background-size: 100rpx 100rpx;
		background-position: 15rpx 10rpx;
		margin: 0rpx 0rpx 10rpx 0rpx;
		padding-left: 130rpx;
		
		.message-tltle {
			height: 65rpx;
			line-height: 70rpx;
			font-weight: 600;
			font-size: 28rpx;
		}

		.message-content {
			color: #0081ff;

			span {
				background-color: #0081ff;
				color: #FFFFFF;
				padding: 2rpx 8rpx;
				border-radius: 8rpx;
				margin-right: 8rpx;
			}
		}
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 380rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.kite-classify-cell {
		display: inline-block;
		width: 266rpx;
		height: 370rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://bucuo.liph.top/images/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: '';
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: '';
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 60rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954ff6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177ee;
		color: #fff;
	}

	.bg-index4 {
		background-color: #f49a02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #ff4f94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7fd02b;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>
