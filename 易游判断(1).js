
    function misstake(a) {
        if (a == 1) {
            return "操作成功";
        } else if (a == -1) {
            return "网络链接失败";
        } else if (a == -2) {
            return "请填写程序密钥,请联系开发者解决";
        } else if (a == -3 || a == -4) {
            return "数据异常";
        } else if (a == -5) {
            return "错误的参数,请检查参数是否正确";
        } else if (a == -6) {
            return "还未登录";
        } else if (a == -8) {
            return "账户余额不足";
        } else if (a == -9) {
            return "注册用户达到上限";
        } else if (a == -10) {
            return "非Vip无法使用此接口";
        } else if (a == -11) {
            return "开启自动状态检测失败,还未登陆!";
        } else if (a == -12) {
            return "开启自动状态检测失败!";
        } else if (a == -14) {
            return "错误的调用";
        } else if (a == -15) {
            return "频繁调用,请等待10分钟后再做尝试";
        } else if (a == -16) {
            return "接口未开启";
        } else if (a == -17) {
            return "错误的调用方式,请确认后台接口的调用方式";
        } else if (a == -18) {
            return "服务器内部错误,请联系管理员解决";
        } else if (a == -19) {
            return "接口调用失败,调用次数不足";
        } else if (a == -20) {
            return "变量数据不存在";
        } else if (a == -101) {
            return "用户名填写错误,必须以字母开头6-16位字母或数字!";
        } else if (a == -102) {
            return "用户不存在";
        } else if (a == -103) {
            return "请先登陆";
        } else if (a == -104) {
            return "密码填写错误,请输入6-16位密码！";
        } else if (a == -105) {
            return "邮箱填写错误,请正确输入邮箱,最大长度 32！";
        } else if (a == -106) {
            return "用户名重复";
        } else if (a == -107) {
            return "邮箱重复!";
        } else if (a == -108) {
            return "新密码输入错误";
        } else if (a == -109) {
            return "用户名或密码错误";
        } else if (a == -110) {
            return "用户使用时间已到期";
        } else if (a == -111) {
            return "用户未在绑定的手机上登陆";
        } else if (a == -112) {
            return "用户在别的地方登陆.(主要原因是后台检测不到用户的状态码 后台->用户管理->在线用户 里面不存在这个状态码就会提示这个错误)";
        } else if (a == -13) {
            return "过期时间有误";
        } else if (a ==-114) {
            return "登录数据不存在";
        } else if (a == -115) {
            return "用户已被禁用";
        } else if (a == -116) {
            return "密码修改申请过于频繁";
        } else if (a == -117) {
            return "未输入机器码";
        } else if (a == -120) {
            return "注册失败,注册次数超过限制";
        } else if (a == -122) {
            return "用户已经被删除";
        } else if (a == -123) {
            return "用户密码输入错误";
        } else if (a == -124) {
            return "用户登录数达到最大!";
        } else if (a == -125) {
            return "错误的用户操作类别";
        } else if (a == -127) {
            return "用户充值失败";
        } else if (a == -129) {
            return "用户被开发者禁止使用,请咨询开发者是否被拉到黑名单";
        } else if (a == -128) {
            return "用户数据超过最大限制";
        } else if (a == -131) {
            return "用户使用次数不足";
        } else if (a == -133) {
            return "用户状态码错误";
        } else if (a == -134) {
            return "用户状态码不存在";
        } else if (a == -206) {
            return "程序版本需要更新";
        } else if (a == -208) {
            return "程序未开启后台接口功能.(可在“程序”的“修改”界面开启后台接口功能)";
        } else if (a == -210) {
            return "程序停止新用户注册";
        } else if (a == -301) {
            return "卡密输入错误";
        } else if (a == -302) {
            return "卡密不存在";
        } else if (a == -303) {
            return "卡密已经使用!";
        } else if (a == -304) {
            return "卡密已经过期";
        } else if (a == -305) {
            return "卡密已经冻结";
        } else if (a == -306) {
            return "卡密已经退换";
        } else if (a == -307,) {
            return "接口未开启";
        } else if (a == -308) {
            return "卡密已经换卡";
        } else if (a == 101) {
            return "充值成功!填写的推荐人不存在";
        } else if (a == 102) {
            return "充值成功!填写推荐人获赠时间失败";
        } else if (a == 103) {
            return "充值成功!添加推荐信息失败";
        } else if (a == 104) {
            return "充值成功!推荐人获赠时间失败";
        } else if (a == 105) {
            return "充值成功!充值的卡密类别不支持推荐人功能";
        } else if (a == 106) {
            return "充值成功!充值的卡密类别推荐功能已关闭";
        } else {
            return "未知错误，状态码"+a;
        }
}
toast(misstake("1"))