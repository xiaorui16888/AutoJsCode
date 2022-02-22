//这个脚本在你自己发布帖子以后
//在自己帖子页面执行脚本
//基本能秒回复170楼层才会提示操作频繁
//虽然提示操作频繁了，但是能把广告刷上搜索关键词首页



//支付宝红包必备
"auto"
var array = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m"]
while (true) {

    className("android.widget.TextView").id("pb_editor_tool_comment_reply_text").text("回复楼主").findOne().parent().click()
    sleep(random(100, 500))
    setText(array[random(1, 24)])
    sleep(random(10, 500))
    click("发表")
}