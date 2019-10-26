<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="btn-wrap">
			<button type="primary" @tap="openInfo">普通提示</button>
		</view>
		<b-message ref="Message">我是默认消息</b-message>
	</view>
</template>

<script>
	export default {
		name: 'cpt-camera',
		computed: {
			pageTitle() {
				return this.$Route.meta.title
			}
		},
		methods: {
			openInfo() {
				this.$refs['Message'].info('我是消息')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
