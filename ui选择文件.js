"ui";
importPackage(org.autojs.autojs.ui.explorer);
importPackage(org.autojs.autojs.model.explorer);
var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
//explorerView.setDirectorySpanSize(2);
explorerView.setOnItemOperatedListener(function(file) {
    toastLog(arguments);
    //ui.finish();
});
explorerView.setOnItemClickListener(function(view, item) {
    toastLog(item.toScriptFile());
    //org.autojs.autojs.model.script.Scripts.run(item.toScriptFile())
});

ui.setContentView(explorerView);

