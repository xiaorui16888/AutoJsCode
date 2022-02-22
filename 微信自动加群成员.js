"auto"


{//打开微信，进入群聊
lunchapp("微信")
var q = confirm("请进入到群的聊天界面")
toast("6秒后开始加好友")
sleep(6000)
//打开成员列表
click(960, 100)
sleep(2000)
click("查看全部群成员")
sleep(2000)
//第一个坐标
var x = 87 
var y = 398
//跳到第几个开始
var num1 = dialogs.rawInput("输入从第几个开始加", "1")
toast("上限第40个")
sleep(1000)
}
while (true) {
    //到第x个坐标体系
    if (5 < num1 && num1 < 36) {
        y += 201
    }
    if (0 < num1 && num1 < 6) {
        x += 195 * num1
    }
    if (5 < num1 && num1 < 11) {
        x += 195 * (num1 - 5)
    }
    if (10 < num1 && num1 < 16) {
        x += 195 * (num1 - 10)
    }
    if (15 < num1 && num1 < 21) {
        x += 195 * (num1 - 15)
    }
    if (20 < num1 && num1 < 36) {
        x += 195 * (num1 - 20)
    }
    if (35 < num1 && num1 < 41) {
        x += 195 * (num1 - 35)
    }
    //添加好友流程
    var num1 = 0
    click(x, y)
    if (click(x, y)) {
        sleep(2000)
        click("添加到通讯录")
        sleep(500)
        click("发送")
        sleep(2500)
        click("确定")
        back()
        sleep(1000)
        x += 195
    }
    //切换到下一行
    if (x > 1062) {
        y += 225
        var x = 87
        sleep(1000)
    }
    //下滑
    if (y > 1973) {
        var y = 398
        swipe(538,1949,538,323,4000)
        var x = 87
        }
}