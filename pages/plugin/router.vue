<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="btn-wrap">
			<button type="primary" class="margin-top" @tap="push">push Table</button>
			<button type="primary" class="margin-top" @tap="replace">replace Table</button>
			<button type="primary" class="margin-top" @tap="replaceAll">return Home</button>
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
			console.log(JSON.stringify(this.$Route))
		},
		methods: {
			push() {
				this.$Router.push({page: '/pages/cpt/table', params: this.testObj})
			},
			replace() {
				this.$Router.replace('/pages/cpt/table')
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
