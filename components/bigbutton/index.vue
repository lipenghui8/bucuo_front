<template>
        <view class="u-demo-block">
            <text class="u-demo-block__title">基础使用</text>
            <view class="u-demo-block__content">
                <u-row customStyle="margin-bottom: 10px">
                    <u-col span="12">
                        <view class="demo-layout bg-purple-light"></view>
                    </u-col>
                </u-row>
            </view>
			<view class="u-demo-block__content">
			    <u-row customStyle="margin-bottom: 10px">
			        <u-col span="12">
			            <view class="demo-layout bg-purple-light"></view>
			        </u-col>
			    </u-row>
			</view>
			<view class="u-demo-block__content">
			    <u-row customStyle="margin-bottom: 10px">
			        <u-col span="12">
			            <view class="demo-layout bg-purple-light"></view>
			        </u-col>
			    </u-row>
			</view>
        </view>		
</template>

<script>
</script>

<style lang="scss">
    .wrap {
        padding: 12px;
    }

    .demo-layout {
        height: 128px;
        border-radius: 4px;
		margin: 20px;
    }

    .bg-purple {
        background: #CED7E1;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }
</style>