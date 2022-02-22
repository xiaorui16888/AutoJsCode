//QQ2524329629
var 话术1 = rawInput("请输入第一句话", "小哥哥加QQ聊吗");
var 话术2 = rawInput("请输入第二句话", "🌝");
var 话术3 = rawInput("请输入第三句话", "2524329629");

toastLog(话术1)
toastLog(话术2)
toastLog(话术3)
while (true) {
    开始匹配()
    sleep(5000)
    点表情包()
    //发送语音()
    sleep(5000)
    开始私信()
    sleep(5000)
    setText(话术2)
    id("btn_send").findOne(3000).click()
    sleep(5000)
    setText(话术3)
    id("btn_send").findOne(3000).click()
    toastLog("休息30秒")
    sleep(30000)
    
    back()
}
function 发送语音() {
    var 语音按钮 = id("menu_tab_voice").findOne(1000)
    if (语音按钮 != null) {
        语音按钮.click()
    }
    var 录音 = id("statusIv").findOne(1000)
    if (录音 != null) {
        录音.click()
    }
    media.playMusic("/sdcard/Sounds/soul.mp3");
    sleep(media.getMusicDuration());
    sleep(5000 * random())
    var 停止录音 = id("status_recording").findOne(1000)
    if (停止录音 != null) {
        停止录音.click()
    }
    var 发送录音 = id("confirmIv").findOne(1000)
    if (发送录音 != null) {
        发送录音.click()
    }
}

function 开始私信() {
    setText(话术1)
    sleep(5000)
    if (id("btn_send").exists()) {
        id("btn_send").findOne(3000).click()
    }
}

function 开始匹配() {
    var 匹配按钮 = id("soul_match").findOne(1000)
    if (匹配按钮 != null) {
        匹配按钮.click()
    }
    id("img_hot").untilFind()
}

function 点表情包() {
    var 表情包 = id("img_hot").untilFind()
    toastLog("发现了" + 表情包.length + "个表情包")
    var 随机 = random(0, 表情包.length)
    toastLog("准备点击第" + 随机 + "个表情包")
    if (表情包[随机] != null) {
        表情包[随机].click()
    }
}