/**
 * QQ跳码注册陌陌稳定版
 * auth:ydy
 * QQ398123186
 */
auto();//开启无障碍模式
var y = 1058//设置滑动按钮高度
//Q跳注册陌陌
websever = 'http://39.96.39.174';
let qqhao;
let qqpwd;
let imgname;
let shebeiinfo;
let imei ;
let sousuozhanghao = http.get(websever+'/api/index/getmomo').body.string()

main();
//主程序
function main(){
    while(true){
        openwuji();//打开无极
        sleep(2000)
        //打开沙盒
        if(openshahe()==false){
            continue;
        }
        sleep(1000);
        if( gaiji()==false){
            //修改机型
            continue;
        }
        sleep(1000);
        clearQQ();//清除QQ数据
        if(run_qq()==false){
            continue ;
        }
        sleep(2000)
        //第二次打开
        if(openshahe()==false){
            continue;
        }
        sleep(1000);
        cleraMM();
        sleep(2000);
        //打开陌陌
        if(run_momo()==false){
            continue;
        }
        sleep(3000)
    }
}

function run_momo(){
    try{
        id("appIcon").waitFor();//等待出现
        id("appIcon").find()[1].click();
        text('输入手机号码').waitFor()
        sleep(2000);
        click(472,1625);
        text('QQ登录').waitFor();
        if(text('授权并登录').exists()||text('登录').exists()){
            className('android.widget.Button').click()
            sleep(8000);
            if(text('下一步').exists()){
                toastLog('进入填写陌陌资料');
                sleep(2000)
                click(90,672);
                opention_birth();
                click(204,891)//选择性别
                text('下一步').waitFor();
                sleep(2000);
                click(text("下一步").findOne().bounds().centerX(),text("下一步").findOne().bounds().centerY())
            }else{
                toastLog('QQ号:'+qqhao+',已注册过陌陌');
                return false;
            }
        }
        sleep(3000)
        text('绑定手机').waitFor();
        text('跳过').click()
        sleep(3000);
        if(text('跳过').exists()){
            text('跳过').click();
        }
        sleep(2000)
        if(text('消息').exists()){
            click(text('消息').findOne().bounds().centerX(),text('消息').findOne().bounds().centerY());
            sleep(5000)
            click(text('搜索').findOne().bounds().centerX(),text('搜索').findOne().bounds().centerY());
            toastLog('搜索用户组')
            Text(sousuozhanghao);
            sleep(5000)
            click(138,387)//点击搜索用户组
            toastLog('查找用户：'+sousuozhanghao)
            sleep(10000)
            back()//返回上一级
            sleep(5000)
            //在返回上一级
            back()//
            sleep(5000)
            click(text('更多').findOne().bounds().centerX(),text('更多').findOne().bounds().centerY())
            sleep(5000)
            //编辑个人资料
            text('查看或编辑个人资料').waitFor();
            click(text('查看或编辑个人资料').findOne().bounds().centerX(),text('查看或编辑个人资料').findOne().bounds().centerY())
            text('资料').waitFor();//等待资料出现
            click(text('资料').findOne().bounds().centerX(),text('资料').findOne().bounds().centerY())
            //上滑
            swipe(500,1000,500,0,1000)    
            sleep(3000)
            momozhanghao =  className('android.widget.TextView').find()[19].text().split("：")[1]
            toastLog('陌陌账号为：'+momozhanghao)
            sleep(2000)
            back();
            sleep(2000)
            swipe(500,1000,500,0,1000)
            sleep(2000)
            text('设置').waitFor();
            click(text('设置').findOne().bounds().centerX(),text('设置').findOne().bounds().centerY())
            sleep(2000)
            text('设置').waitFor();
            click(42,300)//点击账号与安全
            sleep(5000)
            text('密码修改').waitFor();
            click(text('密码修改').findOne().bounds().centerX(),text('密码修改').findOne().bounds().centerY());
            sleep(3000)
            text('设置密码').waitFor();
            if(className('android.widget.EditText').find().size()==3){
                back();//返回上一级;
                sleep(2000)
                back();
                click(text('密码修改').findOne().bounds().centerX(),text('密码修改').findOne().bounds().centerY());
            }
            //获取密码
            url = websever+'/api/index/setpwd';
            res = http.get(url);
            pwd = res.body.string()
            Text(pwd)
            //重复密码
            sleep(5000)
            click(30,519);
            Text(pwd);
            goback_http = momozhanghao+'|'+pwd;
            toastLog(goback_http);
            sleep(5000)
            //点击修改
            click(text('修改').findOne().bounds().centerX(),text('修改').findOne().bounds().centerY())
            //回传致服务器
            http.get(websever+'/api/index/fanhui?goback_http='+goback_http+'&name=yushenggongzuoshi&jx='+shebeiinfo+'&imei='+imei)
            sleep(3000)
            click(756,1002)
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}

//QQ登陆
function run_qq(){
   try{
        id("appIcon").waitFor();//等待出现
        id("appIcon").find()[0].click();
        text('登 录').waitFor()//QQ出现登陆
        text('登 录').click();
        //获取服务器账号密码
        while(getqq_number()==0){
            toastLog('服务器上暂无可用的QQ号');
            sleep(3000);
            getqq_number()
        }
        text('QQ号/手机号/邮箱').waitFor();
        text('QQ号/手机号/邮箱').click();
        Text(qqhao)
        sleep(3000)
        desc('密码 安全').click()//点击密码栏
        Text(qqpwd)
        sleep(3000);
        text('登 录').click()
        sleep(10000);
        if(text('拖动下方滑块完成拼图').exists()){
                text('拖动下方滑块完成拼图').waitFor();
                toastLog('开始滑块');
                
                sleep(3000)
                if(!requestScreenCapture()) {
                    alert("请求截图权限失败！");
                    exit();
                }
                if(!start()){
                    //如果滑块未成功请手动滑块
                }
                sleep(3000)
                while(text('拖动下方滑块完成拼图').exists()){
                    //没有跳过滑块
                    sleep(3000);
                    toastLog('请手动完成本次滑块操作');
                }
                if(text('确定').exists()){
                    text('确定').click();
                    sleep(1000)
                    text('登 录').click()
                    sleep(10000)
                    text('拖动下方滑块完成拼图').waitFor();

                    if(!requestScreenCapture()) {
                        alert("请求截图权限失败！");
                        exit();
                    }
                    while(!start()){}//滑块致完工
                    sleep(5000)
                    while(text('拖动下方滑块完成拼图').exists()){
                        //没有跳过滑块
                        sleep(3000);
                        toastLog('请手动完成本次滑块操作');
                    }
                }   
        }

        if(text('取消').exists()){
                text('取消').click();
                return false;
            }
        sleep(3000)
        if(text('绑定手机号码').exists()){
                text('绑定手机号码').waitFor();
                text('关闭').click();
        }
        sleep(3000)
        if(text('通讯录').exists()){
                text('通讯录').waitFor();
                text('关闭').click();
        }
        toastLog('进入QQ主界面;等待5秒上传照片');
        rand_img();
        sleep(5000);
        let qqimg = className('android.widget.FrameLayout').find()[7];
        click(qqimg.bounds().centerX(),qqimg.bounds().centerY())//点击侧边栏
        //等待出现
        click(className('android.widget.FrameLayout').find()[5].bounds().centerX(),className('android.widget.FrameLayout').find()[5].bounds().centerY());
        if(text('QQ身份证').exists()){
            text('QQ身份证') .waitFor();
            desc('关闭按钮').click();
        }
        //加载数据
        sleep(10000)
        text('编辑资料').waitFor();
        text('编辑资料').click();
        toastLog('进入编辑资料');
        sleep(3000)
        text('编辑资料').waitFor();
        //点击头像
        click(0,558);
        toastLog('进入头像挂件');
        //等待选项
        text('从相册选择图片').waitFor();
        Tap(0,1290)//点击从相册选择图片
        text('相册').waitFor();
        toastLog('默认选择第一张照片');
        click(className('android.widget.ImageView').find()[0].bounds().centerX(),
            className('android.widget.ImageView').find()[0].bounds().centerY());
        sleep(3000)
        text('完成').waitFor();
        text('完成').click();
        //删除下载图片
        toastLog('等待3秒,正在删除图片......')
        del_img();
        sleep(3000);
        text('头像挂件').waitFor();
        text('返回').click();
        sleep(3000)
        text('编辑资料').waitFor();
        click(885,className('android.widget.EditText').find()[0].bounds().centerY())
        toastLog("删除昵称")
        for(let t=10;t>0;t--){
            sleep(1000)
            KeyCode("KEYCODE_DEL")
        }
        sleep(8000)
        setClip(rand_name());
        className('android.widget.EditText').find()[0].paste()
        //返回保存
        sleep(2000)
        text('返回').click();//保存
        toastLog('QQ信息修改成功');
        sleep(2000)
        text('返回').click();//保存
        sleep(2000)
        text('设置').waitFor();
        click(60,1820)
        sleep(2000)
        text('设置').waitFor();
        click(text('帐号、设备安全').findOne().bounds().centerX(),text('帐号、设备安全').findOne().bounds().centerY())
        sleep(3000)//记住机型
        shebeiinfo = className('android.widget.TextView').find()[7].text();
        toastLog('机型:'+shebeiinfo);
        home();
        sleep(3000)
    }catch(e){
        return false;
    }
}

//获取服务器女性名字
function rand_name(){
    let names = http.get(websever+'/api/index/getnames').body.string()
        return names;
}

//设置陌陌生日
function opention_birth(){
    //后台设置
    year = http.get(websever+'/api/index/getyear')
    year = year.body.string()
    if(year<0){
        //从上往下滑
            for(let i = 1;i<=Math.abs(year);i++){
                swipe(300,760,300,900,2000)//年
                sleep(800)
                //log('当前年执行:'+i+'次')
            }
    }else{
            //从下往上滑
            for(let i = 1;i<=year;i++){
                swipe(300,900,300,760,2000)//年
                sleep(800)
                //log('当前年执行:'+i+'次')
            }
    }
    sleep(1000)
    month = http.get(websever+'/api/index/getmonth')
    month = month.body.string()
    for(let i = 1;i<=(13-Math.abs(month));i++){
        swipe(554,769,550,769,2000)//月
        sleep(800)
        //log('当前月执行:'+i+'次')
    }
    sleep(1000)
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

//打开沙盒
function openshahe(){
    app.launch("com.dobe.sandbox");
    sleep(2000)
    if(text('机智沙盒').exists()){
        toastLog('打开沙盒')
        return true
    }else{return false}
   
}

//一键vpn
function yjvpn(){
    app.launch("com.leteng.ltproxy");
    toastLog('正在换ip中，请稍后');
    sleep(5000);
    id('bt_change_ip').click();
    sleep(15000)
    toastLog('ip更换成功')
}

//一键新机
function gaiji(){
    if(id("download_device").exists()){
        sleep(2000)
        id("download_device").findOne().click()
        sleep(2000)
        if(className('android.widget.TextView').find()[2].text()=='修改设备'){
            var xiugaishebei = className('android.widget.TextView').find()[2];
            click(xiugaishebei.bounds().centerX(), xiugaishebei.bounds().centerY());
            sleep(2000)
            if(className("android.widget.Button").exists()){
                className("android.widget.Button").findOne().click();
                className("android.widget.TextView").indexInParent(4).waitFor();
                //等待控件出现
                toastLog('修改设备成功')
                sleep(1000);
                back();
                sleep(1000);
                back();
                sleep(1000)
            }else{
                toastLog('修改设备失败');
                return false;
            }
        }
    }
    //二次清机
    sleep(2000)
    if(id("download_device").exists()){
        sleep(2000)
        id("download_device").findOne().click()
        sleep(2000)
        if(className('android.widget.TextView').find()[2].text()=='修改设备'){
            var xiugaishebei = className('android.widget.TextView').find()[2];
            click(xiugaishebei.bounds().centerX(), xiugaishebei.bounds().centerY());
            sleep(2000)
            if(className("android.widget.Button").exists()){
                className("android.widget.Button").findOne().click();
                //等待控件出现
                toastLog('修改设备成功')
                className("android.widget.TextView").indexInParent(4).waitFor();
                sleep(3000)
                imei = className('android.widget.TextView').find()[2].text();
                toastLog('设备号:'+imei);
                sleep(1000);
                back();
                sleep(1000);
                back();
                sleep(1000)
            }
        }
    }
}

//点击momo上角的三个点--清除数据
function cleraMM(){ 
    id("context_menu").find()[1].click()
    id("kill").waitFor();
    //点击关闭进程
    id("kill").findOne().click();
    id("btnPositive").waitFor();
    id("btnPositive").findOne().click();
    sleep(5000)
    id("context_menu").find()[1].click()
    id("wipe").waitFor();
    id("wipe").findOne().click();
    id("btnPositive").waitFor();
    id("btnPositive").findOne().click();
    toastLog('陌陌数据清理');
    sleep(2000);
}

//清除QQ上角的三个点--清楚数据
function clearQQ(){
    id("context_menu").find()[0].click()
    id("kill").waitFor();
    //点击关闭进程
    id("kill").findOne().click();
    id("btnPositive").waitFor();
    id("btnPositive").findOne().click();
    toastLog('QQ进程关闭');
    sleep(5000)
    id("context_menu").find()[0].click()
    id("wipe").waitFor();
    id("wipe").findOne().click();
    id("btnPositive").waitFor();
    id("btnPositive").findOne().click();
    toastLog('QQ数据清理');
    sleep(2000);
}
//切换无极vpn
function openwuji(){
    app.launch("org.wuji");
    sleep(2000)
    click(500,1350);
    sleep(3000)
}


//获取服务器QQ号码
function getqq_number(){
    let url = websever+'/api/index/getqq';
    let res = http.get(url).body.string()
    if(res!=0){
        qqhao =res.split('|')[0];
        qqpwd =res.split('|')[1];
        return true;
    }else{
        //
        log('服务器暂无可使用的QQ号');
        return false;
    }
    
}

function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else {
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
    
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

function start() {
    
    for(var i=0;i<0;i++){sleep(1000);log(i);}
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
    }
    var x = discernSlidingblock(img, device.width) + 65
    console.info("识别结果滑块X坐标：" + x);

    if (x > -1) {
        randomSwipe(220, y, x, y)
        return true;
    } else {
        return false;
        console.log("识别有误，请确认是否在滑块界面");
    }
}

function bezierCreate(x1,y1,x2,y2,x3,y3,x4,y4){
    //构建参数
    var h=100;
    var cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
    
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++){
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
    
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        var t=dt*i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    //轨迹转路数组
    var array=[];
    for (var i = 0;i<curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    
    return array
}

/**
 * 真人模拟滑动函数
 * 
 * 传入值：起点终点坐标
 * 效果：模拟真人滑动
 */
function randomSwipe(sx,sy,ex,ey){
    //设置随机滑动时长范围
    var timeMin=1000
    var timeMax=3000
    //设置控制点极限距离
    var leaveHeightLength=500
    
    //根据偏差距离，应用不同的随机方式
    if(Math.abs(ex-sx)>Math.abs(ey-sy)){
        var my=(sy+ey)/2
        var y2=my+random(0,leaveHeightLength)
        var y3=my-random(0,leaveHeightLength)
    
        var lx=(sx-ex)/3
        if(lx<0){lx=-lx}
        var x2=sx+lx/2+random(0,lx)
        var x3=sx+lx+lx/2+random(0,lx)
    }else{
        var mx=(sx+ex)/2
        var y2=mx+random(0,leaveHeightLength)
        var y3=mx-random(0,leaveHeightLength)

        var ly=(sy-ey)/3
        if(ly<0){ly=-ly}
        var y2=sy+ly/2+random(0,ly)
        var y3=sy+ly+ly/2+random(0,ly)
    }

    //获取运行轨迹，及参数
    var time=[0,random(timeMin,timeMax)]
    var track=bezierCreate(sx,sy,x2,y2,x3,y3,ex,ey)
    
    log("随机控制点A坐标："+x2+","+y2)
    log("随机控制点B坐标："+x3+","+y3)
    log("随机滑动时长："+time[1])
    
    //滑动
    gestures(time.concat(track))
}

function rand_img(){
    //从服务器上下载图片
    let tx = http.get(websever + "/system/index/return_tx").body.string();
    var url =websever+tx;
    //保存到路径/sdcard/auto.js.png
    threads.start(function(){
        imgname = (new Date).getTime();
        if(url){
            files.writeBytes("/sdcard/" + imgname+".jpg", http.get(url).body.bytes());
            media.scanFile("/sdcard/" + imgname+".jpg");
            toast("图片上传成功!");
        }
    });
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