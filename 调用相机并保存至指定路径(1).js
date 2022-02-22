//保存的文件路径
var filepath=files.getSdcardPath()+"/002.jpg";
importClass("android.net.Uri");
importClass("java.io.File");
var file=new File(filepath);
var U=new Uri.fromFile(file);
log(U);
log(filepath);
app.startActivity({
    action: "android.media.action.IMAGE_CAPTURE",
    //type: "text/*",
    extras: {
      "output": U
    }
});