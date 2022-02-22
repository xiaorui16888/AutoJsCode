"ui";
ui.layout(
    <vertical id="id">
    </vertical>
    );
    var atc=activity;
    var txt = new android.widget.TextView(atc);
    txt.setText("ing模拟模块");
 //  ui.run(function(){
    ui.id.addView(txt);
 //   });
 var button = new android.widget.Button(atc);
    button.setText("我知道了");
    ui.id.addView(button);
     button.setOnClickListener(new android.view.View.OnClickListener() {
                onClick: function(viewarg) {
                    toast("你好");
                   // toastLog(viewarg);
                }
                
                
                
            });
    
    
    
    