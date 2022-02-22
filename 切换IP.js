var intent = new Intent();
intent.setAction("android.settings.AIRPLANE_MODE_SETTINGS"); //系统设置首页,
app.startActivity(intent);
sleep(1500)
click(900,390)
toast("切换IP中，等待10秒，请勿操作屏幕");
sleep(1500)

var i = 0;

setTimeout(function(){
    click(900,390)
    exit();
}, 11 * 1000);

setInterval(function(){
    i++;
    toast(i * 1 + "秒");
}, 1000);


