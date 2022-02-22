var qq=2825089371;
f2(qq);

function f1(qq){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data:"mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin="+qq,
        packageName: "com.tencent.mobileqq",
    });
}
function f2(qq){
    shell("am start -n com.tencent.tim/com.tencent.mobileqq.activity.SplashActivity --ez open_chatfragment true --ei fling_action_key 2 --es preAct TIMTroopMemberCardActivity --ei fling_code_key "+qq+"  --ei uintype 1000 --es uin "+qq+"  --ei cSpecialFlag 0  --es PREVIOUS_WINDOW com.tencent.mobileqq.activity.TroopMemberCardActivity --es PREVIOUS_UIN "+qq,true);
}
