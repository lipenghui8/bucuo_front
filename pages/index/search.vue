<template>
	<view class="u-wrap">
		<!-- <cu-custom bgColor="#FFF" color="black" :isBack="false">
			
			<block slot="content">功能</block>
		</cu-custom> -->
		<view style="margin-top: 180rpx;">
			<view class="cu-bar bg-white  flex justify-end">
				<navigator class="action but-margin" url="design" hover-class="none">
					<view class="bg-white shadow " style="padding: 5px; border-radius: 8rpx; display: flex;">
						<u-image mode="widthFix" :src="warnUrl" width="22px" height="22px" style="margin-top:13rpx"></u-image>
						<text style="font-size: 22px;">建议</text>
					</view>
				</navigator>
				<navigator class="action but-margin" url="design" hover-class="none" >
					<view class="bg-white shadow"  style="padding: 5px; border-radius: 8rpx;">
						<u-icon size="60" name="rmb-circle-fill" style="color: #313cd4;margin-top:13rpx"></u-icon>
						<text >赞赏</text>
					</view>
				</navigator>
			</view>
			<view class="flex flex-wrap justify-end align-center bg-white" style="padding-right: 30rpx; margin-bottom: 12rpx;" @click="goLost">
				<navigator class="action but-margin" url="design" hover-class="none" >
					<view class="bg-white shadow"  style="padding: 5px; border-radius: 8rpx;display:flex;justify-content:space-around;align-items:center">
						<image style="width:60rpx;height:60rpx;margin-right:8rpx" src="https://bucuo.liph.top/static/main/shiwu.png"></image>
						<!-- <u-icon name="https://bucuo.liph.top/static/main/shiwu.png"></u-icon> -->
						<text >拾物登记</text>
					</view>
				</navigator>	
			</view>				
		</view>
		<view>
			<bigbutton></bigbutton>
		</view>	
		<!--
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-title">
								<text>{{item.name}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
									<image class="item-menu-image" :src="item1.icon" mode=""></image>
									<view class="item-menu-name margin-top-sm">{{item1.name}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
		-->
	</view>
</template>

<script>
	import classifyData from "@/common/classify.data.js";
	import bigbutton from "@/components/bigbutton/index.vue"
	export default {
		data() {
			return {
				tabbar: classifyData,
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				buttonData:[2.35,8.36,10.5],
				warnUrl: require("@/static/icons/warn.png")
			
			}
		},
		computed: {
			
		},
		components:{
			bigbutton
		},
		methods: {
			goLost() {
				uni.navigateTo({
					url: '../../pages/function/lost'
				});
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.but-margin {
		margin-left: 15px;
		font-size: 22px;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 30rpx;
		color: $u-main-color;
		font-weight: bold;
		margin: 10rpx 0;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
	}
</style>
