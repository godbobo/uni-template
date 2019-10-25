<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<b-table :columns-define="columnsDefine" :stripe="true" :datas="data">
			<template #options="{data}">
				<span>{{data.index}}</span>
			</template>
		</b-table>
		<view class="padding">注：表格组件的动态插槽暂不支持非H5端</view>
	</view>
</template>

<script>
	import bTable from '@/components/b-table/b-table.vue'
	
	import tableDefines from './datas/table-defines'
	
	export default {
		name: 'cpt-table-page',
		components: {
			bTable
		},
		data() {
			return {
				pageTitle: '表格组件',
				columnsDefine: tableDefines.testDefine,
				data: tableDefines.testData
			}
		},
		computed: {
		},
		onLoad() {
			// this.pageTitle = this.$Route.meta.title
		}
	}
</script>

<style>
</style>
