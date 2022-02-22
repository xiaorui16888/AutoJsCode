"auto";
var  idid = [],o = 0,k = 1;
sleep(5000);
function 列表(){
    
    var aa = id("elv_buddies").className("AbsListView").findOne();
    var x = 0;
    var y = aa.bounds().centerY()-aa.bounds().height()/2;
    var xb = aa.bounds().centerX()+aa.bounds().width()/2
    var yb = aa.bounds().centerY()+aa.bounds().height()/2;
    var yy = parseInt(y);
    var yyb = parseInt(yb)
    aa.children().forEach(function(child){
        var c = child.findOne(boundsInside(x,yy,xb,yyb).className("LinearLayout").clickable());
        if(c){
            c.click();
            sleep(3333);//这个时间留给子线程点赞
            text("返回").findOne().click();
            sleep(1000);
        }
    });
    swipe(aa.bounds().centerX(),yb-50,aa.bounds().centerX(),y-50,1000);
             //如果不上滑，就把yb-50和y-50改成yb-100和y-100
}

threads.start(function(){
    //子线程，识别点赞
    while(1){
        var z = descEndsWith("次赞").findOne();
        var shu = id("info").findOne().text();
        for(var i=0; i<o; i++){
            if(idid[i]==shu){//判断是不是点赞过的好友
                k = 0;
            }else{
                k = 1;
            }
        }
        sleep(333);
        if(k){
            for(var c=0; c<10; c++){
                z.click();
                sleep(100);
            }
            idid[o] = shu; 
            if(o>30){
                o = 0;
            }else{
                o++;
            }
        }
        sleep(333);
    }
    
});


for(;;){//主线程的循环调用
    列表();
    sleep(888);
}
