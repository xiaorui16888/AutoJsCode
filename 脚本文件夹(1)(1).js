"ui";
ui.layout(
    <vertical>
        <list id="list" layout_weight="1">
            <card w="*" margin="5" cardCornerRadius="10dp" cardElevation="1dp" >
                <vertical w="*" padding="5" bg="{{getBG(this)}}">
                    <text w="*" textSize="20sp" textColor="#000000" maxLines="1" ellipsize="middle" text="{{name}}"/>
                    <text w="*" textSize="16sp" textColor="#000000" maxLines="1" ellipsize="start" text="{{path}}"/>
                    <text w="*" textSize="16sp" textColor="#000000" maxLines="1" ellipsize="middle" text="{{getSize(length())}}"/>
                </vertical>
            </card>
        </list>
        <horizontal w="*">
            <button id="exit_" layout_weight="1" text="退出" />
            <button id="return_" layout_weight="1" text="返回" />
        </horizontal>
    </vertical>
);

ui.exit_.click(ui.finish);
ui.return_.click(toBack);

var StartDirFile = new java.io.File("/sdcard/脚本");

var CurrentDirFile = new java.io.File(StartDirFile);
UpListDate(CurrentDirFile);

ui.list.on("item_click", function(item, i, itemView, listView) {
    if (item.isDirectory()) {
        CurrentDirFile = item;
        UpListDate(CurrentDirFile);
    } else if (item.isFile()) {
        openFile(item);
    };
});

ui.emitter.on("back_pressed", e => {
    e.consumed = toBack();
});

function UpListDate(path) {
    var file = new java.io.File(path);
    //    log(file);
    var fileList = file.listFiles();
    //    log(fileList);
    var dirList = fileList.filter(function(file) {
        return file.isDirectory();
    }).sort();
    var fileList = fileList.filter(function(file) {
        return file.isFile();
    }).sort();

    ui.list.setDataSource(dirList.concat(fileList));
};

function toBack() {
    if (!CurrentDirFile.equals(StartDirFile)) {
        CurrentDirFile = CurrentDirFile.getParentFile();
        UpListDate(CurrentDirFile);
        return true;
    } else {
        return false;
    };
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
        toast("暂不支持");
    };
};



//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～


var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;
var rainbowColor2 = ['#ffff0000',
    '#ffffa500',
    '#ffffff00',
    '#ff00ff00',
    '#ff007fff',
    '#ff0000ff',
    '#ff8b00ff'
];


function getBG(f) {
    var s = Math.ceil(f.length() / 2925);
    var i = s > rainbowColor2.length ? rainbowColor2.length : s;
    return f.directory ? AA("#440044") : AA(rainbowColor2[rainbowColor2.length - i]);

    function AA(c) {
        var r = colors.red(c);
        var g = colors.green(c);
        var b = colors.blue(c);
        return colors.toString(colors.argb(63, r, g, b));

    };
};

function getSize(size) {
    var asize;
    switch (true) {
        case 1 <= Math.round(size / 1073741824):
            asize = Math.floor(size / 1073741824 * 100) / 100 + "MB";
            break;
        case 1 <= Math.round(size / 1048576):
            asize = Math.floor(size / 1048576 * 100) / 100 + "MB";
            break;
        case 1 <= Math.round(size / 1024):
            asize = Math.floor(size / 1024 * 100) / 100 + "KB";
            break;
        default:
            asize = size + "B";
    };
    return asize;
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


//{"name":"equals","type":"function","string":"function equals() {/* boolean equals(java.lang.Object) */} "}
//{"name":"getParentFile","type":"function","string":"function getParentFile() {/* java.io.File getParentFile() */} "}
//{"name":"isDirectory","type":"function","string":"function isDirectory() {/* boolean isDirectory() */} "}