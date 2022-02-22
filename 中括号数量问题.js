
中括号集合=["[[[[]]]]", "[[[][]]]", "[[[]][]]", "[[[]]][]", "[[][[]]]", "[[][][]]","[[]]", "[][]","[[[]]]", "[[][]]", "[[]][]", "[][[]]", "[][][]"]
n=2
r=getBracketList(n,中括号集合)
log(n+'对中括号'+r)
n=3
r=getBracketList(n,中括号集合)
log(n+'对中括号'+r)
n=4
r=getBracketList(n,中括号集合)
log(n+'对中括号'+r)
function getBracketList(n,中括号集合){
  var 用来存储符合规定的中括号列表=[]
  for(var i=0;i<中括号集合.length;i++){
    var 当前中括号=中括号集合[i]
    var 当前中括号对数=计算中括号对数(当前中括号)
    if(!当前中括号对数){
      continue
    }else{
      if(当前中括号对数===n){
        用来存储符合规定的中括号列表.push(当前中括号)
      }
    }
  }
  return 用来存储符合规定的中括号列表
}
function 计算中括号对数(中括号){
  中括号对数=0
  if(是否有效的中括号(中括号)){
    中括号对数=计算中括号对数(中括号)
  }else{
    return false
  }
  return 中括号对数
}
function 计算中括号对数(中括号){
  return 有多少左括号(中括号)
}
function 是否有效的中括号(中括号){
  var 中括号长度=中括号.length
  if(中括号长度 % 2){
    return false
  }
  var 左括号数量=有多少左括号(中括号)
  var 右括号数量=有多少右括号(中括号)
  if(左括号数量!==右括号数量){
    return false
  }
  if(/\[(\[|\])\]/.test(中括号)){
    return false
  }
  return true
}
function 有多少左括号(中括号){
  var n=(中括号.split('[')).length-1;
  // log('左括号数量=',n)
  return n
}
function 有多少右括号(中括号){
  var n=(中括号.split(']')).length-1;
  // log('左括号数量=',n)
  return n
}
中括号='[]]'
// 有多少左括号(中括号)
// getBracketList(2) // ["[[]]", "[][]"]
// getBracketList(3) // ["[[[]]]", "[[][]]", "[[]][]", "[][[]]", "[][][]"]
// generateParenthesis(4) // ["[[[[]]]]", "[[[][]]]", "[[[]][]]", "[[[]]][]", "[[][[]]]", "[[][][]]",...]
