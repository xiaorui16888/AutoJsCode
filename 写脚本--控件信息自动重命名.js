/*
 * @Author: 白酒煮饭 
 * @Date: 2019-08-16 21:31:58 
 * @Last Modified by: QQ：1641763174
 * @Last Modified time: 2019-08-16 21:37:54
 * 
 * 功能
 * 自动将此类型的文字  className = android.widget.TextView
 * 转换成这样  className("android.widget.TextView")
 * 
 * 使用方法
 * PC   手机使用TC连接,开启自动同步剪贴板
 * 手机 运行该脚本即可
*/
while (true) {
    var s1;
    var xx = getClip();
    if (s1 != xx) {
        if (xx.match(/\=/g)) {
            let b = xx.replace(/\s/g, "").split("=");
            let c = b[0] + '("' + b[1] + '")';
            setClip(c);
            s1 = c;
        }
    }
    sleep(500);
}