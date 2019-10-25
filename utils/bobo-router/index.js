import Vue from 'vue'
import Router from './bobo-router'

Vue.use(Router)

// 路由配置 页面中全部使用this.$Router来操作路由，以实现路由的全局管理
const router = new Router()

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach(function(to, from, next) {
	console.log('前置守卫')
	if (to.page === '/pages/cpt/table' && to.params.testParams) {
		// 仅为了测试守卫跳转功能
		next({page: '/pages/plugin/router', params: to.params, method: 'redirectTo'})
	} else {
		next()
	}
})

// 路由后置拦截器 在这里处理用户高频操作信息
router.afterEach(function (to, from) {
	console.log('后置守卫')
})

// 路由跳转出错处理
router.onError(function(e) {
	console.log('错误：', e.message || '路由跳转失败')
})

export default router