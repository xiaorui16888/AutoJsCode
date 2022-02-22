/**
 *Usedfor： Auto.js Pro 
 *Author: Hyun Mai  QQ:2668649892
 *Features: 获取已设置屏幕壁纸
 *Tips: 需要Pro版本运行
 */

"ui";
importClass(android.app.ActivityManager);
importPackage(android.content);

ui.layout(
    <frame>
        <img id="img" w="*" h="*" />
    </frame>
);

var Manager = android.app.WallpaperManager.getInstance(context);
var Q = Manager.getDrawable();
ui.run(() => {
    ui.img.setImageBitmap(Q.bitmap);
});