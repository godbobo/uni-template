# uni-template

个人开发的uni-app组件库

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7d6adzvydj30ic0wk40l.jpg)

# 功能介绍

这个项目基于[ColorUI](https://github.com/weilanwl/ColorUI)构建,并且会基于工作中常用的功能对ColorUI的CSS样式集成为组件，方便使用。

同时项目中用到了[uni-simple-router](https://github.com/SilurianYang/uni-simple-router)作为路由组件，除了不得不多定义一份路由表之外，其他地方真的挺赞的。

这个项目是个人的学习练手项目，欢迎批评指正。

# 组件列表

## 1、下拉搜索选择框

移动端通常是用一个弹出的波轮区域来选择某个元素的，但对于一个很大的集合，如果仍旧使用这样的方式用户体验就会很差。而我遍寻社区，似乎也没有找到一个好的移动端的可搜索下拉框，那就只好自己实现了～

## 2、表格（仅支持H5）

移动端确实不适合展示表格，而且通常可以用一些其他方法去规避使用表格。但我就想用表格呢？看了一下插件市场的表格插件，确实都还可以，但对于自定义样式的支持要么很少，要么实现方式复杂。这时我想起了PC端的iview框架，它是通过插槽来实现自定义样式的，那我是否也可以这么做呢？当然可以！

接下来，show-me-the-code！

**/pages/cpt/table.vue**

```vue
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

```

**/pages/cpt/datas/table-defines.js**

```js
export default {
	testDefine: [
		{
			title: '序号',
			key : 'id',
			align: 'center'
		},
		{
			title: '时间',
			key: 'time'
		},
		{
			title: '链接',
			key: 'link'
		},
		{
			title: '姓名',
			key: 'name'
		},
		{
			title: '状态',
			key: 'status'
		},
		{
			title: '数量',
			key: 'count',
			formatter: function(row, index) {
				return row.count + index
			}
		},
		{
			title: '操作',
			slot: 'options',
			width: 300
		}
	],
	testData: [
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
		{
			id: 125,
			time: '2019-09-41',
			link: 'www.baidu.com',
			name: '张三',
			status: '正常',
			count: 300
		},
	]
}
```

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7d6idz1cdj30ie0wugol.jpg)

就这样，定义行、定义数据，就可以简单的展现一个表格了。

## 3、时间转换工具

做前端开发，不可避免地要与时间打交道，各种时间转换真的令人头疼，总想赶紧抽取出一个工具类，却总是懒得动。现在，下定决心去搞一个自己觉得好用的时间转换工具类！

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7d6p86ubej30i60xsq7w.jpg)