<template>
	<view class="wrap">
		<view class="title">发布帖子</view>
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="" label-width="150"
				:label-position="labelPosition" label="帖子标题" prop="name">
				<u-input :border="border" placeholder="请输入帖子标题" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所属类型" prop="type" label-width="150">
				<u-radio-group v-model="radio" @change="radioGroupChange" :width="radioCheckWidth"
					:wrap="radioCheckWrap">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">
						{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所属栏目" prop="column" label-width="150">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.column"
					placeholder="请选择所属栏目" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="帖子标签" prop="label" label-width="150">
				<u-input type="textarea" :border="border" placeholder="请填写标签，以分号分隔" v-model="model.label" />
			</u-form-item>
			<u-form-item v-show="labels" :label-position="labelPosition" class="labelBox">
				<view class="labelItem" v-for="(item,index) in labels" :key="index">
					<u-tag :text="item" type="success" />
				</view>
			</u-form-item>
			<u-form-item v-show="typeChange" :label-position="labelPosition" label="帖子封面" prop="photo"
				label-width="150">
				<u-upload width="160" height="160"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" prop="content">
				<view class="content">
					<view>{{model.content}}1111</view>
					<editor id="editor" class="ql-container" :placeholder="placeholder" v-model="model.content" @blur="blur" @ready="onEditorReady"></editor>
				</view>
				<!-- <u-input type="textarea" :border="border" placeholder="请输入帖子内容" v-model="model.content" /> -->
			</u-form-item>
		</u-form>
		<!-- <view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾选代表同意不错校园的隐私协议
			</view>
		</view> -->
		<u-button @click="submit">发布帖子</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<!-- <u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker> -->
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	export default {
		data() {
			let that = this;
			return {
				placeholder: '请输入帖子内容...',
				model: {
					name: '',
					column: '',
					label: '',
					type: '经验',
					agreement: false,
					content: '',
					photo: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入帖子标题',
							trigger: 'blur',
						},
						{
							min: 1,
							max: 50,
							message: '帖子标题长度在2到50个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '帖子标题必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					label: [{
							required: true,
							message: '请填写标签'
						},
						{
							min: 1,
							message: '标签不能为空',
							trigger: 'change',
						},
						// 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
						// {
						// 	pattern: /^[\u4e00-\u9fa5]+$/gi,
						// 	message: '简介只能为中文',
						// 	trigger: 'change',
						// },
					],
					type: [{
						required: true,
						message: '请选择所属类型',
						trigger: 'change',
					}]
				},
				border: false,
				check: false,
				selectStatus: 'close',
				radioList: [{
						name: '经验',
						checked: true,
						disabled: false
					},
					{
						name: '技能',
						checked: false,
						disabled: false
					},
					{
						name: '当地',
						checked: false,
						disabled: false
					}
				],
				radio: '经验',
				actionSheetList: [{
						text: '课程考试'
					},
					{
						text: '竞赛考证'
					},
					{
						text: '考研保研'
					},
					{
						text: '新生守则'
					},
					{
						text: '其他经验'
					}
				],
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],
			};
		},
		onLoad() {

		},
		computed: {
			borderCurrent() {
				return this.border ? 0 : 1;
			},
			typeChange() {
				return this.model.type != '经验';
			},
			labels() {
				if (this.model.label)
					return this.model.label.split("；");
				else
					return false
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				setTimeout(() => {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec();
				},600)
				// #endif
			},
			blur(){
				const that=this
				this.editorCtx.getContent({
					success:res => {
						this.model.content=res.html
						this.model.content='suxx'

					},
					fail:err=>{
						this.model.content='false'
					}
				})
			},
			undo() {
				this.editorCtx.undo()
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// if(!this.model.agreement) return this.$u.toast('请勾选协议');
						console.log('验证通过');
						const requestTask = uni.request({
							url: '/api/auth/exprpost', //仅为示例，并非真实接口地址。
							data: {
								name: 'name',
								age: 18
							},
							success: function (res) {
								console.log(res.data);
							}
						});
					} else {
						console.log('验证失败');
					}
				});
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.column = this.actionSheetList[index].text;
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.likeFruit = e;
			},
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.type = e;
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			// 选择商品类型回调
			selectConfirm(e) {
				this.model.goodsType = '';
				e.map((val, index) => {
					this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
				})
			},
			borderChange(index) {
				this.border = !index;
			},
			radioCheckboxChange(index) {
				if (index == 0) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = 'auto';
				} else if (index == 1) {
					this.radioCheckWrap = true;
					this.radioCheckWidth = 'auto';
				} else if (index == 2) {
					this.radioCheckWrap = false;
					this.radioCheckWidth = '50%';
				}
			},
			labelPositionChange(index) {
				this.labelPosition = 'top';
			},
			codeChange(text) {
				this.codeTips = text;
			},
			errorChange(index) {
				if (index == 0) this.errorType = ['message'];
				if (index == 1) this.errorType = ['toast'];
				if (index == 2) this.errorType = ['border-bottom'];
				if (index == 3) this.errorType = ['border'];
			}
		}
	};
</script>

<style scoped lang="scss">
	.wrap {
		padding: 30rpx;
		margin: 100rpx 0rpx;
	}

	.content {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 100rpx;
		background-color: #CCCCCC;
	}

	.labelBox {
		display: flex;
		justify-content: flex-start;
	}

	.labelItem {
		display: inline-flex;
		margin-left: 20rpx;
	}

	.title {
		text-align: center;
		margin: 0 auto;
		font-size: 40rpx;
		font-weight: bold;
		color: #2979FF;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>