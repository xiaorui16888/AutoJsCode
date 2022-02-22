
auto.waitFor()
launchApp("惠头条")
//列表下滑
function read() {
className("android.widget.LinearLayout").untilFind().click()
for (var i = 0; i < 6; i++) { //6可以改 这里是30秒 6*5000=30000 即为30秒
scrollDown()
sleep(5000) //自动下滑间隔
toast("这篇文章已阅读 " + 5 * (i + 1) + " 秒")

}
}

for (var i = 0; i < 100; i++) {
read()
back()
toast("已阅读 " + (i + 1) + " 篇文章")
sleep(300)
xh()
sleep(300)
xh()
}