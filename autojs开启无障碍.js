"auto"
for (var i=2; i>0; i--) {
var r=shell("settings get secure enabled_accessibility_services",true)
if (r.toString().includes("autojs")==false) {
    setClip(r.toString())
    var s=r.toString().match(/result='(.*)/)[1]
    shell("settings put secure enabled_accessibility_services "+s+":org.autojs.autojs/org.autojs.autojs.accessibility.AccessibilityService",true);
    shell("settings put secure accessibility_enabled 1",true)
    if (i==2) 
      toast("再次确认！");
    else 
      toast("这就尴尬了！你自己想办法搞吧！");
}else{
    toast("auto.js无障碍服务已开启!");
    break;
}
}