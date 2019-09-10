<template>
	<view class="bt-container">
		<view class="bt-header bt-flex">
			<block v-for="(column, index) in columnsDefine" :key="index">
				<view class="bt-th">{{column.title}}</view>
			</block>
		</view>
		<block v-for="(row, rowIndex) in data" :key="rowIndex">
			<view class="bt-row bt-flex" :class="[showStripe(rowIndex) ? 'stripe' : '']">
				<block v-for="(td, tdIndex) in columnsDefine" :key="tdIndex">
					<view class="bt-td">
						<slot v-if="td.slot" :name="td.slot" :data="{row: row, index: rowIndex}"></slot>
						<text v-if="!td.slot">{{row[td.key]}}</text>
					</view>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'b-table',
		props: {
			columnsDefine: {
				type: Array,
				default: function() {
					return []
				}
			},
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			stripe: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			showStripe(index) {
				return index % 2 === 0 && this.stripe
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bt-container {
		width: 100%;
		background: #FFF;
		overflow-x: auto;
		border: 1px solid #e8eaec;
		
		.bt-flex {
			// 使用inline-flex撑开容器
			display: inline-flex;
		}
		
		.bt-header {
			background: rgb(248, 248, 249);
			
			.bt-th {
				// 设置flex-shrink后当横向越界后项目才不会自动收缩
				flex-shrink: 0;
				font-size: 16px;
				font-weight: bold;
				padding: 5px 20rpx;
				width: 200rpx;
			}
		}
		
		.bt-row {
			border-top: 1px solid #e8eaec;
			
			.bt-td {
				flex-shrink: 0;
				font-size: 14px;
				padding: 5px 20rpx;
				width: 200rpx;
				word-break: break-all;
			}
		}
	}
	
	.stripe{
		background: rgb(248, 248, 249);
	}
</style>
