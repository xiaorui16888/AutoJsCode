/*
 * @Author: 白酒煮饭 
 * @Date: 2019-5-10 16:14:33 
 * @Last Modified by: QQ:  1641763174
 * @Last Modified time: 2019-10-12 22:53:55
 */
"ui";

ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="探探自动筛选对象" />
            </appbar>
            <frame h="*">
                <ScrollView>
                    <vertical>
                        <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
                        cardElevation="1dp" foreground="?selectableItemBackground">
                        <horizontal gravity="center_vertical">
                            <View bg="#e91e63" h="*" w="10" />
                            <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="14sp" textColor='#000000'/>
                            </vertical>
                            <View bg="#e91e63" h="*" w="10" />
                        </horizontal>
                    </card>
                    <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                        <View bg="#607D8B" h="*" w="10" />
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <text text="退出条件：" textColor="#222222" textSize="70px" maxLines="1" />
                            <horizontal>
                                <horizontal layout_weight="1">
                                    <text text="左滑：" textColor="#999999" textSize="24sp" maxLines="1" />
                                    <input id="input_Left" hint="次数" w="*" inputType="number" maxLength="3"/>
                                </horizontal>
                                <horizontal layout_weight="1">
                                    <text text="右滑：" textColor="#999999" textSize="24sp" maxLines="1" />
                                    <input id="input_Right" hint="次数"  w="*" inputType="number" maxLength="3"/>
                                </horizontal>
                            </horizontal>
                        </vertical>
                        <View bg="#607D8B" h="*" w="10" />
                    </horizontal>
                </card>
                <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground">
                <vertical>
                    <horizontal gravity="center_vertical">
                        <View bg="#4CAF50" h="*" w="10" />
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <horizontal>
                                <text  text="性别  " textColor="#222222" textSize="70px" maxLines="1" />
                                <radiogroup w="*" marginLeft="20px"id="choices1" orientation="horizontal">
                                    <radio text="男"checked="true"size="50px"/>
                                    <radio text="女"checked="false"size="50px"/>
                                    <radio text="全部"checked="false"size="50px"/>
                                </radiogroup>
                            </horizontal>
                        </vertical>
                        <View bg="#4CAF50" h="*" w="10" />
                    </horizontal>
                    <horizontal gravity="center_vertical">
                        <View bg="#4CAF50" h="*" w="10" />
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <horizontal>
                                <checkbox id="isBey" text="颜值" textColor="#222222" textSize="70px"/>
                                <input id="input_Bey" hint="最低颜值通过，最高99" w="*" inputType="number" maxLength="2"/>
                            </horizontal>
                        </vertical>
                        <View bg="#4CAF50" h="*" w="10" />
                    </horizontal>
                    <horizontal gravity="center_vertical">
                        <View bg="#4CAF50" h="*" w="10" />
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <horizontal>
                                <checkbox id="isAge" text="年龄" textColor="#222222" textSize="70px"/>
                                <input id="input_Age" hint="年龄不超过，最高99" w="*" inputType="number" maxLength="2"/>
                            </horizontal>
                        </vertical>
                        <View bg="#4CAF50" h="*" w="10" />
                    </horizontal>
                </vertical>
            </card>
            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" foreground="?selectableItemBackground">
            <vertical>
                <horizontal gravity="center_vertical">
                    <View bg="#29B6F6" h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <horizontal>
                            <text id="isPic" text="保存右滑的图片  " textColor="#222222" textSize="70px" maxLines="1" />
                            <radiogroup w="*" marginLeft="20px"id="choices2" orientation="horizontal">
                                <radio text="是"checked="true"size="50px"/>
                                <radio text="否"checked="false"size="50px"/>
                            </radiogroup>
                        </horizontal>
                    </vertical>
                    <View bg="#29B6F6" h="*" w="10" />
                </horizontal>
                <horizontal gravity="center_vertical">
                    <View bg="#29B6F6" h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <horizontal>
                            <text  text="路径  " textColor="#222222" textSize="70px" maxLines="1" />
                            <input id="input_Path" text="/sdcard/DCIM/探探/" hint="默认保存路径为/sdcatd/DCIM/探探/" w="*" textSize="14" inputType="text"/>
                        </horizontal>
                    </vertical>
                    <View bg="#29B6F6" h="*" w="10" />
                </horizontal>
            </vertical>
        </card>
        <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
        cardElevation="1dp" foreground="?selectableItemBackground">
        <horizontal gravity="center_vertical">
            <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                <text text="程序说明：" textColor="#222222" textSize="16sp" maxLines="1" />
                <text text="1.测试通过环境：探探3.6.8.1，手机：OPPO R11" textColor="#999999" textSize="14sp" maxLines="1" />
                <text text="2.安卓手机系统低于7.0的请绕道" textColor="#999999" textSize="14sp" maxLines="1" />
                <text text="3.该软件不再更新" textColor="#999999" textSize="14sp" maxLines="1" />
                <text text="4.此程序仅用于交流学习，不得用于其他非法活动" textColor="#999999" textSize="14sp" maxLines="1" />
            </vertical>
        </horizontal>
    </card>
    </vertical>
    </ScrollView>
    </frame>
    </vertical>
    <fab id="start" w="auto" h="auto" src="@drawable/ic_play_arrow_black_48dp"
    margin="16" layout_gravity="bottom|right" tint="#ffffff"/>
    </frame>
);

threads.start(function() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
});

//暂停图标  ic_pause_black_48dp
//开始图标  ic_play_arrow_black_48dp
var isRun = false, //运行状态
    isBey = false, //颜值过滤开关
    isAge = false, //年龄过滤开关
    isPic = 0, //保存图片开关
    isSex = 0, //性别选项
    input_Age = 20, //年龄
    input_Bey = 30, //颜值
    input_Left = 50, //左滑次数
    input_Right = 50, //右滑次数
    input_Path = "/sdcatd/DCIM/探探/"; //路径
var stg = storages.create("qq1641763174_tantan");
var set = stg.get("142536");
//storages.remove("qq1641763174_tantan");
if (set != null) {
    ui.isBey.setChecked(set.isBey);
    ui.isAge.setChecked(set.isAge);
    ui.choices1.getChildAt(set.isSex).setChecked(true);
    ui.choices2.getChildAt(set.isPic).setChecked(true);
    ui.input_Left.setText(set.input_Left);
    ui.input_Right.setText(set.input_Right);
    ui.input_Age.setText(set.input_Age);
    ui.input_Bey.setText(set.input_Bey);
    ui.input_Path.setText(set.input_Path);
}
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
ui.isAge.on("check", (checked) => {
    isAge = checked;
});
ui.isBey.on("check", (checked) => {
    isBey = checked;
});


ui.start.on("click", () => {
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }

    isSex = selectedIndex(ui.choices1); //性别开关
    isPic = selectedIndex(ui.choices2); //保存图片开关
    input_Left = ui.input_Left.text(); //左滑次数
    input_Right = ui.input_Right.text(); //右滑次数
    input_Age = ui.input_Age.text(); //年龄
    input_Bey = ui.input_Bey.text(); //颜值
    input_Path = ui.input_Path.text(); //路径
    if (!files.ensureDir(input_Path)) {
        toastLog("路径错误，已使用默认路径");
        input_Path = "/sdcard/DCIM/探探/";
        files.ensureDir(input_Path);
        ui.input_Path.setText(input_Path);
    }

    if (input_Age.length != 0 && input_Bey.length != 0 && input_Path.length != 0 && input_Left.length != 0 && input_Right.length != 0) {
        stg.put("142536", {
            "isSex": isSex, //性别选项
            "isBey": isBey, //颜值开关
            "isAge": isAge, //年龄开关
            "isPic": isPic, //保存图片开关
            "input_Left": input_Left, //左滑次数
            "input_Right": input_Right, //右滑次数
            "input_Age": input_Age, //年龄
            "input_Bey": input_Bey, //颜值
            "input_Path": input_Path //路径存储
        });
    } else {
        toast("请把内容补充完整！");
        return;
    }
    start();
});

function main() {
    threads.start(function() {
        launchApp("探探");
        console.show();
        console.setPosition(device.width / 6, device.height / 1.4);
        sleep(3000);
        while (input_Left > 0 || input_Right > 0) {
            home();
            open_stast();
            sleep(300);
        }
    });
}

function open_stast() {
    console.warn("截屏");
    let imgPath = Head_pic((new Date().getTime()));
    let Face_pro = FaceCken(imgPath);
    //log(Face_pro);//显示结果json
    if (!Face_pro) {
        Ren_Del(1, imgPath); //删除刚才的截图
        console.clear();
        console.error("未检测到人脸，往左滑");
        LeftHua(); //左滑
        console.clear();
        sleep(1000);
        return false;
    }

    let newName = "性别:" + Face_pro.sex + "__年龄:" + Face_pro.age + "__颜值:" + Face_pro.beauty;
    if (isSex != 2) {
        var sex = (isSex) == 0 ? "男" : "女";
    }
    if (isBey == true && isAge == false) {
        if (Face_pro.beauty > input_Bey && isSex == 2 || Face_pro.sex == sex) {
            console.info("颜值大于标准，性别吻合，通过");
            Like(imgPath, newName); //喜欢
        } else {
            console.error("与设置的条件不符合");
            NotLike(imgPath); //不喜欢
        }
    } else if (isBey == false && isAge == true) {
        if (Face_pro.age < input_Age && isSex == 2 || Face_pro.sex == sex) {
            console.info("年龄符合，性别符合，通过");
            Like(imgPath, newName); //喜欢
        } else {
            console.error("与设置的条件不符合");
            NotLike(imgPath); //不喜欢
        }
    } else if (isBey == false && isAge == false) {
        if (isSex == 2 || Face_pro.sex == sex) {
            Like(imgPath, newName); //喜欢
            console.info("性别吻合，通过");
        } else {
            if (Face_pro.sex == sex) {
                console.info("性别吻合，通过");
                Like(imgPath, newName); //喜欢
            } else {
                console.error("与设置的条件不符合");
                NotLike(imgPath); //不喜欢
            }
        }
    } else if (isBey == true && isAge == true) {
        if (Face_pro.beauty > input_Bey && Face_pro.age < input_Age && isSex == 2 || Face_pro.sex == sex) {
            console.info("颜值大于标准，年龄符合，性别吻合，通过");
            Like(imgPath, newName); //喜欢
        } else {
            console.error("与设置的条件不符合");
            NotLike(imgPath); //不喜欢
        }
    }
    sleep(800);
    console.clear();

}
//喜欢
function Like(imgPath, newName) {
    input_Right--;
    RightHua(); //右滑
    if (!isPic) Ren_Del(0, imgPath, newName); //重命名图片
}
//不喜欢
function NotLike(imgPath) {
    input_Left--;
    LeftHua(); //左滑
    Ren_Del(1, imgPath); //删除图片
}

function FaceCken(imgFile) {
    console.info("正在识别。。。");
    let ak = "vpC1MvBHTMVAU0d4cxwGIO5I";
    let sk = "EDx42txNCELwt5pgjeH3upzoKdGEfI0b";
    try {
        let accessToken = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + ak + "&client_secret=" + sk).body.json().access_token;
        let requestUrl = "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + accessToken
        let res = http.post(requestUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            image: img64(imgFile),
            image_type: "BASE64",
            face_field: "age,beauty,gender"
        });
        let html_json = res.body.json();
        if (html_json.error_code != 0) return false;
        var html = html_json.result.face_list;
        console.clear();
        log("\n年龄：" + html[0].age)
        log("颜值：" + html[0].beauty);
        log("性别：" + ((html[0].gender.type) == "male" ? "男" : "女"));
        //var a = (((html[0].beauty > input_Bey) ? console.info("颜值：" + html[0].beauty + " ，通过") : console.error("颜值：" + html[0].beauty + "，低于设定值")));
        return {
            "age": html[0].age,
            "beauty": html[0].beauty,
            "sex": ((html[0].gender.type) == "male" ? "男" : "女")
        }
    } catch (e) {
        toastLog(e);
        LeftHua();
    }
}

function img64(imgFile) {
    let img = images.read(imgFile);
    let img64 = images.toBase64(img);
    //files.write(path2, base);
    return img64;
}

function Ren_Del(is, path, newName) {
    if (is) {
        files.remove(path); //删除
    } else {
        files.renameWithoutExtension(path, newName); //重命名
    }
}

function Head_pic(name) {
    let bo = className("android.widget.AdapterView").findOne();
    if (bo) {
        try {
            let wei = bo.bounds().toString().match(/\d{2,4}/g);
            let src = captureScreen();
            let clip = images.clip(src, wei[0], wei[1], (wei[2] - wei[0]), (wei[3] - wei[1]));
            let imgpath = input_Path + name;
            images.save(clip, imgpath + ".jpg", "jpg", 30);
            return imgpath + ".jpg";
        } catch (e) {
            console.error(e);
            toast(e);
        }
    }
}

function home() {
    let home = className("android.widget.AdapterView").findOne();
    //0041
    if (home) {
        try {
            if (home.className() == "android.widget.ImageView") {
                return true;
            }
        } catch (e) {
            home();
        }
    }
}
//随机左滑手势
function LeftHua() {
    let gesturesAry=[[[0,401,[824,814],[824,814],[824,814],[746,840],[581,899],[438,946],[361,997],[262,1080],[141,1193]]],[[0,351,[828,802],[828,802],[828,802],[757,804],[560,849],[322,937],[221,1001],[178,1065]]],[[0,301,[817,776],[817,776],[675,819],[477,912],[345,990],[258,1061],[205,1117]]],[[0,301,[828,893],[805,892],[665,912],[480,952],[325,999],[257,1023],[204,1054]]],[[0,351,[853,819],[853,819],[786,837],[661,900],[384,1082],[270,1168],[189,1282],[171,1338]]],[[0,351,[829,786],[829,786],[784,796],[629,850],[467,933],[306,1085],[227,1178],[186,1220]]],[[0,251,[847,797],[847,797],[783,814],[625,883],[442,973],[293,1060]]],[[0,301,[884,846],[884,846],[884,846],[794,861],[647,901],[390,1048],[287,1140]]],[[0,251,[873,825],[873,825],[804,840],[628,907],[489,979],[332,1104]]],[[0,351,[857,892],[857,892],[857,892],[785,899],[682,929],[460,1021],[336,1101],[270,1154]]]];
    gestures.apply(null, gesturesAry[(random(0, (gesturesAry.length - 1)))]);
    sleep(400);
}
//随机右滑手势
function RightHua() {
    let gesturesAry=[[[0,251,[357,927],[357,927],[423,927],[573,924],[889,895],[1029,866]]],[[0,251,[399,713],[399,713],[443,731],[614,811],[827,926],[988,990]]],[[0,251,[426,841],[426,841],[453,851],[597,894],[790,945],[1007,988]]],[[0,301,[440,951],[440,951],[455,953],[665,955],[834,973],[990,1005],[1039,1019]]],[[0,251,[409,809],[409,809],[504,827],[691,871],[935,938],[1037,979]]],[[0,201,[414,820],[426,823],[680,895],[883,963],[943,985]]],[[0,251,[421,825],[421,825],[421,825],[676,889],[880,954],[1007,1004]]],[[0,251,[440,813],[440,813],[534,821],[764,848],[985,885],[1042,895]]],[[0,201,[426,719],[426,719],[488,753],[688,867],[931,1005]]],[[0,251,[421,810],[421,810],[477,825],[709,888],[908,964],[1032,1014]]],[[0,201,[440,801],[440,801],[446,802],[694,885],[933,998]]]];
    gestures.apply(null, gesturesAry[(random(0, (gesturesAry.length - 1)))]);
    sleep(400);
}

function stop() {
    if (isRun) {
        isRun.interrupt();
        threads.shutDownAll();
        setTimeout(function() {
            if (isRun.isAlive()) {
                toast("停止失败");
                return;
            }
            console.hide();
            toast("已停止");
            isRun = false;
            ui.run(function() {
                ui.start.attr("src", "@drawable/ic_play_arrow_black_48dp");
            });
        }, 300);
    }
}

function start() {
    if (isRun) {
        stop();
        return;
    }
    isRun = threads.start(main);
    ui.run(function() {
        ui.start.attr("src", "@drawable/ic_pause_black_48dp");
    });
}

function selectedIndex(rg) {  
    let id = rg.getCheckedRadioButtonId();  
    for (let i = 0; i < rg.getChildCount(); i++) {    
        if (id == rg.getChildAt(i).getId()) {      
            return i;    
        }  
    }  
    return -1;
}