console.show()
var 文本="13123456789 (北京北京)"
var 手机号 = 文本.match("(\\d{11})")
var 地区 = 文本.match("([\u4e00-\u9fa5]+)")
log(手机号[1])
log(地区[1])