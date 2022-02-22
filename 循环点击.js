auto("fast");
var help="  "+"查看并获取X,Y坐标方法:\n\n"
    +"设置→更多设置→开发者选项→指针位置;"
var cm=confirm(help)
if(cm){
var 循环次数 = dialogs.input("请输入点击次数!");
var x坐标 =dialogs.input("请输入要点击的x坐标!");
var y坐标 = dialogs.input("请输入要点击的y坐标!");
var delay= dialogs.input("请输入点击间隔!\n"+"1000毫秒=1秒!\n"+"单位毫秒!")
var sure = confirm("确定开始点击？");
if(sure){
var i;
var s=循环次数+1
console.show()
function 倒计时(){
    for(var o=8;o>0;o--){
        sleep(980)
        console.error("请在"+"  ",o,"   "+"秒内打开要点击的界面!!")
        sleep(1000)
        console.clear()
        }
    }
    倒计时()
for(i=1;i<s;i++){
    sleep(delay)
    press(x坐标,y坐标,200)
    log("已点击"+i+"次")
    }
    var z=i-1
    console.info("已完成"+z+"次点击!\n脚本结束!\n谢谢使用！")
    }
}
