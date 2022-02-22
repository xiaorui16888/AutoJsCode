auto.waitFor();
if (currentPackage() == "com.android.settings") {
    sleep(500);
    back();
    sleep(500);
    back();
}
var val = 1;

function robust_http(URL) {
    while (true) {
        try {
            return http.get(URL);
        } catch (error) {
            sleep(500);
        }
    }
}

function httpMultiGet(urls) {
    var result = [];
    var count = threads.atomic();
    var resultDisposable = threads.disposable();

    function callbackForUrl(i) {
        return function(res, err) {
            if (err) {

                log(err);
                sleep(300);

                http.get(urls[i], {}, arguments.callee);
            } else {

                result[i] = res;

                if (count.incrementAndGet() == urls.length) {

                    resultDisposable.setAndNotify(result);
                }
            }
        }
    }
    for (var i = 0; i < urls.length; i++) {
        http.get(urls[i], {}, callbackForUrl(i));
    }

    return resultDisposable.blockedGet();

}
alert("欢迎使用龙小证之抢单大神，使用有疑问可关注微信公众号:龙小证 获得指导! \n\n  “生活总是充满希望的，成功总是属于积极进取、不懈追求的人们”");


var path = "/sdcard/龙小证Key.txt";//context.getFilesDir() + "/" + "key" + ".txt";
if (!files.exists(path)) {
    var user_data = new Array();

    user_data[0] = rawInput("请输入您的大龙钥匙，请谨慎操作，首次输入后将会保存，输入错误需要重新安装应用！输入错误龙小证无功能！");
    sleep(10000);
    user_data[1] = rawInput("请输入您的小龙钥匙，请谨慎操作，首次输入后将会保存，输入错误需要重新安装应用！输入错误龙小证无功能！");
    user_data[2] = rawInput("请输入当前所在城市，如果切换城市需要重新安装!");
   
    //log(files.ensureDir(context.getFilesDir() + "/down"));
    var path_w = "/sdcard/龙小证Key.txt";
    var file_w = open(path_w, "w");
    file_w.writelines(user_data);
    file_w.close();
    alert("保存成功！理论上一天可以免费侦测2000单，节约使用！！");
    var user_adata = new Array();
    var file_r = open(path, "r");
    user_adata = file_r.readlines();
    if (user_adata[0].length < 30 || user_adata[1].length < 30 || user_adata[1].indexOf("-") < 5) {
        alert("key不对，用不了!，重开后再输入");
        files.removeDir(path);
        exit();
    }
} else {

    var user_adata = new Array();
    var file_r = open(path, "r");
    user_adata = file_r.readlines();
}


var _log = log;
log = function(text) {
    _log(text);
    files.append("/sdcard/龙小证抢单日志.txt", text);
}

var s = 0;
var s_time = 0;
var my = 0;
var my_time = 0;
var home_disa = 0;
var home_disa_time = 0;
var p = 20;
var ps = 5;
var o = 100;
var radiom1 = 0;
var radiom2 = 0;
var start_p = "";
var end_p = "";
var time_s1 = "";
var time_s2 = "";
var shut = 0;
var path_f = context.getFilesDir();
var check_f = new Array();
var mmi_data = new Array();
var tip1,tip2,tip3,tip4,tip5,tip6,tip7,tip8,tip9,tip10;


check_f = files.listDir(path_f, function(name) {
    return name.endsWith(".txt");
});
if(check_f.length>0&&confirm("发现你保存过模版，是否需要加载？"+"\n\n"+"如果不加载可以从新配置，以便于增加新的模板！")){
var mmi = dialogs.singleChoice("龙小证发现你已经保存模板，请选择：",check_f, 0);
var path_mmi = context.getFilesDir() + "/" + check_f[mmi];
var file_r_mmi = open(path_mmi, "r");
mmi_data = file_r_mmi.readlines();

if(mmi_data[0]==0)
    tip1="实时参考";
    else
    tip1="固定参考";

if(mmi_data[1]==0)
    tip2="手动";
    else
    tip2="自动";

    
    
if(!confirm("该模板信息:"+"\n"+tip1+","+tip2+"\n参考点："+mmi_data[2]+"\n订单距离下限："+mmi_data[3]+"\n订单距离下限："+mmi_data[4]+"\n起点距参考点距离限制："+mmi_data[5]+"\n收益比："+mmi_data[6]+"\n是否设定区域限制："+mmi_data[7]+"\n限制区对角地点信息："+mmi_data[8]+"，"+mmi_data[9]+"\n\n确认则继续执行，否则停止！"))
    exit();

var method = parseInt(mmi_data[0]);
var method1 =parseInt(mmi_data[1]);
var home = mmi_data[2];


var dis_min = parseInt(mmi_data[3]);
var dis_max = parseInt(mmi_data[4]);
var dis_slo = parseInt(mmi_data[5]);
var radio = parseFloat(mmi_data[6]);

var handsome = mmi_data[7];

if (handsome) {
    var cuta = mmi_data[8];
    var cutb =mmi_data[9];
}

}
else
{


var method = dialogs.singleChoice("龙小证为你提供了两周距离参考策略，请选择：", ["订单起点距离参考当前实时位置", "订单起点距离参考固定位置坐标"], 1);
var method1 = dialogs.singleChoice("龙小证为你提供了两个抢单方法，请选择：", ["手动抢单，会有声音提示，通过地图说软件结果自己决定是否抢单", "自动抢单，程序直接根据策略分析抢单，但是由于地图信息的不确定性，有低概率错抢风险。"]);
var home = rawInput("固定地址作为距离参考，用于订单距离的参考，如果不需要固定位置就保持默认即可", "领秀慧谷");


var dis_min = rawInput("请输入预期订单的最短距离，单位为公里。小于这个里程的订单将被屏蔽。", 10);
var dis_max = rawInput("请输入预期订单的最远距离，单位为公里。大于这个里程的订单将被屏蔽。", 70);
var dis_slo = rawInput("请输入参考位置到起点的最远距离，超出该距离的单被过滤", 10);
var radio = rawInput("收益比定义:本单里程/起点到当前位置的距离，一般设置为1.0，如果需要收益更高可设置更大的数，但是符合要求的单会急剧减少。", "1.0");

var handsome = confirm("是否需要设置屏蔽区域？准备区域考虑为方形。确定屏蔽区域可以在屏蔽区域的左上角和右下角分别输入一个地点。订单如果落入这个区域就被过滤掉。");

if (handsome) {
    var cuta = rawInput("设置方形屏蔽区域左上角的一个地点。", "长河湾小区");
    var cutb = rawInput("设置方形屏蔽区域右下角的一个地点。", "弘善寺");
}
if(confirm("是否将这套配置保存为模版？请确认模板信息准确，一旦保存无法删除！")){
var d_name=rawInput("请输入模版名称，要保证自己可以记得哦！");
var path_w_mmi = context.getFilesDir() + "/" + d_name + ".txt";
var file_w_mmi = open(path_w_mmi, "w");
mmi_data[0]=String(method);
mmi_data[1]=String(method1);
mmi_data[2]=String(home);
mmi_data[3]=String(dis_min);
mmi_data[4]=String(dis_max);
mmi_data[5]=String(dis_slo);
mmi_data[6]=String(radio);
mmi_data[7]=String(handsome);
mmi_data[8]=String(cuta);
mmi_data[9]=String(cutb);
file_w_mmi.writelines(mmi_data);
file_w_mmi.close();

var path_mmi = context.getFilesDir() + "/" + d_name + ".txt";
var file_r_mmi = open(path_mmi, "r");
mmi_data = file_r_mmi.readlines();

var method = parseInt(mmi_data[0]);
var method1 =parseInt(mmi_data[1]);
var home = mmi_data[2];


var dis_min = parseInt(mmi_data[3]);
var dis_max = parseInt(mmi_data[4]);
var dis_slo = parseInt(mmi_data[5]);
var radio = parseFloat(mmi_data[6]);

var handsome = mmi_data[7];

if (handsome=="true") {
    var cuta = mmi_data[8];
    var cutb =mmi_data[9];
}
}
}

if (method == 0) {
    runtime.requestPermissions(["access_fine_location"]);
}


function dis_count(a, b, c, d, e, f, g, h) {
    var dis_c = robust_http("http://restapi.amap.com/v3/distance?origins=" + b + "," + a + "|" + d + "," + c + "|" + f + "," + e + "&destination=" + h + "," + g + "&output=json&key=" + user_adata[0]);
    var dis_value = dis_c.body.string();
    s = parseFloat(JSON.parse(dis_value).results[0].distance) / 1000;
    s = s.toFixed(2);
    my = parseFloat(JSON.parse(dis_value).results[1].distance) / 1000;
    my = my.toFixed(2);
    home_disa = parseFloat(JSON.parse(dis_value).results[2].distance) / 1000;
    home_disa = home_disa.toFixed(2);


    s_time = parseFloat(JSON.parse(dis_value).results[0].duration) / 60;
    s_time = s_time.toFixed(2);
    my_time = parseFloat(JSON.parse(dis_value).results[1].duration) / 60;
    my_time = my_time.toFixed(2);
    home_disa_time = parseFloat(JSON.parse(dis_value).results[2].duration) / 60;
    home_disa_time = home_disa_time.toFixed(2);



};

//var radio = parseInt(rawInput("收益比定义:本单里程/起点到当前位置的距离，一般设置为1.0，如果需要收益更高可设置更大的数，但是符合要求的单会急剧减少。", "1.0"));
var limit = 0;
var p = 20;
var map_name_start = "";
var map_name_end = "";
//var handsome = confirm("是否需要设置屏蔽区域？准备区域考虑为方形。确定屏蔽区域可以在屏蔽区域的左上角和右下角分别输入一个地点。订单如果落入这个区域就被过滤掉。");
if (handsome=="true") {
    //var cuta = rawInput("设置方形屏蔽区域左上角的一个地点。", "长河湾小区");
    //var cutb = rawInput("设置方形屏蔽区域右下角的一个地点。", "弘善寺");
    h = robust_http("http://restapi.amap.com/v3/geocode/geo?key=" + user_adata[0] + "&address=" + cuta + "&city=" + user_adata[2]);
    d = h.body.string();
    if (d.indexOf("too fast") > 0 || d.indexOf("Not found") > 0) {
        h = robust_http("http://apis.map.qq.com/ws/geocoder/v1/?address=终点地址:" + '"' + user_adata[2] + cuta + '"' + "&key=" + user_adata[1]);
        sleep(100);
        d = h.body.string();

        leftup_lat = parseFloat(JSON.parse(d).result.location.lat);
        leftup_lng = parseFloat(JSON.parse(d).result.location.lng);
    } else {

        leftup_lat = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[1]);
        leftup_lng = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[0]);
    }
    h = robust_http("http://restapi.amap.com/v3/geocode/geo?key=" + user_adata[0] + "&address=" + cutb + "&city=" + user_adata[2]);
    d = h.body.string();
    if (d.indexOf("too fast") > 0 || d.indexOf("Not found") > 0) {

        h = robust_http("http://apis.map.qq.com/ws/geocoder/v1/?address=终点地址:" + '"' + user_adata[2] + cutb + '"' + "&key=" + user_adata[1]);
        sleep(100);
        d = h.body.string();

        rightdown_lat = parseFloat(JSON.parse(d).result.location.lat);
        rightdown_lng = parseFloat(JSON.parse(d).result.location.lng);
    } else {

        rightdown_lat = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[1]);
        rightdown_lng = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[0]);

    }
    max_limit_lat = Math.max(leftup_lat, rightdown_lat);
    min_limit_lat = Math.min(leftup_lat, rightdown_lat);
    max_limit_lng = Math.max(leftup_lng, rightdown_lng);
    min_limit_lng = Math.min(leftup_lng, rightdown_lng);

}
h = robust_http("http://restapi.amap.com/v3/geocode/geo?key=" + user_adata[0] + "&address=" + home + "&city=" + user_adata[2]);
d = h.body.string();
if (d.indexOf("too fast") > 0 || d.indexOf('"count":"0"') > 0) {
    h = robust_http("http://apis.map.qq.com/ws/geocoder/v1/?address=终点地址:" + '"' + user_adata[2] + home + '"' + "&key=" + user_adata[1]);
    sleep(100);
    d = h.body.string();

    home_lat = parseFloat(JSON.parse(d).result.location.lat);
    home_lng = parseFloat(JSON.parse(d).result.location.lng);
} else {

    home_lat = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[1]);
    home_lng = parseFloat(JSON.parse(d).geocodes[0].location.split(",")[0]);
}

log("参考点位置:" + home_lat + "," + home_lng);
/*
var dis_min = parseInt(rawInput("请输入预期订单的最短距离，单位为公里。小于这个里程的订单将被屏蔽。", 10));
var dis_max = parseInt(rawInput("请输入预期订单的最远距离，单位为公里。大于这个里程的订单将被屏蔽。", 70));
var dis_slo = parseInt(rawInput("请输入参考位置到起点的最远距离，超出该距离的单被过滤", 10));
*/
var nowlat = 0;
var nowlng = 0;

sleep(100);

var counter = 0;

importClass(android.content.BroadcastReceiver);
importClass(android.content.Intent);
importClass(android.content.Context);
importClass(android.app.PendingIntent);
importClass(android.provider.Settings);
importClass(android.net.Uri);
importClass(android.content.IntentFilter);
importClass(android.location.LocationManager);
importClass(android.location.Location);
importClass(android.location.LocationListener);
importClass(android.location.Criteria);
if (!gpsIsOpen()) {
    openGPS();
}

locationListener = new LocationListener() {
    onLocationChanged(location) {}
}


function getLocation() {
    var mLocationManager = context.getSystemService(Context.LOCATION_SERVICE);
    var criteria = new Criteria();
    criteria.setAccuracy(Criteria.ACCURACY_FINE); //定位精度: 最高
    criteria.setAltitudeRequired(true); //海拔信息：不需要
    criteria.setBearingRequired(true); //方位信息: 不需要
    criteria.setCostAllowed(true); //是否允许付费
    criteria.setPowerRequirement(Criteria.POWER_LOW); //耗电量: 低功耗

    var provider = mLocationManager.getBestProvider(criteria, true); //获取GPS信息
    var location = mLocationManager.getLastKnownLocation(provider);
    mLocationManager.requestLocationUpdates(provider, 2000, 5, locationListener);
    return location;
}

function openGPS() {
    var settingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
    settingsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(settingsIntent);
} //打开gps

function gpsIsOpen() {
    var alm = context.getSystemService(Context.LOCATION_SERVICE);
    var bRet = true;
    if (!alm.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
        bRet = false;
    }
    return bRet;
} //判断gps是否打开

function count(start_lat, start_lng, end_lat, end_lng) {
    var radLat1 = start_lat * Math.PI / 180.0;
    var radLat2 = end_lat * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = start_lng * Math.PI / 180.0 - end_lng * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
var delta = 0;

function distance(start, end) {
    var myDate = new Date();
    var start_time = myDate.getTime();
    var start_lat = 0;
    var start_lng = 0;
    var end_lat = 0;
    var end_lng = 0;
    //id("main_order_map_handle").click();

    start_p = start;
    end_p = end;


    var res = httpMultiGet(["http://restapi.amap.com/v3/geocode/geo?key=" + user_adata[0] + "&address=" + start + "&city=" + user_adata[2], "http://apis.map.qq.com/ws/geocoder/v1/?address=终点地址:" + '"' + user_adata[2] + start + '"' + "&key=" + user_adata[1], "http://restapi.amap.com/v3/geocode/geo?key=" + user_adata[0] + "&address=" + end + "&city=" + user_adata[2], "http://apis.map.qq.com/ws/geocoder/v1/?address=终点地址:" + '"' + user_adata[2] + end + '"' + "&key=" + user_adata[1]]);

    var g_S = res[0].body.string();
    var t_S = res[1].body.string();
    var g_E = res[2].body.string();
    var t_E = res[3].body.string();


    if (g_S.indexOf('"count":"0"') > 0 || g_S.indexOf("too fast") > 0) {
        map_name_start = "T";
        start_lat = parseFloat(JSON.parse(t_S).result.location.lat);
        start_lng = parseFloat(JSON.parse(t_S).result.location.lng);
    } else {
        map_name_start = "G";
        start_lat = parseFloat(JSON.parse(g_S).geocodes[0].location.split(",")[1]);
        start_lng = parseFloat(JSON.parse(g_S).geocodes[0].location.split(",")[0]);
    }


    if (g_E.indexOf('"count":"0"') > 0 || g_E.indexOf("too fast") > 0) {
        map_name_end = "T";
        end_lat = parseFloat(JSON.parse(t_E).result.location.lat);
        end_lng = parseFloat(JSON.parse(t_E).result.location.lng);
    } else {
        map_name_end = "G";
        end_lat = parseFloat(JSON.parse(g_E).geocodes[0].location.split(",")[1]);
        end_lng = parseFloat(JSON.parse(g_E).geocodes[0].location.split(",")[0]);
    }



    if (handsome=="true") {
        if ((start_lat < max_limit_lat && start_lat > min_limit_lat && start_lng < max_limit_lng && start_lng > min_limit_lng) || (end_lat < max_limit_lat && end_lat > min_limit_lat && end_lng < max_limit_lng && end_lng > min_limit_lng)) {
            limit = 2;
        } else limit = 0;
    }

    dis_count(end_lat, end_lng, now_lat, now_lng, home_lat, home_lng, start_lat, start_lng);


    var myDate1 = new Date();
    var end_time = myDate1.getTime();
    delta = end_time - start_time;

    if (method == 0) {
        if (limit == 0 && s > dis_min && s < dis_max && (s / my) > radio && my < dis_slo) {

            shut = 1;

            log("0 实时位置参考开火!!!!!!\n");
            robust_http("http://restapi.amap.com/v3/ip?key=0019a76855d63c2090d6440624a788ca&ip=114.247.50.1");
            
            if (method1 == 1) {
                if (map_name_start == "G" && map_name_end == "G") {
                    media.playMusic("./1.mp3");
                    while (p--) {
                        press(xp, yp, 300);
                        if (text("正在抢单").exists())
                            break;
                    }
                    p = 20;
                    sleep(8000);
                } else
                    media.playMusic("./2.mp3");

            } else
                media.playMusic("./1.mp3");

            if (text("到达约定地点").exists()) {
                robust_http("http://restapi.amap.com/v3/ip?key=0019a76855d63c2090d6440624a788ca&ip=114.247.50.1");


                alert("抢到任务完成");

                exit();
            }
        } else {
            id("title_view_image").click();
            log("\n区域限制标志位:" + limit + "\n");

        }
    }
    //参考固定位置坐标
    if (method == 1) {
        if (limit == 0 && s > dis_min && s < dis_max && (s / home_disa) > radio && home_disa < dis_slo) {

            shut = 1;

            log("1 固定位置参考开火!!!!!!\n");
            robust_http("http://restapi.amap.com/v3/ip?key=0019a76855d63c2090d6440624a788ca&ip=114.247.50.1");

            if (method1 == 1) {

                if (map_name_start == "G" && map_name_end == "G") {
                    media.playMusic("./1.mp3");

                    while (p--) {
                        press(xp, yp, 300);
                        if (text("正在抢单").exists())
                            break;
                    }
                    p = 20;
                    sleep(8000);
                } else
                    media.playMusic("./2.mp3");

            } else
                media.playMusic("./1.mp3");


            if (text("到达约定地点").exists()) {

                robust_http("http://restapi.amap.com/v3/ip?key=0019a76855d63c2090d6440624a788ca&ip=114.247.50.1");

                alert("抢到任务完成");

                sleep(100);

                exit();
            }
        } else {
            id("title_view_image").click();
            log("区域限制标志位:" + limit + "\n");
        }
    }

    sleep(100);

    log("抢单时间: " + delta + "ms\n");
    if (handsome == 1)
        log("区域边界[" + min_limit_lat + "," + max_limit_lat + "]" + "   " + "区域经度边界条件[" + min_limit_lng + "," + max_limit_lng + "]\n");
    log(getNowFormatDate() + " " + map_name_start + "|" + map_name_end + " 起点 " + start_lat + " " + start_lng + "          " + " 终点 " + end_lat + " " + end_lng + "  ");
    log("起点地址: " + start + "          " + "终点地址: " + end + " ");
    log("订单里程: " + s + " Km  ");
    if (method == 0) {
        log("当前-起点: " + my + " Km " + "   收益比 " + (s / my).toFixed(2) + "  ");
        radiom1 = (s / my).toFixed(2);
    }
    if (method == 1) {
        log(home + "-起点: " + home_disa + " Km " + "   收益比 " + (s / home_disa).toFixed(2) + "  ");

        radiom2 = (s / home_disa).toFixed(2);
    }
    log("订单需求时间: " + time_s1 + time_s2 + " ");

}

log("龙小证准备好了\n");
log("固定参考点位置>" + home + "\n");
launchApp("滴滴车主");
text("听单中").waitFor();
var xp = text("听单中").findOne().bounds().centerX();
var yp = text("听单中").findOne().bounds().centerY();
log("点击坐标:" + xp + "," + yp + "\n");

threads.start(function() {
    //floaty.rawWindow
    var window = floaty.rawWindow(
        <frame gravity="center">
        <text id="text" textSize="18sp" textColor="#00FF00" bg="#000000" alpha="1"/>
    </frame>
    );
    window.setSize(800, 1600);
    window.setTouchable(false);
    //window.setPosition(100, device.height / 5);
    window.exitOnClose();
    window.text.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });

    setInterval(() => {
        //对控件的操作需要在UI线程中执行
        ui.run(function() {
            window.text.setText(dynamicText());
            if (shut == 1)
                window.text.alpha = "0.1";
            else if (val % 2 != 0)
                window.text.alpha = "1";
            if (shut == 0&& val % 2 != 0 )
                window.text.alpha = "1";



        });
    }, 300);

    function dynamicText() {
        var str = util.format("\n抢单大神参考:" + home + "\n\n");
        str += "启程：" + time_s1 + time_s2 + " " + map_name_start + "|" + map_name_end + " " + limit + "\n";
        str += "\n起点: " + start_p + "\n\n";
        str += "终点: " + end_p + "\n";
        str += "\n里程: " + s + "km  " + +s_time + "分\n\n";
        if (shut == 1)
            str += "*****中奖啦*****\n";

        if (method == 1)
            str += "定点-起点: " + home_disa + "km  " + home_disa_time + "分 " + "\n收益比" + radiom2 + "\n";

        else
            str += "实时-起点: " + my + "km  " + +my_time + "分 " + "\n收益比" + radiom1 + "\n";

        str += "\n累积" + counter + "单 " + "速度:" + delta + "ms";
        return str;
    }
    //events.setKeyInterceptionEnabled(true)
    events.observeKey();

    events.onKeyDown("volume_down", function(event) {
        val++;
        if (val % 2 == 0)
            window.text.alpha = "0.1";
    });


});


while (1) {
    shut = 0;
    if (text("用车").exists()) {
        id("main_order_map_handle").click();
        if (method == 0) {
            mLocation = getLocation();
            now_lat = mLocation.getLatitude();
            now_lng = mLocation.getLongitude();
        } else {
            now_lat = 39.90886;
            now_lng = 116.39739; //强制设定为天安门

        }

        if (id("order_card_fragment_key_info_1").exists()) {
            time_s1 = id("order_card_fragment_key_info_1").findOne().text();
            time_s2 = id("order_card_fragment_key_info_2").findOne().text();
        } else {
            time_s1 = "<1小时";
            time_s2 = " ";
        }

        distance(id("text_order_card_ordinary_area_address_start").findOne().text().replace(/\[|]/g, ''), id("text_order_card_ordinary_area_address_end").findOne().text().replace(/\[|]/g, ''));


        log("***** 累积" + counter++ + "单 *****");
        while (!text("听单中").exists())
            sleep(1000);
    }
    sleep(100);
}