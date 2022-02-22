offset=id("offset")//提前赋值
offsetlayout=id("layout_offset")
offsetclickbeg=1,offsetclickend=3,offsettimeout=1000//网络超时时间
//

//定义：启动app，操作开始
        function launchtimeapp(){
timeapptf=app.launch("ru.org.amip.ClockSync")
if(timeapptf){
    console.verbose("启动时间app成功")
    }else{
        console.error("启动时间app失败")
        }
}

offsetclickmid=Math.ceil((offsetclickend-offsetclickbeg+1)/2)-1
evaleyc="exactyanchi"+offsetclickbeg
function connectcheck(){
        offsetlayout.findOne()
        sleep(500)
offsetlayout.click()
offsetlayout.click()
sleep(offsettimeout)
offsettf=true
}
sleep(1000)
log(1)
function getexactyanchi(){
//toastLog(lastclicktext)
launchtimeapp()
if(!timeapptf){
    toast(timeapptf+"安装指定app,将无法运行")
    console.error(timeapptf+"安装指定app,将无法运行")
    newerrs()
    exit()}else if(timeapptf&&(offsetclickbeg==1)){
        
        console.verbose("时间app安装"+timeapptf+"建议ntp服务器 ntp.aliyun.com")
        }
//app操作开始

/*
ahour=id("a_hour"),aminute=id("a_minute"),asecond=id("a_second")
ahour.findOne()
findtext=find().text()
log("ahour"+ahour.findtext)
if((ahour.findtext=="00"&&aminute.findtext=="00")&&asecond.findtext){
    toastLog("等下")
    sleep(1500)
    }*/if(offsetclickbeg==1){
    sleep(1500)
    }
connectcheck()

launchtimes=1
launchtimesend=4
while(launchtimes<launchtimesend){
if(offsettf==false){
    sleep(500)
    back()
    sleep(500)
    launchtimeapp()
   
    console.error("第"+offsetclickbeg+"次循环，第"+launchtimes+"次检测失败")
   
    launchtimes=launchtimes+1
    sleep(1500)
    connectcheck()
    }else if(offsettf==true){
        launchtimes=launchtimesend+1
     }
        
        }
        if(launchtimes==launchtimesend){
            toast(notification2)
            console.error(notification2)
            newerrs()
            }
while(offsettf==false){
    sleep(1000)
    connectcheck()
    
    sleep(1000)
    }
    
    offset.findOne()
   threadoffsettext= threads.start(function(){
    offsettext=offset.findOne().text()
    offsettext=offset.findOne().text()
    })
    threadoffsettext.join()
    toastLog(offsettext)
    log(id("a_second").findOne().text())
    eval(evaleyc+"=\""+String(Number(offsettext)*1000)+"\"")
    console.info(offsetclickbeg+"次取文本"+offsettext+"秒→"+eval(evaleyc))
    
    if(Math.abs(eval(evaleyc))>=60000||isNaN(eval(evaleyc))){
        notificationyanchi=(notification3+eval(evaleyc))
        toast(notificationyanchi)
        console.error(notificationyanchi)
        newerrs()
        exit()}
        //systemlayout=id("layout_system")
        
        /*
        if(systemlayout.exists()&&confirmfloat==true){
            systemlayout.click()
            sleep(1000)
            textContains("时间").findOne()
            sleep(1000)
            }*/
  //          toastLog("测试成功");stop()
 
  sleep(500)
  offsettext=1
  }
  while(offsetclickbeg<=offsetclickend){
      getexactyanchi()
      offsetclickbeg=offsetclickbeg+1
      }