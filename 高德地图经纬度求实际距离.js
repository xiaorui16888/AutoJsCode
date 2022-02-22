//访问高德地图获取经纬度
var 起点 = "深圳仁爱医院"
var 终点 = "朝阳区芳园里"
log(起点)//调试输出专用，勿删，不用请注释
log(终点)//调试输出专用，勿删，不用请注释


var 起点访问网页 = http.get("https://www.amap.com/service/poiInfo?query_type=TQUERY&pagesize=20&pagenum=1&qii=true&cluster_state=5&need_utd=true&utd_sceneid=1000&div=PC1000&addr_poi_merge=true&is_classify=true&zoom=4&city=100000&geoobj=-142.425616|11.012747|43.287265|61.188987&keywords=" + 起点);
var 终点访问网页 = http.get("https://www.amap.com/service/poiInfo?query_type=TQUERY&pagesize=20&pagenum=1&qii=true&cluster_state=5&need_utd=true&utd_sceneid=1000&div=PC1000&addr_poi_merge=true&is_classify=true&zoom=4&city=100000&geoobj=-142.425616|11.012747|43.287265|61.188987&keywords=" + 终点);
//log(起点访问网页)//调试输出专用，勿删，不用请注释
//log(终点访问网页)//调试输出专用，勿删，不用请注释

var str_起点源码 = 起点访问网页.body.string()//提取经纬度内容
var str_终点源码 = 终点访问网页.body.string()//提取经纬度内容
//log("html = " + str_起点源码);//调试输出专用，勿删，不用请注释
//log("html = " + str_终点源码);//调试输出专用，勿删，不用请注释

var str_latitude = '"latitude":"([\\s\\S]*?)"'
var str_longitude = '"longitude":"([\\s\\S]*?)"'
//log(str_latitude)//调试输出专用，勿删，不用请注释
//log(str_longitude)//调试输出专用，勿删，不用请注释

var str_起点匹配结果 = new RegExp(str_latitude);
var str_lat起点 = str_起点匹配结果.exec(str_起点源码);
var str_起点匹配结果 = new RegExp(str_longitude);
var str_lon起点 = str_起点匹配结果.exec(str_起点源码);
log(str_lat起点[1])//调试输出专用，勿删，不用请注释
log(str_lon起点[1])//调试输出专用，勿删，不用请注释

var str_终点匹配结果 = new RegExp(str_latitude);
var str_lat终点 = str_终点匹配结果.exec(str_终点源码);
var str_终点匹配结果 = new RegExp(str_longitude);
var str_lon终点 = str_终点匹配结果.exec(str_终点源码);
log(str_lat终点[1])//调试输出专用，勿删，不用请注释
log(str_lon终点[1])//调试输出专用，勿删，不用请注释

/*policy参数修改        | 当mode=bus(公交):
0:推荐策略,             | 0:最佳路线,
1:避免拥堵,             |1:换乘少,
2:避免收费,             |2:步行少,
3:不走高速（仅限移动端）  |3:不坐地铁*/

var str路径详情网页源码 = http.get("https://ditu.amap.com/service/autoNavigat?usepoiquery=true&coor_need=true&rendertemplate=1&invoker=plan&engine_version=3&start_types=1&end_types=1&viapoint_types=1&policy2=2&fromX=" + str_lon起点[1] + "&fromY=" + str_lat起点[1] + "&start_poiname=startpoint&toX=" + str_lon终点[1] + "&toY=" + str_lat终点[1] + "&end_poiname=endpoint&key=&callback=jsonp_626401_")
var str路径详情源码 = str路径详情网页源码.body.string()//提取路途内容
//log(str路径详情源码)//调试输出专用，勿删，不用请注释
//log("https://ditu.amap.com/service/autoNavigat?usepoiquery=true&coor_need=true&rendertemplate=1&invoker=plan&engine_version=3&start_types=1&end_types=1&viapoint_types=1&policy2=2&fromX=" + str_lon起点[1] + "&fromY=" + str_lat起点[1] + "&start_poiname=startpoint&toX=" + str_lon终点[1] + "&toY=" + str_lat终点[1] + "&end_poiname=endpoint&key=&callback=jsonp_626401_")//调试输出专用，勿删，不用请注释

var str里程表达式 = 'Successful.","distance":"([\\s\\S]*?),([\\s\\S]*?),([\\s\\S]*?)","'
var str里程匹配结果 = new RegExp(str里程表达式);
var 里程结果集 = str里程匹配结果.exec(str路径详情源码);
var lx1里程 = 里程结果集[1]
var lx2里程 = 里程结果集[2]
var lx3里程 = 里程结果集[3]

log(lx1里程 / 1000 + "km", lx2里程 / 1000 + "km", lx3里程 / 1000 + "km")//调试输出专用，勿删，不用请注释
if (lx3里程 < 1) {
    lx3里程 = 0
}
if (lx2里程 < 1) {
    lx3里程 = 0
    lx2里程 = 0
}

log("【路线1统计里程】：" + Math.round(lx1里程 / 1000) + "km") //调试输出专用，勿删，不用请注释
log("【路线2统计里程】：" + Math.round(lx2里程 / 1000) + "km")//调试输出专用，勿删，不用请注释
log("【路线3统计里程】：" + Math.round(lx3里程 / 1000) + "km")//调试输出专用，勿删，不用请注释





var str时间表达式 = 'drivetime":"([\\s\\S]*?),([\\s\\S]*?),([\\s\\S]*?)"'
var str时间匹配结果 = new RegExp(str时间表达式);
var 时间结果集 = str时间匹配结果.exec(str路径详情源码);
//log(时间结果集)//调试输出专用，勿删，不用请注释

log(Math.round(时间结果集[1] / 60) + "分钟", Math.round(时间结果集[2] / 60) + "分钟", Math.round(时间结果集[3] / 60) + "分钟")

if (时间结果集[3] < 1) {
    var str时间表达式 = 'drivetime":"([\\s\\S]*?),([\\s\\S]*?)"'
    var str时间匹配结果 = new RegExp(str时间表达式);
    var 时间结果集 = str时间匹配结果.exec(str路径详情源码);
    时间结果集[3] = 0

}
if (时间结果集[2] < 1) {
    var str时间表达式 = 'drivetime":"([\\s\\S]*?)"'
    var str时间匹配结果 = new RegExp(str时间表达式);
    var 时间结果集 = str时间匹配结果.exec(str路径详情源码);
    log("路线1时间：" + parseInt(时间结果集[1] / 60) + "分钟")//调试输出专用，勿删，不用请注释
    时间结果集[3] = 0
    时间结果集[2] = 0

}

log("【路线1预测时间】：" + Math.round(时间结果集[1] / 60) + "分钟")//调试输出专用，勿删，不用请注释
log("【路线2预测时间】：" + Math.round(时间结果集[2] / 60) + "分钟")//调试输出专用，勿删，不用请注释
log("【路线3预测时间】：" + Math.round(时间结果集[3] / 60) + "分钟")//调试输出专用，勿删，不用请注释

var str红灯表达式 = '],"traffic_lights":"([\\s\\S]*?)"}' //生成正则表达式
var str红灯匹配结果 = new RegExp(str红灯表达式, "g");
var 红灯结果集1 = str红灯匹配结果.exec(str路径详情源码);
var 红灯结果集2 = str红灯匹配结果.exec(str路径详情源码);
var 红灯结果集3 = str红灯匹配结果.exec(str路径详情源码);
//log(str表达式)//调试输出专用，勿删，不用请注释
//    ],"traffic_lights":"([\\s\\S]*?)"}
//    ],"traffic_lights":"([\\s\\S]*?)".([\\s\\S]*?),([\\s\\S]*?)"
var hd1 = 红灯结果集1[1]
var hd2 = 红灯结果集2[1]
var hd3 = 红灯结果集3[1]

if (红灯结果集3 < 1) {
    var hd3 = 0
    var hd1 = 红灯结果集1[1]
    var hd2 = 红灯结果集2[1]
}
if (红灯结果集2 < 1) {
    var hd2 = 0
    var hd1 = 红灯结果集1[1]
}
if (红灯结果集1 < 1) {
    var hd1 = 0
     var hd1 = 红灯结果集1[1]
     var hd2 = 红灯结果集2[1]
     var hd3 = 红灯结果集3[1]
}
log(hd1, hd2, hd3)

log("【路线1统计红灯】：" + hd1)//调试输出专用，勿删，不用请注释
log("【路线2统计红灯】：" + hd2)//调试输出专用，勿删，不用请注释
log("【路线3统计红灯】：" + hd3)//调试输出专用，勿删，不用请注释


log("路线1里程：" + Math.round(lx1里程 / 1000) + "Km" + "，需要时长：" + Math.round(时间结果集[1] / 60) + "分钟" + "，红灯数量：" + hd1 + "个")


log("路线2里程：" + Math.round(lx2里程 / 1000) + "Km" + "，需要时长：" + Math.round(时间结果集[2]
    / 60) + "分钟" + "，红灯数量：" + hd2 + "个")


log("路线3里程：" + Math.round(lx3里程 / 1000) + "Km" + "，需要时长：" + Math.round(时间结果集[3] / 60) + "分钟" + "，红灯数量：" + hd3 + "个")