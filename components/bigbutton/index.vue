<template>
        <view class="u-demo-block">
            <view class="u-demo-block__content " @click="goArticleList(exp)" >
                <u-row customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view class="demo-layout bg-purple-light shadow">
							<u-col span="8" >
								<view class="sub-mid">
									<u-icon 
									size="80" 
									name="https://cdn.uviewui.com/uview/example/button.png"
									style="float: left;"
									margin-left="6rpx"
									>
									</u-icon>
									<view style="float: left; font-size: 30px; margin-right: 6rpx;" >经验</view>
								</view>
								<view class="text-lg padding text-center">
									<text>学霸秘籍,一应俱全</text>
								</view>
							</u-col>
							<u-col span="4">
								<view style="display: flex; flex-flow: column;">
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold">发帖数</text>
									</view>
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold text-center">2.35w</text>
									</view>		
								</view>
							</u-col>
						</view>
                    </u-col>
                </u-row>
            </view>
            <view class="u-demo-block__content " >
                <u-row customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view class="demo-layout bg-purple-light shadow">
							<u-col span="8" >
								<view class="sub-mid">
									<u-icon 
									size="80" 
									name="https://cdn.uviewui.com/uview/example/button.png"
									style="float: left;"
									margin-left="6rpx"
									>
									</u-icon>
									<view style="float: left; font-size: 30px; margin-right: 6rpx;" >技能</view>
								</view>
								<view class="text-lg padding text-center">
									<text>技能分享，拓展视野</text>
								</view>
							</u-col>
							<u-col span="4">
								<view style="display: flex; flex-flow: column;">
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold">发帖数</text>
									</view>
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold text-center">8.36w</text>
									</view>		
								</view>
							</u-col>
						</view>
                    </u-col>
                </u-row>
            </view>
            <view class="u-demo-block__content " @click="changeRoute">
                <u-row customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view class="demo-layout bg-purple-light shadow">
							<u-col span="8" >
								<view class="sub-mid">
									<u-icon 
									size="80" 
									name="https://cdn.uviewui.com/uview/example/button.png"
									style="float: left;"
									margin-left="6rpx"
									>
									</u-icon>
									<view style="float: left; font-size: 30px; margin-right: 6rpx;" >当地</view>
								</view>
								<view class="text-lg padding text-center">
									<text>美食小吃,生活休闲</text>
								</view>
							</u-col>
							<u-col span="4">
								<view style="display: flex; flex-flow: column;">
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold">发帖数</text>
									</view>
									<view class=" text-center" style="font-size: 25px; flex: 1;">
										<text class="text-black text-bold text-center">10.5w</text>
									</view>		
								</view>
							</u-col>
						</view>
                    </u-col>
                </u-row>
            </view>
			<view class="u-demo-block__content ">
				<u-row customStyle="margin-bottom: 10px">
                    <u-col span="12" >
						<view class="sub-mid loadding bg-purple-light shadow">
							<u-icon 
								size="60" 
								name="https://cdn.uviewui.com/uview/example/button.png"
								style="float: left;"
								margin-left="6rpx"
								>
							</u-icon>
							<view style="float: left; 
							font-size: 30px; 
							margin-right: 6rpx;" 
							>正在建设中</view>	
						</view>
					</u-col>
				</u-row>
			</view>
		</view>		
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			goArticleList(category){
				console.log(category)
				uni.navigateTo({
					url: '../article/articleList'
				});
			},
			changeRoute(){
				uni.navigateTo({
					url: '../location/main'
				});
			}
		}
	}
</script>

<style lang="scss">
	.sub-mid{
		display: flex;
		align-items: center;   
		vertical-align: center;
		justify-content: center;
	}
    .wrap {
        padding: 12px;
    }
    .demo-layout {
		height: 128px;
		border-radius: 4px;
		margin: 10px 16px;
		padding-bottom: 8px;
		padding-top: 34px;
    }
	.loadding {
		height: 60px;
		border-radius: 4px;
		margin: 10px 16px;
	//	padding-bottom: 8px;
	}

    .bg-purple {
        background: #ffffff;
    }

    .bg-purple-light {
        background: #ffffff;
    }

    .bg-purple-dark {
        background: #ffffff;
    }
	.u-demo-block {
		background-color: #FFFFFF;
	}

</style>