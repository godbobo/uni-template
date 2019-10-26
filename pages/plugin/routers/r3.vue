<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		
		<view class="btn-wrap">
			<view class="params-wrap">
				<view>提示：尝试刷新该页面，会跳转到路由4</view>
			</view>
			<button type="primary" class="margin-top" @tap="back">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'router-3-page',
		data() {
			return {
				pageTitle: '路由3'
			}
		},
		onLoad() {
			
		},
		methods: {
			back() {
				this.$Router.back()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
