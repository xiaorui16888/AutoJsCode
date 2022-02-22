toast("在设置里开启auto.js的无障碍（辅助功能）")
auto.waitFor();
launchApp("VirtualXposed")
click(className("android.widget.TextView").desc("设置").findOne().click())
sleep(2000)
dialogs.alert("点击添加应用")
sleep(2000)
dialogs.alert("找到微信并打勾，我设置了10秒时间去找")
sleep(10000)
confirm("找到微信就点确定").then(value=>{text = 安装 (1).findOne.().click()
    //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
});