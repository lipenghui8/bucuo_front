<template>
	<view class="warp">
		<!-- <cu-custom bgColor="bg-1a1a1a" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会员中心</block>
		</cu-custom> -->
		
		<swiper class="swiper">
			<swiper-item  v-for="(items,indexs) in levelList" :key="indexs">
				<div class="topBg">
					<view class="progress b-card" :class="{'b-level-1': items.level === 1,
					'b-level-2': items.level === 2,'b-level-3': items.level === 3,'b-level-4': items.level === 4}">
						<view class="heard">
							尊贵会员
						</view>
						<view class="title">
							“不错校园”团队感谢您的支持！
						</view>
						<view class="progress-artice">
							<view class="outer">
								<view class="inside" :style="{'width': items.ratio+'%'}">
									
								</view>
							</view>
							<view class="content">
								<view class="content-item" :style="{'flex':item.flex}" v-for="(item,index) in items.list" :key="index">
									<view class="rangle">
										<view class="rangle-text" v-show="index<items.list.length-1"></view>
										<image class="rangle-gift" src="https://zhoukaiwen.com/img/medal/icon-medal-gift.png" mode="" v-show="index == items.list.length-1"></image>
									</view>
									<view class="level">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>
						<view class="text">
							<text>向朋友分享我们的小程序吧！</text>
							<text class="text-des">1.5k人已解锁</text>
						</view>
					</view>
				</div>
			</swiper-item>
		</swiper>
		
		
		<view class="medal">
			<view class="medal-title">
				<text>会员权限</text>
				<!-- <text class="text">0个</text> -->
			</view>
			
			<view class="medal-box">
				<view class="medal-item" v-for="(item,index) in medalList" :key="index">
					<image class="img" :src="item.imgUrl">
					</image>
					<view class="title">
						{{item.title}}
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data () {
			return {
				levelList:[{
					level:1,
					ratio: 10,
					list:[{
						flex:2,
						achieve: 25,
						name:'LV.1'
					},{
						flex:2,
						achieve: 50,
						name:'LV.2'
					},{
						flex:2,
						achieve: 75,
						name:'LV.3'
					},{
						flex:2,
						achieve: 100,
						name:'LV.4'
					}]
				},{
					level:2,
					ratio: 50,
					list:[{
						flex:1,
						achieve: 14.2,
						name:'LV.1'
					},{
						flex:2,
						achieve: 42.8,
						name:'LV.2'
					},{
						flex:2,
						achieve: 71.5,
						name:'LV.3'
					},{
						flex:2,
						achieve: 100,
						name:'LV.4'
					}]
				},{
					level:3,
					ratio: 80,
					list:[{
						flex:1,
						achieve: 14.2,
						name:'LV.1'
					},{
						flex:2,
						achieve: 42.8,
						name:'LV.2'
					},{
						flex:2,
						achieve: 71.5,
						name:'LV.3'
					},{
						flex:2,
						achieve: 100,
						name:'LV.4'
					}]
				},{
					level:4,
					ratio: 10,
					list:[{
						flex:1,
						achieve: 14.2,
						name:'LV.1'
					},{
						flex:2,
						achieve: 42.8,
						name:'LV.2'
					},{
						flex:2,
						achieve: 71.5,
						name:'LV.3'
					},{
						flex:2,
						achieve: 100,
						name:'LV.4'
					}]
				}],
				
				
				medalList:[{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-1.png",
					title:"经验贴",
					text:"经验贴免费查看"
				},{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-2.png",
					title:"资料下载",
					text:"下载资料95折"
				},{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-3.png",
					title:"兴趣小组",
					text:"创建一个兴趣小组"
				},{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-4.png",
					title:"失物提醒",
					text:"失物短信提醒"
				},{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-5.png",
					title:"折扣优惠",
					text:"下载资料85折"
				},{
					imgUrl: "https://zhoukaiwen.com/img/medal/icon-medal-6.png",
					title:"下载更新",
					text:"下载更新功能"
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topBg{
		width: 100%;
		background: url(https://zhoukaiwen.com/img/qdpz/topBg.png);
		height: 400rpx;
		padding-top: 80rpx;
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.b-card{
		background-color: #fefefe;
		background-image: linear-gradient(-45deg, #e8e9ec,#f2f2f2);
		padding: 30rpx 40rpx;
		margin: 0 30rpx;
		height: 500rpx;
		border-radius: 20rpx;
		box-shadow: 2rpx 2rpx 2rpx #efeef3;
		color: #9a9ca1;
		.heard{
			color: #6f7275;
		}
		.text{
			background-color: #d8dcdd;
		}
		.outer{
			background-color: #d8dcdd;
			.inside{
				background-color: #6f7275;
			}
		}
		.rangle{
			.rangle-text{
				background-color: #6f7275;
			}
		}
	}
	.b-level-1{
		background-image: linear-gradient(45deg, #dde1ea,#a3abb8);
		color: #34424b;
		.heard{
			color: #34424b;
		}
		.text{
			background-color: #e4e9ed;
		}
		.outer{
			background-color: #e4e9ed;
			.inside{
				background-color: #34424b;
			}
		}
		
		.rangle{
			.rangle-text{
				background-color: #34424b;
			}
		}
	}
	.b-level-2{
		background-image: linear-gradient(45deg, #f0daa4,#d1a165);
		color: #323b4a;
		.heard{
			color: #313a49;
		}
		.text{
			background-color: #e4e7ec;
		}
		.outer{
			background-color: #e4e7ec;
			.inside{
				background-color: #313a49;
			}
		}
		
		.rangle{
			.rangle-text{
				background-color: #323b4a;
			}
		}
	}
	.b-level-3{
		background-image: linear-gradient(45deg, #ddc1b5,#c59073);
		color: #333333;
		.heard{
			color: #333333;
		}
		.text{
			background-color: #e8e8e8;
		}
		
		.outer{
			background-color: #e8e8e8;
			.inside{
				background-color: #333333;
			}
		}
		.rangle{
			.rangle-text{
				background-color: #333333;
			}
		}
		
	}
	.b-level-4{
		background-image: linear-gradient(45deg, #303030 ,#1a1a1a);
		color: #f0daa4;
		.heard{
			color: #f0daa4;
		}
		.text{
			background-color: #f2e3c4;
			color: #77582a;
		}
		.outer{
			background-color: #f2e3c4;
			.inside{
				background-color: #f2e3c4;
			}
		}
		.rangle{
			.rangle-text{
				background-color: #77582a;
			}
		}
	}
	.warp{
		.swiper{
			height: 560rpx;
			.progress{
				.heard{
					font-size: 36rpx;
					font-weight: 600;
					text-align: center;
					line-height: 120rpx;
				}
				.title{
					font-size: 28rpx;
				}
				.progress-artice{
					margin-top: 20rpx;
					font-size: 28rpx;
					.outer{
						height: 10rpx;
						border-radius: 20rpx;
						margin: 0;
						overflow: hidden;
						.inside{
							height: 100%;
						}
					}
					.content{
						margin: 0;
						display: flex;
						text-align: right;
						.content-item{
							display: flex;
							flex-direction: column;
							.rangle{
								height: 10rpx;
								line-height: 10rpx;
								margin-top: -10rpx;
								display: flex;
								justify-content: flex-end;
								align-items: center;
								.rangle-text{
									width: 10rpx;
									height: 10rpx;
									display: inline-block;
									border-radius: 50%;
									display: none;
								}
								.rangle-gift{
									width: 60rpx;
									height: 60rpx;
									background-color: #cacdd0;
									display: inline-block;
									border-radius: 50%;
								}
								.achieveClass{
									background-color: #765528;
								}
							}
							.level{
								margin-top: 50rpx;
								margin-right: -20rpx;
							}
							&:nth-child(4){
								.level{
									margin-right: 0rpx;
								}
							}
						}
						
					}
				}
				.text{
					margin-top: 60rpx;
					padding: 20rpx 20rpx;
					border-radius: 10rpx;
					font-size: 28rpx;
					font-weight: 600;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.text-des{
						font-size: 20rpx;
						font-weight: 300;
					}
				}
			}
		}
		
		.medal{
			margin: 10rpx 30rpx;
			margin-bottom: 30rpx;
			.medal-title{
				font-size: 32rpx;
				font-weight: 700;
				color: #30333b;
				padding: 0 10rpx;
				.text{
					font-size: 28rpx;
					font-weight: 300;
					color: #7c7f81;
					margin-left: 10rpx;
				}
			}
			.medal-box{
				display: flex;
				flex-wrap: wrap;
				.medal-item{
					width: 33.3333333333333%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin-top: 40rpx;
					.img{
						width: 140rpx;
						height: 140rpx;
						border-radius: 50%;
					}
					.title{
						font-size: 24rpx;
						line-height: 60rpx;
						font-weight: 600;
						color: #30333b;
					}
					.text{
						font-size: 24rpx;
						color: #7c7f81;
					}
				}
				
			}
		}
	}
</style>
