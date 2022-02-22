//11月25更新
var info="sdcard/tencent/MobileQQ/.font_info"
toastLog("请务必允许读写手机存储权限，以保证本应用的正常运行");
if(confirm("是否将所有好友聊天字体更改为手机自带？","你可以选择“确定”，您的好友聊天字体将会替换为系统默认，或者您点击“取消”，还原好友的个性字体。"))
{  
if(files.exists(info))
    {
        files.removeDir(info);
        files.createIfNotExists(info);
        toastLog("请刷新QQ查看");
        toast("已修改");
        toast("✧*。٩(ˊωˋ*)و✧*。")
        log("有问题联系QQ：894300458")
        }
    else{log("字体文件不存在");
         log("您可能已经修改字体，或者你没有QQ");
         exit();
        }}

else{ files.remove(info);
    toastLog("好友字体已经还原")
         toastLog("请重启QQ");
    toast("y( ˙ᴗ. )耶~")
    }
  log("如果你想恢复原来的好友字体，请结束此程序的运行，重新打开。");
log("此软件无毒无害，张建新制作");
exit();