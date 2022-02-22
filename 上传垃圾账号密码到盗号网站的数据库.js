var str = 'abcdefghijklmnopqrstuvwxyz';
var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var num = '0123456789';

for (let i = 0; i < 500; i++) {
let user = (random(65478874, 1599999999));
let pass = 密码();
var html = http.post("http://www.qtizmdo.xyz/shzz.php", {
    "u": user,
    "p": pass,
    "bianhao": "1"
}, {
    headers: {
        "Origin": "http://www.qtizmdo.xyz",
        "Upgrade-Insecure-Requests": "1",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; OPPO R11 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Referer": "http://www.qtizmdo.xyz/zhaohuan/index.php?act=1",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,en-US;q=0.9",
        "Cookie": "__cfduid=d72e78efbe0c776db20871525393662c61550733048; PHPSESSID=53rmi15303utaukv0s3id6suo3; ied_rf=www.qtizmdo.xyz/undefined; pgv_pvid=462820895; pgv_info=pgvReferrer=&ssid=s5467430843; ts_last=www.qtizmdo.xyz/zhaohuan/index.php; ts_uid=113862396",
        "X-Requested-With": "mark.via"
    }
});

log("\nNo."+ i +"\n账号：" + user + "\n密码：" + pass + "\n上传   " + html["statusMessage"] + "\n");

}
function 密码() {
    let all = str + STR + num; // + sym;
    var str = [];;
    for (let i = 0; i < (random(6, 16)); i++) {
        a = all[(random(0, (all.length - 1)))];
        str.push(a);
    }
    let pass = str.join('');
    return pass;
}