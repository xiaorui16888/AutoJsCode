"auto";
waitForActivity("com.songheng.eastfirst.common.view.activity.MainActivity");
var max=dialogs.input("大约刷多少分钟",20);
var t=0;
var w=device.width,h=device.height;
var donot_read_id=["a4o","q5","a97"];//a4o是视频,后面的是广告图片id
function cha(){if(currentPackage()!="com.songheng.eastnews"){toast("结束"); exit();}}
function dismiss_push(){if(click("忽  略"))sleep(500);}

function can_read(item){ 
    if(item==null)return false;
    /*for(var i=0;i<donot_read_id.length;i++){
        if(item.find(id(donot_read_id[i])).size()!=0)return false;
    }*/
    //h6是叉叉的id
    if(item.find(id("h6")).size()==0)return false;   
    if(item.find(text("专题")).size()!=0)return false;
    return true;
}

while(t<1.6*max){
    sleep(600);
    dismiss_push();
    id("km").findOne().click(); 
    sleep(random(2500,3500));
    var list=className("android.support.v7.widget.RecyclerView").find();
    if(list.length<2)continue;
    list=list.get(1);

    for(var i=1;i<list.childCount();i++){
        dismiss_push();
        var item=list.child(i);
        if(!can_read(item))continue;
        sleep(400);
        dismiss_push();
        item.click();
        sleep(500);
        if(currentActivity()=="com.songheng.eastfirst.common.view.activity.MainActivity")continue;
        if(currentActivity()!="com.songheng.eastfirst.business.newsdetail.view.activity.NewsDetailH5Activity"){sleep(1000);back();sleep(400);continue;}
        var stimes=random(7,8);
        for(var j=0;j<stimes;j++){
            click("点击查看全文");
            sleep(random(1000,3000));
            cha();
            dismiss_push();
            swipe(w/2+random(5,15),h*0.6+random(10,20),w/2+random(8,15),h*0.2+random(10,20),random(600,800));
            sleep(random(600,1800));
        }
        
        cha();
        dismiss_push();
        back();
        t++;
        if(t%13==7)sleep(random(5000,8000));
        sleep(400);
    }
    sleep(800);
    dismiss_push();
    list.scrollForward();
    sleep(1000);
    var list=className("android.support.v7.widget.RecyclerView").find();
    if(list.length<2)continue;
    list=list.get(1);

    for(var i=1;i<list.childCount();i++){
        dismiss_push();
        var item=list.child(i);
        if(!can_read(item))continue;
        sleep(400);
        dismiss_push();
        item.click();
        sleep(500);
        if(currentActivity()=="com.songheng.eastfirst.common.view.activity.MainActivity")continue;
        if(currentActivity()!="com.songheng.eastfirst.business.newsdetail.view.activity.NewsDetailH5Activity"){sleep(1000);back();sleep(400);continue;}
        var stimes=random(7,8);
        for(var j=0;j<stimes;j++){
            click("点击查看全文");
            sleep(random(1000,3000));
            cha();
            dismiss_push();
            swipe(w/2+random(5,15),h*0.6+random(10,20),w/2+random(8,15),h*0.2+random(10,20),random(600,800));
            sleep(random(600,1800));
        }
        
        cha();
        dismiss_push();
        back();
        t++;
        if(t%13==7)sleep(random(5000,8000));
        sleep(400);
    }
    sleep(1000);  
}