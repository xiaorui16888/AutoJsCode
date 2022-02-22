//申请运行需要的权限
auto.waitFor()

//设置运行内容
var str="(づ ●─● )づ请忽略本消息(测试脚本ing)，抱歉打扰到您了";
var time="100"//每次发送内容后的延时

//用于记录已发送过联系人微信名
var haveSend=new Array()

launchApp("微信");
changeIntoAddressBook()
for(var i=0;true;){
    var list=id("li").findOne().children()
    console.verbose("当前界面共找到联系人："+list.length)
    for(var f=1;f<list.length;f++){
        while(true){
            try{
                var name=list[f].findOne(id("mc")).text()
                break
            }catch(e){}
        }
        if(detectorIfIn(name)){
            log("发现未发送的联系人："+name)
            click(name)
            sendString(str)
            sleep(time);
            if(id("anh").desc("重发").exists()){
                //changeName()
            }
            back()
            changeIntoAddressBook()
            haveSend[haveSend.length]=name
        }
    }
    //向下滑动界面
    swipe(100,1500,100,100,500)
}

/**
*微信发送内容
*
*传入值：需要发送的文本<String>
*返回值：无
*/
function sendString(str){
    id("awc").text("发消息").findOne().click()
    id("aie").findOne().setText(str)
    id("aik").findOne().click()
}

/**
*切换到微信联系人界面
*
*无传入传出值
*/
function changeIntoAddressBook(){
    console.info("已切换到联系人页面")
    id("cw2").className("android.widget.TextView").text("通讯录").findOne().parent().parent().click()
}

/**
*检测数组中是否没有该联系人
*
*传入值：要检测的联系人名<String>
*返回值：是否没有该联系人<boolean>
*/
function detectorIfIn(name){
    for(var szcd=0;szcd<haveSend.length;szcd++){
        if(haveSend[szcd]==name){
            console.error("已像该联系人发送过信息")
            return false
        }
    }
    if(name.substring(0,4)=="A0000"){
        console.error("该联系人已拉黑")
        return false
    }
    return true
}

function changeName(){
    id("j1").findOne().click()
    id("dnm").findOne().parent().click()
    id("ax9").findOne().click()
    id("ayt").findOne().click()
    id("ays").findOne().setText("A0000"+id("ays").findOne().text())
    id("j0").findOne().click()
    id("jb").findOne().click()
    id("awc").findOne().click()
}










