/*
 * @Author: 白酒煮饭 
 * @Date: 2019-01-07 14:25:48
 * @Last Modified by: QQ:  1641763174
 * @Last Modified time: 2019-10-20 13:59:15
 */
"ui";

importClass(android.graphics.Color);
var color = "#009688";
const baseUrl = "http://abc.svip925.top//";
const versionCode = 4;
const versionName = "0.3.2(内测半成品)";
const My_User = device.getIMEI(); //备份账号,不支持中文
const curFileName = "脚本云";
var TextDic = {
    qq: "是否添加QQ群反馈问题或者向作者提出你宝贵的建议",
    help: "1.脚本备份收费吗？\n答：不收费，脚本备份永久免费\n\n2.存储空间有限制吗？\n答：存储空间不限量不限速\n\n3.要不要注册？我的用户名是啥？\n答：不用注册，我们默认你的账号就手机的IMEI,当然，你也可以自定义你的账号，只有不是中文名就行\n\n4.我的账号会不会被盗？\n答：只有你不泄露你的账号，就不会被盗\n\n5.上传的文件支不支持分享？\n答：目前是不支持分享的。\n\n6.支持脚本项目的备份吗？\n答：很遗憾，是不支持的，目前仅支持单脚本文件的上传\n\n7.json、txt、ini、xml这些文件能上传吗？\n答：目前仅支持js文件的上传，json、txt、ini、xml文件以后会支持\n\n8.下载的文件，存放在哪里？\n答：下载的文件都会存放到备份路径\n\n9.怎么设置备份路径？\n答：在第一页，底部第一个按钮，然后打开有js文件的文件夹，并选择其中一个js文件\n\n10.对上传的文件名有什么条件吗？\n答：有的，文件名不能带有+、&、/\n\n11.为什么有的文件会上传失败？\n答：可能是网络问题，或者是服务器抽风啦，重新试下就好了\n\n12.为什么网盘上的脚本不能删除？刷新之后还有？\n答：可能是你的文件名带有特殊字符，见Q&A.10，如果你一定必须要删除，好吧，带上你的账号来找我们",
    msg: "此脚本仅为Auto.Js的使用者，提供服务支持，我们开发的原因是我们很多时候，常常会因为忘记了备份脚本导致自己辛辛苦苦编写的脚本被垃圾清理误删除，或者手机不小心掉了等等，这是我们是不能忍受的，所以此工具的诞生意义就在于解决这些烦恼。无需注册，我们会根据你的手机IMEI创建一个文件夹，里面存放的你的脚本，或者你自己用的QQ也行，不过不能是中文。\n\n如果你有好的想法或者建议欢迎向我们反馈。\n\n感谢@笔青居提供的上传及获取列表的PHP源码"
};
var storage = storages.create("backups_path");
var upLog = null;
storage.remove("backups_path");
var Local_List = [],
    Service_List = [],
    DataTemp = [];
var basePath = storage.get("path");
if (basePath == null) {
    basePath = "/sdcard/脚本/";
}
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="脚本云 v{{versionName}}" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="swipe1">
                        <vertical>
                            <text id="text" w="*" textSize="16sp" textColor="#000000" maxLines="1" ellipsize="start" />
                            <list id="list" layout_weight="1">
                                <card w="*" margin="5" cardCornerRadius="10dp" cardElevation="1dp" >
                                    <horizontal gravity="center_vertical" bg="#d3d3d3">
                                        <vertical layout_weight="1" padding="5">
                                            <text w="*" textSize="20sp" textColor="#000000" maxLines="1" ellipsize="middle" text="{{this.fileName}}" />
                                        </vertical>
                                        <checkbox id="done" h="*" margin="4" checked="{{done}}" visibility="{{isCanLook}}" />
                                    </horizontal>
                                </card>
                            </list>

                            <horizontal gravity="center">
                                <button id="dxup" layout_weight="1" text="多选" />
                                <button id="openup" layout_weight="1" text="开始上传" />
                                <button id="lookpath" layout_weight="2" text="选择路径" textSize="15sp" style="Widget.AppCompat.Button.Borderless.Colored" />
                                <button id="exit" text="退出" layout_weight="1" />
                            </horizontal>
                        </vertical>
                    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
                </frame>
                <frame>
                    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="swipe2">
                        <vertical>
                            <text id="text2" w="*" text="服务器文件列表加载中..." gravity="center" textSize="16sp" textColor="#000000" maxLines="1" ellipsize="start" />
                            <progressbar id="progress2" w="*" h="auto" indeterminate="true" layout_gravity="top" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" />
                            <list id="list2" layout_weight="1">
                                <card w="*" margin="5" cardCornerRadius="10dp" cardElevation="1dp" >
                                    <horizontal gravity="center_vertical" bg="#d3d3d3">
                                        <vertical layout_weight="1" padding="5">
                                            <text w="*" textSize="20sp" textColor="#000000" maxLines="1" ellipsize="middle" text="{{this.fileName}}" />
                                        </vertical>
                                        <checkbox id="done" h="*" margin="4" checked="{{done}}" visibility="{{isCanLook}}" />
                                    </horizontal>
                                </card>
                            </list>
                            <horizontal gravity="center">
                                <button id="duxuan" layout_weight="1" text="多选" />
                                <button id="allDown" layout_weight="1" text="开始下载" />
                                <button id="del" layout_weight="1" text="删除" />
                            </horizontal>
                        </vertical>
                    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
                </frame>
                <frame>
                    <vertical>
                        {/* 脚本共享 */}
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);
activity.setSupportActionBar(ui.toolbar);
ui.viewpager.setTitles(["本机脚本", "云端脚本", "共享脚本"]);
ui.tabs.setupWithViewPager(ui.viewpager);

log = function () {
    var arg = new Array;
    for (var i = 0; i < arguments.length; i++) {
        arg.push(arguments[i]);
    };
    ui.run(() => {
        ui.text.setText(new Date().toTimeString().split(" ")[0] + "/: " + String(arg));
        ui.text2.setText(new Date().toTimeString().split(" ")[0] + "/: " + String(arg));
    });
};
ui.exit.click(ui.finish);

ui.lookpath.on("click", () => {
    dialogs.rawInput("脚本所在路径", basePath, function (str) {
        if (str) {
            alert("您的脚本路劲已设置为:\n" + str);
            storage.put("path", str); basePath = str;toast("请刷新后查看");
        }
    });
});
ui.dxup.click(function (v) {
    if (v.getText() == "多选") {
        v.setText("取消");
        Local_List.forEach(item => {
            item.isCanLook = "visible";
        });
        ui.list.adapter.notifyDataSetChanged();
    } else {
        v.setText("多选");
        DataTemp = [];
        Local_List.forEach(item => {
            item.isCanLook = "gone";
        });
        ui.list.adapter.notifyDataSetChanged();
    };
});

ui.list.on("item_bind", function (itemView, itemHolder) {
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        item.done = checked;
        if (checked) {
            DataTemp.push({
                "fileName": item.fileName
            })
        } else {
            remove(DataTemp, item.fileName);
        }
    });
});
ui.list.on("item_click", function (items, pos) {
    let item = items.fileName;
    let a = ["上传", "运行", "打开", "删除", "取消"];
    dialogs.select(item, a, function (i) {
        switch (i) {
            case 0:
                threads.start(function () {
                    上传脚本("", basePath, item);
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
                列表删除(false, pos, basePath + item);
                break;
        }
    });
});
ui.list2.on("item_bind", function (itemView, itemHolder) {
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        item.done = checked;
        if (checked) {
            DataTemp.push({
                "fileName": item.fileName
            });
        } else {
            remove(DataTemp, item.fileName);
        }
    });
});
ui.list2.on("item_click", function (items, pos) {
    threads.start(function () {
        let item = items.fileName;
        let a = ["下载", "运行", "删除", "查看", "取消"];
        dialogs.select(item, a, function (i) {
            switch (i) {
                case 0:
                    threads.start(function () {
                        下载脚本("", basePath, item);
                    });
                    break;
                case 1:
                    confirm("提示", "请确保你要运行的脚本经过测试且成功运行，否则可能会导致软件崩溃，是否继续？", (value) => {
                        if (value) {
                            threads.start(function () {
                                toast("正在从服务器获取脚本，请稍候。。。");
                                let code = 下载脚本("", basePath, item);
                                try {
                                    engines.execScript("temp", code);
                                } catch (e) {
                                    toast("代码运行出错");
                                }
                            });
                        };
                    });
                    break;
                case 2:
                    列表删除(true, pos, item);
                    break;
                case 3:
                    threads.start(function () {
                        toast("正在打开，请稍候。");
                        files.write("/sdcard/.temp.js", http.get(baseUrl + "download.php?user=" + My_User + "&name=" + item).body.string());
                        OpenFile("/sdcard/.temp.js");
                    });
                    break;
            }
        });
    });
});
ui.openup.click(function (v) {
    if (ui.dxup.getText() == "取消") {
        threads.start(function () {
            if (多选操作("UP", DataTemp)) {
                ui.run(function () {
                    ui.openup.setText("开始上传");
                });
            }
        });
    } else if (v.getText() == "开始上传" && ui.dxup.getText() != "取消") {
        confirm("提示", "该操作会全部上传列表的文件，是否继续？", (value) => {
            if (value) {
                ui.run(function () {
                    v.setText("停止上传");
                    ui.text.text("上传开始");
                });
                threads.start(function () {
                    if (多选操作("UP", Local_List)) {
                        ui.run(function () {
                            ui.openup.setText("开始上传");
                        });
                    }
                });
            }
        });
    } else if (v.getText() == "停止上传") {
        toast("已停止");
        ui.run(function () {
            ui.text.setText("上传已停止");
            v.setText("开始上传");
        });
        threads.shutDownAll();
    }
});

ui.swipe1.setColorSchemeColors(Color.RED, Color.BLUE, Color.GREEN);
ui.swipe1.setOnRefreshListener({
    onRefresh: function () {
        本地脚本加载(basePath);
        ui.swipe1.setRefreshing(false);
    },
});

ui.swipe2.setOnRefreshListener({
    onRefresh: function () {
        ui.run(function () {
            ui.text2.setText("服务器文件列表加载中...");
            ui.progress2.setVisibility(0);
        });
        云端脚本加载();
        ui.swipe2.setRefreshing(false);
    },
});

ui.allDown.click(function (v) {
    if (ui.duxuan.getText() == "取消") {
        threads.start(function () {
            if (多选操作("DOWN", DataTemp)) {
                ui.run(function () {
                    ui.allDown.setText("开始下载");
                });
            }
        });
    } else if (v.getText() == "开始下载" && ui.duxuan.getText() != "取消") {
        confirm("提示", "该操作会全部下载列表的文件，是否继续？", (value) => {
            if (value) {
                ui.run(function () {
                    v.setText("停止下载");
                    ui.text2.text("下载开始");
                });
                threads.start(function () {
                    if (多选操作("DOWN", Service_List)) {
                        ui.run(function () {
                            ui.duxuan.setText("开始下载");
                        });
                    }
                });
            }
        });
    } else if (v.getText() == "停止下载") {
        toast("已停止");
        ui.run(function () {
            ui.text2.setText("下载已停止");
            v.setText("开始下载");
        });
        threads.shutDownAll();
    }
});
ui.duxuan.click(function (v) {
    if (v.getText() == "多选") {
        v.setText("取消");
        Service_List.forEach(item => {
            item.isCanLook = "visible";
        });
        ui.list2.adapter.notifyDataSetChanged();
    } else {
        v.setText("多选");
        DataTemp = [];
        Service_List.forEach(item => {
            item.isCanLook = "gone";
        });
        ui.run(function () {
            ui.list2.adapter.notifyDataSetChanged();
        });
    };
});
ui.del.click(function (v) {
    if (v.getText() == "删除" && ui.duxuan.getText() == "取消") {
        confirm("提示", "该操作会删除已选择的文件，删除后无法恢复，是否继续？", (value) => {
            if (value) {
                ui.run(function () {
                    v.setText("停止删除");
                    ui.del.text("删除");
                });
                threads.start(function () {
                    if (多选操作("DEL", DataTemp)) {
                        ui.run(function () {
                            ui.del.setText("删除");
                        });
                    }
                });
            }
        });
    } else {
        toast("请先选择文件");
        return;
    }
});

ui.emitter.on("create_options_menu", menu => {
    menu.add("更新日志");
    menu.add("反馈");
    menu.add("帮助");
    menu.add("关于");
});
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "帮助":
            alert("帮助", TextDic.help);
            break;
        case "更新日志":
            alert("更新日志", upLog.content);
            break;
        case "反馈":
            confirm("提示", TextDic.qq, (e) => {
                if (e) {
                    app.startActivity({
                        action: "android.intent.action.VIEW",
                        data: "mqqapi://card/show_pslcard?card_type=group&uin=952614347",
                        packageName: "com.tencent.mobileqq",
                    });
                }
            });
            break;
        case "关于":
            alert("关于 v0.0.1", TextDic.msg);
            break;
    }
    e.consumed = true;
});

main()

function main() {
    本地脚本加载(basePath)
    云端脚本加载();
    checkVersion()
}

function 云端脚本加载(is) {
    threads.start(function () {
        let res = http.get(baseUrl + "codelist.php?user=" + My_User);
        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let json = res.body.json();
        let UpDate = json.map(function (file) {
            return {
                fileName: file.fileName,
                done: false,
                isCanLook: (is ? "visible" : "gone")
            };
        });
        ui.run(function () {
            ui.list2.setDataSource(UpDate);
            ui.progress2.setVisibility(8);
            let txt = "服务器文件列表加载完成✅";
            log(txt)
            ui.text2.text(txt);
            ui.duxuan.setText("多选");
        });
        Service_List = UpDate;
        string(1, "云端脚本" + Service_List.length);
    });
}

function 本地脚本加载(path, is) {
    let fileList = files.listDir(path, function (name) {
        return name.endsWith(".js") && files.isFile(files.join(path, name));
    });
    ui.text.setText(String(path));
    let UpDate = fileList.map(function (file) {
        return {
            fileName: file,
            done: false,
            isCanLook: (is ? "visible" : "gone")
        };
    });
    Local_List = UpDate;
    string(0, "本地脚本" + Local_List.length);
    ui.run(function () {
        ui.list.setDataSource(UpDate);
        ui.dxup.setText("多选");
    });
}

function string(id, text) {
    ui.run(function () {
        ui.tabs.getTabAt(id).setText(text);
    });
}

function remove(Arr, val) {
    for (let i in Arr) {
        if (Arr[i].fileName == val) {
            Arr.splice(i, 1);
        }
    }
};

function 列表删除(id, pos, Name) {
    if (id) {
        删除文件(Name);
        if (pos) {
            Service_List.splice(pos, 1);
            string(1, String("云端脚本" + Service_List.length));
        }
    } else {
        if (files.remove(Name)) toast("文件删除成功!");
        Local_List.splice(pos, 1);
        string(0, String("本机脚本" + Local_List.length));
    }
}

function run(code) {
    threads.start(function () {
        try {
            engines.execScript("temp", code);
        } catch (e) {
            toast("代码运行出错");
        }
    });
}

function 下载脚本(txt, localPath, name) {
    try {
        let res = http.get(baseUrl + "download.php?user=" + My_User + "&name=" + name);
        if (res.statusCode != 200) {
            toastLog("下载失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let str = res.body.string();
        ui.run(function () {
            ui.text2.text(txt + name + " ：下载完成");
        });
        if (localPath) {
            files.write(localPath + name, str);
        } else {
            return str;
        }
    } catch (e) {
        log(e)
        toastLog("下载出错啦");
        return false;
    }
}


function OpenFile(file) {
    if (context.getPackageName() == "org.autojs.autojs") {
        var i = app.intent({
            data: "file:" + file,
            packageName: "org.autojs.autojs",
            className: "org.autojs.autojs.ui.edit.EditActivity_",
        });
        app.startActivity(i);
    } else {
        app.viewFile(file);
    }
}

function 上传脚本(txt, path, name) {
    try {
        let res = http.postMultipart(baseUrl + "pushcode.php?user=" + My_User, {
            "file": open(path + name)
        });
        let json = res.body.json();
        let body = json["code"];
        if (body == 200 || body == 201 || body == 202) {
            ui.run(function () {
                ui.text.text(txt + name + "：" + json["msg"]);
            });
        } else {
            toastLog("上传出错啦!!");
        }
    } catch (e) {
        log(e), toastLog("脚本上传出错 ");
    }
}


function 多选操作(isUp, list) {
    let count = 0;
    for (let i in list) {
        if (isUp == "UP") {
            上传脚本(String(parseInt(i) + 1 + "/" + list.length) + "   ", basePath, list[i].fileName);
        } else if (isUp == "DEL") {
            log(list[i].fileName)
            列表删除(true, false, list[i].fileName);
        } else if (isUp == "DOWN") {
            下载脚本(String(parseInt(i) + 1 + "/" + list.length) + "   ", basePath, list[i].fileName);
        }
        count++;
    }
    DataTemp = [];
    云端脚本加载();
    本地脚本加载(basePath);
    ui.run(function () {
        if (isUp) {
            ui.text.setText(count + "个文件上传完成");
        } else {
            ui.text2.setText(count + "个文件下载完成");
        }
    });
    return true;
}


function 删除文件(filename) {
    var res = http.get(baseUrl + "del.php?user=" + My_User + "&name=" + filename);
    let json = res.body.json();
    try {
        let body = json["code"];
        if (body == 200 || body == 201 || body == 202) {
            ui.run(function () {
                ui.text2.text(filename + "：" + json["msg"]);
            });
        } else {
            toastLog("删除出错啦!!");
        }
    } catch (e) {
        log(e);
        toastLog("删除出错");
    }
}

function checkVersion() {
    threads.start(function () {
        let res = http.get(baseUrl + "updata.json");
        upLog = http.get(baseUrl + "/yun_code/upLog.json").body.json();
        if (res.statusCode != 200) {
            toast("更新失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let json = res.body.json();
        if (versionCode < json["versionCode"]) {
            confirm(json["title"] + json["versionName"], json["content"], (value) => {
                if (value) {
                    threads.start(function () {
                        toast("正在更新。。请稍候。。。。");
                        basePath = engines.myEngine().cwd();
                        codePath = basePath + "/脚本云.js";
                        files.write(http.get(json["url"]).body.string(), codePath)
                        toast("正在打开。。。");
                        ui.finish();
                        engines.execScriptFile(codePath);
                    });
                }
            });
        }
    });
}