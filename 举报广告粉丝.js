// var w = floaty.window(
//     <vertical>
//         <button  id="aaa" w="100" h="100" text="举报" bg="#010101"/>
//         <button  id="bb" w="100" h="100" text="关闭" bg="#0f0f0f"/>
//     </vertical>
// );
// setInterval(()=>{},1000);
// w.setPosition(800,1520 );
// w.exitOnClose();
// //w.setSize(100, 100);
// //w.setTouchable(true);
// w.aaa.click(()=>{
//     jb();
//     });
//     w.bb.click(()=>{
//         w.close();
//     });
auto();
jb();
    function jb(){
        desc("更多操作").findOne().click();
        sleep(200);
        text("举报").findOne().parent().click();
       // waitForActivity("com.sina.weibo.browser.WeiboBrowser");
       sleep(100); 
       text("举报").waitFor();
        click(63,702);
        sleep(700);
        click(597,1152);
        sleep(700);
        click(310,1529);
        sleep(1000);
        back();
        back();
        back();        
    };
   

   