<template>
	<view>日期时间</view>
</template>

<script>
	import DateUtil from '@/utils/dateUtil'
	
	export default {
		name: 'date-util-page',
		data() {
			return {
				
			}
		},
		onLoad() {
			const du = new DateUtil()
			console.log(du.build().setYearSeperater('/', '/', '~', '+', '.').toStr(du.DAY()))
			console.log(du.toZh(du.MILLI_TIME(), true))
			console.log(du.toTimestamp())
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
