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