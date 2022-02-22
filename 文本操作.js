
//参数1 str 文本型 原始数据
//参数2 stra 文本型 欲替换数据
//参数3 strb 文本型 用作替换数据
function 替换一个(str, stra, strb){
  return str.replace(stra, strb)
}

//参数1 str 文本型 原始数据
//参数2 stra 文本型 欲替换数据
//参数3 strb 文本型 用作替换数据
function 全部替换(str, stra, strb){
  return eval("str.replace(/"+stra+"/g,'"+strb+"')")
}

//查找文本，找到返回位置，找不到返回-1
//参数1 str 文本型 原始数据
//参数2 stra 文本型 欲查找数据
function 查找(str, stra){
  return str.search(stra)
}

//取出文本左边
//参数1 str 文本型 原始数据
//参数2 stra 文本型 标识
//var a="123456" 取左边(a，3) 返回12
function 取左边(str,stra){
  return str.substr(0, str.indexOf(stra));
} 

//取出文本左边
//参数1 str 文本型 原始数据
//参数2 stra 文本型 左边
//参数3 strb 文本型 右边
//var a="123456" 取中间(a，“1”，“4”) 返回23
function 取中间(str,stra,strb){
  return str.substring(str.indexOf(stra)+1,str.lastIndexOf(strb));
}


//参数1 str 文本型 原始数据
//参数2 inta 整数型 开始位置
//参数3 intb 整数型 长度
//var a="123456" 截取(a，3，2) 返回34
function 截取(str, inta, intb){
  if (intb) {
	  return str.substr(inta, intb)
	} else {
	  return str.substr(inta)
	}
}