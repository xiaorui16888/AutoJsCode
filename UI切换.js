"ui";
界面1();
function 界面1(){
ui.layout(
    
        <button id="ok" text="切换界面"/>
    
);
//指定确定按钮点击时要执行的动作
ui.ok.click(function(){
    界面2();
});
}

function 界面2(){
ui.layout(
        <button id="ok" text="点一下回去"/>
);
//指定确定按钮点击时要执行的动作
ui.ok.click(function(){
   界面1();
});
}