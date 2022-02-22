"ui";
ui.layout(
    <vertical>
    <button id="but" w="*" h="*" text="0.00"/>
    </vertical>
    );
    var kg=false,s=0;
   setInterval(()=>{
       if(kg){
         ui.run(()=>{
        ui.but.setText(String((new Date().getTime()-s)/1000));    
             });  
           
           
           };
       
       },100) 
    ui.but.click(function(){
        if(!kg){
            kg=true;
 s=new Date().getTime();
            }else{
                kg=false;
         ui.run(()=>{
        ui.but.setText(String((new Date().getTime()-s)/1000));    
             });  
                
                };
 
        });