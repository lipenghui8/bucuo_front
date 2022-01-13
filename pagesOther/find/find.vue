<template>
	<view class="">
		<u-navbar
		:is-back="true" 
		title="发现精彩" 
		title-width="325" 
		title-color="#333333" 
		title-size="28" 
		:border-bottom="false"
		></u-navbar>
		<view class="" v-show="!loadShow">
			<view class="u-p-l-25 u-p-r-25 u-p-t-25">
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/fa1064ed-5f2a-446c-bf8d-d3067fb41e7f.png"
					style="width:700rpx;height: 343rpx" @click="gqsignClick"></image>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/cb1928fa-86c8-48a4-aef9-73a098ec0b7b.png"
					style="width:700rpx;height: 343rpx" @click="ttsignClick" v-if="!vuex_isShenHe"></image>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/352ec7c7-75ac-4ed9-a9e3-a68b768719b2.png"
					style="width:700rpx;height: 343rpx" @click="txsignClick" v-if="!vuex_isShenHe"></image>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/1bf54f63-4dba-4e10-a3c3-78a8fa67bb3d.png"
					style="width:700rpx;height: 343rpx" @click="designClick"></image>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/0948a13d-ef46-4970-b693-0022bc60ce53.png"
					style="width:700rpx;height: 343rpx" @click="signClick"></image>
				<image
					src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4ccb737-ac9b-4e0b-945e-a43ab8f61b99/6e59009a-f597-41f7-b1ad-51d4ae51fd6b.png"
					style="width:700rpx;height: 343rpx" @click="adClick"></image>


			</view>

			<view class="" style="height: 180rpx;"></view>
		</view>
		<view class="loading_page" v-show="loadShow">
			<span class="loader-61"> </span>
		</view>

		<models v-if="loginShow" title="授权登录探索更多精彩内容!" btnText="授权登录" @getUserInfo="getUserInfo"
			@close="loginShow = false"></models>

		<models v-if="signShow" :authorize="false" :title="signTitle" btnText="知道了" closeText=" "
			@save="signShow = false"></models>
	</view>
</template>

<script>
	let videoAd = null;
	let menuButtonInfo = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	var app = getApp()

	import models from '@/components/model/model.vue'
	export default {
		components: {
			models
		},
		data() {
			return {
				menuButtonInfo: menuButtonInfo,
				loadShow: true,
				signShow: false,
				signTitle: '',
				isSign: false,
				// 登录弹窗
				loginShow: false
			}
		},
		async onLoad() {
			uni.hideTabBar()
			let that = this
			that.loadShow = false
			that.adLoad()
		},
		methods: {
			designClick() {
				let that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pagesOther/find/design/design'
				})
			},
			txsignClick() {
				let that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pagesOther/find/profile/profile'
				})
			},
			ttsignClick() {
				let that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pagesOther/find/gallery/gallery'
				})
			},
			gqsignClick() {
				let that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pagesOther/find/dynamic/dynamic'
				})
			},
			async getSign() {
				let that = this
				const startTime = new Date(new Date().toLocaleDateString()).getTime()
				const endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
				let query = await uniCloud.callFunction({
					name: 'sign_flag',
					data: {
						dbName: 'wx_sign',
						"userId": that.vuex_user._id,
						"startTime": startTime,
						"endTime": endTime
					},
				})
				if (query.result.success) that.isSign = true
				else that.isSign = false
			},
			async signClick() {
				var that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				await that.getSign()
				if (that.isSign) {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '今日已签到',
						duration: 1500
					})
					return
				}

				uni.showLoading({
					mask: true,
					title: '签到中...'
				})
				let sign = await uniCloud.callFunction({
					name: 'sign_add',
					data: {
						"userId": that.vuex_user._id
					},
				})
				
				if (sign.result.success) {
					that.getUser()
					that.signTitle =
						"<p style='font-weight: 550;font-size: 16px;'>签到成功</p><p style='padding-top: 10px;'>获得<span class='num'>" +
						sign.result.integral + "</span>积分</p>"
					that.signShow = true
					that.isSign = true
				} else {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: sign.result.msg,
						duration: 1500
					})
				}
				uni.hideLoading()
			},
			luckClick() {
				let that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
			},
			adClick() {
				var that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
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
						console.log('videoAd onError', err);
					});
					// 监听关闭
					videoAd.onClose(status => {
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
					that.getUser()
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '登录成功，再次点击探索新功能吧！',
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
		}
	}
</script>

<style lang="scss" scoped>
	.vtop {
		position: fixed;
		top: 0px;
		left: 0;
		width: 100%;
		background: linear-gradient(90deg, #ffb821 0, #ffcd33 45%, #ffd833);
		z-index: 999999;
		height: 15%;

		.title {
			position: relative;
			color: #303030;
			font-size: 20px;
			line-height: 80rpx
		}

		.fenxiang {
			margin-left: -20rpx;
			margin-top: -10px
		}

		.search {
			width: 55%;
			background: #F3F4F5;
			height: 60rpx;
			margin: 20rpx 20rpx 20rpx 20rpx;
			padding-left: 20rpx;
			border-radius: 50px;
			margin-top: 1px;

			text {
				color: #a6a7a8;
				font-size: 14px
			}
		}

		.div1 {
			height: 40rpx;
			width: 100%;
			background: #ffffff;
			border-radius: 30px 30px 0px 0px;
			position: absolute;
			bottom: 0px
		}

		.div2 {
			height: 40rpx;
			width: 92%;
			background: #ffffffb0;
			border-radius: 10px 10px 0px 0px;
			position: absolute;
			bottom: 5px;
			left: 4%;
			right: 6%
		}

		.div3 {
			height: 40rpx;
			width: 88%;
			background: #ffffff59;
			border-radius: 10px 10px 0px 0px;
			position: absolute;
			bottom: 10px;
			left: 6%;
			right: 8%
		}
	}

	.tab {
		background-image: linear-gradient(to top, #50e4c0, #23ccbe);
		width: 690rpx;
		height: 300rpx;
		border-radius: 24rpx;
	}
</style>
