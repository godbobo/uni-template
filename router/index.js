import Vue from 'vue'
import Router from 'uni-simple-router'
import routes from './routes'

Vue.use(Router)

// 路由配置 页面中全部使用this.$Router来操作路由，以实现路由的全局管理
const router = new Router({
	routes: routes
})

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach((to, from, next) => {
	next()
})

// 路由后置拦截器 在这里处理用户高频操作信息
router.afterEach((to, from) => {
	
})

export default router