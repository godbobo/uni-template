<template>
	<view>
		<cu-custom :is-back="true" bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<b-table :columns-define="columnsDefine" :stripe="true" :data="data">
			<template #options="{data}">
				<span>{{data.index}}</span>
			</template>
		</b-table>
	</view>
</template>

<script>
	import bTable from '@/components/b-table'
	
	import tableDefines from './datas/table-defines'
	
	export default {
		name: 'cpt-table-page',
		components: {
			bTable
		},
		data() {
			return {
				columnsDefine: tableDefines.testDefine,
				data: tableDefines.testData
			}
		},
		computed: {
			pageTitle() {
				return this.$Route.meta.title
			}
		}
	}
</script>

<style>
</style>
