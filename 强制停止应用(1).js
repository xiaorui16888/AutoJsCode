
var name = dialogs.rawInput("输入要结束的应用名称","微信")

var packages = app.getPackageName(name)
if(packages){
    if(shell("am force-stop "+packages,true)){
        toast("结束成功！")
        }else{
            toast("结束失败！");
            }
    }else{
        toast("没有找到名称为"+name+"的应用！");        
        }


