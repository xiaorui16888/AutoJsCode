var window2 = floaty.window(
    <frame>
    <vertical>
    <text id="jg" w="163" text="0" color="#ffffff" bg="#77000000" gravity="right" margin="0 0 1 0"/>
<linear>
   <button id="n1" text="1" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n2" text="2" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n3" text="3" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="njia" text="+" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   
   <linear>
   <button id="n4" text="4" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n5" text="5" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n6" text="6" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="njian" text="-" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   <linear>
   <button id="n7" text="7" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 1 0"/>
   <button id="n8" text="8" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n9" text="9" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="ncheng" text="×" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   
   <linear>
   <button id="nq" text="c" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="n0" text="0" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nd" text="=" w="40" h="40" color="#ffffff" bg="#77000000" margin="0 1 0 0"/>
   <button id="nchu" text="÷" w="40" h="40" color="#ffffff" bg="#77000000"/>
   </linear> 
   </vertical>
      </frame>
);
var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window2.jg.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window2.getX();
            windowY = window2.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window2.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
             
           
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
               threads.start(function(){
                     var handsome = confirm("确认退出？");
                     if(handsome){exit();}
});
                
            }
            return true;
    }
    return true;
});


var p="";
var xx="";
window2.n0.click(()=>{p+="0";xx+="0";});
window2.n1.click(()=>{p+="1";xx+="1";});
window2.n2.click(()=>{p+="2";xx+="2";});
window2.n3.click(()=>{p+="3";xx+="3";});
window2.n4.click(()=>{p+="4";xx+="4";});
window2.n5.click(()=>{p+="5";xx+="5";});
window2.n6.click(()=>{p+="6";xx+="6";});
window2.n7.click(()=>{p+="7";xx+="7";});
window2.n8.click(()=>{p+="8";xx+="8";});
window2.n9.click(()=>{p+="9";xx+="9";});
window2.njia.click(()=>{p+="+";xx+="+";});
window2.njian.click(()=>{p+="-";xx+="-";});
window2.ncheng.click(()=>{p+="*";xx+="×";});
window2.nchu.click(()=>{p+="/";xx+="÷";});
window2.nq.click(()=>{p="";xx="";});
window2.nd.click(()=>{
    try{
    var s=eval(p);
    p+="=";
p=s;
xx+="="+s;
}
catch(e){p="";xx="";}
});


while(true){
    sleep(100);
    var pp=""
    if(p==""){pp="0";}else{pp=p;}
ui.run(function() {
                window2.jg.setText(xx);
            });
    }