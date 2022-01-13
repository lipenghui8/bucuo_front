<template>
	<view>
		
		<view class="tab-container" :hidden="tabHidden">
			<view class="ranking u-p-l-40 u-p-t-20 u-p-r-40 u-flex u-row-left">
				<view class="tab u-flex-col u-col-center u-row-center" hover-class="cate-active" hover-stay-time="50"
					@tap="dayTap">
					<view class="">每日精选</view>
					<view class="u-font-10 u-p-t-10 eng">Daily selection</view>
				</view>
				<view class="tab u-flex-col u-col-center u-row-center" hover-class="cate-active" hover-stay-time="50"
					@tap="chaoQingTap">
					<view class="">60帧超清</view>
					<view class="u-font-10 u-p-t-10 eng">Ultra clear</view>
				</view>
				<view class="tab u-flex-col u-col-center u-row-center" hover-class="cate-active" hover-stay-time="50"
					@tap="QLTap">
					<view class="">情侣壁纸</view>
					<view class="u-font-10 u-p-t-10 eng">Couple wallpaper</view>
				</view>
			</view>
		</view>
		<scroll-view @refresherrefresh="refresh" @scrolltolower="onScrollToLower" class="scroll-body" :enhanced="true"
			:lowerThreshold="100" :refresherEnabled="true" :refresherTriggered="refreshStatus" :scrollTop="scrollTop"
			:scroll-y="true" :showScrollbar="false" :style="'height:' + scrollH">
			<block v-for="(item, index) in videos" :key="index">
				<view @tap="preview" class="grid-item" :data-item="item">
					<view class="g">
						<image class="photo" mode="aspectFill" :src="item.thumb_img"></image>
						<view class="info">
							<text class="title">{{item.title}}</text>
							<view class="count-container">
								<image class="iv" src="/static/images/play_num.png"></image>
								<text class="count">{{item.play_num}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="index!=0&&(index+1)%8==0">
					<ad unit-id="6049f5ae314ffc08bd3e03cd998bfb4d" type="card"></ad>
				</view>
			</block>


		</scroll-view>
		<block v-if="!loadFlag">
			<view :class="['bottom',cssTran?'closeCss':'openCss']">
				<view class="nav-box">
					<view class="nav-tab">
						<u-icon vue-id="3db16520-5" name="/static/icon/back.png" :size="44" @__l="__l"></u-icon>
						<text>返回</text><button @tap="fh"
							style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"
							open-type="navigateBack"></button>
					</view>
					<view class="nav-tab">
						<u-icon vue-id="3db16520-5" name="/static/images/search.png" :size="44" @__l="__l"></u-icon>
						<text>搜索</text><button @click="searchTap"
							style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"
							open-type="navigateBack"></button>
					</view>
					<view class="nav-tab">
						<u-icon vue-id="3db16520-5" name="/static/icon/backtop.png" :size="44" @__l="__l"></u-icon>
						<text>顶部</text><button @click="backTop"
							style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"
							open-type="navigateBack"></button>
					</view>
					<view class="nav-tab">
						<u-icon vue-id="3db16520-5" name="/static/icon/shares.png" :size="44" @__l="__l"></u-icon>
						<text>分享</text><button style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"
							open-type="share"></button>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var e,
		t = require("../../utils/api"),
		i = getApp(),
		a = null,
		o = "";

	export default {
		data() {
			return {
				videos: [],
				refreshStatus: !1,
				scrollTop: 0,
				hideGuide: !0,
				scrollH: "81%"
			};
		},

		components: {},
		props: {},
		onShow: function() {
			t.refreshUsedTimeAndDate();
		},
		onLoad: function() {
			this.initHideGuide();
			var that = this;
			uni.showLoading({
				title: "加载中..."
			});
			o = that.vuex_isShenHe ? "情侣壁纸" : "视频壁纸榜";
			e = 1;
			that.getSearchVideo();

		},
		async onReachBottom() {
			console.log('翻页', e)
			e += 1, this.getSearchVideo(), 3 == e && a && a.show().catch(function(e) {
				console.error(e);
			});
		},
		onShareAppMessage: function() {
			return {
				title: "海量高清手机壁纸，动态壁纸，情侣头像",
				path: "/pagesOther/find/dynamic/dynamic"
			};
		},
		methods: {
			fh: function() {
				uni.navigateBack();
			},
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			getSearchVideo: function() {
				var i = this,
					a = this.videos;
				uni.showLoading({
					title: "加载中..."
				})
				t.getSearchVideo(o, e, function(t) {
					1 == e && (a = [], i.setData({
						scrollTop: 0
					}));
					for (var o = 0; o < t.length; o++) "1" != t[o].is_ads && a.push(t[o]);

					i.setData({
						videos: a,
						refreshStatus: !1
					}), uni.stopPullDownRefresh(), uni.hideLoading();
				}, function(e) {
					uni.stopPullDownRefresh(), uni.hideLoading();
				});
			},
			preview: function(e) {
				console.log('preview', e)
				var t = e.currentTarget.dataset.item.video_preview_url,
					i = e.currentTarget.dataset.item.thumb_img,
					title = e.currentTarget.dataset.item.title;
				uni.navigateTo({
					url: "/pagesOther/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(t) + "&imgSrc=" +
						encodeURIComponent(i) + "&title=" + title
				});
			},
			refresh: function(t) {
				console.log('刷新', e)
				e = 1, this.getSearchVideo(), this.setData({
					refreshStatus: !0
				});
			},
			onScrollToLower: function(t) {
				console.log('翻页', e)
				e += 1, this.getSearchVideo(), 3 == e && a && a.show().catch(function(e) {
					console.error(e);
				});
			},
			searchTap: function(e) {
				uni.navigateTo({
					url: "/pagesOther/searchvideo/searchvideo"
				});
			},
			dayTap: function(t) {
				uni.showLoading({
					title: "加载中..."
				}), o = "精选", e = 1, this.getSearchVideo();
			},
			chaoQingTap: function(t) {
				uni.showLoading({
					title: "加载中..."
				}), o = "超清", e = 1, this.getSearchVideo();
			},
			QLTap: function(t) {
				uni.showLoading({
					title: "加载中..."
				}), o = "情侣壁纸", e = 1, this.getSearchVideo();
			},
			initHideGuide: function() {
				var e = this;
				uni.getStorage({
					key: "hideGuide",
					success: function(t) {
						e.setData({
							hideGuide: t.data
						}), e.hideGuide ? e.setData({
							scrollH: "88%"
						}) : e.setData({
							scrollH: "81%"
						});
					},
					fail: function(t) {
						e.setData({
							hideGuide: !1,
							scrollH: "81%"
						});
					}
				});
			},
			onShareTimeline: function() {
				return {
					path: '/pagesOther/find/dynamic/dynamic',
					title: "海量高清手机壁纸，动态壁纸，情侣头像"
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-container {
		height: 60rpx;
		margin: 0 20rpx;
		background: #f7f8fa;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
		border-radius: 10px;
	}

	.search {
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}

	.text {
		width: 90%;
		font-size: 24rpx;
	}

	.ranking {

		.tab {
			width: 226rpx;
			height: 100rpx;
			border-radius: 12rpx;
			color: #FFFFFF;

			.eng {
				color: #F5F5F5
			}
		}

		.tab:nth-child(1) {
			background-image: linear-gradient(to bottom right, #8acfaf, #5FBB92, #5FBB92, #8acfaf);
			margin-right: 11rpx;
			margin-left: -2%;

		}

		.tab:nth-child(2) {
			background-image: linear-gradient(to bottom right, #f0d35c, #F0B347, #F0B347, #f0d35c);
			margin-right: 11rpx
		}

		.tab:nth-child(3) {
			background-image: linear-gradient(to bottom right, #8c99de, #836AF0, #836AF0, #8c99de);
			margin-right: 11rpx
		}
	}


	.add_container {
		width: 100%;
		height: 6%;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #fffacd;
		margin-bottom: 10rpx;
		position: relative;
	}

	.add_container text {
		color: #333;
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	.img_cancel {
		position: fixed;
		right: 30rpx;
		height: 45rpx;
		width: 45rpx;
	}

	.scroll-body {
		width: 100%;
	}

	.tab-container {
		height: 12%;
		width: 100%;
		flex-direction: row;
		box-sizing: border-box;
		padding-bottom: 10rpx;
		padding-top: 10rpx;
	}

	.tab-container,
	.tab-item {
		display: flex;
		align-items: center;
	}

	.tab-item {
		width: 25%;
		height: 100%;
		flex-direction: column;
		font-size: 25rpx;
		font-weight: 700;
		margin-top: 4rpx;
	}

	.img-container1 {
		background-color: #20b2aa;
	}

	.img-container1,
	.img-container2 {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}

	.img-container2 {
		background-color: red;
	}

	.img-container3 {
		background-color: #87cefa;
	}

	.img-container3,
	.img-container4 {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}

	.img-container4 {
		background-color: plum;
	}

	.img {
		width: 50rpx;
		height: 50rpx;
	}

	.search {
		width: 45rpx;
		height: 45rpx;
		margin-left: 30rpx;
	}

	.grid-item {
		margin: 10rpx 0 10rpx 20rpx;
		width: 46%;
		height: 617rpx;
		float: left;
	}

	.g {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.g,
	.photo {
		width: 100%;
		height: 100%;
	}

	.photo {
		border-radius: 8px;
	}

	.info,
	.photo {
		position: absolute;
	}

	.info {
		width: 100%;
		display: flex;
		flex-direction: column;
		bottom: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.title {
		height: 40%;
		width: 100%;
		font-size: 26rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		color: #fff;
		text-shadow: 0 0 2px #000;
		margin-bottom: 6rpx;
		margin-left: 2rpx;
	}

	.count-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.count {
		font-size: 24rpx;
		color: #fff;
		text-shadow: 0 0 2px #000;
	}

	.iv {
		width: 36rpx;
		height: 36rpx;
		margin-right: 5rpx;
		box-shadow: 0 0 2px #fff;
		border-radius: 50px;
	}

	.adContainer {
		box-sizing: border-box;
		padding: 10rpx;
		width: 100%;
		float: left;
	}

	.nav-tab {
		position: relative;
		width: 100%;
		height: 52px;
		font-size: 12px;
		color: #D8D8D8;
		font-weight: 400;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.nav-box {
		/* position: absolute; */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		box-sizing: border-box;
	}

	.openCss {
		animation-name: openLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: 40px;
	}

	@keyframes openLinear {
		0% {
			transform: translateY(92px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	.closeCss {
		animation-name: closeLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: -52px;
	}

	.bottom {
		position: fixed;
		left: 4%;
		right: 0;
		width: 92%;
		height: 52px;
		box-shadow: 0 0px 8px rgba(0, 0, 0, 0.06);
		background: rgba(0, 0, 0, 0.94);
		border-radius: 49px;
		z-index: 10;
		opacity: 0.8;
	}
</style>
