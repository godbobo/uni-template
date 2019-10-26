import Vue from 'vue'
import Router from './bobo-router'

Vue.use(Router)

// 路由配置 页面中全部使用this.$Router来操作路由，以实现路由的全局管理
const router = new Router()

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach(function(to, from, next) {
	console.log('前置守卫')
	// to.page不存在表示此次路由跳转仅为了执行路由守卫，若不需处理则直接放行，就不会执行任何路由操作了
	if (from.page === '/pages/plugin/routers/r3' && !to.page) {
	// 测试小程序跳转
	// if (from.page === '/pages/index/index' && !to.page) {
		next({page: '/pages/plugin/routers/r4', params: {
			message: '我是从路由3刷新跳过来的'
		}, method: 'replace'})
	} else {
		next()
	}
})

// 路由后置拦截器
router.afterEach(function (to, from) {
	console.log('后置守卫')
})

// 路由跳转出错处理
router.onError(function(e) {
	console.log('错误：', e.message || '路由跳转失败')
})

export default router