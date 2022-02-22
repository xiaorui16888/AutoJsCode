qq=dialogs.rawInput("请输入要跳转的QQ号");
shell("am start -n com.tencent.tim/com.tencent.mobileqq.activity.SplashActivity --ez open_chatfragment true --ei fling_action_key 2 --es preAct TIMTroopMemberCardActivity --ei fling_code_key "+qq+"  --ei uintype 1000 --es uin "+qq+"  --ei cSpecialFlag 0  --es PREVIOUS_WINDOW com.tencent.mobileqq.activity.TroopMemberCardActivity --es PREVIOUS_UIN "+qq,true)
