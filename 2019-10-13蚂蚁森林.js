auto.waitFor()
if(!requestScreenCapture()) {
    alert("请求截图权限失败！");
    exit();
}
sleep(1200)

/**
 * 可扩张弹框
 */
// threads.start(function(){
//      while(1){
//          if(text('更新').exists()){
//              click(
//                 className('android.widget.Button').find()[1].bounds().centerX(),
//                 className('android.widget.Button').find()[1].bounds().centerX()
//              )
//          }
//      }
// })
main()
//#1DA06D   抓手颜色
function main(){
    open_alipay()
    sleep(1500)
    if(open_Ant_forest()){
        toastLog('自己的能量采集完成')
        sleep(1200)
    }
    Ant_forest_Friends()
}

/**
 * 打开支付宝
 */
function open_alipay()
{
    while(!text('扫一扫').exists() && !text('支付').exists())
    {
        app.launch('com.eg.android.AlipayGphone');
        sleep(2500)
    }
    toastLog('支付宝已经打开')
    return true
}

function open_Ant_forest()
{
    if(text('蚂蚁森林').exists())
    {
        if(!控件点击('蚂蚁森林')) log('控件不存在')
    }else{
        if(!控件点击('com.alipay.mobile.base.commonbiz:id/home_title_search_icon')) log('控件不存在')
        text('搜索').waitFor();
        sleep(800);
        className('android.widget.EditText').setText('蚂蚁森林');
        sleep(800)
        if(!(控件点击('搜索'))) log('控件不存在')
        while(!text('蚂蚁森林，为你在荒漠种下一棵真树').exists())
        {
            if(text('蚂蚁森林，为你在荒漠种下一棵真树').exists())
            {
                break;
            }else{
                sleep(1500)
            } 
        }
        if(控件点击('蚂蚁森林，为你在荒漠种下一棵真树')) log('控件不存在')
        text('最新动态').waitFor();
        if(text('攻略').exists()&&text('任务').exists()&&text('背包').exists())
        {
            log('进入能量界面');
            let need_arr ;
            let arr =className('android.widget.Button').depth(14).find();
            for(i in arr){
                try {
                    if(arr[i].text().split('能量').length>1){
                        控件点击(arr[i].text())
                        log(arr[i].text()+'：采集完成')
                        sleep(1000)
                    }
                }catch(e){}
            }
            return true
        }
    }
}

function Ant_forest_Friends(){
    if(text('查看更多好友').exists())
    {
        text('查看更多好友').click()
        text('好友排行榜').waitFor();
        text('4').waitFor();
        while(1)
        {
            var img = captureScreen();
            var point = findColor(img, "#1DA06D");
            if(point){
                click(point.x ,point.y)
                text('发消息').waitFor();
                let need_arr ;
                let arr =className('android.widget.Button').depth(14).find();
                for(i in arr){
                    try {
                        if(arr[i].text().split('能量').length>1){
                            控件点击(arr[i].text())
                            log(arr[i].text()+'：采集完成')
                            sleep(1000)
                        }
                    }catch(e){}
                }
                toastLog('当前这个好友已经完成采集能量')
                back()
                sleep(2000)
                continue;
            }else{
                toastLog('当前没有好友能量可以采集')
                sleep(2000);
                if(text('邀请').exists()){
                    toastLog('没有好友了')
                    return true;
                }else{
                    swipe(500,device.height-250,500,150,1500)
                }
            }
        }
        
    }
}

function 控件点击(obj)
{
    if(text(obj).exists())
    {
        click(
            text(obj).find()[0].bounds().centerX(),
            text(obj).find()[0].bounds().centerY()
            )
            return true
    }
    else if(desc(obj).exists())
    {
        click(
            desc(obj).find()[0].bounds().centerX(),
            desc(obj).find()[0].bounds().centerY()
            )
            return true
    }else if(id(obj).exists())
    {
        click(
            id(obj).find()[0].bounds().centerX(),
            id(obj).find()[0].bounds().centerY()
            )
            return true
    }else if(className(obj).exists())
    {
        click(
            className(obj).find()[0].bounds().centerX(),
            className(obj).find()[0].bounds().centerY()
            )
            return true
    }else{
        toastLog(obj+':控件不存在')
        return false
    }
}