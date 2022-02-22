
console.show()
var 按键短 = []
var 按键长 = []
//音量-键
按键短[25] = ("toast('怎么按一下就松开了啊');  ")
按键长[25] = ("toast('多按一下嘛！挺舒服的｡◕‿◕｡'); ")
//返回键
按键短[4] = ("toast('返回怎么按一下就松开了啊'); ")
按键长[4] = ("toast('返回多按一下嘛！挺舒服的｡◕‿◕｡'); ")

操作状态 = 0

有效的按键 = "=25=" //加入按键定义代码
有效的按键 += "=4="
//有效的按键=有效的按键.replace("=25=","")//使按键失效代码//在ui界面定义

events.observeKey();
events.on("key", function(code, event) {
    if (有效的按键.indexOf("=" + code + "=") > -1) {
        if (输入状态() == 0) {
            if (操作状态 != 0) {
                操作状态 = 0
                threads.shutDownAll()
            }
            if (操作状态 == 0) {
                操作状态 = 1
                if (event.getAction() == 0) {
                    log(code + "按下")
                    时间 = new Date().getTime()
                } else {
                   // log(code + "弹起")
                    threads.start(function() {
                        if (new Date().getTime() - 时间 > 500) {
                            eval(按键长[code]+";操作状态 = 0")
                        } else {
                            eval(按键短[code]+";操作状态 = 0")
                        }
                    });
                }
            }
        }
    }
});

function 输入状态() {

    return 0//不在输入状态
    return 1//在输入状态
    //判断方法自己写
}