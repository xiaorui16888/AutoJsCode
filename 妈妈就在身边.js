 /*这么臭的代码你看个球*/
 /*功能:让你感到母亲就在身边😂*/
 
    if (device.getBattery() < 30) {
        dialogs.alert("没电了", "电池电量不足30%，必须充电")
    } else {
        dialogs.alert("电量还足，放心用吧", "当前电量为" + device.getBattery())
    }
    if (device.isCharging() == true) {
        dialogs.alert("冲个屁电", "边充边看，是想爆炸死的快么？")
    } else {
        dialogs.alert("不边充电边玩手机的好孩子就是你了!")
    }

    if (device.getBrightness() < 100) {
        dialogs.alert("哎呦", "屏幕这么黑，是要看瞎眼啊？")
    } else {
        dialogs.alert(":-O", "难得听话，屏幕亮点好!")
    }