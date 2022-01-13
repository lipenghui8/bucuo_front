<template>
	<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
		<view class="mask-content"  :style="'margin-bottom: ' + commentHeight + '%;'" @click.stop.prevent="stopPrevent">
			<view class="mask-content-topbar">
				<view class="left" @click="toggleMask">取消</view>
				<view class="right" @click="pubComment">发布</view>
			</view>
			<view class="mask-content-input">
				<textarea class="textarea"
					v-model="content"
					:placeholder="placeholder"
					:adjust-position="false"
					:show-confirm-bar = "false"
					:focus="focus"
					@focus="handleFocus"
					@blur="handleLeaveFocus"
					@keyboardheightchange="handleKeyBoardHeightChange"
					maxlength="140"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	var windowHeight = uni.getSystemInfoSync().windowHeight;
	export default {
		name: "ygcComment",
		//属性
		props: {
			placeholder: {
				type: String
			}
		},
		data() {
			return {
				maskState: 0,
				content: '',
				focus: false,
				commentHeight: 0
			};
		},
		created() {
		},
		methods: {
			stopPrevent(){
			},
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				// this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
					// #ifdef APP-PLUS
					// 安卓app软键盘自动弹出有点问题，暂时还没有很好的解决方案，所以就禁止安卓app软键盘自动弹出，如果哪位朋友有好的解决方案可以在评论里告诉大家参考一下
					if (uni.getSystemInfoSync().platform == "ios") {
						this.focus = this.maskState ? true : false;
					}
					// #endif
					// #ifndef APP-PLUS
					this.focus = this.maskState ? true : false;
					// #endif
				}, timer)
			},
			handleFocus(e){
				var that = this
				that.commentHeight = e.detail.height?(e.detail.height+315)/windowHeight*100: 0
			},
			handleLeaveFocus(e){
				var that = this
				that.commentHeight = 0
			},
			handleKeyBoardHeightChange(e){
				var that = this
				that.commentHeight = e.detail.height?(e.detail.height+315)/windowHeight*100: 0
			},
			pubComment() {
				this.$emit('pubComment',this.content);
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-color-base: #606266;
	$base-color: #5A9BEC;
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		-webkit-transition: .3s; 
		.mask-content{
			width: 100%;
			background: #FFFFFF;
			transform: translateY(100%);
			transition: .3s;//底部弹出的持续时间
			-webkit-transition: .3s;//底部弹出的持续时间 
			// overflow-y:scroll;
			display: flex;
			// margin-bottom: 70%;
			padding: 20upx 30upx 10upx;
			flex-direction: column;
			.mask-content-topbar{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20upx 30upx 10upx;
				font-size: 32upx;
				.left{
					padding: 10upx 0upx;
					color: #ffaa00;
				}
				.right{
					padding: 10upx 10upx;
					border-radius: 16upx;
					color: #ffffff;
					font-weight: 500;
					background-color: #ffaa00;
				}
			}
			.mask-content-input{
				width: 100%;
				padding: 10upx 16upx 20upx;
				.textarea {
					height: 100px;
					// width: 686upx;//如果textarea的宽带有问题可以把width改为100%试试
					width: 100%;
					padding: 16upx;
					border:2upx solid #d5d5d6;
					border-radius: 16upx;
				}
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(255, 255, 255, 0.1);
			.mask-content{
				transform: translateY(0);
			}
		}
	}

</style>
