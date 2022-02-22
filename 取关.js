toast("请打开微信并进入公众号界面")
waitForActivity("com.tencent.mm.plugin.brandservice.ui.BrandServiceIndexUI");
toast("开始进行！")
while (isCurrent()) {
var i = getFirstItem();
if (i == null) break;
i.longClick();
sleep(500);
click("取消关注");
sleep(500);
click("不再关注");
sleep(100);
click("不再关注");
}
if (isCurrent()) toast("公众号已全部扫净！");
else toast("操作已停止");

function isCurrent() {

return currentActivity() == "com.tencent.mm.plugin.brandservice.ui.BrandServiceIndexUI";

}

function getFirstItem() {
var views = className("ListView").findOne().children();
if (views.size() > 1) return views.get(0);
else return null;
}