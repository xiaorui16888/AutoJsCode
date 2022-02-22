var w = floaty.rawWindow(
<vertical bg="#FFFFFF">
        <text text="悬浮窗测试v1.0.0  《童心梦》唯心制作" textSize="17sp" gravity="center" textStyle="bold" bg="#000000">
        </text>
       <ScrollView >
        <vertical >
                    <button id="位置1" text="倒金币" textSize="10sp"/>
                    <button id="位置2" text="种树"textSize="10sp"/>
                    <button id="位置3" text="发红包"textSize="10sp"/>
                    <button id="位置4" text="飞艇"textSize="10sp"/>
                    <button id="位置5" text="跳一跳摇骰子"textSize="10sp"/>
                    <button id="位置6" text="领红包"textSize="10sp"/>
                    <button id="位置7" text="钓鱼"textSize="10sp"/>
                    <button id="位置8" text="刷级"textSize="10sp"/>
                    <button id="位置9" text="车位豪华度设置"textSize="10sp"/>
                </vertical>
        </ScrollView>
    </vertical>
);
var x=device.width;
var y=device.height;
//竖屏
/*w.setSize(y/3,x);//悬浮窗宽高
w.setPosition((x-x/2)/2,(y-y/2)/2);//悬浮窗位置
log(x,y,"2")*/
//横屏
w.setSize(x-x/1.9,y/2);
w.setPosition((y-y/2)/1.3,(x-x/2)/8);
w.setTouchable(true);//是否可触摸
setInterval(()=>{}, 1000);
 w.位置1.click(()=>{        
    engines.execScriptFile("./倒金币.js"); 
    w.close();
    });
 w.位置2.click(()=>{        
    engines.execScriptFile("./种树.js")
    w.close();
    });
 w.位置3.click(()=>{        
    engines.execScriptFile("./发红包.js")
    w.close();
    toast("发红包开启")
    });
  w.位置4.click(()=>{        
    engines.execScriptFile("./飞艇.js")
    w.close();
    toast("飞艇已启动")
    });
  w.位置5.click(()=>{        
    engines.execScriptFile("./跳一跳.js")
    w.close();
    toast("摇骰子已启动")
    });
  w.位置6.click(()=>{        
    engines.execScriptFile("./领红包.js")
    w.close();
    toast("领红包已启动")
    });
   w.位置7.click(()=>{        
    engines.execScriptFile("./钓鱼.js")
    w.close();
    toast("钓鱼已启动")
    });
   w.位置8.click(()=>{        
    engines.execScriptFile("./家族仓库刷级.js")
    w.close();
    toast("刷级已启动")
    });
    w.位置9.click(()=>{        
    engines.execScriptFile("./停车位豪华度.js")
    w.close();
    toast("豪华度设置已启动")
    });