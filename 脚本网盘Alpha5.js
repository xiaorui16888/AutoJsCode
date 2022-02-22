"ui";
/*
 * @Author: 白酒煮饭
 * @Date: 2019-01-07 14:25:48
 * @email: wu737@vip.qq.com
 */
 
var TextDic={cl:"取消",ts:"提示",gy:"关于",fk:"反馈",up:"上传",dx:"多选",ove:"退出",don:"下载",run:"运行",del:"删除",kan:"查看",f55:"刷新",erro:"错误",jg:"警告⚠️",open:"打开",logg:"日志",yes:"完成！",helpp:"帮助",f5:"正在刷新",bt:"本机脚本",zc:"支持作者",yun:"云端脚本",oup:"下载开始",bzc:"暂不支持",yn:"是否继续？",ksup:"开始上传",look:"上传开始，",xzjs:"选择js文件",tip:"常见问题Q&A",ttt:"选择备份目录",oprun:"开始运行。",htip:"常见问题Q&A",appName:"脚本网盘",load:"请稍候。。。",exit:"再按一次退出",ok:"个文件处理完毕。",bzf:"不支持的文件类型",jz:"云端脚本列表加载完成✅",bak:"备份路径已设置为：",napp:"AutoJs框架不支持",log:"右上角\"日志\"查看详情",cq:"脚本运行出错!，重启试试看",runcode:"正在从服务器获取脚本，",oau:"该操作会全部上传列表的文件，",updata:"正在更新。。请稍候。。。。",osv:"该操作会下载服务器上所有的文件",str:"本应用需要联网，请联网后在打开！！",ryn:"\n\n需要重启脚本才生效，是否重启？",bztip:"来了老弟，要不要请作者吃鸡腿呀😏😏",qq:"是否添加QQ群反馈问题或者向作者提出你宝贵的建议",orun:"请确保你要运行的脚本经过测试且成功运行，否则可能会导致软件崩溃",help:"1.脚本备份收费吗？\n答：不收费，脚本备份永久免费\n\n2.存储空间有限制吗？\n答：存储空间不限量不限速\n\n3.要不要注册？我的用户名是啥？\n答：不用注册，我们默认你的账号就手机的IMEI,当然，你也可以自定义你的账号，只有不是中文名就行\n\n4.我的账号会不会被盗？\n答：只有你不泄露你的账号，就不会被盗\n\n5.上传的文件支不支持分享？\n答：目前是不支持分享的。\n\n6.支持脚本项目的备份吗？\n答：很遗憾，是不支持的，目前仅支持单脚本文件的上传\n\n7.json、txt、ini、xml这些文件能上传吗？\n答：目前仅支持js文件的上传，json、txt、ini、xml文件以后会支持\n\n8.下载的文件，存放在哪里？\n答：下载的文件都会存放到备份路径\n\n9.怎么设置备份路径？\n答：在第一页，底部第一个按钮，然后打开有js文件的文件夹，并选择其中一个js文件\n\n10.对上传的文件名有什么条件吗？\n答：有的，文件名不能带有+、&、/\n\n11.为什么有的文件会上传失败？\n答：可能是网络问题，或者是服务器抽风啦，重新试下就好了\n\n12.为什么网盘上的脚本不能删除？刷新之后还有？\n答：可能是你的文件名带有特殊字符，见Q&A.10，如果你一定必须要删除，好吧，带上你的账号来找我们",msg:"此脚本仅为Auto.Js的使用者，提供服务支持，我们开发的原因是我们很多时候，常常会因为忘记了备份脚本导致自己辛辛苦苦编写的脚本被垃圾清理误删除，或者手机不小心掉了等等，这是我们是不能忍受的，所以此工具的诞生意义就在于解决这些烦恼。无需注册，我们会根据你的手机IMEI创建一个文件夹，里面存放的你的脚本，或者你自己用的QQ也行，不过不能是中文。\n\n如果你有好的想法或者建议欢迎向我们反馈。\n\n感谢@笔青居提供的上传及获取列表的PHP源码"};
const baseUrl="http://1024.luaapp.top/";
const curFileName = TextDic.appName;
const versionCode = 1;
const versionName = "v0.0.1";
const My_User = device.getIMEI(); //备份的账号,不支持中文
var kg,cookie = "";
var storage = storages.create("backups_path");
var basePath = storage.get("path");
if (basePath == null) {basePath = "/sdcard/脚本/";}
if (app.autojs.versionCode < 400) {toast(TextDic.napp);exit();}

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="{{curFileName+versionName}}"/>
            <tabs id="tabs"/>
        </appbar>
        <viewpager id="viewpager">
            <vertical>
                <list id="list" layout_weight="1" padding="5">
                    <vertical>
                        <horizontal>
                            <text text="{{this}}" textColor="#4a3113" textSize="18sp" margin="5 0 5 10"/>
                        </horizontal>
                    </vertical>
                </list>
                <horizontal gravity="center">
                    <button id="three" text="{{TextDic.ttt}}"/>
                    <button id="openup" text="{{TextDic.ksup}}"/>
                    <button id="dxup" text="{{TextDic.dx+TextDic.up}}"/>
                    <button id="exit" text="{{TextDic.ove}}" textSize="19sp" style="Widget.AppCompat.Button.Borderless.Colored" />
                </horizontal>
            </vertical>
            <vertical>
                <list id="list2" layout_weight="1" padding="5p">
                    <vertical>
                        <text text="{{this}}"  textSize="18sp" margin="5 0 5 5"/>
                    </vertical>
                </list>
                <horizontal gravity="center">
                    <button id="f5" text="{{TextDic.f55}}"/>
                    <button id="allDown" text="{{TextDic.don}}"/>
                    <button id="duxuan" text="{{TextDic.dx}}" />
                    <button id="del" text="{{TextDic.del}}"/>
                </horizontal>
            </vertical>
        </viewpager>
    </vertical>
);
threads.start(function() {
    if(!network()){
    alert(TextDic.jg,TextDic.str);
    exit();}
    const getAES = http.get("http://bmob-cdn-21628.b0.upaiyun.com/2019/01/09/884c4ace406e5bf6801b52af573a886c.js");
    eval(getAES.body.string());
    cookie = getCookie();
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
    string(0,TextDic.bt+Local_List.length);
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
    ui.viewpager.setTitles([TextDic.bt, TextDic.yun]);
    ui.tabs.setupWithViewPager(ui.viewpager);
    ui.list.setDataSource(Local_List);
    ui.list2.setDataSource(Service_List);

    ui.list.on("item_click", function(item, pos) {
        let a = [TextDic.up, TextDic.run, TextDic.open, TextDic.del, TextDic.cl];
        dialogs.select(item, a, function(i) {
            switch (i) {
                case 0:
                    threads.start(function() {
                        up(basePath + item);
                    });
                    break;
                case 1:
                    confirm(TextDic.ts, TextDic.orun + TextDic.yn, (value) => {
                        if (value) {
                            let code = files.read(basePath + item);
                            run(code);
                        }
                    })
                    break;
                case 2:
                    app.viewFile(basePath + item);
                    break;
                case 3:
                    listdel(0,TextDic.bt,Local_List,pos,item);
                    break;
            }
        });
    });
    ui.three.click(function() {
        Select_file();
    });
    ui.openup.click(function() {
        confirm(TextDic.ts, TextDic.oau + TextDic.yn, (value) => {
            if (value) {
                toast(TextDic.look + TextDic.log);
                AllUp(Local_List);
            }
        });
    });
    ui.dxup.click(function() {
        toast(TextDic.bzc+TextDic.dx+TextDic.up);
    });

    ui.exit.click(function() {
        ui.finish();
    });
    ui.list2.on("item_click", function(item, pos) {
        threads.start(function() {
            let a = [TextDic.don, TextDic.run, TextDic.del, TextDic.kan, TextDic.cl];
            dialogs.select(item, a, function(i) {
                switch (i) {
                    case 0:
                        threads.start(function() {
                            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + item, basePath + item);
                        });
                        break;
                    case 1:
                        confirm(TextDic.ts, TextDic.orun + TextDic.yn, (value) => {
                            if (value) {
                                threads.start(function() {
                                    toast(TextDic.runcode + TextDic.load);
                                    let code = readurl(baseUrl + "download.php?user=" + My_User + "&name=" + item);
                                    run(code);
                                });
                            };
                        });
                        break;
                    case 2:
                        listdel(1,TextDic.yun,Service_List,pos,item);
                        break;
                    case 3:
                        threads.start(function() {
                            toast(TextDic.load);
                            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + item, "/sdcard/.temp.js");
                            app.editFile("/sdcard/.temp.js");
                        });
                        break;
                }
            });
        });
    });

    ui.f5.click(function() {
        toast(TextDic.f5 + TextDic.load);
        updataData();
        string(1,String(TextDic.bt+Local_List.length));
    });
    ui.allDown.click(function() {
        confirm(TextDic.ts, TextDic.osv + TextDic.yn, (value) => {
            if (value) {
                toast(TextDic.oup + TextDic.log);
                AllDown(Service_List);
            }
        });
    });
    ui.duxuan.click(function() {
        toast(TextDic.bzc+TextDic.dx);
    });
    ui.del.click(function() {
        toast(TextDic.bzc+TextDic.dx+TextDic.del);
    });

    ui.emitter.on("create_options_menu", menu => {
        menu.add(TextDic.logg);
        menu.add(TextDic.fk);
        menu.add(TextDic.helpp);
        menu.add(TextDic.zc);
        menu.add(TextDic.gy);
    });
    ui.emitter.on("options_item_selected", (e, item, pos) => {
        switch (item.getTitle()) {
            case TextDic.logg:
                app.startActivity('console');
                break;
            case TextDic.fk:
                confirm(TextDic.ts, TextDic.qq,(e) => {
                    if(e){
                    app.startActivity({
                        action: "android.intent.action.VIEW",
                        data: "mqqapi://card/show_pslcard?card_type=group&uin=952614347",
                        packageName: "com.tencent.mobileqq",
                    });}});
                break;
            case TextDic.helpp:
                alert(TextDic.htip, TextDic.help);
                break;
            case TextDic.zc:
                confirm(TextDic.ts,TextDic.bztip,(a) =>{
                    if (a){
                    app.openUrl(baseUrl);}})
                break;    
            case TextDic.gy:
                alert(TextDic.gy + versionName, TextDic.msg);
                break;
        }
        e.consumed = true;
    });
    ui.emitter.on("back_pressed", e => {
        if (!kg) {
            kg = true;
            toast(TextDic.exit);
            setTimeout(() => {
                kg = false;
            }, 250);
            e.consumed = true;
        } else {
            e.consumed = false;
        };
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
            toastLog(TextDic.up + TextDic.erro);
        }
    } catch (e) {
        toastLog(TextDic.cq);
    }
}

function downloadCode(url, localPath) {
    try {
        let res = http.get(url, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            log(TextDic.erro + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        files.write(localPath, str);
        log(TextDic.don + TextDic.yes);
    } catch (e) {
        log(e);
        toastLog(TextDic.erro);
        return false;
    }
}

function AllUp(list) {
    threads.start(function() {
        for (let i in list) {
            log(i + ". " + list[i]);
            up(basePath + list[i]);
            log("\n");
        }
        toastLog(list.length + TextDic.ok);
    });
}


function AllDown(list) {
    threads.start(function() {
        for (let i in list) {
            log(i + ". " + list[i]);
            downloadCode(baseUrl + "download.php?user=" + My_User + "&name=" + list[i], basePath + list[i]);
            log("\n");
        }
        toastLog(list.length + TextDic.ok);
    });
}

function del(filename) {
    threads.start(function() {
        var res = http.get(baseUrl + "del.php?user=" + My_User + "&name=" + filename, {headers: {'Cookie': cookie}});
        let str = res.body.string();
        try {
            let json = JSON.parse(str);
            if (json["code"] == 200) {
                log(json["msg"]);
            } else if (json["code"] == 201) {
                log(json["msg"]);
            } else if (json["code"] == 202) {
                log(json["msg"]);
            } else {
                toastLog(TextDic.del + TextDic.erro);
            }
        } catch (e) {
            log(e);toastLog(TextDic.erro);
        }
    });
}

function listdel(id,title,Arry,pos,item){
    if(id) {
        del(item);Service_List.splice(pos, 1);string(id,String(TextDic.bt+Service_List.length));
     }else{
         Local_List.splice(pos,1);string(id,String(TextDic.yun+Local_List.length));
     }
}

function string(id, text) {
    ui.tabs.getTabAt(id).setText(text);
}


function readLoacalFile(path) {
    var fileList = files.listDir(path, function(name) {
        return name.endsWith(".js") && files.isFile(files.join(path, name));
    });
    for (let i in fileList) {
        Local_List.push(fileList[i]);
    }
}


function updataData() {
    Service_List = [];
    serviceList = [];
    threads.start(function() {
        try{
        let res = http.get(baseUrl + "codelist.php?user=" + My_User, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast(TextDic.erro + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        serviceList = JSON.parse(str);
        for (let i in serviceList) {
            Service_List.push(serviceList[i].fileName);
        }
        ui.run(function() {
            ui.list2.setDataSource(Service_List);
        })
        toast(TextDic.jz);string(1,TextDic.yun+Service_List.length);
        }catch(e){log(e);toast(TextDic.erro);}
    });
}


function checkVersion() {
    try{
        let res = http.get(baseUrl + "updata.json", {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast(TextDic.erro + res.statusCode + " " + res.statusMessage);
            return;
        }
        let json = res.body.json();
        if (versionCode < json["versionCode"]) {
            if (json["code"] == 200) {
                confirm(json["title"] + json["versionName"], json["content"], (value) => {
                    if (value) {
                        toast(TextDic.updata);
                        basePath = engines.myEngine().cwd();
                        codePath = basePath + "/" + curFileName + ".js";
                        threads.start(function() {
                        downloadCode(json["url"], codePath);
                        let Scriptpath = engines.myEngine().getSource();
                        ui.finish();toast(TextDic.yes);
                        engines.execScriptFile(Scriptpath);
                        });
                    }
                });
            }
        }}catch(e){log(e);toast(TextDic.erro);}
}

function readurl(url) {
    try {
        let res = http.get(url, {headers: {'Cookie': cookie}});
        if (res.statusCode != 200) {
            toast(TextDic.erro + res.statusCode + " " + res.statusMessage);
            return;
        }
        str = res.body.string();
        toast(TextDic.oprun);
        return str;
    } catch (e) {
        log(e);
        toast(TextDic.erro);
        return false;
    }
}

function run(code) {
    threads.start(function() {
        try {
            engines.execScript("temp", code);
        } catch (e) {
            toast(TextDic.erro);
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
            .title(TextDic.xzjs)
            .customView(explorerView, false)
            .positiveText(TextDic.cl)
            .build();
        explorerView.setOnItemClickListener(function(view, item) {
            if (nameToType(String(item.toScriptFile())) == "文本") {
                path = (String(item.toScriptFile()));
                setpath(path);
                dialog.dismiss();
            } else {
                toast(TextDic.bzf);
            };
        });
        com.stardust.app.DialogUtils.showDialog(dialog);
    });
};

function setpath(path) {
    var str = path.replace(/(\/sdcard\/.*)(\/.*\.js)/g, "$1/");
    storage.put("path", str);
    dialogs.confirm(TextDic.bak, str + TextDic.ryn, (i) => {
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
