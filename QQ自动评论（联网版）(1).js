"auto";
function xh() {
    className("AbsListView").scrollForward();
}

function pl() {
    className("android.widget.ImageView").drawingOrder("5").click();
}
function sr() {
a=http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
if ((currentPackage() == 'com.tencent.mobileqq')) {
        setText(a);
        !click("发送");
    }
    else if(!(currentPackage() == 'com.tencent.mobileqq'))
    {
//toast("请打开QQ\n" + a);
}}

while (true) {
    xh();
    sleep(100)
    pl();
    sleep(200);
    sr();
    sleep(100);
    }
    /*
    目前只能识别在QQ这个软件运行，
    不能识别是不是空间界面
    在QQ里面见到文本输入框就疯了等待大神完善！
    */