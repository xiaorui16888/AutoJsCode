auto();
sleep(1000)
var i=1
//console.show()
//这就是就是就是计算机素啊啊ssdd的 的多的是是的是是是是是是是 是是是是是是的的是是是是是是是的的的的的的的的的dd 发 的发发cc 出出行
while(true){
sleep(555)
while(!click("通讯录"));
sleep(888)
var a=depth(4).row(i).findOne(1111);
if(a!=null){
    //toast("找到第"+i+"个好友")
    a.click();
    engines.execScript("发消息", "发消息();\n" + 发消息.toString()); 
    i++
    }else{
        while(true){    
            sleep(555)
            scrollDown(1)
            var a=depth(4).row(i).findOne(888);
            if(a!=null){
                toast("找到了")
                engines.execScript("发消息", "发消息();\n" + 发消息.toString()); 
                toast("测试")
                i++
                a.click();
                }else{
                    toast("继续循环")
                    }
            }
        }
    }




function 发消息(){
    sleep(888)
    var nc=id("com.tencent.mm:id/asb").findOne().text()
    console.info(nc)
    var t=nc.substr(3)
    //toast(t)
    while(!click("发消息"));
    sleep(888)
    className("android.widget.EditText").findOne().setText("大白测试");
    while(!click("发送"));
    sleep(1111)
    //toast(t)
    var te=t+"开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。发送朋友验证"
    //toast(te)
    sleep(888)
    if(text(te).exists()){
        toast("被删")
        var bz="A0000被删"
        }else if(text("消息已发出，但被对方拒收了。").exists()){
            toast("被拉黑")
            var bz="A0000被拉黑"
            }else{
                toast("没毛病")
                id("com.tencent.mm:id/iz").findOne().click()
                }
    }


function 备注(bz){  
    sleep(1000)
    id("com.tencent.mm:id/iw").findOne().click()
    var widget=id("com.tencent.mm:id/d97").findOne();
    click(widget.bounds().centerX(),widget.bounds().centerY());        
    id("com.tencent.mm:id/asi").findOne().click()
    var c=id("com.tencent.mm:id/att").findOne();
    var d=id("com.tencent.mm:id/att").findOne().text()
    var e=bz+d
    toast(e)
    click(c.bounds().centerX(),c.bounds().centerY());
    setText(0,e)
    sleep(888);
    id("com.tencent.mm:id/iv").findOne().click()
    sleep(888);
    id("com.tencent.mm:id/j7").findOne().click()
    sleep(888);
    id("com.tencent.mm:id/j7").findOne().click()
    sleep(888)
    id("com.tencent.mm:id/iz").findOne().click()
    toast("备注完成")
    sleep(1000)
    }







//engines.execScript("发消息", "发消息();\n" + 发消息.toString());


