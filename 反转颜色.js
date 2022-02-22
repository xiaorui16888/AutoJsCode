var ab = [
    [,
        () => { //打开 设置
            launchApp("设置");
        },
    ],

    [
        () => { //等待进入  设置界面
            desc("搜索").text("搜索系统设置项").waitFor();
            return true;
        },
        () => { //点击 搜索框
            while (!click("搜索系统设置项"));
        },
    ],

    [
        () => { //等待进入  搜索界面
            id("miui:id/search_btn_cancel").waitFor();
            return true;
        },
        () => { //输入  搜索内容
            setText("反转");
        },
    ],

    [
        () => { //等待  搜索结果
            id("com.android.settings:id/settings_search_item_name").text("颜色反转").waitFor();
            return true;
        },
        () => { //点击 搜索结果
            while (!click("颜色反转"));
        },
    ],

    [
        () => { //等待进入 目标界面
            id("android:id/title").text("颜色反转").waitFor();
            return true;
        },
        () => { //点击  目标
            while (!click("颜色反转"));
        },
    ],

    [,
        () => { //返回  桌面或者其他软件
            back();
            back();
            back();
        },
    ]

];
var a = 0,
    b = 0;

while (a < ab.length) {
    b = a;
    if (ab[a][0]) {
        if (ab[a][0]()) {
            ab[a][1]();
        } else {
            ab[a][2]();
        }
    } else {
        ab[a][1]();
    }
    if (a == b) {
        a++;
    }
}