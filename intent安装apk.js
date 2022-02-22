var apkPath = "/sdcard/MT2/apks/QQ_8.1.3.apk"
installApk(apkPath);

function installApk(apkPath) {
    importPackage(android.content);
    importClass(android.net.Uri);
    importClass(android.os.Build);
    importClass(java.io.File);
    importClass("androidx.core.content.FileProvider");
    
    var file = new File(apkPath);
    var install = new Intent();
    install.setAction(Intent.ACTION_VIEW);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        var apkUri = FileProvider.getUriForFile(context, "org.autojs.autojspro.fileprovider", file);//在AndroidManifest中的android:authorities值 
        install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);//添加这一句表示对目标应用临时授权该Uri所代表的文件 
        install.setDataAndType(apkUri, "application/vnd.android.package-archive"); 
    } else { 
        install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive"); 
    } 
    context.startActivity(install); 
}