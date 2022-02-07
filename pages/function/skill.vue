<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">技能</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-subsection :list="itemList" :current="currentItem" @change="changeItem"></u-subsection>
				<u-subsection 
				:list="typeList" 
				:current="currentType" 
				@change="changeType"
				v-show="currentItem==0"
				></u-subsection>
			</view>
			<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="cu-card article">
						<view 
						class="cu-item shadow"
						@click="goProject(item.id)"
						v-for="(item, index) in articleList" 
						:key="index">
							<view class="content">
								<image class="imgStyle" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10007.jpg" ></image>
								<view class="desc">
									<view class="flex solid-bottom padding justify-around">
										<view class="text-black text-bold">{{item.title}}</view>
										<view>{{item.likeNum}}</view>
									</view>
									<view class="text-content"> {{ item.content }}</view>
									<view> {{ item.time }}</view>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
				</view>
				<view class="u-search-box">
					<view class="u-search-inner">
						<u-icon name="search" color="#909399" :size="28"></u-icon>
						<input class=" u-search-text" 
						placeholder="开封爬楼推荐地点"
						style="width: 100%;"
						></input>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
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
				
				orderList: [[], [], [], []],
				articleList: [
					{
						id: 1,
						title: '爱情与现代公司理论',
						time: 60,
						content: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
						likeNum: 77
					},
					{
						id: 2,
						title: '爱情与现代公司理论',
						time: 60,
						content: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
						likeNum: 77
					},
					{
						id: 3,
						title: '爱情与现代公司理论',
						time: 60,
						content: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
						likeNum: 77
					},
					{
						id: 4,
						title: '爱情与现代公司理论',
						time: 60,
						content: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
						likeNum: 77
					}
				],
				dataList: [
					{
						id: 1,
						store: '爱情与现代公司理论',
						progre: 60,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
								title: '第一阶段·5课时',
								type: '课程名称：《vue-router全局导航守卫》，简介：导航首位就是变化的路由钩子...',
								teacher: '王老师',
								number: 2
							}
						]
					},
					{
						id: 2,
						store: '西南财经大学保研经验贴',
						progre: 39,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
								title: 'Promise的链式调用',
								type: 'Promise 必须为以下三种状态之一：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。一旦Promise 被 resolve 或 reject，不能再迁移至其他任何状态（即状态 immutable）。',
								teacher: 'Lee老师',
								number: 1
							}
						]
					},
					{
						id: 3,
						store: '爱情与现代公司理论',
						progre: 55,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web2.jpg',
								title: '基于vue应用中实用的性能技巧',
								type: '1.封装项目的基础库；2.层级管理；3.缓存；4.延迟加载；5.工程化-webpack的改进；6.控制代码质量；7.自动化部署等优化方案',
								teacher: '王老师',
								number: 3
							}
						]
					},
					{
						id: 4,
						store: '爱情与现代公司理论',
						progre: 80,
						goodsList: [
							{
								goodsUrl: 'http://cdn.zhoukaiwen.com/web1.jpg',
								title: '变量提升及函数提升',
								type: '引擎在读取js代码的过程中,分为两步。第一个步骤是整个js代码的解析读取,第二个步骤是执行',
								teacher: '王老师',
								number: 9
							}
						]
					}
				],
				itemList: ['技能','交换','求助'],
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				typeList: ['所有', '参与', '管理'],
				currentType: 0,
				currentItem: 0,

			};
		},
		mounted() {
			this.getOrderList(0);
			console.log("mounted")
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
			fetchData(){
				
			},
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
				for(let i = 0; i < 5; i++) {
					let index = this.$u.random(0, this.dataList.length - 1);
					let data = JSON.parse(JSON.stringify(this.dataList[index]));
					data.id = this.$u.guid();
					this.orderList[idx].push(data);
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
			changeItem(index) {
				this.currentItem = index;
				this.getOrderList(index);
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
		margin-top: 10%;
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

