"ui";

ui.layout(
    <frame w="*" h="*">
    <vertical gravity="center">
        <input id="tt" password="true" text="" hint="" w="150" textColorHint="#D8D8D8" textSizeHint="8"/> 

        <button w= "80" text="启动" id= "start" marginTop="30"/>
        <button w= "80" text="停止" id= "stop" marginTop="15"/>

       
    </vertical>
     <button w="auto" h="auto" textColor="red" text="联系作者" id= "connect" marginTop="15" layout_gravity="right|bottom"/>
     </frame>
);
var threadTime;
var currTimer;
var dingshi = "19:25:30";
function start(){

    threadTime = threads.start(function(){
        console.show();
        currTimer = setInterval(function(){
                if(threadTime==null){
                    if(currTimer!=null) {                        
                        clearInterval(currTimer);
                        window.close();
                    }
                }
                var t = dingshi.split(":");
                var h = t[0];m = t[1];s = t[2];
                var currentDate = new Date();
                var currentH = currentDate.getHours();
                var currentM= currentDate.getMinutes();
                var currentS= currentDate.getSeconds();
                log(currentH+":"+currentM+":"+currentS)
                if(currentH==h &&currentM==m && currentS==s ){
                    //to do 业务逻辑
                    log("todu")
                }
                
        },1000)
    });
}
function stop(){
    threadTime = null;
}

ui.start.click(function(){
    start();
});

ui.stop.click(function(){
    stop();
});