
(function () {
    importClass("org.autojs.autojs.network.download.DownloadManager");
    importClass("io.reactivex.android.schedulers.AndroidSchedulers");

    var downloadManger = {};
    var javaDownloadManager = DownloadManager.getInstance();

    downloadManger.downloadWithProgress = function (url, path, title) {
        path = files.path(path);
        title = title || "下载中...";
        var downloadDialog = dialogs.build({
            title: title,
            positive: "取消",
            progress: {
                max: 100,
                showMinMax: true
            },
            autoDismiss: true
        })
            .on("positive", () => {
                downloadManger.cancel(url);
            })
            .show();
        return new Promise(function (res, rej) {
            DownloadManager.getInstance().download(url, path)
                .observeOn(AndroidSchedulers.from(Looper.myLooper()))
                .doOnComplete(function () {
                    res(path);
                    downloadDialog.setProgress(100);
                    downloadDialog.dismiss();
                })
                .subscribe(function (progress) {
                    downloadDialog.setProgress(progress);
                }, function (err) {
                    downloadDialog.dismiss();
                    rej(err);
                });
        });
    }

    downloadManger.cancel = function (url) {
        javaDownloadManager.cancelDownload(url);
    }

    global.downloadManger = downloadManger;
    //module.exports = downloadManger;
})();




let url = "http://202.116.81.74/cache/9/40/dl-cdn.coolapkmarket.com/7ca57ba05aa8b6853afe9d2f2afc897c/coolapkRelease-3.1.0-Beta-129872-o_1c7qe7amgjrq1qab47he8r13i9q-uid-783443.apk?_upt=8e09f78f1537884483";

let ok = confirm("将会下载12MB的文件，是否继续？");
if (ok) {
    downloadManger.downloadWithProgress(url, "./autojs.apk", "APK下载中...")
        .then(file => {
            toast(file);
        }, err => {
            toastLog(err);
        });
}



