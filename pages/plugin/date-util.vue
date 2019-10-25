<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="simulate-time">{{timeTitle}}</view>
		<view class="small-title">导入工具类</view>
		<view class="simple-code">import DateUtil from '@/utils/dateUtil'</view>
		<view class="small-title">时间转时间戳</view>
		<view class="simple-code">
			<view>new DateUtil().build().toTimestamp()</view>
			<view>// 不使用build()和使用无参数的build()都会默认使用当前时间，build目前可传入Date类型的参数</view>
		</view>
		<view class="show-me">
			<view class="title">结果：</view>
			<view class="result">
				<view>{{timeStamp}}</view>
			</view>
		</view>
		<view class="small-title">时间转字符串</view>
		<view class="simple-code">
			<view>const du = new DateUtil()</view>
			<view>du.toStr(du.TIME())</view>
			<view>// 参数为转换字符串的长度，有YEAR、MONTH、DAY、TIME、ONLY_TIME、ONLY_MILLI_TIME、MILLI_TIME可供选择</view>
		</view>
		<view class="show-me">
			<view class="title">结果：</view>
			<view class="result">
				<view>{{time}}</view>
			</view>
		</view>
		<view class="small-title">时间转字符串 - 修改间隔符</view>
		<view class="simple-code">
			<view>const du = new DateUtil()</view>
			<view>du.setYearSeperater('/', '/', '~', '+', '.').toStr(du.TIME())</view>
			<view>// 从年开始设置分隔符，同样的，还可以从月、日开始。可通过setYearSeperater、setMonthSeperater、setHourSeperater、setMinuteSeperater、setSecondSeperater进行设置</view>
		</view>
		<view class="show-me">
			<view class="title">结果：</view>
			<view class="result">
				<view>{{timeSeperater}}</view>
			</view>
		</view>
		<view class="small-title">时间转汉字</view>
		<view class="simple-code">
			<view>const du = new DateUtil()</view>
			<view>du.toZh(du.TIME()) // 数字时间汉字单位</view>
			<view>du.toZh(du.TIME(), true) // 纯汉字时间</view>
			<view>// 第二个参数表示是否转换为纯汉字时间</view>
		</view>
		<view class="show-me">
			<view class="title">结果：</view>
			<view class="result">
				<view>{{zhTime}}</view>
				<view>{{allZhTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DateUtil from '@/utils/dateUtil'
	
	export default {
		name: 'date-util-page',
		data() {
			return {
				pageTitle: '时间工具类',
				timer: null,
				du: new DateUtil()
			}
		},
		computed: {
			timeTitle() {
				return this.du.toStr(this.du.ONLY_TIME())
			},
			timeStamp() {
				return this.du.toTimestamp()
			},
			time() {
				return this.du.toStr(this.du.TIME())
			},
			timeSeperater() {
				const tmpdu = new DateUtil().build(this.du.getDate())
				return tmpdu.setYearSeperater('/', '/', '~', '+', '.').toStr(tmpdu.TIME())
			},
			zhTime() {
				return this.du.toZh(this.du.TIME())
			},
			allZhTime() {
				return this.du.toZh(this.du.TIME(), true)
			}
		},
		onLoad() {
			this.timer = setInterval(() => {
				this.du.build()
			}, 1000)
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.simulate-time {
		background: #FFFFFF;
		font-size: 40px;
		color: #000000;
		text-align: center;
		padding: 15px 0;
	}
	
	.small-title {
		padding: 5px 20rpx;
	}
	
	.simple-code {
		margin: 5px 20rpx;
		border: 1px solid #8799A3;
		padding: 10px 20rpx;
		background: #E1D7F0;
		border-radius: 5px;
	}
	
	.show-me {
		display: flex;
		padding: 10px 20rpx;
		
		.title {
			font-weight: bold;
			margin-top: 10px;
		}
		
		.result {
			flex-grow: 1;
			background: #FFFFFF;
			padding: 10px 20rpx;
			box-sizing: border-box;
		}
	}
</style>
