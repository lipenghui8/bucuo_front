<!-- 帖子内容 -->
<template>
	<view class="container">
		<cu-custom bgColor="#FFF" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"></block>
		</cu-custom>
		<view class="content" v-if="projectList.length > 0">
			<view class="titleName">{{ projectList[isIndex].title }}</view>
			<view class="titleOther">
				<span style="margin-right: 10rpx;">{{ projectList[isIndex].author }}</span>
				<span>{{ projectList[isIndex].time }}</span>
			</view>

			<view class="explainBox">
				<view class="explainItem" v-for="(item, index) in projectList[isIndex].introduceText" :key="index">
					<span>{{ projectList[isIndex].introduceText[index] }}</span>
				</view>
			</view>

			<view class="imgBox"><image v-for="(item, index) in projectList[isIndex].introduceImg" :key="index" mode="aspectFit" :src="item"></image></view>
			<view class="like">
				<image @click="like=!like" mode="aspectFill" :src="dianzan"></image>
				<image @click="collect=!collect" mode="aspectFill" :src="shoucan"></image>
			</view>
		</view>
	</view>
</template>

<script>
import request from '@/common/request.js';
export default {
	data() {
		return {
			isIndex: 0,
			projectList: [],
			like: false,
			collect: false,
		};
	},
	computed:{
		dianzan(){
			if(this.like){
				return 'http://bucuo.liph.top/static/news/dianzan_true.png'
			}
			else{
				return 'http://bucuo.liph.top/static/news/dianzan_false.png'
			}
		},
		shoucan(){
			if(this.collect){
				return 'http://bucuo.liph.top/static/news/shoucan_true.png'
			}
			else{
				return 'http://bucuo.liph.top/static/news/shoucan_false.png'
			}
		}
	},
	watch: {},
	onLoad(option) {
		console.log(option.proId);
		this.isIndex = option.proId;
		console.log(this.projectList);
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			console.log('数据加载');
			let opts = {
				url: 'json/project.json',
				method: 'get'
			};
			uni.showLoading({
				title: '加载中'
			});
			request.httpRequest(opts).then(res => {
				console.log(res);
				uni.hideLoading();
				if (res.statusCode == 200) {
					this.projectList = res.data.data;
					console.log(this.projectList);
				} else {
				}
			});
		}
	}
};
</script>

<style scoped>
.content {
	padding: 30rpx;
}
.like{
	width: 270rpx;
	height: 100rpx;
	position: fixed;
	bottom: 10rpx;
	right: 10rpx;
	display: flex;
	padding: 10rpx 10rpx;
	justify-content: space-around;
	background-color: #FFF;
	border-radius: 45rpx;
}
.like image{
	width: 80rpx;
	height: 80rpx;
	align-items: center;
}
.titleName {
	text-align: center;
	font-size: 36rpx;
	color: #333;
	margin-bottom: 15rpx;
}
.titleOther {
	text-align: center;
	font-size: 26rpx;
	color: #8799a3;
	margin-bottom: 15rpx;
}
.imgBox image {
	width: 90%;
	margin: 20rpx auto;
	display: block;
}
.explainBox {
	color: #8799a3;
}
.explainItem {
	margin-bottom: 16rpx;
}
</style>
