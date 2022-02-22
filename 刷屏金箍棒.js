var inputa=rawInput("输入需要刷屏的文字");
var inputb=rawInput("输入需要刷的行数");
if(parseInt(inputb)){
var A=inputa;
for(var i=0;i<inputb;i++){
A=A+"\n"+inputa;
}
setClip(A);
toast("已制作完成");
toast("请粘贴使用");
}else{toast("错误,制作失败")}
