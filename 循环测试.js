   "ui";
   
   ui.layout(
       <vertical>
  <horizontal>
  <input  margin="0 16" id="p" hint="输入平台"/>
     <input margin="30 16" id="d" hint="输入循环次数"/>   
     </horizontal>
     <button id="ok" text="确定"/>
     
     </vertical>
     );
     
     ui.ok.on("click",()=>{
         var m=ui.p.getText();
         var n=ui.d.getText();
         
         if(m==""||n==""){
             toastLog("请检查是否输入正确");
             }
             else
             {
                 toastLog("你输入的平台为"+m+"  输入的循环时间为"+n);
                 
                 threads.start(function () {
          for(let i=0;i<n;i++){
        engines.execScriptFile("./微鲤看看.js");
       }
    }); 
         
                 }
  });
         
   
   
   
   
   
   
   
   
   
   
   
         