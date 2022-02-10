<!-- 课程班级 -->
<template>
	<view>
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">当地</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-subsection :list="itemList" :current="currentItem"></u-subsection>
				<u-subsection :list="typeList" :current="currentType"></u-subsection>
			</view>
			<scroll-view  style="width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="page-box" style="margin-bottom:60rpx">
					<view class="cu-card article">
						<view 
						class="cu-item shadow"
						@click="goProject(item.id-1)"
						v-for="(item, index) in articleList" 
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
					<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
				</view>
				<view class="u-search-box" style="position: fixed; bottom: 0rpx; width: 100%;">
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
				iconUrl: require("@/static/icons/aixin.png"),
				
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				
				orderList: [[], [], [], []],
				articleList: [],
				itemList: ['美食','娱乐','生活购物'],
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				typeList: ['最热', '最新', '收藏'],
				currentType: 0,
				currentItem: 0,

			};
		},
		mounted() {
			this.getData();
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
			getData() {
				console.log('数据加载');
				let opts = {
					url: 'https://bucuo.liph.top/data/local/local.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.articleList = res.data.data;
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
			reachBottom() {
				// 此tab为空数据
				if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// tab栏切换
			changeItem(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			// 类型切换
			changeType(index) {
				this.typeCurrent = index;
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
.likeNum{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
.imgStyle{
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

