auto("fast");
console.show();
//文件路径 并打开文本
var f = open("/sdcard/tencent/QQfile_recv/qq.txt", "r", "gbk");
//读取文本全部内容
text = f.readlines();
toast("请打开一个聊天窗口");
var ii=0;
while(true){
    log (ii);
    waitForActivity( "com.tencent.mobileqq.activity.SplashActivity", [period = 10]);
    var wb=random(0, 560);
    setText(text[wb]);
    while(!click("发送"));
    ii++;
}




