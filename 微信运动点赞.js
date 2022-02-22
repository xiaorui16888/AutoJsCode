//微信运动 autojs3.0 稳定模式
var h ="com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI";
launchApp("微信");
waitForPackage("com.tencent.mm");
click(800,100)
sleep(1000)
setText("微信运动")
sleep(1500)
click("微信运动");
click("步数排行榜")

toast("请打开微信运动");
sleep(2000);
waitForActivity(h);
sleep(2000);

mc=textMatches("第\\d+名").find();
if(mc.empty()){
toastLog("又失效了");
exit();
}
m=mc[0].text().replace(/[^0-9]/ig,"");//名次
toast(mc[0].text());

do{ 
aa=className("android.widget.RelativeLayout").clickable().find();

aa.each(function(o){
if(o.parent()!=null) {
a=textMatches("第\\d+名");

if(a!=null)xxx= o.parent().find(a);
xxc=o.parent().find(text(m));
}
r=o.bounds();
h=r.centerY();
w=r.centerX();
if(w > device.width*3/4){
if(xxx!=null){if(xxx.empty()&&xxc.empty())
o.click();
else if(!xxc.empty()){
if(xxc[0].bounds().centerX()==w)
o.click();}

}
} 
});
sleep(100);
className("android.widget.ListView").scrollForward(); 
}
while(text("邀请朋友").find().empty());

back()
//微信运动 autojs3.0 稳定模式
var h ="com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI";
launchApp("微信");
waitForPackage("com.tencent.mm");
click("微信运动");
click("步数排行榜")

toast("请打开微信运动");
sleep(2000);
waitForActivity(h);
sleep(2000);

mc=textMatches("第\\d+名").find();
if(mc.empty()){
toastLog("又失效了");
exit();
}
m=mc[0].text().replace(/[^0-9]/ig,"");//名次
toast(mc[0].text());

do{ 
aa=className("android.widget.RelativeLayout").clickable().find();

aa.each(function(o){
if(o.parent()!=null) {
a=textMatches("第\\d+名");

if(a!=null)xxx= o.parent().find(a);
xxc=o.parent().find(text(m));
}
r=o.bounds();
h=r.centerY();
w=r.centerX();
if(w > device.width*3/4){
if(xxx!=null){if(xxx.empty()&&xxc.empty())
o.click();
else if(!xxc.empty()){
if(xxc[0].bounds().centerX()==w)
o.click();}

}
} 
});
sleep(100);
className("android.widget.ListView").scrollForward(); 
}
while(text("邀请朋友").find().empty());
back()

//微信运动 autojs3.0 稳定模式
var h ="com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI";
launchApp("微信");
waitForPackage("com.tencent.mm");
click("微信运动");
click("步数排行榜")

toast("请打开微信运动");
sleep(2000);
waitForActivity(h);
sleep(2000);

mc=textMatches("第\\d+名").find();
if(mc.empty()){
toastLog("又失效了");
exit();
}
m=mc[0].text().replace(/[^0-9]/ig,"");//名次
toast(mc[0].text());

do{ 
aa=className("android.widget.RelativeLayout").clickable().find();

aa.each(function(o){
if(o.parent()!=null) {
a=textMatches("第\\d+名");

if(a!=null)xxx= o.parent().find(a);
xxc=o.parent().find(text(m));
}
r=o.bounds();
h=r.centerY();
w=r.centerX();
if(w > device.width*3/4){
if(xxx!=null){if(xxx.empty()&&xxc.empty())
o.click();
else if(!xxc.empty()){
if(xxc[0].bounds().centerX()==w)
o.click();}

}
} 
});
sleep(100);
className("android.widget.ListView").scrollForward(); 
}
while(text("邀请朋友").find().empty());
back()
//微信运动 autojs3.0 稳定模式
var h ="com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI";
launchApp("微信");
waitForPackage("com.tencent.mm");
click("微信运动");
click("步数排行榜")

toast("请打开微信运动");
sleep(2000);
waitForActivity(h);
sleep(2000);

mc=textMatches("第\\d+名").find();
if(mc.empty()){
toastLog("又失效了");
exit();
}
m=mc[0].text().replace(/[^0-9]/ig,"");//名次
toast(mc[0].text());

do{ 
aa=className("android.widget.RelativeLayout").clickable().find();

aa.each(function(o){
if(o.parent()!=null) {
a=textMatches("第\\d+名");

if(a!=null)xxx= o.parent().find(a);
xxc=o.parent().find(text(m));
}
r=o.bounds();
h=r.centerY();
w=r.centerX();
if(w > device.width*3/4){
if(xxx!=null){if(xxx.empty()&&xxc.empty())
o.click();
else if(!xxc.empty()){
if(xxc[0].bounds().centerX()==w)
o.click();}

}
} 
});
sleep(100);
className("android.widget.ListView").scrollForward(); 
}
while(text("邀请朋友").find().empty());

toast("完成");