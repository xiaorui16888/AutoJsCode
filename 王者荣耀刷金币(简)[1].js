"auto";
coin = 56;  //稷下战场金币

var msg, num = 0;
if (!requestScreenCapture(true)) {
    toast("请求截图失败");
    exit();
}
toast("手动一把冒险");
var w = floaty.window(
    <frame>
        <text id="text" textColor="#000000"></text>
    </frame>
);
var msg = "次数:" + num + "      " + " 金币:" + coin * num;
num++;
toast(msg);
ui.run(function () {
    w.text.setText(msg);
});
w.setPosition(1650, 100);
w.setSize(280, 220);
findauto();
function findauto() {
    while (true) {
        sleep(500);
        if (images.detectsColor(captureScreen(), "#1083ac", 1792, 56)) {//找到自动
            press(1792, 56, 500);
        }
        else if (images.detectsColor(captureScreen(), "#f1f6f9", 1779, 60, threshold = 16, algorithm = "diff")) {//相似找色，找到跳过
            press(1850, 95, 200);
        }
        else if (images.detectsColor(captureScreen(), "#06161f", 1700, 1000)) {//点击屏幕继续
            click(1700, 1000);    //点击屏幕继续
            sleep(1000);
        }
        else if (images.detectsColor(captureScreen(), "#d6821e", 1700, 1000)) {//找到再次挑战
            sleep(1700);
            //images.detectsColor(captureScreen(), "#eeecce", 1490, 605, threshold = 16, algorithm = "diff")
            if (images.detectsColor(captureScreen(), "#DBEBF2", 1673, 609, threshold = 16, algorithm = "diff")) {     //查看金币
                toast("金币已满");
                log("金币已满");
                exit();
            }
            else {
                var msg = "次数:" + num + "      " + " 金币:" + coin * num;
                num++;
                toast(msg);
                log(msg);
                ui.run(function () {
                    w.text.setText(msg);
                });
                click(1700, 1000);
            }
        }
        else if (images.detectsColor(captureScreen(), "#e7a025", 1460, 920)) {//找到闯关
            click(1460, 920);    //闯关
        }
    }
}