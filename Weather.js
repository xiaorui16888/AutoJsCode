/*
   获取天气预报信息
   20151224.1722
   by firefly
   
   @基本思路：
    获取所在城市，根据城市获取天气信息
    
   @参考：
    http://cn.yinx.in/2013/09/tasker_6550.html
*/

//免费申请API-key：http://lbsyun.baidu.com/apiconsole/key?application=key
var apikey = "3cFOWNZE16ctG246jguFv8PD";

//请求网址，返回响应
function httpRequest(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

//获取所在城市
function getCurrentCity(){
    var city = "";
    getLocation('net');
    var loc = global('LOCN');
    
    if(loc!=null){
        //反向地理编码，见：http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
        var url="http://api.map.baidu.com/geocoder/v2/?ak="+apikey+"&location="+loc+"&output=json&pois=1";
        var result = httpRequest(url);
        if(result!=null){
            var json = JSON.parse(result);
            city = json.result.addressComponent.city;
//            flash(city);
            return city;
        }
    }
    else {
        //ip定位，见：http://developer.baidu.com/map/index.php?title=webapi/ip-api
        var url = "http://api.map.baidu.com/location/ip?ak="+apikey+"&coor=bd09ll";
        var result = httpRequest(url);
        if(result!=null){
            var json = JSON.parse(result);
            city = json.content.address_detail.city;
//            flash(city);
            return city;
        }
    }
}

//获取天气预报
function getCityWeather(city){
    //查询城市天气，见：http://developer.baidu.com/map/index.php?title=car/api/weather
    var url = "http://api.map.baidu.com/telematics/v3/weather?location="+encodeURIComponent(city)+"&output=json&ak="+apikey;
    var result = httpRequest(url);
    if(result!=null){
        var json = JSON.parse(result);
        var weather = city;
        weather += "：" + json.results[0].weather_data[0].weather;
        weather += " " + json.results[0].weather_data[0].temperature;
        weather += " " + json.results[0].weather_data[0].wind;
//        flash(weather);
        return weather;
    }
}

//----------------------
//获取本地当天天气，赋值给变量%Weather
setGlobal('%Weather',getCityWeather(getCurrentCity()));
