//小说路径
var path = "/storage/emulated/0/Android/obb/com.xunlei.downloadprovider/武炼巅峰.txt";
//打开文件
var file = open(path);
//读取文件的所有内容
var text = (file.read()).split("\n");
//关闭文件
file.close();
a0="";
for(a1=0;a1<text.length;a1++){
input(text[a1]);
while(!click("发送"));
}