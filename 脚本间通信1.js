BroadcastReceiver=android.content.BroadcastReceiver;
Context=android.content.Context;
Intent=android.content.Intent;
IntentFilter=android.content.IntentFilter;
console.show();
string="";

  //注册广播
  var MsgReceiver;
var xx;

  /**
  * 广播接收器
  *
  */
  
   MsgReceiver =new BroadcastReceiver(){

    
    onReceive(context,intent) {
      //此处从广播中取出数据，并写入你想要的函数
      string = intent.getStringExtra(xx);


   log(string);

    }


  }


 //动态注册广播接收器
 
    intentFilter = new IntentFilter();
    intentFilter.addAction("ghhghhhggggstijb");
  //  cc=new android.content.Context(){}
   // cc.registerReceiver(MsgReceiver, intentFilter);
    context.registerReceiver(MsgReceiver, intentFilter);
    log("等待消息");
    while(true){sleep(1000);
    
    
    }