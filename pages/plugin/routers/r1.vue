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
			<button type="primary" class="margin-top" @tap="replace">重定向到路由2</button>
			<button type="primary" class="margin-top" @tap="replaceParams">重定向到路由2带参数</button>
			<button type="primary" class="margin-top" @tap="back">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'router-1-page',
		data() {
			return {
				pageTitle: '路由1',
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
			replace() {
				this.$Router.replace('/pages/plugin/routers/r2')
			},
			replaceParams() {
				this.$Router.replace({page: '/pages/plugin/routers/r2', params: this.testObj})
			},
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
