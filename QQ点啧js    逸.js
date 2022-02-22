"auto";

function 下滑(){
className("AbsListView").scrollable().scrollForward();
}

function 赞(){
className("ImageView").desc("赞").click();
}

function 显示更多(){
for(let i = 0; i < 2;i++){
click("显示更多");
}
}

toast("QQ空间，点击点赞说说");
sleep(100);

while(notStopped()){
for(let i = 0; i < 10; i++){
赞();
}
显示更多();
下滑();
}