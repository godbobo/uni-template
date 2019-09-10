<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<view class="btn-wrap">
			<button type="primary" @tap="handleChooseImage">点我上传</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'cpt-camera',
		computed: {
			pageTitle() {
				return this.$Route.meta.title
			}
		},
		methods: {
			handleChooseImage() {
				uni.chooseImage({
					sourceType: ['camera'],
					success: () => {
						uni.showModal({
							title: '提示',
							content: '成功拍摄图片',
							showCancel: false
						})
					}
				})
			},
			handleChoosePreImage() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap {
		padding: 20px 20rpx;
	}
</style>
