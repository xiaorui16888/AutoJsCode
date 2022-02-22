auto.waitFor();

var w;

var ison=false;
var serviceexe=null;

events.observeKey();
events.onKeyUp("volume_down",function(event){
    try{
        if(ison){
            //log(13);
            if(serviceexe!=null&&serviceexe.getEngine()!=null){
                serviceexe.getEngine().forceStop();
            
                serviceexe=null;
                toast("魔猪休息了");
                ui.run(function(){
                    w.text.setText("魔猪休息中"); 
                });
            }
            ison=false;
        }else{
            //log(14);
            ison=true;
            if(serviceexe==null){
                var type=dialogs.singleChoice("请选择模式",["重复刷当前关卡","自动进入下一关"]);
                
                if(type!=null&&type>=0){
                    serviceexe=engines.execScript("自动刷地下城","autofb("+type+");\n"+autofb.toString());
                    
                    ui.run(function(){ 
                        w.text.setText("魔猪奔跑中"); 
                    });
                }
            }
        }
    }catch(e){
        log(e);
    }
});

w = floaty.window(
    <frame gravity="center">
        <text id="text" textColor="red">魔猪准备就绪</text>
    </frame>
);
w.setPosition(200,60);
w.exitOnClose();

toast("运行成功，请按 【音量下键】 启动/停止 魔猪");

function autofb(type){

if(!images.requestScreenCapture(true)){
    toast("截图权限必须开启，请重新启动!");
    exit();
}
var i20="信息-胜利";
var i21="信息-关卡通过";
var i22="信息-失败";

var a1="按钮-确认";
var a2="按钮-是";
var a3;
if(type==0){
    toast("魔猪启动，重复刷当前关卡");
    a3="按钮-再来一次";
} else if(type==1){
    toast("魔猪启动，自动下一关");
    a3="按钮-下个关卡";
}
var a4="按钮-获得道具";
var a5="按钮-下一层";
var a6="按钮-开始战斗";
//var a7="按钮-复活";
var a8="按钮-否";
var a9="按钮-战斗准备";
var a10="按钮-自动战斗";

var r1="对话-艾琳";
var r2="对话-利比亚";
var r3="对话-杜兰德";
var r4="对话-泰依翰";
var r5="对话-夏依";
var r6="对话-奇怪的少女";
var r7="对话-卡赞";
var r8="对话-黑暗召唤师";
var r9="对话-雷娜";
var r10="对话-埃哈尔";
var r11="对话-丛林之声";

var e1="异常-网络不稳定";

var imgnames=[a1,a2,a3,a4,a5,a6,a8,a9,a10,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,i20,i21,i22];
var imgs=new Array();
var imglen=imgnames.length;
for(var i=0;i<imglen;i++){
    imgs[i]=images.read("./img/"+imgnames[i]+".jpg");
}
var imgsuc=images.read("./img/信息-胜利.jpg");

var xc=device.width/2;
var img;
while(true){
    sleep(1500);
    if("com.com2us.smon.normal.freefull.google.kr.android.common"!=currentPackage()){
        continue;
    }
    try{
        img=captureScreen();
        for(var i=0;i<imglen;i++){
            var p=findImage(img,imgs[i]);
            if(p){
                if(imgnames[i].indexOf("按钮-")==0){
                    if(type==0&&imgnames[i]=="按钮-战斗准备"){
                        if(findImage(img,imgsuc)){
                            if(!dialogs.confirm("满级提醒","有魔灵满级了，是否继续刷?")){
                                exit();
                            }
                        }
                    }
                    click(p.x,p.y);
                }else{
                    click(xc,xc);
                }
                break;
            }
        }
    }catch(e){
        
    }
}

}