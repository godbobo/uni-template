<template>
	<cub-tabpage :tab-list="tabList" :current="selectIndex" @tab-changed="switchTab">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<block v-for="(page, pageIndex) in pageItems" :key="pageIndex">
			<view v-show="selectIndex === pageIndex">
				<block v-for="(type, index) in page" :key="index">
					<view class="title">{{type.title}}</view>
					<view class="cu-list menu sm-border">
						<block v-for="(item, idx) in type.child" :key="idx">
							<view class="cu-item arrow" @tap="handleJumpPage(item.path)">
								<view class="content">
									<text class="text-grey" :class="[item.icon]"></text>
									<text class="text-grey">{{item.title}}</text>
								</view>
							</view>
						</block>
					</view>
				</block>
			</view>
		</block>
		
	</cub-tabpage>
</template>

<script>
	import cubTabpage from '@/components/cub-tabpage/cub-tabpage.vue'
	
	const pageItems = [
		[
			{
				title: '输入',
				child: [
					{
						icon: 'cuIcon-unfold',
						title: '下拉选择框',
						path: ''
					}
				]
			},
			{
				title: '显示',
				child: [
					{
						icon: 'cuIcon-square',
						title: '表格',
						path: '/pages/cpt/table'
					},
					{
						icon: 'cuIcon-message',
						title: '提示',
						path: '/pages/cpt/message'
					}
				]
			},
			{
				title: '基于ColorUI',
				child: [
					{
						icon: 'cuIcon-cardboard',
						title: '底部操作条',
						path: ''
					}
				]
			},
		],
		[
			{
				title: '功能测试',
				child: [
					{
						icon: 'cuIcon-camera',
						title: '拍照上传',
						path: '/pages/cpt/camera'
					}
				]
			},
			{
				title: '工具类',
				child: [
					{
						icon: 'cuIcon-time',
						title: '时间转换',
						path: '/pages/plugin/date-util'
					},
					{
						icon: 'cuIcon-repeal',
						title: '路由拦截',
						path: '/pages/plugin/router'
					}
				]
			}
		],
		[
			{
				title: '关于...',
				child: []
			}
		]
	]
	
	export default {
		name: 'index-page',
		components: {
			cubTabpage
		},
		data() {
			return {
				pageTitle: '组件',
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
				],
				pageItems: pageItems
			}
		},
		computed: {
		},
		onLoad() {
		},
		methods: {
			switchTab(item) {
				this.selectIndex = item.index
			},
			handleJumpPage(url) {
				// this.$Router.push({name: url})
				if (url) {
					this.$Router.push({page: url})
				}
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
