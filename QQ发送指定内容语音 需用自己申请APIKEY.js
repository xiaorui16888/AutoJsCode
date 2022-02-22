auto();
var API_KEY = ""; //请使用自己的APIKEY 和SCECRETKEY
var SECRET_KEY = "";
//申请地址 http://ai.baidu.com/tech/speech/tts
var MyQQ=""//这里填自己QQ
console.show()
var m = console.rawInput("请在QQ聊天界面输入要发送的语音内容然后点击确定");
console.hide();
sleep(1000);
log(m);
//while(!m){log("等待输入")};
var g = className("android.widget.ImageView").id("name").clickable(true).find();
//alert(g.size());
for(var i=0;i<g.size();i++)//筛选控件
{
    if(g.get(i).bounds().left<10){
        g.get(i).click();
        //筛选掉一些贴表情的控件
        //一般贴表情坐标都会有一张图片会使得贴表情控件坐标大于10
        //10是我随便写的差不多就行
        //这种方法能比较好的适配不同分辨率手机
        break;
    }
}
text("录音").click()
desc("开始录音").click()
sleep(3000)
desc("停止录音").click();
sleep(500);
YuYin(m, getSlkPath(MyQQ))
text("发送").click()

function getSlkPath(QQ) { //取得当前语音文件路径
  var path;
  path = files.getSdcardPath() + "/";
  path += "Tencent/MobileQQ/" + QQ + "/ptt/";
  path += new Date().getFullYear();
  var m = new Date().getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  path += m + "/";
  var d = new Date().getDate()
  d = d < 10 ? "0" + d : d;
  path += d + "/";
  //log(path);
  files.ensureDir(path);
  var slk = files.listDir(path);
  slk.sort();
  slk.reverse();
  toastLog(path+slk[0])
  return path + slk[0]; //最新文件
}

function YuYin(tex, path) {

  
  var TOKEN;

  var h = http.get("https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + API_KEY + "&client_secret=" + SECRET_KEY);

  TOKEN = h.body.json().access_token;

  log(TOKEN);

  h = http.get("http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + TOKEN + "&tex=" + tex + "&vol=12&per=0&spd=5&pit=5")

  var file = h.body.bytes();
   log("删除源文件"+path)
  log(files.remove(path));
    log("写出文件");
  log(files.writeBytes(path, file));

}