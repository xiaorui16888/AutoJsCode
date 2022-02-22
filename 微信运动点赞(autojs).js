//微信6.5.13 微信运动点赞
"auto";
//===========微信版本不同id不同===用了四个id==//
a我的名次id = "asz";
a排行榜id = "asu"
a红心灰心id = "asx";
a邀请朋友id = "asm";
//=======================================//
x = 1080;
y = 1920;
//===========开始//============微信打开到点赞页即可=======//
//launchApp("微信");
var result = shell("am start -n com.tencent.mm/com.tencent.mm.plugin.exdevice.ui.ExdeviceRankInfoUI --ez key_is_latest true --ei device_type 1 --ez key_only_show_latest_rank true --es app_username '微信运动' --es rank_id '#'", true);
//log(result);
openConsole();
if (result.code == 0) {
    toast("开启微信运动成功");
} else {
    toast("执行失败！请手动开启微信运动");
    sleep(3000);
}
sleep(4000);
id我的名次 = id(a我的名次id).findOne(); //第n名
str我的名次 = id我的名次.text();
int我的名次 = Number(str我的名次.toString().match(/\d{1,3}/));
toast("开始点赞");

while (1) {排行榜 = id(a排行榜id).find(); //排行榜的名次id
    排行榜.each(function(o) {
        if (o.text() != "" && (parseInt(o.text()) != int我的名次) && (parseInt(o.text()) < 35)) 
       {
          点赞 = o.parent().parent().parent().findOne(id(a红心灰心id)); //点赞红心id
          点赞.click();
        }
    });

    sleep(1000);
    if (id(a邀请朋友id).text("邀请朋友").exists()) { //最下面的字邀请朋友的id
        toast("点赞完成");
        break;
    }
    Swipe(x / 2, y - 200, x / 2, y / 3.2, 1500);
    sleep(3000);
}