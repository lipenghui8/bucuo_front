<template>
	<view>
		<view class="u-p-40">
			<view class="title">星潮壁纸1.0.2版本更新记录(2021.08.09更新)</view>
			<view class="cont">
				1.删除db_init.db中无用参数<br><br>2.修复头像页登录无响应<br><br>3.修复动态壁纸页搜索结果页视频无法点击<br><br>4.增加参数indexUiType控制首页index样式（可切换成旧版本样式）
				<br><br>5.修复关闭投稿需审核时点击投稿闪退到首页BUG
			</view>
			<view class="title">星潮壁纸1.0.1版本更新记录(2021.08.06更新)</view>
			<view class="cont">
				1.修复前端加密导致无法安装BUG<br><br>2.修改投稿页面投稿后不刷新<br><br>3.去除无用初始数据文件<br><br>4.修复云函数发送订阅消息点开显示null
				<br><br>5.修改/适配审核模式判断方法<br><br>6.修改首页样式，去除排行及分类标签<br><br>7.修复会员中心“我的下载”数据调用异常<br><br>8.优化首页访问速度
			</view>
			<view class="title">星潮壁纸1.0.0版本更新记录(2021.08.02更新)</view>
			<view class="cont">
				1.修复URL路径BUG问题<br><br>2.Ui图标等重新美化设计<br><br>3.新增积分任务功能<br><br>4.修改部分90%已知问题
			</view>	
			<view class="dcont">
				正式命名为星潮壁纸小程序~
			</view>
			<view class="title">星芒壁纸2.4.0版本更新记录(2021.07.01更新)</view>
			<view class="cont">
				1.导航栏支持在dcloud控制台修改<br><br>2.修复了动态壁纸页面bug<br><br>3.新增动态壁纸页面顶部导航
			</view>
			
			<view class="title">星芒壁纸2.3.0版本更新记录(2021.06.25更新)</view>
			<view class="cont">
				1.首页增设导航栏（目前只支持在前端修改跳转路径）<br><br>2.更改全局底部栏样式，更加简约清爽<br><br>3.新增头像功能（支持激励视频下载）<br><br>4.新增套图功能（支持激励视频下载）<br><br>5.新增动态壁纸功能（支持激励视频下载）<br><br>6.修复“我的下载”无法正确显示的bug<br><br>7.增加对于用户投稿内容的用户判定问题<br><br>8.增加首页轮播图内部页面跳转
			</view>
			
			<view class="title">星芒壁纸2.2.0版本更新记录(2021.05.01更新)</view>
			<view class="cont">
				1.新增刘海壁纸<br><br>2.增加首页轮播图外部跳转<br><br>3.修复缩略图模糊问题
			</view>
			
			<view class="title">星芒壁纸2.1.0版本更新记录(2021.04.15更新)</view>
			<view class="cont">
				1.新增用户投稿功能<br><br>2.增加意见反馈功能<br><br>3.开发同款QQ小程序
			</view>
			
			<view class="title">星芒壁纸2.0.0版本更新记录(2021.03.09更新)</view>
			<view class="cont">
				1.对接阿里云oss储存服务，大大加快小程序访问速度。<br><br>2.支持在管理后台上传壁纸
			</view>
			
			<view class="title">星芒壁纸1.0.0版本更新记录(2020.12.08)</view>
			<view class="cont">
				梦开始的地方，星芒网络科技工作室正式上线开发维护本套壁纸程序，希望星芒壁纸可以越来越好，越走越远！
			</view>
			
		<view class="dcont">
			感谢相遇，星芒壁纸因为您的支持将会更加精彩！
		</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.title{
		font-weight: 550;
		font-size: 32rpx;
		padding-bottom: 30rpx;
	}
	.cont{
		line-height: 50rpx;
		padding-bottom: 40rpx;
		color: #606266;
	}
	.dcont{
		line-height: 50rpx;
		padding-bottom: 40rpx;
		color: #df0003;
	}
</style>
