importClass("org.opencv.core.MatOfRect");
importClass("org.opencv.core.Core");
importClass("org.opencv.core.Point");
importClass("org.opencv.imgproc.Imgproc");
importClass("org.opencv.core.Scalar");
importClass("org.opencv.objdetect.CascadeClassifier");
importClass("org.opencv.highgui.Highgui");

//要检测的图片文件路径
let imgPath = "/sdcard/tencent/QQ_Images/null7cabe42b80fcb49a.jpg";
//输出检测之后的路径
let outPath = "/sdcard/face.png";
//数据集路径
let dataPath = "/sdcard/tencent/QQfile_recv/haarcascade_frontalface_alt.xml";

let classifier = new CascadeClassifier(dataPath);
let image = Highgui.imread(imgPath);
if (image.empty()) {
    toastLog("读取人脸图片错误");
    exit();
}
if (!files.exists(dataPath)) {
    toastLog("数据集不存在");
    exit();
}
let rect = new MatOfRect();
classifier.detectMultiScale(image, rect);
let rects = rect.toArray();
if (rects == null) {
    toastLog("没有找到人脸");
    exit();
}
toastLog("找到" + rects.length + "个人脸");
for (let i = 0; i < rects.length; i++) {
    let r = rects[i];
    Core.rectangle(image, new Point(r.x - 2, r.y - 2), new Point(r.x + r.width + 2, r.y + r.height + 2), new Scalar(0, 0, 255));
}
Highgui.imwrite(outPath, image);
toastLog("检测图片已输出到[" + outPath + "]下，请查看");