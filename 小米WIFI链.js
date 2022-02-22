"auto";

launch("com.xiaomi.wifichain");

sleep(3000);

while (true) {
    className("android.widget.ImageView"). packageName("com.xiaomi.wifichain").click();
    sleep(1000);
    if(id("block_grow_time_tv").className("android.widget.TextView").exists()){ 
    //要支持的动作
    toast("米粒收集完毕");
    sleep(1000);
    engines.stopAllAndToast();//结束所有脚本
    }
    }