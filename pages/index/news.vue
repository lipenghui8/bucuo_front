<!-- TabBar 文章资讯 -->
<template>
	<view>
		<news/>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	import news from '@/components/news/news.vue'
	export default {
		components:{
			news
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				newsList: '',
				navTop:[
					{
						id: 1,
						title: '消息'
					},
					{
						id: 2,
						title: '通知'
					},
					{
						id: 3,
						title: '好友'
					}
				]
			};
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				let opts = {
					url: 'json/newsList.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					// console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.newsList = res.data.data;
						console.log(this.newsList);
					} else {
						console.log('数据请求错误～');
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			goNews(id){
				uni.navigateTo({
					url: '../news/news?id='+ id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.borderBottom{
		border-bottom: 1px solid #f2f2f2;
	}
</style>
