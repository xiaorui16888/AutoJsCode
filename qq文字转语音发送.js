"auto"
var window = floaty.window(
    
    <vertical>
    
  
        <button id="ok" text="发送"w="80" h="50"/>
    
    </vertical>
);
//
window.exitOnClose();
setInterval(() => {}, 1000);

var execution = null;
/***文字转语音****/

var key=3;
    


//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.ok.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 5000) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});
var text1;
function onClick() {
    if (window.ok.getText() == '发送') {
        if(currentPackage()=="com.tencent.mobileqq")
        {
            if(id("input").exists()){
             text1=id("input").findOne().text();
            key=2;
           //toast(text1);
           }
        else
        {
            toast("请在QQ聊天界面操作");
            return 1;
         }
         }
         else
        {
            toast("请在QQ聊天界面操作");
            return 2;
         }
        // toast("hhhhhhhhh");
     
    }
}
while(1)
{
  if(key==2)
  {

     
     
     //获取token
var url_getToken = 'https://aip.baidubce.com/oauth/2.0/token';
    
var Token_html = http.post(url_getToken,{
    'grant_type'    : 'client_credentials', //固定值
    'client_id'     : '9EGUQX6ssVZIWDwW3rZSUbX7', //填写你的 APIKey
    'client_secret' : 'osVsq16TkzxOMjL70MQnIswpgPjm6s10', //填写你的 SecretKey
});
    
var Token = Token_html.body.json().access_token;


  
 

    var a=encodeURI(text1);
  
  var ocr_post_url = 'http://tsn.baidu.com/text2audio';
        var Ocr_Question_Html = http.post(ocr_post_url, {
            'tok' : Token,
            'tex' : a,
            'cuid' : '863281030228548',
            'ctp': '1',
            'lan': 'zh',
            'spd': '5',//语速0-15 5
            'pit': '5',//音调0-15 5
            'vol': '5',//音量0-15 5
            'per': '4',//	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
            'aue': '3',//	3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）; 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响。
        
        });
           var a=Ocr_Question_Html.body.bytes();
           
           
           
          var QQ="1946586304";
    
    var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
  var date2 = new Date().getDate()
  var path = "/storage/emulated/0/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/";
  
  files.removeDir(path);
  files.ensureDir(path);
  sleep(200)
     
      id("name").className("android.widget.ImageView").boundsInside(0,1006,154,1108).click();//135
  
  click("录音")
  sleep(200)
  //bounds(379, 1356, 700, 1677).find().click()
  desc("开始录音").click();
  sleep(2000) //录音时长，可随意指定，不建议太短
  //bounds(379, 1356, 700, 1677).find().click()
  desc("停止录音").click()
  
  sleep(500)
  var fileName = files.listDir(path);
  toastLog(fileName[0])
 // files.removeDir(path) //删除生成录音文件
  files.ensureDir(path) //确保目录存在
  files.writeBytes("/sdcard/tencent/MobileQQ/"+QQ+"/ptt/"+date1+"/"+date2+"/1.mp3",a);
 //  toastLog(path+"1.mp3");
   
  files.rename(path + "1.mp3", fileName[0]) //更名，让QQ发送替换后的音频文件
 
    var fileName1 = files.listDir(path);
 // toastLog(fileName1[0])
 id("input").findOne().setText("");
  click("发送");
    toast("成功");
   key=1;
}

}
