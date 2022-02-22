dialogs.alert("欢迎使用夜岗睡得香，打完点就可以碎觉惹，小心经理戳屁眼")
var c;
var i;
var sj = [1,2,3]
myDate = new Date()
i=0;
c=0;
c=dialogs.input("自动发送图片多少次？")||""
toast(c)
while(c==""){
    c=dialogs.input("自动发送图片多少次？")||""
    }


setClip("秩序维护部全员群")
dx=dialogs.rawInput("输入转发的群名称(粘贴有惊喜)")||"李白"    
while(i!=c){
    i=i+1
        sj[i]=dialogs.rawInput("第"+i+"次时间")
        toast(sj[i])
        
    }
for(i=0;i<5;i++){
    toast("请在下方打开本软件的无阻碍开关")
    }
    
    auto.waitFor()
i=0    
while(i!=c){
      i=i+1
    while(sj[i]!=myDate.getHours()+"."+myDate.getMinutes()){
        myDate = new Date()      
        }
    device.wakeUp()
    sleep(500)    
    launchApp("微信")
    sleep(500)
    while(!click(dx)){
        sleep(200)
        }
    sleep(1000)
    className("ImageButton").descStartsWith("更多功能按钮").click();
    sleep(1000)
    while(!click("相册")){
        sleep(500)
        }
    sleep(1000)
    className("GridView").findOne().child(c-i).click();
    sleep(1000)
    while(!click("发送"))
    sleep(2000)          
}

dialogs.confirm("已全部发送！睡得香不香，蚊子也该喂饱了")