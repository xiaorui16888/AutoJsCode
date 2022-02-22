"ui";
function mian() {
    ui.layout(
        <vertical>
            <horizontal w="*" h="auto" gravity="center">
                <text text="陌陌注册机8.16.1.7(内测版)" textStyle="bold" textSize="18sp" textColor="#000000" />
            </horizontal>
            <horizontal>
                <text text="官方群：632652488，陌陌版本：8.12--8.16，作者QQ：488716757,使用前自行导入五个通讯录号码，手机储存留张照片或更多用来做头像，QQ存放在手机储存/qqqq,txt文件中，格式是 账号----密码，一行一条数据！\n支持随机密码，密码输入框填0000即可使用随机密码！" />
            </horizontal>
            <scroll>
                <vertical>
                    <horizontal>
                        <text text="接码账号：" textSize="16sp" />
                        <input id="接码账号" text="" hint="请输入接码账号" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="接码密码：" textSize="16sp"></text>
                        <input id="接码密码" text="" hint="请输入接码密码" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="注册昵称：" textSize="16sp"></text>
                        <input id="注册昵称" text="" hint="注册昵称" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="注册性别：" textSize="16sp"></text>
                        <input id="注册性别" text="女生" hint="请输入注册性别，男生|女生" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="注册密码：" textSize="16sp"></text>
                        <input id="注册密码" text="" hint="注册密码,例：2019abcd" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="留痕账号：" textSize="16sp"></text>
                        <input id="留痕账号" text="" hint="留痕账号，填自己的vip陌陌号" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="定位地址：" textSize="16sp"></text>
                        <input ellipsize="end" id="定位地址" text="" hint="定位城市,多个的话用|分开" w="*" textSize="16sp" />
                    </horizontal>
                    <horizontal>
                        <text text="循环运行：" textSize="16sp"></text>
                        <radiogroup orientation='horizontal' gravity='center'>
                            <radio id='循环' text='循环' >

                            </radio>
                            <radio id='单次' text='单次' checked='true'>

                            </radio>
                        </radiogroup>
                    </horizontal>
                    <horizontal>
                        <text text="注册方式：" textSize="16sp"></text>
                        <radiogroup orientation='horizontal' gravity='center'>
                            <radio id='q跳' text='q跳' >

                            </radio>
                            <radio id='接码' text='接码' checked='true'>

                            </radio>
                        </radiogroup>
                    </horizontal>
                    <horizontal>
                        <text text="接码平台：" textSize="16sp"></text>
                        <radiogroup orientation='horizontal' gravity='center'>
                            <radio id='战狼' text='战狼' checked='true'>

                            </radio>
                            <radio id='火云' text='火云'>

                            </radio>
                        </radiogroup>
                    </horizontal>
                    <horizontal>
                        <text text='完成动作：' textSize='16sp'></text>
                        <radiogroup orientation='horizontal' gravity='center'>
                            <radio id='卸载' text='卸载' >

                            </radio>
                            <radio id='停止' text='停止' checked='true'>

                            </radio>
                        </radiogroup>
                    </horizontal>
                    <button id="开始注册" text="开始注册" />
                    <button id="卸载分身" text="卸载分身" />
                    <button id="加载账号数据" text="加载账号数据"></button>
                    <button id="删除账号数据" text="删除账号数据"></button>
                </vertical>
            </scroll>

        </vertical>
    );
}

function 卸载(q) {
    auto.waitFor();
    launchApp("多开分身");
    var a = true;
    sleep(q);
    while (a) {
        var 管理 = text("管理").findOne(3888);
        if (管理) {
            管理.click();
            sleep(q);
            text("删除分身").findOne().click();
            sleep(q);
            text("确定").findOne().click();
            sleep(q);
            text("确定").findOne().click();
            sleep(q);
        } else {
            toast("卸载完成！");
            a = false;
        }
    }
}

function 制作分身(全局对象) {
    全局对象.注册昵称 = 全局对象.注册昵称 + random(1, 999);
    log("开始制作分身！");
    function 判断联网(q) {
        var a = true;
        while (a) {
            sleep(q);
            try {
                if (http.get("www.baidu.com").statusCode == 200) {
                    a = false;
                }
            } catch (err) {
                log("报错信息-->>  " + err);
            }
        }
        log("连接互联网成功!");
    }

    function 开关飞行() {
        log("删除immomo缓存文件夹-->>  " + files.removeDir("/sdcard/immomo/"));
        log("删除cvmomo缓存文件夹-->>  " + files.removeDir("/sdcard/cvmomo/"));
        log("删除data数据-->>  " + files.removeDir("/sdcard/Android/data/com.immomo.momo/"));
        home();
        sleep(1000);
        home();
        sleep(1000);
        while (!click('设置'));
        waitForActivity("com.android.settings.MiuiSettings");
        text("更多连接方式").findOne().parent().parent().click();
        waitForActivity("com.android.settings.SubSettings");
        text("飞行模式").findOne().parent().parent().click();
        sleep(8000);
        text("飞行模式").findOne().parent().parent().click();
        判断联网("999");
    }

    function 软改(q, 全局参数) {
        log("开始软改");
        log(全局对象.注册昵称);
        text("去LOGO水印").findOne().click();
        text("高级选项").findOne().click();
        id("cb_virtual_sdcard").findOne().click();
        log("点击机型伪装-->>  " + text("机型伪装").findOne(q).parent().parent().findOne(text("设置")).click());
        sleep(q);
        text("华为").findOne().parent().click();
        while (!text("小米").findOne().click());
        log("点击手机型号-->>  " + text("小米MIX3").findOne().parent().click());
        sleep(q);
        log("选择机型-->>  " + className("android.widget.ListView").findOne().child(random(1, className("android.widget.ListView").findOne().childCount() - 8)).click());
        sleep(q);
        for (i = 0; i < 8; i++) {
            sleep(500);
            log("换一换-->>  " + text("换一换").findOne().click());
        }
        log("启用机型伪装-->>  " + text("启用机型伪装").findOne().click());
        sleep(q);
        log("虚拟定位-->>  " + text("虚拟定位").findOne().parent().parent().findOne(text("设置")).click());
        log(全局参数);
        var 数量 = 全局参数.定位地址.split("|").length;
        try {
            var 地址 = 全局参数.定位地址.split("|")[random(0, 数量 - 1)];
            log("一共有" + 数量 + "个定位地址");
            log("本次定位-->>  " + 地址);
            var 定位接口 = "http://api.map.baidu.com/geocoder?address=" + 地址 + "&output=json&key=37492c0ee6f924cb5e934fa08c6b1676&city=%E5%8C%97%E4%BA%AC%E5%B8%82";
            var r = http.get(定位接口);
            if (r.statusCode >= 200 && r.statusCode < 300) {
                log("定位请求成功");
                var 经纬度 = JSON.parse(r.body.string()).result.location;
                var 经度 = 经纬度.lng + random();
                var 纬度 = 经纬度.lat + random();
                log("经度-->>  " + 经度);
                log("纬度-->>  " + 纬度);

            } else {
                log("定位请求失败");
                exit();
            }
        } catch (err) {
            log("取经纬度报错");
            exit();
        }
        sleep(1000 * 10);
        while (!id("iv_gps_input").findOne().click());
        text("请输入经度").findOne().setText(经度);
        text("请输入纬度").findOne().setText(纬度);
        text("确定").findOne().click();
        while (!text("定位到此").findOne().click());
        waitForActivity("com.bly.dkplat.widget.create.CreateCustomActivity");
        text("MOMO陌陌分身").findOne().setText(全局参数.注册昵称)
        text("开始制作").findOne().click();
        text("应用来源：多开分身").findOne();
        log("准备安装！");
        text("安装").findOne().click();
        text("打开").findOne().click();
        log("安装完成！");
        log("分身制作完成！");
        var 手机号登录 = text('手机号登录注册').findOne(30 * 1000);
        if (手机号登录) {
            手机号登录.click();
        } else {
            log('直接输入手机号码');
        }
        return;
    }
    var q = 999;
    开关飞行();
    launchApp("多开分身");
    waitForActivity("com.bly.dkplat.widget.MainActivity");
    log("进入分身");
    id("iv_btn_create").findOne().click();
    log("寻找MOMO陌陌");
    var 找陌陌循环 = true;
    while (找陌陌循环) {
        if (text("MOMO陌陌").findOne(q)) {
            log("点击MOMO陌陌-->>" + text("MOMO陌陌").findOne().parent().parent().findOne(text("制作分身")).click());
            找陌陌循环 = false;
        } else {
            log("下滑-->>  " + className("android.support.v7.widget.RecyclerView").findOne().scrollForward());
            sleep(q);
        }
    }
    软改(q, 全局对象);
    return;
}

function 注册(全局对象) {

    function 火云(zh, mm) {

        var 接口 = 'http://huoyun888.cn/api/do.php?';
        if (http.get(接口).statusCode != 200) {
            log('网络错误，或平台出现问题');
            exit();
        } else {
            var 登录接口 = 接口 + 'action=loginIn&name=' + zh + '&password=' + mm;
            var 返回对象 = http.get(登录接口).body.string();
            if (返回对象.split('|')[0] == '1') {
                log('登录成功');
                var key = 返回对象.split('|')[1];
                log(key);
            } else {
                log('登录失败-->>  ' + 返回对象.split('|')[1]);
                exit();
            }
        }

        var 取号接口 = 接口 + 'action=getPhone&sid=213&token=' + key;
        var 取号对象 = http.get(取号接口).body.string();
        if (取号对象.split('|')[0] == '1') {
            log('取号成功！');
            var 手机号 = 取号对象.split('|')[1];
            log('获取到的手机号-->>  ' + 手机号);
        } else {
            log('取号失败-->>  ' + 取号对象.split('|')[1]);
            exit();
        }

        text('输入手机号码').findOne().setText(手机号);
        text("获取验证码").findOne().click();
        text("输入6位验证码").findOne();

        var 取码次数 = 12;
        var 取码延迟 = 5;
        var 验证码 = '';
        var 取码接口 = 接口 + 'action=getMessage&sid=213&phone=' + 手机号 + '&token=' + key;
        for (var i = 0; i < 取码次数; i++) {
            var 取码对象 = http.get(取码接口).body.string();
            if (取码对象.split('|')[0] == '1') {
                验证码 = 取码对象.split('|')[1].match(/\d{6}/);
                log('获取到的验证码是-->.  ' + 验证码);
                i = 100;
            } else {
                log(取码对象.split('|')[1]);
            }
            sleep(取码延迟 * 1000);
        }

        if (验证码 != '') {
            while (!className("EditText").findOne().setText(验证码));
            log("输入验证码");
            if (text("不是我的，注册新号").findOne(3000)) {
                while (!text("不是我的，注册新号").findOne().click());
            } else {
                log('新卡');
            }
            return true;
        } else {
            log('没有获取到验证码，准备拉黑手机号');
            var 拉黑接口 = 接口 + 'action=addBlacklist&sid=213&phone=' + 手机号 + '&token=' + key;
            if (http.get(拉黑接口).body.string().split('|')[0] == '1') {
                log('拉黑成功！');
            } else {
                log('拉黑失败');
            }
            className("ImageButton").findOne().click();
            text("手机号登录注册").findOne();
            id('login_account_clear').findOne().click();
            log('找到了-->>  手机号登录注册');

            return false;
        }

    }

    function 接码(全局对象) {
        log("开始运行接码函数！");
        var 平台接口 = "http://api.dk827.com/index.php/";
        log("验证平台接口");
        验证变量 = http.get(平台接口).statusCode;
        if (验证变量 >= 200 && 验证变量 < 300) {
            log("平台接口可用！");
        } else {
            log("平台接口不可用！请更换接码平台。");
            exit();
        }
        log("开始登录");
        var 登录接口 = 平台接口 + "reg/login?username=" + 全局对象.接码账号 + "&password=" + 全局对象.接码密码;
        var 登录返回 = JSON.parse(http.get(登录接口).body.string());
        log(登录返回);
        if (登录返回.errno == 0) {
            log("登录成功");
            var 心跳 = 登录返回.ret.token;
            log("token-->>  " + 心跳);
        } else {
            log("登录失败");
            exit();
        }
        log("开始获取手机号！");
        var 取号接口 = 平台接口 + "clients/online/setWork?token=" + 心跳 + "&pid=144&t=8";
        var 取号返回 = JSON.parse(http.get(取号接口).body.string());
        log(取号返回);
        if (取号返回.errno == 0) {
            var 手机号 = 取号返回.ret.number;
            log("取到的手机号为-->>  " + 手机号);
            files.write("/sdcard/shoujihao.txt", 手机号);
        } else {
            log("取号失败!");
            exit();
        }
        text('输入手机号码').findOne().setText(手机号);
        text("获取验证码").findOne().click();
        text("输入6位验证码").findOne();
        log("开始获取验证码");
        var 接码接口 = 平台接口 + "clients/sms/getSms?token=" + 心跳 + "&project=144&number=" + 手机号 + "&type=1";
        var 接码循环 = true;
        var 验证码 = "";
        var i = 0;
        while (接码循环) {
            sleep(5000);
            if (i > 12) {
                接码循环 = false;
            } else {
                var 接码返回 = http.get(接码接口).body.json();
                if (接码返回.errno == 0) {
                    log("接码成功！");
                    接码循环 = false;
                    验证码 = 接码返回.ret.tst;
                } else {
                    log("接码失败-->>  " + 接码返回.errmsg);
                }
            }
            i++;
        }
        if (验证码 == "") {
            log("没有获取到验证码！");
            className("ImageButton").findOne().click();
            text("手机号登录注册").findOne();
            log('找到了-->>  手机号登录注册');
            sleep(1000);
            while (!id("login_account_clear").findOne().click());
            log('x掉');
            return false;
        } else {
            var yzm = 验证码.match(/\d{6}/);
            log("获取到的验证码是-->>  " + yzm);
            while (!className("EditText").findOne().setText(yzm));
            log("输入验证码");
            if (text("不是我的，注册新号").findOne(3000)) {
                while (!text("不是我的，注册新号").findOne().click());
            } else {
                log("是新号！");
                threads.start(function () {
                    log("开始退出token");
                    var 退出接口 = 平台接口 + "/reg/loginOut?token=" + 心跳;
                    var 退出返回 = http.get(退出接口).body.json();
                    log("退出接口返回值：" + 退出返回);
                    if (退出返回.errno == 0) {
                        log("退出接码平台成功！");
                    } else {
                        log("退出接码平台失败！");
                    }
                });
            }
            return true;
        }
    }

    function 填资料(全局对象) {

        function 选择生日(q) {
            text("选择生日").findOne().parent().click();
            sleep(q);
            for (var i = 0; i < random(2, 8); i++) {
                sleep(q);
                click(200, 580);
            }
            sleep(q);
            for (i = 0; i < random(1, 11); i++) {
                sleep(q);
                click(380, 580);
            }
            sleep(q);
            for (i = 0; i < random(1, 27); i++) {
                sleep(q);
                click(515, 580);
            }
            sleep(q);
            click(530, 950);
        }

        text("注册成功后，性别不可以修改").findOne();
        log("开始填写资料");
        text("填写昵称").findOne().setText(全局对象.注册昵称);
        files.write("/sdcard/nicheng.txt", 全局对象.注册昵称);
        if (全局对象.注册密码 == '0000') {
            随机密码();
        } else {
            files.write("/sdcard/mima.txt", 全局对象.注册密码);
        }

        选择生日(999);
        text(全局对象.注册性别).findOne().parent().click();
        while (!text("下一步").findOne().click());

    }

    function 随机密码() {
        var mm_a = random(1111, 9999);
        var mm_c = ('q w e r t y u i o p a s d f g h j k l z x c v b n m Q W E R T Y U I O P A S D F G H J K L Z X C V B N M').split(' ');
        var mm_b = [];
        for (var i = 0; i < 4; i++) {
            mm_b.push(mm_c[0, random(0, mm_c.length - 1)]);

        }
        var mm_d = mm_b.toString().replace(/,/g, '');
        var mm;
        if (mm_a % 2 == 0) {
            mm = mm_a + mm_d;
        } else {
            mm = mm_d + mm_a;
        }
        log(mm);
        files.write('/sdcard/mima.txt', mm);
    }

    function 做头像() {
        text("上传本人真实照片").findOne();
        if (text("完成进入").findOne().click()) {
            log('停止做头像');
            return true;
        } else {
            log("开始做头像");
            sleep(1000);
            var 相册 = true;
            while (相册) {
                if (text("相册").findOne(2000)) {
                    log("找到了相册");
                    相册 = false;
                } else {
                    log("没有找到相册！");
                    while (!id("img_photo").findOne().click());
                }
            }
            log("开始选择照片");
            text("相册").findOne();
            sleep(5000);
            var 照片集合 = id('iv_item_image').find();
            if (照片集合.length > 5) {
                照片集合[random(0, 照片集合.length - 4)].click();
            } else {
                log("获取照片失败,或照片数量少于5张");
                exit();
            }
            waitForActivity("com.immomo.momo.multpic.activity.ImageEditActivity");
            log("开始剪裁图片");
            if (text("裁切图片").findOne(3000)) {
                log("找到了剪切图片");
            } else {
                while (!text("确认").findOne().click());
                log('确认1');
            }
            if (text('确认').findOne(5555)) {
                text('确认').findOne().click();
                log('确认2')
            }
            sleep(1000);
            while (!id("media_edit_btn_send").findOne().click());
            log('完成');
            if (text("上传本人真实照片").findOne(8888)) {
                log('找到了');
                return false;
            } else {
                log('没有找到');
                return true;
            }
        }
    }

    function 进入首页() {
        log('开始进入首页');
        text('首页').findOne();
        log('进入了首页');
        var 首页循环 = true;
        while (首页循环) {
            if (text("首页").findOne(1111)) {
                首页循环 = false;
            } else {
                back();
            }
        }
    }

    function 留痕(账号) {
        while (!click("消息"));
        while (!text("搜索").findOne().parent().parent().click());
        while (!className("EditText").text("搜索").findOne().setText(账号));
        var a = "搜索用户：" + 全局对象.留痕账号;
        while (!text(a).findOne().parent().click());
        text("关注").findOne();
        var 首页循环 = true;
        while (首页循环) {
            if (text("首页").findOne(1111)) {
                首页循环 = false;
            } else {
                back();
            }
        }
    }

    function 设置密码(密码, APP, 动作) {
        while (!id("maintab_layout_profile").findOne().click());
        sleep(1000);
        id("info_list").findOne().scrollForward();
        sleep(1000);
        while (!text("设置").findOne().parent().click());
        sleep(1000);
        waitForActivity("com.immomo.momo.setting.activity.UserSettingActivity");
        log("1");
        text("帐号与安全").findOne().parent().click();
        sleep(8000);
        while (!text("密码修改").findOne().parent().click());
        log("开始输入密码-->>  " + 密码);
        sleep(3000);
        className('EditText').find()[0].setText(密码);
        log('输入第一个');
        sleep(3000);
        className('EditText').find()[1].setText(密码);
        log('输入第二个');
        sleep(3000);
        while (!text("修改").findOne().click());
        log("密码修改成功！");
        sleep(3000);
        var name = getPackageName(APP);
        if (动作) {
            app.uninstall(name);
            text('要卸载此应用吗？').findOne();
            while (!text('确定').findOne().click());
            text('卸载成功').findOne();
            log('卸载成功');

        } else {
            log(name);
            openAppSetting(name);
            while (!text('结束运行').findOne().click());
            while (!text('确定').findOne().click());
            log('确定成功！');
        }
    }

    function 通讯录() {
        text("首页").findOne();
        text("更多").findOne().parent().parent().click();
        text("好友").findOne().parent().click();
        waitForActivity("com.immomo.momo.mvp.contacts.activity.ContactTabsActivity");
        text("查看通讯录好友").findOne().click();
        sleep(5000);
        click("允许");
        var 首页循环 = true;
        while (首页循环) {
            if (text("首页").findOne(1111)) {
                首页循环 = false;
            } else {
                back();
            }
        }
    }

    function 提陌陌号() {
        var 首页循环 = true;
        while (首页循环) {
            if (text("首页").findOne(1111)) {
                首页循环 = false;

            } else {
                back();

            }
        }
        text('更多').findOne().parent().parent().click();
        id('simple_user_layout').findOne().click();
        var momo = id('profile_tv_momonumber').findOne().text().split('：')[1];
        首页循环 = true;
        while (首页循环) {
            if (text("首页").findOne(1111)) {
                首页循环 = false;

            } else {
                back();

            }
        }
        files.write('/sdcard/momohao.txt', momo);
        return;
    }

    function 提交后台() {
        var a = files.read("/sdcard/shoujihao.txt");
        var b = files.read("/sdcard/mima.txt");
        var c = files.read("/sdcard/nicheng.txt");
        var cc = files.read("/sdcard/momohao.txt");
        log(a + "-----" + b + "-----" + cc + "----" + c);
        files.append("/sdcard/usertext.txt", a + "-----" + b + "-----" + cc + "----" + c + "\n");
    }

    function qq登录() {
        log('点击qq登录');
        id('img_qq').findOne().click();
        sleep(1000);
        try {
            var qq = files.read('/sdcard/qqqq.txt').split('\n');
            log('一共有' + qq.length + '个qq号');
        } catch (err) {
            log('没有qq号码文件！');
            exit();
        }
        var i = 0;
        var a = true;
        while (a) {
            desc('请输入QQ号码或手机或邮箱').findOne().setText(qq[i].split('----')[0].trim());
            log('输入QQ号');
            id('password').findOne().setText(qq[i].split('----')[1].trim());
            log('输入QQ密码');
            id('login').findOne().click();
            log('登录');
            if (text('验证码').findOne(10 * 1000)) {
                过滑块();
                if (text('授权并登录').findOne(10 * 1000)) {
                    a = false;
                } else {
                    log('不可登录');
                    var b = true;
                    while (b) {
                        if (desc('请输入QQ号码或手机或邮箱').findOne(2222)) {

                        } else {
                            back();
                        }
                    }
                    log('i++');
                    i++;
                }
            } else {
                if (text('登录中').findOne(888)) {
                    back();
                    log('i++');
                    i++;
                    sleep(1000);
                } else {
                    log('其他错误');
                    exit();
                }
            }
        }

        text('授权并登录').findOne().click();
        text('注册即表示同意《陌陌用户协议》和《陌陌隐私权政策》').findOne();
        log('保存账号准备开始q跳的填写资料');
        files.append("/sdcard/QQusertext.txt", qq[i] + "\n");

    }

    function 过滑块() {
        log('自己手动过滑块');
    }

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>？ ？

    if (全局对象.注册方式) {
        log("准备开始接码注册");
        text("手机号登录注册").findOne();
        waitForActivity("com.immomo.momo.newaccount.login.view.LoginActivity");
        log("开始获取手机号！");
        if (全局对象.接码平台) {
            while (!接码(全局对象));
        } else {
            while (!火云(全局对象.接码账号, 全局对象.接码密码));
        }
        填资料(全局对象);
        while (!做头像());
    } else {
        log('q跳登录');
        qq登录();
        填资料(全局对象);
        if (text('绑定手机').findOne(8888)) {
            text('跳过').findOne().click();
            sleep(5 * 1000);
            log('直接上号！');
        } else {
            log('位置绑定手机错误');
        }
    }
    进入首页();
    log("准备匹配通讯录");
    通讯录();
    留痕(全局对象.留痕账号);
    提陌陌号();
    设置密码(全局对象.注册密码, 全局对象.注册昵称, 全局对象.完成动作);
    提交后台();

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>？ ？

}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

mian();

var 缓存配置 = threads.start(function () {
    var path = "/sdcard/rjpz.json";
    try {
        var aa = files.read(path);
        var 配置对象 = JSON.parse(aa);
        ui.接码账号.setText(配置对象.接码账号);
        ui.接码密码.setText(配置对象.接码密码);
        ui.注册昵称.setText(配置对象.注册昵称);
        ui.注册密码.setText(配置对象.注册密码);
        ui.留痕账号.setText(配置对象.留痕账号);
        ui.定位地址.setText(配置对象.定位地址);
        ui.注册性别.setText(配置对象.注册性别);

        if (配置对象.循环运行) {
            ui.循环.checked = true;
            ui.单次.checked = false;
        } else {
            ui.单次.checked = true;
            ui.循环.checked = false;
        }
        if (配置对象.注册方式) {
            ui.接码.checked = true;
            ui.q跳.checked = false;
        } else {
            ui.q跳.checked = true;
            ui.接码.checked = false;
        }
        if (配置对象.完成动作) {
            ui.卸载.checked = true;
            ui.停止.checked = false;
        } else {
            ui.停止.checked = true;
            ui.卸载.checked = false;
        }
        if (配置对象.接码平台) {
            ui.战狼.checked = true;
            ui.火云.checked = false;
        } else {
            ui.火云.checked = true;
            ui.战狼.checked = false;
        }
    } catch (err) {
        log("暂无软件配置！");
    }
});

ui.开始注册.on("click", () => {
    var 接码账号 = ui.接码账号.text();
    var 接码密码 = ui.接码密码.text();
    var 注册昵称 = ui.注册昵称.text();
    var 注册密码 = ui.注册密码.text();
    var 留痕账号 = ui.留痕账号.text();
    var 定位地址 = ui.定位地址.text();
    var 注册性别 = ui.注册性别.text();
    var 循环运行 = ui.循环.isChecked();
    var 注册方式 = ui.接码.isChecked();
    var 完成动作 = ui.卸载.isChecked();
    var 接码平台 = ui.战狼.isChecked();

    var 全局对象 = {
        接码账号: 接码账号,
        接码密码: 接码密码,
        注册昵称: 注册昵称,
        留痕账号: 留痕账号,
        定位地址: 定位地址,
        注册密码: 注册密码,
        注册性别: 注册性别,
        注册方式: 注册方式,
        完成动作: 完成动作,
        接码平台: 接码平台
    }

    log("脚本配置为-->>  " + 全局对象);
    files.write("/sdcard/rjpz.json", JSON.stringify(全局对象));
    threads.start(function () {
        console.show();
        auto.waitFor();
        log("获取无障碍权限成功!");
        var 允许 = threads.start(function () {
            while (true) {
                while (!click("允许"));
                sleep(1000 * 5);
            }
        });
        if (循环运行) {
            while (true) {
                log('循环运行!!!!!!!');
                制作分身(全局对象);
                注册(全局对象);
            }
        } else {
            log('单次运行!!!!!!!!!!');
            制作分身(全局对象);
            注册(全局对象);
        }
    });
});

ui.卸载分身.on("click", () => {
    threads.start(function () {
        卸载(999);
    });
});

ui.加载账号数据.on("click", () => {
    threads.start(function () {
        try {
            var txt = files.read("/sdcard/usertext.txt");
            log(txt);
            toast('请选择用文本编辑器打开或者阅读软件');
            app.viewFile("/sdcard/usertext.txt");
        } catch (err) {
            toast('暂时没有任何账号数据！');
        }
    });
});

ui.删除账号数据.on("click", () => {
    if (files.remove("/sdcard/usertext.txt")) {
        toast("删除成功！");
    } else {
        toast("删除失败！");
    }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>