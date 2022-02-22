"auto";
var w=device.width;var h=device.height;
var num=dialogs.input("大约刷多少分钟",60);
sleep(300);
waitForActivity("cn.etouch.ecalendar.MainActivity");

function cha(){if(currentPackage()!="cn.weli.story"){toast("脚本结束");exit();}};

function treasure(){
    var is_b=false;
    for(var i=0;i<5;i++){
       if(!text("领金币").find().empty()){click("领金币");is_b=true;break;}
       sleep(300);
       cha();
       swipe(w/2,h*0.75,w/2,h/4,250);
    }
   if(is_b){
       sleep(500);
       id("text_ok").waitFor();
       sleep(300);
       id("text_ok").findOnce().click();
       sleep(500);
   }
   sleep(600);
}

for(var t=0;t<num*1.2;t++){   
    treasure();
    while(!id("rl_bottom_1").findOne().click())sleep(300);
    sleep(450);
    click(w/2,0.28*h);
    sleep(1000);
    if(!id("iv_coin").find().empty()){
      for(var i=0;i<9;i++){
         sleep(random(1000,2000));
         cha();
         swipe(w/2+random(10,20),0.78*h+random(10,20),w/2+random(10,20),h*0.48+20*random(),random(700,1000));
         if(click("展开查看全文")){i=i-4;}    
         sleep(2100);
      } 
    }
    cha();
    back();
    sleep(random(1000,1800));     
}
    

    