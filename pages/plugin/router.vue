<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="btn-wrap">
			<button type="primary" class="margin-top" @tap="push">跳转路由1</button>
			<button type="primary" class="margin-top" @tap="pushParams">跳转路由1带参数</button>
			<button type="primary" class="margin-top" @tap="refresh">路由3测试h5刷新拦截</button>
			<button type="primary" class="margin-top" @tap="replaceAll">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'router-page',
		data() {
			return {
				pageTitle: '路由拦截插件',
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
				}
			}
		},
		onLoad() {
			// console.log(JSON.stringify(this.$Route))
		},
		methods: {
			push() {
				this.$Router.push('/pages/plugin/routers/r1')
			},
			pushParams() {
				this.$Router.push({page: '/pages/plugin/routers/r1', params: this.testObj})
			},
			refresh() {
				this.$Router.push('/pages/plugin/routers/r3')
			},
			replaceAll() {
				this.$Router.replaceAll('/pages/index/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
