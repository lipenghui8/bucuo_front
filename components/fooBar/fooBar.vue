<template>
<div class="bottom">
    <li :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
		<u-icon :name="home===0?'/static/tabbar/home_art.png':'/static/tabbar/home.png'" size="44"></u-icon>
		<p>首页</p>
    </li>
    <li :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
        <u-icon :name="home===1?'/static/tabbar/center_art.png':'/static/tabbar/center.png'" size="44"></u-icon>
        <p>分类</p>
    </li>
    <li class="xm_tg" :class="{'nav-tab-active':home===4}">
      <view v-if="vuex_writeShow&&!vuex_isShenHe" @click="toIndex(4)">
        <em class="bg_f b_ok"></em>
        <span>
          <i class="foot_btn" ><u-icon name="/static/tabbar/tougao.png" size="44" class="icontg"  ></u-icon></i>
        </span>
      </view>
	  <view v-if="!vuex_writeShow||vuex_isShenHe">
	    <em class="bg_f b_ok"></em>
	    <span>
	      <i class="foot_btn"><u-icon name="/static/tabbar/logo.png" size="44" class="icontg" ></u-icon></i>
	    </span>
	  </view>
    </li>
    <li :class="{'nav-tab-active':home===2}" @click="toIndex(2)">
        <u-icon :name="home===2?'/static/tabbar/find_art.png':'/static/tabbar/find.png'" size="44"></u-icon>
        <p>榜单</p>
    </li>
    <li :class="{'nav-tab-active':home===3}" @click="toIndex(3)">
       <u-icon :name="home===3?'/static/tabbar/user_art.png':'/static/tabbar/user.png'" size="44"></u-icon>
        <p>我的</p>
    </li>
</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		props: ['home'],
		methods: {
			toIndex(index) {
				this.$emit('toIndex', index)
			}
		}
	}
</script>

<style scoped lang="scss">
.bottom {
	border-top:1px solid #eee;
	padding:8px 0;
	background:#fff;
	position:fixed;
	bottom:0;
	width:100%;
	height:70px;
	z-index:999999
}
.bottom li {
	width:20%;
	text-align:center;
	float:left
}
.bottom li i {
	display:block;
	font-size:28px;
	line-height:26px
}
.bottom li p {
	overflow:hidden;
	font-size:12px;
	height:16px;
	line-height:16px;
	color:#888
}
.bottom .foot_btn {
	width:48px;
	padding:5px 0;
	text-align:center;
	height:24px;
	line-height:24px;
	font-size:24px;
	margin:7px auto 0;
	border-radius:2px
}
.bottom li.xm_tg view span i.foot_btn {
	width:44px;
	height:44px;
	line-height:44px;
	border-radius:50%;
	padding:0;
	margin-top:8px;
	background:linear-gradient(90deg,#ffb821 0,#ffcd33 45%,#ffd833)
}
.bottom .icontg {
	padding-top:10px
}
.bottom li.xm_tg view span {
	display:block;
	position:absolute;
	bottom:-3px;
	left:calc(50% - 30px);
	z-index:110;
	width:60px;
	height:62px;
	line-height:62px;
	border-radius:50%;
	padding:0 1px
}
.bottom li.xm_tg view {
	bottom:0;
	left:calc(50% - 30px);
	width:60px;
	height:40px;
	border-radius:50%;
	overflow:visible
}
.bottom li.xm_tg view em {
	display:block;
	position:absolute;
	bottom:-1px;
	left:calc(50% - 30px);
	z-index:100;
	width:60px;
	height:60px;
	border-radius:50%
}
.bottom li.xm_tg {
	overflow:visible;
	position:relative
}
.bottom .foot_btn {
	width:48px;
	padding:5px 0;
	text-align:center;
	height:24px;
	line-height:24px;
	font-size:24px;
	margin:7px auto 0;
	border-radius:2px
}
.bottom .bg_f {
	background:#fff !important
}
.bottom .b_ok {
	border:1px solid #efefef !important
}
@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
	.bottom {
	}
}
@media only screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:3) {
	.bottom {
	}
}
@media only screen and (device-width:414px) and (device-height:896px) and (-webkit-device-pixel-ratio:2) {
	.bottom {
	}
}

</style>