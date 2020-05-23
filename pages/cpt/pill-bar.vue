<template>
	<view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<view>犯得上发射点</view>
		<pill-bar :scroll-top="scrollTop" position="bottom"></pill-bar>
	</view>
</template>

<script>
	import PillBar from '@/components/bobo-pillbar/PillBar.vue'
	
	export default {
		
		name: 'PillBarPage',
		
		components: { PillBar },
		
		data() {
			return {
				scrollTop: 0
			}
		},
		
		// 监听页面滚动
		onPageScroll(obj) {
			this.scrollTop = obj.scrollTop
		}
		
	}
</script>

<style>
</style>
