class Router {
	constructor(arg) {
		if (arg && arg.constructor !== Object) {
			return console.error(`Routing configuration must be an Object`)
		}
		Router.$root = this;
	}
	
	// 路由跳转方法映射
	routeMap = {
		push: 'navigateTo',
		replace: 'redirectTo',
		replaceAll: 'reLaunch',
		pushTab: 'switchTab'
	}
	
	/**
	 * 执行路由跳转
	 */
	_pushTo() {
		return new Promise((resolve, reject) => {
			let {page, params, method} = this.tempRoute
			// 对首次进入页面执行路由守卫时如果放行，method page params都为空 此时应该直接中断流程，无需抛出异常
			if (!method && !page && !params) {
				return
			}
			
			let urlParams = '?'
			if (!page) {
				reject(new Error('参数page未填写'))
				return
			} else if (params && typeof(params) === 'object') {
				// 处理参数，转换为url字符串
				Object.keys(params).forEach(k => {
					// 深度对象转为json字符串（包含数组）
					if (typeof(params[k]) === 'object') {
						if (params[k]) {
							const json = JSON.stringify(params[k])
							urlParams += `${k}=${json}&`
						} else {
							urlParams += `${k}=&`
						}
					} else if (typeof(params[k]) === 'number' || typeof(params[k]) === 'string' || typeof(params[k]) === 'boolean') {
						// 基础值直接写入
						urlParams += `${k}=${params[k]}&`
					} else if (typeof(params[k]) === 'undefined') {
						urlParams += `${k}=&`
					}
				})
			}
			
			// 参数组装
			if (urlParams.length === 1) {
				urlParams = ''
			} else {
				urlParams = urlParams.substr(0, urlParams.length - 1)
			}
			
			// 设置路由跳转方式
			if (!method) {
				method = 'navigateTo'
			}
			if (this.routeMap[method]) {
				method = this.routeMap[method]
			}
			
			// 调用系统跳转方法
			uni[method]({
				url: page + urlParams,
				success: () => {
					// 执行路由后置守卫
					if (this._afterEach && typeof(this._afterEach) === 'function') {
						this._afterEach.call(this, this.tempRoute, this.route)
					}
					
					// 更新路由信息
					this.route = {
						path: page + urlParams,
						params: params || {},
						page
					}
					this.tempRoute = null
					resolve()
				},
				fail: (e) => {
					reject(new Error('路由跳转失败！'))
				}
			})
		})
	}
	
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(arg) {
		const rule = {
			method: 'navigateTo'
		}
		if (typeof(arg) === 'string') {
			rule.page = arg
		} else if (typeof(arg) === 'object') {
			rule.page = arg.page
			rule.params = arg.params
		}
		this.next(rule)
	}
	
	/**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	 * redirectTo
	 * @param {Object} rule
	 */
	replace(arg) {
		const rule = {
			method: 'redirectTo'
		}
		if (typeof(arg) === 'string') {
			rule.page = arg
		} else if (typeof(arg) === 'object') {
			rule.page = arg.page
			rule.params = arg.params
		}
		this.next(rule)
	}
	
	/**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	 * 	reLaunch
	 * @param {Object} rule
	 */
	replaceAll(arg) {
		const rule = {
			method: 'reLaunch'
		}
		if (typeof(arg) === 'string') {
			rule.page = arg
		} else if (typeof(arg) === 'object') {
			rule.page = arg.page
			rule.params = arg.params
		}
		this.next(rule)
	}
	
	/** 跳转Tabbar
	 * 	switchTab
	 * @param {Object} rule
	 */
	pushTab(arg) {
		const rule = {
			method: 'switchTab'
		}
		if (typeof(arg) === 'string') {
			rule.page = arg
		} else if (typeof(arg) === 'object') {
			rule.page = arg.page
			rule.params = arg.params
		}
		this.next(rule)
	}
	
	
	/**
	 * 返回到指定层级页面上
	 */
	back(delta = 1) {
		// 返回上级
		if (delta.constructor != Number) {
			this._errorHandler(new Error('返回层级参数必须是一个Number类型且必须大于0：'))
			return
		}
		uni.navigateBack({
			delta
		})
	}
	
	/**
	 * 分发路由
	 * @param {Object} args
	 */
	_next() {
		return new Promise((resolve, reject) => {
			if (this._beforeEach && typeof(this._beforeEach) === 'function') {
				// 需要传给守卫 to from next
				this._beforeEach.call(this, this.tempRoute, this.route, resolve)
			} else {
				this._pushTo().catch(e => {
					reject(e)
				})
			}
		})
	}
	
	next(args) {
		if (args) {
			// 保存临时数据
			if (typeof(args) === 'object') {
				this.tempRoute = {
					// 第一次调用next一定存在method，后续循环调用可能不会存在，不存在时使用上次缓存的method
					method: args.method || this.tempRoute.method,
					page: args.page,
					params: args.params
				}
			} else if (typeof(args) === 'string') {
				this.tempRoute = {
					page: args
				}
			} else if (!args) {
				// 中断路由 args = false
				this.tempRoute = null
				return
			}
			
			if (!this.route) {
				this.route = {
					page: '/' + getCurrentPages()[0].route
				}
			}
			
			this._next().then(args => {
				this.next(args)
			}).catch(e => {
				this.tempRoute = null
				this._errorHandler(e)
			})
		} else {
			this._pushTo().catch(e => {
				this.tempRoute = null
				this._errorHandler(e)
			})
		}
	}
	
	/**
	 * 应用启动时执行一次路由检查（前置守卫，若通过则不做事情）
	 */
	doBeforeHooks() {
		this.tempRoute = {}
		this.next({})
	}
	
	// 设置路由前置/后置守卫
	beforeEach(fn) {
		this._beforeEach = fn
	}
	afterEach(fn) {
		this._afterEach = fn
	}
	// 设置路由跳转错误处理
	onError(fn) {
		if (fn && typeof(fn) === 'function') {
			this._errorHandler = fn
		}
	}
	
	// 获取当前路由信息
	getCurrentRoute() {
		return this.route
	}
	
}

// 路由对象属性定义
Router.$root = null
// 当前路由内容
Router.route = null
// 临时路由信息
Router.tempRoute = null
// 路由前置后置守卫
Router._beforeEach = null
Router._afterEach = null
// 路由跳转错误处理
Router._errorHandler = function(e) {
	console.error(e)
}

Router.install = function(Vue) {
	Vue.mixin({
		onLaunch: function() {
		},
		onLoad:function(props){
			// 首次进入页面时,缓存中不存在当前路由信息，需要初始化路由信息
			if (!Router.$root.getCurrentRoute()) {
				const rt = {
					params: {},
					page: '/' + getCurrentPages()[0].route
				}
				if (props) {
					Object.keys(props).forEach(k => {
						// url转的对象全部都是字符串，需要识别其中的对象和基本数据类型
						try {
							const obj = JSON.parse(props[k])
							if (typeof(obj) === 'string') {
								// 只有字符串还会是字符串，数字、布尔、数组均会转换为正常类型
								rt.params[k] = props[k]
							} else {
								rt.params[k] = obj
							}
						} catch(e) {
							rt.params[k] = props[k]
						}
					})
				}
				Router.$root.route = rt
				
				// 执行路由前置守卫
				Router.$root.doBeforeHooks()
			}
			
			// 自动获取页面标题(app端可能获取不到)
			const pages = getCurrentPages()
			let pageTitle = pages[pages.length - 1].pageTitle
			// #ifdef H5
			if (!pageTitle) {
				pageTitle = document.title
			}
			// #endif
			Router.$root.route.pageTitle = pageTitle
		}
	})
	Object.defineProperty(Vue.prototype, "$Router", {
		get: function() {
			return Router.$root
		}
	})
	Object.defineProperty(Vue.prototype, "$Route", {
		get: function() {
			return Router.$root.getCurrentRoute()
		}
	})
}

export default Router