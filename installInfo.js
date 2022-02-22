importPackage(android.content.pm)
let list = context.getPackageManager().getInstalledPackages(0);
let appList = [];
for(let i = 0; i < list.size(); i++){
    let packageInfo = list.get(i);
    if ((packageInfo.applicationInfo.flags&ApplicationInfo.FLAG_SYSTEM) == 0) {
        log('应用名称：'+packageInfo.applicationInfo.loadLabel(context.getPackageManager()).toString()+'===应用包名：'+packageInfo.packageName+'==安装时间：'+packageInfo.lastUpdateTime+'==更新时间：'+packageInfo.lastUpdateTime);
    }
}