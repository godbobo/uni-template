# bobo-router

bobo-router 是一个基于uni-app框架的路由拦截插件，本项目借鉴了[uni-simple-router](https://github.com/SilurianYang/uni-simple-router)的思路，并对其进行简化，简化的原因是因为自己比较懒，不想每次新增页面就定义两遍路由表，所以`bobo-router`的特点就是纯粹的路由拦截，不再**定义两遍路由表**。

当然，由于不再定义路由表，也损失了一些能力，比如不能使用命名路由，不能在路由表中自定义路由元信息等。

> 本人不是大神，且目前只是第一个版本，可能会存在各种各样的问题，望大家谨慎使用，并多多担待。

## 安装

下载插件后，在`main.js`中导入即可。

```js
// main.js

import router from './utils/bobo-router'
```

## 基本使用

同`uni-simple-router`一样，项目中的路由跳转要全部弃用`uni.navigateTo()`这样的系统跳转方法，转而使用插件提供的`this.$Router.push()`这样的方法。

```js
// *.vue

// 跳转页面，保留当前页到页面栈，等同于 uni.navigateTo()
this.$Router.push({
	page: '/pages/index/index',
	params: {}
})

// 跳转页面，替换当前页到页面栈，等同于 uni.redirectTo()
this.$Router.replace({
	page: '/pages/index/index',
	params: {}
})

// 跳转页面，清空页面栈，等同于 uni.reLaunch()
this.$Router.replaceAll({
	page: '/pages/index/index',
	params: {}
})
```

> Tips: 
> 如果不需要传递参数，可以直接使用 this.$Router.push('/pages/index/index')

> 注意：
> 目前不支持与 Tab 有关的操作。原因是uni-app插件市场中已经有很多Tab栏的插件，都挺不错的，没有必要用系统的Tab页去增加系统的复杂性。
> 如果确实是刚需，可以修改 bobo-router 的内容，代码比较简单，大家应该都可以修改。

## 路由拦截

支持路由前置守卫和路由后置守卫，并且提供一个路由跳转失败的回调，可以重写以实现自己的逻辑。

在`bobo-router/index.js`中添加自己的拦截逻辑。

```js
// ./utils/bobo-router/index.js

// 路由全局拦截器 在这里处理登录、授权等相关操作
router.beforeEach(function(to, from, next) {
	console.log('前置守卫')
	if (to.page === '/pages/plugin/router-error') {
		// 仅为了测试守卫跳转功能
		next({page: '/pages/plugin/router'})
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
```

## 参数解析

使用本插件的方法去跳转路由，会将对象的第一级属性转换到URL中，深层对象则转为json串放在对应的属性中。

例如：

```js
// 转换前对象
{
	num: 19,
	numStr: '19',
	testParams: true,
	deepObj: {
		str: 'hahaha'
	},
	ignoreFun: function() {
		console.log('i\'m hide.')
	},
	testUndefined: undefined,
	testNull: null
}

// 转换后URL
?num=19&numStr=19&testParams=true&deepObj=%7B"str"%3A"hahaha"%7D&testUndefined=&testNull=
```

如果要获取当前路由信息，可通过`this.$Route`获取。

```js
{
    "path": "/pages/plugin/router?num=19&numStr=19&testParams=true&deepObj={\"str\":\"hahaha\"}&testUndefined=&testNull=",
    "params": {
        "num": 19,
        "numStr": "19",
        "testParams": true,
        "deepObj": {
            "str": "hahaha"
        },
        "testNull": null
    },
    "page": "/pages/plugin/router",
    "pageTitle": "路由拦截插件"
}
```

> 页面标题 pageTitle 是在页面中的 data(){}代码块中定义了之后才能正常显示，且只能在onload生命周期之后使用。
> h5端则不需要定义pageTitle，插件可直接获取当前网页标题。