"ui";

//https://blog.csdn.net/biickvtkd/article/details/45168105
//本文由上述网址资料和他人资料 改编

ui.layout(
    <vertical>
    <text w="*" h="200px" text="发送通知" textSize="100px" gravity="center"/>
        <ScrollView>
<vertical>
    <vertical margin="0 20 0 20" bg="#eeeeee">
    <text w="*" text="必须设置" textSize="60px" gravity="center"/>
    <input id="TitleText" w="*" hint="请输入标题"/>
    <button id="setTitle" text="设置标题"/>
    <input id="ContentText" w="*" hint="请输入内容"/>
    <button id="setContent" text="设置内容"/>
    <button id="setIcon" text="设置图标"/>
    </vertical>
 <vertical margin="10 20 0 20" bg="#eeeeee">
    <text w="*" text="可选设置" textSize="60px" gravity="center"/>
    <button id="setContentIntent" text="设置意图"/>
    <button id="setOngoing" text="设置可否被清除"/>
</vertical>
<vertical margin="10 70 0 70" bg="#eeeeee">
    <button id="notify" text="发送(更新)通知"/>
    <button id="delNotify" text="删除通知"/>
</vertical>
<text w="*" margin="10 0 0 0" autoLink="web" textSize="30px" gravity="center" text="参考资料: https://blog.csdn.net/biickvtkd/article/details/45168105"/>
</vertical>      
  </ScrollView>
    </vertical>
);
//threads.start(function(){alert("由于手机的不同\n有些功能可能无法用\n还请反馈作者");});
//导入类
importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.app.PendingIntent");
importClass("android.content.res.Resources");

var intent = PendingIntent.getActivity(context, 0, app.intent({
    action: "android.intent.action.VIEW",
    data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=2190935120",
    packageName: "com.tencent.mobileqq",
}), 0);  //这里是个QQ强制聊天的intent

var NO = new Notification.Builder(context);
var NM = context.getSystemService(context.NOTIFICATION_SERVICE);
var notify_id = 1123;
var cancel = true;

ui.setTitle.click(() => {
    NO.setContentTitle(ui.TitleText.getText()==""?"Auto.JS联合死亡神界荣誉出品":ui.TitleText.getText());
});

ui.setIcon.click(() => {
    //设置通知图标
    var ic = ['ic_3d_rotation_black_48dp', 'ic_accessibility_black_48dp', 'ic_accessible_black_48dp', 'ic_account_balance_black_48dp', 'ic_account_balance_wallet_black_48dp', 'ic_account_box_black_48dp'];
    var i = random(0, ic.length);
    var icon = getResourceID(ic[i], "drawable");
//var img=images.read("/sdcard/脚本/画画/3.png");
//Details(img,"bitmap");
    NO.setSmallIcon(icon);   //这俩玩意我手机用不了。没啥改变。
    //NO.setLargeIcon(img.getBitmap());
});

ui.setContent.click(() => {
    NO.setContentText(ui.ContentText.getText()==""?"本人已完美复活 献上你的大屌祭奠吧":ui.ContentText.getText());
});

ui.setContentIntent.click(() => {
    NO.setContentIntent(intent);
});


ui.notify.click(() => {
//Details(NO,"Vibrate");
    try {
        NO.setDefaults( Notification.DEFAULT_ALL);
        //NO.setVibrate([500,250,500,250,500,250,500]);//这玩意我手机用不了。
        NM.notify(notify_id, NO.build())
    } catch (e) {
        toastLog("错误: 你没有设置好")
    };
});

ui.setOngoing.click(() => {
        cancel = !cancel
        //设置通知可否被清除
        NO.setOngoing(!cancel);
});

ui.delNotify.click(() => {
        NM.cancel(notify_id);
});

function getResourceID(name, defType) {
    //获取资源文件ID
    //参数
    //defType 类名 如drawable id string等
    //name 资源名
    var resource = context.getResources();
    return resource.getIdentifier(name, defType, context.getPackageName());
};



function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = eval("/" + re + "/i");
    };
    log(A);
    try {
        //A= A.sort();
        log(A.toString());

    } catch (e) {
        toast(e)
    };
    for (var i in A) {

        try {
            if (!re || re.test(i.toString())) {
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            toast(e)
        }
    };
};
