"auto";
sleep(5000);

threads.start(function(){ 
    for(;;){
        text("删除该聊天").findOne().click();
    }
});
threads.start(function(){ 
    for(;;){
        text("删除").findOne().click();
    }
});

for(;;){
    id("apv").findOne().longClick();
    sleep(300);
}
