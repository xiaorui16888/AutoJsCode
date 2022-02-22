/**
 * 安卓版本 8.0 ,huawei mate9 ,仅支持流量卡和wifi,首次运行需要打开wifi
 * author : ydy
 * QQ:398123186
 * name:通讯录注册陌陌
 */

auto.waitFor();//获取无障碍;
/***
 * 配置参数：
 * param:服务器IP
 */
var websever = '';//服务器
var mb_brand = '华为';//手机品牌
var mb_type = 'Mate 20';//手机类型
var hig_parameter = 3;//多开分身换一换参数
var make_mb = 1 ; //制作多少个
var imgname; //头像
var sousuozhanghao;
var mm_name ;
/***
 * 线程监听
 */
threads.start(function(){
    while(1){
        sleep(1500);
        if(className('android.widget.Button').exists()){
            if(className('android.widget.Button').findOne().text()=='手机号登录注册'){
                toast('发现:手机号登录注册');
                sleep(300);
                click(491,1575);
            }
            if(className('android.widget.Button').findOne().text()=='跳过'){
                toast('发现:陌陌绑定手机');
                sleep(300);
                text('跳过').click();
            }
            if(text('重新获取').exists()){
                toast('发现:重新获取验证码');
                text('重新获取').click();
            }
            if(text('注册/登录').exists()){
                toast('发现:注册/登录');
                sleep(300);
                id('btn_login').click();
            }
            if(text('提示').exists()){
                toast('发现:提示');
                sleep(300);
                text('确认').click();
            }
            if(text('测测自己的吸引力').exists()){
                toast('发现:测测自己的吸引力');
                sleep(300);
                click(84,156);
                sleep(200);
                if(text('手滑了').exists()){
                    toast('发现:测测自己的吸引力');
                    text('退出').click();
                }
            }
           
            
            if(text('跳过').exists()){
                toast('发现:通讯跳过');
                sleep(300);
                text('跳过').click();
            }
        }else if(text('绑定手机').exists()&&text('跳过').exists()){
            sleep(300);
            text('跳过').click();
        }
    }
});

/**
 * 主程序
 */
main();
function main(){
    try{
        while(1){
            open_wifi();//打开wifi
            sleep(1000);
            home();
            sleep(3000);
            Divide_oneself();
            sleep(3000);
            close_wifi();//关闭wifi
            sleep(2000);
            home();
            sleep(2000);
            fly_model();
            sleep(3000);
            home();
            run_momo();
            sleep(3000);
        }
    }catch(exp){
        toastLog(exp);
    }
    
}

/**
 * 飞行模式
 */

function fly_model(){
    fly_falg = true;
    while(fly_falg){
        sleep(3000);
        if(!text('设置').exists()){
            toastLog('当前页面没有设置');
            continue;
        }else{
            text('设置').click();
            sleep(1000);
            click(text('无线和网络').findOne().bounds().centerX(),text('无线和网络').findOne().bounds().centerY());
            sleep(800);
            if(text('飞行模式').exists()){
                click( text('飞行模式').findOne().bounds().centerX(),text('飞行模式').findOne().bounds().centerY());
                toastLog('打开飞行模式：请等待3秒');
                sleep(3000);
                click( text('飞行模式').findOne().bounds().centerX(),text('飞行模式').findOne().bounds().centerY());//在打开
                toastLog('关闭飞行模式：请等待3秒');
                fly_falg = false;
                sleep(3000);
                home();  
            }
        }
    }

}

/**
 * 切换wifi
 */
//wifi();
function open_wifi(){
    //home();
    //关闭wifi
    importPackage(android.content);
    let wifiManager = context.getSystemService(Context.WIFI_SERVICE);
    getCurrentWifiStateState(wifiManager);
}

function close_wifi(){
    //打开wifi
    getCurrentWifiStateState(context.getSystemService(Context.WIFI_SERVICE));
}
function getCurrentWifiStateState(wifiManager) {
    if (wifiManager.isWifiEnabled()){
        notifications();
        sleep(2000);
        click(134,269);
        toastLog('关闭wifi');
    }else{
        notifications();
        sleep(800);
        click(134,269);
        toastLog('打开wifi');
    }
}
/**
 * 制作多开分身
 */
//Divide_oneself();
function Divide_oneself(){
    let error_count = 1;
    if(currentActivity()!='com.huawei.android.launcher.unihome.UniHomeLauncher'){
        toastLog('请返回home页面');
        sleep(3000);
        return null;
    }
    if(!text('多开分身').exists()){
        toastLog('当前页面没有多开分身');
        sleep(3000);
        return null;
    }
    toastLog('多开分身APP已找到');
    text('多开分身').click();
    for (let index = 1; index <=make_mb; index++) {   
        //等待多开分身主界面
        waitForActivity("com.bly.dkplat.widget.MainActivity");
        sleep(500);
        id('iv_btn_create').waitFor();
        sleep(500);
        id('iv_btn_create').click();
        sleep(500);
        text('MOMO陌陌').waitFor();
        let x_ = 753+121;//固定坐标+折半宽度
        let y_ = text('MOMO陌陌').findOne().bounds().centerY()+10;
        click(x_,y_);
        sleep(500);
        text('开始制作').waitFor();
        sleep(500);
        id('et_input').setText(index);
        sleep(500);
        text('设置').find()[0].click();
        text('机型伪装').waitFor();
        toastLog('选择伪装机型:请稍后');
        click(615,306);
        sleep(500);
        if(text(mb_brand).exists()){
            text(mb_brand).click();
        }else{
            text("华为").click();
        }
        sleep(500);
        click(615,426);
        sleep(500);
        if(text(mb_type).exists()){
            text(mb_type).click();
        }else{
            text("Mate 20 保时捷设计").click();
        }
        toastLog('当前选择的机型为：'+mb_brand+'|'+mb_type);
        sleep(1000);
        for (let index = 0; index < hig_parameter; index++) {
            sleep(800);
            text('换一换').click();
        }
        sleep(800)
        text('启用机型伪装').click();
        sleep(800);
        text('开始制作').waitFor();
        text('开始制作').click();
        toastLog('正在制作机型请等待3秒');
        sleep(3000);
        text('允许').waitFor();
        text('允许').click();
        sleep(3000);
        toastLog('安装中，请稍后');
        text('继续安装').waitFor();
        text('继续安装').click();
        sleep(500);
        //关闭关闭联系人、读取本机识别码
        text('读取位置信息').waitFor();
        sleep(500);
        click(960,1245);
        sleep(500);
        click(960,1392);
        toastLog('关闭联系人、读取本机识别码完成');
        sleep(1000);
        text('完成').click();
        toastLog('当前制作第'+index+'个');
        sleep(3000);
    }
}

/**
 * 运行陌陌
 */

function run_momo(){
    while(1){
        sleep(2000);
        for (let index = 1; index <= make_mb;) {
            if(!text(index).exists()){
                toastLog('当前页面没有'+index+"程序，请返回到home页");
                break;
            }else{
                text(index).click();
                text('输入手机号码').waitFor();
                ph = frist_phone();
                className('android.widget.EditText').find()[1].setText(ph);
                sleep(1000);
                text("获取验证码").click();
                fristyzm(ph);
                //填写信息
                while(1){
                    sleep(3000);
                    if(text('填写昵称').exists()){
                        toastLog('进入注册页');
                        mm_name = rand_name();
                        className('android.widget.EditText').find()[0].setText(mm_name);
                        sleep(1000);
                        click(90,672);
                        opention_birth();
                        let sexy = http.get(websever+'/api/index/return_sexy').body.string();
                        if(sexy=="女"){
                            click(204,891);//女姓
                        }else{
                            click(678,891);//男姓
                        }
                        sleep(1000)
                        text('下一步').click();
                        break;
                    }
                    //注册失败
                    if(text('消息').exists()){
                        toastLog('该手机号码注册过了');
                        let file_name = "/sdcard/手机注册失败列表.txt";
                        if(files.createWithDirs(file_name)){
                            log('手机注册失败列表');
                        }
                        if(files.exists(file_name)){
                            files.append(file_name,ph+"|注册失败 \r\n");
                        }
                        sleep(5000);
                        home();
                        sleep(3000);
                        appnames = getPackageName(index);
                        sleep(1000);
                        app.uninstall(appnames);
                        sleep(1000);
                        text('卸载').click();
                        sleep(5000);
                        //切换飞行模式
                        fly_model();
                        sleep(3000);
                        index++;
                        break;
                    }
                }
                sleep(1000);
                //选择照片
                while(1){
                    sleep(2000);
                    if(text('上传本人真实照片').exists()){
                        toastLog('界面：上传本人真实照片');
                        let tx = http.get(websever + "/system/index/return_tx").body.string();
                        var url =websever+tx;
                        imgname = (new Date).getTime();
                        if(url){
                            files.writeBytes("/sdcard/" + imgname+".jpg", http.get(url).body.bytes());
                            media.scanFile("/sdcard/" + imgname+".jpg");
                            toast("图片上传成功!");
                        }
                        sleep(1000);
                        click(315,603)//图片中心位置
                        sleep(3000);
                        click(373,244)//选择第一章图片
                        text('确认').waitFor();
                        sleep(1000);
                        text('确认').click();
                        sleep(1000);
                        text('完成').waitFor();//等待出现
                        sleep(1000);
                        text('完成').click();//点击完成
                        sleep(1000);
                        toastLog('第一次图片上传成功');
                        sleep(3000);
                        click(315,603)//图片中心位置
                        sleep(3000)
                        click(373,244)//选择第一章图片
                        text('确认').waitFor();
                        sleep(1000);
                        text('确认').click();
                        sleep(1000);
                        text('完成').waitFor();//等待出现
                        sleep(1000);
                        text('完成').click();//点击完成
                        sleep(3000);
                        text('完成进入').waitFor();
                        del_img();//删除图片
                        text('完成进入').click();
                        break;
                    }else{
                        toastLog('进入上传照片,请稍后3秒');
                        sleep(1000);
                    }
                }
                //进入消息页面
                while(1){
                    sleep(3000);
                    if(text('消息').exists()){
                        click(text('消息').findOne().bounds().centerX(),text('消息').findOne().bounds().centerY());
                            sleep(5000);
                            httpgetstatus();//赋值搜索账号
                            click(text('搜索').findOne().bounds().centerX(),text('搜索').findOne().bounds().centerY());
                            toastLog('搜索用户组');
                            className('android.widget.EditText').setText(sousuozhanghao);
                            sleep(5000);
                            click(138,387);//点击搜索用户组
                            toastLog('查找用户：'+sousuozhanghao)
                            sleep(10000);
                            back();//返回上一级
                            sleep(1000);
                            //在返回上一级
                            back();//
                            sleep(1000);
                            click(1000,158)//点击通讯录按钮
                            sleep(3000);
                            text('查看通讯录好友').waitFor();
                            text('查看通讯录好友').click();
                            toastLog('通讯录等待15秒，请稍后')
                            sleep(10000);
                            back();
                            sleep(2000);
                            back();
                            sleep(2000);
                            click(text('更多').findOne().bounds().centerX(),text('更多').findOne().bounds().centerY());
                            sleep(5000);
                            //编辑个人资料
                            text('查看或编辑个人资料').waitFor();
                            click(text('查看或编辑个人资料').findOne().bounds().centerX(),text('查看或编辑个人资料').findOne().bounds().centerY())
                            text('资料').waitFor();//等待资料出现
                            click(text('资料').findOne().bounds().centerX(),text('资料').findOne().bounds().centerY());
                            //上滑
                            swipe(500,1000,500,0,1000);  
                            sleep(2000);
                            momozhanghao =  className('android.widget.TextView').find()[19].text().split("：")[1];
                            toastLog('陌陌账号为：'+momozhanghao);                        
                           //
                            back();
                            sleep(2000);
                            swipe(500,1000,500,0,1000);
                            sleep(2000);
                            text('设置').waitFor();
                            click(text('设置').findOne().bounds().centerX(),text('设置').findOne().bounds().centerY())
                            sleep(2000);
                            text('设置').waitFor();
                            click(42,300);//点击账号与安全
                            sleep(3000);
                            text('密码修改').waitFor();
                            sleep(3000);
                            click(text('密码修改').findOne().bounds().centerX(),text('密码修改').findOne().bounds().centerY());
                            sleep(3000);
                            text('设置密码').waitFor();
                            
                            if(className('android.widget.EditText').find().size()==3){
                                back();//返回上一级;
                                sleep(2000);
                                back();
                                click(text('密码修改').findOne().bounds().centerX(),text('密码修改').findOne().bounds().centerY());
                            }
                            //获取密码
                            url = websever+'/api/index/setpwd';
                            res = http.get(url);
                            pwd = res.body.string();
                            className('android.widget.EditText').find()[0].setText(pwd);
                            //重复密码
                            sleep(1000);
                            className('android.widget.EditText').find()[1].setText(pwd);
                            goback_http = momozhanghao+'|'+pwd;
                            sleep(1000);
                            //写入到本地磁盘
                            let rizhi = '/sdcard/注册成功.txt';
                            if(files.createWithDirs(rizhi)){
                                log('创建注册成功文件');
                            }
                            if(files.exists(rizhi)){
                                let txt = momozhanghao+"----"+pwd+"|注册成功 \r\n";
                                files.append(rizhi,txt);
                            }
                            //点击修改
                            click(text('修改').findOne().bounds().centerX(),text('修改').findOne().bounds().centerY());
                            //回传致服务器
                            http.get(websever+'/api/index/fanhui?goback_http='+goback_http+'&mm_name='+mm_name);
                            sleep(1000);
                            click(756,1002);
                            toastLog('等待5秒退出');
                            sleep(5000);
                            home();
                            sleep(3000);
                            appnames = getPackageName(index);
                            sleep(1000);
                            app.uninstall(appnames);
                            sleep(1000);
                            text('卸载').click();
                            sleep(5000);
                            //切换飞行模式
                            fly_model();
                            sleep(3000);
                            index++;
                            break;
                    }else{
                        toast('等待3秒钟，查找消息栏');
                    }
                }
                
            }
        }
        sleep(2000);
        return true;
    }
}

//获取服务器女性名字
function rand_name(){
    let names = http.get(websever+'/api/index/getnames').body.string();
        return names;
}
function httpgetstatus(){
    try{
        sousuozhanghao = http.get(websever+'/api/index/getmomo').body.string();
    }catch(exp){
        toastLog("服务器：连接失败,脚本停止");
        exit()
    } 
}
//删除文件
function del_img(){
    url= "/sdcard/" + imgname+".jpg";
    threads.start(function(){
        if (files.remove(url)){
            log('图片删除成功')
        }else{
            log('图片删除失败')
        }
    })
}
/**
 * 生日
 */
function opention_birth(){
    //后台设置
    year = http.get(websever+'/api/index/getyear')
    year = year.body.string()
    if(year<0){
        //从上往下滑
            for(let i = 1;i<=Math.abs(year);i++){
                swipe(300,760,300,900,500)//年
                sleep(800)
                //log('当前年执行:'+i+'次')
            }
    }else{
            //从下往上滑
            for(let i = 1;i<=year;i++){
                swipe(300,900,300,760,500)//年
                sleep(800)
                //log('当前年执行:'+i+'次')
            }
    }
    sleep(800)
    month = http.get(websever+'/api/index/getmonth')
    month = month.body.string()
    for(let i = 1;i<=(13-Math.abs(month));i++){
        swipe(554,769,550,769,500)//月
        sleep(800)
        //log('当前月执行:'+i+'次')
    }
    sleep(800)
    day = http.get(websever+'/api/index/getday')
    day = day.body.string()
    for(let i = 1;i<=(31-Math.abs(day));i++){
        swipe(750,767,700,767,500)//日
        sleep(800)
        //log('当前日执行:'+i+'次')
    }
    sleep(1000)
    click(750,1260)//点击确定
    sleep(1000)
}
/**
 * 获取手机号码
 */
function frist_phone(){
    url = websever+'/api/index/getTelephone';
    res = http.get(url)
    if(res.statusCode >= 200 && res.statusCode < 300){
        let data = res.body.string().split('|')
        if(data[0] != 1){
            toastLog('接码获取手机号码:'+data[1]);
            return 0;
        }else{
            return data[1];
        }
    }  
}
/**
 * 获取验证码
 */
function fristyzm(dh){
    let url = websever+'/api/index/getmsg?dh='+dh;
    res = http.get(url);
    if(res.statusCode ==200){
        let data1 = res.body.string().split('|') 
        if(data1[0] == 0){
            toastLog('获取短信验证码:'+data1[1])
            if(data1[1]=='短信已取回或手机号已释放'){
                //重新运行陌陌
                toastLog('请重新运行软件原因:获取短信验证码:短信已取回或手机号已释放');
                exit();
            }else{
                sleep(5000);
                fristyzm (dh);
            }    
        }else{
            //返回验证码
            className('android.widget.EditText').setText(data1[1])
            return 1;
        }
    }
}