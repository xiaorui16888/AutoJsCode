 ui.run(function() {
     importPackage(org.autojs.autojs.ui.explorer);
     importPackage(org.autojs.autojs.model.explorer);
     var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
     explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
     explorerView.setDirectorySpanSize(2);
     var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
         .title("选择文件")
         .customView(explorerView, false)
         .positiveText("取消")
         .build();
     explorerView.setOnItemOperatedListener(function(file) {
         dialog.dismiss();
     });
     explorerView.setOnItemClickListener(function(view, item) {
new weiFile(context, item.toScriptFile()).share();//用分享文件。
     });
     com.stardust.app.DialogUtils.showDialog(dialog);
 });

//var path = "/storage/emulated/0/建记/图片/img04.jpg";
//new weiFile(context, path).open();//用其他软件打开文件。



//下面是要主要功能的模块。
function weiFile(ctx, path) {
    this.open = function() {
        var intent = new android.content.Intent("android.intent.action.VIEW");
        intent.setDataAndType(this.uri, this.MIMEType);
        ctx.startActivity(Intent.createChooser(intent, "打开文件(" + this.file.getName() + ")"));
    };
    this.share = function() {
        var sendIntent = new android.content.Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_STREAM, this.uri);
        sendIntent.setType(this.MIMEType);
        ctx.startActivity(Intent.createChooser(sendIntent, "分享文件(" + this.file.getName() + ")"));
    };
    this.getMIMEType = function(file) {
        var MIME_MapTable = {
            'text': ['.txt', '.c', '.conf', '.cpp', '.h', '.htm', '.html', '.java', '.txt', '.js', '.log', '.prop', '.rc', '.sh', '.xml'],
            'image': ['.bmp', '.gif', '.jpeg', '.jpg', '.png'],
            'audio': ['.m3u', '.m4a', '.m4b', '.m4p', '.mp2', '.mp3', '.mpga', '.ogg', '.rmvb', '.wav', '.wma', '.wmv'],
            'video': ['.3gp', '.asf', '.avi', '.m4u', '.m4v', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpg4'],
            'application': ['.apk', '.bin', '.class', '.doc', '.docx', '.xls', '.xlsx', '.exe', '.gtar', '.gz', '.jar', '.js', '.mpc', '.msg', '.pdf', '.pps', '.ppt', '.pptx', '.rtf', '.tar', '.tgz', '.wps', '.z', '.zip'],
            '*': ['']
        };
        var type = "*/*";
        var fName = String(file.getName());
        var dotIndex = fName.split(".");
        if (dotIndex.length < 2) {
            return type;
        }
        var end = String("." + dotIndex.pop()).toLowerCase();
        if (end == "") {
            return type;
        };
        for (var i in MIME_MapTable) {
            var ary = MIME_MapTable[i];
            for (var a = 0; a < ary.length; a++) {
                if (end == ary[a]) {
                    toastLog(i + "/*"+"/"+end);
                    return i + "/*";
                };
            };
        };
        return type;
    }
    this.file = new java.io.File(String(path));
    //this.uri = android.net.Uri.fromFile(this.file);
    this.uri = android.support.v4.content.FileProvider.getUriForFile(context,"org.autojs.autojs.fileprovider", this.file);
    this.MIMEType = this.getMIMEType(this.file);
};