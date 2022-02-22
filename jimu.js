"ui";



/*
作者QQ：488716757
禁止二次贩卖
@第一次测试：2019/8/6/3:21{
    1.修复了随机延迟bug
    2.修复了ui显示bug
}

@第二次测试：2019/8/6/3:31{
    1.修复了若干bug  目前脚本比较稳定
}

@第三次测试：2019/8/8/3.03{
    1.脚本主体30%重做
    2.修复了若干bug
}

@第四次测试：2019/8/8/15:12{
    1.新增脚本悬浮窗可控制脚本运行
    2.修复了最后一段话术不发送问题
    3.添加了话术发送提示
}

@第五次测试：2019/8/8/16:31{
    1.修复了脚本回复消息时卡住问题
}

@第六次测试：2019/8/2215:48{
    1.修改了脚本内置储存昵称
}
*/






var color = '#FF8247'

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar id='appbar' bg='{{this.color}}'>
                <toolbar id="toolbar" title="黑熊脚本-积目引流"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <horizontal gravity='center_vertical'>
                            <text text='' margin='5dp' bg='{{this.color}}' w='8dp' h='35dp'></text>
                            <text text='软件权限' textSize='16sp' textColor='{{this.color}}'></text>
                        </horizontal>
                        <vertical bg='#ffffff' margin='5dp'>
                            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                            <Switch id="windowService" text="悬浮窗服务" checked="{{floaty.checkPermission()}}" padding="8 8 8 8"textSize="15sp"/>
                        </vertical>
                        <horizontal gravity='center_vertical'>
                            <text text='' margin='5dp' bg='{{this.color}}' w='8dp' h='35dp'></text>
                            <text text='脚本配置' textSize='16sp' textColor='{{this.color}}'></text>
                        </horizontal>
                        <ScrollView>
                            <vertical margin='5dp' bg='#ffffff'> 
                                <horizontal>
                                    <text text='回复形式：' textSize='16sp' textColor='#000000'></text>
                                    <checkbox id='checkbox_0' text='文字' textSize='16sp'></checkbox>
                                    <checkbox id='checkbox_1' text='图片' textSize='16sp'></checkbox>
                                </horizontal>
                                <horizontal id='horizontal_0'>
                                    <text text='文字话术：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_0' w='*' singleLine='true' layout_weight='1' textSize='16sp' hint=';为分段符号|为随机符号'></input>
                                </horizontal>
                                <horizontal id='horizontal_1'>
                                    <text text='图片数量：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_5' w='*' singleLine='true' layout_weight='1' textSize='16sp' hint='输入3则选择前3个其中之一'></input>
                                </horizontal>
                                <horizontal>
                                    <text text='脚本延迟：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_1' w='*' singleLine='true' layout_weight='1' textSize='16sp' hint='单位为秒|为随机符号'></input>
                                </horizontal>
                                <horizontal>
                                    <text text='打开软件：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_2' w='*' singleLine='true' layout_weight='1' textSize='16sp' hint='要打开软件的名称'></input>
                                </horizontal>
                                <horizontal>
                                    <text text='喜欢：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_3' textSize='16sp'></input>
                                    <text text='次，不喜欢：' textColor='#000000' textSize='16sp'></text>
                                    <input id='input_4' textSize='16sp'></input>
                                    <text text='次。' textColor='#000000' textSize='16sp'></text>
                                </horizontal>
                                <button margin='5dp' id='start' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='开始运行'></button>
                                <button margin='5dp' id='jiaqun' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='加入交流群'></button>
                                <button margin='5dp' id='jiawo' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='联系开发者'></button>
                            </vertical>
                        </ScrollView>
                    </vertical>
                </frame>
                <frame>
                    <text text="此脚本在安卓7.0版本以下运行时需要获取root权限！" textColor="red" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="广告位招商" textColor="green" textSize="16sp"/>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);

//创建本地储存
var storage = storages.create('jimu')

try {
    ui.input_0.setText(getConfigText(storage, 'skill'))
    ui.input_1.setText(getConfigText(storage, 'delay'))
    ui.input_2.setText(getConfigText(storage, 'appName'))
    ui.input_3.setText(getConfigText(storage, 'like'))
    ui.input_4.setText(getConfigText(storage, 'disLike'))
    ui.input_5.setText(getConfigText(storage, 'picture'))
    ui.checkbox_0.setChecked(getConfigText(storage, 'skill_able'))
    ui.checkbox_1.setChecked(getConfigText(storage, 'picture_able'))
} catch (err) {

}

//悬浮窗按钮单击事件
ui.windowService.on('check', (checked) => {
    if (checked && !floaty.checkPermission() && device.sdkInt > 23) {
        log('打开悬浮窗权限')
        var intent = new Intent();
        intent.setAction("android.settings.MANAGE_UNKNOWN_APP_SOURCES"); 
        app.startActivity(intent);
        toast('选择积目引流')
    }
})

//设置状态栏的颜色
ui.statusBarColor(color)


//设置滑动页面的标题
ui.viewpager.setTitles(["脚本", "公告", "设置"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager)

//选择文字话术监听事件
ui.checkbox_0.on('check', (checked) => {
    if (checked) {
        ui.horizontal_0.setVisibility(0)
    } else {
        ui.horizontal_0.setVisibility(8)
    }
})

//载入事件
if (getConfigText(storage, 'skill_able')) {
    ui.horizontal_0.setVisibility(0)
} else {
    ui.horizontal_0.setVisibility(8)
}

//选择文字话术监听事件
ui.checkbox_1.on('check', (checked) => {
    if (checked) {
        ui.horizontal_1.setVisibility(0)
    } else {
        ui.horizontal_1.setVisibility(8)
    }
})

//载入事件
if (getConfigText(storage, 'picture_able')) {
    ui.horizontal_1.setVisibility(0)
} else {
    ui.horizontal_1.setVisibility(8)
}

//脚本开始运行事件
ui.start.on('click', () => {
    var data = {
        skill:ui.input_0.text(),
        delay:ui.input_1.text(),
        appName:ui.input_2.text(),
        like:ui.input_3.text(),
        disLike:ui.input_4.text(),
        picture:ui.input_5.text(),
        skill_able:ui.checkbox_0.isChecked(),
        picture_able:ui.checkbox_1.isChecked()
    }
    storage.put('ui', data)
    threads.start(function () {
        //脚本全部参数设置完毕！显示开始悬浮窗
        var w = floaty.window(
            <frame>
                <button id='ok' text=''></button>
            </frame>
        );

        //悬浮窗关闭时自动停止脚本
        w.exitOnClose();

        //悬浮窗常在
        setInterval(()=>{}, 1000);

        //设置悬浮窗的位置
        w.setPosition(20,device.height * 0.7);

        //设置悬浮窗属性
        w.setAdjustEnabled(true);

        //定义安妮判断变量
        var state = 0;
        ui.run(function(){
            w.ok.setText('开始');
        });

        //定义脚本线程变量
        var thread;

        //悬浮窗ok按钮单击事件
        w.ok.on('click', ()=> {
            if (state == 0) {
                log('开始运行');
                ui.run(function(){
                    w.ok.setText('停止');
                });
                state = 1;
                //开始执行主线脚本引擎
                thread = threads.start(function(){
                    main(data);
                });
            } else {
                log('停止运行');
                ui.run(function(){
                    w.ok.setText('开始');
                });
                thread.interrupt();
                state = 0;
            }
        });
    })
})

//用户勾选无障碍服务的选项时，跳转到页面让用户去开启
ui.autoService.on("check", (checked) => {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
})

//悬浮窗按钮单击事件
ui.windowService.on('check', (checked) => {
    if (checked && !floaty.checkPermission() && device.sdkInt > 23) {
        log('打开悬浮窗权限')
        var intent = new Intent();
        intent.setAction("android.settings.MANAGE_UNKNOWN_APP_SOURCES"); 
        app.startActivity(intent);
        toast('选择积目引流')
    }
})

//当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.windowService.checked = floaty.checkPermission()
})

ui.jiaqun.on('click', () => {
    joinQun(185273451)
})

ui.jiawo.on('click', () => {
    contactAuthor(934082222)
})

//脚本主函数
function main (obj) {
    /*
    while {
        循环点击喜欢{
            for{
                喜欢
            }
            for{
                不喜欢
            }
        }
        循环对话回复{

        }
    }
    */

   log('开始main函数')
   startApp('发现卡牌', 8, obj.appName)

    var loop_0 = true


    while (loop_0) {
        log('开始执行匹配脚本')

        for (i = 0; i < obj.like; i++) {
            log('开始执行喜欢匹配')

            喜欢 = id('iv_btn_like').findOne(3000)

            if (喜欢 != null) {
                log('喜欢不为null')
                喜欢.click()
                fun_a = A()
                if (fun_a == 1) {
                    log('去撩ta')
                    skill_index = B()

                    //发送话术
                    if (obj.skill_able) {
                        toastLog('此次发送第' + (skill_index+1) + '段话术')
                        skill_content = obj.skill.split(';')[skill_index]
                        log('此次话术为：%s', skill_content)
                        if (skill_index < obj.skill.split(';').length - 1) {
                            C(skill_content)
                        }
                    }
                    //发送图片
                    if (skill_index == 1 && obj.picture_able) {
                        log('需要发图')
                        id('ivPhoto').findOne().click()
                        text('所有图片').waitFor()
                        log('所有图片:',obj.picture)
                        id('rvGalleryImage').findOne().child(random(0, obj.picture - 1)).click()
                        id('ivVoice').waitFor()
                        sleep(500)
                    }

                    toastLog('发送完成')
                    返回 = id('ivBack').findOne()
                    clickTap(返回.bounds().centerX(), 返回.bounds().centerY())
                    text('发现卡牌').waitFor()
                    sleep(500)

                } else if (fun_a == 2) {
                    toastLog('已经匹配达到上限了')
                    loop_0 = false
                } else {
                    log('没有匹配到人')
                }
            } else {
                log('喜欢为null')
            }

        }

        log('开始执行不喜欢任务')
        for (i = 0; i < obj.disLike; i++) {
            不喜欢 = id('iv_btn_dislike').findOne(3000)
            if (不喜欢 != null) {
                不喜欢.click()
                log('点击不喜欢')
            } else {
                log('没有找到不喜欢按钮')
                fun_a = A()
                if (fun_a == 1) {
                    log('去撩ta')
                    skill_index = B()

                    //发送话术
                    if (obj.skill_able) {
                        toastLog('此次发送第' + (skill_index+1) + '段话术')
                        skill_content = obj.skill.split(';')[skill_index]
                        log('此次话术为：%s', skill_content)
                        if (skill_index < obj.skill.split(';').length - 1) {
                            C(skill_content)
                        }
                    }

                    //发送图片
                    if (skill_index == 1 && obj.picture_able) {
                        log('需要发图')
                        id('ivPhoto').findOne().click()
                        text('所有图片').waitFor()
                        log('所有图片:',obj.picture)
                        id('rvGalleryImage').findOne().child(random(0, obj.picture - 1)).click()
                        id('ivVoice').waitFor()
                        sleep(500)
                    }

                    toastLog('发送完成')
                    返回 = id('ivBack').findOne()
                    clickTap(返回.bounds().centerX(), 返回.bounds().centerY())
                    text('发现卡牌').waitFor()
                    sleep(500)

                } else if (fun_a == 2) {
                    toastLog('已经匹配达到上限了')
                    loop_0 = false
                } else {

                }
            }
            sleep(randomAt(obj.delay) * 1000)
        }

        log('开始对话')
        text('发现卡牌').waitFor()
        text('对话').findOne().parent().parent().click()
        text('时间').waitFor()

        ll:
        while (1) {
            sleep(1000)
            name_q = id('names').find()

            name_q_0  = name_q[0].text()
            log('第一个名称是'+name_q_0)
            id("recyclerView").findOne().scrollBackward()
            sleep(1000)
            //开始读取最下面的用户昵称
            name_w = id('names').find()
            name_w_0 = name_w[0].text()
            log(name_w_0)

            if (name_q_0 == name_w_0) {

                break ll;

            }

        }

        var loop_1 = true
        while (loop_1) {
            log('开始回复韭菜')
            text('时间').waitFor()
            log('进入对话界面')
            sleep(500)


            小红点 = id('messageView').findOne(2000)
            if (小红点 != null) {
                log('找到了小红点')
                user = 小红点.parent().parent().parent().parent()

                clickTap(user.bounds().centerX(), user.bounds().centerY())
                id('ivVoice').waitFor()
                log('进入聊天界面')


                if (user.findOne(text('刘波 (官方客服)')) == null) {
    
    
                    log('跟他对话')
                    skill_index = B()
    
                    //发送话术
                    if (obj.skill_able) {
                        toastLog('此次发送第' + (skill_index+1) + '段话术')
                        skill_content = obj.skill.split(';')[skill_index]
                        log('此次话术为：%s', skill_content)
                        if (skill_index < obj.skill.split(';').length) {
                            C(skill_content)
                        }
                    }
    
                    //发送图片
                    if (skill_index == 1 && obj.picture_able) {
                        log('需要发图')
                        id('ivPhoto').findOne().click()
                        text('所有图片').waitFor()
                        log('所有图片:',obj.picture)
                        id('rvGalleryImage').findOne().child(random(0, obj.picture - 1)).click()
                        id('ivVoice').waitFor()
                        sleep(500)
                    }
    
                }

                toastLog('发送完成')
                while (1) {
                    sleep(1000)
                    返回 = id('ivBack').findOne(2000)
                    if (返回) {
                        break
                    }
                    back()
                }

                clickTap(返回.bounds().centerX(), 返回.bounds().centerY())
                text('时间').waitFor()
                sleep(500)

            } else {
                log('没有找到小红点')
                sleep(1000)
                name_x = id('names').find()

                name_x_0  = name_x[name_x.length - 1].text()

                id("recyclerView").findOne().scrollForward()
                sleep(1000)
                //开始读取最下面的用户昵称
                name_z = id('names').find()
                name_z_0 = name_z[name_z.length - 1].text()
                log(name_z_0)

                if (name_z_0 == name_x_0) {

                    loop_1 = false

                }
            }
    
        }

        log('对话完成')

        text('发现').findOne().parent().parent().click()
        text('发现卡牌').waitFor()

    }

}


function C (skill) {
    log('C函数')
    skill_0 = skill.split('|')
    skill_1 = skill_0[random(0, skill_0.length - 1)]
    toastLog('此次话术内容为：' + skill_1)
    id('chatKeyboardEye').findOne().click()
    id('act_iv_icon').waitFor()
    log('准备输入话术')
    sleep(500)
    className('EditText').findOne().setText(skill_1)
    log('准备发送话术')
    sleep(500)
    发送 = id('emoji_send').findOne()
    clickTap(发送.bounds().centerX(), 发送.bounds().centerY())
    sleep(500)
}

function B () {

    log('B函数')

    st = storages.create('config')

    className('EditText').text('Aa').waitFor()
    nameText = id('chatSingleNameTextView').findOne().text()

    cs = st.get(nameText) || 0
    log(cs)

    log('正在跟[%s]对话，已对话%d次！', nameText, cs)

    st.put(nameText, cs + 1)

    return cs
}


function A () {
    log('A函数')
    for (let i = 0; i < 6; i++) {
        sleep(500)
        if (text('去撩Ta').exists()) {
            text('去撩Ta').findOne().click()
            return 1
        } else if(text('当天右滑次数已达上限').exists()) {
            return 2
        } else {
            log('A函数正在运行')
        }
    }

}

//数组检测函数
function array_index (arr, str) {
    arr.forEach((ber , index) => {
        if (ber == str || ber.indexOf(str) > -1) {
            return index
        } else {
            return null;
        }
    })
    log('遍历完毕')
    return null;
}

//点击函数
function clickTap(x, y) {
    if (device.sdkInt < 24) {
        Tap(x, y)
    } else {
        click(x, y)
    }
}

//随机函数
function randomAt (str) {
    if (str.indexOf('|') > -1) {
        v11 = str.split('|')[0]
        v12 = str.split('|')[1]
        if (random(1, 2) == 1) {
            v2 = Number(v11) + random(0, v12)
        } else {
            v2 = Number(v11) - random(0, v12)
        }
        return v2
    } else {
        return Number(str)
    }
}

//提取内部储存内容
function getConfigText(st, key) {

    log('key--->>.  ',key)
    if (st.contains('ui')) {
        log('1')
        let res = st.get('ui')[key]
        
        if (res != undefined) {
            return res
        }

    }
    if (key.indexOf('able') > -1) {
        return false;
    } else {
        return '';
    }
}

//启动APP函数
function startApp (logText, startDelay, appName) {
    var loop = true
    while (loop) {
        launchApp(appName)
        sleep(startDelay * 1000)
        var top = 0;
        //循环九次找一个文本
        for (let i = 0; i < 9; i++) {
            let res = text(logText).findOne(2000)
            if (res != null) {
                loop = false;
            }
        }
        if (loop) {
            log('启动软件失败')
        } else {
            log('启动软件成功')
        }
    }
}

//加群函数
function joinQun(num) {
    try {
        app.startActivity({
            action: 'android.intent.action.VIEW',
            data: 'mqqapi://card/show_pslcard?src_type=internal&version=1&card_type=group&source=qrcode&uin='+num,
        });
    } catch (rr) {
        toast('您没有装QQ');
    }
}

//联系作者
function contactAuthor (Quin) {
    try{
		app.startActivity({
			action:"android.intent.action.VIEW",
			data:"mqqapi://card/show_pslcard?&uin="+Quin
		});
	}catch(e){
		toast("您还没有安装QQ");
	}
}