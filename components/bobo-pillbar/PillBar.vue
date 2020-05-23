<template>
	<view v-show="showPillbar" :style="finalStyle" :class="finalClass" class="pill-bar-wrap">
		
	</view>
</template>

<script>
	/**
	 * 胶囊Tabbar
	 * 
	 * 参数解释：
	 * 
	 * [position]:tabbar显示位置，默认bottom，可选值为top。后续会支持left、right
	 * [scroll-top]:页面滚动距离，需要在父页面的生命周期函数onPageScroll中将scrollTop的值传递到这里
	 */
	export default {
		
		name: 'PillBar',
		
		props: {
			
			position: {
				type: String,
				default: 'bottom'
			},
			
			scrollTop: {
				type: Number,
				default: 0
			}
			
		},
		
		data() {
			return {
				showPillbar: true,
				scrollToTop: false
			}
		},
		
		computed: {
			
			finalStyle() {
				const style = {
					boxShadow: '4rpx 4rpx 6rpx rgba(50, 50, 50, 0.2)'
				}
				style[this.position] = '10px'
				return style
			},
			
			finalClass() {
				const clazz = []
				if (this.scrollToTop) {
					clazz.push('animation-fade')
				} else if (this.position === 'top') {
					clazz.push('animation-slide-top')
				} else if (this.position === 'bottom') {
					clazz.push('animation-slide-bottom')
				}
				return clazz
			}
			
		},
		
		watch: {
			scrollTop(newVal, oldVal) {
				let visible = true
				if (newVal > oldVal) {
					this.scrollToTop = true
					// 当用户向上滑动（获取下方内容）时 隐藏 pill-bar
					if (this.position === 'top' || this.position === 'bottom') {
						visible = false
					}
				} else {
					this.scrollToTop = false
				}
				this.showPillbar = visible
			}
		},
		
		methods: {
			
		}
		
	}
</script>

<style scoped>
	.pill-bar-wrap {
		position: fixed;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 200rpx;
		height: 50px;
		background-color: white;
		border-radius: 25px;
	}
	
	[class*=animation-] {
	    animation-duration: .3s;
	    animation-timing-function: ease-out;
	    animation-fill-mode: both
	}
	
	.animation-fade {
	    animation-name: fade;
	    animation-duration: .8s;
	    animation-timing-function: linear
	}
	
	.animation-slide-top {
	    animation-name: slide-top
	}
	
	.animation-slide-bottom {
	    animation-name: slide-bottom
	}
	
	@keyframes slide-top {
	    0% {
	        opacity: 0;
	        transform: translateY(-100%)
	    }
	
	    100% {
	        opacity: 1;
	        transform: translateY(0)
	    }
	}
	
	@keyframes slide-bottom {
	    0% {
	        opacity: 0;
	        transform: translateY(100%)
	    }
	
	    100% {
	        opacity: 1;
	        transform: translateY(0)
	    }
	}
</style>
