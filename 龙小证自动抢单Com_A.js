var _log = log;
log = function(text) {
  _log(text);
  files.append("/sdcard/龙小证抢单日志.txt", text);
}

var home = rawInput("家的地址，用于订单距离的参考。", "领秀慧谷");
var radio = parseInt(rawInput("收益比定义:本单里程/起点到当前位置的距离，一般设置为1.0，如果需要收益更高可设置更大的数，但是符合要求的单会急剧减少。", "1.0"));
var limit = 0;
var p = 20;
var choice_rule=confirm("订单距离与固定地点参考,还是与实时刷新的当前位置参考？确定为前置，取消为后者！")


var handsome = confirm("是否需要设置屏蔽区域？准备区域考虑为方形。确定屏蔽区域可以在屏蔽区域的左上角和右下角分别输入一个地点。订单乎迟点如果落入这个区域就被过滤掉。");
if (handsome) {
  var cuta = rawInput("设置方形屏蔽区域左上角的一个地点。", "长河湾小区");
  var cutb = rawInput("设置方形屏蔽区域右下角的一个地点。", "弘善寺");
  h = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + cuta);
  d = h.body.string();
  if(d.indexOf("Not found")>0){
  do {
    h = http.get("http://api.map.baidu.com/geocoder?address=" + cuta + "北京");
    sleep(100);
    d = h.body.string();
  }while (d.indexOf("INVALID_PARAMETERS") > 0);
  log(d);
  leftup_lat = parseFloat(d.match(/lat(\S*)lat/)[1].match(/>(\S*)</)[1]);
  leftup_lng = parseFloat(d.match(/lng(\S*)lng/)[1].match(/>(\S*)</)[1]);
  }else{
    log(d);
  leftup_lat = parseFloat(JSON.parse(d).data.tip_list[0].tip.y);
  leftup_lng = parseFloat(JSON.parse(d).data.tip_list[0].tip.x);
  }
  h = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + cutb);
  d = h.body.string();
  if(d.indexOf("Not found")>0){
  do {
    h = http.get("http://api.map.baidu.com/geocoder?address=" + cutb + "北京");
    sleep(100);
    d = h.body.string();
  }while (d.indexOf("INVALID_PARAMETERS") > 0);
  log(d);
  rightdown_lat = parseFloat(d.match(/lat(\S*)lat/)[1].match(/>(\S*)</)[1]);
  rightdown_lng = parseFloat(d.match(/lng(\S*)lng/)[1].match(/>(\S*)</)[1]);
}else{
  log(d);
  rightdown_lat = parseFloat(JSON.parse(d).data.tip_list[0].tip.y);
  rightdown_lng = parseFloat(JSON.parse(d).data.tip_list[0].tip.x);
}
  max_limit_lat = Math.max(leftup_lat, rightdown_lat);
  min_limit_lat = Math.min(leftup_lat, rightdown_lat);
  max_limit_lng = Math.max(leftup_lng, rightdown_lng);
  min_limit_lng = Math.min(leftup_lng, rightdown_lng);

}
h = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + home);
d = h.body.string();
if(d.indexOf("Not found")>0){
do{
  h = http.get("http://api.map.baidu.com/geocoder?address=" + home+"北京");
  sleep(100);
  d = h.body.string();
} while (d.indexOf("INVALID_PARAMETERS") > 0);
log(d);
home_lat = parseFloat(d.match(/lat(\S*)lat/)[1].match(/>(\S*)</)[1]);
home_lng = parseFloat(d.match(/lng(\S*)lng/)[1].match(/>(\S*)</)[1]);
}
else{
    log(d);
home_lat = parseFloat(JSON.parse(d).data.tip_list[0].tip.y);
home_lng = parseFloat(JSON.parse(d).data.tip_list[0].tip.x);
}
log(home + "|" + home_lat + "|" + home_lng);
var dis_min = parseInt(rawInput("请进入预期订单的最短距离，单位为公里。小于这个里程的订单将被屏蔽。", 10));
var dis_max = parseInt(rawInput("请进入预期订单的最远距离，单位为公里。大于这个里程的订单将被屏蔽。", 70));
var nowlat = 0;
var nowlng = 0;
console.show();
sleep(100);
console.setSize(device.width, device.height / 1.3);
console.setPosition(0, (device.height / 2) - 800);
var counter = 0;
console.show();
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
  s = s * 6378.137; // EARTH_RADIUS;
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

function distance(start, end) {
  var myDate = new Date();
  var start_time = myDate.getTime();
  var start_lat = 0;
  var start_lng = 0;
  var end_lat = 0;
  var end_lng = 0;

  r = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + start );
  k = r.body.string();
  if(k.indexOf("Not found")>0){
  do{
    r = http.get("http://api.map.baidu.com/geocoder?address=" + start + "北京");
    sleep(100);
    k = r.body.string();
  }while (k.indexOf("INVALID_PARAMETERS") > 0);
   
  log(k);
  start_lat = parseFloat(k.match(/lat(\S*)lat/)[1].match(/>(\S*)</)[1]);
  start_lng = parseFloat(k.match(/lng(\S*)lng/)[1].match(/>(\S*)</)[1]);
}
else{
    log(k);
  start_lat = parseFloat(JSON.parse(k).data.tip_list[0].tip.y);
  start_lng = parseFloat(JSON.parse(k).data.tip_list[0].tip.x);
}

  w = http.get("https://ditu.amap.com/service/poiTipslite?&city=110000&type=dir&words=" + end );
  j = w.body.string();
  if(j.indexOf("Not found")>0){
  do{
    w = http.get("http://api.map.baidu.com/geocoder?address=" + end + "北京");
    sleep(100);
    j = w.body.string();
  }while (j.indexOf("INVALID_PARAMETERS") > 0);
  log(j);
  end_lat = parseFloat(j.match(/lat(\S*)lat/)[1].match(/>(\S*)</)[1]);
  end_lng = parseFloat(j.match(/lng(\S*)lng/)[1].match(/>(\S*)</)[1]);
} 
    else{
log(j);
  end_lat = parseFloat(JSON.parse(j).data.tip_list[0].tip.y);
  end_lng = parseFloat(JSON.parse(j).data.tip_list[0].tip.x);
}

if (choice_rule){
    if (limit == 0 && s > dis_min && s < dis_max && (s / my) > radio) {
        console.hide();
        log("开火!!!");
        while (0) {
          press(xp, yp, 300);
        }
        p = 20;
        sleep(7000);
        if (text("到达约定地点").exists()) {
          alert("抢到任务完成");
          console.show();
          sleep(100);
          console.setSize(device.width, device.height / 1.3);
          console.setPosition(0, (device.height / 2) - 800);
          exit();
        }
      } else {
        id("title_view_image").click();
        log("\n区域限制标志位:" + limit + "\n");
    
      }
}else{
    if (limit == 0 && s > dis_min && s < dis_max && (s / my) > radio) {
        console.hide();
        log("开火!!!");
        while (0) {
          press(xp, yp, 300);
        }
        p = 20;
        sleep(7000);
        if (text("到达约定地点").exists()) {
          alert("抢到任务完成");
          console.show();
          sleep(100);
          console.setSize(device.width, device.height / 1.3);
          console.setPosition(0, (device.height / 2) - 800);
          exit();
        }
      } else {
        id("title_view_image").click();
        log("\n区域限制标志位:" + limit + "\n");
    
      }


}

if (handsome) {
    if ((start_lat < max_limit_lat && start_lat > min_limit_lat && start_lng < max_limit_lng && start_lng > min_limit_lng) || (end_lat < max_limit_lat && end_lat > min_limit_lat && end_lng < max_limit_lng && end_lng > min_limit_lng)) {
      limit = 2;
      log("区域纬度边界条件[" + min_limit_lat + "," + max_limit_lat + "]" + "          " + "区域经度边界条件[" + min_limit_lng + "," + max_limit_lng + "]\n");
    } else {
      limit = 0;
      log("区域纬度边界条件[" + min_limit_lat + "," + max_limit_lat + "]" + "          " + "区域经度边界条件[" + min_limit_lng + "," + max_limit_lng + "]\n");
    }
  }
  var s = count(start_lat, start_lng, end_lat, end_lng);
  var my = count(start_lat, start_lng, now_lat, now_lng);
  var home_disa = count(start_lat, start_lng, home_lat, home_lng);
  var home_dis = count(home_lat, home_lng, end_lat, end_lng);
  log("起点" + start_lat + "|" + start_lng + "          " + "终点" + end_lat + "|" + end_lng + "\n");
  log("起点地址：" + start + "          " + "终点地址:" + end + "\n");
  log("当前订单直线里程：" + s + " Km  ");
  log("当前位置距离起点：" + my + " Km " + "   收益比 " + (s / my).toFixed(2) + "  ");
  log("[家距离起点]：" + home_disa + " Km   ");
  log("[家距离终点]：" + home_dis + " Km    ");
  console.info("当前订单直线里程：" + s + "Km");
  console.error("当前位置距离起点：" + my + "Km " + "\n收益比" + (s / my).toFixed(2));
  console.log("[家距离起点]：" + home_disa + "Km");
  console.log("[家距离终点]：" + home_dis + "Km");
  if (limit == 0 && s > dis_min && s < dis_max && (s / my) > radio) {
    console.hide();
    log("开火!!!");
    while (0) {
      press(xp, yp, 300);
    }
    p = 20;
    sleep(7000);
    if (text("到达约定地点").exists()) {
      alert("抢到任务完成");
      console.show();
      sleep(100);
      console.setSize(device.width, device.height / 1.3);
      console.setPosition(0, (device.height / 2) - 800);
      exit();
    }
  } else {
    id("title_view_image").click();
    log("\n区域限制标志位:" + limit + "\n");

  }
  var myDate1 = new Date();
  var end_time = myDate1.getTime();
  var delta = end_time - start_time;
  console.show();
  sleep(100);
  console.setSize(device.width, device.height / 1.3);
  console.setPosition(0, (device.height / 2) - 800);
  log("抢单反应时间:" + delta + "ms\n");
  log("当前位置纬度:" + mLocation.getLatitude() + " 经度:" + mLocation.getLongitude() + "\n");
}

log("龙小证准备好了\n");
log("我家住在>" + home + "\n");
launchApp("滴滴车主");
text("听单中").waitFor();
var xp = text("听单中").findOne().bounds().centerX();
var yp = text("听单中").findOne().bounds().centerY();
log("点击坐标:" + xp + "," + yp + "\n");
while (1) {
  if (text("预约单").exists()) {
    mLocation = getLocation();
    now_lat = mLocation.getLatitude();
    now_lng = mLocation.getLongitude();
    distance(id("text_order_card_ordinary_area_address_start").findOne().text(), id("text_order_card_ordinary_area_address_end").findOne().text());
    log(getNowFormatDate() + "累积抢单" + counter++ + "单\n*******************************************************\n");
    while (!text("听单中").exists())
      sleep(1000);
  }
  sleep(100);
}