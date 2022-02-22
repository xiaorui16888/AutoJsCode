
console.show()
中括号集合=["[[[[]]]]", "[[[][]]]", "[[[]][]]", "[[[]]][]", "[[][[]]]", "[[][][]]","[[]]", "[][]","[[[]]]", "[[][]]", "[[]][]", "[][[]]", "[][][]"]
n=2
log(getBracketList(n,中括号集合))
n=3
log(getBracketList(n,中括号集合))
n=4
log(getBracketList(n,中括号集合))
function getBracketList(n,中括号集合){
  var 用来存储符合规定的中括号列表=[]
  for(var i=0;i<中括号集合.length;i++){
    var 原始中括号=中括号集合[i]
    var count=0
    var 当前中括号=原始中括号
    while(当前中括号.indexOf('[]')>-1){
      当前中括号=当前中括号.replace('[]','')
      count++
    }
    if(当前中括号.length==0 && count==n){
      用来存储符合规定的中括号列表.push(原始中括号)
    }else{
      continue
    }
  }
  return 用来存储符合规定的中括号列表
}
