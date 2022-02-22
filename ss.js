auto

events.observeKey();
    
launchApp("QQ");
sleep(2000);

while(true){
    if(currentPackage() == 'com.tencent.mobileqq'){
 click(940, 1560);
    }
    sleep(200);
}
