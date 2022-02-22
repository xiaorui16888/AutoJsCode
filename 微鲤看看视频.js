auto();
var times=dialogs.input("刷多少视频",60);
sleep(400);
var dw=device.width,dh=device.height;
var tt=0;
while(tt<times){
    var iv_tab=id("iv_tab_2").findOnce();
    if(iv_tab==null)continue;
    iv_tab.parent().click();
    sleep(random(1500,2500));
    var list=id("listview").findOnce();
    if(list==null)continue;
    for(var i=1;i<list.childCount();i++){
        var item=list.child(i);
        if(item==null||item.find(text("广告")).size()!=0)continue;
        if(item.find(id("video_duration")).size()==0)continue;
        if(random()>0.85)continue;
        var itt=sleepTime(parsetime(item.find(id("video_duration")).get(0).text()))
        item.find(id("img_ic_play")).get(0).click();
        //click(device.width/3+random(80,180),item.bounds().top+random(2,10));
        sleep(random(1000,1500));
        click("播放视频");
        sleep(itt*1000);
        back();
        sleep(random(1000,1800));
        tt++;
    }
    sleep(random(1000,2500));
}

function parsetime(stime){
    return parseInt(stime.substring(0,2))*60+parseInt(stime.substring(3));
}
function sleepTime(alltime){
    var qee=random()>0.85?qee=0.2+random()*0.4:1;
    if(alltime<60)return qee*(-(alltime-60)*(alltime-60)/66+55);
    if(alltime<120)return qee*(50+(alltime-60)/3);
    return qee*(random()>0.7?random(70,100):random(60,80));    
}