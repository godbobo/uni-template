<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		
		<view class="btn-wrap">
			<view class="params-wrap">
				<view>{{message}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'router-4-page',
		data() {
			return {
				pageTitle: '路由4',
				message: '我是路由4页面'
			}
		},
		onLoad() {
			if (this.$Route.params.message) {
				this.message= this.$Route.params.message
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
