function DateUtil() {
	// 当前日期对象
	this.date = null
	// 年月分隔符
	this.yearSeperater = '-'
	this.yearZhSeperater = '年'
	// 月日分隔符
	this.monthSeperater = '-'
	this.monthZhSeperater = '月'
	// 日时分隔符
	this.dateSeperater = ' '
	this.dateZhSeperater = '日'
	// 时分分隔符
	this.hourSeperater = ':'
	this.hourZhSeperater = '时'
	// 分秒分隔符
	this.minuteSeperater = ':'
	this.minuteZhSeperater = '分'
	// 秒毫秒分隔符
	this.secondSeperater = '.'
	this.secondZhSeperater = '秒'
	this.millsecondZhSeperater = '毫秒'
}

const zhNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const zhTimes = ['', '十', '百']

/**
 * 初始化日期对象
 */
DateUtil.prototype.build = function() {
	switch (arguments.length) {
		case 1:
			const arg = arguments[0]
			if (arg instanceof Date) {
				this.date = arg
			} else if (arg instanceof String) {
				// 字符串转日期或时间戳转日期
			}
			return this
		default:
			this.date = new Date()
			return this
	}
}

/**
 * 日期转字符串
 */
DateUtil.prototype.toStr = function() {
	if (!this.date) {
		this.date = new Date()
	}
	const year = this.date.getFullYear()
	const month = fixZero(this.date.getMonth() + 1)
	const day = fixZero(this.date.getDate())
	const hour = fixZero(this.date.getHours())
	const minutes = fixZero(this.date.getMinutes())
	const seconds = fixZero(this.date.getSeconds())
	const millSeconds = fixZero(this.date.getMilliseconds())
	switch (arguments.length) {
		case 1:
			switch (arguments[0]) {
				case this.YEAR():
					return year + ''
				case this.MONTH():
					return year + this.yearSeperater + month
				case this.DAY():
					return year + this.yearSeperater + month + this.monthSeperater + day
				case this.TIME():
					return year + this.yearSeperater + month + this.monthSeperater + day + ' ' + hour + this.hourSeperater + minutes +
						this.minuteSeperater + seconds
				case this.ONLY_TIME():
					return hour + this.hourSeperater + minutes + this.minuteSeperater + seconds
				case this.ONLY_MILLI_TIME():
					return hour + this.hourSeperater + minutes + this.minuteSeperater + seconds + this.secondSeperater + millSeconds
				case this.MILLI_TIME():
					return year + this.yearSeperater + month + this.monthSeperater + day + ' ' + hour + this.hourSeperater + minutes +
						this.minuteSeperater + seconds + this.secondSeperater + millSeconds
			}
		default:
			return year + this.yearSeperater + month + this.monthSeperater + day + ' ' + hour + this.hourSeperater + minutes +
				this.minuteSeperater + seconds
	}
}

/**
 * 日期转时间戳
 */
DateUtil.prototype.toTimestamp = function() {
	if (!this.date) {
		this.date = new Date()
	}
	return this.date.getTime()
}

/**
 * 日期转汉字
 */
DateUtil.prototype.toZh = function() {
	if (!this.date) {
		this.date = new Date()
	}
	let parseZh = false
	if (arguments[1] && arguments[1] === true) {
		parseZh = true
	}
	const year = parseZh ? numToZh(this.date.getFullYear()) : this.date.getFullYear()
	const month = parseZh ? numToZh(this.date.getMonth() + 1) : this.date.getMonth() + 1
	const day = parseZh ? numToZh(this.date.getDate()) : this.date.getDate()
	const hour = parseZh ? numToZh(this.date.getHours()) : this.date.getHours()
	const minutes = parseZh ? numToZh(this.date.getMinutes()) : this.date.getMinutes()
	const seconds = parseZh ? numToZh(this.date.getSeconds()) : this.date.getSeconds()
	const millSeconds = parseZh ? numToZh(this.date.getMilliseconds()) : this.date.getMilliseconds()
	function myparse(type, _m) {
		switch (type) {
			case _m.YEAR():
				return year + _m.yearZhSeperater
			case _m.MONTH():
				return year + _m.yearZhSeperater + month + _m.monthZhSeperater
			case _m.DAY():
				return year + _m.yearZhSeperater + month + _m.monthZhSeperater + day + _m.dateZhSeperater
			case _m.TIME():
				return year + _m.yearZhSeperater + month + _m.monthZhSeperater + day + _m.dateZhSeperater + hour + _m.hourZhSeperater + minutes + _m.minuteZhSeperater + seconds + _m.secondZhSeperater
			case _m.ONLY_TIME():
				return hour + _m.hourZhSeperater + minutes + _m.minuteZhSeperater + seconds + _m.secondZhSeperater
			case _m.ONLY_MILLI_TIME():
				return hour + _m.hourZhSeperater + minutes + _m.minuteZhSeperater + seconds + _m.secondZhSeperater + millSeconds + _m.millsecondZhSeperater
			case _m.MILLI_TIME():
				return year + _m.yearZhSeperater + month + _m.monthZhSeperater + day + _m.dateZhSeperater + hour + _m.hourZhSeperater + minutes + _m.minuteZhSeperater + seconds + _m.secondZhSeperater + millSeconds + _m.millsecondZhSeperater
			default:
				return year + _m.yearZhSeperater + month + _m.monthZhSeperater + day + _m.dateZhSeperater + hour + _m.hourZhSeperater + minutes + _m.minuteZhSeperater + seconds + _m.secondZhSeperater
		}
	}
	switch (arguments.length) {
		case 2:
		case 1:
			return myparse(arguments[0], this)
		default:
			return myparse(this.TIME(), this)
	}
}

/**
 *  获取当前日期
 */
DateUtil.prototype.getDate = function() {
	return this.date
}

// setter方法
DateUtil.prototype.setYearSeperater = function() {
	switch (arguments.length) {
		case 5:
			this.secondSeperater = arguments[4]
		case 4:
			this.minuteSeperater = arguments[3]
		case 3:
			this.hourSeperater = arguments[2]
		case 2:
			this.monthSeperater = arguments[1]
		case 1:
			this.yearSeperater = arguments[0]
			break
		default:
			// 默认恢复默认值
			this.yearSeperater = this.monthSeperater = '-'
			this.hourSeperater = this.minuteSeperater = ':'
			this.secondSeperater = '.'
	}
	return this
}
DateUtil.prototype.setMonthSeperater = function() {
	switch (arguments.length) {
		case 4:
			this.secondSeperater = arguments[3]
		case 3:
			this.minuteSeperater = arguments[2]
		case 2:
			this.hourSeperater = arguments[1]
		case 1:
			this.monthSeperater = arguments[0]
			break
		default:
			// 默认恢复默认值
			this.monthSeperater = '-'
			this.hourSeperater = this.minuteSeperater = ':'
			this.secondSeperater = '.'
	}
	return this
}
DateUtil.prototype.setHourSeperater = function() {
	switch (arguments.length) {
		case 3:
			this.secondSeperater = arguments[2]
		case 2:
			this.minuteSeperater = arguments[1]
		case 1:
			this.hourSeperater = arguments[0]
			break
		default:
			// 默认恢复默认值
			this.hourSeperater = this.minuteSeperater = ':'
			this.secondSeperater = '.'
	}
	return this
}
DateUtil.prototype.setMinuteSeperater = function() {
	switch (arguments.length) {
		case 2:
			this.secondSeperater = arguments[1]
		case 1:
			this.minuteSeperater = arguments[0]
			break
		default:
			// 默认恢复默认值
			this.minuteSeperater = ':'
			this.secondSeperater = '.'
	}
	return this
}
DateUtil.prototype.setSecondSeperater = function(seperater = ':') {
	this.secondSeperater = seperater
	return this
}

// 常量（函数实现方式）
// 精确到年
DateUtil.prototype.YEAR = function() {
	return 'year'
}
// 精确到月
DateUtil.prototype.MONTH = function() {
	return 'month'
}
// 精确到天
DateUtil.prototype.DAY = function() {
	return 'day'
}
// 完整时间
DateUtil.prototype.TIME = function() {
	return 'time'
}
// 仅显示时间
DateUtil.prototype.ONLY_TIME = function() {
	return 'onlyTime'
}
// 完整时间加毫秒
DateUtil.prototype.MILLI_TIME = function() {
	return 'milliTime'
}
// 仅时间加毫秒
DateUtil.prototype.ONLY_MILLI_TIME = function() {
	return 'onlyMilliTime'
}


/**
 * 数字补0(返回两位以上的字符串)
 */
function fixZero(num = '00') {
	return num > 9 || num < 0 ? '' + num : '0' + num
}

/**
 * 数字转汉字（简单版本）
 */
function numToZh(num = '') {
	num += ''
	let z = ''
	if (num.length >= 4) {
		// 年份直接按顺序读数字即可,再高位也不去支持了
		for(let i = 0; i < num.length; i++) {
			z += zhNumbers[parseInt(num[i])]
		}
	} else {
		// 普通情况下需考虑进位,分别确定百位和十位即可，毫秒最高位数为百位
		let tmp1 = parseInt(num)
		let tmp2 = Math.floor(tmp1 / 100)
		z += (tmp2 > 0 ? zhNumbers[tmp2] + '百' : '')
		tmp1 = tmp1 % 100
		tmp2 = Math.floor(tmp1 / 10)
		// 习惯性地，一十一应该叫十一
		z += (tmp2 > 0 ? zhNumbers[tmp2] + '十' : '')
		if (z === '一十') {
			z = '十'
		}
		tmp1 = tmp1 % 10
		z += (tmp1 > 0 ? zhNumbers[tmp1] : '')
		if (z.length > 2 && z.indexOf('百') === z.length - 2) {
			z = z.slice(0, 2) + '零' + z.slice(2)
		}
	}
	return z
}

export default DateUtil
