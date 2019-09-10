<template>
	<view class="fullscreen-container">
		<view class="fullscreen-content">
			<slot></slot>
		</view>
		<view class="cu-bar tabbar fullscreen-tabbar" :class="backgroundColor">
			<block v-for="(item, index) in tabList" :key="index">
				<view class="action" @tap="switchTab(index, item)">
					<view class="cuIcon-cu-image">
						<image :src="current === index ? item.selectSrc : item.src"></image>
					</view>
					<view :class="current === index ? selectedTextColor : 'text-gray'">{{item.text}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	/**
	 * 基于ColorUI封装的 Tabbar 组件
	 */
	export default {
		data() {
			return {
			}
		},
		props: {
			// Tab列表
			tabList: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 当前选中Tab
			current: {
				type: Number,
				default: 0
			},
			// 选中文字颜色
			selectedTextColor: {
				type: String,
				default: 'text-green'
			},
			// 选项卡背景颜色
			backgroundColor: {
				type: String,
				default: 'bg-white'
			}
		},
		methods: {
			switchTab(index, item) {
				this.$emit('tab-changed', {index: index, item: item})
			}
		}
	}
</script>

<style lang="scss" scoped>
.fullscreen-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	.fullscreen-content {
		flex-grow: 1;
		overflow-y: auto;
	}
}
</style>
