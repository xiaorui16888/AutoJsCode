var qq群引流脚本 = {}
qq群引流脚本.yun = (function() {
            console.show()
            alert("定制脚本＋q:2196815716")
            var a = dialogs.input("群里面大概有多少人", 0)
            var c = 1
            a = a * 1.1
            if (!a) {
                toastLog("请输入大于0的数字")
                exit()
            }
            if (!requestScreenCapture()) {
                toastLog("请求截图失败");
                exit();
            }
            launchApp("QQ");
            toastLog("请打开需要引流的群的成员列表")
            id("name").className("android.widget.TextView").text("默认排序").waitFor()
            toastLog("等待成员列表加载")
            id("name").className("android.widget.TextView").text("搜索").waitFor()
            toastLog("成员列表加载完毕，开始引流")
            for (var b = 0; a > b;) {
                toastLog("随机休眠3～10秒")
                sleep(random(3000, 10000))
                toastLog("休眠完毕")
                var img = captureScreen();
                var point = findColor(img, "#ff8ebdfa");
                if (point) {
                    toastLog("准备点击群成员")
                    click(point.x, point.y);
                    toastLog("点击完毕")
                } else {
                    toastLog("无符合要求群成员，等待下一次操作")
                    swipe(800, 920, 987, 737, 300)
                    continue;
                }
                id("txt").className("android.widget.Button").text("发消息").waitFor()
                if (id("txt").className("android.widget.Button").text("加好友").exists()) {
                    id("txt").className("android.widget.Button").text("加好友").findOne().click()
                    sleep(random(1000, 2000))
                } else {
                    toastLog("已经是好友")
                    back()
                    continue;
                }
                if (text("无法添加").exists()) {
                    toastLog("无法添加，对方账号异常")
                    back()
                    id("txt").className("android.widget.Button").text("发消息").waitFor()
                    back()
                    sleep(800)
                    swipe(800, 920, 987, 737, 300)
                    continue;
                } else {
                    toastLog("对方账号未异常，等待申请好友页面")
                    id("name").className("android.widget.TextView").text("设置备注和分组").waitFor()
                    sleep(random(300, 500))
                    if (id("name").className("android.widget.EditText").text("输入答案").exists()) {
                        toastLog("需要问题验证")
                        text("取消").findOne().click()
                        id("txt").className("android.widget.Button").text("发消息").waitFor()
                        back()
                        sleep(800)
                        swipe(800, 920, 987, 737, 300)
                        continue;
                    } else {

                        text("发送").findOne().click()
                        sleep(1000)
                        if (id("name").className("android.widget.TextView").text("添加失败，请勿频繁操作").exists()) {
                            toastLog("操作频繁")
                            back()
                            sleep(500)
                            back()
                            id("txt").className("android.widget.Button").text("发消息").waitFor()
                            back()
                            sleep(800)
                            swipe(800, 920, 987, 737, 300)
                            continue;
                        } else {
                            toastLog("申请好友成功")
                            id("txt").className("android.widget.Button").text("发消息").waitFor()
                            back()
                            sleep(800)
                            swipe(800, 920, 987, 737, 300)
                            b++
                        }
                    }

                }
                if (b == c * 7) {
                    toastLog("随机停止20-50s，防止腾讯封号")
                    sleep(random(20000, 50000))
                    c++
                }
                toastLog("进入下一次操作")
            }
            toastLog("引流完成")
        })
        module.exports = qq群引流脚本;