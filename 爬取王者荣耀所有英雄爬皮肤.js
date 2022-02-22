//英雄名字json
const LIST = "https://pvp.qq.com/web201605/js/herolist.json";
//英雄皮肤
const YX_PHO = "http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info";
let path = "/sdcard/DCIM/王者荣耀英雄皮肤/";
files.createWithDirs(path);

get_Pic();

function get_Pic() { //获取图片URL
    let YX_Url = getId_Name();
    for (j in YX_Url) { //遍历所有英雄
        for (let coun = 1; coun < 10; coun++) { //假设所有英雄有10个皮肤
            //构造皮肤PicUrl
            let name = YX_Url[j].NA + coun;
            let url = YX_PHO + "/" + YX_Url[j].ID + "/" + YX_Url[j].ID + "-bigskin-" + coun + ".jpg";
            if (!Save_Pic(name, url)) continue;
        }
    }
}

function getId_Name() { //提取英雄ID和名称
    let arr = [];
    let list = http.get(LIST).body.json();
    if (list.length > 2) log("英雄列表获取成功!");
    for (let i in list) {
        let id = list[i].ename; //英雄ID
        let name = list[i].cname; //英雄名称
        let json = {
            "ID": id,
            "NA": name
        }
        arr.push(json);
    }
    return arr;
}

function Save_Pic(name, url) { //保存图片
    let Pic = http.get(url,{headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; OPPO R11 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36"}});
    if (Pic.statusCode == 404) {
        return false
    };
    files.writeBytes(path + name + ".jpg", Pic.body.bytes());
    log(name, "获取成功!");
}