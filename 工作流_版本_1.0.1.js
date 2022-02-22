/**
 * 简单工作流, 适用于一些流水线类似的操作.
 * 作者: 家
 * 版本: 1.0.1
 * 更新日志: 类的构造函数,改为安全模式, 就是用 instanceof 检查一下this是不是当前类, 防止忘记使用new
 */



var worksheet = {

	work1: {
		name: 'work1',
		go: function () {
			log('work1 is running !')
		},
		check: function () {
			return random(0, 2)
		},
		handlingExceptions: function () { }
	},
	work2: {
		name: 'work2',
		go: function () {
			log('work2 is running !')
		},
		check: function () {
			return random(0, 2)
		},
		handlingExceptions: function () { }
	},
	work3: {
		name: 'work3',
		go: function () {
			log('work3 is running !')
		},
		check: function () {
			// return random(0, 2)
			return 0
		},
		handlingExceptions: function () { }
	},


}

// // 原来的类构造函数
// function Flow(name, works) {
// 	this.name = name
// 	this.works = works
// 	this.oldWorks = []
// 	this.exceptionCount = 0;
// 	this.limitExceptionCount = 3;
// 	this.exceedLimitExceptionCount = 0;
// 	this.currentWorkLimitTime = 10000;
// }

// 现在的类构造函数  --  改为安全模式
var Flow = function (name, works) {
	if (this instanceof Flow) {
		this.name = name
		this.works = works
		this.oldWorks = []
		this.exceptionCount = 0;
		this.limitExceptionCount = 3;
		this.exceedLimitExceptionCount = 0;
		this.currentWorkLimitTime = 10000;
	} else {
		return new Flow(name, works)
	}
}

Flow.prototype.getWork = function () {
	if (this.works.length > 0) {
		return this.works[0]
	}
}
Flow.prototype.handlingExceptions = function () {
	log(this.name + '处理异常');
}
Flow.prototype.go = function () {
	while (1) {
		sleep(50)
		var work = this.getWork()
		if (work) {
			// exceptionCount用于判断跳转到前几步?
			// 
			worksheet[work].exceedLimitExceptionCount = worksheet[work].exceedLimitExceptionCount || 0
			log('当前工作是: ' + worksheet[work].name)
			var workThreadId = threads.start(
				function () {
					worksheet[work].go()
				}
			)
			var currentWorkLimitTime = worksheet[work].limitTime || this.currentWorkLimitTime
			var startTime = new Date().getTime()
			while (1) {
				var endTime = new Date().getTime()
				var spendTime = endTime - startTime
				if (spendTime > currentWorkLimitTime || !(workThreadId.isAlive())) {
					if (workThreadId.isAlive()) {
						workThreadId.interrupt()
					}
					break;
				}
				sleep(10)
			}
			var workResult = worksheet[work].check()
			log('workResult=' + workResult)
			if (workResult) {
				log(worksheet[work].name + ' 执行成功')
				worksheet[work].exceedLimitExceptionCount = 0;
				this.exceptionCount = 0
				// 数组头部删除 shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
				var oldWork = this.works.shift()
				this.oldWorks.push(oldWork)
			} else {
				log(worksheet[work].name + ' 执行失败')
				this.exceptionCount++;
				log('当前错误次数: ' + this.exceptionCount)
				// 一些可能不在预期内的异常处理
				worksheet[work].handlingExceptions()
				this.handlingExceptions()
				if (this.exceptionCount > this.limitExceptionCount) {
					worksheet[work].exceedLimitExceptionCount++;
					if (this.oldWorks.length > 0) {
						// pop() 方法用于删除并返回数组的最后一个元素。
						log(this.name + '超过异常限制的次数=' + worksheet[work].exceedLimitExceptionCount)
						for (var i = 0; i < worksheet[work].exceedLimitExceptionCount; i++) {
							var previousWork = this.oldWorks.pop()
							this.works.unshift(previousWork)
							this.exceptionCount = 0
							if (this.oldWorks.length < 1) {
								break;
							}
						}
					} else {
						toastLog('请检查权限, 无障碍, 网络等')
						return false
					}
				}
			}
		} else {
			log('没有工作了')
			return true
		}
	}
}

var allWorks = [
	'work1', 'work2', 'work3'
]

var flow = new Flow('flow测试', allWorks)
flow.go()






