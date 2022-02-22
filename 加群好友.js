auto();
toast("开始")
console.log("开始")
sleep(1000)
var 招呼内容 = rawInput("请输入打招呼内容");
dianjitongxunlu();
var device_width = device.width
var device_height = device.height
var window = floaty.window(
    <horizontal>
        <button id="action" textSize="15sp" text="开始" w="40" h="40"  bg="#77000000"/>
        <button marginLeft="15" textSize="15sp" id="exit" text="退出" w="40"  h="40"  bg="#77000000"/>
    </horizontal>
    
    
    
);
 
window.exitOnClose();
window.setPosition(device_width*0.5-160,-50);
var execution = null;

window.action.click(()=>{
    if(window.action.getText() == '开始运行'){
        window.action.setText('停止运行');
        var thread=threads.start(function() {
            jiaqunhaoyou();
        })
    }else{
        threads.shutDownAll()
        window.action.setText('开始运行');
    }
});
window.exit.click(()=>{
    "ui";
    //回调形式
    confirm("确认退出?","确认退出?", function(exit_check){
        if(exit_check){
            toast("退出软件")
        exit()
        }
    });
});

window.action.longClick(()=>{
   window.setAdjustEnabled(!window.isAdjustEnabled());
   return true;
});

setInterval(()=>{}, 1000);
//打开群聊列表
function dianjitongxunlu(){
    //打开微信
    app.launchApp("微信");
    toast("正在打开微信，请稍后")
    sleep(3000)
    //点击通讯录
    toast("请打开微信主页面")
    sleep(3000)
    var tongxunlu_bounds = className("android.widget.TextView").text("通讯录").findOne().bounds();
    click(tongxunlu_bounds.centerX(), tongxunlu_bounds.centerY())
    toast("点击通讯录")
    sleep(1000);
    //点击群聊
    var qunliao_bounds = className("android.widget.TextView").text("群聊").findOne().bounds();
    click(qunliao_bounds.centerX(), qunliao_bounds.centerY())
    toast("进入群聊列表")
    sleep(1000);
    toast("请选择打开一个群聊之后点击开始")
}
function jiaqunhaoyou(){
    // toast("请在群成员列表打开此功能")
    console.log("开始")
    sleep(1000)
    // var sandian_btn = id("jy").findOne().bounds();
    // click(sandian_btn.centerX(), sandian_btn.centerY())
    click(device_width*0.9, device_height*0.07)
    sleep(1000);
    //xunhuandianji_noquanbu()
    var shifouquanbu=check_renshu();
    if(shifouquanbu==true){
        
        xunhuandianji_quanbu(1)
    }else{
        xunhuandianji_noquanbu()
        }
    return true
    //var aaa=id("e4_").findOne();
    //var target_btn= aaa.bounds();
      //  click(target_btn.centerX(), target_btn.centerY())
      //  return false;
      /*var c = id("e0h").find();
if(!c.empty()){
    toast("找到啦");
    
}else{
    toast("没找到╭(╯^╰)╮");
}*/


    
}
function check_renshu(){
    swipe(device_width * 0.5, device_height * 0.8, device_width * 0.5, device_height * 0.2, 200)
    sleep(1500)
    
    //var chakansuoyou=id("title").findOne(1000);
    var chakansuoyou=text("查看全部群成员").findOne(1000);
   
    if(chakansuoyou!=null){
        
        var target_btn= chakansuoyou.bounds();
        //toast(target_btn.centerX())
        click(target_btn.centerX(), target_btn.centerY())
        sleep(1000)
        return true;
        
    }else{
        
    }
}
function xunhuandianji_quanbu(is_jixu){
    if(is_jixu==0){
        toast("结束");
        return false;
    }
    if(is_jixu==2){
        swipe(device_width * 0.5, device_height * 0.8, device_width * 0.5, device_height * 0.2, 1000)
    }
    if(is_jixu==1){
        swipe(device_width * 0.5, device_height * 0.2, device_width * 0.5, device_height * 0.7, 700)
        sleep(1000)
    }
    
    id("e4_").findOne().children().forEach(child => {
        var target = child;
        var target_btn= target.bounds();
        //toast(target_btn.centerX())
        click(target_btn.centerX(), target_btn.centerY())
        //target.click();
        sleep(1000)
        //判断是否结束
        var yqr_btn=text("选择联系人").findOne(1000);
        if(yqr_btn!=null){
            toast("结束")
            //结束一个群
            jieshuyigequn_4();
        }else{
            var anniuwenzi=id("cs").findOne().text();
            toast(anniuwenzi) 
            if(anniuwenzi=="添加到通讯录"){
                var tj_btn = id("cs").findOne().bounds();
                click(tj_btn.centerX(), tj_btn.centerY())
                //有可能出现无需验证即可添加好友的情况
                sleep(1000)
                if(text("发消息").exists()){
                    console.log("直接添加好友");
                    sleep(1000)
                    back();
                    //有可能出现用户设置不可添加的情况
                }else if(text("确定").exists()){
                    console.log("不可添加");
                    sleep(1000)
                    back();
                }else{
                    id("e0o").setText(招呼内容)
                    sleep(750)
                    id("jx").findOne().click();
                }
            }
            sleep(1500)
            back();
            sleep(1000)
        }
        
        
    });
    var tqr_btn=id("auo").findOnce();
}
function xunhuandianji_noquanbu(){ 
    swipe(device_width * 0.5, device_height * 0.2, device_width * 0.5, device_height * 0.8, 700)
    sleep(1000)
    id("e0h").find().forEach(child => {
        var target = child;
        var target_btn= target.bounds();
        // toast(target_btn.centerX())
        click(target_btn.centerX(), target_btn.centerY())
        sleep(1000)
        
        var anniuwenzi=id("cs").findOne().text();
        // toast(anniuwenzi)
        if(anniuwenzi=="添加到通讯录"){
            var tj_btn = id("cs").findOne().bounds();
            click(tj_btn.centerX(), tj_btn.centerY())
            id("e0o").setText(招呼内容)
            sleep(750)
            id("jx").findOne().click();
        
        }
        sleep(1500)
        back();
        sleep(1000)
    });
    //添加完成之后返回
    toast("该群添加完成")
    jieshuyigequn_2()
    打开群聊列表_已开微信()
    threads.shutDownAll()
    console.log("结束")
    window.action.setText('开始运行');
    
}
function 打开群聊列表_已开微信(){
    sleep(3000)
    var tongxunlu_bounds = className("android.widget.TextView").text("通讯录").findOne().bounds();
    click(tongxunlu_bounds.centerX(), tongxunlu_bounds.centerY())
    toast("点击通讯录")
    sleep(1000);
    //点击群聊
    var qunliao_bounds = className("android.widget.TextView").text("群聊").findOne().bounds();
    click(qunliao_bounds.centerX(), qunliao_bounds.centerY())
    toast("进入群聊列表")
    sleep(1000);
    toast("请选择打开一个群聊之后点击开始")
}
function jieshuyigequn_2(){
    back();
    sleep(1000)
    back();
    sleep(1000)
}
function jieshuyigequn_4(){
    back();
    sleep(1000)
    back();
    sleep(1000)
    back();
    sleep(1000)
    back();
    sleep(1000)
}