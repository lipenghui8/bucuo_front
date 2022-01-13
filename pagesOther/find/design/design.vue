<template>
	<view>
		<view class="" v-show="!loadShow">
			<view class="canvas"><canvas :style="[{ width: w*2 + 'px' }, { height: h*2 + 'px' }]"
					canvas-id="firstCanvas" id="firstCanvas"></canvas></view>
			<view class="">
				<image :src="canvasUrl" mode="aspectFill" style="position: absolute;top: 0;left: 0;"
					:style="[{width: w+'px'},{height: h+'px'}]"></image>
				<image :src="designList[designCurrent].image" :style="[{width: w+'px'},{height: w+'px'}]"
					style="position: absolute;top: 0;left: 0;"></image>
			</view>
			<view class="mould" v-show="!viewShow">
				<view class="safe-area-inset-bottom">
					<scroll-view scroll-x style="height: 120rpx;padding: 15rpx 0;">
						<view class="u-flex u-row-left u-col-center">
							<view class="">ㅤ</view>
							<view class="tab" :class="designCurrent === index ? 'tab_active' : ''"
								v-for="(item, index) in designList" :key="index" @click="cheekClick(index)">
								<image :src="item.image"></image>
								<view v-if="item.mode === 1" class="shoufei u-flex u-row-center u-col-center">
									<text class="u-font-13">{{designIntegral}}</text>积分
								</view>
							</view>
							<view class="">ㅤ</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="handle u-m-20" v-show="!viewShow">
				<view class="safe-area-inset-bottom">
					<view class="u-flex u-row-around u-col-center"
						style="background-color: rgba(73, 69, 84, 0.3);border-radius: 80rpx;padding: 10rpx 20rpx;">
						<view class="u-text-center" @click="backClick">
							<u-icon class="" name="/static/icon/back.png" size="44"></u-icon>
							<view class="u-font-13">返回</view>
						</view>
						<view class="u-text-center" @click="chooseClick">
							<u-icon class="" name="/static/icon/cate.png" size="44"></u-icon>
							<view class="u-font-13">相册</view>
						</view>
						<view class="u-text-center" @click="canvasCont">
							<u-icon class="" name="/static/icon/duihuan.png" size="44"></u-icon>
							<view class="u-font-13">保存</view>
						</view>
						<view class="u-text-center" @click="viewCont">
							<u-icon class="" name="/static/icon/view.png" size="44"></u-icon>
							<view class="u-font-13">预览</view>
						</view>
						<view class="u-text-center" style="position: relative;">
							<u-icon class="" name="/static/icon/shares.png" size="44"></u-icon>
							<view class="u-font-13">分享</view>
							<button open-type="share"
								style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-show="viewShow" @click="viewCont"
				style="position: fixed;bottom: 160rpx;right: 20rpx;background-color: rgba(0,0,0,0.3);padding: 10rpx;border-radius: 12rpx;">
				<image src="/static/icon/view.png" style="width: 60rpx;height: 60rpx;display: block;"></image>
			</view>
		</view>
		<view class="loading_page" v-show="loadShow">
			<span class="loader-61"> </span>
		</view>
		<models v-if="loginShow" title="为了更好的玩机体验，快去授权登录吧" btnText="授权登录" @getUserInfo="getUserInfo"
			@close="loginShow = false"></models>
			
		<models v-if="designShow" :title="designTitle" :btnText="'看广告领 ' + adIntegral + ' 积分'" :authorize="false"
			@close="designShow = false" @save="adClick"></models>

		<models v-if="signShow" :authorize="false" :title="signTitle" btnText="知道了" closeText=" "
			@save="signShow = false"></models>

		<models v-show="adShow" :authorize="false" :ad="true" title="已成功保存到相册，别忘了分享给朋友哦！" btnText="分享给好友"
			closeText="暂时不用" @save="adShow = false" @close="adShow = false"></models>
	</view>
</template>

<script>
	let videoAd = null;
	let context = null;
	import models from '@/components/model/model.vue'
	var systemInfo = uni.getSystemInfoSync()
	export default {
		components: {
			models
		},
		data() {
			return {
				w: systemInfo.screenWidth,
				h: systemInfo.screenHeight,
				loadShow: true,

				adIntegral: 0,
				signShow: false,
				signTitle: '',
				loginShow: false,

				designIntegral: 0,
				designShow: false,
				designTitle: '',
				adShow: false,
				canvasUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7883b0be-568b-405c-83d4-6d4fe8b4df7d/9e2eacac-e3b0-4ac8-8752-d864f1d19ae9.jpg',
				saveUrl: '',
				designList: [],
				designCurrent: 0,

				// 预览
				viewShow: false
			}
		},
		onReady() {
			let that = this
			context = uni.createCanvasContext('firstCanvas')
			context.width = that.w * 2
			context.height = that.h * 2
		},
		async onLoad() {
			let that = this
			await that.getDesign()
			await that.getConfig()
			that.adLoad()
			that.loadShow = false
		},
		methods: {
			async getDesign() {
				var that = this
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: "wx_design",
						order: {
							name: 'time',
							type: 'asc'
						},
						pageIndex: 1,
						pageSize: 200
					},
				})
				that.designList = list.result.data
			},
			async getConfig() {
				let that = this
				let config = await uniCloud.callFunction({
					name: 'config_search',
					data: {
						'keys': ['designIntegral', 'adIntegral']
					},
				})
				if (config.result.success) {
					that.designIntegral = parseInt(config.result.data[0])
					that.adIntegral = parseInt(config.result.data[1])
				}
			},
			cheekClick(index) {
				var that = this
				if (that.designCurrent === index) return
				that.designCurrent = index
			},
			chooseClick() {
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res)
						that.canvasUrl = res.tempFilePaths[0]
					}
				});
			},
			async canvasCont() {
				var that = this
				var that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				if (that.designIntegral > 0 && that.designList[that.designCurrent].mode === 1) {
					var integral = that.vuex_user.integral
					if (integral < that.designIntegral) {
						that.designShow = true
						that.designTitle = "<p style='font-weight: 550;font-size: 16px;'>下载需要 " + that.designIntegral +
							" 积分</p><p style='padding-top: 10px;'>您当前仅有<span class='num'>" + integral +
							"</span>积分，不足以下载当前刘海壁纸~</p>"
						return
					}
					uni.showLoading({
						mask: true,
						title: '保存中...'
					})
					let query = await uniCloud.callFunction({
						name: 'order_design',
						data: {
							userId: that.vuex_user._id,
							integral: that.designIntegral
						},
					})
					if (!query.result.success) {
						uni.showToast({
							mask: true,
							icon: 'none',
							title: query.result.msg,
							duration: 1000
						})
						return
					}
					that.getUser()
				}
				uni.showLoading({
					mask: true,
					title: '保存中...'
				})
				uni.getImageInfo({
					src: that.canvasUrl,
					success: function(image) {
						var coor = that.imageUtil(image.width, image.height)
						var canvasUrl = image.path
						uni.downloadFile({
							url: that.designList[that.designCurrent].image,
							success: function(res) {
								var designUrl = res.tempFilePath
								context.drawImage(canvasUrl, coor.x * 2, coor.y * 2, coor
									.width * 2, coor.height * 2)
								context.drawImage(designUrl, 0, 0, that.w * 2, that.w * 2)
								context.draw()
								setTimeout(function() {
									uni.canvasToTempFilePath({
										fileType: "jpg",
										canvasId: 'firstCanvas',
										success: function(res) {
											that.saveImage(res
												.tempFilePath)
										},
									})
								}, 300)
							}
						})
					}
				})
			},
			saveImage(saveUrl) {
				var that = this
				//图片保存到本地相册
				uni.saveImageToPhotosAlbum({
					filePath: saveUrl,
					//授权成功，保存图片
					success: function(data) {
						uni.hideLoading()
						that.adShow = true
					},
					//授权失败
					fail: function(err) {
						if (err.errMsg) {
							//重新授权弹框确认
							uni.showModal({
								title: '提示',
								content: '无权限，请打开下载权限后再试！',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										//重新授权弹框用户点击了确定
										uni.openSetting({
											//进入小程序授权设置页面
											success(settingdata) {
												if (settingdata.authSetting[
														'scope.writePhotosAlbum']) {
													//用户打开了保存图片授权开关
													uni.saveImageToPhotosAlbum({
														filePath: that.saveUrl,
														success: function(data) {
															uni.hideLoading()
															that.adShow = true
														}
													});
												} else {
													//用户未打开保存图片到相册的授权开关
													uni.showModal({
														title: '温馨提示',
														content: '授权失败，请稍后重新获取',
														showCancel: false
													});
												}
											}
										});
									}
								}
							});
						}
						uni.hideLoading()
					}
				});
			},
			adClick() {
				if (videoAd) {
					videoAd.show().catch(err => {
						// 失败重试
						// console.log("广告拉去失败")
						videoAd.load().then(() => videoAd.show())
					})
				}
			},
			adLoad() {
				var that = this
				if (wx.createRewardedVideoAd) {
					// 加载激励视频广告
					// #ifdef MP-QQ
					videoAd = wx.createRewardedVideoAd({
						adUnitId: that.vuex_qqUnitId
					});
					// #endif
					// #ifdef MP-WEIXIN
					videoAd = wx.createRewardedVideoAd({
						adUnitId: that.vuex_videoUnitId
					});
					// #endif
					//捕捉错误
					videoAd.onError(err => {
						// 进行适当的提示
						console.log('videoAd onError', res);
					});
					// 监听关闭
					videoAd.onClose(status => {
						that.designShow = false
						if ((status && status.isEnded) || status === undefined) {
							// 正常播放结束，下发奖励
							if (that.vuex_user) {
								that.userIntegral()
							}
						} else {
							// 播放中途退出，进行提示
							console.log('中途退出')
						}
					});
				}
			},
			async userIntegral() {
				var that = this
				uni.showLoading({
					mask: true,
					title: '正在拼命加载中...'
				})
				let data = await uniCloud.callFunction({
					name: 'user_integral',
					data: {
						userId: that.vuex_user._id
					},
				})
				uni.hideLoading()
				if (data.result.success) {
					that.getUser()
					that.signTitle =
						"<p style='font-weight: 550;font-size: 16px;'>观看成功</p><p style='padding-top: 10px;'>获得<span class='num'>" +
						data.result.integral + "</span>积分</p>"
					that.signShow = true
				}
			},
			async getUser() {
				let that = this
				let detail = await uniCloud.callFunction({
					name: 'search_map',
					data: {
						dbName: "wx_user",
						id: that.vuex_user._id
					},
				})
				that.$u.vuex('vuex_user', detail.result)
			},			
			// 登录
			getUserInfo() {
				var that = this
				// #ifdef MP-WEIXIN
				uni.getUserProfile({
					desc: '个人登录，记录数据', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success(res) {
						console.log(res)
						that.name = res.userInfo.nickName; //昵称
						that.avatar = res.userInfo.avatarUrl; //头像
						that.wxlogin();
					},
					fail() {
						console.log("获取用户信息失败");
					}
				});
				// #endif
				// #ifdef MP-QQ
				uni.getUserInfo({
					// 获取信息成功
					success(res) {
						console.log(res)
						that.name = res.userInfo.nickName; //昵称
						that.avatar = res.userInfo.avatarUrl; //头像
						that.wxlogin();
					},
					fail() {
						console.log("获取用户信息失败");
					}
				});
				// #endif
			},
			//已经授权，自动登录
			async wxlogin() {
				let that = this;
				uni.showLoading({
					title: '登录中...'
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						that.wxloginres(code);
					},
				});
			
			},
			//登录后提交服务器获取进一步信息
			async wxloginres(wxcode) {
				let that = this;
			
				var userId = uni.getStorageSync('userId')
			
				var mptype
				// #ifdef MP-WEIXIN
				mptype = 'wx'
				// #endif
				// #ifdef MP-QQ
				mptype = 'qq'
				// #endif
			
				let authorize = await uniCloud.callFunction({
					name: 'user_authorize',
					data: {
						name: that.name,
						avatar: that.avatar,
						mptype: mptype,
						code: wxcode,
						userId: userId,
					},
				})
				if (authorize.result.success) {
					that.$u.vuex('vuex_user', authorize.result.data)
					// 登陆成功  获取收藏点赞
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '登录成功',
						duration: 1500
					})
					uni.removeStorageSync('userId')
				} else {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: authorize.result.msg,
						duration: 1500
					})
				}
				that.loginShow = false
			},
			backClick() {
				uni.navigateBack()
			},
			viewCont() {
				let that = this
				that.viewShow = !that.viewShow
			},
			imageUtil(w, h) {
				let that = this
				var imageWidth = 0
				var imageHeight = 0
				var coor = {},
					x = 0,
					y = 0
				var originalScale = h / w; //图片高宽比
				//获取屏幕宽高
				var windowscale = that.h / that.w; //屏幕高宽比
				if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比
					//图片缩放后的宽为屏幕宽
					imageHeight = that.h;
					imageWidth = (that.h * w) / h;
				} else { //图片高宽比大于屏幕高宽比
					//图片缩放后的高为屏幕高
					imageWidth = that.w;
					imageHeight = (that.w * h) / w;
				}
				if (imageWidth > that.w) {
					x = (imageWidth - that.w) / 2
					x = 0 - x
					y = 0
				} else {
					y = (imageHeight - that.h) / 2
					y = 0 - y
					x = 0
				}
				coor.x = x
				coor.y = y
				coor.width = imageWidth
				coor.height = imageHeight
				return coor;
			}
		},
		onShareAppMessage(res) {
			var that = this
			that.adShow = false
			return {
				title: '快来看看我设计的刘海壁纸~',
				path: '/pagesOther/find/find?userId=' + that.vuex_user._id
			}
		},
		onShareTimeline(res) {
			return {
				title: '我等风也等你，近听水无声~',
				path: '/pagesOther/index/index'
			}
		}
	}
</script>

<style lang="scss">
	.canvas {
		position: absolute;
		top: -20000rpx;
		left: -10000rpx;
	}

	.mould {
		position: fixed;
		bottom: 0;
		left: 0;
		min-height: 150rpx;
		width: 100%;
		background-color: rgba(73, 69, 84, 0.3);
	}

	.tab {
		position: relative;
		width: 116rpx;
		height: 116rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
		padding: 10rpx;
		margin-right: 20rpx;

		image {
			width: 78rpx;
			height: 78rpx;
			border: 6rpx solid #000000;
			border-radius: 16rpx;
			display: block;
		}

		border: 4rpx solid #ffffff;
	}

	.tab_active {
		border: 4rpx solid #ffcc13;
	}

	.handle {
		position: fixed;
		bottom: 150rpx;
		left: 0;
		width: calc(100% - 40rpx);
		min-height: 120rpx;
		color: #ffffff;
	}

	.shoufei {
		position: absolute;
		top: 2px;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 8px;
		font-weight: 700;
		color: #ffc001;
	}

	.sp {
		width: 25px;
		height: 25px;
		clear: both;
		margin: 10px auto
	}

	.sp-wave {
		border-radius: 50%;
		position: relative;
		opacity: 1
	}

	.sp-wave:before,
	.sp-wave:after {
		content: '';
		border: 3px #ffbc00 solid;
		border-radius: 50%;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0px
	}

	.sp-wave:before {
		transform: scale(1, 1);
		opacity: 1;
		-webkit-animation: spWaveBe 0.6s infinite linear;
		animation: spWaveBe 0.6s infinite linear
	}

	.sp-wave:after {
		transform: scale(0, 0);
		opacity: 0;
		-webkit-animation: spWaveAf 0.6s infinite linear;
		animation: spWaveAf 0.6s infinite linear
	}

	@-webkit-keyframes spWaveAf {
		from {
			-webkit-transform: scale(0.5, 0.5);
			opacity: 0
		}

		to {
			-webkit-transform: scale(1, 1);
			opacity: 1
		}
	}

	@keyframes spWaveAf {
		from {
			transform: scale(0.5, 0.5);
			opacity: 0
		}

		to {
			transform: scale(1, 1);
			opacity: 1
		}
	}

	@-webkit-keyframes spWaveBe {
		from {
			-webkit-transform: scale(1, 1);
			opacity: 1
		}

		to {
			-webkit-transform: scale(1.5, 1.5);
			opacity: 0
		}
	}

	@keyframes spWaveBe {
		from {
			-webkit-transform: scale(1, 1);
			opacity: 1
		}

		to {
			-webkit-transform: scale(1.5, 1.5);
			opacity: 0
		}
	}
</style>
