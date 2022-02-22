
console.show();

var dirpath = "/sdcard/王者荣耀英雄海报/";
files.ensureDir(dirpath);

//var fileAry=files.listDir(dirpath);



var url = 'http://pvp.qq.com/web201605/js/herolist.json';
var head = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
};
var res = http.get(url);

var json = res.body.json();
toastLog("请等待，正在下载");
//log(json);


//exit();
for (let j in json) {
    let obj = json[j];
    let hero_ID = obj.ename;//英雄id
    let hero_name = obj.cname;//英雄名称
    let hero_skin_name = obj.title;//英雄皮肤名称
    let all_skin_name=obj.skin_name;//全部皮肤名称。| 分割
    log("第", Number(j) + 1, json.length, "英雄",hero_name);
    //log(hero_ID,hero_name,hero_skin_name,all_skin_name);
    if(!all_skin_name){
        log("没有皮肤");
        continue;
     };
    let name_ary = all_skin_name.split("|");
    log("皮肤数量", name_ary.length);
    for (let n in name_ary) {
        let skin_name=name_ary[n];
        let path = "/" + hero_name + "_" + (Number(n) + 1) + skin_name + '.jpg';
        let absPath=files.join(dirpath, path);
        if(files.exists(absPath)){
            log("已有",skin_name);
            continue;
        };
        let heroskin_links = "http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/" + hero_ID + "/" + hero_ID + "-bigskin-" + (Number(n) + 1) + ".jpg";
        let res = http.get(heroskin_links);
        if (res.statusCode == 200) {
            files.writeBytes(absPath, res.body.bytes());
            media.scanFile(absPath);
            log("OK " + path);
        } else {
            log("NO " + path);
        };
    };
};
toastLog("全部下载完成");



