"ui";
com.stardust.auojs.inrt.Pref.getPreferences().edit().putBoolean("key_use_volume_control_running", false).apply();
ui.layout(
   <frame>    
   <scroll>
   <vertical bg="#F7fff7" >
   <linear bg="#263238" gravity="right">
   <button id="引导"text="引导" w="60" textColor="#d1d1d1" style="Widget.AppCompat.Button.Borderless" textStyle="bold"/>
   <button id="资源"text="资源"  w="60" textColor="#d1d1d1" style="Widget.AppCompat.Button.Borderless"textStyle="bold"/>   
   <button id="捐赠"text="捐赠"  w="60" style="Widget.AppCompat.Button.Borderless" textStyle="bold" textColor="#ff6b6b"/>
   <button id="交流"text="交流"  w="60" textColor="#d1d1d1" style="Widget.AppCompat.Button.Borderless" textStyle="bold"/>
   <button id="分享"text="分享"  w="60" textColor="#d1d1d1" style="Widget.AppCompat.Button.Borderless" textStyle="bold"/>
   <button id="退出"text="完全退出"  w="90" textColor="#d1d1d1" style="Widget.AppCompat.Button.Borderless" textStyle="bold"/>

    </linear>
    <text size="1" gravity="center"textColor="#767574" bg="#d1d1d1"></text>
    <text size="40" gravity="center" textStyle="bold" textColor="#d1d1d1"  >ONE KEY</text>
    <text size="8" gravity="center"textColor="#767574" textStyle="italic"> BlackBerry KEYone</text>
    <text size="5" gravity="center"textColor="#767574"></text>
  
   <Switch bg="#ff6b6b"id="all" text=" ● 微信模块"  textColor="#dfdfdf" />
   <Switch  id="Wechat_scan" text="  1.扫一扫" margin="10" textColor="#5a5552" textStyle="bold" />
    <text size="12" text="shift_right(右shift打开扫一扫)" gravity="center" textColor="#5a5552" />
   <Switch  id="Wechat_搜索" text="  2.搜索" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="shift_left(左shift打开首页搜索)" gravity="center" />
   <Switch  id="Wechat_pyq" text="  3.打开朋友圈" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="alt(单击直达朋友圈)" gravity="center" />
   <Switch  id="Wechat_ID" text="  4.多账号切换" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="双击u  (“我”页面)" gravity="center" />
   <Switch  id="Wechat_输入状态" text="  5.切换输入状态" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="sym (有文字时不切换)" gravity="center" />
   <Switch  id="Wechat_语音说话" text="  6.空格说语音" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="space (长按空格说话，松开发送)" gravity="center" />
   <Switch  id="Wechat_未读消息" text="  7.打开未读消息" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="0 (零，读取未读消息和未读语音)" gravity="center" />
   <Switch  id="Wechat_撤回" text="  8.消息撤回" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="双击$(撤回最近的一条消息)" gravity="center" />
   <Switch  id="Wechat_电话" text="  9.拨出电话(私聊)" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="双击c(sym切成语音状态，双击c快速拨打)" gravity="center" />
   <Switch  id="Wechat_接电话" text="  10.接微信电话" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="双击空格接听微信电话，单击$切换免提" gravity="center" />
   <Switch  id="Wechat_拍照" text="  11.拍照模块" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="聊天中双击右shift打开拍照  长按空格拍视频  单击空格拍照  Enter发送  DEL重拍  P切换摄像头" gravity="center" />
   <Switch  id="Wechat_朋友圈" text="  12.朋友圈翻图N/B" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="朋友圈内图片，下一张N，上一张B" gravity="center" />
   <Switch  id="Wechat_轻触光标" text="  13.轻触激活文字光标" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="轻触空格键，激活聊天框输入状态" gravity="center" />
    <text size="18" text="" gravity="center" />
   
    <text bg="#0188fb"id="all" text=" ● QQ/Tim"  textColor="#242424"/>
   <Switch  id="QQ_语音" text="  1.QQ/Tim发语音" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="空格长按发语音" gravity="center" />
   <Switch  id="QQ_未读消息" text="  2.QQ/Tim读取未读消息" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="0读取未读消息" gravity="center" />
    <text size="12" text="" gravity="center" />
 
    <text bg="#000000"id="all" text=" ● 系统"  textColor="#D3D3D3"/>
   <Switch  id="system_亮度" text="  1.调节亮度" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="左shift双击 桌面或者后台列表中双击更换亮度" gravity="center" />
   <Switch  id="system_桌面未读" text="  2.桌面读取未读消息" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="0键打开有提醒消息的app，需要给予黑莓桌面通知权限" gravity="center" />
   <Switch  id="system_自带相册" text="  3.自带相册快捷删图" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="del 浏览单图片时删除这张图片，需要有垃圾桶图标在场" gravity="center" />
    <text size="12" text="" gravity="center" />
 
    <text bg="#ffbb14"id="all" text=" ● 滴答清单"  textColor="#242424"/>
   <Switch  id="滴答清单" text="  1.桌面快捷窗口语音记录" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="长按空格  支持滴答清单桌面快捷录入窗口的语音记录" gravity="center" />
    <text size="12" text="" gravity="center" />   
    <text bg="#80d3d7"id="all" text=" ● Share微博客户端"  textColor="#242424"/>
   <Switch  id="share" text="  1.share综合模块" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="轻触空格，下滑单一博客页面，N 下一张图，B 上一张图" gravity="center" />
    <text size="12" text="" gravity="center" /> 
   
    <text bg="#FFd440"id="all" text=" ● 微博官方客户端"  textColor="#242424"/>
   <Switch  id="weibo" text="  1.微博客户端综合模块" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="轻触空格 读取更多微博、浏览长图，N 下一张图片，B 上一张图片，" gravity="center" />
    <text size="12" text="" gravity="center" />  
   
    <text bg="#FF6861"id="all" text=" ● 红板报 新闻客户端"  textColor="#242424"/>
   <Switch  id="filpboard" text="  1.红板报" margin="10" textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="全局支持轻触空格下滑页面" gravity="center" />
    <text size="12" text="" gravity="center" />
   
    <text bg="#FF6861"id="all" text=" ● EX拨号"  textColor="#242424"/>
   <Switch  id="excall" text="  1.快捷拨出" margin="10"textColor="#5a5552" textStyle="bold"/>
    <text size="12" text="双击空格，拨出第一位的号码" gravity="center" />
    <text size="12" text="" gravity="center" />
    </vertical>
    </scroll>
    </frame>
);


ui.引导.click(()=>{
engines.execScriptFile("./引导.js")
})
ui.资源.click(()=>{
engines.execScriptFile("./资源.js")
})
ui.交流.click(()=>{
engines.execScriptFile("./交流.js")
})
ui.分享.click(()=>{
engines.execScriptFile("./分享.js")

})
ui.退出.click(()=>{
engines.stopAll()

})
ui.捐赠.click(()=>{
	alipay("FKX001563U5IZFORWC2V2A")
})
function alipay(code) {
        var url = "intent://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2F" + code + "%3F_s%3Dweb-other&_t=1472443966571#Intent;scheme=alipayqr;package=com.eg.android.AlipayGphone;end"
        var intent = android.content.Intent.parseUri(url, android.content.Intent.URI_INTENT_SCHEME);
        context.startActivity(intent);}
alert("ONE KEY","2018.4.1\n-版本号20001\n-当前微信模块适配6.6.5版\n\n\n-原Buttons killer 即 小保健，正式命名为ONE KEY\n-建议使用百度输入法黑莓快捷键配置文件\n第五版or第六版搭配使用")





 var allswitch=false
ui.all.click(()=>{
    if(allswitch==false){
    
ui.Wechat_scan.setChecked(true)
ui.Wechat_pyq.setChecked(true)
	ui.Wechat_ID.setChecked(true)
	ui.Wechat_搜索.setChecked(true)
	ui.Wechat_输入状态.setChecked(true)
	ui.Wechat_语音说话.setChecked(true)
	ui.Wechat_未读消息.setChecked(true)
	ui.Wechat_撤回.setChecked(true)
	ui.Wechat_电话.setChecked(true)
	ui.Wechat_拍照.setChecked(true)
	ui.Wechat_朋友圈.setChecked(true)
	ui.Wechat_接电话.setChecked(true)
	ui.Wechat_轻触光标.setChecked(true)

    allswitch=true}
    else{
    ui.Wechat_scan.setChecked(false)
    ui.Wechat_pyq.setChecked(false)
	ui.Wechat_ID.setChecked(false)
	ui.Wechat_搜索.setChecked(false)
	ui.Wechat_输入状态.setChecked(false)
	ui.Wechat_语音说话.setChecked(false)
	ui.Wechat_未读消息.setChecked(false)
	ui.Wechat_撤回.setChecked(false)
	ui.Wechat_电话.setChecked(false)
	ui.Wechat_拍照.setChecked(false)
	ui.Wechat_朋友圈.setChecked(false)
	ui.Wechat_接电话.setChecked(false)
	ui.Wechat_轻触光标.setChecked(false)
allswitch=false
    }
    })



events.observeKey()
events.setMaxListeners(30)
//1
events.onKeyDown("shift_right",function(){
if(ui.Wechat_scan.isChecked()){
   engines.execScriptFile("./Wechat_scan.js")
}else{}
}
)
//2
events.onKeyDown("shift_left",function(){
if(ui.Wechat_搜索.isChecked()){
   engines.execScriptFile("./Wechat_搜索.js")
}else{}
}
)
//3
events.onKeyDown("alt_left",function(){
if(ui.Wechat_pyq.isChecked()){
   engines.execScriptFile("./Wechat_pyq.js")
}else{}
}
)
//4
var dbu = 0
events.onKeyDown("u", function() {
  //一秒内双击
if (new Date().getTime() - dbu < 400) {
if(ui.Wechat_ID.isChecked()){
   engines.execScriptFile("./Wechat_ID.js")
}else{}
  }
  dbu = new Date().getTime();
});

//5
events.onKeyDown("sym", function() {
    if(ui.Wechat_输入状态.isChecked()){
     engines.execScriptFile("./Wechat_输入状态.js")   
    }else{}
})
//6-1
events.onKeyDown("space", function() {
    if(ui.Wechat_语音说话.isChecked()){
     engines.execScriptFile("./Wechat_语音说话.js")   
    }else{}
})
//6-2
events.onKeyUp("space", function() {
    if(ui.Wechat_语音说话.isChecked()){
     engines.execScriptFile("./Wechat_语音说话弹起.js")   
    }else{}
})
//7
events.onKeyDown("0", function() {
    if(ui.Wechat_未读消息.isChecked()){
     engines.execScriptFile("./Wechat_未读消息.js")   
    }else{}
})
//8
var db4 = 0;
events.onKeyDown("4", function() {
  if (new Date().getTime() - db4 < 400) {
      if(ui.Wechat_撤回.isChecked()){
     engines.execScriptFile("./Wechat_撤回.js")   
    }else{}
      }
  db4 = new Date().getTime();
})
//9
var dbwxdh=0
events.onKeyDown("c", function() {
  if (new Date().getTime() - dbwxdh < 400) {
      if(ui.Wechat_电话.isChecked()){
     engines.execScriptFile("./Wechat_电话.js")   
    }else{}
 }
    dbwxdh=new Date().getTime();
})
//10-1
var dbwxjdh
events.onKeyDown("space", function() {
  //一秒内双击
  if (new Date().getTime() - dbwxjdh < 400) {
      if(ui.Wechat_接电话.isChecked()){
    engines.execScriptFile("./Wechat_接电话.js")   
    }else{}
  }
  dbwxjdh = new Date().getTime();
});
//10-2
events.onKeyDown("4", function() {
if(ui.Wechat_接电话.isChecked()){
    engines.execScriptFile("./Wechat_免提.js")   
    }else{}
  })
//11-1
var dbsr=0
events.onKeyDown("shift_right", function() {
  //一秒内双击
  if (new Date().getTime() - dbsr < 400) {
      if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照.js")   
    }else{}
  }
  dbsr = new Date().getTime();
});
//11-2
events.onKeyDown("enter", function() {
    if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照发送.js")   
    }else{}
  })
//11-3
events.onKeyDown("del", function() {
if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照重拍.js")   
    }else{}
  })
//11-4-1
events.onKeyDown("space", function() {
    if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照快门.js")   
    }else{}
})
//11-4-2
events.onKeyUp("space", function() {
    if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照快门弹起.js")   
    }else{}
})
//11-5
events.onKeyDown("p", function() {
if(ui.Wechat_拍照.isChecked()){
     engines.execScriptFile("./Wechat_拍照切摄像头.js")   
    }else{}
});
//12-1
events.onKeyUp("n", function() {
if(ui.Wechat_朋友圈.isChecked()){
    engines.execScriptFile("./Wechat_朋友圈切图N.js")   
    }else{}
  })
//12-2
events.onKeyUp("b", function() {
if(ui.Wechat_朋友圈.isChecked()){
    engines.execScriptFile("./Wechat_朋友圈切图B.js")   
    }else{}
  })

//13
events.onKeyDown("convenience", function() {
if(ui.Wechat_轻触光标.isChecked()){
    engines.execScriptFile("./Wechat_轻触光标.js")   
    }else{}
  })

//qq-tim.1
events.onKeyDown("space", function() {
    if(ui.QQ_语音.isChecked()){
     engines.execScriptFile("./QQ_语音.js")   
    }else{}
})
//qq-tim.2
events.onKeyUp("space", function() {
    if(ui.QQ_语音.isChecked()){
     engines.execScriptFile("./QQ_语音取消.js")   
    }else{}
})
//qq-tim.3
events.onKeyDown("0", function() {
    if(ui.QQ_未读消息.isChecked()){
     engines.execScriptFile("./QQ_未读消息.js")   
    }else{}
})

//系统-亮度
var dbsl=0
events.onKeyDown("shift_left", function() {
  //一秒内双击
  if (new Date().getTime() - dbsl < 400) {
      if(ui.system_亮度.isChecked()){
     engines.execScriptFile("./system_亮度.js")   
    }else{}
  }
  dbsl = new Date().getTime();
}); 

//系统-桌面未读
events.onKeyDown("0", function() {
    if(ui.system_桌面未读.isChecked()){
     engines.execScriptFile("./system_桌面未读.js")   
    }else{}
})
//系统-相册删图
events.onKeyDown("del", function() {
    if(ui.system_自带相册.isChecked()){
     engines.execScriptFile("./system_自带相册.js")   
    }else{}
})
//滴答清单-按下
events.onKeyDown("space", function() {
    if(ui.滴答清单.isChecked()){
     engines.execScriptFile("./滴答清单_语音.js")   
    }else{}
})
//滴答清单-弹起
events.onKeyUp("space", function() {
    if(ui.滴答清单.isChecked()){
     engines.execScriptFile("./滴答清单_语音取消.js")   
    }else{}
})
//share-1
events.onKeyDown("convenience", function() {
    if(ui.share.isChecked()){
    engines.execScriptFile("./share_space.js")   
    }else{}
})
 //share-2
events.onKeyDown("n", function() {
if(ui.share.isChecked()){
    engines.execScriptFile("./share_N.js")   
    }else{}
  })
//share-3
events.onKeyDown("b", function() {
if(ui.share.isChecked()){
    engines.execScriptFile("./share_B.js")   
    }else{}
  })
//weibo-1
events.onKeyDown("convenience", function() {
    if(ui.weibo.isChecked()){
    engines.execScriptFile("./weibo_space.js")   
    }else{}
})
//weibo-2
events.onKeyDown("n", function() {
if(ui.weibo.isChecked()){
    engines.execScriptFile("./weibo_N.js")   
    }else{}
  })
//weibo-3
events.onKeyDown("b", function() {
if(ui.weibo.isChecked()){
    engines.execScriptFile("./weibo_B.js")   
    }else{}
  })



//红板报
events.onKeyDown("convenience", function() {
    if(ui.filpboard.isChecked()){
    engines.execScriptFile("./filpboard.js")   
    }else{}
})


//ex拨号
var dbex = 0;
events.onKeyDown("space", function() {
  if (new Date().getTime() - dbex < 400) {
      if(ui.excall.isChecked()){
     engines.execScriptFile("./excall.js")   
    }else{}
      }
  dbex = new Date().getTime();
})
