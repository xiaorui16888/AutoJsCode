"ui";
"auto";
ui.layout(
    <vertical>
        <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
         百度一下
        </text>
    <button id="ks" text="开始"/>
   
        <ScrollView>
            <vertical>	  
                  <text textSize="16sp" margin="8">百度</text>
               <webview id="webview" h="550" margin="0 16"/>
               // <radiogroup marginLeft="16" marginTop="16">
                   
              //  </radiogroup>
            </vertical>
        </ScrollView>
    </vertical>
)

ui.webview.loadUrl("http://www.baidu.com");        


ui.run(function(){

ui.ks.click(()=>{
		
	sleep(5000);
for(m=1;m<500;m++){

  swipe(400,1800,400,600,2000);
sleep(700);


  } 
    });

});

