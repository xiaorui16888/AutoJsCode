importPackage(android.content);
importClass(android.util.Base64);
importClass(android.net.Uri);


var str = "mqqapi://share/to_fri?src_type=app&version=1&file_type=news";
var image_url = "url.cn/5XQ94Kp"; //小图图片url
var title = "五月末的一次出钓彻底颠覆了我对钓鱼的看法..."; //分享的标题
var description = "好久都没去钓鱼了，手都有点生了，最近也没什么事，儿子学习也挺自觉，不用多管，在双休日我就准备收拾下装备准备去大干一场......我钓鱼就图个"; //分享的描述
var url = "http://m.diaoyu.com/share/thread-3963739.html"; //点击分享跳转的链接

// SHARE_TO_QQ_TYPE_APP = 6;  分享应用
// SHARE_TO_QQ_TYPE_AUDIO = 2; 分享音乐
// SHARE_TO_QQ_TYPE_DEFAULT = 1;  默认图文分享
// SHARE_TO_QQ_TYPE_IMAGE = 5;  分享图片

var req_type = "1"; //分享类型
var cflag = "0";
var app_name = "QQ浏览器"; //分享界面左下角显示的平台名称 实际上并不会显示到消息内容里面

str = str + "&image_url=" + Base64.encodeToString(getByte(image_url), 2);
str = str + "&title=" + Base64.encodeToString(getByte(title), 2);
str = str + "&description=" + Base64.encodeToString(getByte(description), 2);
str = str + "&share_id=100446242"; //QQ浏览器
str = str + "&url=" + Base64.encodeToString(getByte(url), 2);
str = str + "&app_name=" + Base64.encodeToString(getByte(app_name), 2);
str = str + "&req_type=" + Base64.encodeToString(getByte(java.lang.String.valueOf(req_type)), 2);
str = str + "&cflag=" + Base64.encodeToString(getByte(java.lang.String.valueOf(cflag)), 2);

app.startActivity({
    action : "VIEW",
    data : str,
    extras : {
        pkg_name : "com.lchr.diaoyu",
    }
})

function getByte(str) {
    str1=new java.lang.String(str);
    return str1.getBytes();
}



