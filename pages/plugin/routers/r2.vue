<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		
		<view class="btn-wrap">
			<view class="params-wrap">
				<view>参数：</view>
				<view>{{params}}</view>
			</view>
			<button type="primary" class="margin-top" @tap="back">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'router-2-page',
		data() {
			return {
				pageTitle: '路由2',
				testObj: {
					num: 19,
					numStr: '19',
					testParams: true,
					deepObj: {
						str: 'hahaha'
					},
					ignoreFun: function() {
						console.log('i\'m hide.')
					},
					testUndefined: undefined,
					testNull: null
				},
				params: ''
			}
		},
		onLoad() {
			this.params = JSON.stringify(this.$Route.params)
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
