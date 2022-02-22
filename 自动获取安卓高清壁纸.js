url="http://service.picasso.adesk.com/v1/vertical/vertical?limit=30&adult=false&first=1&order=new";
var i = http.get(url,{});
i=String(i.body.string());
var a = String(i.match("preview.{0,50}","g")).match("http.{0,42}","g");
app.openUrl(a[random(0,29)]);
//自动获取高清最新壁纸，每次返回30张壁纸url;
//可以通过a[id]获取准确的一个url;
//作者:qq2192003656(黑暗战无不胜);