"ui";
/*
 * @Author: 白酒煮饭
 * @Date: 2019-01-07 14:25:48
 * @email: 1641763174@qq.com 
 */

const baseUrl = "http://1024.luaapp.top/";
const versionCode = 2;
const versionName = "0.1.3";
const My_User = device.getIMEI();//备份账号,不支持中文
const curFileName = "脚本云";
var TextDic = {qq: "是否添加QQ群反馈问题或者向作者提出你宝贵的建议",help: "1.脚本备份收费吗？\n答：不收费，脚本备份永久免费\n\n2.存储空间有限制吗？\n答：存储空间不限量不限速\n\n3.要不要注册？我的用户名是啥？\n答：不用注册，我们默认你的账号就手机的IMEI,当然，你也可以自定义你的账号，只有不是中文名就行\n\n4.我的账号会不会被盗？\n答：只有你不泄露你的账号，就不会被盗\n\n5.上传的文件支不支持分享？\n答：目前是不支持分享的。\n\n6.支持脚本项目的备份吗？\n答：很遗憾，是不支持的，目前仅支持单脚本文件的上传\n\n7.json、txt、ini、xml这些文件能上传吗？\n答：目前仅支持js文件的上传，json、txt、ini、xml文件以后会支持\n\n8.下载的文件，存放在哪里？\n答：下载的文件都会存放到备份路径\n\n9.怎么设置备份路径？\n答：在第一页，底部第一个按钮，然后打开有js文件的文件夹，并选择其中一个js文件\n\n10.对上传的文件名有什么条件吗？\n答：有的，文件名不能带有+、&、/\n\n11.为什么有的文件会上传失败？\n答：可能是网络问题，或者是服务器抽风啦，重新试下就好了\n\n12.为什么网盘上的脚本不能删除？刷新之后还有？\n答：可能是你的文件名带有特殊字符，见Q&A.10，如果你一定必须要删除，好吧，带上你的账号来找我们",msg: "此脚本仅为Auto.Js的使用者，提供服务支持，我们开发的原因是我们很多时候，常常会因为忘记了备份脚本导致自己辛辛苦苦编写的脚本被垃圾清理误删除，或者手机不小心掉了等等，这是我们是不能忍受的，所以此工具的诞生意义就在于解决这些烦恼。无需注册，我们会根据你的手机IMEI创建一个文件夹，里面存放的你的脚本，或者你自己用的QQ也行，不过不能是中文。\n\n如果你有好的想法或者建议欢迎向我们反馈。\n\n感谢@笔青居提供的上传及获取列表的PHP源码"};
var cookie = "";
var oup=0,odn=0;
var storage = storages.create("backups_path");
var res = storage.get("Script", {time: "",cookie: ""});
var basePath = storage.get("path");
if (basePath == null) {
    basePath = "/sdcard/脚本/";
}
if (app.autojs.versionCode < 400) {
    toast("aj版本过低");
    exit();
}

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="{{curFileName + versionName}}"/>
            <tabs id="tabs"/>
        </appbar>
        <viewpager id="viewpager">
            <vertical>
                <list id="list" layout_weight="1" padding="5" bg="#dcdcdc">
                    <vertical w="*">
                        <text text="{{this}}" textSize="18sp" bg="#708090" margin="5 2 5 2" w="*" h="30"/>
                    </vertical>
                </list>
                <horizontal gravity="center">
                    <button id="three" text="选择备份目录"/>
                    <button id="openup" text="开始上传"/>
                    <button id="dxup" text="多选上传"/>
                    <button id="exit" text="退出" textSize="19sp" style="Widget.AppCompat.Button.Borderless.Colored" />
                </horizontal>
            </vertical>
            <vertical>
                <progressbar id="progress2" w="*" h="auto" indeterminate="true" layout_gravity="top" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
                <list id="list2" layout_weight="1" padding="5p" bg="#dcdcdc">
                    <vertical w="*">
                        <text text="{{this}}"  textSize="18sp" bg="#708090" margin="5 2 5 2" w="*" h="30"/>
                    </vertical>
                </list>
                <horizontal gravity="center">
                    <button id="f5" text="刷新"/>
                    <button id="allDown" text="开始下载"/>
                    <button id="duxuan" text="多选" />
                    <button id="del" text="删除"/>
                </horizontal>
            </vertical>
        </viewpager>
    </vertical>
);
threads.start(function() {
    let tm = nTimeNum();
    if (res.time == null || res.time < tm) {
        const getAES = http.get("http://bmob-cdn-21628.b0.upaiyun.com/2019/01/09/884c4ace406e5bf6801b52af573a886c.js");
        eval(getAES.body.string());
        cookie = getCookie();
        storage.put("Script", {time: tm,cookie: cookie});
    } else {
        cookie = res.cookie;}
        updataData();
        checkVersion();
});
main();
function main() {
    Local_List = [];
    localNameList = [];
    localList = [];
    Service_List = [];
    serviceList = [];
    readLoacalFile(basePath);
    uiInit();
    string(0, "本机脚本" + Local_List.length);
}

function updataLocalList() {
    Local_List = [];
    localNameList = [];
    localList = [];
    readLoacalFile(basePath);
    ui.run(function() {
        ui.list.setDataSource(Local_List);
    })
}

function uiInit() {
    activity.setSupportActionBar(ui.toolbar);
    ui.viewpager.setTitles(["本机脚本", "云端脚本"]);
    ui.tabs.setupWithViewPager(ui.viewpager);
    ui.list.setDataSource(Local_List);
    ui.list2.setDataSource(Service_List);
    ui.list.on("item_click", function(item, pos) {
        let a = ["上传", "运行", "打开", "删除", "取消"];
        dialogs.select(item, a, function(i) {
            switch (i) {
                case 0:
                    threads.start(function() {
                        up(basePath + item);
                    });
                    break;
                case 1:
                    confirm("提示", "请确保你要运行的脚本经过测试且成功运行，否则可能会导致软件崩溃，是否继续？", (value) => {
                        if (value) {
                            let code = files.read(basePath + item);
                            run(code);
                        }
                    })
                    break;
                case 2:
                    OpenFile(basePath + item);
                    break;
                case 3:
                    listdel(0, "本机脚本", Local_List, pos, item);
                    break;
            }
        });
    });
    ui.three.click(function() {
        Select_file();
    });
    ui.openup.click(function() {
        if (oup == 0) {
            confirm("提示", "该操作会全部上传列表的文件，是否继续？", (value) => {
                if (value) {
                    ui.openup.text("停止上传");
                    oup = 1;
                    toast("上传开始，右上角 \"日志\"查看详情");
                    AllUp(Local_List);
                }
            });
        } else {
            toast("已停止");
            threads.shutDownAll();
            ui.openup.text("开始上传");
            oup = 0;
        }
    });
    ui.dxup.click(function() {
        toast("暂不支持多选上传");
    });

    ui.exit.click(function() {
        ui.finish();
    });

    ui.list2.on("item_click", function(item, pos) {
        threads.start(function() {
            let a = ["下载", "运行", "删除", "查看", "取消"];
            dialogs.select(item, a, function(i) {
                switch (i) {
                    case 0:
                        threads.start(function() {
                            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + item, basePath + item);
                        });
                        break;
                    case 1:
                        confirm("提示", "请确保你要运行的脚本经过测试且成功运行，否则可能会导致软件崩溃，是否继续？", (value) => {
                            if (value) {
                                threads.start(function() {
                                    toast("正在从服务器获取脚本，请稍候。。。");
                                    let code = readurl(baseUrl + "download.php?user=" + My_User + "&name=" + item);
                                    run(code);
                                });
                            };
                        });
                        break;
                    case 2:
                        listdel(1, "云端脚本", Service_List, pos, item);
                        break;
                    case 3:
                        threads.start(function() {
                            toast("正在打开，请稍候。");
                            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + item, "/sdcard/.temp.js");
                            OpenFile("/sdcard/.temp.js");
                        });
                        break;
                }
            });
        });
    });

    ui.f5.click(function() {
        ui.run(function() {
            ui.progress2.setVisibility(0);
        });
        toast("正在刷新，请稍候。。");
        updataData();
    });
    ui.allDown.click(function() {
        if (odn == 0) {
            confirm("提示", "该操作会下载服务器上所有的文件，是否继续？", (value) => {
                if (value) {
                    ui.allDown.text("停止下载");
                    odn = 1;
                    toast("下载开始，右上角 \"日志\"查看详情");
                    AllDown(Service_List);
                }
            });
        } else {
            toast("已停止");
            threads.shutDownAll();
            odn = 0;
            ui.allDown.text("开始下载");
        }
    });
    ui.duxuan.click(function() {
        toast("暂不支持多选");
    });
    ui.del.click(function() {
        toast("暂不支持多选删除");
    });

    ui.emitter.on("create_options_menu", menu => {
        menu.add("日志");
        menu.add("反馈");
        menu.add("帮助");
        menu.add("关于");
    });
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "日志":
                app.startActivity('console');
                break;
            case "帮助":
                alert("帮助" ,TextDic.help);
                break;
            case "反馈":
                confirm("提示", TextDic.qq,(e) => {
                    if(e){
                    app.startActivity({
                        action: "android.intent.action.VIEW",
                        data: "mqqapi://card/show_pslcard?card_type=group&uin=952614347",
                        packageName: "com.tencent.mobileqq",
                    });}});
                break;
            case "关于":
                alert("关于 v0.0.1", TextDic.msg);
                break;
        }
        e.consumed = true;
    });
}

function up(path) {
    try {
        let res = http.postMultipart(baseUrl + "pushcode.php?user=" + My_User, {"file": open(path)}, {headers: {'Cookie': cookie}});
        let str = res.body.string();
        let json = JSON.parse(str);
        if (json["code"] == 200) {
            log(json["msg"]);
        } else if (json["code"] == 201) {
            log(json["msg"]);
        } else if (json["code"] == 202) {
            log(json["msg"]);
        } else {
            toastLog("上传出错啦!!");
        }
    } catch (e) {
        toastLog("up()  脚本运行出错!");
    }
}


function AllUp(list) {
    threads.start(function() {
        let count = 0;
        for (let i in list) {
            log(i + ". " + list[i]);
            up(basePath + list[i]);
            log("\n");
            count++;
        }
        toast(count + "个文件处理完毕。");
        ui.run(function() {
            ui.openup.text("开始上传");
        });
    });
}


function del(filename) {
    threads.start(function() {
        var res = http.get(baseUrl + "del.php?user=" + My_User + "&name=" + filename, {headers: {'Cookie': cookie}});
        let str = res.body.string();
        try {
            let json = JSON.parse(str);
            if (json["code"] == 200) {
                toastLog(json["msg"]);
            } else if (json["code"] == 201) {
                toastLog(json["msg"]);
            } else if (json["code"] == 202) {
                toastLog(json["msg"]);
            } else {
                toastLog("上传出错啦!!");
            }
        } catch (e) {
            toastLog("del() 运行出错!");
        }
    });
}

function readLoacalFile(path) {
    var fileList = files.listDir(path, function(name) {
        return name.endsWith(".js") && files.isFile(files.join(path, name));
    });
    for (let i in fileList) {
        Local_List.push(fileList[i]);
    }
}

function OpenFile(file){
            var i = app.intent({
            data: "file:"+file,
            packageName: "org.autojs.autojs",
            className: "org.autojs.autojs.ui.edit.EditActivity_",
        });
        app.startActivity(i);
  }      

function updataData() {
    Service_List = [];
    serviceList = [];
    threads.start(function() {
        let res = http.get(baseUrl + "codelist2.php?user=" + My_User, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        serviceList = JSON.parse(str);
        for (let i in serviceList) {
            Service_List.push(serviceList[i].fileName);
        }
        ui.run(function() {
            ui.list2.setDataSource(Service_List);
        });
        toast("服务器文件列表加载完成✅");
        ui.run(function() {
            ui.progress2.setVisibility(8);
        });
        string(1, "云端脚本" + Service_List.length);
    });
}

function AllDown(list) {
    threads.start(function() {
        let count2 = 0;
        for (let i in list) {
            log(i + ". " + list[i]);
            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + list[i], basePath + list[i]);
            log("\n");
            count2++;
        }
        toast(count2 + "个文件处理完毕。");
        ui.run(function() {
            ui.allDown.text("开始下载");
        });
    });
}

function downloadCode(url, localPath) {
    try {
        let res = http.get(url, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            log("downloadCode() 下载失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        files.write(localPath, str);
        log("下载完成。。");
    } catch (e) {
        log(e);
        toastLog("downloadCode() 下载出错啦");
        return false;
    }
}

function readurl(url) {
    try {
        let res = http.get(url, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast("readurl() 无法连接: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        toast("开始运行。");
        return str;
    } catch (e) {
        log(e);
        toast("readurl()  错误!");
        return false;
    }
}

function run(code) {
    threads.start(function() {
        try {
            engines.execScript("temp", code);
        } catch (e) {
            toast("run()  运行出错");
        }
    });
}

function Select_file(fun) {
    ui.run(() => {
        importPackage(org.autojs.autojs.ui.explorer);
        importPackage(org.autojs.autojs.model.explorer);
        var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
        explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard/"));
        explorerView.setDirectorySpanSize(2);
        var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
            .title("选择js文件")
            .customView(explorerView, false)
            .positiveText("取消")
            .build();
        explorerView.setOnItemClickListener(function(view, item) {
            if (nameToType(String(item.toScriptFile())) == "文本") {
                path = (String(item.toScriptFile()));
                setpath(path);
                dialog.dismiss();
            } else {
                toast("请选择js文件");
            };
        });
        com.stardust.app.DialogUtils.showDialog(dialog);
    });
};

function setpath(path) {
    var str = path.replace(/(\/sdcard\/.*)(\/.*\.js)/g, "$1/");
    storage.put("path", str);
    dialogs.confirm("备份路径已设置为：", str + "\n\n需要重启脚本才生效，是否重启？", (i) => {
        if (i) {
            let Script = engines.myEngine().getSource();
            ui.finish();
            engines.execScriptFile(Script);
        }
    });
}

function nameToType(name) {
    const fileType = {文本: {ends: ["js"]}};
    var Extension = name.split(".").pop();
    for (var i in fileType) {
        for (var a = 0; a < fileType[i].ends.length; a++) {
            if (Extension == fileType[i].ends[a]) {
                return i;
            };
        }
    };
    return "unkown";
};

function network() {
    var M = context.getSystemService(context.CONNECTIVITY_SERVICE);
    var W = M.getActiveNetworkInfo();
    if (W) {
        return W.isAvailable();
    } else {
        return false;
    };
};

function reg() {
    let Script = engines.myEngine().getSource();
    ui.finish();
    engines.execScriptFile(Script);
}

function nTimeNum() {
    return new java.text.SimpleDateFormat("yyyyMMdd").format(new Date());
}

function listdel(id, title, Arry, pos, item) {
    if (id) {
        del(item);
        Service_List.splice(pos, 1);
        string(id, String("本机脚本" + Service_List.length));
    } else {
        Local_List.splice(pos, 1);
        string(id, String("云端脚本" + Local_List.length));
    }
}

function string(id, text) {
    ui.tabs.getTabAt(id).setText(text);
}

function checkVersion() {
    threads.start(function() {
        let res = http.get(baseUrl + "updata.json", {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast("更新失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let json = res.body.json();
        if (versionCode < json["versionCode"]) {
            if (json["code"] == 200) {
                confirm(json["title"] + json["versionName"], json["content"], (value) => {
                    if (value) {
                        threads.start(function() {
                        toast("正在更新。。请稍候。。。。");
                        basePath = engines.myEngine().cwd();
                        codePath = basePath + "/" + curFileName + ".js";
                        downloadCode(json["url"], codePath);
                        toast("正在打开。。。");
                        ui.finish();
                        engines.execScriptFile(codePath);
                    });
                    }
                });
            }
        }
    });
}