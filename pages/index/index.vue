<template>
	<cub-tabpage :tab-list="tabList" :current="selectIndex" @tab-changed="switchTab">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view v-if="selectIndex === 0">
			<view class="title">输入</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-sort text-grey"></text>
						<text class="text-grey">下拉选择框</text>
					</view>
				</view>
			</view>
			<view class="title">显示</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" @tap="handleJumpPage('cpt-table')">
					<view class="content">
						<text class="cuIcon-sort text-grey"></text>
						<text class="text-grey">表格</text>
					</view>
				</view>
			</view>
			<view class="title">基于 ColorUI</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-sort text-grey"></text>
						<text class="text-grey">底部操作条</text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="selectIndex === 1">
			<view class="title">功能测试</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" @tap="handleJumpPage('cpt-camera')">
					<view class="content">
						<text class="cuIcon-camera text-grey"></text>
						<text class="text-grey">拍照上传</text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="selectIndex === 2">
			<view class="title">关于...</view>
		</view>
		
	</cub-tabpage>
</template>

<script>
	import cubTabpage from '@/components/cub-tabpage'
	export default {
		name: 'index-page',
		components: {
			cubTabpage
		},
		data() {
			return {
				selectIndex: 0,
				tabList: [
					{
						src: '/static/tabbar/component.png',
						selectSrc: '/static/tabbar/component_cur.png',
						text: '组件'
					},
					{
						src: '/static/tabbar/plugin.png',
						selectSrc: '/static/tabbar/plugin_cur.png',
						text: '扩展'
					},
					{
						src: '/static/tabbar/about.png',
						selectSrc: '/static/tabbar/about_cur.png',
						text: '关于'
					}
				]
			}
		},
		computed: {
			pageTitle() {
				return this.$Route.meta.title
			}
		},
		onLoad() {
		},
		methods: {
			switchTab(item) {
				this.selectIndex = item.index
			},
			handleJumpPage(url) {
				this.$Router.push({name: url})
			}
		}
	}
</script>

<style lang="scss" scoped>
.title {
	padding: 5px 20rpx;
	font-size: 15px;
}
</style>
