"auto";
sleep(3000);
/*
本脚本由“想成为群主却无法成为群主的永火玄冥提供”，
为了让懒人或伸手党“动一动手或脑子”所以划动屏幕将由使用者操作
说了动手，怎么变成动脑子 ~~~ 说了懂脑子，怎么还动手
*/
function 葫芦(){
    var a = ["实用软件","手机美化","玩机广场","玩机教程","原创技术","福利活动","王者荣耀","全军出击",
    "刺激战场","第五人格","荒野行动","QQ飞车","QQ炫舞","模型玩具","穿越火线","迷你世界","自拍","3楼学院","美腿",
    "娱乐天地","3楼游戏","动漫","球球大作战","恶搞","头像签名","我的世界","天天酷跑","英雄联盟","地下城与勇士",
    "虫虫大作战","光荣使命","皇室战争","美食天地","部落冲突","火影忍者","许愿","体验堂","泳池","3楼公告版","意见反馈"]

    for(var i=0; i<a.length; ){
        var b = 签到(a[i]);
        if(b){
            i++;
        }
        if(i%12 == 0){
            toast("请划动");
            sleep(2000);
        }
        sleep(888);
    }
    
}

function 签到(k){
    var d = text(k).findOne(10);
    if(d){
        d.parent().click();
        sleep(500);
        id("btn_signin").findOne().click();
        sleep(500);
        var e = text("确定").findOne(800);
        if(e){
            e.click();
        }
        sleep(500);
        id("topic_back").findOne().click();
        return true;
    }
    return false;
}
launchApp("葫芦侠");
sleep(1000);
id("bbs_place_holder").findOne().click();
葫芦()







