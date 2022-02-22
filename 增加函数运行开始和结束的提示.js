function addTip(fn) {
  var 增加了提示的函数 = ''
  var 开始 = "\n;console.log(arguments.callee.name + '开始啦');\n"
  var 结束 = "\n;console.log(arguments.callee.name + '结束啦');\n"
  var fnStr = String(fn)
  // log('增加提示前fn=', fnStr)
  var 花括号之前的内容 = fnStr.match(/[\s\S]*?(?={)/)
  var 有没有return = (fnStr.indexOf('return') != -1) ? true : false
  var 函数体 = fnStr.match(/{[\s\S]*}/)[0]
  if (有没有return) {
    //在每个return 前面都加上 结束提示.
    var new函数体 = 函数体.replace(/return/g, 结束 + 'return');
    var 替换第一个花括号的new函数体 = new函数体.replace(/{/, '{' + 开始);
    增加了提示的函数 = 花括号之前的内容 + 替换第一个花括号的new函数体
  } else {
    var 函数体去掉首尾花括号 = 函数体.substring(1, 函数体.length - 1)
    增加了提示的函数 = 花括号之前的内容 + '{' + 开始 + 函数体去掉首尾花括号 + 结束 + '}'
  }
  // log("增加提示后fn=", 增加了提示的函数)
  return eval(增加了提示的函数)
}

function add(x, y, z) {
  var sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  if (sum > 10) {
    return sum + '>10'
  } else if (sum == 10) {
    return sum + '==10'
  } else {
    return sum + '<10'
  }
}
console.show()
var add = addTip(add)
var result = add(1, 20)
log(result)

function msg(msg) {
  console.log(msg)
}
var msg = addTip(msg)
msg('hello world')
