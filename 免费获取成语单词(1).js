console.show();
/*
 *     Author:TimeOut
 *     Date: 2019.8.15
 *     Script: 免费获取成语单词
 */



//成语开头单词
let name = "给";
let p = 0;
let dataSource = [];
while (1) {
    let data = getDate(name, p);
    p++;
    let d = data.match(/>\S{4}<\/a>/g);
    try {
        for (let i = 0; i < d.length; i++) {
            let n = d[i].split(">")[1].split("<")[0];
            if (dataSource.indexOf(n) == -1) {
                dataSource.push(n);
            }
        }
    } catch (e) {}
    if (d == null) break;
}

log("获取结果",dataSource);
log("获取", name, "成语个数 :" + dataSource.length)




function getDate(name, p) {
    var temp = http.get("http://m.t086.com/index.php?c=chengyu&m=chaxun&q=" + encodeURI(name) + "&t=ChengYu&&inajax=1&p=" + p, {
        "headers": {
            "Host": "m.t086.com",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android " + device.release + "; " + device.model + " Build/" + device.buildId + ")",
            "Referer": "http://m.t086.com/index.php?c=chengyu&m=chaxun&q=" + encodeURI(name),
            "Accept-Language": "zh-CN,en-US;q=0.9",
        }
    }).body.string();
    return temp;
}