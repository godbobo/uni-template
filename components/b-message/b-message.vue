<template>
	<view :style="{zIndex: zIndex}" class="message-wrap">
		<view class="container">
			<view v-if="type" :animation="animationData" class="message">
				<text v-show="type === 'info'" class="bm-icon info">&#xe60a;</text>
				<text v-show="type === 'success'" class="bm-icon success">&#xe62f;</text>
				<text v-show="type === 'warn'" class="bm-icon warn">&#xe60a;</text>
				<text v-show="type === 'error'" class="bm-icon error">&#xe630;</text>
				<text>{{message}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 若app端支持静态slot，则表格组件可预定义多个slot来代替动态slot
	// 要有队列的效果
	export default {
		name: 'bobo-message-cpt',
		props: {
			zIndex: {
				type: Number,
				default: 10000
			},
		},
		data() {
			return {
				message: '',
				type: '',
				animationData: {}
			}
		},
		methods: {
			/**
			 * 展示普通提示信息
			 * @param {Object} message
			 */
			info(message) {
				this.type = 'info'
				this.message = message
				const animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-out'
				})
				this.animation = animation
				
				animation.opacity(0).translateY(-30).step()
				
				this.animationData = animation.export()
				
				setTimeout(function() {
					animation.opacity(1).translateY(0).step()
					this.animationData = animation.export()
				}.bind(this), 0)
			},
			/**
			 * 展示成功提示
			 * @param {Object} message
			 */
			success(message) {
				this.type = 'success'
				this.message = message
			},
			/**
			 * 展示警告提示
			 * @param {Object} message
			 */
			warn(message) {
				this.type = 'warn'
				this.message = message
			},
			/**
			 * 展示错误提示
			 * @param {Object} message
			 */
			error(message) {
				this.type = 'error'
				this.message = message
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
	  font-family: 'bobo-message-iconfont';  /* project id 1477381 */
	  src: url('//at.alicdn.com/t/font_1477381_he3mzn2ywl9.ttf') format('truetype');
	}
	
	.message-wrap {
		position: fixed;
		width: 100vw;
		top: 24px;
		left: 0;
		line-height: 1.5;
		color: #515a6e;
		
		.container {
			padding: 5px 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.message {
				display: flex;
				pointer-events: all;
				padding: 8px 16px;
				border-radius: 4px;
				box-shadow: 0 1px 6px rgba(0,0,0,.2);
				background: #fff;
				
				.bm-icon {
					font-family: bobo-message-iconfont;
					margin-right: 10rpx;
				}
				
				.info {
					color: #007AFF;
				}
				
				.success {
					color: #4CD964;
				}
				
				.warn {
					color: #FBBD08;
				}
				
				.error {
					color: #ED1C24;
				}
			}
		}
	}
</style>
