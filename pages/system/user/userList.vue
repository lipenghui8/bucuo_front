<template>
	<view>
		<view class="menu u-m-l-30 u-m-r-30">
			<u-tabs :list="tagList" :is-scroll="false" active-color="#ffc106" :current="tagCurrent" @change="cateClick"></u-tabs>
		</view>
		<view class="" style="padding-top: 80rpx;">
			<view class="" v-for="(item, index) in userList" :key="index">
				<!-- <u-gap height="15" bg-color="#F5F6F8"></u-gap> -->
				<view class="u-flex u-row-left u-col-top u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20 border-top">
					<image class="avatar" :src="item.avatar"></image>
					<view class="btns u-flex u-row-between u-p-l-20 u-p-t-10">
						<view class="">
							<view class="title u-font-10 u-line-1">
								{{item.name}}
							</view>
							<view class="u-tips-color u-p-t-10 u-font-12">
								积分：{{item.integral}}
							</view>
						</view>
						<view class="tags_ tag-active_" @click="moreClick(item, item.status, item.integral)">操作</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="noData"
		class="u-flex u-flex-col u-col-center"
		style="width: 100vw;height: 50vh;padding-top: 200rpx;background-color: #FFFFFF;">
			<view class="">
				<image style="width: 300rpx;height: 300rpx;" src="/static/nodata.png"></image>
			</view>
			<view class="u-tips-color u-font-12 u-p-t-30">
				没有数据哦~
			</view>
		</view>
		
		<view class="" v-if="!noData">
			<u-loadmore :status="loadStatus" :font-size="24" :margin-top="30" :margin-bottom="30" color="#B8B8B8"/>
		</view>
		<view class="safe-area-inset-bottom">
			<view class="" style="height: 1px;"></view>
		</view>
		<u-modal v-model="editShow" title="权限等级" :show-cancel-button="true" confirm-text="保存" confirm-color="#fcc600" content="content" :async-close="true"  @confirm="editChange" negative-top="280">
			<view class="u-p-40">
				<view class="u-p-t-15">
					<u-radio-group v-model="powerValue" @change="radioGroupChange">
						<u-radio active-color="#fdc621" size="50" :name="0">用户</u-radio>
						<u-radio active-color="#fdc621" size="50" :name="1">超管</u-radio>
						<u-radio active-color="#fdc621" size="50" :name="2">普管</u-radio>
					</u-radio-group>

				</view>
			</view>
		</u-modal>
		<u-action-sheet :list="sheetList" :safe-area-inset-bottom="true" v-model="sheetShow"  @click="sheetClick"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagCurrent: 0,
				tagList: [{
					name: '正常'
				}, {
					name: '封禁'
				}],
				sheetList: [],
				userId: '',
				userItem: {},
				// 用户列表
				userList: [],
				sheetShow: false,
				// 无数据
				noData: false,
				editShow: false,
				// 分页
				pageIndex: 0,
				loadStatus: 'loadmore',
				powerList: [
					{
						name: '超管',
						disabled: false
					},
					{
						name: '普通管理',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				powerValue: '普通管理',
			}
		},
		async onLoad() {
			var that = this
			await that.getUserList(1)
		},
		methods: {
			async getUserList(on){
				var that = this
				that.loadStatus ='loading'
				var newList = that.userList
				if(on == 1){
					that.userList = []
					newList = []
					that.pageIndex = 0
				}
				
				that.pageIndex = that.pageIndex + 1
				var filter = {}
				if(that.tagCurrent == 1) filter = {'status': 2}
				else filter = {'status': 1}
				let list = await uniCloud.callFunction({
					name: 'search_list',
					data: {
						dbName: "wx_user",
						filter: filter,
						order: {
							name: 'time',
							type: 'desc'
						},
						pageIndex: that.pageIndex,
						pageSize: 15
					},
				})
				
				if(list.result.hasMore) that.loadStatus = 'loadmore'
				else that.loadStatus = 'nomore'
				
				newList = newList.concat(list.result.data)
				that.userList = newList
				
				if(that.userList.length == 0) that.noData = true
				else that.noData = false
			},
			cateClick(e){
				if(e == this.tagCurrent) return
				this.tagCurrent = e
				this.getUserList(1)
			},
			moreClick(item, status, integral){
				var that = this
				that.userId = item._id
				that.userItem = item
				if(status === 1){
					that.sheetList = [{
						text: '他的作品' 
					},{
						text: '他的订单' 
					},{
						text: '他的出售' 
					},{
						text: '他的积分' ,
						integral: integral 
					},{
						text: '增加积分'
					},{
						text: '封禁账户' 
					},{
						text: '权限设置' 
					}]
				}
				if(status === 2){
					that.sheetList = [{
						text: '他的作品' 
					},{
						text: '他的订单' 
					},{
						text: '他的出售' 
					},{
						text: '他的积分',
						integral: integral 
					},{
						text: '增加积分'
					},{
						text: '解除封禁' 
					},{
						text: '权限设置' 
					}]
				}
				that.sheetShow = true
			},
			async sheetClick(index){
				var that = this
				var text = that.sheetList[index].text
				if(text === '封禁账户' || text === '解除封禁'){
					
					var status = 1, msg = "确定解除封禁状态吗？"
					if(text === '封禁账户') status = 2, msg = "确定封禁当前账户吗？"
					
					uni.showModal({
						title: '封禁提示',
						content: msg,
						confirmText: '封禁',
						confirmColor: '#fcc600',
						success: async function (res) {
							if (res.confirm) {
								uni.showLoading({
									mask: true,
									title: '正在拼命加载中...'
								})
								let query = await uniCloud.callFunction({
									name: 'search_edit',
									data: {
										dbName: 'wx_user',
										filter: {
											'_id': that.userId
										},
										upData: {
											status: status
										}
									},
								})
								if(query.result.success){
									that.getUserList(1)
								}
								uni.showToast({
									icon: 'none',
									title: query.result.msg,
									mask: true,
									duration: 1000
								})
							}
						}
					})
				}else if(text === '他的作品'){
					uni.navigateTo({
						url: '/pages/system/cover/coverList?userId='+that.userId
					})
				}else if(text === '他的订单'){
					uni.navigateTo({
						url: '/pages/order/order?userId='+that.userId
					})
				}else if(text === '他的出售'){
					uni.navigateTo({
						url: '/pages/order/order?authorId='+that.userId
					})
				}else if(text === '他的积分'){
					uni.navigateTo({
						url: '/pages/integral/record?userId='+that.userId+'&integral='+that.sheetList[index].integral
					})
				}else if(text === '增加积分'){
					uni.navigateTo({
						url: '/pages/system/user/integralEdit?userId='+that.userId
					})
				}else if(text === '权限设置'){
					that.powerValue = that.userItem.system
					that.editShow = true
				}
				
			},
			async changeUserPower(){
				var that = this
				uni.showModal({
					title: '设置提示',
					content: '确定修改该账户权限吗？',
					confirmText: '设置',
					confirmColor: '#fcc600',
					success: async function (res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
								title: '正在拼命加载中...'
							})
							let query = await uniCloud.callFunction({
								name: 'search_edit',
								data: {
									dbName: 'wx_user',
									filter: {
										'_id': that.userId
									},
									upData: {
										system:  that.powerValue
									}
								},
							})
							if(query.result.success){
								that.getUserList(1)
								
							}
							uni.showToast({
								icon: 'none',
								title: query.result.msg,
								mask: true,
								duration: 1000
							})
						}
						that.editShow = false
					}
				})
				
			},
			// 选中某个单选框时，由radio时触发
			async editChange() {
				var that = this
				if(that.powerValue == that.userItem.system){
					that.$u.toast("权限未发生更改");
					that.editShow = false
					return
				}
			
				await that.changeUserPower()
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(name) {
				this.powerValue = parseInt(name);
			},
			editClick(id){
				uni.navigateTo({
					url: '/pages/write/edit?id='+id
				})
			},
			stockClick(id){
				uni.navigateTo({
					url: '/pages/write/stock?id='+id
				})
			}
		},
		onReachBottom(){
			let that = this;
			if(that.loadStatus == 'nomore') return
			that.getUserList()
		},
	}
</script>

<style lang="scss">
	.menu{
		position: fixed;
		left: 0;
		width: calc(100% - 60rpx);
		z-index: 99;
		background-color: #FFFFFF;
	}
	
	.tags_{
		font-size: 12px;
		color: #909399;
		border: 1rpx solid #B8B8B8;
		border-radius: 8rpx;
		line-height: 46rpx;
		padding: 0 20rpx;
	}
	
	.tag-active_{
		background-image: linear-gradient(to right, #fcfc44 , #f8c93c);
		color: #3a1800;
		// box-shadow: 0px 0px 10px #fff8ab;
		animation: tiaobig 0.8s ease-in-out alternate infinite;
		animation-iteration-count:1;
		border: none;
	}
	
	.avatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.btns{
		width: 580rpx;
		.title{
			font-weight: 550;
		}
	}
	.border-top{
		border-top: 1rpx solid #F3F4F6;
		position: relative;
	}
	@keyframes tiaobig {
		0% {
			transform: scale(0.92);
		}
		25% {
			transform: scale(1.08);
		}
		50% {
			transform: scale(0.96);
		}
		75% {
			transform: scale(1.06);
		}
		100% {
			transform: scale(0.94);
		}
	}
</style>