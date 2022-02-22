"ui";

/*
作者QQ：488716757
禁止二次贩卖
*/

//设置脚本主题颜色
var color = '#FFD700'

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar id='appbar' bg='{{this.color}}'>
                <toolbar id="toolbar" title="Uki交互回复"/>
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
                                <vertical>
                                    <input id='input_0' hint='脚本话术' w='*'></input>
                                    <input id='input_1' hint='延迟时间' w='*'></input>
                                </vertical>
                                <button margin='5dp' id='start' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='开始回复'></button>
                                <button margin='5dp' id='jiawo' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='联系作者'></button>
                            </vertical>
                        </ScrollView>
                    </vertical>
                </frame>
                <frame>

                </frame>
                <frame>

                </frame>
            </viewpager>
        </vertical>
    </drawer>
);

//创建本地储存
var storage = storages.create('config')

ui.input_0.setText(getConfigText(storage, 'input_0'))

ui.input_1.setText(getConfigText(storage, 'input_1'))

//设置状态栏的颜色
ui.statusBarColor(color)

//当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.windowService.checked = floaty.checkPermission()
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
        intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION")
        app.startActivity(intent);
        toast('选择此软件')
    }
})

ui.jiawo.on('click', () => {
    contactAuthor(488716757)
})

//引流操作
ui.start.on('click', () => {

    //开始获取脚本配置

    var data = {
        input_0 : ui.input_0.text() || '',
        input_1 : ui.input_1.text() || '',
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
                    main(data)
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

function main (对象) {

    话术 = 对象.input_0
    延迟 = 对象.input_1

    log('话术:%s;延迟:%s', 话术, 延迟)

    log('开始运行main函数')

    for (let i = 0;i < 5;i++) {
        console.info('脚本将在'+(5-i)+'秒后启动！')
        sleep(1000)
    }
    //新建本地储存
    var main_st = storages.create('uki_name')   

    //定义寻找控件的时间
    var findViewDelay = 2000

    //定义for循环发送消息时间
    var forMsgDelay = '500-1000'

    //定义输入文本后等待多久发送
    var sendDyley = '200-800'
    
    while(id("recycler_view_message_list").findOne().scrollBackward());

    var main_loop = true
    while (main_loop) {

        log('进入while循环')

        main_rtv_msg_dot = id('rtv_msg_dot').findOne(findViewDelay)

        if (main_rtv_msg_dot) {
            log('找到了小红点')

            while(!main_rtv_msg_dot.parent().click());

            log('点击该用户成功')

            main_et_input = id('et_input').findOne(findViewDelay)

            if (main_et_input != null) {
                log('找到了消息输入框')

                //准备发送话术
                main_talking_skill = 话术.split('-')
                toastLog('一共有'+main_talking_skill.length+'段话术！')

                //读取用户昵称
                main_tv_name = id('tv_name').findOne(findViewDelay)

                if (main_tv_name != null) {
                    log('找到了用户昵称控件')
                    
                    main_userName = main_tv_name.text()

                    //读取聊天次数
                    main_msgNumber = main_st.get(main_userName) || 0
                    
                    toastLog('已经跟'+main_userName+'聊了'+main_msgNumber+'次！')

                    if (main_msgNumber < main_talking_skill.length) {
                        log('还没有聊完')
                        main_talking_skill_one = main_talking_skill[main_msgNumber].split(';')

                        log('main_talking+skill_one:%s', main_talking_skill_one)
    
                        for (let i = 0 ; i < main_talking_skill_one.length ; i++) {
                            sleep(r_number(forMsgDelay))
                            main_talking_skill_two = main_talking_skill_one[i].split('|')
                            log('main_talking_skill_two:%s', main_talking_skill_two)
    
    
                            main_talking_skill_three = main_talking_skill_two[random(0, main_talking_skill_two.length - 1)]
                            log('main_talking_skill_three:%s', main_talking_skill_three)

                            main_editText = id('et_input').findOne(findViewDelay)

                            if (main_editText != null) {
                                log('找到了编辑框啊')
                                main_editText.setText(main_talking_skill_three)
                            } else {
                                log('没有找到编辑框')
                                main_right = text('是').findOne(findViewDelay)
                                if (main_right != null) {
                                    toastLog('检测到被拉黑')
                                    main_right.click()
                                } else {
                                    toastLog('没有找到是按钮')
                                    exit()
                                }

                            }

                            sleep(r_number(sendDyley))
                            text('发送').findOne().click()

                        }

                        //增加聊天次数写入本地储存
                        main_msgNumber++
                        main_st.put(main_userName, main_msgNumber)

                        log('消息回复完成,准备返回到联系人列表')

                    } else {
                        toast('已经跟这个人聊完了')
                    }
                
                } else {
                    log('没有找到用户昵称控件')
                }

                do {
                    main_backButton = className('ImageButton').clickable(true).findOne(findViewDelay)
                    if (main_backButton != null) {
                        log('找到了返回按钮')
                        main_backButton.click()
                    } else {
                        log('没有找到返回按钮')
                        main_shumei_text_1 = text('您的内容可能包含不友好词汇。继续发送可能会被封号，是否继续发送?').findOnce()
                        if (main_shumei_text_1 != null) {
                            text('确定').findOne().click()
                        } else {
                            back()
                        }
                    }
                } while(!text('消息中心').findOne(findViewDelay))

                sleep(r_number(延迟) * 1000)

                log('回到主界面成功')

            } else {
                log('没有找到消息输入框')
            }

        } else {
            log('没有找到小红点')
            sleep(r_number(forMsgDelay))
            if (id("recycler_view_message_list").findOne().scrollForward()) {
                log('下滑成功')
            } else {
                log('下滑失败')
                while(id("recycler_view_message_list").findOne().scrollBackward());
            }
            sleep(r_number(forMsgDelay))
        }

    }

    log('结束运行main函数')
}


//设置脚本函数库------------------------------------------------------------------------------------------------


function r_number (r_number) {

    switch (typeof(r_number)) {
        case 'number':
            log('是数字')
            return r_number
        case 'string':
            log('是字符串')
            if (r_number.indexOf('-') > -1) {
                r_number_min = r_number.split('-')[0]
                r_number_max = r_number.split('-')[1]
                return random(Number(r_number_min), Number(r_number_max))
            } else {
                return Number(r_number)
            }
        default:
            log('r_number传入的值数据类型不对')
            return 0;
    }

}


//提取内部储存内容
function getConfigText(st, key) {

    log('key--->>  ',key)
    
    try {
        if (st.contains('ui')) {
            if (st.get('ui')[key] != null) {
                return st.get('ui')[key]
            } else {
                return ''
            }
        } else {
            log('不包含')
            return ''
        }
    } catch (err) {
        return ''
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