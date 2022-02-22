auto.waitFor();
//橘猫领支付宝积分，肯定不适配
app.launchPackage("com.eg.android.AlipayGphone");

desc("通讯录").waitFor();
className("Button").depth(20).findOne().click();
text("搜索").waitFor();
sleep(1000);
setText("支付宝会员");
sleep(200);
back();
className("android.widget.ImageView").depth(16).waitFor();
click(300, 500);//点击第一个选项
desc("领积分").findOne().click();
desc("领取任务").waitFor();
sleep(660);
var z1 = desc("+1").find();
log(z1.length);
z1.forEach(child => { //遍历子控件
    child.click();
    sleep(300);
}); //遍历点击
var z2 = desc("+2").find();
log(z2.length);
z2.forEach(child => { //遍历子控件
    child.click();
    sleep(300);
}); //遍历点击
var z7 = desc("+7").find();
log(z7.length);
z7.forEach(child => { //遍历子控件
    child.click();
    sleep(300);
}); //遍历点击
var z10 = desc("+10").find();
log(z10.length);
z7.forEach(child => { //遍历子控件
    child.click();
    sleep(300);
}); //遍历点击
sleep(1500);
recents();
recents();
//app.launchPackage("org.autojs.autojs");