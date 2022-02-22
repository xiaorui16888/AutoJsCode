auto.waitFor();

toast("开启微信中...");

//启动微信
launchApp("微信");

toast("开始自动抢红包...");

//在列表界面循环查找是否有人发红包
while(true)
{
    //查找并点击发了红包的群或好友进入聊天界面
    textContains("[微信红包]").findOne().parent().parent().parent().parent().click();
    //在聊天界面循环查找是否有未领取的红包
    while(true)
    {
        //延迟0.5秒,防止消息未加载出来
        sleep(500);
        //查找红包(包括自己发的和别人发的)
        var red_envelope = textMatches("^领取红包|查看红包$").findOnce();
        //如果找不到红包
        if(red_envelope == null)
        {
            //跳出循环
            break;
        }
        //点击找到的第一个未领取的红包
        red_envelope.parent().parent().parent().parent().click();
        //等待红包界面加载
        id("cli").waitFor();
        //判断是否为可打开红包
        var open = id("cnu").findOnce();
        //如果红包可以打开
        if(open != null)
        {
            //打开红包
            open.click();
            //等待领取详情界面加载
            desc("返回").waitFor();
            //点击返回按钮关闭领取详情界面返回聊天界面
            desc("返回").findOne().parent().click();
        }
        //如果红包打不开
        else
        {
            //点击关闭红包界面按钮返回聊天界面
            id("cli").findOne().click();
        }
    }
    //等待返回到列表界面的按钮加载
    id("j4").waitFor();
    //返回到列表界面
    id("j4").findOne().click();
}