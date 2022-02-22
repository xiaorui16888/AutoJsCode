//保存的文件路径
var filepath=files.getSdcardPath()+"/002.jpg";
//path = "/sdcard/xxx.jpg"
var uri = android.support.v4.content.FileProvider.getUriForFile(context,"org.autojs.autojs.fileprovider", new java.io.File(files.path(filepath)));
app.startActivity({
    action: "android.media.action.IMAGE_CAPTURE",
    //type: "text/*",
    extras: {
      "output":uri
    }
});