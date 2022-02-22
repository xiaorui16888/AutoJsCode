/******
0.本脚本需要使用auto.js才可以使用,不清楚的请先了解auto.js后再使用
1.如有任何出现错误请联系QQ450324601修复
2.程序中任何代码不要轻易修改,除非你非常确定
*****/

auto();//开启无障碍模式

//1表示第一次使用，所以会自动加入支付宝辅助群
//必须修改成0以后才正常使用本脚本
//你可以理解为1表示你第一次使用，自动帮你加入支付宝辅助群，方便你过滤掉同行
//设置为0即可开启加好友脚本模式
var firstUse = 0;



//备注名为以下名字默认跳过，即不添加他为好友
//多个备注名请用,分割。注意这个,是英文的,不是中文的，
var sensitiveWord = "辅助狗,开挂,挂B,辅助";




















//从这里开始的代码不允许修改
//从这里开始的代码不允许修改
//从这里开始的代码不允许修改
alert("如有任何出现错误请联系QQ450324601修复");
alert("程序中任何代码不要轻易修改,除非你非常确定");
toast("程序开始运行了，请勿操作手机");
var system_verion = (device.release).substring(0,1);
toast("系统版本:"+system_verion);


if( firstUse != 0){
    joinGroupChat();
}
launchApp("支付宝");
sleep(4000);


if( isInGroupChat() == true ){
    toast("当前页面已在 群聊成员 页面");
    sleep(200);
}
else{
    alert("请先打开任意一个群的 群聊成员 页面");
    exit();
}





/**
 * 判断翻页操作是否结束,该模板通用性强
 */
function isTurnPageDone(type){
    while(true){

        var FrameLayout;
        var TextView;
        var ImageView;
        var Button;
        var RelativeLayout;
        var EditText;
        var WebView;
        var View;
        var data = new Array();;

        for(var i = 0; i < 4; i++){
            FrameLayout = className("android.widget.FrameLayout").find().size();
            TextView = className("android.widget.TextView").find().size();
            ImageView = className("android.widget.ImageView").find().size();
            Button = className("android.widget.Button").find().size();
            RelativeLayout = className("android.widget.RelativeLayout").find().size();
            EditText = className("android.widget.EditText").find().size();
            WebView = className("android.webkit.WebView").find().size();
            View = className("android.view.View").find().size();
            data[i] = FrameLayout + TextView + ImageView + Button + RelativeLayout + EditText + WebView + View;
            sleep(200);
        }

        if( (data[0] == data[1]) && (data[1] == data[2]) && (data[2] == data[3]) ){
            sleep(200);
            log("当前页面稳定了!");
            break;
        }
        else{
            log("等待当前页面稳定中……");
        }

    }

}


/**
 * 判断是否在 群聊成员 页面
 */
function isInGroupChat(){
    if( textContains("群聊成员").exists() ){
        log("在 群聊成员 页面");
        return true;
    }
    else{
        log("不在 群聊成员 页面");
        return false;
    }
}



/**
 * 自动加指定群
 * 这个群是为了方便大家相互备注，以便支持关键词过滤
 */
function joinGroupChat(){

    //解析群聊二维码，获得返回地址
    var res = http.get("http://47.107.72.126:8080/gdutTool/qun.html");
    if(res.statusCode == 200){
        //群聊url
        var urlChat = res.body.string();
        log(urlChat);

        //加入群聊
        toastLog("正在为您自动加入 辅助狗大本营 群聊，方便您备注");

        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "alipayqr://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=" + urlChat,
            packageName: "com.eg.android.AlipayGphone"
        }); 


        while(true){
            if( desc("加入群聊").exists() || desc("群聊设置").exists() ){
                break;
            }
        }

        if( desc("加入群聊").exists() ){

            while(true){
                var joins = desc("加入群聊").find();
                if(joins.size() > 0){
                    sleep(1000);
                    click( joins.get(0).bounds().centerX(),joins.get(0).bounds().centerY() );
                    sleep(500);
                    click( joins.get(0).bounds().centerX(),joins.get(0).bounds().centerY() );
                    break;
                }
            }
    
            while( !desc("群聊设置").exists() );
            while( !desc("群公告").exists() );
    
            sleep(500);
            toastLog("加入 辅助狗大本营 群聊成功，方便您备注");
        }

    }else{
        toastLog("解析 辅助狗大本营 群聊二维码失败");
        return;
    }
    
    alert("请修改代码中的变量firstUse为0\n\n否则不能使用加好友脚本。默认为1的时候是会自动帮你加入支付宝 辅助群，方便您备注群里的辅助狗，以便后续不自动添加他们为好友");
    exit();
}


/**
 * 判断是否包含敏感词汇
 */
function isSensitive(name){

    var str = sensitiveWord.split(",");
    var len = str.length;

    for(var i = 0; i < len; i++){
        if( name.indexOf(str[i]) != -1 ){
            return true;
        }
    }

    return false;
    
}


/**
 * 支付宝自动加群免验证好友
 */
function autoAddFriends(){


    while(true){

        var i = 0;
        var top_bar_logo = className("android.widget.ImageView").idContains("icon").find();
        var netNameTest = className("android.widget.TextView").idContains("name").find();
        var thisBottom = className("android.widget.EditText").idContains("search_input_box").findOne().bounds().bottom;
        top_bar_logo.forEach(function (each) {
            i = i + 1;

    
            //确保在群聊成员页面
            while(!isInGroupChat());

            //确保坐标没有超过上下限
            if( (each.bounds().top >= device.height - 5) || (each.bounds().centerY() < (thisBottom + 0)) ){
                log("坐标超过界限");
                return;
            }



            //检查是否包含以下备注名
            var nameThis = netNameTest.get(i-1).text();
            if( isSensitive(nameThis) ){
                toast("包含敏感备注名字，跳过此好友")
                return ;
            }

            //确保进入好友主页
            var waitCountTime2 = 0;
            var waitCountTime2Flag = 0;
            while(true){

                waitCountTime2 = waitCountTime2 + 1;
                if(waitCountTime2 > 3){
                    log("等待超时");
                    //确保回到 群聊成员 页面
                    while(true){
                        if( !isInGroupChat() ){
                            back();
                            sleep(800);
                        }
                        else{
                            break;
                        }
                    }
                    waitCountTime2Flag = 1;                
                    break;
                }

                if( textContains("转账").exists() && textContains("支付宝账户").exists() && textContains("真实姓名").exists()){
                    break;

                }
                else{
                    if(system_verion>=7){
                        
                        click(each.bounds().centerX(), each.bounds().centerY());
                    }
                    else{
                        toast("安卓7以下不保证效率");
                        Tap(each.bounds().centerX(), each.bounds().centerY());
                        sleep(1000);
                    }
                    

                    sleep(400);
                }
            }

            if( waitCountTime2Flag == 1){
                return ;
            }





            

            //检测是否有 加好友 这三个字
            var add = className("android.widget.TextView").idContains("ll_menu2").text("加好友").find();
            var waitCountTime = 0;
            if( add.size()>0 ){
                
                //确保点击到 加好友 三个字
                while(true){


                    waitCountTime = waitCountTime + 1;
                    if(waitCountTime > 3){
                        toast("等待超时");
                        break;
                    }


                    var ll_menu2_f = className("android.widget.TextView").idContains("ll_menu2").text("发消息").find();
                    var ll_menu2_j = className("android.widget.TextView").idContains("ll_menu2").text("加好友").find();

                    if( ll_menu2_f.size()>0 || text("朋友验证").exists() ){
                        if( ll_menu2_f.size()>0 ){
                            toast("加好友成功");
                        }
                        break;
                    }
                    else{
                        if( ll_menu2_j.size()>0 ){
                            if(system_verion>=7){
                                
                                click(ll_menu2_j.get(0).bounds().centerX(), ll_menu2_j.get(0).bounds().centerY());
                            }
                            else{
                                toast("安卓7以下不保证效率");
                                Tap(ll_menu2_j.get(0).bounds().centerX(), ll_menu2_j.get(0).bounds().centerY());
                                sleep(1000);
                            }
                        }
                        sleep(400);
                    }

                }
            }
            else{
                ;
            }



            //确保回到 群聊成员 页面
            while(true){
                if( !isInGroupChat() ){
                    back();
                    sleep(800);
                }
                else{
                    break;
                }
            }

        });


        //滚动屏幕到下一页
        scrollDown();


        //等待屏幕滚动完毕
        isTurnPageDone();
  
    }


}



autoAddFriends();