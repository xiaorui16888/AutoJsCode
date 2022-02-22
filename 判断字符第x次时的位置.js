function find(str, cha, num) {
    var x = str.indexOf(cha);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }
    return x;
}
var str = "华晨宇《Here We Are》https://i.y.qq.com/v8/playsong.html?hostuin=3181736401&songmid=002Gsy3i3LtNty&appshare=android_qq&type=0&platform=11&appsongtype=1&_wv=1&source=qq @QQ音乐"
alert(find(str, '《', 0)); //返回7