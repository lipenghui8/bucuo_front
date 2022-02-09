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
				<view class="page-box">
					<view class="cu-card article">
						<view 
						class="cu-item shadow"
						style="padding-bottom: 0;"
						@click="goProject(item.id)"
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
									<view class="text-content"> {{ item.Content }}</view>
									<view class="solid-bottom text-df padding">{{ item.PublisherID}}</view>
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
										<view class="cu-tag bg-gradual-green">有机</view>
									</view>
									<view class=" cu-item" style="height: 20%;">
										<view class="cu-tag bg-gradual-pink">化学院</view>	
									</view>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
				</view>
			</scroll-view>
			<view class="u-search-box" style="position: absolute; bottom: 10rpx; width: 100%;">
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
				articleList: [
				        {
				            "Title": "测试",
				            "Content": "我是一只小小小鸟怎么飞也飞不高！",
				            "Column": "课程考试",
				            "Labels": [
				                {
				                    "Content": "计算机与信息工程学院"
				                },
				                {
				                    "Content": "数学院"
				                }
				            ],
				            "PublisherID": 1,
				            "id": 1
				        },
				        {
				            "Title": "测试测试",
				            "Content": "两只小蜜蜂啊飞到花丛中啊飞啊飞啊！",
				            "Column": "课程考试",
				            "Labels": [
				                {
				                    "Content": "文学院"
				                },
				                {
				                    "Content": "历史学院"
				                }
				            ],
				            "PublisherID": 2,
				            "id": 2
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
				itemList:  ['课程考试','竞赛考证','考研保研','新生守则','其他经验'],
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
				typeList: ['所有', '参与', '管理'],
				currentType: 0,
				currentItem: 0,
				selecValue1: '全部',
				selecValue2: '不限',
				selecValue3: '最新',
				selecValue4: '学院',
				
				condition1: [{
						value: '选项1',
						label: '全部'
					}],
				condition2:[{
						value: '选项1',
						label: '不限'
					}],
				condition3:[{
						value: '选项1',
						label: '最新'
					}],
				condition4:[{
						value: '选项1',
						label: '学院'
					}],		
					

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
			selectOne(options) {
				this.selecValue = options.label
			},
			useOutClickSide() {
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
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

