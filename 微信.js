auto();

console.show()
//就是计算机思思耍手机这是的的的等等 地方 方法 放单发发的发的发发发 方九生九死四十几素饺子i桌子这卡法发 发方法发 方法发发发 发
sleep(1000)
launchApp("微信")
sleep(1000)
var i=1
while(!click("通讯录"));
while(true){
    sleep(888)
    var a=row(i).findOne(888).click()
    //console.info(a)
    if(a!=null){
        sleep(888)
        while(!click("发消息"));
        sleep(888)
        className("android.widget.EditText").findOne().setText("哥哥，你什么不说话啊");
        sleep(888)
        while(!click("发送"));
        var c=id("com.tencent.mm:id/anh").desc("重发").findOne(1555);
        if(c){
            if(text("消息已发出，但被对方拒收了。").exists()){              
                toast("拉黑")
                id("com.tencent.mm:id/j1").findOne().click()
                sleep(888)
                var va=id("com.tencent.mm:id/dnr").findOne()
                if(va){                   
                    click(va.bounds().centerX(),va.bounds().centerY());
                    sleep(888)                    
                    while(!click("设置备注和标签"));
                    sleep(888)
                    var vb=id("com.tencent.mm:id/ayt").findOne()
                    var vc=vb.text()
                    var vd="A0000被拉黑"+vc
                    vb.click()
                    setText(vd)
                    sleep(888)
                    while(!click("完成"));
                    sleep(888)
                    id("com.tencent.mm:id/jb").findOne().click()
                    sleep(888)
                    id("com.tencent.mm:id/jb").findOne().click()
                    sleep(888)
                    id("com.tencent.mm:id/j4").findOne().click()
                    sleep(888)
                    while(!click("通讯录"));
                    i++
                    }else{
                        
                        }
                }else{                  
                    toast("被删")
                    
                    }         
                }else{
                toast("发送成功")
                sleep(888)
                id("com.tencent.mm:id/j4").findOne().click()
                i++
                sleep(888)
                while(!click("通讯录"));
                }
            }
                 else{
            toast("下滑")
            scrollDown(1);
                
            }
    }