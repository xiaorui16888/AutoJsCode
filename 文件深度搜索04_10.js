"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月10日 下午9:30:15
 *Auto.js版本: 4.1.0 Alpha5
 *备注: 侧拉菜单添加选项。
 **/

ui.layout(
    <drawer id="drawer">
        <vertical>
            <text id="text" w="*" lines="1" ellipsize="middle"/>
            <horizontal w="*">
                <input id="input_p" hint="*路径" layout_weight="1" lines="1"/>
                <!--<button id="but_s_p" w="auto" text="选择"/>-->
                <input id="input_s" w="auto" hint="深度" />
            </horizontal>
            <text w="*" gravity="center" textSize="10sp" lines="1" autoLink="web" text="正则表达式学习网址: http://www.runoob.com/jsref/jsref-obj-regexp.html"/>
            <input id="input_d" hint="文件夹(字符或正则)"/>
            <input id="input_f" hint="*文件(字符或正则)"/>
            <input id="input_f_s" hint="文件内容(字符或正则)"/>
            <horizontal w="*">
                <button id="but_p" layout_weight="1" text="路经搜索"/>
                <button id="but_e" w="auto" text="结果中搜索"/>
            </horizontal>
            <list id="list" w="*" layout_weight="1">
                <vertical w="*" margin="5" bg="{{colors.toString(colors.LTGRAY)}}">
                    <text w="*" text="{{name}}" textSize="20sp" lines="1" ellipsize="middle"/>
                    <text w="*" text="{{parent}}" lines="1" ellipsize="start"/>
                </vertical>
            </list>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" >
        <text id="help" w="*"/>
            <button id="input_list_add"w="*"text="加入当前"/>
            <list id="input_list" w="*" layout_weight="1">
                <horizontal w="*" margin="5">
                    <vertical layout_weight="1" h="*">
                        <horizontal w="*" layout_weight="1">
                            <text layout_weight="1" h="*"margin="1"text="{{path}}" lines="1" ellipsize="middle" bg="{{colors.toString(colors.LTGRAY)}}"/>
                            <text w="auto" h="*"margin="1"padding="4 0 4 0"text="{{depth}}" lines="1" ellipsize="start" bg="{{colors.toString(colors.LTGRAY)}}"/>
                        </horizontal>
                        <text w="*"layout_weight="1" margin="1"text="{{dirNameRegExp}}" lines="1" ellipsize="start"bg="{{colors.toString(colors.LTGRAY)}}"/>
                        <text w="*"layout_weight="1" margin="1"text="{{fileNameRegExp}}" lines="1" ellipsize="start"bg="{{colors.toString(colors.LTGRAY)}}"/>
                        <text w="*"layout_weight="1" margin="1"text="{{fileInsideRegExp}}" lines="1" ellipsize="start"bg="{{colors.toString(colors.LTGRAY)}}"/>
                    </vertical>
                    <vertical w="auto">
                        <button id="but_delete"w="60" layout_weight="1"text="删除"/>
                        <button id="but_use"w="60" layout_weight="1"text="使用"/>
                    </vertical>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);
ui.help.setText("搜索结果，点击可以打开，长按可以选择其他方式");
toast("侧拉菜单里有");
var storage = storages.create("文件深度搜索");
var CurrentThis = this;
var UiInputObj = {
    path: "/sdcard",
    depth: "2",
    dirNameRegExp: "脚本",
    fileNameRegExp: ".js",
    fileInsideRegExp: ""
};
var UiInputObjList = [UiInputObj];
var UiInputObj = storage.get("InputObj", UiInputObj);
var UiInputObjList = storage.get("InputObjList", UiInputObjList);
ui.run(() => {
    let obj = UiInputObj;
    let objList = UiInputObjList;
    ui.input_p.setText(obj.path);
    ui.input_s.setText(obj.depth);
    ui.input_d.setText(obj.dirNameRegExp);
    ui.input_f.setText(obj.fileNameRegExp);
    ui.input_f_s.setText(obj.fileInsideRegExp);
    ui.input_list.setDataSource(objList);
});
events.on("exit", function() {
    log("结束运行");
    storage.put("InputObj", {
        path: String(ui.input_p.getText()),
        depth: String(ui.input_s.getText()),
        dirNameRegExp: String(ui.input_d.getText()),
        fileNameRegExp: String(ui.input_f.getText()),
        fileInsideRegExp: String(ui.input_f_s.getText())
    });
    storage.put("InputObjList", UiInputObjList);
});

ui.input_list_add.on("click", function() {
    let obj = {
        path: String(ui.input_p.getText()),
        depth: String(ui.input_s.getText()),
        dirNameRegExp: String(ui.input_d.getText()),
        fileNameRegExp: String(ui.input_f.getText()),
        fileInsideRegExp: String(ui.input_f_s.getText())
    };
    let objList = UiInputObjList;
    if (objList.every(function(ob) {
            for (let i in ob) {
                if (ob[i] != obj[i]) {
                    return true;
                };
            };
            return false;
        })) {
        objList.unshift(obj);
        while (objList.length > 30) {
            objList.pop();
        };
    } else {
        toast("已有,不能重复");
    };
});
ui.input_list.on("item_bind", function(itemView, itemHolder) {
    itemView.but_delete.on("click", function() {
        threads.start(function() {
            let item = itemHolder.item;
            let objList = UiInputObjList;
            if (dialogs.confirm("真的要删除吗")) {
                device.vibrate(100);
                objList.splice(itemHolder.position, 1);
            };
        });
    });
    itemView.but_use.on("click", function() {
        ui.run(() => {
            let obj = itemHolder.item;
            ui.input_p.setText(obj.path);
            ui.input_s.setText(obj.depth);
            ui.input_d.setText(obj.dirNameRegExp);
            ui.input_f.setText(obj.fileNameRegExp);
            ui.input_f_s.setText(obj.fileInsideRegExp);
            ui.drawer.closeDrawers();
        });
    });
})




var thread = null;

var fileList = new Array;


ui.but_p.click(function(v) {
    device.vibrate(100);
    if (thread ? !thread.isAlive() : true) { //线程没有运行。

        var path = String(ui.input_p.getText());
        log("path " + path);
        if (!path) {
            toast("请输入路径");
            return;
        };
        //获取输入的路径。
        var C = parseInt(ui.input_s.getText());
        log("C" + C);
        //获取搜索深度。
        var dirReg = String(ui.input_d.getText());
        log("dirReg " + dirReg);
        if (dirReg) {
            try {
                var Reg = eval("(" + dirReg + ")");
                if (Reg instanceof RegExp) {
                    dirReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件夹名的搜索字段。
        var fileReg = String(ui.input_f.getText());
        log("fileReg " + fileReg);
        if (!fileReg) {
            toast("必须输入文件名搜索字段");
            return;
        };
        try {
            var Reg = eval("(" + fileReg + ")");
            if (Reg instanceof RegExp) {
                fileReg = Reg;
            };
        } catch (e) {};

        //获取文件名的搜索字段
        var fileInsideReg = String(ui.input_f_s.getText());
        log("fileInsideReg " + fileInsideReg);
        if (fileInsideReg) {
            try {
                var Reg = eval("(" + fileInsideReg + ")");
                if (Reg instanceof RegExp) {
                    fileInsideReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件内容搜索字段
        fileList = new Array;
        ui.run(() => {
            ui.list.setDataSource(fileList);
            ui.but_p.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            //在线程里面执行其他事情。比如点击滑动等自动操作。(需要无障碍权限)
            //提示线程开始运行。
            searchFiles(path, fileList, {
                dir: dirReg,
                file: fileReg,
                fileIn: fileInsideReg
            }, C);
            toastLog("搜索完成");
            sleep(250);
            ui.run(() => {
                ui.but_p.setText("路经搜索");
                ui.text.setText("已找到 " + fileList.length + " 个文件");
            });
        });
    } else {
          if(v.getText()=="停止"){
      thread.interrupt();
        ui.run(() => {
            ui.but_p.setText("路经搜索");
        });
        };
    };

});

ui.but_e.click(function(v) {
    device.vibrate(100);
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        let oldFileList = fileList;
        if(!oldFileList.length){
            toast("没有结果，请先搜索");
            return ;
        };

        var path = String(ui.input_p.getText());
        log("path " + path);
        if (!path) {
            toast("请输入路径");
            return;
        };
        //获取输入的路径。
        var C = parseInt(ui.input_s.getText());
        log("C" + C);
        //获取搜索深度。
        var dirReg = String(ui.input_d.getText());
        log("dirReg " + dirReg);
        if (dirReg) {
            try {
                var Reg = eval("(" + dirReg + ")");
                if (Reg instanceof RegExp) {
                    dirReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件夹名的搜索字段。
        var fileReg = String(ui.input_f.getText());
        log("fileReg " + fileReg);
        if (!fileReg) {
            toast("必须输入文件名搜索字段");
            return;
        };
        try {
            var Reg = eval("(" + fileReg + ")");
            if (Reg instanceof RegExp) {
                fileReg = Reg;
            };
        } catch (e) {};

        //获取文件名的搜索字段
        var fileInsideReg = String(ui.input_f_s.getText());
        log("fileInsideReg " + fileInsideReg);
        if (fileInsideReg) {
            try {
                var Reg = eval("(" + fileInsideReg + ")");
                if (Reg instanceof RegExp) {
                    fileInsideReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件内容搜索字段
        fileList = new Array;
        ui.run(() => {
            ui.list.setDataSource(fileList);
            ui.but_e.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            //在线程里面执行其他事情。比如点击滑动等自动操作。(需要无障碍权限)
            //提示线程开始运行。
            searchFiles_in_list(oldFileList, fileList, {
                dir: dirReg,
                file: fileReg,
                fileIn: fileInsideReg
            }, C);
            toastLog("搜索完成");
            sleep(250);
            ui.run(() => {
                ui.but_e.setText("结果中搜索");
                ui.text.setText("已找到 " + fileList.length + " 个文件");
            });
        });
    } else {
        if(v.getText()=="停止"){
             thread.interrupt();
             ui.run(() => {
                 ui.but_e.setText("结果中搜索");
            });
        };
    };
});




ui.list.on("item_click", function(item, i, itemView, listView) {
    device.vibrate(100);
    openFile(new java.io.File(item.path));

});

ui.list.on("item_long_click", function(e, item, i, itemView, listView) {
    device.vibrate(100);
    var x = itemView.getX(),
        y = listView.getY() + itemView.getY(),
        w = itemView.getWidth(),
        h = itemView.getHeight();
    ui.run(() => {
        var view = XmlToView(
            <vertical>
                                <text w="*" text={item.name} gravity="center"maxLines="1"ellipsize="start"/>
                                <horizontal gravity="center">
                                    <button id="copy" w="auto" h="auto" text="复制路经"/>
                                    <button id="share" w="auto" h="auto" text="分享文件"/>
                                    <button id="delete" w="auto" h="auto" text="删除文件"/>
                                </horizontal>
                            </vertical>
        );
        var window = showPopupWindow(view, activity, x + w * 0.1, y, w * 0.8, h * 1.5);
        view.copy.click(function() {
            setClip(item.path);
            toast("已复制\n" + item.path);
            window.dismiss();
        });
        view.share.click(function() {
            new weiFile([item.path]).share();
            window.dismiss();
        });
        view.delete.click(function() {
            threads.start(function() {
                if (dialogs.confirm("真的要删除文件吗", item.name)) {
                    device.vibrate(100);
                    if (files.remove(item.path)) {
                        toast("删除成功");
                        fileList.splice(i, 1);
                    } else {
                        toast("(｡•́︿•̀｡)删除失败");
                    };
                };
            });
            window.dismiss();
        });
    });

    e.consumed = true;
});




function searchFiles(dir, list, matchObj, C, D) {
    ui.run(() => {
        ui.text.setText(String(dir));
    });
    //遍历该文件夹的文件
    files.listDir(dir).forEach(fileName => {
        var path = files.join(dir, fileName);
        //如果是子文件夹则继续扫描子文件夹的文件
        if (files.isDir(path)) {
            if ((!C && C != 0) || C > 0) {
                if (!D) {
                    if (!matchObj.dir || isMatch(fileName, matchObj.dir)) {
                        searchFiles(path, list, matchObj, C - 1, true);
                    };
                } else {
                    searchFiles(path, list, matchObj, C - 1, D);
                };
            };
        } else {
            if (!matchObj.dir || D) {
                if (!matchObj.file || isMatch(fileName, matchObj.file)) {
                    if (!matchObj.fileIn || isMatch(String(files.read(path)), matchObj.fileIn)) {
                        //则把它添加到列表中
                        list.push({
                            name: fileName,
                            parent: dir,
                            path: path
                        });
                    };
                };
            };
        };
    });
};

function searchFiles_in_list(oldList, list, matchObj) {
    for (let i in oldList) {
        let fileName = oldList[i].name;
        let path = oldList[i].path;
        ui.run(() => {
            ui.text.setText(String(fileName));
        });
        log(oldList[i]);
        if (!matchObj.file || isMatch(fileName, matchObj.file)) {
            if (!matchObj.fileIn || isMatch(String(files.read(path)), matchObj.fileIn)) {
                //则把它添加到列表中
                list.push(oldList[i]);
            };
        };
    };

};


function isMatch(string, match) {
    if (typeof string != "string") {
        throw ">" + string + "< must be string"
    };
    if (!(typeof match == "string" || match instanceof RegExp)) {
        throw ">" + match + "< must be string or regexp"
    };
    return match instanceof RegExp ? match.test(string) : (string.indexOf(match) + 1);
};

function XmlToView(xml) {
    runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
};

function showPopupWindow(view, ctx, x, y, w, h) {
    var window = new android.widget.PopupWindow();
    window.setContentView(view);
    w ? window.setWidth(w) : 1;
    h ? window.setHeight(h) : 1;
    window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
    window.setFocusable(true);
    window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x, y);
    return window;
};

function openFile(file) {
    if (nameToType(file.getName()) == "文本") {
        var i = app.intent({
            data: file.toURI(),
            packageName: "org.autojs.autojs",
            className: "org.autojs.autojs.ui.edit.EditActivity_",
        });
        app.startActivity(i);
        return true;
    } else {
        //toast("暂不支持");
        new weiFile([file]).open();
        //app.editFile(String(item.path));

    };
};

function nameToType(name) {
    var fileType = {
        文本: {
            img: "format_text.png",
            ends: ["js", "txt", "json"]
        },
        图片: {
            img: "format_picture.png",
            ends: ["png", "jpg"]
        },
        音乐: {
            img: "format_music.png",
            ends: ["mp3", "m4a"]
        },
        视频: {
            img: "format_media.png",
            ends: ["mp4"]
        },
        安装包: {
            img: "format_apk.png",
            ends: ["apk"]
        },
        压缩包: {
            img: "format_zip.png",
            ends: ["zip"]
        },
        数据: {
            img: "format_unkown.png",
            ends: ["abc"]
        }
    };

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



//下面是要主要功能的模块。
function weiFile(pathList, ctx) {
    this.open = function() {
        try {
            var intent = new android.content.Intent("android.intent.action.VIEW");
            intent.setDataAndType(this.uriList[0], this.MIMEType);
            ctx.startActivity(Intent.createChooser(intent, "打开文件"));
        } catch (e) {
            toastLog(e);
        };
    };
    this.share = function() {
        try {
            if (this.uriList.length > 1) {
                //分享多个文件。
                var sendIntent = new android.content.Intent();
                sendIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
                sendIntent.putExtra(Intent.EXTRA_STREAM, this.uriList);
                sendIntent.setType("*/*");
                ctx.startActivity(Intent.createChooser(sendIntent, "分享" + this.uriList.length + "个文件"));
            } else {
                //分享单个文件。
                var sendIntent = new android.content.Intent();
                sendIntent.setAction(Intent.ACTION_SEND);
                sendIntent.putExtra(Intent.EXTRA_STREAM, this.uriList[0]);
                sendIntent.setType(this.MIMEType);
                ctx.startActivity(Intent.createChooser(sendIntent, "分享" + this.uriList.length + "个文件"));
            };
        } catch (e) {
            toastLog(e);
        };
    };
    this.getMIMEType = function(file) {
        var MIME_MapTable = {
            'text': ['.txt', '.c', '.conf', '.cpp', '.h', '.htm', '.html', '.java', '.txt', '.js', '.log', '.prop', '.rc', '.sh', '.xml'],
            'image': ['.bmp', '.gif', '.jpeg', '.jpg', '.png'],
            'audio': ['.m3u', '.m4a', '.m4b', '.m4p', '.mp2', '.mp3', '.mpga', '.ogg', '.rmvb', '.wav', '.wma', '.wmv'],
            'video': ['.3gp', '.asf', '.avi', '.m4u', '.m4v', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpg4'],
            'application': ['.apk', '.bin', '.class', '.doc', '.docx', '.xls', '.xlsx', '.exe', '.gtar', '.gz', '.jar', '.js', '.mpc', '.msg', '.pdf', '.pps', '.ppt', '.pptx', '.rtf', '.tar', '.tgz', '.wps', '.z', '.zip'],
            '*': ['']
        };
        var type = "*/*";
        var fName = String(file.getName());
        var dotIndex = fName.split(".");
        if (dotIndex.length < 2) {
            return type;
        }
        var end = String("." + dotIndex.pop()).toLowerCase();
        if (end == "") {
            return type;
        };
        for (let i in MIME_MapTable) {
            var ary = MIME_MapTable[i];
            for (let a = 0; a < ary.length; a++) {
                if (end == ary[a]) {
                    //toastLog(i + "/*" + "\n" + end);
                    return i + "/*";
                };
            };
        };
        return type;
    };
    this.getUriFromFile = function(file) {
        return new android.net.Uri.parse(file);
        //return android.support.v4.content.FileProvider.getUriForFile(ctx, "org.autojs.autojs.fileprovider", file);
    };
    this.pathExists = (value) => {
        if (typeof value == "string" && files.exists(value)) {
            return true;
        };
        return false;
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctx = ctx || context;
    this.fileList = new Array;
    this.uriList = new Array;
    this.MIMEType;

    //将数组里的元素类型全部强制转换。
    pathList = pathList.map(String);
    log(pathList.join("\n"));
    if (pathList.length && pathList.every(this.pathExists)) { //文件都存在。
        //转换为file列表。
        this.fileList = pathList.map(function(path) {
            return new java.io.File(String(path));
        });

        //判断文件类型是否都相同？
        if (this.fileList.every((file, i, ary) => {
                var MIMEType = this.getMIMEType(file);
                if (!i || this.getMIMEType(ary[i - 1]) == MIMEType) {
                    return true;
                } else {
                    return false;
                };
            })) {
            log("文件类型相同");
            this.MIMEType = this.getMIMEType(this.fileList[0]);
        } else {
            log("文件类型不相同");
            //throw "文件类型不相同";
            this.MIMEType = "*/*";
        };

        //转换为uri列表
        this.uriList = this.fileList.map((file) => {
            return this.getUriFromFile(file);
        });
    } else {
        throw "有文件不存在";
    };

};