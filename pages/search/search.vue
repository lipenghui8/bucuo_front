<template>
	<view>
		<u-navbar
		:is-back="true" 
		title="搜索" 
		title-width="325" 
		title-color="#333333" 
		title-size="28" 
		:border-bottom="false"
		></u-navbar>
		<search :is-focus="true" :theme="themeClass" :show-want="true"
		:hot-list="hotList" @getSearchText="getSearchText"></search>
	</view>
</template>

<script>
	import search from '@/components/search/search.vue'
	export default {
		components: {
			search
		},
		data() {
			return {
				themeClass: 'block',
				hotList: ['女神','动漫','清新','超跑','夜景','萌宠'],//初始化推荐列表
				isSearch: false
			}
		},
		methods: {
			getSearchText(e) {
				console.log('点击搜索')
				if(this.isSearch){
					uni.showToast({
						icon: 'none',
						title: '太快啦，歇一会再试试',
						mask: true,
						duration: 1000
					})
					return
				}
				this.isSearch = true
				uni.navigateTo({
					url: '/pages/searchlist/searchlist?type=search&pid=0&id='+e
				})
				this.isSearch = false
			}
		},
	}
</script>

<style>
</style>
