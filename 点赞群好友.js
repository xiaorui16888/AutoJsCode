"auto";
var idid = [];
var zhh = "我们不一样(6666666666)";//改成自己在群里的ID和QQ号，点到自己就不会卡住了
var o = 0;
var t = 0;
function 个人(){//返回界面上群友个数
    return desc("删除").untilFind();
}
function 记录(){
    return id("info").findOne(5000).text();
}
function 识别(){
    for(var i=0; i<o; i++ ){
        if(id("info").findOne(5000).text()==idid[i]||id("info").findOne(5000).text()==zhh){
            toast("赞过");
            return 1;
        }
    }
    return 0;
}
function 赞(){
    if(descEndsWith("赞").findOne(5000)){
        for(var i=0; i<10; i++){
            descEndsWith("赞").findOne(100).click();
            sleep(100);
        }
    }
    idid[o] = 记录();
    if(o>30){
        o = 0;
    }else{
        o++;
    }
    t++;
}
function 等级(j){
    var wb = 个人().get(j).parent().child(0).child(2).child(0);
    return wb.text();
}
function 滑动(){
    scrollDown();
}
function 遍历(){
    var n = 个人().size();//在界面找到多少个群友，下面就循环多少次
    for(var i=0; i<n; i++){
        if(等级(i)!="LV11"){
            个人().get(i).parent().click();//依次点击相应的群友
            sleep(1600);
            if(识别()==0){
                赞();
            }
            //赞();
            sleep(1600);
            text("返回").findOne().click();//点完赞就退出
        }
        sleep(1800);
        if(t%19==0){
            sleep(5000);
        }
    }
    sleep(1000);
    滑动();
    sleep(2000);
}

sleep(3000);

//toast(个人().size());
for(;;){
    遍历();
}
//赞();
//toast(记录().text());












