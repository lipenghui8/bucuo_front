
// const baseUrl = 'https://cdn.zhoukaiwen.com/';
const baseUrl = 'https://www.zhoukaiwen.com/';
const imgUrl = 'https://bucuo.liph.top/image/';
const apiUrl='https://api.bucuo.liph.top/';

let token=''
// 向apiUrl请求数据
// 不带token请求
const myHttpRequest = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let httpDefaultOpts = {
		url: apiUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
//带Token请求
const myHttpTokenRequest = (opts, data) => {
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	//
	let myopts = {
		url: 'api/user/login',
		method: 'post'
	};
	let mydata={
		"username": "yeep1",
		"password": "yeep2020"
	}
	// let token=''
	myHttpRequest(myopts,mydata).then(res => {
		console.log("获取Token成功！");
		if (res.statusCode == 200) {
			console.log("最初Token内容：",res.data.data.token);
			uni.setStorage('token',res.data.data.token)
			token = res.data.data.token
		} else {
			console.log('获取token失败！')
			return null
		}
	});


	// let token = uni.getStorage('token');
	// let token = getToken();
	console.log('读取token',token);
	// hadToken()
	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}
		});
	} else 
	{
		let httpDefaultOpts = {
			url: apiUrl + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				'X-Access-Token': token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'token': token,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request(httpDefaultOpts).then(
				(res) => {
					if (res[1].data.code == 200) {
						resolve(res[1])
					} else {
						if (res[1].data.code == 5000) {
							// uni.showModal({
							// 	title: '提示',
							// 	content: res[1].data.message,
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			uni.reLaunch({
							// 				url: '/pages/login/login'
							// 			});
							// 			uni.clearStorageSync();
							// 		} 
							// 	}
							// });
							uni.reLaunch({
								url: '/pages/login/index'
							});
							uni.clearStorageSync();
						} else {
							resolve(res[1])
							// uni.showToast({
							// 	title: '' + res[1].data.message,
							// 	icon: 'none'
							// })
						}
					}
				}
			).catch(
				(response) => {
					reject(response)
				}
			)
		})
		return promise
	}
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的

};

const hadToken = () => {
	let token = uni.getStorageSync('token');

	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}
		});
		return false;
	}
	return true
}

const getToken= () =>{
	let opts = {
		url: 'api/user/login',
		method: 'post'
	};
	let data={
		"username": "yeep1",
		"password": "yeep2020"
	}
	myHttpRequest(opts,data).then(res => {
		console.log("获取Token成功！");
		if (res.statusCode == 200) {
			console.log("最初Token内容：",res.data.data.token);
			uni.setStorage('token',res.data.data.token)
			token = res.data.data.token
		} else {
			console.log('获取token失败！')
			return null
		}
	});
}
export default {
	baseUrl,
	imgUrl,
	apiUrl,
	myHttpRequest,
	myHttpTokenRequest,
	hadToken,
	getToken
}
