<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="btn-wrap">
			<button type="default" class="margin-top" @tap="openInfo">普通提示</button>
			<button type="primary" class="margin-top" @tap="openSuccess">成功提示</button>
			<button type="warn" class="margin-top" @tap="openError">错误提示</button>
			<button type="primary" class="margin-top" @tap="openWarn">警告提示</button>
			<button type="primary" class="margin-top" @tap="openLongText">长文本提示</button>
		</view>
		<message ref="Message" :duration="10000" background></message>
	</view>
</template>

<script>
	export default {
		name: 'cpt-camera',
		data() {
			return {
				pageTitle: '提示组件',
				i: 1
			}
		},
		methods: {
			openInfo() {
				this.$refs['Message'].info('我是消息' + this.i++)
			},
			openSuccess() {
				this.$refs['Message'].success({
					content: '我是消息' + this.i++,
					duration: 10000,
					background: true
				})
			},
			openError() {
				this.$refs['Message'].error('我是消息' + this.i++)
			},
			openWarn() {
				this.$refs['Message'].warn('我是消息' + this.i++)
			},
			openLongText() {
				this.$refs['Message'].info('你可能不知道，我是一条超级无敌非常非常非常长的消息呦')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
