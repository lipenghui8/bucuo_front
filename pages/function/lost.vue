<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">失物招领</block>
		</cu-custom>	
		<view class="wrap">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<view class="bg-white solid-bottom text-center padding">
				<view class="action  ">
					<text class="cuIcon-titles text-orange">
					登记须知
					</text> 
				</view>
				</view>
				<view class="case flex-sub text-left shadow bg-white">
					<view class="text-black text-bold ">你需要做什么？</view>
					<view>1.填写学号或ID号</view>
					<view>2.填写物品名称</view>
					<view>3.填写放置地点</view>
					<view class="text-black text-bold">不错校园会做什么？</view>
					<view>如果失主是星会员,失主将收到手机短信提醒</view>
					<view>如果失主是其他用户,失主将在小程序内收到提醒</view>
					<view>当失主确认收到物品后,你将获得1芝士币（上限10）</view>				
					<view>此外,失主也可选择向你赠送星会员/普通会员</view>				
				</view>
				<view 
				class="case flex-sub text-center shadow bg-white"
				style="margin-top: 30rpx;"
				>
					<view class="action  ">
						<text class="cuIcon-titles text-orange">
						登记单
						</text> 
					</view>
					<u-form>
						<u-form-item
						label="学号  "
						>
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="ID   ">
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="物品名称"
						>
							<u-input></u-input>
						</u-form-item>
						<u-form-item
						label="存放地点"
						>
							<u-input></u-input>
						</u-form-item>
					</u-form>
					<uni-button
					class="cu-btn round bg-cyan lg"
					>提交登记单</uni-button>
					
				</view>									
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			showSex: false
	}
	},
	methods: {

	},
};
</script>