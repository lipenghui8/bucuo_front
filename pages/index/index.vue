<template>
	<view class="">
		<view class="">
			<view class="vtop">
				<view v-if="!homeTop || scrollTop <= homeTop - (menuButtonInfo.top + 0 + 15)">
					<view class="title u-flex u-row-left u-p-l-30" :style="{marginTop: menuButtonInfo.top+'px'}">
						<text class="text">{{appName}}</text>
						<u-icon class="u-p-l-15 text" name="/static/icon/share.png" size="40"></u-icon>
						<button open-type="share"
							style="position: absolute;top: 20rpx;left: 200rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
					</view>
					<view class="div1"></view>
				</view>
				<view v-else :style="{marginTop: menuButtonInfo.top+'px'}">
					<view class="title u-flex u-row-left u-p-l-30">
						<u-icon class="u-p-l-15 fenxiang" name="/static/icon/share.png" size="40"></u-icon>
						<button open-type="share" type="text" name="username" value="ss" disabled="true"
							style="position: absolute;top: 20rpx;left: 20rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
						<view class="searchs u-flex u-row-left" @click="search">
							<u-icon name="/static/icon/search.png" size="36"></u-icon>
							<text class="u-p-l-15">搜索你想要的壁纸</text>
						</view>
					</view>
					<view v-if="UiType==0">
						<scroll-view scroll-x class="nav" :scroll-into-view="rolldistance"
							:scroll-with-animation="true">
							<view class="cu-item" :id="'akun'+(index+1)" :class="cateStatic==item.type?'text-yellow':''"
								@click="cateClick(item.type,item.more,'akun'+(index+2))"
								v-for="(item,index) in cateList" :key="index">
								{{item.name}}
							</view>
						</scroll-view>
					</view>
					<view v-if="UiType==1">
						<view class="div1"></view>
					</view>
				</view>
			</view>
			<view class="mtop" :style="{marginTop: 'calc('+menuButtonInfo.top+'px + 35px)'}"></view>
			<view class="content u-p-t-40">
				<view class="cu-bar search">
					<button open-type="share" type="text" name="username" value="ss" disabled="true"
						style="position: absolute;opacity: 0;"></button>
					<view class="search-form round" @click="search">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="搜索你想要的壁纸" confirm-type="search"></input>
					</view>
					<view class="action" @click="search">
						<button class="cu-btn bg-yellow shadow-blur round">搜索</button>
					</view>
				</view>
				<view class="banner u-p-t-20">
					<u-swiper :effect3d="true" width="100%" height="280" name="image" border-radius="10"
						effect3d-previous-margin="0" :list="bannerList" @click="bannerClick"></u-swiper>
				</view>
				
				<view class="aui-palace" v-if="!vuex_isShenHe&&vuex_indexUiType==0">
					<view @click="goToProfile()" class="aui-palace-grid">
						<view class="aui-palace-grid-icon">
							<img src="/static/icon/touxiang.png" alt="">
						</view>
						<view class="aui-palace-grid-text">
							<h2>精美头像</h2>
						</view>
					</view>
					<view @click="goToGallery()" class="aui-palace-grid">
						<view class="aui-palace-grid-icon">
							<img src="/static/icon/taotu.png" alt="">
						</view>
						<view class="aui-palace-grid-text">
							<h2>签名套图</h2>
						</view>
					</view>
					<view @click="divClick()" class="aui-palace-grid">
						<view class="aui-palace-grid-icon">
							<img src="/static/icon/div.png" alt="">
						</view>
						<view class="aui-palace-grid-text">
							<h2>刘海制作</h2>
						</view>
					</view>
					<view @click="cpsClick()" class="aui-palace-grid">
						<view class="aui-palace-grid-icon">
							<img src="/static/icon/renwu.png" alt="">
						</view>
						<view class="aui-palace-grid-text">
							<h2>省钱福利</h2>
						</view>
					</view>
					<view @click="findClick()" class="aui-palace-grid">
						<view class="aui-palace-grid-icon">
							<img src="/static/icon/gengduo.png" alt="">
						</view>
						<view class="aui-palace-grid-text">
							<h2>发现更多</h2>
						</view>
					</view>
				</view>
				<view v-if="!vuex_isShenHe&&vuex_indexUiType==1">
					<view>
						<view class="u-p-t-40">
							<scroll-view scroll-x style="" :scroll-into-view="rolldistance"
								:scroll-with-animation="true">
								<view class="m-nav">
									<view class="" id="akun1" style="padding: 0 16rpx;"></view>
									<view class="scroll-view-item dhs" :id="'akun'+(index+1)"
										:class="cateStatic==item.type?'tag-active':''"
										@click="cateClick(item.type,item.more,'akun'+(index+2))"
										v-for="(item,index) in indexList" :key="index">
										<navigator class="item" :url="item.url">
											<view class="image-wrap">
												<image mode="widthFix" :src="item.image"></image>
											</view>
											<view>
												{{item.name}}
											</view>
										</navigator>
									</view>
								</view>
							</scroll-view>
							<scroll-view scroll-x style="" :scroll-into-view="rolldistance"
								:scroll-with-animation="true">
								<view class="m-nav">
									<view class="" id="akun1" style="padding: 0 16rpx;"></view>
									<view class="scroll-view-item dhs" :id="'akun'+(index+1)"
										:class="cateStatic==item.type?'tag-active':''"
										@click="cateClick(item.type,item.more,'akun'+(index+2))"
										v-for="(item,index) in indesList" :key="index">
										<navigator class="item" :url="item.url">
											<view class="image-wrap">
												<image mode="widthFix" :src="item.image"></image>
											</view>
											<view>
												{{item.name}}
											</view>
										</navigator>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<view class="lanmu" v-if="!vuex_isShenHe&&vuex_indexUiType==2">
					<view class="gridSm g2">
						<view class="item" @click="goToProfile()">
							<view class="flex pd10 rds5" style="background-color: rgb(237, 238, 255);">
								<view class="cover">
									<view class="fz16 bold">精美头像</view>
									<view class="fz12" style="color: rgb(111, 116, 146);">男头·女头·情头</view>
								</view>
							</view>
						</view>
						<view class="item" @click="goToGallery()">
							<view class="flex pd10 rds5" style="background-color: rgb(255, 235, 236);">
								<view class="cover">
									<view class="fz16 bold">签名套图</view>
									<view class="fz12" style="color: rgb(111, 116, 146);">热门·精选·新潮</view>
								</view>
							</view>
						</view>
					</view>
					<view class="gridSm g3">
						<view class="item" @click="findClick()">
							<view class="flex pd10 rds5" style="background-color: rgb(251, 247, 236);">
								<view class="cover">
									<view class="fz16 bold">发现</view>
									<view class="fz12" style="color: rgb(146, 131, 112);">发现有趣的内容</view>
								</view>
							</view>
						</view>
						<view class="item" @click="taskClick()">
							<view class="flex pd10 rds5" style="background-color: rgb(251, 247, 236);">
								<view class="cover">
									<view class="fz16 bold">任务</view>
									<view class="fz12" style="color: rgb(146, 131, 112);">完成任务领积分</view>
								</view>
							</view>
						</view>
						<view class="item" @click="cpsClick()">
							<view class="flex pd10 rds5" style="background-color: rgb(251, 247, 236);">
								<view class="cover">
									<view class="fz16 bold">省钱</view>
									<view class="fz12" style="color: rgb(146, 131, 112);">精打细买更省钱</view>
								</view>
							</view>
						</view>
					</view>


				</view>
				<view v-if="UiType==0">
					<view class="u-p-t-40">
						<view class="u-p-l-30 u-p-r-30">
							<u-section title="网友推荐" :show-line="false" :bold="false" :font-size="36" sub-title="更多"
								@click="listClick('category','',-2)"></u-section>
						</view>
						<scroll-view scroll-x class="u-p-t-30" style="height: 380rpx;">
							<view class="u-flex u-row-left u-p-l-30 u-p-r-30">
								<!-- <block> -->
								<view class="tab" v-for="(item, index) in hotList" :key="index"
									@click="detail(item._id, 0, item.images)">
									<image
										:src="vuex_compressPicture?item.image+'?x-oss-process=image/resize,w_200/quality,q_100':item.image"
										style="width: 220rpx;height: 350rpx;" mode="aspectFill"></image>
								</view>
								<!-- </block> -->
								<view class="" style="width: 40rpx;">ㅤ</view>
							</view>
						</scroll-view>
					</view>
					<view class="u-p-t-30">
						<scroll-view scroll-x style="height: 80rpx;" :scroll-into-view="rolldistance"
							:scroll-with-animation="true">
							<view class="query u-m-t-10 u-m-b-10 u-m-r-30 u-flex u-row-left">
								<view class="" id="akun1" style="padding: 0 18rpx;"></view>
								<view class="scroll-view-item tags" :id="'akun'+(index+0)"
									:class="cateStatic==item.type?'tag-active':''"
									@click="cateClick(item.type,item.more,'akun'+(index+1))"
									v-for="(item,index) in cateList" :key="index">
									{{item.name}}
								</view>
								<view class="" style="width: 40rpx;">ㅤ</view>
							</view>
						</scroll-view>


						<view class="u-flex u-row-left u-flex-wrap u-p-l-30 u-p-t-15">
							<block v-for="(item, index) in flowList" :key="index">

								<!-- #ifdef MP-WEIXIN -->
								<view class="u-flex u-row-center u-col-center" v-show="adFlag"
									v-if="index != 0 && index%9 === 0">
									<ad :unit-id="vuex_videoUnitId" ad-type="video" ad-theme="white"></ad>
								</view>
								<!-- #endif -->
								<!-- #ifdef MP-QQ -->
								<view class="u-flex u-row-center u-col-center" v-show="adFlag"
									v-if="index != 0 && index%9 === 0">
									<ad :unit-id="vuex_qqUnitId" block-orientation="vertical" block-size="2"
										@load="adLoad" @error="adError" @close="adClose"></ad>
								</view>
								<!-- #endif -->
								<view class="tab" @click="detail(item.id, item.index, item.images)">
									<image :src="item.image+'?x-oss-process=image/resize,w_200/quality,q_80'" lazy-load
										style="width: 220rpx;height: 400rpx;" mode="aspectFill"></image>
								</view>
							</block>
						</view>
					</view>
				</view>
				<view v-if="UiType==1">
					<view class="u-p-l-30 u-p-r-30 u-p-t-40 u-p-b-30">
						<u-section title="最新发布" :show-line="false" :bold="false" :font-size="36" sub-title="更多"
							@click="listClick('category','',-1)"></u-section>
					</view>
					<view class="query"></view>
					<view class="u-p-l-20 u-p-r-20">
						<u-waterfall v-model="flowList" ref="uWaterfall">
							<template v-slot:left="{ leftList }">
								<view class="array" @click="signClick">
									{{vuex_isSign?'打卡完成':'今日打卡'}}
								</view>
								<view v-for="(item, index) in leftList" :key="item.key">
									<view class="pubucontent" @click="detail(item.id, item.index, item.images)">
										<u-lazy-load border-radius="10"
											:image="vuex_compressPicture?item.image+'?x-oss-process=image/resize,w_200/quality,q_80':item.image">
										</u-lazy-load>
									</view>
									<view class="artitle">{{item.name}}</view>
									<view class="quantity">{{item.images.length}}张</view>
								</view>
							</template>
							<template v-slot:right="{ rightList }">
								<view v-for="(item, index) in rightList" :key="item.key">
									<view class="contentpubu" @click="detail(item.id, item.index, item.images)">
										<u-lazy-load border-radius="10"
											:image="vuex_compressPicture?item.image+'?x-oss-process=image/resize,w_200/quality,q_80':item.image">
										</u-lazy-load>
									</view>
									<view class="artitle">{{item.name}}</view>
									<view class="quantity">{{item.images.length}}张</view>
								</view>
							</template>
						</u-waterfall>
					</view>
				</view>
				<u-loadmore :status="loadStatus" :font-size="24" :margin-top="30" :margin-bottom="20" color="#B8B8B8" />
				<view class="" style="height: 180rpx;"></view>
			</view>
		</view>

		<view class="loading_page" v-show="loadShow">
			<span class="loader-61"> </span>
		</view>
		<view @click="backTop" class="back backTop u-flex u-flex-col u-row-center u-col-center"
			:class="backShow?'backTop_show':'backTop_hide'">
			<image src="/static/backtop.png" style="width: 36rpx;height: 36rpx;"></image>
		</view>
		<view @click="search" class="back backSearch u-flex u-flex-col u-row-center u-col-center"
			:class="backShow?'backTop_show':'backTop_hide'">
			<image src="/static/search.png" style="width: 30rpx;height: 30rpx;"></image>
		</view>
		<models v-if="loginShow" title="为了更好的玩机体验，快去授权登录吧" btnText="授权登录" @getUserInfo="getUserInfo"
			@close="loginShow = false"></models>
		<models v-if="signShow" :authorize="false" :title="signTitle" btnText="知道了" closeText=" "
			@save="signShow = false"></models>
		<foo-bar @toIndex="toIndex" :home="0"></foo-bar>
	</view>
</template>
<script>
	// 获取系统状态栏的高度
	let menuButtonInfo = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif

	import fooBar from '@/components/fooBar/fooBar.vue'
	import models from '@/components/model/model.vue'



	export default {
		components: {
			fooBar,
			models
		},
		data() {
			return {
				menuButtonInfo: menuButtonInfo,
				flowList: [], //瀑布流参数

				// 加载
				loadShow: true,
				loginShow: false,
				scrollTop: 0,
				homeTop: 0,
				appName: '壁纸',
				// 首页数据
				bannerList: [],
				indexList: [],
				indesList: [],
				hotList: [],
				coverList: [],
				flowListIndex: 0,
				cateStatic: 'new',
				cateMort: '',
				UiType: 0,
				cateList: [{
						type: 'new',
						name: '全部',
						more: '',

					},
					{
						type: 'hot',
						name: '热门',
						more: '',

					},
					{
						type: '女生',
						name: '女生',
						more: 'tags',

					},
					{
						type: '情侣',
						name: '情侣',
						more: 'tags',

					},
					{
						type: '文字',
						name: '文字',
						more: 'tags',

					},
					{
						type: '手绘',
						name: '手绘',
						more: 'tags',

					},
					{
						type: '创意',
						name: '创意',
						more: 'tags',

					},
					{
						type: '动漫',
						name: '动漫',
						more: 'tags',

					}
				],
				// 下拉
				pageIndex: 0,
				loadStatus: 'loadmore',
				// 滚动的位置
				rolldistance: '',
				clickCateFirst: false,
				adFlag: true,
				backShow: false,
			}
		},
		async adLoad() {
			var that = this
			let interstitialAd = null
			// #ifdef MP-QQ
			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: that.vuex_qqInsertUnitId
				})
			}

			// 在适合的场景显示插屏广告
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
			// #endif
			// #ifdef MP-WEIXIN
			// 在页面中定义插屏广告

			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: that.vuex_InsertUnitId
				})
			}

			// 在适合的场景显示插屏广告
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
			// #endif

		},
		async onLoad({
			userId,
			detailId,
			index,

		}) {
			uni.hideTabBar()
			if (userId) uni.setStorageSync('userId', userId)
			if (detailId) uni.navigateTo({
				url: '/pages/detail/detail?id=' + detailId + '&index=' + index
			})
			let that = this
			await that.getConfig()
			await that.getIndex()
			if (that.vuex_indexUiType == 1) {
				that.getindexList()
				that.getindesList()
			}
			await that.getList(that.cateStatic, null, 1)
			// 获取分类位置
			that.$nextTick(function() {
				const query = uni.createSelectorQuery().in(that);
				query.select(".query").boundingClientRect(res => {
					if (res.bottom) {
						that.homeTop = (res.bottom + res.top) / 2
					}
				}).exec()
			})
			that.loadShow = false

		},
		methods: {
			async toIndex(index) {
				let that = this
				that.index = index
				if (index == 0) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (index == 1) {
					uni.switchTab({
						url: '/pages/center/center'
					})
				} else if (index == 2) {
					uni.switchTab({
						url: '/pages/list/list'
					})
				} else if (index == 3) {
					uni.switchTab({
						url: '/pages/user/user'
					})
				} else if (index == 4) {
					if (!that.vuex_user) {
						that.loginShow = true
						return
					}
					that.goToWrite()
				}
			},
			async getConfig() {
				let that = this;
				let config = await uniCloud.callFunction({
					name: 'config_search',
					data: {
						keys: ['isShenHe', 'uiType', 'appName']
					}
				});
				if (config.result.success) {
					that.$u.vuex('vuex_isShenHe', config.result.data[0])
					that.UiType = config.result.data[1] != '' ? parseInt(config.result.data[1]) : 0
					that.$u.vuex('vuex_appName', config.result.data[2])
					that.appName = config.result.data[2]
				}
			},
			async signClick() {
				var that = this
				if (!that.vuex_user) {
					that.loginShow = true
					return
				}
				console.log('that.vuex_isSign', that.vuex_isSign)
				if (that.vuex_isSign) return
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
				uni.hideLoading()
				console.log('sign.result', sign.result)
				if (sign.result.success) {
					that.signTitle =
						"<p style='font-weight: 550;font-size: 16px;'>签到成功</p><p style='padding-top: 10px;'>获得<span class='num'>" +
						sign.result.integral + "</span>积分</p>"
					that.signShow = true
					that.getUser()
					that.$u.vuex('vuex_isSign', true)
				} else {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: sign.result.msg,
						duration: 1500
					})
				}
			},

			async getIndex() {
				let that = this;
				let list = await uniCloud.callFunction({
					name: 'search_index',
					data: {
						'keys': [{
								name: 'search_list',
								data: {
									dbName: "wx_banner",
									pageIndex: 1,
									pageSize: 10,
									order: {
										name: 'sort',
										type: 'desc'
									}
								}
							},
							{
								name: 'search_list',
								data: {
									dbName: that.vuex_isShenHe ? "wx_cover_shenhe" : "wx_cover",
									filter: {
										"status": 1
									},
									order: {
										name: 'zan',
										type: 'desc'
									},
									pageIndex: 1,
									pageSize: 20
								},
							},

						],

					}
				})

				that.bannerList = list.result.data[0]
				that.hotList = list.result.data[1]
				console.log('list.result.data', list.result.data)
			},

			goToProfile() {
				uni.navigateTo({
					url: '/pagesOther/find/profile/profile'
				})
			},
			goToGallery() {
				uni.navigateTo({
					url: '/pagesOther/find/gallery/gallery'
				})
			},
			// 首页
			async getBannerList() {
				let that = this;
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: "wx_banner",
						pageIndex: 1,
						pageSize: 10,
						order: {
							name: 'sort',
							type: 'desc'
						}
					}
				})
				that.bannerList = list.result.data
			},
			async getindexList() {
				let that = this;
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: "wx_index",
						pageIndex: 1,
						pageSize: 5,
						order: {
							name: 'sort',
							type: 'desc'
						}
					}
				})
				that.indexList = list.result.data
			},
			async getindesList() {
				let that = this;
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: "wx_index1",
						pageIndex: 1,
						pageSize: 5,
						order: {
							name: 'sort',
							type: 'desc'
						}
					}
				})
				that.indesList = list.result.data
			},
			async getHotList() {
				let that = this;
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: that.vuex_isShenHe ? "wx_cover_shenhe" : "wx_cover",
						filter: {
							"status": 1
						},
						order: {
							name: 'view',
							type: 'desc'
						},
						pageIndex: 1,
						pageSize: 20
					},
				})
				that.hotList = list.result.data
			},
			async cateClick(e, f, t) {
				var that = this
				if (e != that.cateStatic) {
					if (t) that.rolldistance = t
					that.cateStatic = e
					that.cateMort = f
					that.clickCateFirst = true
					await that.getList(e, f, 1)
				}
				console.log('homeTop', that.homeTop)
				uni.pageScrollTo({
					scrollTop: that.homeTop * 0.75,
					duration: 0
				});
			},
			async getList(type, more, on) {
				let that = this;
				var newflowList = that.flowList
				var newList = that.coverList

				// 点击切换菜单 回复初始状态
				if (on == 1) {
					that.loadShow = true
					newflowList = []
					newList = []
					that.pageIndex = 0
				}
				that.pageIndex = that.pageIndex + 1
				that.loadStatus = 'loading'
				let list
				if (more) {
					if (more === 'tags') {
						list = await uniCloud.callFunction({
							name: 'search_list',
							data: {
								dbName: that.vuex_isShenHe ? "wx_cover_shenhe" : "wx_cover",
								tags: type,
								random: on == 1 ? 1 : 0,
								pageIndex: that.pageIndex,
								pageSize: 20
							},
						})
					} else if (more === 'category') {
						list = await uniCloud.callFunction({
							name: 'search_list',
							data: {
								dbName: that.vuex_isShenHe ? "wx_cover_shenhe" : "wx_cover",
								filter: {
									"status": 1,
									"category_name": type
								},
								order: {
									"name": "time",
									"type": "desc",
								},
								random: on == 1 ? 1 : 0,
								pageIndex: that.pageIndex,
								pageSize: 20
							},
						})
					}
				} else {
					var filter = {
							"status": 1
						},
						order = {}
					if (type == 'new') order = {
						"name": "time",
						"type": "desc"
					}
					else if (type == 'hot') order = {
						"name": "view",
						"type": "desc"
					}
					list = await uniCloud.callFunction({
						name: 'search_list',
						data: {
							dbName: that.vuex_isShenHe ? "wx_cover_shenhe" : "wx_cover",
							filter: filter,
							order: order,
							pageIndex: that.pageIndex,
							random: on == 1 ? 1 : 0,
							pageSize: 20
						},
					})
				}

				that.loadShow = false
				if (list.result.hasMore) {
					that.loadStatus = 'loadmore'
					that.clickCateFirst = false
				} else that.loadStatus = 'nomore'
				console.log('list.result.data', list.result.data)

				list.result.data.forEach(function(item) {
					newflowList.push({
						'index': 0,
						'image': item.image,
						'images': item.images,
						'category_name': item.category_name,
						'name': item.name,
						'id': item._id,
						'key': that.flowListIndex
					})
					that.flowListIndex += 1

				});
				that.flowList = newflowList
			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			bannerClick(index) {
				var bannerType = this.bannerList[index].type
				if (bannerType === 1) {
					uni.navigateToMiniProgram({
						appId: this.bannerList[index].appid,
						path: this.bannerList[index].path
					})
				}
				if (bannerType === 0) {
					uni.navigateTo({
						url: this.bannerList[index].url
					})
				}
			},
			taskClick() {
				if (!this.vuex_user) {
					this.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pages/integral/task'
				})
			},
			divClick() {
				if (!this.vuex_user) {
					this.loginShow = true
					return
				}
				uni.navigateTo({
					url: '/pagesOther/find/design/design'
				})
			},
			findClick() {
				uni.navigateTo({
					url: '/pagesOther/find/find'
				})
			},
			cpsClick() {
				uni.navigateTo({
					url: '/pagesOther/cps/cps'
				})

			},
			detail(id, index, images) {
				var str = JSON.stringify(images)
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&index=' + index
				})
			},
			listClick(type, pid, id) {
				uni.navigateTo({
					url: '/pages/searchlist/searchlist?type=' + type + '&pid=' + pid + '&id=' + id
				})
			},
			adLoad() {
				this.adFlag = true
			},
			adError(err) {
				this.adFlag = false
			},
			adClose() {
				this.adFlag = false
			},
			goToWrite() {
				uni.navigateTo({
					url: '/pages/write/write'
				})
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
					that.goToWrite()
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '登录成功,请重新操作',
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
			getLoginShow() {
				let that = this
				that.loginShow = true
			}

		},

		async onReachBottom() {
			let that = this;
			if (that.loadStatus == 'nomore') return
			if (that.clickCateFirst) return
			await that.getList(that.cateStatic, that.cateMort)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
			if (e.scrollTop > 1000) {
				this.backShow = true
			} else {
				this.backShow = false
			}
		},
		onShareAppMessage(res) {
			return {
				title: '精选手机壁纸、动漫二次元壁纸、明星创意潮图、抖音网红壁纸~',
				path: '/pages/index/index?userId=' + this.vuex_user._id,
				imageUrl: '/static/fenxiang.png'
			}
		},
		onShareTimeline(res) {
			return {
				title: '精选手机壁纸、动漫二次元壁纸、明星创意潮图、抖音网红壁纸~',
				path: '/pages/index/index',
				imageUrl: '/static/fenxiang.png'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vtop {
		position: fixed;
		top: 0;
		z-index: 999999;
		left: 0;
		width: 100%;
		height: 13%;
		background-color: #ffdf00;
		z-index: 999999;

		.title {
			position: relative;
			color: #303030;
			font-size: 18px;
			line-height: 80rpx
		}

		.fenxiang {
			margin-left: -20rpx;
			margin-top: -10px
		}

		.searchs {
			width: 55%;
			background: #F7F8FA;
			height: 60rpx;
			margin: 19rpx 19rpx 19rpx 19rpx;
			padding-left: 20rpx;
			border-radius: 50px;
			margin-top: 1rpx;

			text {
				color: #a6a7a8;
				font-size: 14px
			}
		}

		.div1 {
			height: 35rpx;
			width: 100%;
			background: #ffffff;
			border-radius: 50px 50px 0px 0px;
			position: absolute;
			bottom: 0px
		}
	}

	.nav {
		background: #fff;
		border-radius: 18px 18px 0px 0px;
		margin-top: 1px
	}

	.nav .cu-item:nth-child(1) {
		margin: 0 10px
	}

	.nav .cu-item {
		height: 45px;
		display: inline-block;
		line-height: 45px;
		margin: 0 5px;
		padding: 0 8px
	}

	.text-yellow {
		font-weight: bold
	}

	.bg-yellow {
		color: #fff;
	}

	.content {
		background: #ffffff;
		z-index: 1
	}

	.use-search {
		height: 40px;
		min-height: 40px
	}

	.use-search uni-text {
		color: silver
	}

	.use-search .top {
		margin-top: -20upx
	}

	.padding-lr {
		padding-left: 16px;
		padding-right: 16px
	}

	.bg-main {
		background: #F3F4F5
	}

	.w-full {
		width: 100%
	}

	.border-radius-lg {
		border-radius: 25px
	}

	.dflex-b {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.tab {
		position: relative;
		width: 220rpx;
		height: 400rpx;
		border-radius: 16rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;

		image {
			border-radius: 16rpx
		}

		.array {
			position: absolute;
			top: 18rpx;
			right: 0rpx;
			color: #FFFFFF;
			background-color: rgba(0, 0, 0, 0.4);
			padding: 0rpx 12rpx 0 16rpx;
			border-radius: 20rpx 0 0 20rpx;
			font-size: 14px
		}
	}

	.tagb {
		background: #fff;
		width: 100%;
		margin-top: 20px
	}

	.tagss {
		font-size: 14px;
		color: #909399;
		line-height: 40rpx;
		padding: 0 20rpx;
		margin-right: 10rpx;
		white-space: nowrap
	}

	.tag-actives {
		color: #333333;
		animation: tiaobig 0.8s ease-in-out alternate infinite;
		animation-iteration-count: 1;
		font-weight: 600
	}

	.tags {
		font-size: 14px;
		color: #909399;
		border-radius: 40rpx;
		line-height: 50rpx;
		margin-right: 20rpx;
		padding: 0 20rpx 0rpx 0rpx;
		white-space: nowrap
	}

	.tags:after {
		content: '';
		width: auto;
		min-width: 20px;
		height: 4px;

		border-radius: 10px;
		display: block;
		margin-top: 1px;
	}

	.tag-active:after {
		content: '';
		width: auto;
		min-width: 20px;
		height: 4px;
		background: #ffdf00;
		border-radius: 10px;
		display: block;
		margin-top: 1px;
	}

	.banner {
		width: 100%;
		padding: 0 30rpx
	}

	.tag-active {
		color: #333333;
		animation: tiaobig 0.8s ease-in-out alternate infinite;
		animation-iteration-count: 1;
		font-weight: 700;
	}

	@keyframes tiaobig {
		0% {
			transform: scale(0.98)
		}

		25% {
			transform: scale(1.08)
		}

		50% {
			transform: scale(0.94)
		}

		75% {
			transform: scale(1.06)
		}

		100% {
			transform: scale(1)
		}
	}

	.back {
		position: fixed;
		right: -80rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50rpx;
		padding: 8rpx;
		box-shadow: 0 0px 16px rgba(0, 0, 0, 0.2);
		transition-property: right;
		transition-duration: 0.6s;

		image {
			display: block
		}

		.text {
			font-size: 12px
		}
	}

	.backSearch {
		bottom: 300rpx;
		background-color: #21222385;

		.text {
			color: #FFFFFF
		}
	}

	.backTop {
		bottom: 200rpx;
		background-color: #21222385;

		.text {
			color: #fff
		}
	}

	.backTop_show {
		right: 20rpx !important
	}

	.backTop_hide {
		right: -80rpx !important
	}

	.m-nav {
		margin-bottom: 0rpx;
		display: flex;
		justify-content: center;
		text-align: center;
		font-size: 25rpx
	}

	.m-nav .item {
		padding: 15rpx 0;
		flex: 1;
		background-color: #FFFFFF
	}

	.m-nav .image-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%
	}

	.dhs {
		font-size: 12px;
		color: #000000;
		border-radius: 10rpx;
		line-height: 60rpx;
		padding: 0 11rpx;
		margin-right: 5%;
		white-space: nowrap
	}

	.m-nav .item image {
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto 20rpx
	}

	.index {
		padding-left: 10% !important;
		padding-right: 10% !important;
		padding-top: 15px
	}

	.lanmu {
		padding-left: 5px !important;
		padding-right: 5px !important;
		padding-top: 5px
	}

	.gridSm {
		margin: 0 -5px;
		width: auto
	}

	.g2 .item {
		width: 50%;
		padding: 0 5px;
		margin-bottom: 10px
	}

	.g3 .item {
		width: 33.33333%;
		padding: 0 5px;
		margin-bottom: 10px
	}

	.pd10 {
		padding: 10px !important
	}

	.rds5,
	.radius5 {
		border-radius: 5px !important
	}

	.flex {
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center
	}

	.flex,
	.grid,
	.gridSm {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex
	}

	.flex>.cover,
	.grid>.cover,
	.gridSm>.cover {
		-webkit-box-flex: 1;
		-webkit-flex: auto;
		flex: auto
	}

	.text-bold,
	.bold {
		font-weight: 400 !important
	}

	.fz16 {
		font-size: 16px !important
	}

	.fz12 {
		padding-top: 5px;
		font-size: 12px !important
	}

	.square {
		width: 100%;
		position: relative;
		height: auto
	}

	@media screen and (max-width:375px) {
		.fz12 {
			padding-top: 5px;
			font-size: 12px !important;
			max-width: 80px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap
		}
	}

	.mtop {
		padding-top: 0px;
	}

	@media screen and (min-width:414px) {
		.mtop {
			padding-top: 10px;
		}
	}

	.bg-yellow {
		background: #ffdb22;
	}

	.pubucontent {
		margin: 10rpx 8rpx 15rpx 10rpx;
	}

	.contentpubu {
		margin: 10rpx 8rpx 15rpx 10rpx;
	}

	.array {
		background: linear-gradient(90deg, #ffdb22 0, #ffb821 45%, #ff5c38);
		margin-left: 5px;
		margin-right: 5px;
		margin-top: 5px;
		margin-bottom: 10px;
		padding: 20px 15px;
		border-radius: 5px;
		text-align: center;
		font-weight: bold;
		color: #fff;
		font-size: 18px;
	}

	.array .item_text {
		font-size: 12px;
		font-weight: 200;
		margin-top: 10rpx;
	}

	.artitle {
		margin-left: 5px;
		color: #000;
		font-size: 14px;
		font-weight: 800;
	}

	.quantity {
		margin-left: 5px;
		color: #d5d5d5;
		font-size: 12px;
		margin-bottom: 10px;
		font-weight: 600;
	}

	.adjiange {
		margin-left: 5px;
		margin-right: 5px;
	}

	.aui-palace {
		padding: 10px 0;
		position: relative;
		overflow: hidden;
		background: white;
	}

	.aui-palace-grid {
		position: relative;
		float: left;
		padding: 1px;
		width: 20%;
		box-sizing: border-box;
		margin: 10px 0;
	}



	.aui-palace-grid-icon {
		width: 40px;
		height: 40px;
		margin: 0 auto;
	}

	.aui-palace-grid-icon img {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
	}

	.aui-palace-grid-text {
		display: block;
		text-align: center;
		color: #333;
		font-size: 12px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: 5px;
	}

	.aui-palace-grid-text h2 {
		font-size: 12px;
		font-weight: normal;
		color: #464646;
	}


	@-webkit-keyframes animloader61 {
		0% {
			height: 48px;
		}

		100% {
			height: 4.8px;
		}
	}

	@keyframes animloader61 {
		0% {
			height: 48px;
		}

		100% {
			height: 4.8px;
		}
	}

	@-webkit-keyframes animloader61m {
		0% {
			height: 40px;
			transform: translateY(0);
		}

		100% {
			height: 10px;
			transform: translateY(30px);
		}
	}

	@keyframes animloader61m {
		0% {
			height: 40px;
			transform: translateY(0);
		}

		100% {
			height: 10px;
			transform: translateY(30px);
		}
	}
</style>
