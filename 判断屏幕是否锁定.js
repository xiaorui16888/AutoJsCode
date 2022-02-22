// 判断屏幕是否锁定
// 返回 true 表示锁定
//此代码由飞云脚本圈www.feiyunjs.com整理提供
function isScreenLocked() {
    let km = context.getSystemService("keyguard");
    return km.inKeyguardRestrictedInputMode();
  };