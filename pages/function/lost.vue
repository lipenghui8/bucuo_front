<template>
	<view>
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">失物招领</block>
		</cu-custom>	
		<view class="wrap" style="margin: 32rpx;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<view class="case flex-sub text-left shadow bg-white"
					style="border-radius: 20rpx;"
				>
					<view class="cuIcon-titles text-orange text-center">
					登记须知
					</view> 
					<view class="text-black text-item text-bold ">你需要做什么？</view>
					<view class="text text-item" >1.填写学号或ID号</view>
					<view class="text text-item">2.填写物品名称</view>
					<view class="text text-item">3.填写放置地点</view>
					<view class="text-black text-bold text-item">不错校园会做什么？</view>
					<view class="text text-item">如果失主是星会员,失主将收到手机短信提醒</view>
					<view class="text text-item">如果失主是其他用户,失主将在小程序内收到提醒</view>
					<view class="text text-item">当失主确认收到物品后,你将获得1芝士币（上限10）</view>				
					<view class="text text-item">此外,失主也可选择向你赠送星会员/普通会员</view>				
				</view>
				<view 
				class="case flex-sub text-center shadow bg-white"
				style="margin-top: 30rpx; border-radius: 20rpx;"
				>
					<view>
						<text class="cuIcon-titles text-orange">
						登记单
						</text> 
					</view>
					<u-form>
						<u-form-item
						label="学号  "
						label-width="80px"
						>
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="ID   "
						label-width="80px"
						>
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="物品名称"
						label-width="80px"
						>
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="存放地点"
						label-width="80px"
						
						>
							<u-input></u-input>
						</u-form-item>
					</u-form>
					<uni-button
					class="cu-btn round bg-cyan lg"
					style="width: 100%;"
					
					>提交登记单</uni-button>
					
				</view>									
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			showSex: false,
	}
	},
	methods: {

	},
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

<style lang="scss">
	.text-item{
		margin-left: 20rpx;
	}
	.u-form-item--left__content{
		background-image: linear-gradient(45deg,#0081ff,#1cbbb4);
		color: #fff;
		border-radius: 20rpx;
		
	}
</style>

